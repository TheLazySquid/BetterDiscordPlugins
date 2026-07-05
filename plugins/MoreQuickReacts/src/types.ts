export interface ServerEmoji {
    type: "server";
    guildId: string;
    id: string;
}

export interface BuiltinEmoji {
    type: "builtin";
    id: string;
}

export type Emoji = ServerEmoji | BuiltinEmoji;

export interface MoreQuickReactsSettings {
    amount: number;
    pinnedEmojis: Emoji[];
}