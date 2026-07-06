import { Api, onStop } from "$shared/bd";
import { settings } from "./settings";

export function updateRows() {
    const css = `.mqr-reacts-grid { grid-template-rows: repeat(${settings.rows}, 1fr) }`;

    Api.DOM.addStyle("mqr-rows", css);
}

onStop(() => Api.DOM.removeStyle("mqr-rows"));