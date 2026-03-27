/**
 * @name CssSnippetRepo
 * @description Easily manage css snippets that tweak how Discord looks
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
var onSwitch = createCallbackHandler("onSwitch");
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
  border-bottom: 1px solid #99a1af;
  width: 100%;
  cursor: pointer;
}

.sr-checkbox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 24px;
  height: 24px;
  background-color: #18181B;
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
  border-bottom: 2px solid #99a1af;
  font-weight: bold;
}

.sr-search {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 18px;
  font-weight: 600;
}

.sr-search-input {
  color: var(--font-primary);
  font-size: 16px;
  background-color: transparent;
  width: 100%;
  border: none;
  border-bottom: 1px solid #99a1af;
}

.sr-no-results {
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  margin-top: 40px;
}`);

// plugins/CssSnippetRepo/src/fetch.ts
var baseUrl = "https://thelazysquid.github.io/DiscordCssSnippets/";
var categoryNames = {
  declutter: "Declutter",
  improvement: "Improvement"
};
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
  return /* @__PURE__ */ BdApi.React.createElement("div", { className: "sr-card" }, /* @__PURE__ */ BdApi.React.createElement("div", { className: "sr-toggle", onClick: () => setEnabled(!enabled) }, snippet.name, /* @__PURE__ */ BdApi.React.createElement("div", { className: "sr-checkbox" }, enabled && /* @__PURE__ */ BdApi.React.createElement(LucideIcon, { icon: Check, color: "#d1d5dc", size: 24 }))), /* @__PURE__ */ BdApi.React.createElement("div", { className: "sr-author" }, "By ", snippet.author), snippet.preview && /* @__PURE__ */ BdApi.React.createElement("div", null, snippet.preview.endsWith(".mp4") ? /* @__PURE__ */ BdApi.React.createElement(
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
  )), /* @__PURE__ */ BdApi.React.createElement("div", { className: "sr-description" }, expanded ? /* @__PURE__ */ BdApi.React.createElement(React.Fragment, null, /* @__PURE__ */ BdApi.React.createElement("div", null, snippet.description.map((line) => /* @__PURE__ */ BdApi.React.createElement("p", null, line))), /* @__PURE__ */ BdApi.React.createElement("div", { onClick: () => setExpanded(false) }, /* @__PURE__ */ BdApi.React.createElement(LucideIcon, { icon: ChevronUp }))) : /* @__PURE__ */ BdApi.React.createElement(React.Fragment, null, /* @__PURE__ */ BdApi.React.createElement("p", null, snippet.description[0]), snippet.description.length > 1 && /* @__PURE__ */ BdApi.React.createElement("div", { onClick: () => setExpanded(true) }, /* @__PURE__ */ BdApi.React.createElement(LucideIcon, { icon: ChevronDown })))));
}

// plugins/CssSnippetRepo/src/ui/Snippets.tsx
function Snippets() {
  const React = BdApi.React;
  const [snippets, setSnippets] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [search, setSearch] = React.useState("");
  React.useEffect(() => {
    const searched = search.toLowerCase();
    const categoriesMap = {};
    for (const snippet of snippets) {
      if (snippet.name.toLowerCase().includes(searched)) {
        categoriesMap[snippet.type] ??= { name: snippet.type, snippets: [] };
        categoriesMap[snippet.type].snippets.push(snippet);
      }
    }
    setCategories(Object.values(categoriesMap));
  }, [snippets, search]);
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
  )), categories.length === 0 && /* @__PURE__ */ BdApi.React.createElement("div", { className: "sr-no-results" }, "No snippets match your search"), categories.map((category) => /* @__PURE__ */ BdApi.React.createElement(React.Fragment, null, /* @__PURE__ */ BdApi.React.createElement("h2", { className: "sr-category-header" }, categoryNames[category.name] ?? category.name), /* @__PURE__ */ BdApi.React.createElement("div", { className: "sr-snippets" }, category.snippets.map((snippet) => /* @__PURE__ */ BdApi.React.createElement(SnippetCard, { key: snippet.name, snippet }))))));
}

// plugins/CssSnippetRepo/src/index.ts
setSettingsPanel(() => BdApi.React.createElement(Snippets));
onStart(() => loadSnippets());
onStop(() => unloadSnippets());
  }
}
