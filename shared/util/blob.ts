import { onStart, onStop } from "$shared/bd";

export function getUrl(data: BlobPart, type = "application/javascript") {
	let output: { url: string | null } = { url: null };

	onStart(() => {
		const blob = new Blob([ data ], { type });
		output.url = URL.createObjectURL(blob);

		onStop(() => {
			if(!output.url) return;
			URL.revokeObjectURL(output.url);
			output.url = null;
		}, true);
	});

	return output;
}