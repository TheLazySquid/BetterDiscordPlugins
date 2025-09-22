import { createSettings } from "$shared/util/settings";

interface MoreQuickReactsSettings {
    amount: number;
}

export const settings = createSettings<MoreQuickReactsSettings>([
    {
        type: "slider",
        min: 3,
        max: 15,
        id: "amount",
        name: "Amount of Quick Reacts",
        note: "Switching channels may be required to see changes.",
        step: 1,
        markers: [3, 6, 9, 12, 15]
    }
], {
    amount: 5
});