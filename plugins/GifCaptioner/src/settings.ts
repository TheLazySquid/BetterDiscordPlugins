import { createSettings } from "$shared/util/settings";

interface GifCaptionerSettings {
    autoSend: boolean;
}

export const settings = createSettings<GifCaptionerSettings>([
    {
        type: "switch",
        name: "Immediately send files",
        note: "Files will only be attached and can be sent manually later if disabled",
        id: "autoSend"
    }
], {
    autoSend: true
});