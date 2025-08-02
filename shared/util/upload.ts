import { before } from "$shared/api/patching";
import { error } from "$shared/api/toast";
import { channelStore, chatbox, CloudUploader } from "../modules";

let onSubmit: ((args: any) => void) | null = null;
before(chatbox?.type, "render", ({ args }) => 	onSubmit = args[0].onSubmit);

export async function uploadFile(file: File) {
	const channelId = channelStore.getCurrentlySelectedChannelId();
	const upload = new CloudUploader({ file, platform: 1 }, channelId);

	if(!onSubmit) {
		error("Failed to send file, try switching channels");
		return;
	}

	onSubmit({
		value: "",
		stickers: [],
		uploads: [upload]
	});
}