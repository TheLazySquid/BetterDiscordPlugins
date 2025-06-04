export type Updater = (status: string, progress: number | undefined) => void;

export default function Progress({ onUpdater, status: initialStatus }:
    { onUpdater: (updater: Updater) => void, status: string }) {
    const React = BdApi.React;
    const [status, setStatus] = React.useState(initialStatus);
    const [progress, setProgress] = React.useState<number | undefined>();

    React.useEffect(() => {
        onUpdater((status, progress) => {
            setStatus(status);
            setProgress(progress);
        });
    }, []);

    return (<div className="gc-progress">
        <h2 className="gc-status">{ status }</h2>
        <progress value={progress} max={1}></progress>
    </div>)
}