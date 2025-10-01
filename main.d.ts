declare module "*.txt" {
    const content: string;
    export default content;
}

declare module "*.svg" {
    const content: string;
    export default content;
}

declare module "*.otf" {
    const content: Uint8Array<ArrayBuffer>;
    export default content;
}

declare module "meta" {
    export const pluginName: string;
}

declare const DiscordNative: {
    clipboard: {
        copy: (text: string) => void;
        copyImage: (buffer: Uint8Array, name: string) => void;
    }
}