/**
 * @name UnicodeEmojis
 * @description Replaces discord emojis that you send with their unicode equivalent
 * @version 1.1.1
 * @author TheLazySquid
 * @authorId 619261917352951815
 * @website https://github.com/TheLazySquid/BetterDiscordPlugins
 * @source https://github.com/TheLazySquid/BetterDiscordPlugins/tree/main/plugins/UnicodeEmojis/UnicodeEmojis.plugin.js
 */
module.exports = class {
  constructor() {
    let plugin = this;

// meta-ns:meta
var pluginName = "UnicodeEmojis";

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

// modules-ns:$shared/modules
var Filters = BdApi.Webpack.Filters;
var createSlate = BdApi.Webpack.getModule(Filters.byStrings("insertText=", "onChange="), {
  defaultExport: false
});

// plugins/UnicodeEmojis/src/index.ts
var cancelOnChange;
after(createSlate, "Z", ({ returnVal: editor }) => {
  cancelOnChange?.();
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
  cancelOnChange = Api.Patcher.after(editor, "onChange", (_, args) => {
    if (waitingToUpdate) return;
    let operation = args?.[0]?.operation;
    if (!operation) return;
    if (operation.type !== "insert_text" && operation.type !== "remove_text") return;
    if (!operation.text.includes(":")) return;
    onChange();
  });
});
  }
}
