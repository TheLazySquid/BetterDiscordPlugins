import type { ModuleDefinition, Modules } from "../types";

// Module ids are now stable, so we can use them directly
export const modules: Record<keyof Modules, ModuleDefinition> = {
    chatKeyHandlers: { id: 780748 },
    fileModule: { id: 40330 },
    CloudUploader: { id: 141795, getExport: `(e) => e.fromJson` },
    expressionModule: { id: 805680, getExport: true },
    buttonsModule: { id: 258696, getExport: true },
    uploadClasses: { id: 97009 },
    gifDisplay: { id: 215016, getExport: `(e) => e.prototype?.renderGIF` },
    premiumPermissions: { id: 74538, getExport: `(e) => e.getUserMaxFileSize` },
    highlightModule: { id: 364964, getExport: true },
    createSlate: { id: 196483 },
    attachFiles: { id: 127654, getExport: `(e) => !e.name`, getWithKey: true },
    chatbox: { id: 893718, getExport: `(e) => e.type` },
    ModalSystem: {
        id: 952265,
        demangler: {
            open: `Filters.byStrings(",instant:")`,
            close: `Filters.byStrings(".onCloseCallback()")`
        }
    },
    expressionPicker: {
        id: 28546,
        demangler: {
            toggle: `(f) => f.toString().includes("activeView===")`,
            close: `(f) => f.toString().includes("activeView:null")`,
            store: `(f) => f.getState`
        }
    },
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
    AttachmentButtons: { id: 898463 },
    AttachmentButton: { id: 273031, getExport: true },
    AttachmentSystem: { id: 166459, getExport: true },
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