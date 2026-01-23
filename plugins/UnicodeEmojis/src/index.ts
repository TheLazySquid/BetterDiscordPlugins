import { after } from "$shared/api/patching";
import { createSlate } from "$shared/modules";

after(createSlate, "A", ({ returnVal: editor }) => {
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
                requestAnimationFrame(onChange);
                return;
            }
        }
        
        waitingToUpdate = false;
    }

    const editorOnChange = editor.onChange;
    editor.onChange = function() {
        editorOnChange.apply(this, arguments);
        
        if(waitingToUpdate) return;
        let operation = arguments?.[0]?.operation;
        
        if(!operation) return;
        if(operation.type !== "insert_text" && operation.type !== "remove_text") return;
        if(!operation.text.includes(":")) return;
    
        onChange();
    }
});