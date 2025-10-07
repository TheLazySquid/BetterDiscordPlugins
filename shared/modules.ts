import type { ModuleDefinition, Modules } from "../types";

// Module ids are now stable, so we can use them directly
export const modules: Record<keyof Modules, ModuleDefinition> = {
    fileModule: {
        id: 40330,
        filter: `(m) => m.Z?.toString().includes("filenameLinkWrapper")`
    },
    CloudUploader: {
        id: 141795,
        getExport: `(e) => e.fromJson`,
        filter: `(m) => Object.values(m).some((e) => e?.UPLOADING === "UPLOADING")`
    },
    expressionModule: {
        id: 805680,
        getExport: true,
        filter: `(m) => m.type?.toString?.().includes("onSelectGIF")`
    },
    buttonsModule: {
        id: 258696,
        getExport: true,
        filter: `(m) => m.type?.toString?.().includes(".isSubmitButtonEnabled")`
    },
    uploadClasses: {
        id: 161655,
        filter: `Filters.byKeys("uploadArea", "chat")`
    },
    chatClasses: {
        id: 564355,
        filter: `Filters.byKeys("buttons", "textAreaSlate")`
    },
    gifDisplay: {
        id: 215016,
        getExport: `(e) => e.prototype?.renderGIF`,
        filter: `(m) => Object.values(m).some(Filters.byStrings("renderGIF()", "imagePool"))`
    },
    premiumPermissions: {
        id: 74538,
        getExport: `(e) => e.getUserMaxFileSize`,
        filter: `Filters.byKeys("getUserMaxFileSize")`
    },
    highlightModule: {
        id: 364964,
        getExport: true,
        filter: `Filters.byKeys("highlight", "hasLanguage")`
    },
    createSlate: {
        id: 196483,
        filter: `Filters.byStrings("insertText=", "onChange=")`,
        defaultExport: false
    },
    attachFiles: {
        id: 127654,
        getExport: `(e) => e.toString().includes("filesMetadata")`,
        getWithKey: true,
        filter: `(m) => Object.values(m).some(Filters.byStrings("filesMetadata:", "requireConfirm:"))`
    },
    chatbox: {
        id: 893718,
        getExport: `(e) => e.type`,
        filter: `(m) => Object.values(m).some((e) => {
            let str = e?.type?.render?.toString?.();
            if(!str) return false;
            return str.includes("pendingScheduledMessage") && str.includes(".CHANNEL_TEXT_AREA");
        })`
    },
    ModalSystem: {
        id: 952265,
        demangler: {
            open: `Filters.byStrings(",instant:")`,
            close: `Filters.byStrings(".onCloseCallback()")`
        },
        filter: `Filters.bySource(".modalKey?")`
    },
    expressionPicker: {
        id: 28546,
        demangler: {
            toggle: `(f) => f.toString().includes("activeView===")`,
            close: `(f) => f.toString().includes("activeView:null")`,
            store: `(f) => f.getState`
        },
        filter: `Filters.bySource("lastActiveView")`
    },
    Modal: {
        id: 466377,
        demangler: {
            Root: `Filters.byStrings(".ImpressionNames.MODAL_ROOT_LEGACY")`,
            Content: `Filters.byStrings("scrollerRef", "scrollbarType")`,
            Header: `Filters.byStrings(".header,")`,
            Close: `Filters.byStrings(".closeWithCircleBackground]:")`,
            Footer: `Filters.byStrings(".footerSeparator]:")`
        },
        filter: `Filters.bySource(".MODAL_ROOT_LEGACY,properties")`
    },
    AttachmentButtons: {
        id: 898463,
        filter: `Filters.byStrings("draftType:", "keyboardModeEnabled:", "currentColor")`,
        defaultExport: false
    },
    AttachmentButton: {
        id: 273031,
        getExport: true,
        filter: `Filters.byStrings("actionBarIcon", "hideOnClick")`
    },
    AttachmentSystem: {
        id: 166459,
        getExport: true,
        filter: `(m) => m?.setUploads?.name === "setUploads")`,
        defaultExport: false
    },
    frequentlyUsedEmojis: {
        id: 543241,
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
export let AttachmentButtons: Modules['AttachmentButtons'];
export let AttachmentButton: Modules['AttachmentButton'];
export let AttachmentSystem: Modules['AttachmentSystem'];
export let frequentlyUsedEmojis: Modules['frequentlyUsedEmojis'];