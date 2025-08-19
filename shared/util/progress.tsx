import { ModalSystem, Modal } from "$shared/modules";
export type Updater = (status: string, progress: number | undefined) => void;

function Progress({ onUpdater, status: initialStatus, cancelable }:
    { onUpdater: (updater: Updater) => void, status: string, cancelable: boolean }) {
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

export default class ProgressDisplay {
    updater?: Updater;
    modalId: string;
    onCancelCallback?: () => void;
    canceled = false;

    constructor(status: string, cancelable = false) {
        this.modalId = ModalSystem.open((props: any) => {
            return (<Modal.Root size="dynamic" {...props}>
                <Modal.Content>
                    { cancelable ? (
                        <div style={{ position: "absolute", top: "10px", right: "10px" }}>
                            <Modal.Close onClick={() => {
                                this.close();
                                this.onCancelCallback?.();
                                this.canceled = true;
                            }} />
                        </div>
                    ) : null }
                    <Progress
                        status={status}
                        onUpdater={(updater) => this.updater = updater}
                        cancelable={cancelable}
                    />
                </Modal.Content>
            </Modal.Root>)
        }, {
            onCloseRequest: () => false
        });
    }

    onCancel(callback: () => void) {
        this.onCancelCallback = callback;
    }

    update(status: string, progress?: number) {
        if(!this.updater) return;
        this.updater(status, progress);
    }

    close() {
        ModalSystem.close(this.modalId);
    }
}