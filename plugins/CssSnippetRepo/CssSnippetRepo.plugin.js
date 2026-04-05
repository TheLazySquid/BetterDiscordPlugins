/**
 * @name CssSnippetRepo
 * @description Easily manage CSS snippets that tweak how Discord looks
 * @version 1.0.0
 * @author TheLazySquid
 * @authorId 619261917352951815
 * @website https://github.com/TheLazySquid/BetterDiscordPlugins
 * @source https://github.com/TheLazySquid/BetterDiscordPlugins/tree/main/plugins/CssSnippetRepo/CssSnippetRepo.plugin.js
 * @invite fKdAaFYbD5
 */
module.exports = class {
  constructor() {
    let plugin = this;

// meta-ns:meta
var pluginName = "CssSnippetRepo";

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
function setSettingsPanel(el) {
  if (typeof el === "function") plugin.getSettingsPanel = el;
  plugin.getSettingsPanel = () => el;
}

// shared/api/styles.ts
var count = 0;
function addStyle(css) {
  onStart(() => {
    Api.DOM.addStyle(`${pluginName}-${count++}`, css);
  });
}
onStop(() => {
  for (let i = 0; i < count; i++) {
    Api.DOM.removeStyle(`${pluginName}-${i}`);
  }
});

// plugins/CssSnippetRepo/src/styles.css
addStyle(`.sr-card {
  background-color: var(--background-accent);
  border-radius: 6px;
  padding: 16px;
  min-width: 0;
}

.sr-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  border-bottom: 1px solid var(--icon-muted);
  width: 100%;
  cursor: pointer;
}

.sr-checkbox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 24px;
  height: 24px;
  background-color: var(--background-base-lower);
  border-radius: 4px;
}

.sr-author {
  font-size: 14px;
  margin-bottom: 8px;
}

.sr-preview {
  margin-bottom: 8px;
  max-height: 140px;
  max-width: 100%;
  cursor: pointer;
}

.sr-description {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  font-size: 14px;
}

.sr-description p {
  margin: 0 0 8px 0;
}

.sr-snippets {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.sr-category-header {
  font-size: 24px;
  margin-bottom: 8px;
  border-bottom: 2px solid var(--icon-muted);
  font-weight: bold;
  margin-top: 24px;
}

.sr-search {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  white-space: nowrap;
}

.sr-search-input {
  color: var(--font-primary);
  font-size: 16px;
  background-color: transparent;
  width: 100%;
  border: none;
  border-bottom: 1px solid var(--icon-muted);
}

.sr-search > .bd-select > .bd-select-value {
  padding-right: 25px;
}

.sr-search > .bd-select-options {
  overflow: auto;
}

.sr-no-results {
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  margin-top: 40px;
}

.sr-toolbar-button {
  color: var(--icon-muted);
  cursor: pointer;
  margin-bottom: -2px;
}

.sr-arrow {
  float: right;
  cursor: pointer;
}`);

// plugins/CssSnippetRepo/src/fetch.ts
var baseUrl = "https://thelazysquid.github.io/DiscordCssSnippets/";
var categoryOrder = [
  "Declutter",
  "Improvement",
  "Stylize"
];
var lastFetch = 0;
var cachedSnippets = [];
var cacheDuration = 1e3 * 60 * 30;
async function fetchSnippets() {
  const now = Date.now();
  if (now - lastFetch < cacheDuration && cachedSnippets.length > 0) {
    return cachedSnippets;
  }
  const url = `${baseUrl}snippets.json`;
  const res = await fetch(url);
  const snippets = await res.json();
  cachedSnippets = snippets;
  lastFetch = now;
  return snippets;
}

// plugins/CssSnippetRepo/src/snippets.ts
var enabledSnippets = {};
function loadSnippets() {
  enabledSnippets = Api.Data.load("enabled") ?? {};
  for (const name in enabledSnippets) {
    if (!enabledSnippets[name]) continue;
    const css = `@import url(${baseUrl}css/${name}.css);`;
    Api.DOM.addStyle(`sr-${name}`, css);
  }
}
function unloadSnippets() {
  for (const name in enabledSnippets) {
    if (!enabledSnippets[name]) continue;
    Api.DOM.removeStyle(`sr-${name}`);
  }
}
function getSnippetEnabled(name) {
  return enabledSnippets[name] ?? false;
}
function setSnippetEnabled(name, enabled) {
  enabledSnippets[name] = enabled;
  Api.Data.save("enabled", enabledSnippets);
  if (enabled) {
    const css = `@import url(${baseUrl}css/${name}.css);`;
    Api.DOM.addStyle(`sr-${name}`, css);
  } else {
    Api.DOM.removeStyle(`sr-${name}`);
  }
}

// shared/ui/icons.tsx
function LucideIcon({ icon, size = 24, color, className }) {
  const stroke = color ?? "currentColor";
  return /* @__PURE__ */ BdApi.React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke, "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", className }, icon.map(([tag, attrs]) => BdApi.React.createElement(tag, attrs)));
}

