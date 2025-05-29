interface ReactElementModule {
    type: (...args: any[]) => any;
}

interface ExpressionPicker {
    toggle: (id: string, type: any) => void;
    close: () => void;
    store: { getState: () => { activeView: string } };
}

export const imgAdder: any = /* @__PURE__ */ BdApi.Webpack.getByKeys("addFile");
export const chatKeyHandlers: any = /* @__PURE__ */ BdApi.Webpack.getByStrings("selectNextCommandOption", { defaultExport: false });
export const fileModule: any = /* @__PURE__ */ BdApi.Webpack.getModule((m) => m.Z?.toString().includes("filenameLinkWrapper"));
export const CloudUploader: any = /* @__PURE__ */ BdApi.Webpack.getByStrings('uploadFileToCloud', { searchExports: true });
export const uploader: any = /* @__PURE__ */ BdApi.Webpack.getByKeys('uploadFiles');
export const channelStore: any = /* @__PURE__ */ BdApi.Webpack.getStore("SelectedChannelStore");
export const expressionModule = /* @__PURE__ */ BdApi.Webpack.getModule<ReactElementModule>((m) => m.type?.toString?.().includes("onSelectGIF"));
export const buttonsModule = /* @__PURE__ */ BdApi.Webpack.getModule<ReactElementModule>((m) => m.type?.toString?.().includes(".isSubmitButtonEnabled"));

// @ts-expect-error Zerthox's repo hasn't documented this yet
export const expressionPicker: ExpressionPicker = /* @__PURE__ */ BdApi.Webpack.getMangled((m) => Object.values(m).some(v => v?.toString().includes("lastActiveView")), {
    toggle: (f: any) => f.toString().includes("activeView==="),
    close: (f: any) => f.toString().includes("activeView:null"),
    store: (f: any) => f.getState,
});