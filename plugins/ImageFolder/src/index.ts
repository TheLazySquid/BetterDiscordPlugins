import { after, tempAfter } from '$shared/api/patching';
import { buttonsModule, chatClasses, expressionModule, expressionPicker, uploadClasses } from "$shared/modules";
import View from "./ui/view";
import { addFont } from '$shared/api/fonts';
import futura from "$assets/Futura Condensed Extra Bold.otf";
import "./styles.css";
import { settings } from './settings';
import { patchContextMenu } from '$shared/api/contextmenu';
import Manager, { types } from './manager';
import { onStart, onStop } from '$shared/bd';
import { findReactChild, forceUpdate } from '$shared/util/react';
import { selectedChannelStore } from '$shared/stores';
import { LucideIcon } from '$shared/ui/icons';
import { ImagePlus } from 'lucide';

addFont(futura, "futuraBoldCondensed");

// Create the button to open the image folder
after(buttonsModule, "type", ({ args, returnVal }) => {
    if(!returnVal || !settings.showButton || args[0].disabled) return returnVal;
    let gifIndex = returnVal.props.children.findIndex((child: any) => child.key == 'gif');
    if(gifIndex === -1) return;
    
    let type = returnVal.props.children[gifIndex].props.type;

    let div = BdApi.React.createElement('div', {
        className: 'if-button',
        onMouseDown: () => {
            const channel = selectedChannelStore.getChannelId();
            // genuinely no idea why this setTimeout is needed
            setTimeout(() => expressionPicker.toggle('if-image', type, channel));
        },
        key: "if-image"
    }, BdApi.React.createElement(LucideIcon, { icon: ImagePlus }));

    returnVal.props.children.splice(gifIndex, 0, div);
    
    return returnVal;
});

// Add the button on startup
onStart(() => {
    forceUpdate("." + chatClasses.inner);
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