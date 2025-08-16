import type { ModuleDefinition, Modules } from "../types";

export const modules: Record<keyof Modules, ModuleDefinition> = {
    imgAdder: { filter: `Filters.byKeys("addFile")` },
    chatKeyHandlers: { filter: `Filters.byStrings("selectNextCommandOption")`, defaultExport: false },
    fileModule: { filter: `(m) => m.Z?.toString().includes("filenameLinkWrapper")` },
    CloudUploader: { filter: `Filters.byStrings('uploadFileToCloud')`, searchExports: true },
    expressionModule: { filter: `(m) => m.type?.toString?.().includes("onSelectGIF")` },
    buttonsModule: { filter: `(m) => m.type?.toString?.().includes(".isSubmitButtonEnabled")` },
    uploadClasses: { filter: `Filters.byKeys("uploadArea", "chat")` },
    gifDisplay: { filter: `Filters.byStrings("renderGIF()", "imagePool")`, searchExports: true },
    premiumPremissions: { filter: `Filters.byKeys("getUserMaxFileSize")` },
    highlightModule: { filter: `Filters.byKeys("highlight", "hasLanguage")` },
    createSlate: { filter: `Filters.byStrings("insertText=", "onChange=")`, defaultExport: false },
    chatbox: {
        filter: `(m) => {
            let str = m?.type?.render?.toString?.();
            if(!str) return false;
            return str.includes("pendingScheduledMessage") && str.includes(".CHANNEL_TEXT_AREA");
        }`,
        searchExports: true
    },
    ModalSystem: {
        filter: `Filters.bySource(".modalKey?")`,
        demangler: {
            open: `Filters.byStrings(",instant:")`,
            close: `Filters.byStrings(".onCloseCallback()")`
        }
    },
    expressionPicker: {
        filter: `Filters.bySource("lastActiveView")`,
        demangler: {
            toggle: `(f) => f.toString().includes("activeView===")`,
            close: `(f) => f.toString().includes("activeView:null")`,
            store: `(f) => f.getState`
        }
    },
    Modal: {
        filter: `Filters.bySource(".MODAL_ROOT_LEGACY,properties")`,
        demangler: {
            Root: `Filters.byStrings(".ImpressionNames.MODAL_ROOT_LEGACY")`,
            Content: `Filters.byStrings("scrollerRef", "scrollbarType")`,
            Header: `Filters.byStrings(".header,")`,
            Close: `Filters.byStrings(".closeWithCircleBackground]:")`,
            Footer: `Filters.byStrings(".footerSeparator]:")`
        }
    }
}

// Needed for typescript
export let imgAdder: Modules['imgAdder'];
export let chatKeyHandlers: Modules['chatKeyHandlers'];
export let fileModule: Modules['fileModule'];
export let CloudUploader: Modules['CloudUploader'];
export let expressionModule: Modules['expressionModule'];
export let buttonsModule: Modules['buttonsModule'];
export let uploadClasses: Modules['uploadClasses'];
export let gifDisplay: Modules['gifDisplay'];
export let premiumPremissions: Modules['premiumPremissions'];
export let highlightModule: Modules['highlightModule'];
export let createSlate: Modules['createSlate'];
export let chatbox: Modules['chatbox'];
export let ModalSystem: Modules['ModalSystem'];
export let expressionPicker: Modules['expressionPicker'];
export let Modal: Modules['Modal'];