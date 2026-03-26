import type { ChannelStore, SelectedChannelStore, SelectedGuildStore } from "@vencord/discord-types";

export const selectedChannelStore = BdApi.Webpack.getStore<SelectedChannelStore>("SelectedChannelStore");
export const selectedGuildStore = BdApi.Webpack.getStore<SelectedGuildStore>("SelectedGuildStore");
export const channelStore = BdApi.Webpack.getStore<ChannelStore>("ChannelStore");