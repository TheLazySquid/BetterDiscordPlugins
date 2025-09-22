import type { Setting } from "betterdiscord";
import { Api, setSettingsPanel } from "$shared/bd";

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
type SettingDescriptor = UnionOmit<Setting, "value">;

export function createSettings<T extends Record<string, any>>(panelSettings: SettingDescriptor[], defaults: T): T {
    const settings: Record<string, any> = {};
    
    // Load or apply default
    for(let setting of panelSettings) {
        if(!setting.id) continue;
        settings[setting.id] = Api.Data.load(setting.id) ?? defaults[setting.id];
    }
    
    setSettingsPanel(() => {
        for(let setting of panelSettings) {
            (setting as any).value = settings[setting.id];
        }

        return BdApi.UI.buildSettingsPanel({
            settings: panelSettings as Setting[],
            onChange: (_, id, value) => {
                settings[id] = value;
                Api.Data.save(id, value);
            }
        });
    });

    return settings as T;
}