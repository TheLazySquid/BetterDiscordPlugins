import imagePlusOutline from '$assets/image-plus-outline.svg';
import { after, tempAfter } from '$shared/api/patching';
import { buttonsModule, expressionModule, expressionPicker, uploadClasses } from "$shared/modules";
import View from "./ui/view";
import { addFont } from '$shared/api/fonts';
import futura from "$assets/Futura Condensed Extra Bold.otf";
import "./styles.css";
import { settings } from './settings';
import { patchContextMenu } from '$shared/api/contextmenu';
import Manager, { types } from './manager';
import { onStart, onStop } from '$shared/bd';
import { findReactChild } from '$shared/util/findInTree';

addFont(futura, "futuraBoldCondensed");

// Create the button to open the image folder
after(buttonsModule, "type", ({ returnVal }) => {
    if(!returnVal || !settings.showButton) return returnVal;
    let gifIndex = returnVal.props.children.findIndex((child: any) => child.key == 'gif');
    if(gifIndex === -1) return;
    
    let type = returnVal.props.children[gifIndex].props.type;

    let div = BdApi.React.createElement('div', {
        className: 'if-button',
        onMouseDown: () => {
            // genuinely no idea why this setTimeout is needed
            setTimeout(() => expressionPicker.toggle('if-image', type));
        },
        dangerouslySetInnerHTML: { __html: imagePlusOutline },
        key: "if-image"
    });

    returnVal.props.children.splice(gifIndex, 0, div);
    
    return returnVal;
});

// Create the image folder tab in the expression picker
after(expressionModule, "type", ({ returnVal }) => {
    if(!returnVal) return returnVal;

    tempAfter(returnVal.props.children.props, "children", ({ returnVal: returnVal2 }) => {
        if(!returnVal2) return returnVal2;

        let sections = findReactChild(returnVal2, (el) => el?.[0]?.type === "nav");
        let categories = findReactChild(sections, (el) => el?.[0]?.props?.["aria-selected"] !== undefined);
        if (!categories) return;

        let activeView = expressionPicker.store.getState().activeView;

        // take the react element that categories[0] is based on and make a new one with the props id: 'image-folder-tab'
        let newCategory = BdApi.React.createElement(categories[0].type, {
            id: 'image-folder-tab',
            "aria-controls": "image-folder-tab-panel",
            "aria-selected": activeView === 'if-image',
            isActive: activeView === 'if-image',
            viewType: "if-image",
            children: "Media"
        });
        
        categories.splice(0, 0, newCategory);

        if(activeView === 'if-image') {
            // display our content
            const el = BdApi.React.createElement(View, {});
            sections.push(el);
        }
    });
});

// Hide the default upload overlay when the expression picker is open
const uploadClass = uploadClasses.uploadArea;
const hideCss = `.${uploadClass} { display: none; pointer-events: none; }`;

onStart(() => {
    let unsub = expressionPicker.store.subscribe((state) => {
        if(state.activeView) {
            BdApi.DOM.addStyle("if-hide-upload", hideCss);
        } else {
            BdApi.DOM.removeStyle("if-hide-upload");
        }
    });

    onStop(unsub, true);
});

onStop(() => {
    BdApi.DOM.removeStyle("if-hide-upload");
});

// Add to context menus
patchContextMenu("message", (element, props) => {
    if(!props?.mediaItem) return;
    if(Object.values(types).every((t) => t[1] !== props.mediaItem.contentType)) return;

    element.props.children.props.children.push(
        BdApi.ContextMenu.buildItem({ type: "separator"}),
        BdApi.ContextMenu.buildItem({
            type: "text",
            label: "Add to ImageFolder",
            onClick: () => Manager.saveImage(props.mediaItem.url)
        })
    );
});

const onPaste = (e: ClipboardEvent) => {
    if(expressionPicker.store.getState().activeView !== "if-image") return;
    e.stopPropagation();
    let files = e.clipboardData?.files;
    if(files) Manager.addFileList(files);
}

onStart(() => window.addEventListener("paste", onPaste, true));
onStop(() => window.removeEventListener("paste", onPaste, true));