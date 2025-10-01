import { onStart, onStop } from "../bd";

export function addFont(data: Uint8Array<ArrayBuffer>, family: string) {
    onStart(() => {
        for(let font of document.fonts) {
            if(font.family === family) return;
        }
    
        let font = new FontFace(family, data);
        document.fonts.add(font);
    
        onStop(() => {
            document.fonts.delete(font);
        }, true);
    });
}