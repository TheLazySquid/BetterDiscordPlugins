import type { GifTransform } from "./render/gifRenderer";
import futura from "$assets/Futura Condensed Extra Bold.otf";
import { addFont } from "$shared/api/fonts";
import { after } from "$shared/api/patching";
import { error } from "$shared/api/toast";
import { expressionPicker, gifDisplay } from "$shared/modules";
import captionMp4 from "./render/video";
import "./styles.css";
import captionGif from "./render/gif";
import Modal from "./ui/modal";
import { CCIcon } from "$shared/ui/icons";
import { Api } from "$shared/bd";

addFont(futura, "futuraBoldCondensed");

after(gifDisplay.prototype, "render", ({ thisVal, returnVal }) => {
    const button = BdApi.React.createElement("button", {
        className: "gc-trigger",
        onClick: (e) => {
            e.stopPropagation();
            const isGif = thisVal.props.format === 1;
            const rawUrl = thisVal.props.src;
            const url = formatUrl(rawUrl);
            Api.Logger.info("URL formatted to", url);

            if(isGif) {
                let image = document.createElement("img");
                image.src = url;
                
                image.addEventListener("load", () => {
                    // For some reason the height and width change once added to the dom
                    let { width, height } = image;
                    showCaptioner(width, height, image, (transform) => {
                        captionGif(url, width, height, transform);
                    });
                });
                image.addEventListener("error", () => error("Failed to load gif"));
            } else {
                let video = document.createElement("video");
                video.src = url;
                video.autoplay = true;
                video.loop = true;
                video.muted = true;
                video.load();

                video.addEventListener("canplaythrough", () => {
                    let { videoWidth, videoHeight } = video;
                    showCaptioner(videoWidth, videoHeight, video, (transform) => {
                        captionMp4(url, videoWidth, videoHeight, transform);
                    });
                }, { once: true });
                video.addEventListener("error", () => error("Failed to load gif"));
            }
        }
    }, BdApi.React.createElement(CCIcon));

    returnVal.props.children.unshift(button);
});

function showCaptioner(width: number, height: number, element: HTMLElement, onConfirm: (transform: GifTransform) => void) {
    let submitCallback: () => GifTransform;

    const modal = BdApi.React.createElement(Modal, {
        width,
        height,
        element,
        onSubmit: (cb) => submitCallback = cb
    });

    BdApi.UI.showConfirmationModal("Edit GIF", modal, {
        onConfirm: () => {
            expressionPicker.close();
            let res = submitCallback?.();
            if(res) onConfirm(res);
        }
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
    if(url.hostname.endsWith("tenor.com")) {
        const path = url.pathname;
        const typeIndex = path.lastIndexOf("/") - 1;
        url.pathname = path.slice(0, typeIndex) + "o" + path.slice(typeIndex + 1);
    }

    return url.toString();
}