import { error } from "$shared/api/toast";
import GifRenderer, { type GifTransform } from "./gifRenderer";
import ProgressDisplay from "$shared/util/progress";
import { BufferSource, CanvasSink, Input, MP4, VideoSampleSink, WEBM } from "mediabunny";

export default async function captionMp4(url: string, width: number, height: number, transform: GifTransform) {
	const progress = new ProgressDisplay("Fetching");
	const onError = () => {
		progress.close();
		error("Failed to parse gif");
	}

	let res = await BdApi.Net.fetch(url).catch(() => {
		progress.close();
		error("Failed to fetch gif");
	});

	if(!res) return;
	const arrayBuffer = await res.arrayBuffer();
	const input = new Input({
		formats: [WEBM, MP4],
		source: new BufferSource(arrayBuffer)
	});
	const track = await input.getPrimaryVideoTrack();
	if(!track) return onError();

	const sampleSink = new VideoSampleSink(track);
	const canvasSink = new CanvasSink(track);

	// Count up the number of frames
	progress.update("Preparing");
	let frames = await countFrames(sampleSink);

	// Actually render the gif
	progress.update("Rendering", 0);
	const renderer = new GifRenderer({ progress, frames, width, height, transform });
	let i = 0;
	for await (const frame of getCanvases(canvasSink)) {
		progress.update("Rendering", i / frames);
		renderer.addVideoFrame(frame.canvas, frame.delay);
		i++;
	}

	// Encode it
	renderer.render();
}

// browsers tend to cap gifs at 50 fps
const minFrameLength = 1 / 50;

export async function countFrames(sink: VideoSampleSink) {
	let time = 0;
	let lastFrameTime = 0;
	let frames = 0;
	
	// Samples are just frames apparently
	for await (const sample of sink.samples()) {
		time += sample.duration;
		let delay = time - lastFrameTime;

		if(delay >= minFrameLength) {
			lastFrameTime = time;
			frames++;
		}

		sample.close();
	}

	return frames;
}

export async function* getCanvases(sink: CanvasSink) {
	let time = 0;
	let lastFrameTime = 0;
	
	for await (const sample of sink.canvases()) {
		time += sample.duration;
		let delay = time - lastFrameTime;
		console.log(delay);

		if(delay >= minFrameLength) {
			lastFrameTime = time;
			yield { canvas: sample.canvas, delay }
		}
	}
}