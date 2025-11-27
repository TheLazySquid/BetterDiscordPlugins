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

    let contents = `import { demangle, findExport, findExportWithKey, getModules } from "$shared/util/modules";\n`
        + "const Filters = BdApi.Webpack.Filters;\n\n";
    
    // Get all the modules
    const moduleIds = ids.map(id => modules[id].demangler ? `${id}Mangled` : modules[id].getExport ? `${id}Module` : id);
    contents += `const [${moduleIds.join(",")}] = getModules([\n`;
    for(let i = 0; i < ids.length; i++) {
        let definition = modules[ids[i]];
        contents += "  {\n"
        if(definition.id) contents += `    id: ${definition.id},\n`;
        contents += `    filter: ${definition.filter},\n`;
        if(definition.defaultExport) contents += `    defaultExport: true,\n`;
        contents += "  },\n";
    }
    contents += `]);\n\n`;

    // Get the modules into their final form
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