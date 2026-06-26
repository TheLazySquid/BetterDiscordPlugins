import type { LazyModule } from "$shared/util/modules";

export type ExportFilter = ((value: any) => boolean) | true;

type ModuleFilterInfo<Runtime extends boolean> = Runtime extends true ? BetterDiscord.ModuleFilter : string;
type ExportFilterInfo<Runtime extends boolean> = Runtime extends true ? ExportFilter : string;

interface LazyImporter<Runtime extends boolean> {
    id?: number;
    filter: ModuleFilterInfo<Runtime>;
}

export interface ModuleLocator<Runtime extends boolean = false> {
    name: keyof Modules;

    id?: number;
    demangler?: Record<string, Runtime extends true ? BetterDiscord.ExportedOnlyFilter : string>;
    lazyImporter?: LazyImporter<Runtime>;

    // getExport overrides key
    getExport?: ExportFilterInfo<Runtime> | boolean;
    key?: string;

    // getExport required
    getWithKey?: boolean;

    // Fallback
    filter: ModuleFilterInfo<Runtime>;
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
    highlightModule: LazyModule<any>;
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