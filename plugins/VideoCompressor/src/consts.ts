import type { ImageCompressValues, VideoCompressValues } from "./types";
import { QUALITY_VERY_LOW, QUALITY_LOW, QUALITY_MEDIUM, QUALITY_HIGH } from "mediabunny";

export const defaultVideoValues: VideoCompressValues = {
    resolutionFactor: 1,
    fpsFactor: 1,
    quality: "UNCHANGED"
};

export const defaultImageValues: ImageCompressValues = {
    resolutionFactor: 1,
    quality: 1
};

export const qualities = {
    UNCHANGED: { bitrate: undefined, factor: 1 },
    VERY_LOW: { bitrate: QUALITY_VERY_LOW, factor: 0.25 },
    LOW: { bitrate: QUALITY_LOW, factor: 0.5 },
    MEDIUM: { bitrate: QUALITY_MEDIUM, factor: 0.75 },
    HIGH: { bitrate: QUALITY_HIGH, factor: 1 }
};

export const qualityOptions = [
    { label: "Unchanged", value: "UNCHANGED" },
    { label: "Very Low", value: "VERY_LOW" },
    { label: "Low", value: "LOW" },
    { label: "Medium", value: "MEDIUM" },
    { label: "High", value: "HIGH" }
];

const mb = 1024 * 1024;
export function formatSize(bytes: number) {
    return (bytes / mb).toFixed(2) + " MB";
}