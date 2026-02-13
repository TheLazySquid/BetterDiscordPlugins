import "./progress.css";
import { modalMethods, Modal } from "$shared/modules";
export type Updater = (status: string, progress: number | undefined) => void;

function Progress({ onUpdater, status: initialStatus }: { onUpdater: (updater: Updater) => void, status: string }) {
    const React = BdApi.React;
    const [status, setStatus] = React.useState(initialStatus);
    const [progress, setProgress] = React.useState<number | undefined>();

    React.useEffect(() => {
        onUpdater((status, progress) => {
            setStatus(status);
            setProgress(progress);
        });
    }, []);

    return (<div className="lz-progress">
        <h2 className="lz-status">{ status }</h2>
        <progress value={progress} max={1}></progress>
    </div>)
}

export default class ProgressDisplay {
    updater?: Updater;
    modalId: string;
    onCancelCallback?: () => void;
    canceled = false;

    constructor(title: string, status: string, cancelable = false) {
        this.modalId = modalMethods.openModal((props) => (
            <Modal
                {...props}
                title={title}
                dismissable={cancelable}
                onClose={() => {
                    props.onClose();
                    this.onCancelCallback?.();
                    this.canceled = true;
                }}
            >
                <Progress
                    status={status}
                    onUpdater={(updater) => this.updater = updater}
                />
            </Modal>
        ), {
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
        modalMethods.closeModal(this.modalId);
    }
}