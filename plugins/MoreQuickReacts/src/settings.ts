import { createSettings } from "$shared/util/settings";

interface MoreQuickReactsSettings {
    amount: number;
}

export const settings = createSettings<MoreQuickReactsSettings>([
    {
        type: "slider",
        min: 0,
        max: 30,
        id: "amount",
        name: "Amount of Quick Reacts",
        note: "Switching channels may be required to see changes.",
        step: 1,
        markers: [0, 5, 10, 15, 20, 25, 30]
    }
], {
    amount: 5
});