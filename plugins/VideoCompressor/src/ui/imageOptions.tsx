import type { ImageItem } from "../types";

const mb = 1024 * 1024;
function formatSize(bytes: number) {
    return (bytes / mb).toFixed(2) + " MB";
}

export default function ImageOptions({ item }: { item: ImageItem }) {
    const React = BdApi.React;
    const [resolutionFactor, setResolutionFactor] = React.useState(item.values.resolutionFactor);
    const [quality, setQuality] = React.useState(item.values.quality);
    const [newSize, setNewSize] = React.useState(item.fullSize);

    React.useEffect(() => { item.values.resolutionFactor = resolutionFactor }, [resolutionFactor]);
    React.useEffect(() => { item.values.quality = quality }, [quality]);

    React.useEffect(() => {
        // Surprisingly the quality value seems to scale close to linearly with size
        let size = item.fullSize * resolutionFactor ** 2 * quality;
        setNewSize(size);
    }, [resolutionFactor, quality]);

    return (
        <div className="vc-options">
            <div className="estimate">
                Rough Size Estimate:
                <span className={newSize > item.maxSize ? "big" : "small"}>{formatSize(newSize)}</span>
                / {formatSize(item.maxSize)}
            </div>

            <div>Resolution: {Math.floor(resolutionFactor * 100)}%</div>
            <input type="range" value={resolutionFactor} min={0.1} max={1} step={0.01}
                onChange={(e) => setResolutionFactor(parseFloat(e.target.value))}></input>

            <div>Quality: {Math.floor(quality * 100)}%</div>
            <input type="range" value={quality} min={0.1} max={1} step={0.01}
                onChange={(e) => setQuality(parseFloat(e.target.value))}></input>
        </div>
    )
}