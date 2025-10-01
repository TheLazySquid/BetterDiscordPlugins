declare let plugin: any;
import type { ReactElement } from "react";
import { pluginName } from "meta";

export const Api = new BdApi(pluginName);

interface Callback {
    callback: () => void;
    once?: boolean;
}

const createCallbackHandler = (callbackName: string) => {
    let callbacks: Callback[] = [];

    plugin[callbackName] = () => {
        for (let i = 0; i < callbacks.length; i++) {
            callbacks[i].callback();
            if(callbacks[i].once) {
                callbacks.splice(i, 1);
                i--;
            }
        }
    }

    return (callback: () => void, once?: boolean) => {
        callbacks.push({ callback, once });
    }
}

/**
 * Takes a callback and fires it when the plugin is started
 * @param callback - The callback to be fired
 * @param once - If true, the callback will be deleted after use
 */
export const onStart = createCallbackHandler("start");
/**
 * Takes a callback and fires it when the plugin is stopped
 * @param callback - The callback to be fired
 * @param once - If true, the callback will be deleted after use
 */
export const onStop = createCallbackHandler("stop");
/**
 * Takes a callback and fires it when the user navigates
 * @param callback - The callback to be fired
 * @param once - If true, the callback will be deleted after use
 */
export const onSwitch = createCallbackHandler("onSwitch");

type El = HTMLElement | ReactElement;
/**
 * Sets the settings panel to an HTML or React element
 * @param el - The element to be rendered in the settings panel
 */
export function setSettingsPanel(el: El): void;
export function setSettingsPanel(fn: () => El): void;
export function setSettingsPanel(el: El | (() => El)): void {
    if(typeof el === "function") plugin.getSettingsPanel = el;
    plugin.getSettingsPanel = () => el;
}

export function expose(key: string, value: any): void {
    plugin[key] = value;
}