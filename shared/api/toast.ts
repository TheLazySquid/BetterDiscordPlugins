export function success(message: string) {
	BdApi.UI.showToast(message, { type: "success" });
}

export function warning(message: string) {
	BdApi.UI.showToast(message, { type: "warning" });
}

export function error(message: string) {
	BdApi.UI.showToast(message, { type: "error" });
}