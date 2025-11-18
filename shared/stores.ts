import type { SelectedChannelStore, UserStore } from "@vencord/discord-types";

export const channelStore = BdApi.Webpack.getStore<SelectedChannelStore>("SelectedChannelStore");
export const userStore = BdApi.Webpack.getStore<UserStore>("UserStore");