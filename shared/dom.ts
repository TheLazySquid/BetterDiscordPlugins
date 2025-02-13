import { onStart, onStop } from "./bdFuncs.ts";

/**
 * Watches for an element with a given selector to be added to the DOM
 * @param selector The CSS selector to watch
 * @param callback The callback to run whenever the matching element is added to the DOM
 * @returns A function to stop watching
 */
export function watchElement(
    selector: string,
    callback: (element: Element) => void
) {
    let observer = new MutationObserver((mutations) => {
        for (let i = 0; i < mutations.length; i++) {
            let mutation = mutations[i];
            if (mutation.addedNodes.length) {
                for (let node of mutation.addedNodes) {
                    if (!(node instanceof HTMLElement)) continue;

                    if (node.matches?.(selector)) {
                        callback(node);
                    }

                    if (node.querySelectorAll) {
                        for (let element of node.querySelectorAll(selector)) {
                            callback(element);
                        }
                    }
                }
            }
        }
    });

    let startDispose = onStart(() => {
        observer.observe(document.body, { childList: true, subtree: true });

        for (let element of document.querySelectorAll(selector)) {
            callback(element);
        }
    });

    let stopDispose = onStop(() => {
        observer.disconnect();
    });

    return () => {
        observer.disconnect();
        startDispose();
        stopDispose();
    };
}
