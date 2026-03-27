export interface Snippet {
    name: string;
    description: string[];
    author: string;
    preview?: string;
    category: string;
}

export const baseUrl = "https://thelazysquid.github.io/DiscordCssSnippets/";

export const categoryOrder = [
    "Declutter",
    "Improvement",
    "Stylize"
]

let lastFetch = 0;
let cachedSnippets: Snippet[] = [];
const cacheDuration = 1000 * 60 * 30; // 30 minutes

export async function fetchSnippets(): Promise<Snippet[]> {
    const now = Date.now();
    if(now - lastFetch < cacheDuration && cachedSnippets.length > 0) {
        return cachedSnippets;
    }

    const url = `${baseUrl}snippets.json`;
    const res = await fetch(url);
    const snippets = await res.json() as Snippet[];

    cachedSnippets = snippets;
    lastFetch = now;
    return snippets;
}
