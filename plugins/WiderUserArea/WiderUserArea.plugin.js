/**
 * @name WiderUserArea
 * @description A BetterDiscord plugin that expands your user area into the server list, compatible with most themes
 * @version 0.2.4
 * @author TheLazySquid
 * @authorId 619261917352951815
 * @website https://github.com/TheLazySquid/BetterDiscordPlugins
 * @source https://github.com/TheLazySquid/BetterDiscordPlugins/tree/main/plugins/WiderUserArea/WiderUserArea.plugin.js
 */
module.exports = class {
  constructor() {
    let plugin = this;

// plugins/WiderUserArea/src/styles.css
var styles_default = ':root {\r\n    --user-area-bottom: 0;\r\n    --user-area-left: 0;\r\n}\r\n\r\nnav[class*="guilds_"] {\r\n    height: var(--sidebar-height);\r\n}\r\n\r\n[class*="sidebar_"] {\r\n    height: calc(var(--sidebar-height) - var(--notices-height));\r\n}\r\n\r\n/* user area */\r\nsection[class*="panels_"] {\r\n    position: fixed;\r\n    overflow: hidden;\r\n    bottom: var(--user-area-bottom);\r\n    left: var(--user-area-left);\r\n    width: var(--user-area-width);\r\n}\r\n\r\n[class*="avatarWrapper_"] {\r\n    flex-grow: 1;\r\n}\r\n\r\n/* prevent the user info popout from clipping */\r\n[class*="accountProfilePopoutWrapper"] {\r\n    left: 0;\r\n}';

// plugins/WiderUserArea/src/constants.ts
var userAreaSelector = 'section[class*="panels_"]';
var serverListSelector = 'nav[class*="guilds_"]';
var containerSelector = `div:has(> ${serverListSelector})`;
var layerSelector = `[class*="baseLayer"]`;
var channelsSelector = '[class*="sidebar_"] > nav';
var scaleRegex = /scale\((.*)\)/;
var UAButtonsSelector = 'div[class*="avatarWrapper_"] + div';
var firstServerListSelector = `${serverListSelector}:first-child`;
var secondServerListSelector = `${serverListSelector}:nth-child(2)`;

// plugins/WiderUserArea/src/utils.ts
function scaleDOMRect(rect, scale, scaleCenterX, scaleCenterY) {
  const distX = rect.x - scaleCenterX;
  const distY = rect.y - scaleCenterY;
  const newDistX = distX * scale;
  const newDistY = distY * scale;
  const newX = scaleCenterX + newDistX;
  const newY = scaleCenterY + newDistY;
  const newWidth = rect.width * scale;
  const newHeight = rect.height * scale;
  const newRect = new DOMRect(newX, newY, newWidth, newHeight);
  return newRect;
}

// util/bdFuncs.ts
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

// util/dom.ts
function watchElement(selector, callback) {
  let observer = new MutationObserver((mutations) => {
    for (let i = 0; i < mutations.length; i++) {
      let mutation = mutations[i];
      if (mutation.addedNodes.length) {
        for (let node of mutation.addedNodes) {
          if (!(node instanceof HTMLElement)) continue;
          if (node.matches?.(selector)) {
            callback(node);
          }
          if (node.querySelectorAll) {
            for (let element of node.querySelectorAll(selector)) {
              callback(element);
            }
          }
        }
      }
    }
  });
  let startDispose = onStart(() => {
    observer.observe(document.body, { childList: true, subtree: true });
    for (let element of document.querySelectorAll(selector)) {
      callback(element);
    }
  });
  let stopDispose = onStop(() => {
    observer.disconnect();
  });
  return () => {
    observer.disconnect();
    startDispose();
    stopDispose();
  };
}

// plugins/WiderUserArea/src/index.ts
var baseChannelHeight = 0;
var baseChannelWidth = 0;
var varsSet = /* @__PURE__ */ new Set();
var recalcDebounce = BdApi.Utils.debounce(() => {
  const userArea = document.querySelector(userAreaSelector);
  if (userArea) userAreaFound(userArea);
}, 150);
watchElement(userAreaSelector, userAreaFound);
var userAreaObserver = new ResizeObserver((entries) => {
  for (let entry of entries) {
    updateVar("--sidebar-height", `${baseChannelHeight - entry.contentRect.height}px`);
  }
});
var channelsRect;
var secondChannelsRect;
var channelsObserver = new ResizeObserver((entries) => {
  for (let entry of entries) {
    channelsRect = entry.contentRect;
    let btns = document.querySelector(UAButtonsSelector);
    if (entry.contentRect.width === 0) {
      if (btns) btns.style.display = "none";
    } else {
      if (btns) btns.style.display = "";
    }
    let newWidth = entry.contentRect.right - baseChannelWidth;
    if (secondChannelsRect) newWidth += secondChannelsRect.width;
    updateVar("--user-area-width", `${newWidth}px`);
  }
});
watchElement(channelsSelector, (element) => {
  channelsObserver.disconnect();
  channelsObserver.observe(element);
});
var secondServerListObserver = new ResizeObserver((entries) => {
  if (!channelsRect) return;
  for (let entry of entries) {
    secondChannelsRect = entry.contentRect;
    let width = entry.contentRect.width;
    updateVar("--user-area-width", `${channelsRect.right - baseChannelWidth + width}px`);
  }
});
watchElement(secondServerListSelector, (element) => {
  secondServerListObserver.disconnect();
  secondServerListObserver.observe(element);
});
var themesObserver = new MutationObserver(async () => {
  await new Promise((resolve) => setTimeout(resolve, 1e3));
  console.log("theme changed");
  const userArea = document.querySelector(userAreaSelector);
  if (userArea) userAreaFound(userArea);
});
var noticesHeight = 0;
var noticesObserver = new ResizeObserver((entries) => {
  for (let entry of entries) {
    noticesHeight = entry.contentRect.height;
    updateVar("--notices-height", `${entry.contentRect.height}px`);
  }
});
watchElement("#bd-notices", (el) => {
  noticesObserver.disconnect();
  noticesObserver.observe(el);
});
function updateVar(name, value) {
  BdApi.DOM.removeStyle(`wua-${name}`);
  BdApi.DOM.addStyle(`wua-${name}`, `:root { ${name}: ${value} !important; }`);
  varsSet.add(name);
}
onSwitch(() => {
  setTimeout(() => {
    const userArea = document.querySelector(userAreaSelector);
    let parent = userArea?.parentElement;
    while (parent) {
      if (parent.style.perspective) {
        parent.style.perspective = "";
        break;
      }
      parent = parent.parentElement;
    }
    userAreaFound(userArea);
  }, 5100);
});
function userAreaFound(element) {
  BdApi.DOM.removeStyle("wua-styles");
  const layer = document.querySelector(layerSelector);
  const container = document.querySelector(containerSelector);
  const serverList = document.querySelector(firstServerListSelector);
  const channels = document.querySelector(channelsSelector);
  const secondServerList = document.querySelector(secondServerListSelector);
  const layerScale = 1 / parseFloat(scaleRegex.exec(layer.style.transform)?.[1] ?? "1");
  const layerRect = layer.getBoundingClientRect();
  const centerX = layerRect.left + layerRect.width / 2;
  const centerY = layerRect.top + layerRect.height / 2;
  const rect = scaleDOMRect(element.getBoundingClientRect(), layerScale, centerX, centerY);
  const containerRect = scaleDOMRect(container.getBoundingClientRect(), layerScale, centerX, centerY);
  const serverListRect = scaleDOMRect(serverList.getBoundingClientRect(), layerScale, centerX, centerY);
  const channelsRect2 = scaleDOMRect(channels.getBoundingClientRect(), layerScale, centerX, centerY);
  const bottom = containerRect.bottom - rect.bottom;
  baseChannelHeight = channelsRect2.height + rect.height;
  baseChannelWidth = serverListRect.left - channelsRect2.left;
  if (secondServerList) {
    const secondServerListRect = scaleDOMRect(secondServerList.getBoundingClientRect(), layerScale, centerX, centerY);
    baseChannelWidth += secondServerListRect.width;
  }
  BdApi.DOM.addStyle("wua-styles", styles_default);
  updateVar("--sidebar-height", `${channelsRect2.height + noticesHeight}px`);
  updateVar("--user-area-width", `${channelsRect2.right - serverListRect.left}px`);
  updateVar("--user-area-left", `${serverListRect.left}px`);
  updateVar("--user-area-bottom", `${bottom}px`);
  userAreaObserver.observe(element);
}
onStart(() => {
  window.addEventListener("resize", recalcDebounce);
  updateVar("--notices-height", "0px");
  themesObserver.observe(document.querySelector("bd-themes"), { childList: true, subtree: true });
});
onStop(() => {
  userAreaObserver.disconnect();
  channelsObserver.disconnect();
  themesObserver.disconnect();
  secondServerListObserver.disconnect();
  noticesObserver.disconnect();
  BdApi.DOM.removeStyle("wua-styles");
  for (let varName of varsSet) {
    BdApi.DOM.removeStyle(`wua-${varName}`);
  }
  window.removeEventListener("resize", recalcDebounce);
});
  }
}
