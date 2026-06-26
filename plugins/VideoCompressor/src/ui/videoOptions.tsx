import { formatSize, qualities, qualityOptions } from "../consts";
import type { VideoItem } from "../types";

export default function VideoOptions({ item }: { item: VideoItem }) {
    const React = BdApi.React;
    const [resolutionFactor, setResolutionFactor] = React.useState(item.values.resolutionFactor);
    const [fpsFactor, setFpsFactor] = React.useState(item.values.fpsFactor);
    const [quality, setQuality] = React.useState(item.values.quality);
    const [newSize, setNewSize] = React.useState(item.fullSize);

    React.useEffect(() => { item.values.resolutionFactor = resolutionFactor }, [resolutionFactor]);
    React.useEffect(() => { item.values.fpsFactor = fpsFactor }, [fpsFactor]);
    React.useEffect(() => { item.values.quality = quality }, [quality]);

    React.useEffect(() => {
        let size = item.fullSize * fpsFactor * resolutionFactor ** 2 * qualities[quality].factor;
        setNewSize(size);
    }, [resolutionFactor, fpsFactor, quality]);

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

            <div>FPS: {Math.floor(fpsFactor * 100)}%</div>
            <input type="range" value={fpsFactor} min={0.1} max={1} step={0.01}
                onChange={(e) => setFpsFactor(parseFloat(e.target.value))}></input>

            <div>Video quality:</div>
            <BdApi.Components.DropdownInput options={qualityOptions} value={quality} onChange={setQuality} />
        </div>
    )
}