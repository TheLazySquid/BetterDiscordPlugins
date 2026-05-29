import type { ModuleLocator } from "../types";
import * as Modules from "$shared/modules";

let code = `const Filters = BdApi.Webpack.Filters;

const checkId = (name, id, filter, defaultExport) => {
    const realId = BdApi.Webpack.getModule(filter, { raw: true, defaultExport }).id;
    if(realId !== id) console.log(name + " should be " + realId);
}\n\n`;

for(const module of Object.values(Modules) as ModuleLocator[]) {
    if(!module.id) continue;
    code += `checkId("${module.name}", ${module.id}, ${module.filter}, ${module.defaultExport ?? true});\n`;
}

console.log(code);