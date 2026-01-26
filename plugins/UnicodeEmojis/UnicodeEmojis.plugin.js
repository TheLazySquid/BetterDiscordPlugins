/**
 * @name UnicodeEmojis
 * @description Replaces discord emojis that you send with their unicode equivalent
 * @version 1.1.5
 * @author TheLazySquid
 * @authorId 619261917352951815
 * @website https://github.com/TheLazySquid/BetterDiscordPlugins
 * @source https://github.com/TheLazySquid/BetterDiscordPlugins/tree/main/plugins/UnicodeEmojis/UnicodeEmojis.plugin.js
 * @invite fKdAaFYbD5
 */
module.exports = class {
  constructor() {
    let plugin = this;

// meta-ns:meta
var pluginName = "UnicodeEmojis";

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
function getModules(locators) {
  const modules = [];
  for (let i = 0; i < locators.length; i++) {
    if (!locators[i].id) continue;
    modules[i] = BdApi.Webpack.getById(locators[i].id);
    if (!modules[i]) Api.Logger.warn(`Module with ID ${locators[i].id} not found`);
  }
  const missingIndexes = [];
  const filters = [];
  for (let i = 0; i < locators.length; i++) {
    if (modules[i]) continue;
    missingIndexes.push(i);
    filters.push({
      filter: locators[i].filter,
      defaultExport: locators[i].defaultExport
    });
  }
  if (missingIndexes.length > 0) {
    const found = BdApi.Webpack.getBulk(...filters);
    for (let i = 0; i < missingIndexes.length; i++) {
      modules[missingIndexes[i]] = found[i];
      if (!found[i]) Api.Logger.error(`Module filter ${missingIndexes[i]} failed`);
    }
  }
  return modules;
}

// modules-ns:$shared/modules
var Filters = BdApi.Webpack.Filters;
var [createSlate] = getModules([
  {
    id: 913728,
    filter: Filters.byStrings("insertText=", "onChange=")
  }
]);

// plugins/UnicodeEmojis/src/index.ts
after(createSlate, "A", ({ returnVal: editor }) => {
  let waitingToUpdate = false;
  function onChange() {
    for (let lineIndex = editor.children.length - 1; lineIndex >= 0; lineIndex--) {
      let line = editor.children[lineIndex];
      for (let i = line.children.length - 1; i >= 0; i--) {
        let child = line.children[i];
        if (child.type != "emoji") continue;
        let replacement = child.emoji.surrogate;
        if (!replacement) continue;
        editor.apply({ type: "remove_node", path: [lineIndex, i] });
        let lastNode = line.children[i - 1];
        editor.apply({ type: "insert_text", path: [lineIndex, i - 1], offset: lastNode.text.length, text: `\\${replacement}` });
        waitingToUpdate = true;
        requestAnimationFrame(onChange);
        return;
      }
    }
    waitingToUpdate = false;
  }
  const editorOnChange = editor.onChange;
  editor.onChange = function() {
    editorOnChange.apply(this, arguments);
    if (waitingToUpdate) return;
    let operation = arguments?.[0]?.operation;
    if (!operation) return;
    if (operation.type !== "insert_text" && operation.type !== "remove_text") return;
    if (!operation.text.includes(":")) return;
    onChange();
  };
});
  }
}
