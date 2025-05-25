import futura from "$assets/Futura Condensed Extra Bold.otf";
import CaptionBtnSVG from "$assets/page-layout-header.svg";
import css from "./styles.css";
import captionCreator from "./captionCreator.jsx";
import { onStart, onStop } from "$shared/bdFuncs.ts";
import { watchElement } from "$shared/dom.ts";
import { type ParsedGif, parseGIF } from "gifuct-js";
import { renderGif } from "./render.js";

type Gif = HTMLVideoElement | HTMLImageElement;

const gifSelector = "video[class^='gif'], img[class^='gif']";
watchElement(gifSelector, (gif) => {
    if (gif.querySelector(".gif-captioner-btn")) return;

    let captionBtn = document.createElement("button");
    captionBtn.innerHTML = CaptionBtnSVG;
    captionBtn.classList.add("gif-captioner-btn");
    gif.before(captionBtn);

    BdApi.UI.createTooltip(captionBtn, "Add Custom Caption", {});

    let isVideo = gif.nodeName === "VIDEO";

    captionBtn.addEventListener("click", async (e) => {
        e.stopPropagation();
        e.preventDefault();

        let settings = { caption: "", fontSize: 35 };
        let src = (gif as Gif).src;
        let width: number;
        let parsedGif: ParsedGif | undefined;

        if (isVideo) width = (gif as HTMLVideoElement).videoWidth;
        else {
            // @ts-ignore types missing for some reason
            let res = await (BdApi.Net.fetch as typeof fetch)(src);
            let buff = await res.arrayBuffer();
            parsedGif = parseGIF(buff);
            width = parsedGif.lsd.width;
        }

        const reactEl = BdApi.React.createElement(captionCreator, {
            src,
            width,
            onUpdate: (caption: string, fontSize: string) => {
                settings.caption = caption;
                settings.fontSize = parseInt(fontSize);
            },
            isVideo
        });

        const onConfirm = () => {
            // close the GIF picker
            renderGif(
                src,
                settings.caption,
                settings.fontSize,
                isVideo,
                parsedGif
            );
            document
                .querySelector<HTMLButtonElement>(
                    ".expression-picker-chat-input-button > button"
                )
                ?.click();
        };

        BdApi.UI.showConfirmationModal("Add Caption", reactEl as any, {
            confirmText: "Upload",
            cancelText: "Cancel",
            onConfirm
        });
    });
});

let font = new FontFace("futuraBoldCondensed", futura);

onStart(() => {
    BdApi.DOM.addStyle("gif-captioner-style", css);
    document.fonts.add(font);
});

onStop(() => {
    BdApi.DOM.removeStyle("gif-captioner-style");
    document.fonts.delete(font);

    // cleanup any buttons that were added
    let btns = document.querySelectorAll(".gif-captioner-btn");
    for (let btn of btns) {
        btn.remove();
    }
});