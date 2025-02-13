import { onStart, onStop } from "$shared/bdFuncs.ts";
import { chainPatch } from "$shared/patching.ts";
import css from './styles.css'
import ZipPreview from "./ZipPreview.tsx"

const fileModule: any = BdApi.Webpack.getModule((exports) => Object.values<any>(exports).some(val => {
    if(typeof val !== "function") return false
    return val.toString().includes('obscureVideoSpacing]:"VIDEO')
}));

let previews = new Map<string, React.ReactElement>();
let unChainPatch: Function;

onStart(() => {
    BdApi.DOM.addStyle("ZipPreview", css)

    let key = (Object.entries(fileModule).find(([_, val]) => {
        if(typeof val !== "function") return false
        return val.toString().includes("getObscureReason");
    }) as [string, Function])[0]

    let preview: any;
    unChainPatch = chainPatch(fileModule, (_, __, returnVal) => {
        // wrap the div in the preview
        const content = BdApi.React.createElement("div", {
            className: "zp-content"
        }, returnVal.props.children[0].props.children)

        const wrapDiv = BdApi.React.createElement("div", {
            className: "zp-wrap"
        }, [content, preview])

        returnVal.props.children[0].props.style = { padding: 0 };
        returnVal.props.children[0].props.children = wrapDiv;
    }, { path: [key], validate(_, args, returnVal) {
        if(args[0].item.contentType !== "application/zip") return false;

        // this is a bit of a hack, but also grab the preview inside of the validator
        let props = returnVal.props.children.props.children[0].props
        let url = args[0].item.downloadUrl;
    
        props.className += " zp-zip";
    
        // if the preview doesn't exist, create it
        if(!previews.has(url)) {
            const newPreview = BdApi.React.createElement(ZipPreview, {
                url
            });
    
            previews.set(url, newPreview as React.ReactElement);
        }
        
        preview = previews.get(url);

        return true;
    }, },
    { path: ["props", "children", "props", "children", 0, "type"] }, { path: ["type"]}, { path: ["type"] });
})

onStop(() => {
    BdApi.DOM.removeStyle("ZipPreview")
    BdApi.Patcher.unpatchAll("ZipPreview")
    if(unChainPatch) unChainPatch();
})