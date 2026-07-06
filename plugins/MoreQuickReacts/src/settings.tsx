import type { Emoji, MoreQuickReactsSettings } from "./types";
import { Api, setSettingsPanel } from "$shared/bd"
import { emojiModule, modalMethods, EmojiDisplay, EmojiPicker } from "$shared/modules";
import { LucideIcon } from "$shared/ui/icons";
import { ArrowUp, ArrowDown, Trash } from "lucide";
import { updateRows } from "./rows";

function pickEmoji(onSelect: (emoji: Emoji) => void) {
    let modalId = BdApi.UI.showConfirmationModal(
        "Select emoji to pin",
        <EmojiPicker
            closePopout={() => {}}
            containerWidth={768}
            emojiSize={40}
            hasTabWrapper={false}
            onSelectEmoji={({ emoji }: any) => {
                if(emoji.uniqueName) {
                    onSelect({
                        type: "builtin",
                        id: emoji.uniqueName
                    });
                } else {
                    onSelect({
                        type: "server",
                        guildId: emoji.guildId,
                        id: emoji.id
                    });
                }

                modalMethods.closeModal(modalId!);
            }}
            onSelectSoundmoji={() => {}}
            persistSearch={true}
            pickerIntention={3}
            shouldShowSoundmojiInEmojiPicker={false}
            showAddEmojiButton={false}
        />,
        {
            cancelText: null,
            confirmText: "Cancel",
            onConfirm: () => modalMethods.closeModal(modalId!),
            onCancel: () => modalMethods.closeModal(modalId!),
            size: "bd-modal-medium"
        }
    )
}

export const settings: MoreQuickReactsSettings = {
    amount: 10,
    rows: 1,
    pinnedEmojis: []
};

// Load saved settings
for(const key in settings) {
    const saved = Api.Data.load(key) as any;
    if(saved) settings[key as keyof MoreQuickReactsSettings] = saved;
}

const onUpdate = (key: keyof MoreQuickReactsSettings) => Api.Data.save(key, settings[key]);

function PinnedEmojis() {
    const [pinnedEmojis, setPinnedEmojis] = BdApi.React.useState([...settings.pinnedEmojis]);
    
    const updatePinned = () => {
        setPinnedEmojis([...settings.pinnedEmojis]);
        onUpdate("pinnedEmojis");
    }

    const addPin = () => {
        pickEmoji((emoji) => {
            settings.pinnedEmojis.push(emoji);
            updatePinned();
        });
    };

    const deletePin = (index: number) => {
        settings.pinnedEmojis.splice(index, 1);
        updatePinned();
    }

    const movePinUp = (index: number) => {
        if(index <= 0) return;

        const removed = settings.pinnedEmojis.splice(index, 1);
        settings.pinnedEmojis.splice(index - 1, 0, ...removed);

        updatePinned();
    }

    const movePinDown = (index: number) => {
        if(index >= pinnedEmojis.length - 1) return;

        const removed = settings.pinnedEmojis.splice(index, 1);
        settings.pinnedEmojis.splice(index + 1, 0, ...removed);

        updatePinned();
    }

    return (
        <div className="mqr-pins">
            {pinnedEmojis.map((e, i) => (
                <div key={e.id} className="mqr-pinned">
                    <div>{i + 1}.</div>
                    <div className="preview">
                        {e.type === "builtin" ? (
                            <EmojiDisplay
                                emojiName={emojiModule.getByName(e.id).surrogates}
                            />
                        ) : (
                            <EmojiDisplay
                                emojiId={e.id}
                            />
                        )}
                    </div>
                    <button onClick={() => deletePin(i)}>
                        <LucideIcon icon={Trash} />
                    </button>
                    <button onClick={() => movePinUp(i)}>
                        <LucideIcon icon={ArrowUp} />
                    </button>
                    <button onClick={() => movePinDown(i)}>
                        <LucideIcon icon={ArrowDown} />
                    </button>
                </div>
            ))}
            <button onClick={addPin} className="mqr-addPin">
                + Add pin
            </button>
        </div>
    )
}

setSettingsPanel(() => {
    return (
        <div>
            {BdApi.UI.buildSettingItem({
                value: settings.amount,
                onChange: (amount: number) => {
                    settings.amount = amount;
                    onUpdate("amount");
                },
                type: "slider",
                min: 0,
                max: 30,
                id: "amount",
                name: "Amount of Quick Reacts",
                note: "Switching channels may be required to see changes.",
                step: 1,
                markers: [0, 5, 10, 15, 20, 25, 30],
                inline: false
            })}
            {BdApi.UI.buildSettingItem({
                value: settings.rows,
                onChange: (rows: number) => {
                    settings.rows = rows;
                    onUpdate("rows");
                    updateRows();
                },
                type: "slider",
                min: 1,
                max: 10,
                id: "rows",
                name: "Rows of Quick Reacts",
                note: "Has no effect on total reacts shown.",
                step: 1,
                markers: [0, 2, 4, 6, 8, 10],
                inline: false
            })}
            <div className="mqr-settingSection">Pinned Emojis</div>
            <PinnedEmojis />
        </div>
    )
});