import "./styles.css";
import { onStart, onStop, setSettingsPanel } from "$shared/bd";
import Snippets from "./ui/Snippets";
import { loadSnippets, unloadSnippets } from "./snippets";
import { before } from "$shared/api/patching";
import { Modal, modalMethods, toolbar, toolbarClass } from "$shared/modules";
import { forceUpdate } from "$shared/util/react";
import { LucideIcon } from "$shared/ui/icons";
import { Palette } from "lucide";

setSettingsPanel(() => <Snippets />);

onStop(() => {
    unloadSnippets();
    forceUpdate("." + toolbarClass);
});

onStart(() => {
    loadSnippets();
    forceUpdate("." + toolbarClass);
});

before(...toolbar, ({ args }) => {
    const element = (
        <div className="sr-toolbar-button" onClick={openSettings}>
            <LucideIcon icon={Palette} size={18} />
        </div>
    );

    args[0]?.trailing?.props?.children?.splice(3, 0, element);
});

function openSettings() {
    modalMethods.openModal((props) => (
        <Modal
            {...props}
            title="CSS Snippets"
            size="xl"
        >
            <Snippets />
        </Modal>
    ));
}