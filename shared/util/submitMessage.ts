import { afterClass } from "$shared/api/patching";
import { error } from "$shared/api/toast";
import { editorEvents } from "$shared/modules";

let submit: (() => void) | null = null;
afterClass(...editorEvents, (instance) => {
    submit = instance.submit.bind(instance);
});

export function submitMessage() {
    if(!submit) {
        error("Could not send message, try switching channels");
        return;
    }

    submit();
}