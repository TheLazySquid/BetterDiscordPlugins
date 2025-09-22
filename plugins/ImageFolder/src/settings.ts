import { createSettings } from "$shared/util/settings";

interface ImageFolderSettings {
    maxPreviewSize: number;
    showButton: boolean;
}

export const settings = createSettings<ImageFolderSettings>([
    {
        type: "number", min: 1, max: 550,
        name: "Max Preview Size (Megabytes)",
        note: "The entire item needs to be loaded into memory to be previewed, so very large previews can cause performance issues",
        id: "maxPreviewSize",
        step: 1
    },
    {
        type: "switch",
        name: "Show Image Folder Button",
        note: "The image folder tab is still accessible inside of the expression picker menu",
        id: "showButton"
    }
], {
    maxPreviewSize: 12,
    showButton: true
});