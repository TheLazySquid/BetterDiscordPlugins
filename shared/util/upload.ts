import { after, before } from "$shared/api/patching";
import { error } from "$shared/api/toast";
import { channelStore, selectedChannelStore } from "$shared/stores";
import { attachFiles, editorEvents, scrollerWrapper } from "$shared/modules";

let submit: (() => void) | null = null;
before(...editorEvents, ({ args }) => submit = args[0].submit);

let scroller: any = null;
after(...scrollerWrapper, ({ returnVal }) => scroller = returnVal);

export async function uploadFile(file: File, autoSend: boolean) {
	if(!submit) {
		error("Failed to send file, try switching channels");
		return;
	}

	const channelId = selectedChannelStore.getCurrentlySelectedChannelId();
	if(!channelId) return;
	
	const channel = channelStore.getChannel(channelId);
	if(!channel) return;

	const attach = attachFiles[0][attachFiles[1]];
	await attach([ file ], channel, 0, { requireConfirm: true, origin: "file_picker" });
	
	if(!autoSend) return;
	submit();
	setTimeout(() => scroller?.setScrollToBottom?.(), 0);
}