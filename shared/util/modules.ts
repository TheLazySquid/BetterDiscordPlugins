import { Api } from "$shared/bd";
import type { ExportFilter, ModuleLocator } from "../../types";

export function getSyncModules(locators: ModuleLocator<true>[]) {
    let returned: Record<string, any> = {};

    const queries = locators.map(createQuery);

    const modules = BdApi.Webpack.getBulk(...queries);

    // Finalize sync modules
    for(let i = 0; i < locators.length; i++) {
        const locator = locators[i];
        const module = modules[i];

        if(!module) {
            Api.Logger.warn(`Could not find module for ${locator.name}`);
            continue;
        }

        returned[locator.name] = finalizeModule(locator, module);
    }

    return returned;
}

export function getLazyModules(locators: ModuleLocator<true>[]) {
    let returned: Record<string, LazyModule<any>> = {};

    for(let locator of locators) {
        returned[locator.name] = new LazyModule(locator);
    }

    return returned;
}

export class LazyModule<T> {
    value: T | null = null;
    loaded: Promise<T>;

    constructor(public locator: ModuleLocator<true>) {
        const { promise, resolve } = Promise.withResolvers<T>();

        BdApi.Webpack.waitForModule(locator.filter, {
            firstId: locator.id,
            cacheId: locator.name,
            defaultExport: locator.defaultExport ?? true
        })?.then((module) => {
            this.value = module as T;
            resolve(finalizeModule(locator, module));
        });
        
        this.loaded = promise;
    }

    loading = false;
    load() {
        if(this.loading) return this.loaded;
        this.loading = true;

        const importer = this.locator.lazyImporter!;
        const importerModule = BdApi.Webpack.getModule(importer.filter, {
            firstId: importer.id,
            cacheId: `${this.locator.name}-importer`,
            raw: true
        }) as BetterDiscord.Module;

        BdApi.Utils.forceLoad(importerModule.id as number);

        return this.loaded;
    }
}

function createQuery(locator: ModuleLocator<true>) {
    return {
        filter: locator.filter,
        firstId: locator.id,
        defaultExport: locator.defaultExport,
        cacheId: locator.name
    };
}

function finalizeModule(locator: ModuleLocator<true>, module: any): any {
    if(locator.demangler) {
        return BdApi.Utils.mapObject(module, locator.demangler);
    }

    if(locator.getExport) {
        if(locator.getWithKey) {
            return findExportWithKey(module, locator.getExport);
        } else {
            return findExport(module, locator.getExport);
        }
    }

    if(locator.key) {
        return module[locator.key];
    }

    return module;
}

function findExport(module: Record<string, any>, filter: ExportFilter): any {
    for(let value of Object.values(module)) {
        if(filter === true || filter(value)) return value;
    }
}

function findExportWithKey(module: Record<string, any>, filter: ExportFilter): [any, string] | undefined {
    for(let key in module) {
        if(filter !== true && !filter(module[key])) continue;
        return [module, key];
    }
}