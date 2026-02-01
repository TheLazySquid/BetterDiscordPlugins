import { before } from "$shared/api/patching";
import { error } from "$shared/api/toast";
import { selectedChannelStore } from "$shared/stores";
import { chatbox, CloudUploader } from "$shared/modules";

let onSubmit: ((args: any) => void) | null = null;
before(chatbox?.type, "render", ({ args }) => onSubmit = args[0].onSubmit);

export async function uploadFile(file: File) {
	const channelId = selectedChannelStore.getCurrentlySelectedChannelId();
	if(!channelId) return;
	
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