// node_modules/lucide/dist/esm/icons/check.js
var Check = [["path", { d: "M20 6 9 17l-5-5" }]];

// node_modules/lucide/dist/esm/icons/chevron-down.js
var ChevronDown = [["path", { d: "m6 9 6 6 6-6" }]];

// node_modules/lucide/dist/esm/icons/chevron-up.js
var ChevronUp = [["path", { d: "m18 15-6-6-6 6" }]];

// node_modules/lucide/dist/esm/icons/palette.js
var Palette = [
  [
    "path",
    {
      d: "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"
    }
  ],
  ["circle", { cx: "13.5", cy: "6.5", r: ".5", fill: "currentColor" }],
  ["circle", { cx: "17.5", cy: "10.5", r: ".5", fill: "currentColor" }],
  ["circle", { cx: "6.5", cy: "12.5", r: ".5", fill: "currentColor" }],
  ["circle", { cx: "8.5", cy: "7.5", r: ".5", fill: "currentColor" }]
];

// plugins/CssSnippetRepo/src/ui/SnippetCard.tsx
function SnippetCard({ snippet }) {
  const React = BdApi.React;
  const [enabled, setEnabled] = React.useState(getSnippetEnabled(snippet.name));
  const [expanded, setExpanded] = React.useState(false);
  const firstLoad = React.useRef(true);
  React.useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    setSnippetEnabled(snippet.name, enabled);
  }, [enabled]);
  return /* @__PURE__ */ BdApi.React.createElement("div", { className: "sr-card" }, /* @__PURE__ */ BdApi.React.createElement("div", { className: "sr-toggle", onClick: () => setEnabled(!enabled) }, snippet.name, /* @__PURE__ */ BdApi.React.createElement("div", { className: "sr-checkbox" }, enabled && /* @__PURE__ */ BdApi.React.createElement(LucideIcon, { icon: Check, color: "var(--icon-strong)", size: 24 }))), /* @__PURE__ */ BdApi.React.createElement("div", { className: "sr-author" }, "By ", snippet.author), snippet.preview && /* @__PURE__ */ BdApi.React.createElement("div", null, snippet.preview.endsWith(".mp4") ? /* @__PURE__ */ BdApi.React.createElement(
    "video",
    {
      className: "sr-preview",
      src: `${baseUrl}previews/${snippet.name}/${snippet.preview}`,
      autoPlay: true,
      loop: true,
      muted: true
    }
  ) : /* @__PURE__ */ BdApi.React.createElement(
    "img",
    {
      className: "sr-preview",
      src: `${baseUrl}previews/${snippet.name}/${snippet.preview}`,
      alt: `A preview of ${snippet.name}`
    }
  )), /* @__PURE__ */ BdApi.React.createElement("div", { className: "sr-description" }, expanded ? /* @__PURE__ */ BdApi.React.createElement(React.Fragment, null, /* @__PURE__ */ BdApi.React.createElement("div", null, snippet.description.map((line) => /* @__PURE__ */ BdApi.React.createElement("p", null, line))), /* @__PURE__ */ BdApi.React.createElement("div", { className: "sr-arrow", onClick: () => setExpanded(false) }, /* @__PURE__ */ BdApi.React.createElement(LucideIcon, { icon: ChevronUp }))) : /* @__PURE__ */ BdApi.React.createElement(React.Fragment, null, /* @__PURE__ */ BdApi.React.createElement("p", null, snippet.description[0]), snippet.description.length > 1 && /* @__PURE__ */ BdApi.React.createElement("div", { className: "sr-arrow", onClick: () => setExpanded(true) }, /* @__PURE__ */ BdApi.React.createElement(LucideIcon, { icon: ChevronDown })))));
}

