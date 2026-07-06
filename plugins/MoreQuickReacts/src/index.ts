import "./styles.css";
import { after } from "$shared/api/patching";
import { emojiModule, frequentlyUsedEmojis, ReactionsWrapper } from "$shared/modules";
import { settings } from "./settings";
import { rawGuildEmojiStore } from "$shared/stores";
import { updateRows } from "./rows";
import { onStart } from "$shared/bd";

after(ReactionsWrapper, "type", ({ returnVal }) => {
    returnVal.props.children = BdApi.React.createElement("div", {
        className: "mqr-reacts-grid"
    }, returnVal.props.children);
});

onStart(() => updateRows());

after(...frequentlyUsedEmojis, ({ returnVal }) => {
    returnVal.filter = function() {
        // Add pinned emojis to the start
        const alreadySeen = new Set(settings.pinnedEmojis.map(e => e.id));
        const emojis = settings.pinnedEmojis.map((p) => {
            if(p.type === "builtin") {
                return emojiModule.getByName(p.id);
            } else {
                return rawGuildEmojiStore.getGuildEmojis(p.guildId)[p.id];
            }
        });

        // Hide duplicate emojis
        for(const emoji of this) {
            if(emoji.uniqueName) {
                if(alreadySeen.has(emoji.uniqueName)) continue;
            } else {
                if(alreadySeen.has(emoji.id)) continue;
            }

            emojis.push(emoji);
        }

        const filtered = Array.prototype.filter.apply(emojis, arguments as any);
        
        filtered.slice = function() {
            return Array.prototype.slice.call(filtered, 0, settings.amount);
        }

        return filtered;
    }

    return returnVal;
});