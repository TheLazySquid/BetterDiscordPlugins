import type { GifTransform } from "./gifRenderer";
import { drawCaption, drawSpeechBubble } from "./canvas";
import { Input, Output, BufferSource, Conversion, WEBM, MP4, MATROSKA, QTFF, Mp4OutputFormat, BufferTarget } from "mediabunny";
import { Api } from "$shared/bd";
import { error } from "$shared/api/toast";
import ProgressDisplay from "$shared/util/progress";
import { getLines } from "$shared/util/canvas";

export async function captionVideoAsVideo(file: File, width: number, height: number, transform: GifTransform) {
    const progress = new ProgressDisplay("Rendering Video", "Preparing");

    try {
        const buffer = await file.arrayBuffer();
    
        const input = new Input({
            formats: [WEBM, MP4, MATROSKA, QTFF],
            source: new BufferSource(buffer)
        });
    
        const output = new Output({
            format: new Mp4OutputFormat(),
            target: new BufferTarget()
        });
    
        const canvas = new OffscreenCanvas(width, height);
        const ctx = canvas.getContext("2d")!;
        let conversion: Conversion;
    
        if(transform.type === "caption") {
            const lines = getLines(ctx, transform.text, width);
            const captionHeight = lines.length * transform.size + 10;
            canvas.height = height + captionHeight;
            drawCaption(ctx, transform.text, width, transform.size);
            
            conversion = await Conversion.init({
                input,
                output,
                video: {
                    process: (sample) => {
                        sample.draw(ctx, 0, captionHeight);
                        return canvas;
                    },
                    processedHeight: canvas.height
                }
            });
        } else {
            const speechBubbleCanvas = new OffscreenCanvas(width, height);
            const speechBubbleCtx = speechBubbleCanvas.getContext("2d")!;
            drawSpeechBubble(speechBubbleCtx, width, height, transform.tipX, transform.tipY, transform.tipBase);
    
            conversion = await Conversion.init({
                input,
                output,
                video: {
                    process: (sample) => {
                        sample.draw(ctx, 0, 0);
                        ctx.drawImage(speechBubbleCanvas, 0, 0);
                        return canvas;
                    }
                }
            });
        }

        progress.update("Rendering", 0);
        conversion.onProgress = (amount) => {
            progress.update("Rendering", amount);
        }

        await conversion.execute();
        if(!output.target.buffer) throw new Error("No output buffer found");

        return new File([ output.target.buffer ], file.name, { type: "video/mp4" });
    } catch(e) {
        Api.Logger.error("Failed to caption video", e);
        error("Failed to caption video");
    } finally {
        progress.close();
    }
}