// plugins/CssSnippetRepo/src/ui/Snippets.tsx
var filters = [
  { label: "All", value: "all" },
  { label: "Enabled", value: "enabled" },
  { label: "Disabled", value: "disabled" }
];
function Snippets() {
  const React = BdApi.React;
  const [snippets, setSnippets] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState("all");
  const categories = React.useMemo(() => {
    const searched = search.toLowerCase();
    const categoriesMap = {};
    for (const snippet of snippets) {
      if (!snippet.name.toLowerCase().includes(searched)) continue;
      if (filter === "enabled" && !enabledSnippets[snippet.name]) continue;
      if (filter === "disabled" && enabledSnippets[snippet.name]) continue;
      categoriesMap[snippet.category] ??= { name: snippet.category, snippets: [] };
      categoriesMap[snippet.category].snippets.push(snippet);
    }
    const order = [...categoryOrder];
    for (const snippet of snippets) {
      if (order.includes(snippet.category)) continue;
      order.push(snippet.category);
    }
    const categories2 = [];
    for (const category of order) {
      if (categoriesMap[category]) {
        categories2.push(categoriesMap[category]);
      }
    }
    return categories2;
  }, [snippets, search, filter]);
  React.useEffect(() => {
    fetchSnippets().then(setSnippets);
  }, []);
  return /* @__PURE__ */ BdApi.React.createElement("div", null, /* @__PURE__ */ BdApi.React.createElement("div", { className: "sr-search" }, /* @__PURE__ */ BdApi.React.createElement("div", null, "Search:"), /* @__PURE__ */ BdApi.React.createElement(
    "input",
    {
      className: "sr-search-input",
      placeholder: "Search snippets",
      value: search,
      onChange: (e) => setSearch(e.currentTarget.value)
    }
  ), /* @__PURE__ */ BdApi.React.createElement(BdApi.Components.DropdownInput, { options: filters, value: filter, onChange: setFilter })), categories.length === 0 && /* @__PURE__ */ BdApi.React.createElement("div", { className: "sr-no-results" }, "No snippets match your search"), categories.map((category) => /* @__PURE__ */ BdApi.React.createElement(React.Fragment, null, /* @__PURE__ */ BdApi.React.createElement("h2", { className: "sr-category-header" }, category.name), /* @__PURE__ */ BdApi.React.createElement("div", { className: "sr-snippets" }, category.snippets.map((snippet) => /* @__PURE__ */ BdApi.React.createElement(SnippetCard, { key: snippet.name, snippet }))))));
}

// shared/api/patching.ts
function check(module, key) {
  if (!module || !key) {
    Api.Logger.warn("Missing module or key", module, key);
    return false;
  }
  return true;
}
function before(module, key, callback) {
  if (!check(module, key)) return;
  onStart(() => {
    Api.Patcher.before(module, key, (thisVal, args) => {
      callback({ thisVal, args });
    });
  });
}
onStop(() => {
  Api.Patcher.unpatchAll();
});

// shared/util/modules.ts
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
var [toolbarModule, toolbarClassModule, modalMethods, ModalModule] = BdApi.Webpack.getBulk(
  {
    filter: Filters.bySource("showDivider", "WINDOWS"),
    defaultExport: false,
    firstId: 71855,
    cacheId: "toolbar"
  },
  {
    filter: Filters.byKeys("trailing", "winButton"),
    firstId: 450295,
    cacheId: "toolbarClass"
  },
  {
    filter: Filters.byKeys("openModal"),
    firstId: 192308,
    cacheId: "modalMethods"
  },
  {
    filter: Filters.byKeys("Modal"),
    firstId: 158954,
    cacheId: "Modal"
  }
);
var toolbar = findExportWithKey(toolbarModule, Filters.byStrings("PlatformTypes.WINDOWS"));
var toolbarClass = findExport(toolbarClassModule, (c) => c.startsWith("trailing_"));
var Modal = ModalModule.Modal;

// shared/util/react.ts
function forceUpdate(selector) {
  const target = document.querySelector(selector)?.parentElement;
  if (!target) return;
  const instance = BdApi.ReactUtils.getOwnerInstance(target);
  if (!instance) return;
  const unpatch = Api.Patcher.instead(instance, "render", () => unpatch());
  instance.forceUpdate(() => instance.forceUpdate());
}

// plugins/CssSnippetRepo/src/index.tsx
setSettingsPanel(() => /* @__PURE__ */ BdApi.React.createElement(Snippets, null));
onStop(() => {
  unloadSnippets();
  forceUpdate("." + toolbarClass);
});
onStart(() => {
  loadSnippets();
  forceUpdate("." + toolbarClass);
});
before(...toolbar, ({ args }) => {
  const element = /* @__PURE__ */ BdApi.React.createElement("div", { className: "sr-toolbar-button", onClick: openSettings }, /* @__PURE__ */ BdApi.React.createElement(LucideIcon, { icon: Palette, size: 18 }));
  args[0]?.trailing?.props?.children?.splice(3, 0, element);
});
function openSettings() {
  modalMethods.openModal((props) => /* @__PURE__ */ BdApi.React.createElement(
    Modal,
    {
      ...props,
      title: "CSS Snippets",
      size: "xl"
    },
    /* @__PURE__ */ BdApi.React.createElement(Snippets, null)
  ));
}
  }
}
