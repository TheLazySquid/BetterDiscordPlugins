import { after } from "$shared/api/patching";
import { frequentlyUsedEmojis } from "$shared/modules";
import { settings } from "./settings";

after(...frequentlyUsedEmojis, ({ returnVal }) => {
    returnVal.filter = function() {
        const filtered = Array.prototype.filter.apply(this, arguments as any);
        
        filtered.slice = function() {
            return Array.prototype.slice.call(filtered, 0, settings.amount);
        }

        return filtered;
    }

    return returnVal;
});