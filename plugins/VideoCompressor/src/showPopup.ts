import type { MediaItem } from "./types";
import VideoOptions from "./ui/videoOptions";
import ImageOptions from "./ui/imageOptions";
import { renderVideo } from "./compress/video";
import { renderImage } from "./compress/image";

let queue: MediaItem[] = [];
let popupOpen = false;

export function addFile(item: MediaItem) {
    if(popupOpen) {
        queue.push(item);
        return;
    }
    
    popupOpen = true;
    showPopup(item);
}

export function showPopup(item: MediaItem) {
    if(item.type === "video") {
        const Options = BdApi.React.createElement(VideoOptions, { item });
        const title = item.becauseMkv ? `Converting ${item.file.name} to MP4` : `Video ${item.file.name} is too large`;

        BdApi.UI.showConfirmationModal(title, Options, {
            onConfirm: () => renderVideo(item),
            onClose: () => advanceQueue(),
            onCancel: () => advanceQueue()
        });
    } else {
        const Options = BdApi.React.createElement(ImageOptions, { item });
    
        BdApi.UI.showConfirmationModal(`Image ${item.file.name} is too large`, Options, {
            onConfirm: () => renderImage(item),
            onClose: () => advanceQueue(),
            onCancel: () => advanceQueue()
        });
    }
}

export function advanceQueue() {
    const next = queue.shift();
    if(!next) {
        popupOpen = false;
        return;
    }

    showPopup(next);
}