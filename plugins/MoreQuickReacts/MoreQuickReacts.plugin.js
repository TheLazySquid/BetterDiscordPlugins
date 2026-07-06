/**
 * @name MoreQuickReacts
 * @description Increases the number of quick reactions available when hovering over a message, and pin ones of your choosing
 * @version 1.2.2
 * @author TheLazySquid
 * @authorId 619261917352951815
 * @website https://github.com/TheLazySquid/BetterDiscordPlugins
 * @source https://github.com/TheLazySquid/BetterDiscordPlugins/tree/main/plugins/MoreQuickReacts/MoreQuickReacts.plugin.js
 * @invite fKdAaFYbD5
 */
module.exports = class {
  constructor() {
    let plugin = this;

// meta-ns:meta
var pluginName = "MoreQuickReacts";

// shared/bd.ts
var Api = /* @__PURE__ */ new BdApi(pluginName);
var started = false;
var createCallbackHandler = (callbackName, changeStarted) => {
  let callbacks = [];
  plugin[callbackName] = () => {
    if (typeof changeStarted === "boolean") started = changeStarted;
    for (let i = 0; i < callbacks.length; i++) {
      callbacks[i].callback();
      if (callbacks[i].once) {
        callbacks.splice(i, 1);
        i--;
      }
    }
  };
  return (callback, once) => {
    if (changeStarted && started) {
      callback();
      if (once) return;
    }
    callbacks.push({ callback, once });
  };
};
var onStart = createCallbackHandler("start", true);
var onStop = createCallbackHandler("stop", false);
function setSettingsPanel(el) {
  if (typeof el === "function") plugin.getSettingsPanel = el;
  plugin.getSettingsPanel = () => el;
}

// shared/api/styles.ts
var count = 0;
function addStyle(css) {
  let styleId = count++;
  onStart(() => {
    Api.DOM.addStyle(`${pluginName}-${styleId}`, css);
  });
}
onStop(() => {
  for (let i = 0; i < count; i++) {
    Api.DOM.removeStyle(`${pluginName}-${i}`);
  }
});

// plugins/MoreQuickReacts/src/styles.css
addStyle(`.mqr-pins {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 10px;
  margin-bottom: 20px;
}

.mqr-pins button {
  background-color: transparent;
  color: white;
  padding: 0;
}

.mqr-pinned {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 10px;
  background-color: var(--background-base-lower);
  border-radius: 4px;
}

.mqr-pinned > .preview {
  flex-grow: 1;
}

.mqr-pins .mqr-addPin {
  background-color: var(--background-base-lower);
  border-radius: 4px;
  padding: 4px 10px;
}

.mqr-settingSection {
  font-weight: 500;
  font-size: 16px;
}

.mqr-reacts-grid {
  display: grid;
  grid-auto-flow: column;
}`);

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
function getSyncModules(locators) {
  let returned = {};
  const queries = locators.map(createQuery);
  const modules = BdApi.Webpack.getBulk(...queries);
  for (let i = 0; i < locators.length; i++) {
    const locator = locators[i];
    const module = modules[i];
    if (!module) {
      Api.Logger.warn(`Could not find module for ${locator.name}`);
      continue;
    }
    returned[locator.name] = finalizeModule(locator, module);
  }
  return returned;
}
function getLazyModules(locators) {
  let returned = {};
  for (let locator of locators) {
    returned[locator.name] = new LazyModule(locator);
  }
  return returned;
}
var LazyModule = class {
  constructor(locator) {
    this.locator = locator;
    const { promise, resolve } = Promise.withResolvers();
    BdApi.Webpack.waitForModule(locator.filter, {
      firstId: locator.id,
      cacheId: locator.name,
      defaultExport: locator.defaultExport ?? true,
      declarationFilter: locator.declarationFilter
    })?.then((module) => {
      this.value = module;
      resolve(finalizeModule(locator, module));
    });
    this.loaded = promise;
  }
  value = null;
  loaded;
  loading = false;
  load() {
    if (!this.locator.lazyImporter) throw new Error("Attempted to load a lazy module with no importer");
    if (this.loading) return this.loaded;
    this.loading = true;
    const importer = this.locator.lazyImporter;
    const importerModule = BdApi.Webpack.getModule(importer.filter, {
      firstId: importer.id,
      cacheId: `${this.locator.name}-importer`,
      raw: true
    });
    BdApi.Utils.forceLoad(importerModule.id);
    return this.loaded;
  }
};
function createQuery(locator) {
  return {
    filter: locator.filter,
    firstId: locator.id,
    defaultExport: locator.defaultExport,
    cacheId: locator.name,
    declarationFilter: locator.declarationFilter
  };
}
function finalizeModule(locator, module) {
  if (locator.demangler) {
    return BdApi.Utils.mapObject(module, locator.demangler);
  }
  if (locator.getExport) {
    if (locator.getWithKey) {
      return findExportWithKey(module, locator.getExport);
    } else {
      return findExport(module, locator.getExport);
    }
  }
  if (locator.key) {
    return module[locator.key];
  }
  return module;
}
function findExport(module, filter) {
  for (let value of Object.values(module)) {
    if (filter === true || filter(value)) return value;
  }
}
function findExportWithKey(module, filter) {
  for (let key in module) {
    if (filter !== true && !filter(module[key])) continue;
    return [module, key];
  }
}

// modules-ns:$shared/modules
var Filters = BdApi.Webpack.Filters;
var { frequentlyUsedEmojis, modalMethods, emojiModule, EmojiDisplay, EmojiPicker } = getSyncModules([
  {
    name: "frequentlyUsedEmojis",
    id: 822123,
    getExport: (e) => e.toString().includes("getFrequentlyUsedReactionEmojisWithoutFetchingLatest"),
    getWithKey: true,
    filter: (m) => Object.values(m).some(Filters.byStrings("getFrequentlyUsedReactionEmojisWithoutFetchingLatest", "loadIfNecessary"))
  },
  {
    name: "modalMethods",
    id: 192308,
    filter: Filters.byKeys("openModal")
  },
  {
    name: "emojiModule",
    id: 7584,
    filter: Filters.byKeys("EMOJI_NAME_RE")
  },
  {
    name: "EmojiDisplay",
    id: 565645,
    filter: Filters.bySource("useThoughtfullyAnimated", "untriggerAnimation"),
    getExport: true
  },
  {
    name: "EmojiPicker",
    id: 334295,
    filter: Filters.bySource(".EMOJI_PICKER_POPOUT", "expandedSectionsByGuildIds"),
    getExport: true
  }
]);
var { ReactionsWrapper } = getLazyModules([
  {
    name: "ReactionsWrapper",
    id: 981714,
    filter: Filters.bySource(".EmojiIntention.REACTION", ".reactions.filter("),
    declarationFilter: (d) => d?.type?.toString().includes("isEmojiFilteredOrLocked"),
    lazy: true
  }
]);

// shared/ui/icons.tsx
function LucideIcon({ icon, size = 24, color, className }) {
  const stroke = color ?? "currentColor";
  return /* @__PURE__ */ BdApi.React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke, "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", className }, icon.map(([tag, attrs]) => BdApi.React.createElement(tag, attrs)));
}

