import { error } from "$shared/api/toast";
import { Api } from "$shared/bd";
import ProgressDisplay from "$shared/util/progress";
import GifRenderer, { type GifTransform } from "./gifRenderer";

export default async function captionImage(url: string, width: number, height: number, transform: GifTransform, mime: string) {
    const progress = new ProgressDisplay("Rendering GIF", "Fetching");

	try {
		// Get the video data
		const res = await BdApi.Net.fetch(url);
		const arrayBuffer = await res.arrayBuffer();
        const decoder = new ImageDecoder({
            data: arrayBuffer,
            type: mime
        });

        await decoder.tracks.ready;
        const track = decoder.tracks.selectedTrack;
        if(!track) throw new Error("No track found for image");

        const frames = track.frameCount;

        // Render out all the frames
        progress.update("Rendering", 0);
        const renderer = new GifRenderer({ progress, frames, width, height, transform });
        for(let i = 0; i < frames; i++) {
            progress.update("Rendering", i / frames);
            const result = await decoder.decode({ frameIndex: i });
            
            renderer.addVideoFrame(result.image);
            result.image.close();
        }

        renderer.render();
    } catch(e) {
        Api.Logger.error("Failed to caption image", e);
        error("Failed to caption image");
    }
}