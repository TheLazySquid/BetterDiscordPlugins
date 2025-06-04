import futura from "$assets/Futura Condensed Extra Bold.otf";
import CaptionBtnSVG from "$assets/page-layout-header.svg";
import { addFont } from "$shared/api/fonts";
import { after } from "$shared/api/patching";
import { error } from "$shared/api/toast";
import { expressionPicker, gifDisplay } from "$shared/modules";
import Captioner from "./ui/captioner";
import captionMp4 from "./render/mp4";
import "./styles.css";
import captionGif from "./render/gif";

addFont(futura, "futuraBoldCondensed");

after(gifDisplay.prototype, "render", ({ thisVal, returnVal }) => {
    const button = BdApi.React.createElement("button", {
        dangerouslySetInnerHTML: { __html: CaptionBtnSVG },
        className: "gc-trigger",
        onClick: (e) => {
            e.stopPropagation();
            let isGif = thisVal.props.format === 1;
            let url = thisVal.props.src;

            if(isGif) {
                let image = document.createElement("img");
                image.src = url;
                
                image.addEventListener("load", () => {
                    // For some reason the height and width change once added to the dom
                    let { width, height } = image;
                    showCaptioner(width, image, (text, size) => {
                        captionGif(url, width, height, text, size);
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
                    showCaptioner(videoWidth, video, (text, size) => {
                        captionMp4(url, videoWidth, videoHeight, text, size);
                    });
                }, { once: true });
                video.addEventListener("error", () => error("Failed to load gif"));
            }
        }
    });

    returnVal.props.children.unshift(button);
});

function showCaptioner(width: number, element: HTMLElement, onConfirm: (text: string, size: number) => void) {
    let submitCallback: () => [text: string, size: number];

    const captioner = BdApi.React.createElement(Captioner, {
        width,
        element,
        onSubmit: (cb) => submitCallback = cb
    });

    BdApi.UI.showConfirmationModal("Add caption", captioner, {
        onConfirm: () => {
            expressionPicker.close();
            let res = submitCallback?.();
            if(res) onConfirm(...res);
        }
    });
}