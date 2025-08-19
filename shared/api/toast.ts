import { pluginName } from "meta";

export function success(message: string, showName = true) {
	if(showName) BdApi.UI.showToast(`${pluginName}: ${message}`, { type: "success" });
	else BdApi.UI.showToast(message, { type: "success" });
}

export function warning(message: string, showName = true) {
	if(showName) BdApi.UI.showToast(`${pluginName}: ${message}`, { type: "warning" });
	else BdApi.UI.showToast(message, { type: "warning" });
}

export function error(message: string, showName = true) {
	if(showName) BdApi.UI.showToast(`${pluginName}: ${message}`, { type: "error" });
	else BdApi.UI.showToast(message, { type: "error" });
}