import { error, success, warning } from "$shared/api/toast";
import { Api } from "$shared/bd";
import ProgressDisplay from "$shared/util/progress";
import { formatSize } from "../consts";
import { advanceQueue, showPopup } from "../showPopup";
import type { ImageItem } from "../types";

export async function renderImage(item: ImageItem) {
    const progress = new ProgressDisplay("Rendering image", "Preparing");

    const filename = item.file.name;
    Api.Logger.info("Compressing image", filename, "with values", item.values);

    try {
        const bitmap = await createImageBitmap(item.file);

        const canvas = document.createElement("canvas");
        canvas.width = Math.floor(bitmap.width * item.values.resolutionFactor);
        canvas.height = Math.floor(bitmap.height * item.values.resolutionFactor);

        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

        progress.update("Rendering");
        const blob = await new Promise<Blob>((res, rej) => {
            canvas.toBlob((blob) => {
                if(!blob) return rej(new Error("No blob returned from canvas"));
                res(blob);
            }, "image/webp", item.values.quality);
        });

        // Check that the size is now small enough
        const size = blob.size;
        const sizeString = formatSize(size);
        Api.Logger.info("Final size:", sizeString);

        if(blob.size > item.maxSize) {
            warning(`Compressed image is still too large (${sizeString}). Size estimate has been updated.`);
        
            const newFullSize = size / (item.values.resolutionFactor ** 2) / item.values.quality;
            item.fullSize = newFullSize;

            showPopup(item);
            return;
        }

        success(`Image compressed successfully (now ${sizeString})`);
        
        const newName = filename.slice(0, filename.lastIndexOf(".")) + `-compressed.webp`;
        const newFile = new File([ blob ], newName, {type: "image/webp"});
        item.attach(newFile);
    } catch (err) {
        Api.Logger.error("Error compressing image", err);
        error("An error occured while compressing the image.");
    } finally {
        progress.close();
        advanceQueue();
    }
}