/**
 * @name MoreQuickReacts
 * @description Increases the number of quick reactions available when hovering over a message
 * @version 1.0.1
 * @author TheLazySquid
 * @authorId 619261917352951815
 * @website https://github.com/TheLazySquid/BetterDiscordPlugins
 * @source https://github.com/TheLazySquid/BetterDiscordPlugins/tree/main/plugins/MoreQuickReacts/MoreQuickReacts.plugin.js
 * @invite https://discord.gg/fKdAaFYbD5
 */
module.exports = class {
  constructor() {
    let plugin = this;

// meta-ns:meta
var pluginName = "MoreQuickReacts";

// shared/bd.ts
var Api = new BdApi(pluginName);
var createCallbackHandler = (callbackName) => {
  let callbacks = [];
  plugin[callbackName] = () => {
    for (let i = 0; i < callbacks.length; i++) {
      callbacks[i].callback();
      if (callbacks[i].once) {
        callbacks.splice(i, 1);
        i--;
      }
    }
  };
  return (callback, once) => {
    callbacks.push({ callback, once });
  };
};
var onStart = createCallbackHandler("start");
var onStop = createCallbackHandler("stop");
var onSwitch = createCallbackHandler("onSwitch");
function setSettingsPanel(el) {
  if (typeof el === "function") plugin.getSettingsPanel = el;
  plugin.getSettingsPanel = () => el;
}

// shared/api/patching.ts
function check(module, key) {
  if (!module || !key) {
    Api.Logger.warn("Missing module or key", module, key);
    return false;
  }
  return true;
}
function after(module, key, callback) {
  if (!check(module, key)) return;
  onStart(() => {
    Api.Patcher.after(module, key, (thisVal, args, returnVal) => {
      return callback({ thisVal, args, returnVal });
    });
  });
}
onStop(() => {
  Api.Patcher.unpatchAll();
});

// shared/util/modules.ts
function findExportWithKey(module, filter) {
  for (let key in module) {
    if (filter !== true && !filter(module[key])) continue;
    return [module, key];
  }
}
function fallbackMissing(modules2, filters) {
  let missingIndexes = [];
  let queries = [];
  for (let i = 0; i < modules2.length; i++) {
    if (modules2[i]) continue;
    missingIndexes.push(i);
    queries.push(filters[i]);
  }
  if (missingIndexes.length === 0) return;
  Api.Logger.warn("Some modules not found by id:", missingIndexes.join(", "));
  const found = BdApi.Webpack.getBulk(...queries);
  for (let i = 0; i < missingIndexes.length; i++) {
    modules2[missingIndexes[i]] = found[i];
    if (!found[i]) Api.Logger.warn("Fallback filter failed for module", missingIndexes[i]);
  }
}

// modules-ns:$shared/modules
var Filters = BdApi.Webpack.Filters;
var modules = BdApi.Webpack.getBulk(
  { filter: (_, __, id) => id == 543241 }
);
fallbackMissing(modules, [
  { filter: (m) => Object.values(m).some(Filters.byStrings("getFrequentlyUsedReactionEmojisWithoutFetchingLatest", "loadIfNecessary")) }
]);
var [frequentlyUsedEmojisModule] = modules;
var frequentlyUsedEmojis = findExportWithKey(frequentlyUsedEmojisModule, (e) => e.toString().includes("getFrequentlyUsedReactionEmojisWithoutFetchingLatest"));

// shared/util/settings.ts
function createSettings(panelSettings, defaults) {
  const settings2 = {};
  for (let setting of panelSettings) {
    if (!setting.id) continue;
    settings2[setting.id] = Api.Data.load(setting.id) ?? defaults[setting.id];
  }
  setSettingsPanel(() => {
    for (let setting of panelSettings) {
      setting.value = settings2[setting.id];
    }
    return BdApi.UI.buildSettingsPanel({
      settings: panelSettings,
      onChange: (_, id, value) => {
        settings2[id] = value;
        Api.Data.save(id, value);
      }
    });
  });
  return settings2;
}

// plugins/MoreQuickReacts/src/settings.ts
var settings = createSettings([
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

// plugins/MoreQuickReacts/src/index.ts
after(...frequentlyUsedEmojis, ({ returnVal }) => {
  returnVal.filter = function() {
    const filtered = Array.prototype.filter.apply(this, arguments);
    filtered.slice = function() {
      return Array.prototype.slice.call(filtered, 0, settings.amount);
    };
    return filtered;
  };
  return returnVal;
});
  }
}
