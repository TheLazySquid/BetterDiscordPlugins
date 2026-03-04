import type { VideoCodec } from "mediabunny";
import { createSettings } from "$shared/util/settings";

interface VideoCompressorSettings {
    codec: VideoCodec;
}

export const settings = createSettings<VideoCompressorSettings>([
    // @ts-expect-error types are incorrect
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
    }
], {
    codec: "av1"
});