declare module "*.txt" {
    const content: string;
    export default content;
}

declare module "*.svg" {
    const content: string;
    export default content;
}

declare module "*.otf" {
    const content: Uint8Array;
    export default content;
}

declare module "meta" {
    export const pluginName: string;
}