import { build, BuildOptions, context } from "npm:esbuild";
import { parseArgs } from "jsr:@std/cli/parse-args";
import { PluginConfig } from "../types.ts";
import waitForEnter, { write } from "./util.ts";
import dir from "https://deno.land/x/dir@1.5.2/mod.ts";
import { join } from "jsr:@std/path";
import { existsSync } from "jsr:@std/fs/exists";

const args = parseArgs(Deno.args, {
    boolean: ["watch", "trigger", "no-copy"],
    string: ["plugin"]
});

if(!args.plugin) throw new Error("Missing plugin name!");

const configPath = `src/${args.plugin}/config.json`;
const config: PluginConfig = JSON.parse(Deno.readTextFileSync(configPath));

const meta = `/**
 * @name ${args.plugin}
 * @description ${config.description}
 * @version ${config.version}
 * @author TheLazySquid
 * @authorId 619261917352951815
 * @website https://github.com/TheLazySquid/BetterDiscordPlugins
 * @source https://github.com/TheLazySquid/BetterDiscordPlugins/tree/main/build/${args.plugin}.plugin.js
 */`

const header = meta + '\n' +
`module.exports = class {
  constructor() {
    let plugin = this;`;

const footer = `  }
}`;

let esbuildConfig: BuildOptions = {
    entryPoints: [`src/${args.plugin}/index.ts`],
    conditions: ["browser"],
    bundle: true,
    outfile: `build/${args.plugin}.plugin.js`,
    banner: {
        js: header
    },
    footer: {
        js: footer
    },
    format: "esm",
    plugins: []
}

// I'm unusure if this works cross-platform
let pluginsDir: string | null = null;

if(!args["no-copy"]) {
    let appData = dir("data");
    if(appData) {
        const checkDir = join(appData, "BetterDiscord", "plugins");
        if(existsSync(checkDir)) pluginsDir = checkDir;
    }
}

if(!pluginsDir && !args["no-copy"]) console.warn("Failed to determine where to put the built plugin! Use --no-copy to disable this.");

function copyPlugin() {
    if(!pluginsDir) return;
    Deno.copyFileSync(`./build/${args.plugin}.plugin.js`, `${pluginsDir}/${args.plugin}.plugin.js`);
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
        building = false;

        copyPlugin();
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
    
    copyPlugin();
}