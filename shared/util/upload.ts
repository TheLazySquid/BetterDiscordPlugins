import { after } from "$shared/api/patching";
import { channelStore, selectedChannelStore } from "$shared/stores";
import { attachFiles, scroller } from "$shared/modules";
import { submitMessage } from "./submitMessage";

let scrollerInstance: any = null;
after(...scroller, ({ returnVal }) => scrollerInstance = returnVal);

export async function uploadFile(file: File, autoSend: boolean) {
	const channelId = selectedChannelStore.getCurrentlySelectedChannelId();
	if(!channelId) return;
	
	const channel = channelStore.getChannel(channelId);
	if(!channel) return;

	const attach = attachFiles[0][attachFiles[1]];
	await attach([ file ], channel, 0, { requireConfirm: true, origin: "file_picker" });
	
	if(!autoSend) return;
	submitMessage();
	setTimeout(() => scrollerInstance?.scrollToBottom?.(), 0);
}