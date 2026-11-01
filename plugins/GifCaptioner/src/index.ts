import "./styles.css";
import type { GifTransform } from "./render/gifRenderer";
import futura from "$assets/Futura Condensed Extra Bold.otf";
import { addFont } from "$shared/api/fonts";
import { after } from "$shared/api/patching";
import { error } from "$shared/api/toast";
import { AttachmentSystem, expressionPicker, gifDisplay } from "$shared/modules";
import captionVideo from "./render/video";
import captionImage from "./render/image";
import Modal from "./ui/modal";
import { CCIcon, LucideIcon } from "$shared/ui/icons";
import { Api, expose } from "$shared/bd";
import { captionVideoAsVideo } from "./render/videoConvert";
import { uploadFile } from "$shared/util/upload";
import { ClosedCaption } from "lucide";
import { settings } from "./settings";

addFont(futura, "futuraBoldCondensed");
expose("CaptionButton", CaptionButton);
expose("captionGif", captionGif);

after(gifDisplay.prototype, "render", ({ thisVal, returnVal }) => {
    const button = BdApi.React.createElement(CaptionButton, {
        onClick: (e) => {
            e.stopPropagation();
            const src = thisVal.props.src;
            const isImage = thisVal.props.format === 1;

            captionGif(src, isImage);
        }
    });

    returnVal.props.children.unshift(button);
});

var Toolbar = BdApi.Webpack.getBySource(/spoiler:!.{1,3}.spoiler/) as any;
var ToolbarButton = BdApi.Webpack.getByStrings("stopPropagation(),", "onClick:", "dangerous") as any;

const images = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/avif", "image/bmp"];
const videos = ["video/mp4", "video/mov", "video/mkv", "video/webm"];

after(Toolbar, "A", ({ args, returnVal }) => {
    const type = args[0].upload.mimeType;
    const isImage = images.includes(type);
    if(!isImage && !videos.includes(type)) return;

    const button = BdApi.React.createElement(ToolbarButton, {
        tooltip: "Add Caption",
        onClick: () => {
            const file = args[0].upload.item.file;
            const props = returnVal.props;
            const url = URL.createObjectURL(file);

            const upload = (file: File | undefined) => {
                URL.revokeObjectURL(url);
                if(!file) return;

                AttachmentSystem.remove(props.channelId, props.id, props.draftType);
                uploadFile(file, false);
            }

            if(isImage) {
                showImageCaptioner(url, (width, height, transform) => {
                    captionImage(url, width, height, transform, type, file).then(upload);
                }, true);
            } else {
                showVideoCaptioner(url, (width, height, transform) => {
                    captionVideoAsVideo(file, width, height, transform).then(upload);
                }, true);
            }
        }
    }, BdApi.React.createElement(LucideIcon, { icon: ClosedCaption }));
    returnVal.props.actions.props.children.unshift(button);
});

function CaptionButton(options: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const button = BdApi.React.createElement("button", {
        className: "gc-trigger",
        ...options
    }, BdApi.React.createElement(CCIcon));

    return button;
}

function captionGif(src: string, isImage: boolean) {
    const url = formatUrl(src);
    const urlString = url.toString();
    const isWebp = url.pathname.endsWith(".webp");
    Api.Logger.info("URL formatted to", urlString);

    const upload = (file: File | undefined) => {
        if(!file) return;
        uploadFile(file, settings.autoSend);
    }

    if(isImage) {
        showImageCaptioner(urlString, (width, height, transform) => {
            const mime = isWebp ? "image/webp" : "image/gif";
            captionImage(urlString, width, height, transform, mime).then(upload);
        });
    } else {
        showVideoCaptioner(urlString, (width, height, transform) => {
            captionVideo(urlString, width, height, transform).then(upload);
        });
    }
}

type CaptionerCallback = (width: number, height: number, transform: GifTransform) => void;
function showImageCaptioner(url: string, onConfirm: CaptionerCallback, revokeUrl?: boolean) {
    const image = document.createElement("img");
    image.src = url;
    
    image.addEventListener("load", () => {
        // For some reason the height and width change once added to the dom
        const { width, height } = image;
        showCaptioner(width, height, image, (transform) => {
            onConfirm(width, height, transform);
        }, () => {
            if(revokeUrl) URL.revokeObjectURL(url);
        });
    });

    image.addEventListener("error", () => {
        if(revokeUrl) URL.revokeObjectURL(url);
        error("Failed to load gif");
    });
}

function showVideoCaptioner(url: string, onConfirm: CaptionerCallback, revokeUrl?: boolean) {
    const video = document.createElement("video");
    video.src = url;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.load();

    video.addEventListener("canplaythrough", () => {
        const { videoWidth, videoHeight } = video;
        showCaptioner(videoWidth, videoHeight, video, (transform) => {
            onConfirm(videoWidth, videoHeight, transform);
        }, () => {
            if(revokeUrl) URL.revokeObjectURL(url);
        });
    }, { once: true });

    video.addEventListener("error", () => {
        if(revokeUrl) URL.revokeObjectURL(url);
        error("Failed to load gif");
    });
}

function showCaptioner(width: number, height: number, element: HTMLElement, onConfirm: (transform: GifTransform) => void, onCancel?: () => void) {
    let submitCallback: () => GifTransform;
    let confirmed = false;

    const modal = BdApi.React.createElement(Modal, {
        width,
        height,
        element,
        onSubmit: (cb) => submitCallback = cb
    });

    BdApi.UI.showConfirmationModal("Edit GIF", modal, {
        onConfirm: () => {
            expressionPicker.close();
            confirmed = true;

            const res = submitCallback?.();
            if(res) onConfirm(res);
        },
        onClose: () => !confirmed && onCancel?.(),
        onCancel: () => !confirmed && onCancel?.()
    });
}

function formatUrl(rawUrl: string) {
    const url = new URL(rawUrl, location.href);

    // Prefer using discord CDN (thanks Knew)
    if (url.hostname === "media.discordapp.net") url.hostname = "cdn.discordapp.com";
    url.searchParams.delete("format");
    url.searchParams.delete("animated");
    url.searchParams.delete("width");
    url.searchParams.delete("height");
    url.searchParams.delete("quality");

    // Prefer using mp4 from tenor for higher quality
    // For some reason tenor denotes this by ending the id with an o
    if(url.hostname.endsWith("tenor.com") && !url.pathname.endsWith(".gif")) {
        const path = url.pathname;
        const typeIndex = path.lastIndexOf("/") - 1;
        url.pathname = path.slice(0, typeIndex) + "o" + path.slice(typeIndex + 1);
    }

    // Make sure webps are animated
    if(url.pathname.endsWith(".webp")) {
        url.searchParams.set("animated", "true");
    }

    return url;
}