import type { ModuleFilter } from "betterdiscord";

interface ReactElementModule {
    type: (...args: any[]) => any;
}

interface ExpressionPicker {
    toggle: (id: string, type: any) => void;
    close: () => void;
    store: {
        getState: () => { activeView: string };
        subscribe: (callback: (state: any) => void) => (() => void);
    }
}


const Webpack = BdApi.Webpack;
function getMangled<T>(filter: string | ModuleFilter, mapper: T): { [key in keyof T]: any } {
    return (Webpack as any).getMangled(filter, mapper);
}

// It's annoying how @__PURE__ needs to be spammed everywhere
export const imgAdder: any = /* @__PURE__ */ Webpack.getByKeys("addFile");
export const chatKeyHandlers: any = /* @__PURE__ */ Webpack.getByStrings("selectNextCommandOption", { defaultExport: false });
export const fileModule: any = /* @__PURE__ */ Webpack.getModule((m) => m.Z?.toString().includes("filenameLinkWrapper"));
export const CloudUploader: any = /* @__PURE__ */ Webpack.getByStrings('uploadFileToCloud', { searchExports: true });
export const channelStore: any = /* @__PURE__ */ Webpack.getStore("SelectedChannelStore");
export const expressionModule = /* @__PURE__ */ Webpack.getModule<ReactElementModule>((m) => m.type?.toString?.().includes("onSelectGIF"));
export const buttonsModule = /* @__PURE__ */ Webpack.getModule<ReactElementModule>((m) => m.type?.toString?.().includes(".isSubmitButtonEnabled"));
export const uploadOverlay = /* @__PURE__ */ Webpack.getWithKey(/* @__PURE__ */ Webpack.Filters.byStrings("TEXTAREA_FOCUS", "onDragClear"))
export const uploadClasses: Record<string, string> = /* @__PURE__ */ Webpack.getByKeys("uploadArea", "chat");
export const gifDisplay: any = /* @__PURE__ */ Webpack.getByStrings("renderGIF()", "imagePool", { searchExports: true });
export const premiumPremissions: any = /* @__PURE__ */ Webpack.getByKeys("getUserMaxFileSize");
export const highlightModule: any = /* @__PURE__ */ Webpack.getByKeys("highlight", "hasLanguage");

export const /* @__PURE__ */ chatbox: any = /* @__PURE__ */ Webpack.getModule((m) => {
    let str = m?.Z?.type?.render?.toString();
    if(!str) return false;
    return str.includes("handleSubmit") && str.includes("channelTextAreaDisabled");
});

// Taken from Arven
export const ModalSystem = /* @__PURE__ */ getMangled(".modalKey?", {
  open: /* @__PURE__ */ Webpack.Filters.byStrings(",instant:"),
  close: /* @__PURE__ */ Webpack.Filters.byStrings(".onCloseCallback()")
});

export const expressionPicker: ExpressionPicker = /* @__PURE__ */ getMangled("lastActiveView", {
    toggle: (f: any) => f.toString().includes("activeView==="),
    close: (f: any) => f.toString().includes("activeView:null"),
    store: (f: any) => f.getState,
});

// Taken from doggy
export const Modal = /* @__PURE__ */ getMangled(".MODAL_ROOT_LEGACY,properties", {
    Root: /* @__PURE__ */ Webpack.Filters.byStrings(".ImpressionNames.MODAL_ROOT_LEGACY"),
    Content: /* @__PURE__ */ Webpack.Filters.byStrings("scrollerRef", "scrollbarType"),
    Header: /* @__PURE__ */ Webpack.Filters.byStrings(".header,"),
    Close: /* @__PURE__ */ Webpack.Filters.byStrings(".closeWithCircleBackground]:"),
    Footer: /* @__PURE__ */ Webpack.Filters.byStrings(".footerSeparator]:")
});