import { error } from "$shared/api/toast";
import { Api } from "$shared/bd";
import { getLines } from "$shared/util/canvas";
import ProgressDisplay from "$shared/util/progress";
import { drawCaption, drawSpeechBubble } from "./canvas";
import GifRenderer, { type GifTransform } from "./gifRenderer";

export default async function captionImage(url: string, width: number, height: number, transform: GifTransform, mime: string, file?: File) {
    const progress = new ProgressDisplay("Rendering GIF", "Fetching");

	try {
		// Get the video data
		const arrayBuffer = await (file ?? await BdApi.Net.fetch(url)).arrayBuffer();

        const decoder = new ImageDecoder({
            data: arrayBuffer,
            type: mime
        });

        // For whatever reason this throws an error if the image isn't animated
        try {
            await decoder.tracks.ready;
        } catch {
            const finalFile = await captionStaticImage(url, transform);
            progress.close();
            return finalFile;
        }

        const track = decoder.tracks.selectedTrack;
        if(!track) throw new Error("No track found for image");

        const frames = track.frameCount;
        if(frames === 1) {
            const finalFile = await captionStaticImage(url, transform);
            progress.close();
            return finalFile;
        }

        // Render out all the frames
        progress.update("Rendering", 0);
        const renderer = new GifRenderer({ progress, frames, width, height, transform });
        for(let i = 0; i < frames; i++) {
            progress.update("Rendering", i / frames);
            const result = await decoder.decode({ frameIndex: i });
            
            renderer.addVideoFrame(result.image);
            result.image.close();
        }

        const finalFile = await renderer.render();
        progress.close();
        return finalFile;
    } catch(e) {
        progress.close();
        Api.Logger.error("Failed to caption image", e);
        error("Failed to caption image");
    }
}

async function captionStaticImage(url: string, transform: GifTransform) {
    const image = new Image();
    image.src = url;
    await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
    });

    const canvas = new OffscreenCanvas(image.width, image.height);
    const ctx = canvas.getContext("2d")!;

    if(transform.type === "caption") {
        const lines = getLines(ctx, transform.text, image.width);
        const captionHeight = lines.length * transform.size + 10;
        canvas.height = image.height + captionHeight;

        drawCaption(ctx, transform.text, image.width, transform.size);
        ctx.drawImage(image, 0, captionHeight);
    } else {
        ctx.drawImage(image, 0, 0);
        drawSpeechBubble(ctx, image.width, image.height, transform.tipX, transform.tipY, transform.tipBase);
    }

    const blob = await canvas.convertToBlob({ type: "image/png" });
    return new File([ blob ], "captioned.png", { type: "image/png" });
}