import type { ContextMenuSetup } from "betterdiscord";
import type { Media } from "../types";
import { expressionPicker } from "$shared/modules";
import Manager from "../manager";
import Captioner from "./captioner";
import { uploadFile } from "$shared/util/upload";
import { settings } from "../settings";
import { error } from "$shared/api/toast";

export default function MediaDisplay({ media }: { media: Media }) {
    const React = BdApi.React;
    const [url, setUrl] = React.useState<string | null>(null);
    const wrap = React.useRef<HTMLButtonElement | null>(null);

    const send = () => {
        Manager.send(media);
        expressionPicker.close();
    }

    React.useEffect(() => {
        if(!wrap.current || media.size > settings.maxPreviewSize * 1e6) return;

        let unloadTimeout: Timer;
        let url: string | undefined;

        // It'd be nice to hoist this out of the component but who cares
        const observer = new IntersectionObserver((entries) => {
            for(let entry of entries) {
                if(entry.intersectionRatio == 0) {
                    if(!url) continue;

                    unloadTimeout = setTimeout(() => {
                        if(!url) return;
                        URL.revokeObjectURL(url);
                        url = undefined;
                        setUrl(null);
                    }, 10e3);
                } else {
                    if(url) continue;
                    if(unloadTimeout) clearTimeout(unloadTimeout);

                    // Load the image
                    Manager.readWhole(media).then((blob) => {
                        if(!blob) return;
                        url = URL.createObjectURL(blob);
                        setUrl(url);
                    });
                }
            }
        });
        observer.observe(wrap.current);

        return () => {
            if(url) URL.revokeObjectURL(url);
            observer.disconnect();
        }
    }, []);

    const deleteMedia = () => {
        BdApi.UI.showConfirmationModal("Deletion confirmation", `Are you sure you want to delete ${media.name}?`, {
            danger: true,
            confirmText: "Confirm",
            onConfirm() {
                Manager.deleteMedia(media);
            }
        });
    }

    const showCaptioner = () => {
        let canvas: HTMLCanvasElement;
        BdApi.UI.showConfirmationModal("Add Caption",
            <Captioner media={media} onCanvas={(c) => canvas = c} />, {
            confirmText: "Send",
            onConfirm() {
                const err = () => error("An error occured getting the captioned image");
                if(!canvas) return err();

                canvas.toBlob((blob) => {
                    if(!blob) return err();
                    
                    const name = media.name.split(".").slice(0, -1).join(".") + "-captioned.png";
                    let file = new File([ blob ], name);
                    uploadFile(file);
                    expressionPicker.close();
                });
            }
        });
    }

    const openContextMenu = (e: React.MouseEvent) => {
        const setup: ContextMenuSetup = [{
            type: "text",
            label: "Delete",
            onClick: deleteMedia
        }];

        if(media.type === "image") {
            setup.push({
                type: "text",
                label: "Send with Caption",
                onClick: showCaptioner
            });
        }

        const menu = BdApi.ContextMenu.buildMenu(setup);

        BdApi.ContextMenu.open(e, menu);
    }

    return (<button ref={wrap} onClick={send} onContextMenu={openContextMenu}>
        {media.size > settings.maxPreviewSize * 1e6 ? <div className="if-no-preview">
            {media.name} is too large to be previewed
        </div> : url ?
            media.type === "image" ? <img src={url} /> : 
            media.type === "audio" ? <div>
                <div className="if-audio-label">{media.name}</div>
                <audio src={url} controls></audio>
            </div> :
            <video src={url} loop autoPlay muted={true}></video>
        : "loading..."}
    </button>);
}