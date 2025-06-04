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
export const imgAdder: any = /* @__PURE__ */ Webpack.getByKeys("addFile");
export const chatKeyHandlers: any = /* @__PURE__ */ Webpack.getByStrings("selectNextCommandOption", { defaultExport: false });
export const fileModule: any = /* @__PURE__ */ Webpack.getModule((m) => m.Z?.toString().includes("filenameLinkWrapper"));
export const CloudUploader: any = /* @__PURE__ */ Webpack.getByStrings('uploadFileToCloud', { searchExports: true });
export const uploader: any = /* @__PURE__ */ Webpack.getByKeys('uploadFiles');
export const channelStore: any = /* @__PURE__ */ Webpack.getStore("SelectedChannelStore");
export const expressionModule = /* @__PURE__ */ Webpack.getModule<ReactElementModule>((m) => m.type?.toString?.().includes("onSelectGIF"));
export const buttonsModule = /* @__PURE__ */ Webpack.getModule<ReactElementModule>((m) => m.type?.toString?.().includes(".isSubmitButtonEnabled"));
export const uploadOverlay = /* @__PURE__ */ Webpack.getWithKey(Webpack.Filters.byStrings("TEXTAREA_FOCUS", "onDragClear"))
export const uploadClasses: Record<string, string> = /* @__PURE__ */ Webpack.getByKeys("uploadArea", "chat");
export const gifDisplay: any = /* @__PURE__ */ Webpack.getByStrings("renderGIF()", "imagePool", { searchExports: true });
export const premiumPremissions: any = /* @__PURE__ */ Webpack.getByKeys("getUserMaxFileSize");

// Taken from Arven
// @ts-expect-error Zerthox's repo hasn't documented this yet
export const Modals = /* @__PURE__ */ Webpack.getMangled(".modalKey?", {
  open: Webpack.Filters.byStrings(",instant:"),
  close: Webpack.Filters.byStrings(".onCloseCallback()")
});

// @ts-expect-error
export const expressionPicker: ExpressionPicker = /* @__PURE__ */ Webpack.getMangled("lastActiveView", {
    toggle: (f: any) => f.toString().includes("activeView==="),
    close: (f: any) => f.toString().includes("activeView:null"),
    store: (f: any) => f.getState,
});