/**
 * @name UnicodeEmojis
 * @description Replaces discord emojis that you send with their unicode equivalent
 * @author TheLazySquid
 * @version 0.2.0
 * @authorId 619261917352951815
 * @source https://github.com/TheLazySquid/DiscordUnicodeEmojis
 */

let editor;
let waitingToUpdate = false;

function onChange() {
    // count backwards to minimize lag from shuffling around nodes
    for(let lineIndex = editor.children.length - 1; lineIndex >= 0; lineIndex--) {
        let line = editor.children[lineIndex];
        for(let i = line.children.length - 1; i >= 0; i--) {
            let child = line.children[i];
            if (child.type != 'emoji') continue;
            let replacement = child.emoji.surrogate;
            if (!replacement) continue;
            
            // remove the emoji
            editor.apply({ type: 'remove_node', path: [lineIndex, i] });
    
            let lastNode = line.children[i - 1];
            // insert the replacement
            editor.apply({ type: 'insert_text', path: [lineIndex, i - 1], offset: lastNode.text.length, text: `\\${replacement}` });

            // if the user copy-pastes in a large amount of emojis, discord will freeze/crash otherwise
            waitingToUpdate = true;
            requestAnimationFrame(onChange)
            return;
        }
    }
    
    waitingToUpdate = false;
}

let textArea;

let changeObserver = new MutationObserver(() => {
    if(waitingToUpdate) return;

    // confirm that there is an emoji
    if(!textArea.querySelector("img")) return;
    onChange();
});

function onAreaFound(newArea) {
    textArea = newArea;

    // this code adapted from https://github.com/rauenzi/BDPluginLibrary/blob/master/src/modules/reacttools.js
    let reactInstance = textArea[Object.keys(textArea).find((key) => key.startsWith("__reactInternalInstance") || key.startsWith("__reactFiber"))]
    editor = reactInstance?.return?.return?.stateNode?.ref?.current?.getSlateEditor()
    if(!editor) return;

    changeObserver.observe(textArea, {childList: true, subtree: true})
}

const textareaSelector = "[class*='textArea_']"
let textareaObserver = new MutationObserver((mutations) => {
    for(let mutation of mutations) {
        for(let node of mutation.addedNodes) {
            let found = node.matches?.(textareaSelector) ? node : node.querySelector?.(textareaSelector)
            if(!found) continue;

            onAreaFound(found)
        }
    }
})

module.exports = class UnicodeEmojis {
    start() {
        let textarea = document.querySelector(textareaSelector)
        if(textarea) onAreaFound(textarea)

        textareaObserver.observe(document.body, {
            childList: true,
            subtree: true
        })
    }

    stop() {
        textareaObserver.disconnect()
        changeObserver.disconnect()
    }
};