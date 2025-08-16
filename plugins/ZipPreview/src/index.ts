import { after } from "$shared/api/patching.ts";
import { onSwitch } from "$shared/bd.ts";
import { fileModule } from "$shared/modules";
import './styles.css'
import ZipPreview from "./ZipPreview.tsx"

let previews = new Map<string, React.ReactElement>();

onSwitch(() => {
    previews.clear();
});

after(fileModule, "Z", ({ args, returnVal }) => {
    if(args[0].item?.contentType !== "application/zip") return;
    let url = args[0].url;

    // make a preview
    let preview: any;
    if(!previews.has(url)) {
        preview = BdApi.React.createElement(ZipPreview, {
            url
        });

        previews.set(url, preview);
    } else {
        preview = previews.get(url);
    }
    
    preview = previews.get(url);

    // wrap the div in the preview
    const content = BdApi.React.createElement("div", {
        className: "zp-content"
    }, returnVal.props.children[0].props.children)

    const wrapDiv = BdApi.React.createElement("div", {
        className: "zp-wrap"
    }, [content, preview])

    returnVal.props.children[0].props.style = { padding: 0 };
    returnVal.props.children[0].props.children = wrapDiv;
});