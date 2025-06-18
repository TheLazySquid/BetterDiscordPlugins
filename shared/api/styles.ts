import { Api, onStart, onStop } from "$shared/bd";
import { pluginName } from "meta";

let count = 0;

export function addStyle(css: string) {
	onStart(() => {
		Api.DOM.addStyle(`${pluginName}-${count++}`, css);
	});
}

onStop(() => {
	for(let i = 0; i < count; i++) {
		Api.DOM.removeStyle(`${pluginName}-${i}`);
	}
});