import { decompressFrames, parseGIF, type ParsedFrame } from "gifuct-js";
import GifRenderer, { type GifTransform } from "./gifRenderer";
import ProgressDisplay from "../ui/createProgress";

export default async function captionGif(url: string, width: number, height: number, transform: GifTransform) {
    const progress = new ProgressDisplay("Fetching");
    let res = await fetch(url);
    let buffer = await res.arrayBuffer();

    let parsed = parseGIF(buffer);
    let frames = decompressFrames(parsed, true);
    let numFrames = frames.length;

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
}

export function parseGif(buffer: ArrayBuffer) {
    let parsed = parseGIF(buffer);
    let frames = decompressFrames(parsed, true);

    return { parsed, frames };
}