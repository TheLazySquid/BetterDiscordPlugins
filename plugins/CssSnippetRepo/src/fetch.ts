import { Api } from "$shared/bd";
import { setRemaps } from "./snippets";

export interface Snippet {
    name: string;
    description: string[];
    author: string;
    preview?: string;
    category: string;
}

export interface SnippetsResponse {
    snippets: Snippet[];
    remaps: string[][];
}

export const baseUrl = "https://thelazysquid.github.io/DiscordCssSnippets/";

export const categoryOrder = [
    "Declutter",
    "Improvement",
    "Stylize"
]

let lastFetch = 0;
let lastRequest: Promise<SnippetsResponse> | null = null;
const cacheDuration = 1000 * 60 * 30; // 30 minutes

export async function fetchSnippets(): Promise<SnippetsResponse> {
    const now = Date.now();
    if(now - lastFetch < cacheDuration && lastRequest) {
        return lastRequest;
    }

    const { promise, resolve } = Promise.withResolvers<SnippetsResponse>();

    // Fetch snippets.json
    const url = `${baseUrl}snippets.json`;
    const res = await fetch(url);
    const response = await res.json();

    // For a little backwards compatibility
    let snippets: SnippetsResponse;
    if(Array.isArray(response)) {
        snippets = {
            snippets: response,
            remaps: []
        }
    } else {
        snippets = response;
    }
    
    lastRequest = promise;
    lastFetch = now;
    setRemaps(snippets.remaps);
    resolve(snippets);

    return promise;
}
