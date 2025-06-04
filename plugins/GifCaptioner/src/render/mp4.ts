import { error } from "$shared/api/toast";
import { createFile, DataStream, ISOFile, MP4BoxBuffer } from "mp4box";
import GifRenderer from "./gifRenderer";
import ProgressDisplay from "../ui/createProgress";

export default async function captionMp4(url: string, width: number, height: number, text: string, size: number) {
	const progress = new ProgressDisplay("Fetching");
	let res = await fetch(url).catch(() => {
		progress.close();
		error("Failed to fetch gif");
	});

	if(!res) return;
	let arrayBuffer = await res.arrayBuffer() as MP4BoxBuffer;
	arrayBuffer.fileStart = 0;

	// Count up the number of frames
	progress.update("Preparing");
	let frames = 0;
	await parseToFrames(arrayBuffer, progress, (frame) => {
		frame.source.close();
		frames++;
	});

	// Actually render the gif
	progress.update("Rendering", 0);
	const renderer = new GifRenderer({ progress, frames, width, height, text, size });
	let i = 0;
	await parseToFrames(arrayBuffer, progress, (frame) => {
		progress.update("Rendering", i / frames);
		renderer.addVideoFrame(frame.source, frame.delay);
		i++;
	});

	// Encode it
	renderer.render();
}

// browsers tend to cap gifs at 50 fps
const minFrameLength = 1000 / 50;

function parseToFrames(buffer: MP4BoxBuffer, progress: ProgressDisplay,
	onFrame: (frame: { source: VideoFrame, delay: number }) => void) {
	return new Promise<void>((res) => {
		let time = 0;
		let lastFrameTime = 0;
	
		// mostly stolen from https://github.com/w3c/webcodecs/tree/main/samples/video-decode-display
		const decoder = new VideoDecoder({
			output(frame) {
				if(!frame.duration) return frame.close();
				let duration = frame.duration / 1000;
				
				time += duration;
				let delay = time - lastFrameTime;
				if(delay >= minFrameLength) {
					lastFrameTime = time;
					onFrame({ source: frame, delay });
				} else {
					frame.close();
				}
			},
			error() {
				progress.close();
				error("Failed to parse gif");
			}
		});
	
		let file = createFile();
		file.onError = () => {
			progress.close();
			error("Failed to parse gif");
		}
		file.onReady = (info) => {
			const track = info.videoTracks[0];
			if(!track.video) return;
		
			try {
				decoder.configure({
					codec: track.codec.startsWith('vp08') ? 'vp8' : track.codec,
					codedHeight: track.video.height,
					codedWidth: track.video.width,
					description: getDescription(file, track.id)
				});
		
				file.setExtractionOptions(track.id);
				file.start();
			} catch {
				progress.close();
				error("Failed to parse gif");
			}
		}
		file.onSamples = (id, ref, samples) => {
			// I think this only fires once
			for(let sample of samples) {
				if(!sample.data) continue;
	
				const chunk = new EncodedVideoChunk({
					type: sample.is_sync ? "key" : "delta",
					timestamp: 1e6 * sample.cts / sample.timescale,
					duration: 1e6 * sample.duration / sample.timescale,
					data: sample.data
				});
	
				decoder.decode(chunk);
			}

			decoder.flush().then(res);
		}
	
		file.appendBuffer(buffer);
	});
}

// No idea what this does
function getDescription(file: ISOFile, id: number) {
	const trak = file.getTrackById(id);
	for (const entry of trak.mdia.minf.stbl.stsd.entries) {
		// @ts-ignore not documented for some reason
		const box = entry.avcC || entry.hvcC || entry.vpcC || entry.av1C;
		if (box) {
			const stream = new DataStream(undefined, 0, 1);
			box.write(stream);
			return new Uint8Array(stream.buffer, 8);  // Remove the box header.
		}
	}
	throw new Error("avcC, hvcC, vpcC, or av1C box not found");
}