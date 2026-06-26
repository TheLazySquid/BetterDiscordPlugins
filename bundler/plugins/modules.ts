import type { Plugin } from "esbuild";
import * as ModuleLocators from "$shared/modules";
import type { Modules } from "../../shared/moduleTypes";

export function modulesPlugin(ids: (keyof Modules)[]): Plugin {
    return {
        name: "modules",
        setup(build) {
            build.onResolve({ filter: /^\$shared\/modules$/ }, args => ({
                path: args.path,
                namespace: "modules-ns"
            }));

            build.onLoad({ filter: /.*/, namespace: "modules-ns" }, () => {
                const contents = createModulesFile(ids);

                return { contents, loader: "js", resolveDir: __dirname }
            });
        }
    }
}

function createModulesFile(ids: (keyof typeof ModuleLocators)[]): string {
    const syncIds = ids.filter(id => !ModuleLocators[id].lazyImporter);
    const lazyIds = ids.filter(id => ModuleLocators[id].lazyImporter);

    let content = `import { getSyncModules, getLazyModules } from "$shared/util/modules";\n\n` +
        `const Filters = BdApi.Webpack.Filters;\n`;

    if(syncIds.length > 0) {
        content += `const { ${syncIds.join(", ")} } = getSyncModules([\n`;
    
        for(const id of syncIds) {
            const locator = ModuleLocators[id];
            content += createRuntimeLocator(locator);
        }

        content += `]);\n`;
    }

    if(lazyIds.length > 0) {
        content += `const { ${lazyIds.join(", ")} } = getLazyModules([\n`;
    
        for(const id of lazyIds) {
            const locator = ModuleLocators[id];
            content += createRuntimeLocator(locator);
        }

        content += `]);\n`;
    }

    content += `export { ${ids.join(", ")} };\n`;

    return content;
}

function createRuntimeLocator(locator: Record<string, any>) {
    let string = `  {\n`;

    for(const key in locator) {
        // leave the name/key property as an actual string
        if(key === "key" || key === "name") string += `    ${key}: "${locator[key]}",\n`;
        else if(key === "demangler" || key === "lazyImporter") string += `    ${key}: ${objectPropertyString(locator[key])}\n`;
        else string += `    ${key}: ${locator[key]},\n`;
    }

    string += `  },\n`;

    return string;
}

function objectPropertyString(object: Record<string, any>) {
    let string = "  {\n";
    for(const key in object) string += `    ${key}: ${object[key]},\n`;
    string += "  },";

    return string;
}