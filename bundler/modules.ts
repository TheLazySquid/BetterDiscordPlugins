import type { Plugin } from "esbuild";
import { modules } from "$shared/modules";
import type { Modules } from "../types";

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
    const normalModules = ids.filter(id => !modules[id].getWithKey);
    const moduleIds = normalModules.map(id => modules[id].demangler ? `${id}Mangled` : id);

    let contents = `import demangle from "$shared/util/demangle";\n\n` +
    `const Filters = BdApi.Webpack.Filters;\n`;

    // Do getWithKey modules first
    for(let i = 0; i < ids.length; i++) {
        let module = modules[ids[i]];
        if(!module.getWithKey) continue;

        contents += `const ${ids[i]} = [...BdApi.Webpack.getWithKey(${module.filter})];\n`
    }

    if(normalModules.length === 1) {
        let module = modules[normalModules[0]];
        contents += `const ${moduleIds[0]} = BdApi.Webpack.getModule(${module.filter}`;
        if(module.defaultExport !== undefined || module.searchExports !== undefined) {
            contents += `, {\n`;
            if(module.defaultExport !== undefined) contents += `  defaultExport: ${module.defaultExport},\n`;
            if(module.searchExports !== undefined) contents += `  searchExports: ${module.searchExports},\n`;
            contents += `}`;
        }
        contents += `);\n\n`;
    } else if(normalModules.length > 1) {
        contents += `const [${moduleIds}] = BdApi.Webpack.getBulk(\n`;
        for(let i = 0; i < ids.length; i++) {
            let module = modules[ids[i]];
            if(module.getWithKey) continue;
    
            let entry = `{ filter: ${module.filter}`
            if(module.defaultExport !== undefined) entry += `, defaultExport: ${module.defaultExport}`;
            if(module.searchExports !== undefined) entry += `, searchExports: ${module.searchExports}`;
            entry += ` }`;
    
            contents += "  " + entry + ",\n";
        }
    
        contents += `);\n\n`;
    }

    for(let i = 0; i < ids.length; i++) {
        let demangler = modules[ids[i]].demangler;
        if(!demangler) continue;

        contents += `const ${ids[i]} = demangle(${ids[i]}Mangled, {\n`;
        for(let id in demangler) {
            contents += `  ${id}: ${demangler[id]},\n`;
        }
        contents += `});\n`
    }

    contents += `\nexport {${ids.join(",")}}`;

    return contents;
}