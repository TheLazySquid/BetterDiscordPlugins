/**
 * @name PasteAndSend
 * @description Adds a "Paste and Send" button to the message box's right click menu. Remake of the original by ak-tr.
 * @version 1.0.0
 * @author TheLazySquid
 * @authorId 619261917352951815
 * @website https://github.com/TheLazySquid/BetterDiscordPlugins
 * @source https://github.com/TheLazySquid/BetterDiscordPlugins/tree/main/plugins/PasteAndSend/PasteAndSend.plugin.js
 * @invite fKdAaFYbD5
 */
module.exports = class {
  constructor() {
    let plugin = this;

// meta-ns:meta
var pluginName = "PasteAndSend";

// shared/bd.ts
var Api = /* @__PURE__ */ new BdApi(pluginName);
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

// shared/api/contextmenu.ts
function patchContextMenu(type, callback) {
  onStart(() => BdApi.ContextMenu.patch(type, callback));
  onStop(() => BdApi.ContextMenu.unpatch(type, callback));
}

// shared/util/modules.ts
function findExport(module, filter) {
  if (typeof filter === "string") {
    return module[filter];
  }
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
var [pasteModule, editorEventsModule] = BdApi.Webpack.getBulk(
  {
    filter: Filters.byKeys("paste", "getSetting"),
    firstId: 19575,
    cacheId: "paste"
  },
  {
    filter: Filters.bySource(",submit:", "selectPreviousCommandOption"),
    defaultExport: false,
    firstId: 919499,
    cacheId: "editorEvents"
  }
);
var paste = findExport(pasteModule, "paste");
var editorEvents = findExportWithKey(editorEventsModule, true);

// shared/api/patching.ts
function check(module, key) {
  if (!module || !key) {
    Api.Logger.warn("Missing module or key", module, key);
    return false;
  }
  return true;
}
function afterClass(module, key, callback) {
  if (!check(module, key)) return;
  onStart(() => {
    const baseClass = module[key];
    const newClass = class extends baseClass {
      constructor(...args) {
        super(...args);
        callback(this);
      }
    };
    module[key] = newClass;
    onStop(() => module[key] = baseClass, true);
  });
}
onStop(() => {
  Api.Patcher.unpatchAll();
});

// shared/api/toast.ts
function error(message) {
  BdApi.UI.showToast(message, { type: "error" });
}

// shared/util/submitMessage.ts
var submit = null;
afterClass(...editorEvents, (instance) => {
  submit = instance.submit.bind(instance);
});
function submitMessage() {
  if (!submit) {
    error("Could not send message, try switching channels");
    return;
  }
  submit();
}

// plugins/PasteAndSend/src/index.ts
function pasteAndSend() {
  paste();
  setTimeout(submitMessage, 100);
}
patchContextMenu("textarea-context", (element) => {
  const items = element.props.children;
  items.push(BdApi.ContextMenu.buildItem({
    type: "text",
    label: "Paste and Send",
    onClick: pasteAndSend
  }));
});
  }
}
