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
    const moduleIds = ids.map(id => modules[id].demangler ? `${id}Mangled` : modules[id].getExport ? `${id}Module` : id);

    let contents = `import { demangle, findExport, findExportWithKey } from "$shared/util/modules";\n\n`;

    if(ids.length === 1) {
        let module = modules[ids[0]];
        contents += `const ${moduleIds[0]} = BdApi.Webpack.getModule((_, __, id) => id == ${module.id})\n\n`;
    } else if(ids.length > 1) {
        contents += `const [${moduleIds}] = BdApi.Webpack.getBulk(\n`;
        for(let i = 0; i < ids.length; i++) {
            let module = modules[ids[i]];
    
            let entry = `{ filter: (_, __, id) => id == ${module.id} }`
            contents += "  " + entry + ",\n";
        }
    
        contents += `);\n\n`;
    }

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