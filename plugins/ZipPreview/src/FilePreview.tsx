import Download from "$assets/download.svg"
import Close from "$assets/close.svg";
import Copy from "$assets/content-copy.svg";
import { highlightModule } from "$shared/modules";

const React = BdApi.React;

export default function FilePreview({ name, type: startType, blob, buff, onClose }:
    { name: string, type: string, blob: Blob, buff: ArrayBuffer, onClose: () => void }) {
    const [type, setType] = React.useState(startType);
    const url = URL.createObjectURL(blob);

    function close() {
        URL.revokeObjectURL(url);
        onClose();
    }

    function downloadFile() {
        // create a link and click it
        let a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
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
                <div className="zp-preview-close" onClick={close}
                dangerouslySetInnerHTML={{ __html: Close }}></div>
            </div>
            <div className="zp-preview-content-wrap">
                { type == "text" || type == "image" ? <div className="zp-preview-copy" onClick={copyFile}
                dangerouslySetInnerHTML={{ __html: Copy }}></div> : null}
                <div className="zp-preview-content">
                    {type == "image" ? <img src={url} /> : null}
                    {type == "video" ? <video autoPlay controls src={url} /> : null}
                    {type == "audio" ? <audio autoPlay controls src={url} /> : null}
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
                { type == "text" || type == "image" ? <button className="icon" onClick={copyFile}
                dangerouslySetInnerHTML={{ __html: Copy }}></button> : null}
                <button className="icon" onClick={downloadFile}
                dangerouslySetInnerHTML={{ __html: Download }}></button>
                <button onClick={close}
                className="bd-button bd-button-filled bd-button-color-brand bd-button-medium">
                    Close
                </button>
            </div>
        </div>
    )
}