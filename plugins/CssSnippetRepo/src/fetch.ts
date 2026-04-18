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
let lastResponse: SnippetsResponse | null = null;
const cacheDuration = 1000 * 60 * 30; // 30 minutes

export async function fetchSnippets(): Promise<SnippetsResponse> {
    const now = Date.now();
    if(now - lastFetch < cacheDuration && lastResponse) {
        return lastResponse;
    }

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

    setRemaps(snippets.remaps);

    lastResponse = snippets;
    lastFetch = now;
    return snippets;
}
