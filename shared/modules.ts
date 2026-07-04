import type { ReactElementModule, ModuleLocator, WithKey, ExpressionPicker, AttachmentSystemType, ModalMethods } from "./moduleTypes";
import { LazyModule } from "./util/modules";

function defineModule<T>(locator: ModuleLocator): T {
    return locator as T;
}

export const fileModule = defineModule<any>({
    name: "fileModule",
    id: 564771,
    filter: `(m) => m.A?.toString().includes("().filesize(")`
});

export const expressionModule = defineModule<ReactElementModule>({
    name: "expressionModule",
    id: 731231,
    filter: `(m) => m.type?.toString?.().includes("onSelectGIF")`
});

export const buttonsModule = defineModule<ReactElementModule>({
    name: "buttonsModule",
    id: 729666,
    filter: `(m) => m.type?.toString?.().includes(".isSubmitButtonEnabled")`
});

export const uploadAreaClass = defineModule<string>({
    name: "uploadAreaClass",
    key: "uploadArea",
    filter: `Filters.byKeys("uploadArea", "chat")`
});

export const chatbarInnerClass = defineModule<string>({
    name: "chatbarInnerClass",
    key: "inner",
    filter: `Filters.byKeys("buttons", "textAreaSlate")`
});

export const modalContainerClass = defineModule<string>({
    name: "modalContainerClass",
    key: "container",
    filter: `Filters.byKeys("container", "padding-size-sm")`
});

export const gifDisplay = defineModule<any>({
    name: "gifDisplay",
    id: 285961,
    getExport: `(e) => e.prototype?.renderGIF`,
    filter: `(m) => Object.values(m).some(Filters.byStrings("renderGIF()", "imagePool"))`
});

export const highlightModule = defineModule<LazyModule<any>>({
    name: "highlightModule",
    id: 981776,
    filter: `Filters.byKeys("highlight", "hasLanguage")`,
    lazyImporter: {
        id: 981776,
        filter: `Filters.bySource("location:\\"PlaintextFilePreview\\"")`
    }
});

export const createSlate = defineModule<WithKey<any>>({
    name: "createSlate",
    id: 154283,
    filter: `Filters.bySource("iterations!", "insertFragment")`,
    getExport: `Filters.byStrings("iterations!", "insertFragment")`,
    getWithKey: true
});

export const attachFiles = defineModule<WithKey<any>>({
    name: "attachFiles",
    id: 518960,
    getExport: `(e) => e.toString().includes("filesMetadata")`,
    getWithKey: true,
    filter: `(m) => Object.values(m).some(Filters.byStrings("filesMetadata:", "requireConfirm:"))`
});

export const expressionPicker = defineModule<ExpressionPicker>({
    name: "expressionPicker",
    id: 151271,
    demangler: {
        toggle: `(f) => f.toString().includes("activeView===")`,
        close: `(f) => f.toString().includes("activeView:null")`,
        store: `(f) => f.getState`
    },
    filter: `Filters.bySource("lastActiveView", "isSearchSuggestion")`
});

export const AttachmentSystem = defineModule<AttachmentSystemType>({
    name: "AttachmentSystem",
    id: 608299,
    getExport: true,
    filter: `(m) => m?.setUploads?.name === "setUploads"`
});

export const frequentlyUsedEmojis = defineModule<WithKey<any>>({
    name: "frequentlyUsedEmojis",
    id: 822123,
    getExport: `(e) => e.toString().includes("getFrequentlyUsedReactionEmojisWithoutFetchingLatest")`,
    getWithKey: true,
    filter: `(m) => Object.values(m).some(Filters.byStrings("getFrequentlyUsedReactionEmojisWithoutFetchingLatest", "loadIfNecessary"))`
});

export const Modal = defineModule<any>({
    name: "Modal",
    id: 189213,
    key: "Modal",
    filter: `Filters.byKeys("Modal")`
});

export const modalMethods = defineModule<ModalMethods>({
    name: "modalMethods",
    id: 192308,
    filter: `Filters.byKeys("openModal")`
});

export const editorEvents = defineModule<WithKey<any>>({
    name: "editorEvents",
    id: 112541,
    getExport: true,
    getWithKey: true,
    filter: `Filters.bySource(",submit:","selectPreviousCommandOption")`,
    defaultExport: false
});

export const scroller = defineModule<WithKey<any>>({
    name: "scroller",
    id: 584648,
    getExport: true,
    getWithKey: true,
    filter: `Filters.bySource("isScrolledToBottom()", "shouldScrollToStart:")`,
    defaultExport: false
});

export const toolbar = defineModule<WithKey<any>>({
    name: "toolbar",
    id: 71855,
    getExport: `Filters.byStrings("PlatformTypes.WINDOWS")`,
    getWithKey: true,
    filter: `Filters.bySource("showDivider", "WINDOWS")`,
    defaultExport: false
});

export const toolbarClass = defineModule<string>({
    name: "toolbarClass",
    id: 666044,
    getExport: `(c) => c.startsWith("trailing_")`,
    filter: `Filters.byKeys("trailing", "winButton")`
});

export const maxUploadSize = defineModule<(guildId: string | null) => number>({
    name: "maxUploadSize",
    id: 453771,
    getExport: `Filters.byStrings("getUserMaxFileSize")`,
    filter: `Filters.bySource("getUserMaxFileSize", "reType")`
});

export const paste = defineModule<() => void>({
    name: "paste",
    id: 19575,
    key: "paste",
    filter: `Filters.byKeys("paste", "getSetting")`
});