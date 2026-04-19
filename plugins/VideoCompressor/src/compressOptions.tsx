import { qualities, qualityOptions, type CompressValues } from "./consts";

const mb = 1024 * 1024;
function formatSize(bytes: number) {
    return (bytes / mb).toFixed(2) + " MB";
}

interface CompressOptionsProps {
    fullSize: number;
    maxSize: number;
    values: CompressValues;
    onChange: (values: CompressValues) => void;
}

export default function CompressOptions({ fullSize, maxSize, onChange, values }: CompressOptionsProps) {
    const React = BdApi.React;
    const [resolutionFactor, setResolutionFactor] = React.useState(values.resolutionFactor);
    const [fpsFactor, setFpsFactor] = React.useState(values.fpsFactor);
    const [quality, setQuality] = React.useState(values.quality);

    const [newSize, setNewSize] = React.useState(fullSize);
    React.useEffect(() => {
        let size = fullSize * fpsFactor * resolutionFactor ** 2 * qualities[quality].factor;
        setNewSize(size);
        onChange({ resolutionFactor, fpsFactor, quality });
    }, [resolutionFactor, fpsFactor, quality]);

    return (
        <div className="vc-options">
            <div className="estimate">
                Rough Size Estimate:
                <span className={newSize > maxSize ? "big" : "small"}>{formatSize(newSize)}</span>
                / {formatSize(maxSize)}
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