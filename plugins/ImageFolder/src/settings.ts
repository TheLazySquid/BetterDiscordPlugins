import { Api, setSettingsPanel } from "$shared/bd"

export const settings: { maxPreviewSize: number, showButton: boolean } = {
    // 12MB, slightly more than the nitroless max upload size
    maxPreviewSize: Api.Data.load("maxPreviewSize") ?? 12,
    showButton: Api.Data.load("showButton") ?? true
}

setSettingsPanel(() => BdApi.UI.buildSettingsPanel({
    settings: [
        {
            type: "number", min: 1, max: 550,
            name: "Max Preview Size (Megabytes)",
            note: "The entire item needs to be loaded into memory to be previewed, so very large previews can cause performance issues",
            value: settings.maxPreviewSize,
            id: "maxPreviewSize",
            step: 1
        },
        {
            type: "switch",
            name: "Show Image Folder Button",
            note: "The image folder tab is still accessible inside of the expression picker menu",
            value: settings.showButton,
            id: "showButton",
        }
    ],
    onChange: (_, id, value) => {
        (settings as any)[id] = value;
    }
}));