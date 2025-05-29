import { onStart } from "../bd";
import { channelStore, CloudUploader, uploader } from "../modules";
import { pluginName } from "meta";

// Mostly taken from https://github.com/Yentis/betterdiscord-emotereplacer/blob/master/EmoteReplacer.plugin.js
// Feels like there's probably a cleaner solution but I can't complain
let pendingReply: any = null;
const [module, createKey]: [any, string] = BdApi.Webpack.getWithKey(BdApi.Webpack.Filters.byStrings("CREATE_PENDING_REPLY"));
let deleteKey: string, setShouldMentionKey: string;
for(const [k, v] of Object.entries(BdApi.Webpack)) {
	const str = v.toString()
	if(str.includes("DELETE_PENDING_REPLY")) deleteKey = k;
	else if(str.includes("SET_PENDING_REPLY_SHOULD_MENTION")) setShouldMentionKey = k;
}

onStart(() => {
	BdApi.Patcher.after(pluginName, module, createKey, (_, args) => {
		if(args[0]) pendingReply = args[0];
	});
	BdApi.Patcher.after(pluginName, module, deleteKey, () => {
		pendingReply = null;
	});
	BdApi.Patcher.after(pluginName, module, setShouldMentionKey, (_, args) => {
		if(!args[0] || pendingReply?.channel.id === args[0]) return;
		pendingReply.shouldMention = args[1];
	});
});

export async function uploadFile(file: File) {
	const channelId = channelStore.getCurrentlySelectedChannelId();
	const upload = new CloudUploader({ file, platform: 1 }, channelId);

	let options: any = {
		channelId,
		uploads: [upload],
		draftType: 0,
		parsedMessage: {
			content: "",
			invalidEmojis: [],
			tts: false,
			channel_id: channelId
		}
	}

	if(pendingReply) {
		options.options = {
			allowedMentions: {
				replied_user: pendingReply.shouldMention,
			},
			messageReference: {
				channel_id: pendingReply.message.channel_id,
				guild_id: pendingReply.channel.guild_id,
				message_id: pendingReply.message.id,
			}
		}
	}

	await uploader.uploadFiles(options);
}