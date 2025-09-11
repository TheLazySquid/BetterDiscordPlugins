export function findReactChild(element: any, filter: (el: any) => boolean) {
    if(!element) return null;
    return BdApi.Utils.findInTree(element, filter, { walkable: ["props", "children"] });
}