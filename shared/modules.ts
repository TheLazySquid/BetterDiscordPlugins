export const imgAdder: any = BdApi.Webpack.getByKeys("addFile");
export const chatKeyHandlers: any = BdApi.Webpack.getAllByStrings("selectNextCommandOption");
export const fileModule: any = BdApi.Webpack.getModule((m) => m.Z?.toString().includes("filenameLinkWrapper"));