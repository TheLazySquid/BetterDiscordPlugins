import { onStart } from "../../util/bdFuncs";

let lastUsed: Record<string, number> = {};

onStart(() => {
    if(Object.keys(lastUsed).length === 0) {
        // Load lastUsed from file
        let found = BdApi.Data.load("ImageFolder", "lastUsed")
        if(found) lastUsed = JSON.parse(found);
    }
})

export function setLastUsed(imgPath: string) {
    lastUsed[imgPath] = Date.now();
    BdApi.Data.save("ImageFolder", "lastUsed", JSON.stringify(lastUsed));
}

export function getLastUsed(imgPath: string) {
    return lastUsed[imgPath] ?? 0; // just say they sent it fifty years ago lol
}