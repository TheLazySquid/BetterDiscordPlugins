import { patchContextMenu } from "$shared/api/contextmenu"
import { paste } from "$shared/modules";
import { submitMessage } from "$shared/util/submitMessage";

function pasteAndSend() {
    paste();
    setTimeout(submitMessage, 100);
}

patchContextMenu("textarea-context", (element) => {
    const items = element.props.children;

    items.push(BdApi.ContextMenu.buildItem({
        id: "pasteAndSend",
        type: "item",
        label: "Paste and Send",
        onClick: pasteAndSend
    }));
});