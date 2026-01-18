import type { PluginConfig } from "../types.ts";
import { build, context, type BuildOptions } from "esbuild";
import waitForEnter, { write } from "./util.ts";
import { join } from "node:path";
import { existsSync } from "node:fs";
import { parseArgs } from "node:util";
import { metaPlugin } from "./plugins/meta.ts";
import { stylesPlugin } from "./plugins/styles.ts";
import { modulesPlugin } from "./plugins/modules.ts";
import { noReactPlugin } from "./plugins/noReact.ts";

const args = parseArgs({
    args: process.argv.slice(2),
    options: {
        plugin: {
            type: "string"
        },
        watch: {
            type: "boolean",
            short: "w"
        },
        trigger: {
            type: "boolean",
            short: "t"
        },
        nocopy: {
            type: "boolean",
            short: "n"
        }
    }
}).values;

if(!args.plugin) throw new Error("Missing plugin name!");

const configPath = `./plugins/${args.plugin}/config.json`;
const configFile = Bun.file(configPath);
const config: PluginConfig = await configFile.json();

const meta = `/**
 * @name ${args.plugin}
 * @description ${config.description}
 * @version ${config.version}
 * @author TheLazySquid
 * @authorId 619261917352951815
 * @website https://github.com/TheLazySquid/BetterDiscordPlugins
 * @source https://github.com/TheLazySquid/BetterDiscordPlugins/tree/main/plugins/${args.plugin}/${args.plugin}.plugin.js
 * @invite fKdAaFYbD5
 */`

const header = meta + '\n' +
`module.exports = class {
  constructor() {
    let plugin = this;`;

const footer = `  }
}`;

const isTsx = existsSync(`./plugins/${args.plugin}/src/index.tsx`);
let esbuildConfig: BuildOptions = {
    entryPoints: [`./plugins/${args.plugin}/src/index.${isTsx ? "tsx" : "ts"}`],
    conditions: ["browser"],
    bundle: true,
    outfile: `plugins/${args.plugin}/${args.plugin}.plugin.js`,
    loader: {
        ".otf": "binary"
    },
    banner: {
        js: header
    },
    footer: {
        js: footer
    },
    format: "esm",
    plugins: [metaPlugin(args.plugin), stylesPlugin(), noReactPlugin()],
    external: [
        "fs", "path", "buffer", "electron"
    ],
    jsx: "transform",
    jsxFactory: "BdApi.React.createElement",
    legalComments: "none"
}

if(config.modules) esbuildConfig.plugins?.push(modulesPlugin(config.modules));

// I'm unusure if this works cross-platform
let pluginsDir: string | null = null;

if(!args.nocopy) {
    const appData = process.env.APPDATA ||
        (process.platform == 'darwin' ?
        process.env.HOME + '/Library/Preferences' :
        process.env.HOME + "/.local/share");

    const checkDir = join(appData, "BetterDiscord", "plugins");
    if(existsSync(checkDir)) pluginsDir = checkDir;
}

if(!pluginsDir && !args.nocopy) console.warn("Failed to determine where to put the built plugin! Use --no-copy to disable this.");

async function copyPlugin() {
    if(!pluginsDir) return;
    const input = Bun.file(`./plugins/${args.plugin}/${args.plugin}.plugin.js`);
    await Bun.write(`${pluginsDir}/${args.plugin}.plugin.js`, input);
}

if(args.trigger) {
    let building = false;
    
    waitForEnter(async () => {
        if(building) return;
        building = true;

        write('\x1b[2K\rBuilding...');
        console.time("Built")

        await build(esbuildConfig);
        
        write('\x1b[2K\r');
        console.timeEnd("Built");
        write("Press enter to build...");
        await copyPlugin();

        building = false;
    });
} else if(args.watch) {
    esbuildConfig.plugins?.push({
        name: "rebuild-notify",
        setup(build) {
            build.onStart(() => {
                write("Building...")
                console.time("Built");
            })
            build.onEnd(result => {
                write("\r");
                console.timeEnd("Built");
                if(result.errors.length > 0) {
                    console.log("Build finished with", result.errors, "errors");
                }

                copyPlugin();
            })
        }
    })

    const ctx = await context(esbuildConfig);
    await ctx.watch();
} else {
    console.time("Built");
    await build(esbuildConfig);
    console.timeEnd("Built");
    
    await copyPlugin();
}