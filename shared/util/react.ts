import { Api } from "$shared/bd";

export function findReactChild(element: any, filter: (el: any) => boolean) {
    if(!element) return null;
    return BdApi.Utils.findInTree(element, filter, { walkable: ["props", "children"] });
}

// Function thanks to Arven
export function forceUpdate(selector: string) {
    const target = document.querySelector(selector)?.parentElement;
    if (!target) return;

    const instance = BdApi.ReactUtils.getOwnerInstance(target);
    if(!instance) return;

    const unpatch = Api.Patcher.instead(instance, "render", () => unpatch());
    instance.forceUpdate(() => instance.forceUpdate());
}