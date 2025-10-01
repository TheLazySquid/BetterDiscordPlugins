export interface ModuleDefinition {
    id: number;
    getExport?: string | true;
    demangler?: Record<string, string>;
    getWithKey?: boolean;

    // Fallback
    filter: string;
    defaultExport?: boolean;
}

interface ReactElementModule {
    type: (...args: any[]) => any;
}

interface ExpressionPicker {
    toggle: (id: string, type: any) => void;
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

interface ModalSystem {
    open: (render: (props: any) => React.ReactNode, options?: ModalOptions) => string;
    close: (id: string) => void;
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
    CloudUploader: any;
    expressionModule: ReactElementModule;
    buttonsModule: ReactElementModule;
    uploadClasses: Record<string, string>;
    gifDisplay: any;
    premiumPermissions: any;
    highlightModule: any;
    createSlate: any;
    attachFiles: [any, string];
    chatbox: any;
    ModalSystem: ModalSystem;
    expressionPicker: ExpressionPicker;
    Modal: { Root: any; Content: any; Header: any; Close: any; Footer: any };
    AttachmentButtons: any;
    AttachmentButton: any;
    AttachmentSystem: AttachmentSystem;
    frequentlyUsedEmojis: [any, string];
}

export interface PluginConfig {
    description: string;
    version: string;
    modules: (keyof Modules)[];
}