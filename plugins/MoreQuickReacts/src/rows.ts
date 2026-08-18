import { Api, onStop } from "$shared/bd";
import { settings } from "./settings";

export function updateRows() {
    const columns = Math.ceil(settings.amount / settings.rows);
    const css = `.mqr-reacts-grid { grid-template-columns: repeat(${columns}, 1fr) }`;

    Api.DOM.addStyle("mqr-rows", css);
}

onStop(() => Api.DOM.removeStyle("mqr-rows"));