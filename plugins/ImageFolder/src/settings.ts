import type { sortType } from "./types";
import { setSettingsPanel } from "$shared/bdFuncs";

export const settings: { rerender: boolean, sortBy: sortType, showButton: boolean } = {
    rerender: BdApi.Data.load("ImageFolder", "rerender") ?? true,
    sortBy: BdApi.Data.load("ImageFolder", "sorting") ?? "lastSent",
    showButton: BdApi.Data.load("ImageFolder", "showButton") ?? true
}

export function setup() {
    setSettingsPanel(() => BdApi.UI.buildSettingsPanel({
        settings: [
            {
                type: "dropdown", id: "sortBy", value: settings.sortBy,
                name: "Image Sorting",
                note: "",
                options: [
                    { label: "Sort by last sent", value: "lastSent" },
                    { label: "Sort alphabetically", value: "name" },
                    { label: "Sort by last modified", value: "lastModified" }
                ]
            },
            {
                type: "switch", id: "rerender", value: settings.rerender,
                name: "Re-render images as PNG before sending?",
                note: "This will allow you to send AVIFs and sequenced WebPs (albeit without animation) and have them properly embed"
            },
            {
                type: "switch", id: "showButton", value: settings.showButton,
                name: "Show image folder button?",
                note: "The image folder tab is still accessible inside of the expression picker menu"
            }
        ],
        onChange: (_: any, id: string, value: any) => {
            BdApi.Data.save("ImageFolder", id, value);
            (settings as any)[id] = value;
        }
    }));
}