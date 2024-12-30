declare let plugin: any;
import type { ReactElement } from "npm:@types/react";

const createCallbackHandler = (callbackName: string) => {
    const fullName = callbackName + "Callbacks";
    plugin[fullName] = [];

    plugin[callbackName] = () => {
        for (let i = 0; i < plugin[fullName].length; i++) {
            plugin[fullName][i].callback();
        }
    }

    return (callback: () => void, once?: boolean, id?: string): (() => void) => {
        let object: { callback: () => void, id?: string } = { callback };

        const delCallback = () => {
            plugin[fullName].splice(plugin[fullName].indexOf(object), 1);
        }
        
        // if once is true delete it after use
        if (once === true) {
            object.callback = () => {
                callback();
                delCallback();
            }
        }

        if(id) {
            object.id = id;

            for(let i = 0; i < plugin[fullName].length; i++) {
                if(plugin[fullName][i].id === id) {
                    plugin[fullName][i] = object;
                    return delCallback;
                }
            }
        }

        plugin[fullName].push(object);
        return delCallback;
    }
}

/**
 * Takes a callback and fires it when the plugin is started
 * @param callback - The callback to be fired
 * @param once - If true, the callback will be deleted after use
 * @param id - The id of the callback - if it already exists, it will be replaced
 * @returns A function to delete the callback
 */
export const onStart = createCallbackHandler("start");
/**
 * Takes a callback and fires it when the plugin is stopped
 * @param callback - The callback to be fired
 * @param once - If true, the callback will be deleted after use
 * @param id - The id of the callback - if it already exists, it will be replaced
 * @returns A function to delete the callback
 */
export const onStop = createCallbackHandler("stop");
/**
 * Takes a callback and fires it when the user navigates
 * @param callback - The callback to be fired
 * @param once - If true, the callback will be deleted after use
 * @param id - The id of the callback - if it already exists, it will be replaced
 * @returns A function to delete the callback
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
};