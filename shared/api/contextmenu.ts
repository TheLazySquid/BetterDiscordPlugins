import { onStart, onStop } from "$shared/bd";
import type { ReactElement } from "react";

export function patchContextMenu(type: string, callback: (element: ReactElement<any>, props: any) => void) {
    onStart(() => BdApi.ContextMenu.patch(type, callback));
    onStop(() => BdApi.ContextMenu.unpatch(type, callback))
}