import type { Plugin } from "esbuild"

export function metaPlugin(pluginName: string): Plugin {
	return {
		name: "meta",
		setup(build) {
			build.onResolve({ filter: /^meta$/ }, args => ({
				path: args.path,
				namespace: "meta-ns"
			}));

			build.onLoad({ filter: /.*/, namespace: "meta-ns" }, () => ({
				contents: JSON.stringify({
					pluginName
				}),
				loader: "json"
			}));
		}
	}
}