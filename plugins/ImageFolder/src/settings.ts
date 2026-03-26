import { createSettings } from "$shared/util/settings";

interface ImageFolderSettings {
    maxPreviewSize: number;
    showButton: boolean;
    autoSend: boolean;
}

export const settings = createSettings<ImageFolderSettings>([
    {
        type: "number", min: 1, max: 550,
        name: "Max preview size (megabytes)",
        note: "The entire item needs to be loaded into memory to be previewed, so very large previews can cause performance issues",
        id: "maxPreviewSize",
        step: 1
    },
    {
        type: "switch",
        name: "Show image folder button",
        note: "The image folder tab is still accessible inside of the expression picker menu",
        id: "showButton"
    },
    {
        type: "switch",
        name: "Immediately send files",
        note: "Files will only be attached and can be sent manually later if disabled",
        id: "autoSend"
    }
], {
    maxPreviewSize: 12,
    showButton: true,
    autoSend: true
});