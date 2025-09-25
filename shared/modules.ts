import type { ModuleDefinition, Modules } from "../types";

// Module ids are now stable, so we can use them directly
export const modules: Record<keyof Modules, ModuleDefinition> = {
    // Filters.byStrings("selectNextCommandOption") defaultExport: false
    chatKeyHandlers: { id: 780748 },
    // (m) => m.Z?.toString().includes("filenameLinkWrapper")
    fileModule: { id: 40330 },
    // Filters.byStrings('uploadFileToCloud') searchExports: true
    CloudUploader: { id: 141795, getExport: `(e) => e.fromJson` },
    // (m) => m.type?.toString?.().includes("onSelectGIF")
    expressionModule: { id: 805680, getExport: true },
    // (m) => m.type?.toString?.().includes(".isSubmitButtonEnabled")
    buttonsModule: { id: 258696, getExport: true },
    // Filters.byKeys("uploadArea", "chat")
    uploadClasses: { id: 97009 },
    // Filters.byStrings("renderGIF()", "imagePool") searchExports: true
    gifDisplay: { id: 215016, getExport: `(e) => e.prototype?.renderGIF` },
    // Filters.byKeys("getUserMaxFileSize")
    premiumPermissions: { id: 74538, getExport: `(e) => e.getUserMaxFileSize` },
    // Filters.byKeys("highlight", "hasLanguage")
    highlightModule: { id: 364964, getExport: true },
    // Filters.byStrings("insertText=", "onChange=") defaultExport: false
    createSlate: { id: 196483 },
    // Filters.byStrings("filesMetadata:", "requireConfirm:")
    attachFiles: { id: 127654, getExport: `(e) => !e.name`, getWithKey: true },
    // (m) => {
    //     let str = m?.type?.render?.toString?.();
    //     if(!str) return false;
    //     return str.includes("pendingScheduledMessage") && str.includes(".CHANNEL_TEXT_AREA");
    // } searchExports: true
    chatbox: { id: 893718, getExport: `(e) => e.type` },
    // Filters.bySource(".modalKey?")
    ModalSystem: {
        id: 952265,
        demangler: {
            open: `Filters.byStrings(",instant:")`,
            close: `Filters.byStrings(".onCloseCallback()")`
        }
    },
    // Filters.bySource("lastActiveView")
    expressionPicker: {
        id: 28546,
        demangler: {
            toggle: `(f) => f.toString().includes("activeView===")`,
            close: `(f) => f.toString().includes("activeView:null")`,
            store: `(f) => f.getState`
        }
    },
    // Filters.bySource(".MODAL_ROOT_LEGACY,properties")
    Modal: {
        id: 466377,
        demangler: {
            Root: `Filters.byStrings(".ImpressionNames.MODAL_ROOT_LEGACY")`,
            Content: `Filters.byStrings("scrollerRef", "scrollbarType")`,
            Header: `Filters.byStrings(".header,")`,
            Close: `Filters.byStrings(".closeWithCircleBackground]:")`,
            Footer: `Filters.byStrings(".footerSeparator]:")`
        }
    },
    // Filters.byStrings("draftType:", "keyboardModeEnabled:", "currentColor") defaultExport: false
    AttachmentButtons: { id: 898463 },
    // Filters.byStrings("actionBarIcon", "hideOnClick")
    AttachmentButton: { id: 273031, getExport: true },
    // (m) => m.setUploads?.name === "setUploads" searchExports: true
    AttachmentSystem: { id: 166459, getExport: true },
    // Filters.byStrings("getFrequentlyUsedReactionEmojisWithoutFetchingLatest", "loadIfNecessary") searchExports: true
    frequentlyUsedEmojis: {
        id: 543241,
        getExport: `(e) => e.toString().includes("getFrequentlyUsedReactionEmojisWithoutFetchingLatest")`,
        getWithKey: true
    }
}

// Needed for typescript
export let chatKeyHandlers: Modules['chatKeyHandlers'];
export let fileModule: Modules['fileModule'];
export let CloudUploader: Modules['CloudUploader'];
export let expressionModule: Modules['expressionModule'];
export let buttonsModule: Modules['buttonsModule'];
export let uploadClasses: Modules['uploadClasses'];
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