// node_modules/lucide/dist/esm/icons/arrow-down.js
var ArrowDown = [
  ["path", { d: "M12 5v14" }],
  ["path", { d: "m19 12-7 7-7-7" }]
];

// node_modules/lucide/dist/esm/icons/arrow-up.js
var ArrowUp = [
  ["path", { d: "m5 12 7-7 7 7" }],
  ["path", { d: "M12 19V5" }]
];

// node_modules/lucide/dist/esm/icons/trash.js
var Trash = [
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" }],
  ["path", { d: "M3 6h18" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" }]
];

// plugins/MoreQuickReacts/src/rows.ts
function updateRows() {
  const css = `.mqr-reacts-grid { grid-template-rows: repeat(${settings.rows}, 1fr) }`;
  Api.DOM.addStyle("mqr-rows", css);
}
onStop(() => Api.DOM.removeStyle("mqr-rows"));

// plugins/MoreQuickReacts/src/settings.tsx
function pickEmoji(onSelect) {
  let modalId = BdApi.UI.showConfirmationModal(
    "Select emoji to pin",
    /* @__PURE__ */ BdApi.React.createElement(
      EmojiPicker,
      {
        closePopout: () => {
        },
        containerWidth: 768,
        emojiSize: 40,
        hasTabWrapper: false,
        onSelectEmoji: ({ emoji }) => {
          if (emoji.uniqueName) {
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
          modalMethods.closeModal(modalId);
        },
        onSelectSoundmoji: () => {
        },
        persistSearch: true,
        pickerIntention: 3,
        shouldShowSoundmojiInEmojiPicker: false,
        showAddEmojiButton: false
      }
    ),
    {
      cancelText: null,
      confirmText: "Cancel",
      onConfirm: () => modalMethods.closeModal(modalId),
      onCancel: () => modalMethods.closeModal(modalId),
      size: "bd-modal-medium"
    }
  );
}
var settings = {
  amount: 10,
  rows: 1,
  pinnedEmojis: []
};
for (const key in settings) {
  const saved = Api.Data.load(key);
  if (saved) settings[key] = saved;
}
var onUpdate = (key) => Api.Data.save(key, settings[key]);
function PinnedEmojis() {
  const [pinnedEmojis, setPinnedEmojis] = BdApi.React.useState([...settings.pinnedEmojis]);
  const updatePinned = () => {
    setPinnedEmojis([...settings.pinnedEmojis]);
    onUpdate("pinnedEmojis");
  };
  const addPin = () => {
    pickEmoji((emoji) => {
      settings.pinnedEmojis.push(emoji);
      updatePinned();
    });
  };
  const deletePin = (index) => {
    settings.pinnedEmojis.splice(index, 1);
    updatePinned();
  };
  const movePinUp = (index) => {
    if (index <= 0) return;
    const removed = settings.pinnedEmojis.splice(index, 1);
    settings.pinnedEmojis.splice(index - 1, 0, ...removed);
    updatePinned();
  };
  const movePinDown = (index) => {
    if (index >= pinnedEmojis.length - 1) return;
    const removed = settings.pinnedEmojis.splice(index, 1);
    settings.pinnedEmojis.splice(index + 1, 0, ...removed);
    updatePinned();
  };
  return /* @__PURE__ */ BdApi.React.createElement("div", { className: "mqr-pins" }, pinnedEmojis.map((e, i) => /* @__PURE__ */ BdApi.React.createElement("div", { key: e.id, className: "mqr-pinned" }, /* @__PURE__ */ BdApi.React.createElement("div", null, i + 1, "."), /* @__PURE__ */ BdApi.React.createElement("div", { className: "preview" }, e.type === "builtin" ? /* @__PURE__ */ BdApi.React.createElement(
    EmojiDisplay,
    {
      emojiName: emojiModule.getByName(e.id).surrogates
    }
  ) : /* @__PURE__ */ BdApi.React.createElement(
    EmojiDisplay,
    {
      emojiId: e.id
    }
  )), /* @__PURE__ */ BdApi.React.createElement("button", { onClick: () => deletePin(i) }, /* @__PURE__ */ BdApi.React.createElement(LucideIcon, { icon: Trash })), /* @__PURE__ */ BdApi.React.createElement("button", { onClick: () => movePinUp(i) }, /* @__PURE__ */ BdApi.React.createElement(LucideIcon, { icon: ArrowUp })), /* @__PURE__ */ BdApi.React.createElement("button", { onClick: () => movePinDown(i) }, /* @__PURE__ */ BdApi.React.createElement(LucideIcon, { icon: ArrowDown })))), /* @__PURE__ */ BdApi.React.createElement("button", { onClick: addPin, className: "mqr-addPin" }, "+ Add pin"));
}
setSettingsPanel(() => {
  return /* @__PURE__ */ BdApi.React.createElement("div", null, BdApi.UI.buildSettingItem({
    value: settings.amount,
    onChange: (amount) => {
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
  }), BdApi.UI.buildSettingItem({
    value: settings.rows,
    onChange: (rows) => {
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
  }), /* @__PURE__ */ BdApi.React.createElement("div", { className: "mqr-settingSection" }, "Pinned Emojis"), /* @__PURE__ */ BdApi.React.createElement(PinnedEmojis, null));
});

// shared/stores.ts
var rawGuildEmojiStore = /* @__PURE__ */ BdApi.Webpack.getStore("RawGuildEmojiStore");

// plugins/MoreQuickReacts/src/index.ts
ReactionsWrapper.loaded.then((Wrapper) => {
  after(Wrapper, "type", ({ returnVal }) => {
    returnVal.props.children = BdApi.React.createElement("div", {
      className: "mqr-reacts-grid"
    }, returnVal.props.children);
  });
});
onStart(() => updateRows());
after(...frequentlyUsedEmojis, ({ returnVal }) => {
  returnVal.filter = function() {
    const alreadySeen = new Set(settings.pinnedEmojis.map((e) => e.id));
    const emojis = settings.pinnedEmojis.map((p) => {
      if (p.type === "builtin") {
        return emojiModule.getByName(p.id);
      } else {
        return rawGuildEmojiStore.getGuildEmojis(p.guildId)[p.id];
      }
    });
    for (const emoji of this) {
      if (emoji.uniqueName) {
        if (alreadySeen.has(emoji.uniqueName)) continue;
      } else {
        if (alreadySeen.has(emoji.id)) continue;
      }
      emojis.push(emoji);
    }
    const filtered = Array.prototype.filter.apply(emojis, arguments);
    filtered.slice = function() {
      return Array.prototype.slice.call(filtered, 0, settings.amount);
    };
    return filtered;
  };
  return returnVal;
});
  }
}
