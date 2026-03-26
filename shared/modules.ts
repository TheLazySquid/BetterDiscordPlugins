import type { ModuleDefinition, Modules } from "../types";

// Module ids are now stable, so we can use them directly
export const modules: Record<keyof Modules, ModuleDefinition> = {
    fileModule: {
        id: 718468,
        filter: `(m) => m.A?.toString().includes("().filesize(")`
    },
    expressionModule: {
        id: 834755,
        filter: `(m) => m.type?.toString?.().includes("onSelectGIF")`
    },
    buttonsModule: {
        id: 147025,
        filter: `(m) => m.type?.toString?.().includes(".isSubmitButtonEnabled")`
    },
    uploadAreaClass: {
        key: "uploadArea",
        filter: `Filters.byKeys("uploadArea", "chat")`,
    },
    chatbarInnerClass: {
        key: "inner",
        filter: `Filters.byKeys("buttons", "textAreaSlate")`
    },
    modalContainerClass: {
        key: "container",
        filter: `Filters.byKeys("container", "padding-size-sm")`
    },
    gifDisplay: {
        id: 247683,
        getExport: `(e) => e.prototype?.renderGIF`,
        filter: `(m) => Object.values(m).some(Filters.byStrings("renderGIF()", "imagePool"))`
    },
    highlightModule: {
        id: 752238,
        filter: `Filters.byKeys("highlight", "hasLanguage")`
    },
    createSlate: {
        id: 913728,
        filter: `Filters.byStrings("insertText=", "onChange=")`,
        defaultExport: false
    },
    attachFiles: {
        id: 518960,
        getExport: `(e) => e.toString().includes("filesMetadata")`,
        getWithKey: true,
        filter: `(m) => Object.values(m).some(Filters.byStrings("filesMetadata:", "requireConfirm:"))`
    },
    expressionPicker: {
        id: 151271,
        demangler: {
            toggle: `(f) => f.toString().includes("activeView===")`,
            close: `(f) => f.toString().includes("activeView:null")`,
            store: `(f) => f.getState`
        },
        filter: `Filters.bySource("lastActiveView", "isSearchSuggestion")`
    },
    AttachmentSystem: {
        id: 608299,
        getExport: true,
        filter: `(m) => m?.setUploads?.name === "setUploads")`,
        defaultExport: false
    },
    frequentlyUsedEmojis: {
        id: 822123,
        getExport: `(e) => e.toString().includes("getFrequentlyUsedReactionEmojisWithoutFetchingLatest")`,
        getWithKey: true,
        filter: `(m) => Object.values(m).some(Filters.byStrings("getFrequentlyUsedReactionEmojisWithoutFetchingLatest", "loadIfNecessary"))`
    },
    Modal: {
        id: 158954,
        key: "Modal",
        filter: `Filters.byKeys("Modal")`
    },
    modalMethods: {
        id: 192308,
        filter: `Filters.byKeys("openModal")`
    },
    editorEvents: {
        id: 919499,
        getExport: true,
        getWithKey: true,
        filter: `Filters.bySource(",submit:","selectPreviousCommandOption")`,
        defaultExport: false
    },
    scrollerWrapper: {
        id: 258024,
        getExport: true,
        getWithKey: true,
        filter: `Filters.bySource("mergePropsAndUpdate")`,
        defaultExport: false
    },
    maxUploadSize: {
        id: 453771,
        getExport: `Filters.byStrings("getUserMaxFileSize")`,
        filter: `Filters.bySource("getUserMaxFileSize", "reType")`
    }
}

// Needed for typescript
export let fileModule: Modules['fileModule'];
export let expressionModule: Modules['expressionModule'];
export let buttonsModule: Modules['buttonsModule'];
export let uploadAreaClass: Modules['uploadAreaClass'];
export let chatbarInnerClass: Modules['chatbarInnerClass'];
export let modalContainerClass: Modules['modalContainerClass'];
export let gifDisplay: Modules['gifDisplay'];
export let highlightModule: Modules['highlightModule'];
export let createSlate: Modules['createSlate'];
export let attachFiles: Modules['attachFiles'];
export let expressionPicker: Modules['expressionPicker'];
export let AttachmentSystem: Modules['AttachmentSystem'];
export let frequentlyUsedEmojis: Modules['frequentlyUsedEmojis'];
export let Modal: Modules['Modal'];
export let modalMethods: Modules['modalMethods'];
export let editorEvents: Modules['editorEvents'];
export let scrollerWrapper: Modules['scrollerWrapper'];
export let maxUploadSize: Modules['maxUploadSize'];