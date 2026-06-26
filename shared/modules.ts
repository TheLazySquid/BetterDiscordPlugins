import type { ModuleLocator, Modules } from "./moduleTypes";

function defineModule<const T extends ModuleLocator>(locator: T): Modules[T["name"]] {
    return locator;
}

export const fileModule = defineModule({
    name: "fileModule",
    id: 564771,
    filter: `(m) => m.A?.toString().includes("().filesize(")`
});

export const expressionModule = defineModule({
    name: "expressionModule",
    id: 731231,
    filter: `(m) => m.type?.toString?.().includes("onSelectGIF")`
});

export const buttonsModule = defineModule({
    name: "buttonsModule",
    id: 729666,
    filter: `(m) => m.type?.toString?.().includes(".isSubmitButtonEnabled")`
});

export const uploadAreaClass = defineModule({
    name: "uploadAreaClass",
    key: "uploadArea",
    filter: `Filters.byKeys("uploadArea", "chat")`
});

export const chatbarInnerClass = defineModule({
    name: "chatbarInnerClass",
    key: "inner",
    filter: `Filters.byKeys("buttons", "textAreaSlate")`
});

export const modalContainerClass = defineModule({
    name: "modalContainerClass",
    key: "container",
    filter: `Filters.byKeys("container", "padding-size-sm")`
});

export const gifDisplay = defineModule({
    name: "gifDisplay",
    id: 285961,
    getExport: `(e) => e.prototype?.renderGIF`,
    filter: `(m) => Object.values(m).some(Filters.byStrings("renderGIF()", "imagePool"))`
});

export const highlightModule = defineModule({
    name: "highlightModule",
    id: 981776,
    filter: `Filters.byKeys("highlight", "hasLanguage")`,
    lazyImporter: {
        id: 981776,
        filter: `Filters.bySource("location:\\"PlaintextFilePreview\\"")`
    }
});

export const createSlate = defineModule({
    name: "createSlate",
    id: 154283,
    filter: `Filters.bySource("iterations!", "insertFragment")`,
    getExport: `Filters.byStrings("iterations!", "insertFragment")`,
    getWithKey: true
});

export const attachFiles = defineModule({
    name: "attachFiles",
    id: 518960,
    getExport: `(e) => e.toString().includes("filesMetadata")`,
    getWithKey: true,
    filter: `(m) => Object.values(m).some(Filters.byStrings("filesMetadata:", "requireConfirm:"))`
});

export const expressionPicker = defineModule({
    name: "expressionPicker",
    id: 151271,
    demangler: {
        toggle: `(f) => f.toString().includes("activeView===")`,
        close: `(f) => f.toString().includes("activeView:null")`,
        store: `(f) => f.getState`
    },
    filter: `Filters.bySource("lastActiveView", "isSearchSuggestion")`
});

export const AttachmentSystem = defineModule({
    name: "AttachmentSystem",
    id: 608299,
    getExport: true,
    filter: `(m) => m?.setUploads?.name === "setUploads"`
});

export const frequentlyUsedEmojis = defineModule({
    name: "frequentlyUsedEmojis",
    id: 822123,
    getExport: `(e) => e.toString().includes("getFrequentlyUsedReactionEmojisWithoutFetchingLatest")`,
    getWithKey: true,
    filter: `(m) => Object.values(m).some(Filters.byStrings("getFrequentlyUsedReactionEmojisWithoutFetchingLatest", "loadIfNecessary"))`
});

export const Modal = defineModule({
    name: "Modal",
    id: 189213,
    key: "Modal",
    filter: `Filters.byKeys("Modal")`
});

export const modalMethods = defineModule({
    name: "modalMethods",
    id: 192308,
    filter: `Filters.byKeys("openModal")`
});

export const editorEvents = defineModule({
    name: "editorEvents",
    id: 112541,
    getExport: true,
    getWithKey: true,
    filter: `Filters.bySource(",submit:","selectPreviousCommandOption")`,
    defaultExport: false
});

export const scroller = defineModule({
    name: "scroller",
    id: 584648,
    getExport: true,
    getWithKey: true,
    filter: `Filters.bySource("isScrolledToBottom()", "shouldScrollToStart:")`,
    defaultExport: false
});

export const toolbar = defineModule({
    name: "toolbar",
    id: 71855,
    getExport: `Filters.byStrings("PlatformTypes.WINDOWS")`,
    getWithKey: true,
    filter: `Filters.bySource("showDivider", "WINDOWS")`,
    defaultExport: false
});

export const toolbarClass = defineModule({
    name: "toolbarClass",
    id: 666044,
    getExport: `(c) => c.startsWith("trailing_")`,
    filter: `Filters.byKeys("trailing", "winButton")`
});

export const maxUploadSize = defineModule({
    name: "maxUploadSize",
    id: 453771,
    getExport: `Filters.byStrings("getUserMaxFileSize")`,
    filter: `Filters.bySource("getUserMaxFileSize", "reType")`
});

export const paste = defineModule({
    name: "paste",
    id: 19575,
    key: "paste",
    filter: `Filters.byKeys("paste", "getSetting")`
});