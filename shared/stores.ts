import type { SelectedChannelStore, SelectedGuildStore } from "@vencord/discord-types";

export const selectedChannelStore = BdApi.Webpack.getStore<SelectedChannelStore>("SelectedChannelStore");
export const selectedGuildStore = BdApi.Webpack.getStore<SelectedGuildStore>("SelectedGuildStore");