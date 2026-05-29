import { Api, onStart, onStop } from "$shared/bd";
import { pluginName } from "meta";

let count = 0;

export function addStyle(css: string) {
	let styleId = count++;
	onStart(() => {
		Api.DOM.addStyle(`${pluginName}-${styleId}`, css);
	});
}

onStop(() => {
	for(let i = 0; i < count; i++) {
		Api.DOM.removeStyle(`${pluginName}-${i}`);
	}
});