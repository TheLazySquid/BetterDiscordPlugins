// @ts-ignore
import GifWorker from "./gif.worker.txt";
import { uploadFile } from "$shared/util/upload.ts";
import { onStart, onStop } from "$shared/bd.ts";
import GIF from "gif.js";
import { getLines } from "$shared/util/canvas";
import { decompressFrames, type ParsedFrame, type ParsedGif } from "gifuct-js";
import { channelStore } from "$shared/modules.ts";

let rendering: boolean = false;
let workerUrl: string | null = null;

onStart(() => {
    let blob = new Blob([GifWorker], { type: "application/javascript" });
    workerUrl = URL.createObjectURL(blob);
});

onStop(() => {
    if (workerUrl) URL.revokeObjectURL(workerUrl);
    workerUrl = null;
});

export async function renderGif(
    originalSrc: string,
    caption: string,
    fontSize: number,
    isVideo: boolean,
    parsedGif?: ParsedGif
) {
    if (rendering || !workerUrl) return;
    rendering = true;

    const channel = channelStore.getChannelId();
    if (!channel) return;

    let progressDialog = document.createElement("dialog");
    progressDialog.id = "progressDialog";
    progressDialog.addEventListener("close", (e) => e.preventDefault());
    progressDialog.innerHTML = `
        <label for="renderProgress">Preparing...</label>
        <progress id="renderProgress" value="0" max="1"></progress> <br />
        <button id="cancelRender">Cancel</button>
    `;
    let progress = progressDialog.querySelector(
        "#renderProgress"
    ) as HTMLProgressElement;
    document.body.appendChild(progressDialog);
    progressDialog.showModal();

    let width: number, height: number, frames: number, duration: number;
    let gifFrames: ParsedFrame[] = [];
    let video: HTMLVideoElement;
    if (isVideo) {
        video = document.createElement("video");
        video.src = originalSrc;
        video.crossOrigin = "anonymous";

        // wait for video to load
        await new Promise((res) => {
            video.addEventListener("canplaythrough", res, { once: true });
        });

        // calculate how many frames are in the video
        video.currentTime = 0;
        video.playbackRate = 16;
        video.play();
        await new Promise((res) =>
            video.addEventListener("ended", res, { once: true })
        );
        let quality = video.getVideoPlaybackQuality();
        frames = quality.totalVideoFrames;
        video.pause();

        width = video.videoWidth;
        height = video.videoHeight;
        duration = video.duration;

		// Cap the video at 45 fps or bad stuff will start happening
		if(frames / duration > 45) frames = duration * 45;
    } else {
        gifFrames = decompressFrames(parsedGif!, true);

        width = parsedGif!.lsd.width;
        height = parsedGif!.lsd.height;
        frames = gifFrames.length;

        duration = 0;
        for (let frame of gifFrames) duration += frame.delay;
    }
    console.log("Frames:", frames);

    // just in case somehow a gif doesn't have any length
    if (duration == 0) duration = 1;

    // yeah this is a bit of a mess
    const padding = 10;
    let renderCanvas = document.createElement("canvas"); // this could be an OffscreenCanvas but issues
    renderCanvas.width = width;
    let renderCtx = renderCanvas.getContext("2d")!;
    renderCtx.font = `${fontSize}px futuraBoldCondensed`;
    let lines = getLines(renderCtx, caption, renderCanvas.width);
    renderCanvas.height = height + lines.length * fontSize + padding * 2;
    renderCtx.font = `${fontSize}px futuraBoldCondensed`;
    renderCtx.textAlign = "center";
    renderCtx.textBaseline = "top";

    console.log("Rendering to", renderCanvas.width, "x", renderCanvas.height);

    // scale down the gif to fit within the max size (needs work)
    const maxSize = 10e6; // 10 MB
    const estSize = frames * renderCanvas.width * renderCanvas.height;

    console.log("Estimated size:", estSize);

    const factor = Math.max(1, Math.sqrt(estSize / maxSize));
    const newWidth = Math.floor(renderCanvas.width / factor);
    const newHeight = Math.floor(renderCanvas.height / factor);

    console.log(
        "Scaling down by a factor of",
        factor,
        "to",
        newWidth,
        "x",
        newHeight
    );

    // @ts-ignore
    let gif = new GIF({
        quality: 10,
        width: newWidth,
        height: newHeight,
        workerScript: workerUrl
    });

    let aborted = false;
    progressDialog
        .querySelector("#cancelRender")!
        .addEventListener("click", () => {
            if (gif.running) gif.abort();
            aborted = true;
            document.body.removeChild(progressDialog);
        });

    gif.on("progress", (e: number) => {
        progress.value = e;
    });

    gif.on("finished", (blob: Blob) => {
        rendering = false;
        document.body.removeChild(progressDialog);

        console.log("Final size:", blob.size);

        let file = new File([blob], "rendered.gif", { type: "image/gif" });
        uploadFile(file);
    });

    let fps = frames / duration;
	console.log("Rendering at fps:", fps);
	
    let scaledCanvas = document.createElement("canvas");
    let scaledCtx = scaledCanvas.getContext("2d")!;
    scaledCanvas.width = newWidth;
    scaledCanvas.height = newHeight;

    progressDialog.querySelector("label")!.innerHTML = "Rendering...";

    renderCtx.fillStyle = "white";
    renderCtx.fillRect(0, 0, renderCanvas.width, renderCanvas.height);

    renderCtx.font = `${fontSize}px futuraBoldCondensed`;
    renderCtx.fillStyle = "black";
    for (let i = 0; i < lines.length; i++) {
        renderCtx.fillText(
            lines[i],
            renderCanvas.width / 2,
            i * fontSize + padding
        );
    }

    const captionHeight = lines.length * fontSize + padding * 2;

    let tempC = document.createElement("canvas");
    let tempCtx = tempC.getContext("2d")!;
    let frameImageData: ImageData | undefined;
    let needsDisposal = false;

    for (let frame = 0; frame < frames; frame++) {
        if (aborted) break;

        if (needsDisposal) {
            renderCtx.clearRect(
                0,
                captionHeight,
                renderCanvas.width,
                renderCanvas.height
            );
            needsDisposal = false;
        }

        if (isVideo) {
            video!.currentTime = frame * (1 / fps) + Number.MIN_VALUE;
            await new Promise((res) =>
                video.addEventListener("seeked", res, { once: true })
            );

            renderCtx.drawImage(video!, 0, captionHeight);
        } else {
            let gifFrame = gifFrames[frame];

            if (gifFrame.disposalType == 2) {
                needsDisposal = true;
            }

            // copied from gifuct-js demo
            if (
                !frameImageData ||
                gifFrame.dims.width != frameImageData.width ||
                gifFrame.dims.height != frameImageData.height
            ) {
                tempC.width = gifFrame.dims.width;
                tempC.height = gifFrame.dims.height;
                frameImageData = tempCtx.createImageData(
                    gifFrame.dims.width,
                    gifFrame.dims.height
                );
            }

            frameImageData.data.set(gifFrame.patch);
            tempCtx.putImageData(frameImageData, 0, 0);

            renderCtx.drawImage(
                tempC,
                gifFrame.dims.left,
                gifFrame.dims.top + captionHeight
            );
        }

        scaledCtx.drawImage(renderCanvas, 0, 0, newWidth, newHeight);

        if (isVideo) {
            gif.addFrame(scaledCtx, { delay: (1 / fps) * 1000, copy: true });
        } else {
            gif.addFrame(scaledCtx, {
                delay: gifFrames[frame].delay,
                copy: true
            });
        }

        progress.value = frame / frames;
    }

    progressDialog.querySelector("label")!.innerHTML = "Encoding...";

    gif.render();
}