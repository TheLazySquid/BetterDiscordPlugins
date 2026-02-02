import type { GifTransform } from "./render/gifRenderer";
import futura from "$assets/Futura Condensed Extra Bold.otf";
import { addFont } from "$shared/api/fonts";
import { after } from "$shared/api/patching";
import { error } from "$shared/api/toast";
import { expressionPicker, gifDisplay } from "$shared/modules";
import captionMp4 from "./render/video";
import "./styles.css";
import captionGif from "./render/gif";
import Modal from "./ui/modal";
import { CCIcon } from "$shared/ui/icons";
import { Api } from "$shared/bd";

addFont(futura, "futuraBoldCondensed");

after(gifDisplay.prototype, "render", ({ thisVal, returnVal }) => {
	const button = BdApi.React.createElement("button", {
		className: "gc-trigger",
		onClick: (e) => {
			e.stopPropagation();

			const rawUrl = thisVal.props.src;
			const url = formatUrl(rawUrl);
			Api.Logger.info("URL formatted to", url);

			const lowerUrl = url.toLowerCase();
			const looksGif = lowerUrl.includes(".gif");
			const looksVideo = lowerUrl.includes(".mp4") || lowerUrl.includes(".webm");

			// Tenor embeds often render as GIFs in the client UI, but the underlying media is usually MP4/WebM. - Knew
			const isGif = looksVideo ? false : (looksGif ? true : thisVal.props.format === 1);

			if (isGif) {
				const image = document.createElement("img");
				image.src = url;

				image.addEventListener("load", () => {
					// For some reason the height and width change once added to the DOM.
					const { width, height } = image;
					showCaptioner(width, height, image, (transform) => {
						captionGif(url, width, height, transform).catch((err) => {
							Api.Logger.error("captionGif failed", err);
							error(`Encode failed: ${String(err?.message || err)}`);
						});
					});
				});

				image.addEventListener("error", () => error("Failed to load gif"));
			} else {
				const video = document.createElement("video");
				video.src = url;
				video.autoplay = true;
				video.loop = true;
				video.muted = true;
				video.load();

				video.addEventListener("canplaythrough", () => {
					const { videoWidth, videoHeight } = video;
					showCaptioner(videoWidth, videoHeight, video, (transform) => {
						captionMp4(url, videoWidth, videoHeight, transform).catch((err) => {
							Api.Logger.error("captionMp4 failed", err);
							error(`Encode failed: ${String(err?.message || err)}`);
						});
					});
				}, { once: true });

				video.addEventListener("error", () => error("Failed to load gif"));
			}
		}
	}, BdApi.React.createElement(CCIcon));

	returnVal.props.children.unshift(button);
});

function showCaptioner(width: number, height: number, element: HTMLElement, onConfirm: (transform: GifTransform) => void) {
	let submitCallback: () => GifTransform;

	const modal = BdApi.React.createElement(Modal, {
		width,
		height,
		element,
		onSubmit: (cb) => submitCallback = cb
	});

	BdApi.UI.showConfirmationModal("Edit GIF", modal, {
		onConfirm: () => {
			expressionPicker.close();
			const res = submitCallback?.();
			if (res) onConfirm(res);
		}
	});
}

function unwrapDiscordExternalUrl(inputUrl: string): string {
	try {
		let fixed = inputUrl;
		if (fixed.startsWith("//")) fixed = "https:" + fixed;

		const u = new URL(fixed, location.href);
		const host = u.hostname.toLowerCase();

		// Favourited Tenor links (sometimes) end up as external.discordapp.net URLs, and it is more simple to unwrap this for 'gif.ts' and 'video.ts'. - Knew
		// More clean to just not have this, but it makes things more complex ouside this code. - Knew
		if (!host.startsWith("external.") || (!host.endsWith("discordapp.net") && !host.endsWith("discordapp.com"))) return fixed;

		const httpsMarker = "/https/";
		const httpsIdx = u.pathname.indexOf(httpsMarker);
		if (httpsIdx !== -1) return "https://" + u.pathname.slice(httpsIdx + httpsMarker.length) + u.search;

		const httpMarker = "/http/";
		const httpIdx = u.pathname.indexOf(httpMarker);
		if (httpIdx !== -1) return "http://" + u.pathname.slice(httpIdx + httpMarker.length) + u.search;

		return fixed;
	} catch {
		return inputUrl;
	}
}

function formatUrl(rawUrl: string) {
	const unwrapped = unwrapDiscordExternalUrl(rawUrl);
	const url = new URL(unwrapped, location.href);

	// Prefer using Discord CDN/COM over the MEDIA/NET URL (thanks Knew)
	if (url.hostname === "media.discordapp.net") url.hostname = "cdn.discordapp.com";

	url.searchParams.delete("format");
	url.searchParams.delete("animated");
	url.searchParams.delete("width");
	url.searchParams.delete("height");
	url.searchParams.delete("quality");

	// Prefer using MP4 from Tenor for higher quality.
	// Tenor denotes this by ending the ID segment with an "o".
	if (url.hostname.endsWith("tenor.com")) {
		const path = url.pathname;
		const typeIndex = path.lastIndexOf("/") - 1;
		if (typeIndex >= 0 && typeIndex < path.length) {
			url.pathname = path.slice(0, typeIndex) + "o" + path.slice(typeIndex + 1);
		}
	}

	return url.toString();
}
