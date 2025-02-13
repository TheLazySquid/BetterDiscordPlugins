import imagePlusOutline from '$assets/image-plus-outline.svg'
import styles from './styles.css'
import imageTab from './ui/imageTab'
import { buttonsModule, mimeTypes, expressionModule, pickerStore, toggleExpressionPicker } from './constants';
import { onStart, onStop } from '$shared/bdFuncs';
import { settings, setup } from './settings';

setup();

const fs = require('fs')
const { join } = require('path')
const Buffer = require('buffer')

function patchMenu(returnVal: any, props: any) {
    if(!returnVal || !props?.attachment) return returnVal
    if(!Object.values(mimeTypes).includes(props.attachment.content_type)) return returnVal
    
    // get valid extensions
    let exts: string[] = []
    for(let ext in mimeTypes) {
        if(mimeTypes[ext] == props.attachment.content_type) exts.push(ext)
    }

    // add our context menu item
    returnVal.props.children.push(BdApi.ContextMenu.buildItem({
        type: "separator"
    }), BdApi.ContextMenu.buildItem({
        type: "text",
        label: "Add Image to Folder",
        onClick: async () => {
            let res = await BdApi.UI.openDialog({
                mode: "save",
                defaultPath: join(__dirname, 'imageFolder', props.attachment.filename),
                filters: [
                    {
                        name: "Image",
                        extensions: exts
                    }
                ],
                title: "Save Image",
                message: "Select a folder to save the image to"
            })
            
            if(!res || res.canceled) return

            // save the image
            fetch(props.attachment.url).then(res => res.arrayBuffer()).then(array => {
                let buff = Buffer.from(array)
                fs.writeFile(res.filePath, buff, (err: any) => {
                    if(err) BdApi.UI.showToast('Failed to save image', {type: 'error'})
                    else BdApi.UI.showToast('Image saved', {type: 'success'})
                })
            })
        }
    }))

    return returnVal
}

onStart(() => {
    BdApi.DOM.addStyle("imgFolderStyles", styles)

    BdApi.Patcher.after("ImageFolder", buttonsModule, "type", (_, __, returnVal) => {
        if(!returnVal || !settings.showButton) return returnVal
        let gifIndex = returnVal.props.children.findIndex((child: any) => child.key == 'gif');
        if(gifIndex === -1) return;
        
        let type = returnVal.props.children[gifIndex].props.type

        let div = BdApi.React.createElement('div', {
            className: 'imgFolderBtn',
            onClick: () => {
                // for some reason the expression picker will always close itself before this runs, but that's above my paygrade
                toggleExpressionPicker('if-image', type)
            },
            dangerouslySetInnerHTML: { __html: imagePlusOutline }
        })

        returnVal.props.children.splice(gifIndex, 0, div)
        
        return returnVal
    })

    let unpatch: () => void;

    BdApi.Patcher.after("ImageFolder", expressionModule, "type", (_, __, returnVal) => {
        if(!returnVal) return returnVal

        // if we've already patched, unpatch
        if (unpatch) unpatch()

        unpatch = BdApi.Patcher.after("ImageFolder", returnVal.props.children.props, "children", (_, __, returnVal2) => {
            if(!returnVal2) return returnVal2

            let sections = returnVal2?.props?.children?.props?.children?.[1]?.props?.children
            let categories = sections?.[0]?.props?.children?.props?.children // react moment
            if (!categories) return

            let activeView = pickerStore.getState().activeView

            // take the react element that categories[0] is based on and make a new one with the props id: 'image-folder-tab'
            let newCategory = BdApi.React.createElement(categories[0].type, {
                id: 'image-folder-tab',
                "aria-controls": "image-folder-tab-panel",
                "aria-selected": activeView === 'if-image',
                isActive: activeView === 'if-image',
                viewType: "if-image",
                children: 'Images'
            })
            
            categories.splice(0, 0, newCategory)

            if(activeView === 'if-image') {
                // display our content
                const el = BdApi.React.createElement(imageTab, {})
                sections.push(el)
            }

            return returnVal2
        })
        return returnVal
    })

    // context menu patches
    BdApi.ContextMenu.patch("message", patchMenu)
})

onStop(() => {
    BdApi.Patcher.unpatchAll("ImageFolder")
    BdApi.DOM.removeStyle("imgFolderStyles")
    BdApi.ContextMenu.unpatch("message", patchMenu)
})