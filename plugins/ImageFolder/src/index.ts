import imagePlusOutline from '$assets/image-plus-outline.svg';
import { after, tempAfter } from '$shared/api/patching';
import { buttonsModule, expressionModule, expressionPicker } from "$shared/modules";
import View from "./ui/view";
import { addFont } from '$shared/api/fonts';
import futura from "$assets/Futura Condensed Extra Bold.otf";
import "./styles.css";
import { settings } from './settings';

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

        let sections = returnVal2?.props?.children?.props?.children?.[1]?.props?.children;
        let categories = sections?.[0]?.props?.children?.props?.children; // react moment
        if (!categories) return;

        let activeView = expressionPicker.store.getState().activeView;

        // take the react element that categories[0] is based on and make a new one with the props id: 'image-folder-tab'
        let newCategory = BdApi.React.createElement(categories[0].type, {
            id: 'image-folder-tab',
            "aria-controls": "image-folder-tab-panel",
            "aria-selected": activeView === 'if-image',
            isActive: activeView === 'if-image',
            viewType: "if-image",
            children: 'Images'
        });
        
        categories.splice(0, 0, newCategory);

        if(activeView === 'if-image') {
            // display our content
            const el = BdApi.React.createElement(View, {})
            sections.push(el);
        }
    });
});