import { highlightModule } from "$shared/modules";
import { IconComponent } from "$shared/ui/icons";
import DynamicModal from "$shared/util/dynamicModal";
import { Copy, Download } from "lucide";

const React = BdApi.React;

interface FilePreviewProps extends Record<string, any> {
    name: string;
    type: string;
    blob: Blob;
    buff: ArrayBuffer;
}

export default function FilePreview({ name, type: startType, blob, buff, ...props }: FilePreviewProps) {
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
        <DynamicModal
            {...props}
            title={name}
            actions={[
                {
                    icon: IconComponent({ icon: Copy }),
                    variant: "icon-only",
                    onClick: copyFile
                },
                {
                    icon: IconComponent({ icon: Download }),
                    variant: "icon-only",
                    onClick: downloadFile
                },
                {
                    text: "Close",
                    onClick: () => props.onClose(),
                    className: "test-here"
                }
            ]}
        >
            <div className="zp-preview">
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
        </DynamicModal>
    )
}