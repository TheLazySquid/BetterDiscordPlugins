import type { Plugin } from "esbuild";
import { modules } from "$shared/modules";
import type { Modules } from "../../types";

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

function createModulesFile(ids: (keyof Modules)[]): string {
    if(ids.length === 0) return "";

    let contents = `import { demangle, findExport, findExportWithKey, fallbackMissing } from "$shared/util/modules";\n`
        + "const Filters = BdApi.Webpack.Filters;\n\n";
    
    // Get all the modules
    contents += `const modules = BdApi.Webpack.getBulk(\n`;
    for(let i = 0; i < ids.length; i++) {
        let module = modules[ids[i]];
        contents += `    { filter: (_, __, id) => id == ${module.id} },\n`
    }
    contents += `);\n\n`;

    // Add fallbacks for the missing modules
    contents += `fallbackMissing(modules, [\n`;
    for(let i = 0; i < ids.length; i++) {
        let module = modules[ids[i]];
        const defaultExport = module.defaultExport ? ", defaultExport: true" : "";
        contents += `    {filter: ${module.filter}${defaultExport}},`;
    }
    contents += `\n]);\n\n`;

    // Get the modules into their final form
    const moduleIds = ids.map(id => modules[id].demangler ? `${id}Mangled` : modules[id].getExport ? `${id}Module` : id);
    contents += `const [${moduleIds.join(",")}] = modules;\n\n`;

    for(let i = 0; i < ids.length; i++) {
        let module = modules[ids[i]];
        if(module.demangler) {
            // Add demanglers
            contents += `const ${ids[i]} = demangle(${ids[i]}Mangled, {\n`;
            for(let id in module.demangler) {
                contents += `  ${id}: ${module.demangler[id]},\n`;
            }
            contents += `});\n`
        } else if(module.getExport) {
            // Add getExport calls
            const finder = module.getWithKey ? "findExportWithKey" : "findExport";
            contents += `const ${ids[i]} = ${finder}(${ids[i]}Module, ${module.getExport});\n`;
        }
    }

    contents += `\nexport {${ids.join(",")}}`;

    return contents;
}