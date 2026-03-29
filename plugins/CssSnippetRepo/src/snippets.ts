import { Api } from "$shared/bd";
import { baseUrl } from "./fetch";

export let enabledSnippets: Record<string, boolean> = {};
export function loadSnippets() {
    enabledSnippets = Api.Data.load("enabled") ?? {};

    for(const name in enabledSnippets) {
        if(!enabledSnippets[name]) continue;

        const css = `@import url(${baseUrl}css/${name}.css);`;
        Api.DOM.addStyle(`sr-${name}`, css);
    }
}

export function unloadSnippets() {
    for(const name in enabledSnippets) {
        if(!enabledSnippets[name]) continue;

        Api.DOM.removeStyle(`sr-${name}`);
    }
}

export function getSnippetEnabled(name: string): boolean {
    return enabledSnippets[name] ?? false;
}

export function setSnippetEnabled(name: string, enabled: boolean) {
    enabledSnippets[name] = enabled;
    Api.Data.save("enabled", enabledSnippets);

    if(enabled) {
        const css = `@import url(${baseUrl}css/${name}.css);`;
        Api.DOM.addStyle(`sr-${name}`, css);
    } else {
        Api.DOM.removeStyle(`sr-${name}`);
    }
}