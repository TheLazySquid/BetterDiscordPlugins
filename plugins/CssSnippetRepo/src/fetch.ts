export interface Snippet {
    name: string;
    description: string[];
    author: string;
    preview?: string;
    type: string;
}

export const baseUrl = "https://thelazysquid.github.io/DiscordCssSnippets/";

export const categoryNames: Record<string, string> = {
    declutter: "Declutter",
    improvement: "Improvement"
};

export async function fetchSnippets(): Promise<Snippet[]> {
    const url = `${baseUrl}snippets.json`;
    const res = await fetch(url);
    return res.json();
}
