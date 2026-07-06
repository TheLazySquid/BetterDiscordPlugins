import type * as ModuleLocators from "$shared/modules";

export type ExportFilter = ((value: any) => boolean) | true;

type ModuleFilterInfo<Runtime extends boolean> = Runtime extends true ? BetterDiscord.ModuleFilter : string;
type ExportFilterInfo<Runtime extends boolean> = Runtime extends true ? ExportFilter : string;
type DeclarationFilterInfo<Runtime extends boolean> = Runtime extends true ? (value: any) => boolean : string;

interface LazyImporter<Runtime extends boolean> {
    id?: number;
    filter: ModuleFilterInfo<Runtime>;
}

export interface ModuleLocator<Runtime extends boolean = false> {
    name: keyof typeof ModuleLocators;

    id?: number;
    demangler?: Record<string, Runtime extends true ? BetterDiscord.ExportedOnlyFilter : string>;
    lazyImporter?: LazyImporter<Runtime>;
    declarationFilter?: DeclarationFilterInfo<Runtime>;

    // getExport overrides key
    getExport?: ExportFilterInfo<Runtime> | boolean;
    key?: string;

    // getExport required
    getWithKey?: boolean;

    // Fallback
    filter: ModuleFilterInfo<Runtime>;
    defaultExport?: boolean;
}

export type WithKey<T> = [T, string];

export interface ReactElementModule {
    type: (...args: any[]) => any;
}

export interface ExpressionPicker {
    toggle: (id: string, type: any, channel: string) => void;
    close: () => void;
    store: {
        getState: () => { activeView: string };
        subscribe: (callback: (state: any) => void) => (() => void);
    }
}

export interface ModalOptions {
    onCloseCallback?: () => void;
    onCloseRequest?: () => boolean;
}

export interface ModalMethods {
    openModal: (render: (props: any) => React.ReactNode, options?: ModalOptions) => string;
    closeModal: (id: string | number) => void;
}

export interface AttachmentSystemType {
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

export interface PluginConfig {
    description: string;
    version: string;
    modules: (keyof typeof ModuleLocators)[];
}