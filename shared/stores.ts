import type { ChannelStore, SelectedChannelStore, SelectedGuildStore } from "@vencord/discord-types";

export const selectedChannelStore = /** @__PURE__ */ BdApi.Webpack.getStore<SelectedChannelStore>("SelectedChannelStore");
export const selectedGuildStore = /** @__PURE__ */ BdApi.Webpack.getStore<SelectedGuildStore>("SelectedGuildStore");
export const channelStore = /** @__PURE__ */ BdApi.Webpack.getStore<ChannelStore>("ChannelStore");