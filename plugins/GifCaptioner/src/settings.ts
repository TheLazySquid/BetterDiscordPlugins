export const settings: Record<string, any> = {
    autoSend: BdApi.Data.load("GifCaptioner", "autoSend") ?? true
}

export function createSettings() {
    return BdApi.UI.buildSettingsPanel({
        settings: [
            {
                type: "switch", id: "autoSend", value: settings.autoSend,
                name: "Automatically send gifs after rendering?",
                note: ""
            }
        ],
        onChange: (_, id: string, value: any) => {
            settings[id] = value;
            BdApi.Data.save("GifCaptioner", id, value);
        }
    });
}