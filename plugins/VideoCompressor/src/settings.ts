import type { VideoCodec } from "mediabunny";
import { createSettings } from "$shared/util/settings";

interface VideoCompressorSettings {
    codec: VideoCodec;
    convertUnembeddable: boolean
}

export const settings = createSettings<VideoCompressorSettings>([
    {
        type: "radio",
        id: "codec",
        name: "Output Video Codec",
        options: [
            {
                name: "AV1",
                description: "Best compression, may not play on older devices",
                value: "av1"
            },
            {
                name: "HEVC",
                description: "Good compression, widely supported",
                value: "hevc"
            }
        ]
    },
    {
        type: "switch",
        id: "convertUnembeddable",
        name: "Convert mkv to mp4",
        note: "Discord cannot embed mkv videos by default. Enabling this will open a popup allowing you to convert them to mp4."
    }
], {
    codec: "av1",
    convertUnembeddable: false
});