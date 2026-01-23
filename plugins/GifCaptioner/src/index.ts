import futura from "$assets/Futura Condensed Extra Bold.otf";
import { addFont } from "$shared/api/fonts";
import { after } from "$shared/api/patching";
import { error } from "$shared/api/toast";
import { expressionPicker, gifDisplay } from "$shared/modules";
import captionMp4 from "./render/video";
import "./styles.css";
import captionGif from "./render/gif";
import Modal from "./ui/modal";
import type { GifTransform } from "./render/gifRenderer";
import { CCIcon } from "$shared/ui/icons";

addFont(futura, "futuraBoldCondensed");

after(gifDisplay.prototype, "render", ({ thisVal, returnVal }) => {
  const button = BdApi.React.createElement("button", {
    className: "gc-trigger",
    onClick: async (e) => {
      e.stopPropagation();

      function normalizeDiscordMediaUrl(inputUrl) {
        try {
          const u = new URL(inputUrl);
          if (u.hostname === "media.discordapp.net") u.hostname = "cdn.discordapp.com";
          u.searchParams.delete("format");
          u.searchParams.delete("animated");
          u.searchParams.delete("width");
          u.searchParams.delete("height");
          u.searchParams.delete("quality");
          return u.toString();
        } catch {
          return inputUrl;
        }
      }

	// Tenor stores higher quality video versions of the GIFs in MP4. - Knew
	function preferTenorMp4(inputUrl: string) {
	  try {
		const u = new URL(inputUrl);
		const host = u.hostname.toLowerCase();
		const isTenor = host === "media.tenor.com" || host.endsWith(".tenor.com");

		if (isTenor && u.pathname.toLowerCase().endsWith(".webm")) {
		  u.pathname = u.pathname.slice(0, -5) + ".mp4";
		  return u.toString();
		}

		return inputUrl;
	  } catch {
		return inputUrl;
	  }
	}
	
	// Favourited Tenor links end up using external.discordapp.net links. Less complications will arise if reverted. - Knew
	function unwrapDiscordExternalUrl(inputUrl: string) {
	  try {
		const u = new URL(inputUrl);
		if (!u.hostname.endsWith("discordapp.net")) return inputUrl;

		const marker = "/https/";
		const idx = u.pathname.indexOf(marker);
		if (idx !== -1) return "https://" + u.pathname.slice(idx + marker.length) + u.search;

		const marker2 = "/http/";
		const idx2 = u.pathname.indexOf(marker2);
		if (idx2 !== -1) return "http://" + u.pathname.slice(idx2 + marker2.length) + u.search;

		return inputUrl;
	  } catch {
		return inputUrl;
	  }
	}

      const preflightFetchOrThrow = async (checkUrl, stage) => {
        try {
		  //console.log("[GifCaptioner] preflight fetch:", { stage, checkUrl });
          const res = await BdApi.Net.fetch(checkUrl, {
            method: "GET",
            redirect: "follow",
            maxRedirects: 5,
            timeout: 30_000,
            headers: {
              "Accept": "*/*",
              "Range": "bytes=0-2047"
            }
          });

          // Some environments expose `res.ok`; some don't. - Knew
          if (typeof res.status === "number" && (res.status < 200 || res.status >= 300)) {
            throw new Error(`HTTP ${res.status} ${res.statusText || ""}`.trim());
          }

          const contentType = (res.headers?.get?.("content-type") || "").toLowerCase();
		  //console.log("[GifCaptioner] preflight result:", { stage, checkUrl, finalUrl: res.url || checkUrl, status: res.status, contentType });
          return { finalUrl: res.url || checkUrl, contentType, status: res.status };
        } catch (err) {
          console.error(`[GifCaptioner] ${stage} preflight fetch failed:`, checkUrl, err);
          throw err;
        }
      };

	let url = thisVal.props.src;
	url = unwrapDiscordExternalUrl(url);
	if (url.startsWith("//")) url = url.replace("//", "https://");

      let resolved;
      try {
		async function resolveMediaUrl(inputUrl: string) {
		  const candidates = [preferTenorMp4(inputUrl), inputUrl].filter(
			(v, i, a) => a.indexOf(v) === i
		  );

		  let lastErr: any = null;

		  for (const candidate of candidates) {
			try {
			  console.log("[GifCaptioner] resolveMediaUrl fetch:", candidate);

			  const res = await BdApi.Net.fetch(candidate, {
				method: "GET",
				redirect: "follow",
				maxRedirects: 5,
				timeout: 30_000,
				headers: { Accept: "*/*" }
			  });

			  const finalUrl = (res as any).url || candidate;
			  const ct = (res.headers?.get?.("content-type") || "").toLowerCase();

			  if (!ct.includes("text/html")) {
				return { url: finalUrl, contentType: ct };
			  }

			  lastErr = new Error("Resolved to HTML page, not direct media.");
			} catch (e) {
			  lastErr = e;
			  console.error("[GifCaptioner] Net.fetch failed:", e);
			  if (String((e as any)?.message || e).includes("unable to verify the first certificate")) {
				throw new Error("TLS certificate verification failed (system/proxy/AV issue).");
			  }
			}
		  }

		  throw lastErr ?? new Error("Failed to resolve media URL.");
		}

        resolved = await resolveMediaUrl(url);
      } catch (e2) {
        console.error("[GifCaptioner] resolveMediaUrl failed:", e2);
        error(`Failed to resolve media URL: ${String(e2?.message || e2)}`);
        return;
      }

      let pf;
      try {
        const normalized = normalizeDiscordMediaUrl(resolved.url);
        pf = await preflightFetchOrThrow(normalized, "Media");
      } catch (e4) {
        error(`Fetch failed before editor: ${String(e4?.message || e4)}`);
        return;
      }

      url = normalizeDiscordMediaUrl(pf.finalUrl);

	  // Would be interesting if this ever gets triggered. - Knew
      if (pf.contentType.includes("text/html")) {
        console.warn("[GifCaptioner] Refusing HTML page URL (not direct media):", url, pf.contentType);
        error("This link is a web page, not a direct GIF/video URL.");
        return;
      }

      const ct = (pf.contentType || resolved?.contentType || "").toLowerCase();

      const isGif =
        pf.contentType.includes("image/gif") ||
        /\.gif(\?|$)/i.test(url);

      const isVideo =
        ct.startsWith("video/") ||
        /\.(mp4|webm)(\?|$)/i.test(url);
		//console.log("[GifCaptioner] final media type:", { isGif, isVideo, ct });
		

      if (!isGif && !isVideo) {
        console.error("[GifCaptioner] Unsupported media type:", { url, contentType: ct });
        error(`Unsupported media type for captioning: ${ct || "unknown"}.`);
        return;
      }

      if (isGif) {
        let image = document.createElement("img");
        image.src = url;
        image.addEventListener("load", () => {
          let { width, height } = image;
          showCaptioner(width, height, image, (transform) => {
			console.log("[GifCaptioner] encode url:", url);
            captionGif(url, width, height, transform).catch((err) => {
              console.error("[GifCaptioner] captionGif (encode) failed:", { url, err });
              error(`Encode failed: ${String(err?.message || err)}`);
            });
          });
        });
        image.addEventListener("error", (ev) => {
          console.error("[GifCaptioner] Preview image failed to load:", url, ev);
          error("Failed to load gif");
        });
      } else {
        // isVideo
        let video = document.createElement("video");
        video.src = url;
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.load();
        video.addEventListener(
          "canplaythrough",
          () => {
            let { videoWidth, videoHeight } = video;
            showCaptioner(videoWidth, videoHeight, video, (transform) => {
              captionMp4(url, videoWidth, videoHeight, transform).catch((err) => {
                console.error("[GifCaptioner] captionMp4 (encode) failed:", { url, err });
                error(`Encode failed: ${String(err?.message || err)}`);
              });
            });
          },
          { once: true }
        );
        video.addEventListener("error", (ev) => {
          console.error("[GifCaptioner] Preview video failed to load:", url, ev);
          error("Failed to load gif");
        });
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
            let res = submitCallback?.();
            if(res) onConfirm(res);
        }
    });
}
