import { SelectedChannelStore } from "@vencord/discord-types";

export const channelStore = BdApi.Webpack.getStore<SelectedChannelStore>("SelectedChannelStore");