import { Api, setSettingsPanel } from "$shared/bd";

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
type SettingDescriptor = UnionOmit<BetterDiscord.Setting, "value">;
type ChangeCallback = (value: any) => void;
type SettingsValue<T> = T & {
    onChange(id: string, callback: ChangeCallback): void;
}

export function createSettings<T extends Record<string, any>>(panelSettings: SettingDescriptor[], defaults: T): SettingsValue<T> {
    const settings: Record<string, any> = {};
    
    // Load or apply default
    for(let setting of panelSettings) {
        if(!setting.id) continue;
        settings[setting.id] = Api.Data.load(setting.id) ?? defaults[setting.id];
    }

    const onChangeCallbacks: Record<string, ChangeCallback[]> = {};
    
    setSettingsPanel(() => {
        for(let setting of panelSettings) {
            (setting as BetterDiscord.Setting).value = settings[setting.id];
        }

        return BdApi.UI.buildSettingsPanel({
            settings: panelSettings as BetterDiscord.Setting[],
            onChange: (_, id, value) => {
                settings[id] = value;
                Api.Data.save(id, value);
                onChangeCallbacks[id]?.forEach(cb => cb(value));
            }
        });
    });

    (settings as SettingsValue<T>).onChange = (id: string, callback: ChangeCallback) => {
        onChangeCallbacks[id] ??= [];
        onChangeCallbacks[id].push(callback);
    }

    return settings as SettingsValue<T>;
}