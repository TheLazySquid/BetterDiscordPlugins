export interface Folder {
    // object rather than a string so it's easier to potentially add renaming and maybe icons in the future
    name: string;
}

export interface Media {
    name: string;
    type: "image" | "audio" | "video";
    mime: string;
    size: number;
    lastUsed: number;
}

export interface DirContents {
    folders: Folder[];
    media: Media[];
}