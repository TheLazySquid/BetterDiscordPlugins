export const expressionModule: any = BdApi.Webpack.getModule((m) => m.type?.toString?.().includes("onSelectGIF"))
export const buttonsModule: any = BdApi.Webpack.getModule((m) => m.type?.toString?.().includes(".isSubmitButtonEnabled", ".getActiveCommand"))
const pickerModule: any = BdApi.Webpack.getModule((module) => Object.values(module).some(v => {
    if(typeof v !== "function") return false;
    return v.toString().includes("lastActiveView")
}))
export const toggleExpressionPicker = Object.values<any>(pickerModule).find(v => v.toString().includes("activeView==="))
export const closeExpressionPicker = Object.values<any>(pickerModule).find(v => v.toString().includes("activeView:null"))
export const pickerStore = Object.values<any>(pickerModule).find(v => v.getState)
export const imgAdder: any = Object.values(BdApi.Webpack.getModule(module => Object.values<any>(module)?.[0]?.addFile) as any)[0];
export const chatKeyHandlers: any = BdApi.Webpack.getModule((exports) => Object.values<any>(exports)?.[0]?.
    toString?.().includes("selectNextCommandOption"))

export const mimeTypes: Record<string, string> = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'webp': 'image/webp',
    'avif': 'image/avif',
    'gif': 'image/gif',
}