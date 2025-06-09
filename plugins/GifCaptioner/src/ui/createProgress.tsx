import { ModalSystem, Modal } from "$shared/modules";
import Progress, { type Updater } from "./progress";

export default class ProgressDisplay {
    updater?: Updater;
    modalId: string;

    constructor(status: string) {
        this.modalId = ModalSystem.open((props: any) => {
            return (<Modal.Root size="dynamic" {...props}>
                <Modal.Content>
                    <Progress status={status} onUpdater={(updater) => this.updater = updater} />
                </Modal.Content>
            </Modal.Root>)
        }, {
            onCloseRequest: () => false
        });
    }

    update(status: string, progress?: number) {
        if(!this.updater) return;
        this.updater(status, progress);
    }

    close() {
        ModalSystem.close(this.modalId);
    }
}