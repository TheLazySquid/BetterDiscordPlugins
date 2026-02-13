import { decompressFrames, parseGIF, type ParsedFrame } from "gifuct-js";
import GifRenderer, { type GifTransform } from "./gifRenderer";
import ProgressDisplay from "$shared/util/progress";
import { Api } from "$shared/bd";
import { error } from "$shared/api/toast";

export default async function captionGif(url: string, width: number, height: number, transform: GifTransform) {
    const progress = new ProgressDisplay("Rendering GIF", "Fetching");

    try {
        // Fetch the gif
        const res = await BdApi.Net.fetch(url);
        const buffer = await res.arrayBuffer();
    
        // Parse it
        const parsed = parseGIF(buffer);
        const frames = decompressFrames(parsed, true);
        const numFrames = frames.length;
    
        const renderer = new GifRenderer({ progress, width, height, transform, frames: frames.length });
        let frame: ParsedFrame | undefined;
        let i = 0;
        while(frame = frames.shift()) {
            progress.update("Rendering", i / numFrames);
            renderer.addGifFrame(frame, parsed);
            i++;
            await new Promise((res) => setTimeout(res));
        }
    
        renderer.render();
    } catch(e) {
        Api.Logger.error("Failed to caption gif", e);
        error("Failed to caption gif");
    }
}
