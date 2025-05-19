export const imgAdder: any = BdApi.Webpack.getByKeys("addFile");
export const chatKeyHandlers: any = BdApi.Webpack.getByStrings("selectNextCommandOption", { defaultExport: false });
export const fileModule: any = BdApi.Webpack.getModule((m) => m.Z?.toString().includes("filenameLinkWrapper"));
export const CloudUploader: any = BdApi.Webpack.getByStrings('uploadFileToCloud', { searchExports: true });
export const uploader: any = BdApi.Webpack.getByKeys('instantBatchUpload');
export const channelStore: any = BdApi.Webpack.getStore("SelectedChannelStore");
