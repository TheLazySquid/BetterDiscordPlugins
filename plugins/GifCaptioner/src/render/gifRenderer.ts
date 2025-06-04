import GifWorker from "../gif.worker.txt";
import { getUrl } from "$shared/util/blob";
import { getLines } from "$shared/util/canvas";
import GIF from "gif.js";
import { premiumPremissions } from "$shared/modules";
import { error } from "$shared/api/toast";
import { uploadFile } from "$shared/util/upload";
import type ProgressDisplay from "../ui/createProgress";
import type { ParsedFrame, ParsedGif } from "gifuct-js";
import { Api } from "$shared/bd";

let worker = getUrl(GifWorker);

export default class GifRenderer {
	canvas = document.createElement("canvas");
	ctx = this.canvas.getContext("2d")!;
	captionHeight = 0;
	width: number;
	height: number;
	text: string;
	size: number;
	gif: GIF;
	progress: ProgressDisplay;

	constructor({ progress, frames, width, height, text, size }:
		{ progress: ProgressDisplay, frames: number, width: number, height: number, text: string, size: number }) {
		this.progress = progress;
		this.width = width;
		this.height = height;
		this.text = text;
		this.size = size;

		if(!worker.url) {
			progress.close();
			error("Attempted to encode gif while plugin is disabled");
			throw new Error("Worker url missing");
		}

		this.ctx.font = `${this.size}px futuraBoldCondensed`;
		let lines = getLines(this.ctx, this.text, this.width);

		const fullHeight = lines.length * this.size + 10 + this.height;
		const fullSize = fullHeight * this.width;
		// Gifs are compressed a bit so this is always going to overshoot
		const sizeEstimate = fullSize * frames;
		const maxSize: number = premiumPremissions.getUserMaxFileSize(); // in bytes
		let scaleFactor = Math.max(1, Math.sqrt(sizeEstimate / maxSize));
		Api.Logger.log("Scale factor set to", scaleFactor);

		const newWidth = Math.floor(this.width / scaleFactor);
		const newHeight = Math.floor(this.height / scaleFactor);
		const newFullHeight = Math.floor(fullHeight / scaleFactor);
		const newSize = Math.floor(this.size / scaleFactor);

		this.width = this.canvas.width = newWidth;
		this.height = newHeight;
		this.canvas.height = newFullHeight;

		this.gif = new GIF({
			workerScript: worker.url,
			height: newFullHeight,
			width: newWidth
		});
		
		this.drawCaption(this.text, newWidth, newSize);
	}

	tempCanvas?: HTMLCanvasElement;
	tempCtx?: CanvasRenderingContext2D;
	gifCanvas?: HTMLCanvasElement;
	gifCtx?: CanvasRenderingContext2D;
	needsDisposal = false;
	frameImageData?: ImageData;
	addGifFrame(source: ParsedFrame, parsed: ParsedGif) {
		if(!this.tempCanvas) this.tempCanvas = document.createElement("canvas");
		if(!this.tempCtx) this.tempCtx = this.tempCanvas.getContext("2d")!;
		if(!this.gifCanvas) {
			this.gifCanvas = document.createElement("canvas");
			this.gifCanvas.width = parsed.lsd.width;
			this.gifCanvas.height = parsed.lsd.height;
		}
		if(!this.gifCtx) this.gifCtx = this.gifCanvas.getContext("2d")!;

		if(this.needsDisposal) {
			this.gifCtx.clearRect(0, this.captionHeight, this.width, this.height);
			this.needsDisposal = false;
		}

		if(source.disposalType == 2) this.needsDisposal = true;

		if(
			!this.frameImageData ||
			source.dims.width !== this.frameImageData.width ||
			source.dims.height !== this.frameImageData.height
		) {
			this.tempCanvas.width = source.dims.width;
			this.tempCanvas.height = source.dims.height;
			this.frameImageData = this.tempCtx.createImageData(source.dims.width, source.dims.height);
		}

		// Do all the nonsense to copy it to the real canvas
		this.frameImageData.data.set(source.patch);
		this.tempCtx.putImageData(this.frameImageData, 0, 0);
		this.gifCtx.drawImage(this.tempCanvas, source.dims.left, source.dims.top);
		this.ctx.drawImage(this.gifCanvas, 0, this.captionHeight, this.width, this.height);
		this.gif.addFrame(this.ctx, { delay: source.delay, copy: true });
	}

	addVideoFrame(source: VideoFrame, delay: number) {
		this.ctx.drawImage(source, 0, this.captionHeight, this.width, this.height);
		this.gif.addFrame(this.ctx, { delay, copy: true });
		source.close();
	}

	render() {
		this.gif.once("finished", (blob) => {
			const file = new File([ blob ], "captioned.gif", { type: "image/gif" });
			uploadFile(file);
			this.progress.close();
		});
		
		this.gif.on("progress", (amount) => {
			this.progress.update("Encoding", amount);
		});
		this.progress.update("Encoding", 0);

		this.gif.render();
	}

	drawCaption(text: string, width: number, size: number) {
		this.ctx.font = `${size}px futuraBoldCondensed`;
		let lines = getLines(this.ctx, text, width);
		this.captionHeight = lines.length * size + 10;

		// add background
		this.ctx.fillStyle = "white";
		this.ctx.fillRect(0, 0, width, lines.length * size + 10);

		// draw text
		this.ctx.fillStyle = "black";
		this.ctx.textAlign = "center";
        this.ctx.textBaseline = "top";
		for(let i = 0; i < lines.length; i++) {
			this.ctx.fillText(lines[i], width / 2, size * i + 5);
		}
	}
}