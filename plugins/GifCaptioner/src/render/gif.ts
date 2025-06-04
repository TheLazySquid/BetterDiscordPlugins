import { decompressFrames, parseGIF, type ParsedFrame } from "gifuct-js";
import GifRenderer from "./gifRenderer";
import ProgressDisplay from "../ui/createProgress";

export default async function captionGif(url: string, width: number, height: number, text: string, size: number) {
    const progress = new ProgressDisplay("Fetching");
    let res = await fetch(url);
    let buffer = await res.arrayBuffer();

    let parsed = parseGIF(buffer);
    let frames = decompressFrames(parsed, true);
    let numFrames = frames.length;

    const renderer = new GifRenderer({ progress, width, height, text, size, frames: frames.length });
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