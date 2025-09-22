/**
 * @name MoreQuickReacts
 * @description Increases the number of quick reactions available when hovering over a message
 * @version 1.0.0
 * @author TheLazySquid
 * @authorId 619261917352951815
 * @website https://github.com/TheLazySquid/BetterDiscordPlugins
 * @source https://github.com/TheLazySquid/BetterDiscordPlugins/tree/main/plugins/MoreQuickReacts/MoreQuickReacts.plugin.js
 */
module.exports = class {
  constructor() {
    let plugin = this;

// meta-ns:meta
var pluginName = "MoreQuickReacts";

// shared/bd.ts
var Api = new BdApi(pluginName);
var createCallbackHandler = (callbackName) => {
  const fullName = callbackName + "Callbacks";
  plugin[fullName] = [];
  plugin[callbackName] = () => {
    for (let i = 0; i < plugin[fullName].length; i++) {
      plugin[fullName][i].callback();
    }
  };
  return (callback, once, id) => {
    let object = { callback };
    const delCallback = () => {
      plugin[fullName].splice(plugin[fullName].indexOf(object), 1);
    };
    if (once === true) {
      object.callback = () => {
        callback();
        delCallback();
      };
    }
    if (id) {
      object.id = id;
      for (let i = 0; i < plugin[fullName].length; i++) {
        if (plugin[fullName][i].id === id) {
          plugin[fullName][i] = object;
          return delCallback;
        }
      }
    }
    plugin[fullName].push(object);
    return delCallback;
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

// modules-ns:$shared/modules
var frequentlyUsedEmojisModule = BdApi.Webpack.getModule((_, __, id) => id == 543241);
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
