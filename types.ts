export interface ModuleDefinition {
    filter: string;
    defaultExport?: boolean;
    searchExports?: boolean;
    demangler?: Record<string, string>;
    getWithKey?: boolean;
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

export interface Modules {
    imgAdder: any;
    chatKeyHandlers: any;
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
    ModalSystem: { open: any; close: any };
    expressionPicker: ExpressionPicker;
    Modal: { Root: any; Content: any; Header: any; Close: any; Footer: any };
}

export interface PluginConfig {
    description: string;
    version: string;
    modules: (keyof Modules)[];
}