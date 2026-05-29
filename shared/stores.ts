import type { ChannelStore, SelectedChannelStore, SelectedGuildStore } from "@vencord/discord-types";

export const selectedChannelStore = /** @__PURE__ */ BdApi.Webpack.getStore("SelectedChannelStore") as unknown as SelectedChannelStore;
export const selectedGuildStore = /** @__PURE__ */ BdApi.Webpack.getStore("SelectedGuildStore") as unknown as SelectedGuildStore;
export const channelStore = /** @__PURE__ */ BdApi.Webpack.getStore("ChannelStore") as unknown as ChannelStore;