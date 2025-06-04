import { pluginName } from "meta";

export function success(message: string) {
	BdApi.UI.showToast(`${pluginName}: ${message}`, { type: "success" });
}

export function error(message: string) {
	BdApi.UI.showToast(`${pluginName}: ${message}`, { type: "error" });
}