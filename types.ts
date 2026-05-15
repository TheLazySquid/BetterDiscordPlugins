import type { ModuleFilter } from "betterdiscord";

export interface ModuleDefinition {
    id?: number;
    demangler?: Record<string, string>;

    // getExport overrides key
    getExport?: string | true;
    key?: string;

    // getExport required
    getWithKey?: boolean;

    // Fallback
    filter: string;
    defaultExport?: boolean;
}

export interface ModuleLocator {
    id?: number;
    filter: ModuleFilter;
    cacheId: string;
    defaultExport?: boolean;
}

type WithKey<T> = [T, string];

interface ReactElementModule {
    type: (...args: any[]) => any;
}

interface ExpressionPicker {
    toggle: (id: string, type: any, channel: string) => void;
    close: () => void;
    store: {
        getState: () => { activeView: string };
        subscribe: (callback: (state: any) => void) => (() => void);
    }
}

interface ModalOptions {
    onCloseCallback?: () => void;
    onCloseRequest?: () => boolean;
}

interface ModalMethods {
    openModal: (render: (props: any) => React.ReactNode, options?: ModalOptions) => string;
    closeModal: (id: string) => void;
}

interface AttachmentSystem {
    popFirstFile: (channelId: string) => void;
    addFile: (props: any) => void;
    addFiles: (props: any) => void;
    remove: (channelId: string, id: string, draftType: number) => void;
    removeFiles: (channelId: string, ids: string, draftType: number) => void;
    clearAll: (channelId: string, draftType: number) => void;
    update: (channelId: string, id: string, draftType: number, props: any) => void;
    setUploads: (props: any) => void;
    setFile: (props: any) => void;
}

export interface Modules {
    fileModule: any;
    expressionModule: ReactElementModule;
    buttonsModule: ReactElementModule;
    uploadAreaClass: string;
    chatbarInnerClass: string;
    modalContainerClass: string;
    gifDisplay: any;
    highlightModule: any;
    createSlate: WithKey<any>;
    attachFiles: WithKey<any>;
    expressionPicker: ExpressionPicker;
    AttachmentSystem: AttachmentSystem;
    frequentlyUsedEmojis: WithKey<any>;
    Modal: any;
    modalMethods: ModalMethods;
    editorEvents: WithKey<any>;
    scroller: WithKey<any>;
    toolbar: WithKey<any>;
    toolbarClass: string;
    maxUploadSize: (guildId: string | null) => number;
    paste: () => void;
}

export interface PluginConfig {
    description: string;
    version: string;
    modules: (keyof Modules)[];
}