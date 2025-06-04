import { Modals } from "$shared/modules";
import Progress, { type Updater } from "./progress";

export default class ProgressDisplay {
    updater?: Updater;
    modalId: string;

    constructor(status: string) {
        this.modalId = Modals.open(() => {
            return BdApi.React.createElement(Progress, {
                status,
                onUpdater: (updater) => this.updater = updater 
            });
        }, {
            onCloseRequest: () => false
        });
    }

    update(status: string, progress?: number) {
        if(!this.updater) return;
        this.updater(status, progress);
    }

    close() {
        Modals.close(this.modalId);
    }
}