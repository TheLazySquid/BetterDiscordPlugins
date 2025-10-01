import { Api } from "$shared/bd";
import type { ModuleFilter } from "betterdiscord";

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

interface Filter {
    filter: ModuleFilter;
    defaultExport?: boolean;
}

export function fallbackMissing(modules: any[], filters: Filter[]) {
    let missingIndexes: number[] = [];
    let queries: Filter[] = [];

    // Check which modules are missing
    for(let i = 0; i < modules.length; i++) {
        if(modules[i]) continue;
        missingIndexes.push(i);
        queries.push(filters[i]);
    }

    if(missingIndexes.length === 0) return;

    Api.Logger.warn("Some modules not found by id:", missingIndexes.join(", "));

    // Get the fallback with the filter
    const found = BdApi.Webpack.getBulk(...queries);
    for(let i = 0; i < missingIndexes.length; i++) {
        modules[missingIndexes[i]] = found[i];
        if(!found[i]) Api.Logger.warn("Fallback filter failed for module", missingIndexes[i]);
    }
}