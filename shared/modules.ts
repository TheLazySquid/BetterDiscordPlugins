import type { ModuleDefinition, Modules } from "../types";

// Module ids are now stable, so we can use them directly
export const modules: Record<keyof Modules, ModuleDefinition> = {
    fileModule: {
        id: 718468,
        filter: `(m) => m.A?.toString().includes("().filesize(")`
    },
    CloudUploader: {
        id: 743445,
        getExport: `(e) => e.fromJson`,
        filter: `(m) => Object.values(m).some((e) => e?.UPLOADING === "UPLOADING")`
    },
    expressionModule: {
        id: 834755,
        getExport: true,
        filter: `(m) => m.type?.toString?.().includes("onSelectGIF")`
    },
    buttonsModule: {
        id: 147025,
        getExport: true,
        filter: `(m) => m.type?.toString?.().includes(".isSubmitButtonEnabled")`
    },
    uploadClasses: {
        filter: `Filters.byKeys("uploadArea", "chat")`,
    },
    chatClasses: {
        filter: `Filters.byKeys("buttons", "textAreaSlate")`
    },
    gifDisplay: {
        id: 247683,
        getExport: `(e) => e.prototype?.renderGIF`,
        filter: `(m) => Object.values(m).some(Filters.byStrings("renderGIF()", "imagePool"))`
    },
    premiumPermissions: {
        id: 927578,
        getExport: `(e) => e.getUserMaxFileSize`,
        filter: `Filters.byKeys("getUserMaxFileSize")`
    },
    highlightModule: {
        id: 752238,
        getExport: true,
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
    chatbox: {
        id: 133343,
        getExport: `(e) => e.type`,
        filter: `(m) => Object.values(m).some((e) => {
            let str = e?.type?.render?.toString?.();
            if(!str) return false;
            return str.includes("pendingScheduledMessage") && str.includes(".CHANNEL_TEXT_AREA");
        })`
    },
    ModalSystem: {
        id: 192308,
        demangler: {
            open: `Filters.byStrings(",instant:")`,
            close: `Filters.byStrings(".onCloseCallback()")`
        },
        filter: `Filters.bySource(".modalKey?")`
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
    Modal: {
        id: 935462,
        demangler: {
            Root: `Filters.byStrings(".ImpressionNames.MODAL_ROOT_LEGACY")`,
            Content: `Filters.byStrings("scrollerRef", "scrollbarType")`,
            Header: `Filters.byStrings("headerIdIsManaged")`,
            Close: `Filters.byStrings(".withCircleBackground")`,
            Footer: `Filters.byStrings("grow:0")`
        },
        filter: `Filters.bySource(".MODAL_ROOT_LEGACY,properties")`
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
    }
}

// Needed for typescript
export let fileModule: Modules['fileModule'];
export let CloudUploader: Modules['CloudUploader'];
export let expressionModule: Modules['expressionModule'];
export let buttonsModule: Modules['buttonsModule'];
export let uploadClasses: Modules['uploadClasses'];
export let chatClasses: Modules['chatClasses'];
export let gifDisplay: Modules['gifDisplay'];
export let premiumPermissions: Modules['premiumPermissions'];
export let highlightModule: Modules['highlightModule'];
export let createSlate: Modules['createSlate'];
export let attachFiles: Modules['attachFiles'];
export let chatbox: Modules['chatbox'];
export let ModalSystem: Modules['ModalSystem'];
export let expressionPicker: Modules['expressionPicker'];
export let Modal: Modules['Modal'];
export let AttachmentSystem: Modules['AttachmentSystem'];
export let frequentlyUsedEmojis: Modules['frequentlyUsedEmojis'];