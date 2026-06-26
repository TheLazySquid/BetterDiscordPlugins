export type Quality = "VERY_LOW" | "LOW" | "MEDIUM" | "HIGH" | "UNCHANGED";

export interface VideoCompressValues {
    resolutionFactor: number;
    fpsFactor: number;
    quality: Quality;
}

export interface ImageCompressValues {
    resolutionFactor: number;
    quality: number;
}

export type Attach = (file: File) => void;

export interface BaseItem {
    file: File;
    fullSize: number;
    maxSize: number;
    attach: Attach;
}

export interface VideoItem extends BaseItem {
    type: "video";
    values: VideoCompressValues;
}

export interface ImageItem extends BaseItem {
    type: "image";
    values: ImageCompressValues;
}

export type MediaItem = VideoItem | ImageItem;