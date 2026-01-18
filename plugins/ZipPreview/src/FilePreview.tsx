import { highlightModule } from "$shared/modules";
import { LucideIcon } from "$shared/ui/icons";
import { Copy, Download, X } from "lucide";

const React = BdApi.React;

export default function FilePreview({ name, type: startType, blob, buff, onClose }:
    { name: string, type: string, blob: Blob, buff: ArrayBuffer, onClose: () => void }) {
    const [type, setType] = React.useState(startType);
    const url = React.useRef(URL.createObjectURL(blob));
    React.useEffect(() => () => URL.revokeObjectURL(url.current), []);

    function downloadFile() {
        // create a link and click it
        let a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url.current;
        a.download = name;
        a.click();

        document.body.removeChild(a);
    }

    function copyFile() {
        if(type == "text") {
            DiscordNative.clipboard.copy(new TextDecoder().decode(buff));
        } else {
            DiscordNative.clipboard.copyImage(new Uint8Array(buff), name);
        }

        BdApi.UI.showToast("Copied!", {
            type: "success"
        });
    }

    const ext = name.split(".").at(-1);
    const hasCode = highlightModule.hasLanguage(ext);

    return (
        <div className="zp-preview" onClick={(e) => e.stopPropagation()}>
            <div className="zp-preview-header">
                <div className="zp-preview-title">{ name }</div>
                <div className="zp-preview-close" onClick={onClose}>
                    <LucideIcon icon={X} />
                </div>
            </div>
            <div className="zp-preview-content-wrap">
                { type == "text" || type == "image" ? <div className="zp-preview-copy" onClick={copyFile}>
                    <LucideIcon icon={Copy} />
                </div> : null}
                <div className="zp-preview-content">
                    {type == "image" ? <img src={url.current} /> : null}
                    {type == "video" ? <video controls src={url.current} /> : null}
                    {type == "audio" ? <audio controls src={url.current} /> : null}
                    {type == "text" ? hasCode ?
                        <pre dangerouslySetInnerHTML={{
                            __html: highlightModule.highlight(ext, new TextDecoder().decode(buff), true).value
                        }}></pre>
                        : <pre>{new TextDecoder().decode(buff)}</pre>   
                    : null}
                    {type == "binary" ? <div>
                        Can't preview this file :(
                        <button className="zp-preview-override" onClick={() => setType('text')}>
                            Do it anyways
                        </button>
                    </div> : null}
                </div>
            </div>
            <div className="zp-preview-footer">
                { type == "text" || type == "image" ? <button className="icon" onClick={copyFile}>
                    <LucideIcon icon={Copy} />
                </button> : null}
                <button className="icon" onClick={downloadFile}>
                    <LucideIcon icon={Download} />
                </button>
                <BdApi.Components.Button onClick={onClose}>
                    Close
                </BdApi.Components.Button>
            </div>
        </div>
    )
}