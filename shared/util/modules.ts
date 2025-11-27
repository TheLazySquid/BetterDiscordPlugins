import type { ModuleFilter } from "betterdiscord";
import type { ModuleLocator } from "../../types";
import { Api } from "$shared/bd";

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

export function getModules(locators: ModuleLocator[]) {
    const modules: any[] = [];

    for(let i = 0; i < locators.length; i++) {
        if(!locators[i].id) continue;

        // @ts-expect-error types haven't been updated yet
        modules[i] = BdApi.Webpack.getById(locators[i].id);
        if(!modules[i]) Api.Logger.warn(`Module with ID ${locators[i].id} not found`);
    }

    // Get missing modules using their filters
    const missingIndexes: number[] = [];
    const filters: Filter[] = [];

    for(let i = 0; i < locators.length; i++) {
        if(modules[i]) continue;
        
        missingIndexes.push(i);
        filters.push({
            filter: locators[i].filter,
            defaultExport: locators[i].defaultExport
        });
    }

    if(missingIndexes.length > 0) {
        const found = BdApi.Webpack.getBulk(...filters);
        for(let i = 0; i < missingIndexes.length; i++) {
            modules[missingIndexes[i]] = found[i];
            if(!found[i]) Api.Logger.error(`Module filter ${missingIndexes[i]} failed`);
        }
    }

    return modules;
}