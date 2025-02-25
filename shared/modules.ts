export const imgAdder: any = BdApi.Webpack.getModule(m => m.addFiles);
export const chatKeyHandlers: any = BdApi.Webpack.getAllByStrings("selectNextCommandOption");
export const fileModule: any = BdApi.Webpack.getModule<any>((m) => m.Z?.toString().includes("filenameLinkWrapper"));