/**
 * @name UnicodeEmojis
 * @description Replaces discord emojis that you send with their unicode equivalent
 * @version 1.1.7
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
var Filters = BdApi.Webpack.Filters;
var [createSlateModule] = BdApi.Webpack.getBulk(
  {
    filter: Filters.bySource("iterations!", "insertFragment"),
    firstId: 154283,
    cacheId: "createSlate"
  }
);
var createSlate = findExportWithKey(createSlateModule, Filters.byStrings("iterations!", "insertFragment"));

// plugins/UnicodeEmojis/src/index.ts
console.log(createSlate);
after(...createSlate, ({ returnVal: editor }) => {
  console.log(editor);
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
  setTimeout(() => {
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
  }, 0);
});
  }
}
