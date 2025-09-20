export function demangle(module: Record<string, any>, demangler: Record<string, (mod: any) => boolean>) {
    let returned: Record<string, any> = {};
    let values = Object.values(module);

    for(let id in demangler) {
        for(let i = 0; i < values.length; i++) {
            if(demangler[id](values[i])) {
                returned[id] = values[i];
                break;
            }
        }
    }

    return returned;
}

type ExportFilter = ((value: any) => boolean) | true;
export function findExport(module: Record<string, any>, filter: ExportFilter): any {
    for(let value of Object.values(module)) {
        if(filter === true || filter(value)) return value;
    }
}

export function findExportWithKey(module: Record<string, any>, filter: ExportFilter): [any, string] | undefined {
    for(let key in module) {
        if(filter !== true && !filter(module[key])) continue;
        return [module, key];
    }
}