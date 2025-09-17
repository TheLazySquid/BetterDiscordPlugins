import type { Plugin } from "esbuild";
import fsp from "node:fs/promises";

export function stylesPlugin(): Plugin {
	return {
		name: "styles",
		setup(build) {
			build.onLoad({ filter: /\.css$/ }, async (args) => {
				let buffer = await fsp.readFile(args.path);
				let css = JSON.stringify(buffer.toString())
					.replaceAll("\\r\\n", "\\n")
					.replaceAll("\\n", "\n")
					.replaceAll("\n    ", "\n  "); // esbuild uses double indents
				css = "`" + css.slice(1, -1) + "`";

				const text = 'import { addStyle } from "$shared/api/styles";\n\n' +
					`addStyle(${css})`;

				return {
					contents: text,
					loader: "js"
				}
			});
		}
	}
}