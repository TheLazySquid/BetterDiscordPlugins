import { Api } from "$shared/bd";
import { baseUrl } from "./fetch";

export let enabledSnippets: Record<string, boolean> = {};
let remaps: string[][] = [["AutohideSidebar", "SleepyDiscord"]];

export function setRemaps(newRemaps: string[][]) {
    remaps = newRemaps;
    Api.Data.save("remaps", remaps);
}

const loaded = new Set<string>();

function loadSnippet(name: string) {
    if(loaded.has(name)) return;
    loaded.add(name);

    const css = `@import url(${baseUrl}css/${name}.css);`;
    Api.DOM.addStyle(`sr-${name}`, css);
    Api.Logger.info(`Loading snippet ${name}`);
}

export function loadSnippets() {
    enabledSnippets = Api.Data.load("enabled") ?? {};
    remaps = Api.Data.load("remaps") ?? [];

    // Load remapped snippets separately
    const remapped = new Set<string>();
    for(const remap of remaps) {
        if(!remap.every(name => enabledSnippets[name])) continue;
        
        for(const name of remap) remapped.add(name);
        loadSnippet(remap.join("+"));
    }

    // Load non-remapped snippets
    for(const name in enabledSnippets) {
        if(!enabledSnippets[name] || remapped.has(name)) continue;

        loadSnippet(name);
    }
}

function unloadSnippet(name: string) {
    Api.DOM.removeStyle(`sr-${name}`);
    loaded.delete(name);
    Api.Logger.info(`Unloading snippet ${name}`);
}

export function unloadSnippets() {
    for(const name of loaded) {
        unloadSnippet(name);
    }
}

export function getSnippetEnabled(name: string): boolean {
    return enabledSnippets[name] ?? false;
}

export function setSnippetEnabled(name: string, enabled: boolean) {
    if(enabled) {
        enabledSnippets[name] = true;
        Api.Data.save("enabled", enabledSnippets);
        
        // Check if this snippet is now part of a remap
        for(const remap of remaps) {
            if(!remap.includes(name)) continue;
            if(!remap.every(n => enabledSnippets[n])) continue;

            // Unload the other snippets and load the remapped one
            for(const other of remap) {
                if(other === name) continue;
                unloadSnippet(other);
            }

            loadSnippet(remap.join("+"));
            return;
        }

        loadSnippet(name);
    } else {
        // Check if the snippet is part of a remap
        for(const remap of remaps) {
            if(!remap.includes(name)) continue;
            if(!remap.every(n => enabledSnippets[n])) continue;

            // Unload the remapped snippet and load the others
            unloadSnippet(remap.join("+"));

            for(const other of remap) {
                if(other === name) continue;
                loadSnippet(other);
            }

            enabledSnippets[name] = false;
            return;
        }

        enabledSnippets[name] = false;
        Api.Data.save("enabled", enabledSnippets);
        unloadSnippet(name);
    }
}