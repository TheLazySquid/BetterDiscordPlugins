
import { Input, Output, Conversion, BlobSource, BufferTarget, MP4, QTFF, MATROSKA, WEBM, Mp4OutputFormat } from "mediabunny";
import CompressOptions, { type CompressValues } from "./compressOptions";
import ProgressDisplay from "$shared/util/progress";
import { Api } from "$shared/bd";
import { error, success, warning } from "$shared/api/toast";

const defaultValues: CompressValues = { resolutionFactor: 1, fpsFactor: 1 };
type Attach = (file: File) => void;

let queue: File[] = [];
let editing = false;

export function addFile(file: File, maxSize: number, attach: Attach) {
    if(editing) {
        queue.push(file);
        return;
    }
    
    editing = true;
    showPopup(file, file.size, maxSize, attach, defaultValues);
}

export function showPopup(file: File, fullSize: number, maxSize: number, attach: Attach, values = defaultValues) {
    const Options = BdApi.React.createElement(CompressOptions, {
        fullSize,
        maxSize,
        values,
        onChange: (newValues) => values = newValues
    });

    BdApi.UI.showConfirmationModal(`Video ${file.name} is too large`, Options, {
        onConfirm: () => renderVideo(file, maxSize, values, attach),
        onClose: () => advanceQueue(maxSize, attach),
        onCancel: () => advanceQueue(maxSize, attach)
    });
}

async function renderVideo(file: File, maxSize: number, values: CompressValues, attach: Attach) {
    const progress = new ProgressDisplay("Preparing", true);

    Api.Logger.info("Compressing video", file.name, "with values", values);
    const next = () => advanceQueue(maxSize, attach);

    try {
        // re-encode the video with the new values
        const input = new Input({
            formats: [MP4, QTFF, MATROSKA, WEBM],
            source: new BlobSource(file)
        });
    
        const video = await input.getPrimaryVideoTrack();
        if(!video) throw new Error("No video track found");
    
        const stats = await video.computePacketStats(100);
        
        const output = new Output({
            format: new Mp4OutputFormat(),
            target: new BufferTarget()
        });
        
        const width = Math.floor(video.displayWidth * values.resolutionFactor);
        const frameRate = Math.floor(stats.averagePacketRate * values.fpsFactor);
        Api.Logger.info("Width:", width, "Frame Rate:", frameRate);

        const conversion = await Conversion.init({
            input,
            output,
            video: {
                width,
                frameRate,
                codec: "av1"
            }
        });
        
        conversion.onProgress = (amount) => {
            progress.update("Rendering", amount);
        }
        
        if(progress.canceled) return next();
        progress.onCancel(() => {
            conversion.cancel();
            next();
        });
    
        await conversion.execute();
        if(!output.target.buffer) throw new Error("No output buffer found");

        // Check that the size is now small enough
        const size = output.target.buffer.byteLength;
        const sizeString = `${(output.target.buffer.byteLength / 1024 / 1024).toFixed(2)} MB`;
        Api.Logger.info("Final size:", sizeString);

        if(output.target.buffer.byteLength > maxSize) {
            warning(`Compressed video is still too large (${sizeString}). Size estimate has been updated.`);
            const newFullSize = size / values.fpsFactor / (values.resolutionFactor ** 2);
            Api.Logger.info("Reopening popup with new base size estimate:", newFullSize);

            showPopup(file, newFullSize, maxSize, attach, values);
            return;
        }

        success(`Video compressed successfully (now ${size})`);

        const newName = file.name.slice(0, file.name.lastIndexOf(".")) + `-compressed.mp4`;
        const newFile = new File([ output.target.buffer ], newName, {type: "video/mp4"});
        attach(newFile);
    } catch (err) {
        Api.Logger.error("Error compressing video", err);
        error("An error occured while compressing the video.");
    } finally {
        progress.close();
        next();
    }
}

function advanceQueue(maxSize: number, attach: Attach) {
    const next = queue.shift();
    if(!next) {
        editing = false;
        return;
    }

    showPopup(next, next.size, maxSize, attach);
}
