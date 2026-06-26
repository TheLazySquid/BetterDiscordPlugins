import { Input, Output, Conversion, BlobSource, BufferTarget, MP4, QTFF, MATROSKA, WEBM, Mp4OutputFormat, type ConversionVideoOptions } from "mediabunny";
import ProgressDisplay from "$shared/util/progress";
import { Api } from "$shared/bd";
import { error, success, warning } from "$shared/api/toast";
import { settings } from "../settings";
import { formatSize, qualities } from "../consts";
import type { VideoItem } from "../types";
import { advanceQueue, showPopup } from "../showPopup";

export async function renderVideo(item: VideoItem) {
    const progress = new ProgressDisplay("Rendering video", "Preparing", true);

    const filename = item.file.name;
    Api.Logger.info("Compressing video", filename, "with values", item.values);

    try {
        // re-encode the video with the new values
        const input = new Input({
            formats: [MP4, QTFF, MATROSKA, WEBM],
            source: new BlobSource(item.file)
        });
    
        const video = await input.getPrimaryVideoTrack();
        if(!video) throw new Error("No video track found");
    
        const stats = await video.computePacketStats(100);
        
        const output = new Output({
            format: new Mp4OutputFormat(),
            target: new BufferTarget()
        });

        const options: ConversionVideoOptions = {
            codec: settings.codec,
            width: Math.floor(video.displayWidth * item.values.resolutionFactor),
            frameRate: Math.floor(stats.averagePacketRate * item.values.fpsFactor),
            bitrate: qualities[item.values.quality].bitrate
        };

        Api.Logger.info("Beginning conversion", options);

        const conversion = await Conversion.init({
            input,
            output,
            video: options
        });
        
        conversion.onProgress = (amount) => {
            progress.update("Rendering", amount);
        }
        
        if(progress.canceled) return advanceQueue();
        progress.onCancel(() => {
            conversion.cancel();
            advanceQueue();
        });
    
        await conversion.execute();
        if(!output.target.buffer) throw new Error("No output buffer found");

        // Check that the size is now small enough
        const size = output.target.buffer.byteLength;
        const sizeString = formatSize(size);
        Api.Logger.info("Final size:", sizeString);

        if(output.target.buffer.byteLength > item.maxSize) {
            warning(`Compressed video is still too large (${sizeString}). Size estimate has been updated.`);
            const newFullSize = size / item.values.fpsFactor / (item.values.resolutionFactor ** 2) / qualities[item.values.quality].factor;
            
            Api.Logger.info("Reopening popup with new base size estimate:", newFullSize);
            item.fullSize = newFullSize;

            showPopup(item);
            return;
        }

        success(`Video compressed successfully (now ${sizeString})`);

        const newName = filename.slice(0, filename.lastIndexOf(".")) + `-compressed.mp4`;
        const newFile = new File([ output.target.buffer ], newName, {type: "video/mp4"});
        item.attach(newFile);
    } catch (err) {
        Api.Logger.error("Error compressing video", err);
        error("An error occured while compressing the video.");
    } finally {
        progress.close();
        advanceQueue();
    }
}