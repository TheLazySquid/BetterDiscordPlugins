/**
 * @name ImageFolder
 * @description A BetterDiscord plugin that allows you to save and send images from a folder for easy access
 * @version 0.4.4
 * @author TheLazySquid
 * @authorId 619261917352951815
 * @website https://github.com/TheLazySquid/BetterDiscordPlugins
 * @source https://github.com/TheLazySquid/BetterDiscordPlugins/tree/main/build/ImageFolder.plugin.js
 */
module.exports = class {
  constructor() {
    let plugin = this;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __toBinary = /* @__PURE__ */ (() => {
  var table = new Uint8Array(128);
  for (var i = 0; i < 64; i++) table[i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i * 4 - 205] = i;
  return (base64) => {
    var n = base64.length, bytes = new Uint8Array((n - (base64[n - 1] == "=") - (base64[n - 2] == "=")) * 3 / 4 | 0);
    for (var i2 = 0, j = 0; i2 < n; ) {
      var c0 = table[base64.charCodeAt(i2++)], c1 = table[base64.charCodeAt(i2++)];
      var c2 = table[base64.charCodeAt(i2++)], c3 = table[base64.charCodeAt(i2++)];
      bytes[j++] = c0 << 2 | c1 >> 4;
      bytes[j++] = c1 << 4 | c2 >> 2;
      bytes[j++] = c2 << 6 | c3;
    }
    return bytes;
  };
})();

// assets/image-plus-outline.svg
var image_plus_outline_default = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M13 19C13 19.7 13.13 20.37 13.35 21H5C3.9 21 3 20.11 3 19V5C3 3.9 3.9 3 5 3H19C20.11 3 21 3.9 21 5V13.35C20.37 13.13 19.7 13 19 13V5H5V19H13M13.96 12.29L11.21 15.83L9.25 13.47L6.5 17H13.35C13.75 15.88 14.47 14.91 15.4 14.21L13.96 12.29M20 18V15H18V18H15V20H18V23H20V20H23V18H20Z" /></svg>';

// src/ImageFolder/styles.css
var styles_default = ".imgFolderBtn {\r\n    aspect-ratio: 1 / 1;\r\n    padding: 7px;\r\n    cursor: pointer;\r\n}\r\n\r\n.imgFolderBtn path {\r\n    fill: var(--interactive-normal);\r\n}\r\n\r\n.imgFolderBtn:hover path {\r\n    fill: var(--interactive-hover);\r\n}\r\n\r\n.imageTab {\r\n    width: 100%;\r\n    height: 100%;\r\n    display: flex;\r\n    flex-direction: column;\r\n}\r\n\r\n.imageTab .icon {\r\n    cursor: pointer;\r\n    width: 35px;\r\n    height: 35px;\r\n}\r\n\r\n.imageTab .icon path {\r\n    fill: hsl(190, 80%, 42%);\r\n}\r\n\r\n.imageTab {\r\n    color: var(--text-normal);\r\n}\r\n\r\n.pathContainer {\r\n    display: flex;\r\n    align-items: center;\r\n    width: 100%;\r\n}\r\n\r\n.pathContainer > :first-child {\r\n    margin-left: 10px;\r\n}\r\n\r\n.pathContainer > :last-child {\r\n    margin-right: 15px;\r\n}\r\n\r\n.pathContainer .path {\r\n    flex-grow: 1;\r\n    padding-left: 5px;\r\n    padding-right: 5px;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n    direction: rtl;\r\n    text-align: left;\r\n}\r\n\r\n.imageTab .content {\r\n    flex-grow: 1;\r\n    overflow-y: auto;\r\n    /* hardcoding this because I'm lazy */\r\n    height: 366px;\r\n}\r\n\r\n.imageTab .images {\r\n    display: grid;\r\n    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));\r\n    padding: 7px;\r\n    gap: 7px;\r\n}\r\n\r\n.imageTab img {\r\n    width: 100%;\r\n    height: 100%;\r\n    object-fit: cover;\r\n    cursor: pointer;\r\n}\r\n\r\n.imageTab .folderReturn {\r\n    float: right;\r\n}\r\n\r\n.imageTab .folder {\r\n    display: flex;\r\n    border-radius: 12px;\r\n    background-color: var(--primary-500);\r\n    padding: 6px;\r\n    margin: 7px;\r\n    cursor: pointer;\r\n    transition: background-color 0.2s ease-in-out;\r\n    align-items: center;\r\n    gap: 5px;\r\n}\r\n\r\n.imageTab .folder:hover {\r\n    background-color: var(--primary-430);\r\n}\r\n\r\n.folder .folderName {\r\n    flex-grow: 1;\r\n}\r\n\r\n.if-nameWrap {\r\n    width: 100%;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n}\r\n\r\n.if-nameInput {\r\n    width: 90%;\r\n    border-radius: 12px;\r\n    padding: 8px;\r\n}\r\n\r\n.imageTab .image {\r\n    position: relative;\r\n}\r\n\r\n.imageTab .image .icon {\r\n    position: absolute;\r\n    top: 5px;\r\n    right: 5px;\r\n    cursor: pointer;\r\n    opacity: 0;\r\n    transition: opacity 0.2s ease-in-out;\r\n}\r\n\r\n.imageTab .image:hover .icon {\r\n    opacity: 1;\r\n}\r\n\r\n.if-caption-creator {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    gap: 5px;\r\n}\r\n\r\n.if-caption-creator canvas {\r\n    width: 100%;\r\n}\r\n\r\n.if-caption-settings {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 5px;\r\n    color: var(--text-normal);\r\n}\r\n\r\n.if-caption-settings .if-caption {\r\n    flex-grow: 1;\r\n}";

// assets/folder-plus-outline.svg
var folder_plus_outline_default = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13 19C13 19.34 13.04 19.67 13.09 20H4C2.9 20 2 19.11 2 18V6C2 4.89 2.89 4 4 4H10L12 6H20C21.1 6 22 6.89 22 8V13.81C21.39 13.46 20.72 13.22 20 13.09V8H4V18H13.09C13.04 18.33 13 18.66 13 19M20 18V15H18V18H15V20H18V23H20V20H23V18H20Z" /></svg>';

// assets/trash-can-outline.svg
var trash_can_outline_default = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>';

// assets/folder-open-outline.svg
var folder_open_outline_default = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.1,10L4,18V8H21A2,2 0 0,0 19,6H12L10,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H19C19.9,20 20.7,19.4 20.9,18.5L23.2,10H6.1M19,18H6L7.6,12H20.6L19,18Z" /></svg>';

// assets/folder-arrow-left-outline.svg
var folder_arrow_left_outline_default = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 8V13.81C21.39 13.46 20.72 13.22 20 13.09V8H4V18H13.09C13.04 18.33 13 18.66 13 19C13 19.34 13.04 19.67 13.09 20H4C2.9 20 2 19.11 2 18V6C2 4.89 2.89 4 4 4H10L12 6H20C21.1 6 22 6.89 22 8M18 16L15 19L18 22V20H22V18H18V16Z" /></svg>';

// assets/pencil.svg
var pencil_default = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" /></svg>';

// src/ImageFolder/constants.ts
var expressionModule = BdApi.Webpack.getModule((m) => m.type?.toString?.().includes("onSelectGIF"));
var buttonsModule = BdApi.Webpack.getModule((m) => m.type?.toString?.().includes(".isSubmitButtonEnabled", ".getActiveCommand"));
var pickerModule = BdApi.Webpack.getModule((module) => Object.values(module).some((v) => {
  if (typeof v !== "function") return false;
  return v.toString().includes("lastActiveView");
}));
var toggleExpressionPicker = Object.values(pickerModule).find((v) => v.toString().includes("activeView==="));
var closeExpressionPicker = Object.values(pickerModule).find((v) => v.toString().includes("activeView:null"));
var pickerStore = Object.values(pickerModule).find((v) => v.getState);
var imgAdder = Object.values(BdApi.Webpack.getModule((module) => Object.values(module)?.[0]?.addFile))[0];
var chatKeyHandlers = BdApi.Webpack.getModule((exports) => Object.values(exports)?.[0]?.toString?.().includes("selectNextCommandOption"));
var mimeTypes = {
  "jpg": "image/jpeg",
  "jpeg": "image/jpeg",
  "png": "image/png",
  "webp": "image/webp",
  "avif": "image/avif",
  "gif": "image/gif"
};

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
function setSettingsPanel(el) {
  if (typeof el === "function") plugin.getSettingsPanel = el;
  plugin.getSettingsPanel = () => el;
}

// src/ImageFolder/saveInfo.ts
var lastUsed = {};
onStart(() => {
  if (Object.keys(lastUsed).length === 0) {
    let found = BdApi.Data.load("ImageFolder", "lastUsed");
    if (found) lastUsed = JSON.parse(found);
  }
});
function setLastUsed(imgPath) {
  lastUsed[imgPath] = Date.now();
  BdApi.Data.save("ImageFolder", "lastUsed", JSON.stringify(lastUsed));
}
function getLastUsed(imgPath) {
  return lastUsed[imgPath] ?? 0;
}

// src/ImageFolder/imageLoading.ts
var fs = __require("fs");
var { join, basename } = __require("path");
var imgFolderPath = join(__dirname, "imageFolder");
async function chunkedBase64Encode(str) {
  return new Promise(async (resolve) => {
    let output = "";
    let i = 0;
    const chunkSize = 65535;
    while (i < str.length) {
      output += btoa(str.slice(i, i += chunkSize));
      await new Promise((r) => setTimeout(r, 0));
    }
    resolve(output);
  });
}
async function pathToSrc(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(join(imgFolderPath, path), "latin1", async (err, contents) => {
      if (err) {
        reject(err);
        return;
      }
      let ext = path.split(".").at(-1);
      const mime = mimeTypes[ext];
      resolve(`data:${mime};base64,${await chunkedBase64Encode(contents)}`);
    });
  });
}
async function loadFolder(path) {
  path = path.replace(/\\/g, "/");
  if (!fs.existsSync(join(imgFolderPath))) {
    fs.mkdirSync(join(imgFolderPath));
  }
  return new Promise((resolve, reject) => {
    const folderPath = join(imgFolderPath, path);
    if (!fs.existsSync(folderPath)) {
      return reject("Folder does not exist");
    }
    fs.readdir(folderPath, {}, (err, files) => {
      if (err) {
        reject(err);
        return;
      }
      let images = [];
      let folders = [];
      let pending = files.length;
      if (!pending) {
        resolve({
          path,
          folders,
          images
        });
      }
      for (const file of files) {
        const filePath = join(folderPath, file);
        fs.stat(filePath, {}, async (err2, stat) => {
          if (err2) {
            reject(err2);
            return;
          }
          if (stat.isDirectory()) {
            folders.push(file);
          } else {
            const ext = file.split(".").at(-1);
            if (ext && mimeTypes[ext]) images.push({
              name: file,
              lastModified: stat.mtimeMs,
              lastSent: getLastUsed(join(path, file))
            });
          }
          if (!--pending) {
            resolve({
              path,
              folders,
              images
            });
          }
        });
      }
    });
  });
}
async function uploadImage(folderPath) {
  let result = await BdApi.UI.openDialog({
    mode: "open",
    filters: [
      {
        name: "Images",
        extensions: Object.keys(mimeTypes)
      }
    ],
    title: "Upload an image",
    message: "Select an image to upload",
    multiSelections: true
  });
  if (!result || result.canceled) return;
  for (let file of result.filePaths) {
    let fileName = basename(file);
    let newPath = join(imgFolderPath, folderPath, fileName);
    fs.readFile(file, {}, (err, contents) => {
      if (err) {
        BdApi.UI.showToast(`Error reading file ${fileName}`, { type: "error" });
        return;
      }
      fs.writeFile(newPath, contents, {}, (err2) => {
        if (err2) {
          BdApi.UI.showToast(`Error writing file ${fileName}`, { type: "error" });
          return;
        }
        BdApi.UI.showToast(`Image uploaded ${fileName}`, { type: "success" });
      });
    });
  }
}

// src/ImageFolder/uploader.ts
var fs2 = __require("fs");
var { join: join2 } = __require("path");
var Buffer2 = __require("buffer");
var submitMessage;
onStart(() => {
  BdApi.Patcher.before("ImageFolder", chatKeyHandlers, Object.keys(chatKeyHandlers)[0], (_, args) => {
    submitMessage = args[0].submit;
  });
});
function sendRawImage(name, path) {
  const contents = fs2.readFileSync(join2(__dirname, "imageFolder", path, name), {
    encoding: "binary"
  });
  const buff = Buffer2.from(contents, "binary");
  const file = new File([buff], name, { type: "image/png" });
  sendFile(file);
}
async function sendProcessedImage(name, src) {
  if (!name || !src) return;
  const img = new Image();
  img.src = src;
  await img.decode();
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  let parts = name.split(".");
  parts.pop();
  let fileName = parts.join(".") + ".png";
  const blob = await new Promise((resolve) => canvas.toBlob((blob2) => resolve(blob2)));
  const file = new File([blob], fileName, { type: "image/png" });
  sendFile(file);
}
async function sendFile(file) {
  const channelId = location.href.split("/").pop();
  if (!channelId) return;
  closeExpressionPicker();
  imgAdder.addFile({
    channelId,
    draftType: 0,
    showLargeMessageDialog: false,
    file: {
      file,
      isThumbnail: false,
      platform: 1
    }
  });
  submitMessage();
}

// assets/Futura Condensed Extra Bold.otf
var Futura_Condensed_Extra_Bold_default = __toBinary("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");

// src/ImageFolder/ui/AddCaption.tsx
var React = BdApi.React;
var font = new FontFace("futuraBoldCondensed", Futura_Condensed_Extra_Bold_default);
onStart(async () => {
  document.fonts.add(font);
});
onStop(() => {
  document.fonts.delete(font);
});
function getLines(ctx, text, maxWidth) {
  var words = text.split(" ");
  var lines = [];
  var currentLine = words[0];
  for (var i = 1; i < words.length; i++) {
    var word = words[i];
    var width = ctx.measureText(currentLine + " " + word).width;
    if (width < maxWidth) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
}
function AddCaption({ name, src, onSubmit }) {
  const canvas = React.useRef(null);
  const [caption, setCaption] = React.useState("");
  const [fontSize, setFontSize] = React.useState(70);
  let baseImage = new Image();
  baseImage.src = src;
  baseImage.decode().then(render);
  const padding = 10;
  onSubmit(async () => {
    render();
    if (!canvas.current) return;
    let parts = name.split(".");
    parts.pop();
    let newName = `${parts.join(".")}-captioned.png`;
    const blob = await new Promise((resolve) => canvas.current.toBlob((blob2) => resolve(blob2)));
    const file = new File([blob], newName, { type: "image/png" });
    sendFile(file);
  });
  function render() {
    if (!canvas.current) return;
    let ctx = canvas.current.getContext("2d");
    canvas.current.width = baseImage.width;
    ctx.font = `${fontSize}px futuraBoldCondensed`;
    let lines = getLines(ctx, caption, baseImage.width);
    canvas.current.height = baseImage.height + lines.length * fontSize + padding * 2;
    ctx.font = `${fontSize}px futuraBoldCondensed`;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.current.width, canvas.current.height);
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], baseImage.width / 2, i * fontSize + padding);
    }
    ctx.drawImage(baseImage, 0, lines.length * fontSize + padding * 2, baseImage.width, baseImage.height);
  }
  React.useEffect(render, [caption, fontSize]);
  return /* @__PURE__ */ BdApi.React.createElement("div", { className: "if-caption-creator" }, /* @__PURE__ */ BdApi.React.createElement("div", { className: "if-caption-settings" }, /* @__PURE__ */ BdApi.React.createElement(
    "input",
    {
      type: "text",
      placeholder: "Caption",
      className: "if-caption",
      onChange: (e) => setCaption(e.target.value)
    }
  ), /* @__PURE__ */ BdApi.React.createElement("label", { htmlFor: "if-font-size" }, "Font Size"), /* @__PURE__ */ BdApi.React.createElement(
    "input",
    {
      id: "if-font-size",
      type: "range",
      min: "5",
      max: "400",
      defaultValue: "70",
      onChange: (e) => setFontSize(parseFloat(e.target.value))
    }
  )), /* @__PURE__ */ BdApi.React.createElement("canvas", { ref: canvas }));
}

// src/ImageFolder/settings.ts
var settings = {
  rerender: BdApi.Data.load("ImageFolder", "rerender") ?? true,
  sortBy: BdApi.Data.load("ImageFolder", "sorting") ?? "lastSent",
  showButton: BdApi.Data.load("ImageFolder", "showButton") ?? true
};
function setup() {
  setSettingsPanel(() => BdApi.UI.buildSettingsPanel({
    settings: [
      {
        type: "dropdown",
        id: "sortBy",
        value: settings.sortBy,
        name: "Image Sorting",
        note: "",
        options: [
          { label: "Sort by last sent", value: "lastSent" },
          { label: "Sort alphabetically", value: "name" },
          { label: "Sort by last modified", value: "lastModified" }
        ]
      },
      {
        type: "switch",
        id: "rerender",
        value: settings.rerender,
        name: "Re-render images as PNG before sending?",
        note: "This will allow you to send AVIFs and sequenced WebPs (albeit without animation) and have them properly embed"
      },
      {
        type: "switch",
        id: "showButton",
        value: settings.showButton,
        name: "Show image folder button?",
        note: "The image folder tab is still accessible inside of the expression picker menu"
      }
    ],
    onChange: (_, id, value) => {
      BdApi.Data.save("ImageFolder", id, value);
      settings[id] = value;
    }
  }));
}

// src/ImageFolder/ui/ImageComponent.tsx
var React2 = BdApi.React;
var fs3 = __require("fs");
var { join: join3 } = __require("path");
function imageComponent({ name, path, updateFolder }) {
  const imgRef = React2.useRef(null);
  const [src, setSrc] = React2.useState("");
  let observer = new IntersectionObserver((entries) => {
    if (src != "") return;
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        pathToSrc(join3(path, name)).then((src2) => {
          setSrc(src2);
        });
      }
    });
  });
  React2.useEffect(() => {
    if (imgRef.current) observer.observe(imgRef.current);
    return () => {
      if (imgRef.current) observer.unobserve(imgRef.current);
    };
  }, [imgRef.current]);
  function sendImage() {
    if (!src) return;
    setLastUsed(join3(path, name));
    if (settings.rerender && !name.endsWith(".gif")) {
      sendProcessedImage(name, src);
    } else {
      sendRawImage(name, path);
    }
  }
  function renameImage() {
    let fileName = "";
    let parts = name.split(".");
    let ext = parts.pop();
    let startName = parts.join(".");
    BdApi.UI.showConfirmationModal(`Rename ${startName}`, /* @__PURE__ */ BdApi.React.createElement("div", { className: "if-nameWrap" }, /* @__PURE__ */ BdApi.React.createElement(
      "input",
      {
        className: "if-nameInput",
        onChange: (e) => fileName = e.target.value,
        spellCheck: false,
        placeholder: "Folder Name"
      }
    )), {
      confirmText: "Rename",
      onConfirm: () => {
        fs3.rename(
          join3(__dirname, "imageFolder", path, name),
          join3(__dirname, "imageFolder", path, fileName + "." + ext),
          {},
          (err) => {
            if (err) {
              BdApi.UI.showToast("Failed to rename image", { type: "error" });
              return;
            }
            BdApi.UI.showToast("Successfully renamed image", { type: "success" });
            updateFolder();
          }
        );
      }
    });
  }
  function deleteImage(e) {
    e.stopPropagation();
    BdApi.UI.showConfirmationModal("Delete Image", `Are you sure you want to delete ${name}?`, {
      danger: true,
      confirmText: "Delete",
      onConfirm: () => {
        fs3.unlinkSync(join3(__dirname, "imageFolder", path, name));
        BdApi.UI.showToast("Successfully deleted image", { type: "success" });
        updateFolder();
      }
    });
  }
  function openContextMenu(e) {
    if (!src) return;
    let menu = BdApi.ContextMenu.buildMenu([{
      type: "text",
      label: "Rename",
      onClick: renameImage
    }, {
      type: "text",
      label: "Delete",
      onClick: deleteImage
    }, {
      type: "submenu",
      label: "Send",
      items: [{
        type: "text",
        label: "Send Re-rendered",
        onClick: () => sendProcessedImage(name, src)
      }, {
        type: "text",
        label: "Send Raw",
        onClick: () => sendRawImage(name, path)
      }, {
        type: "text",
        label: "Send with Caption",
        onClick: () => {
          let submitCallback;
          BdApi.UI.showConfirmationModal("Add caption", BdApi.React.createElement(AddCaption, {
            name,
            src,
            // this is scuffed but I don't care
            onSubmit: (cb) => submitCallback = cb
          }), {
            onConfirm: () => submitCallback()
          });
        }
      }],
      onClick: sendImage
    }]);
    BdApi.ContextMenu.open(e, menu);
  }
  return /* @__PURE__ */ BdApi.React.createElement("div", { className: "image" }, /* @__PURE__ */ BdApi.React.createElement(
    "div",
    {
      className: "icon",
      onClick: (e) => deleteImage(e),
      dangerouslySetInnerHTML: { __html: trash_can_outline_default }
    }
  ), /* @__PURE__ */ BdApi.React.createElement(
    "img",
    {
      onClick: sendImage,
      ref: imgRef,
      src,
      onContextMenu: openContextMenu,
      style: { height: src ? "" : "50%" }
    }
  ));
}
var ImageComponent_default = imageComponent;

// src/ImageFolder/ui/imageTab.tsx
var React3 = BdApi.React;
var fs4 = __require("fs");
var { join: join4 } = __require("path");
function ImageTab() {
  const [folderPath, setFolderPath] = React3.useState("/");
  const [selectedFolder, setSelectedFolder] = React3.useState({
    path: "/",
    folders: [],
    images: []
  });
  function updateFolder() {
    loadFolder(folderPath).then((folder) => {
      folder.images.sort((a, b) => {
        if (settings.sortBy === "lastSent") return b.lastSent - a.lastSent;
        if (settings.sortBy === "lastModified") return b.lastModified - a.lastModified;
        return a.name.localeCompare(b.name);
      });
      setSelectedFolder(folder);
    });
  }
  React3.useEffect(updateFolder, [folderPath]);
  function intoFolder(folder) {
    setFolderPath(folderPath + folder + "/");
  }
  function backFolder() {
    const path = folderPath.split("/");
    path.pop();
    path.pop();
    setFolderPath(path.join("/") + "/");
  }
  function deleteFolder(e, folder) {
    e.stopPropagation();
    BdApi.UI.showConfirmationModal("Delete Folder", `Are you sure you want to delete ${folder}?`, {
      danger: true,
      confirmText: "Delete",
      onConfirm: () => {
        fs4.rmdir(join4(__dirname, "imageFolder", folderPath, folder), { recursive: true }, (err) => {
          if (err) {
            BdApi.UI.showToast("Failed to delete folder", { type: "error" });
            return;
          }
          BdApi.UI.showToast("Successfully deleted folder", { type: "success" });
          updateFolder();
        });
      }
    });
  }
  function createFolder() {
    let folderName = "";
    BdApi.UI.showConfirmationModal("Create Folder", /* @__PURE__ */ BdApi.React.createElement("div", { className: "folderNameWrap" }, /* @__PURE__ */ BdApi.React.createElement(
      "input",
      {
        className: "createFolderInput",
        onChange: (e) => folderName = e.target.value,
        spellCheck: false,
        placeholder: "Folder Name"
      }
    )), {
      confirmText: "Create",
      onConfirm: () => {
        fs4.mkdir(join4(__dirname, "imageFolder", folderPath, folderName), {}, (err) => {
          if (err) {
            BdApi.UI.showToast("Failed to create folder", { type: "error" });
            return;
          }
          BdApi.UI.showToast("Successfully created folder", { type: "success" });
          updateFolder();
        });
      }
    });
  }
  function renameFolder(e, folder) {
    e.stopPropagation();
    let folderName = "";
    BdApi.UI.showConfirmationModal(`Rename ${folder}`, /* @__PURE__ */ BdApi.React.createElement("div", { className: "if-nameWrap" }, /* @__PURE__ */ BdApi.React.createElement(
      "input",
      {
        className: "if-nameInput",
        onChange: (e2) => folderName = e2.target.value,
        spellCheck: false,
        placeholder: "Folder Name"
      }
    )), {
      confirmText: "Rename",
      onConfirm: () => {
        fs4.rename(
          join4(__dirname, "imageFolder", folderPath, folder),
          join4(__dirname, "imageFolder", folderPath, folderName),
          {},
          (err) => {
            if (err) {
              BdApi.UI.showToast("Failed to rename folder", { type: "error" });
              return;
            }
            BdApi.UI.showToast("Successfully renamed folder", { type: "success" });
            updateFolder();
          }
        );
      }
    });
  }
  function createImage() {
    uploadImage(folderPath).then(updateFolder);
  }
  return /* @__PURE__ */ BdApi.React.createElement("div", { className: "imageTab" }, /* @__PURE__ */ BdApi.React.createElement("div", { className: "pathContainer" }, /* @__PURE__ */ BdApi.React.createElement(
    "div",
    {
      className: "icon folderReturn",
      onClick: backFolder,
      dangerouslySetInnerHTML: { __html: folder_arrow_left_outline_default }
    }
  ), /* @__PURE__ */ BdApi.React.createElement("div", { className: "path" }, selectedFolder.path), /* @__PURE__ */ BdApi.React.createElement(
    "div",
    {
      className: "icon",
      onClick: createFolder,
      dangerouslySetInnerHTML: { __html: folder_plus_outline_default }
    }
  ), /* @__PURE__ */ BdApi.React.createElement(
    "div",
    {
      className: "icon",
      onClick: createImage,
      dangerouslySetInnerHTML: { __html: image_plus_outline_default }
    }
  )), /* @__PURE__ */ BdApi.React.createElement("div", { className: "content" }, selectedFolder.folders.map((folder) => {
    return /* @__PURE__ */ BdApi.React.createElement(
      "div",
      {
        className: "folder",
        key: `${folderPath}${folder}`,
        onClick: () => intoFolder(folder)
      },
      /* @__PURE__ */ BdApi.React.createElement(
        "div",
        {
          className: "icon",
          dangerouslySetInnerHTML: { __html: folder_open_outline_default }
        }
      ),
      /* @__PURE__ */ BdApi.React.createElement("div", { className: "folderName" }, folder),
      /* @__PURE__ */ BdApi.React.createElement("div", { className: "controls" }, /* @__PURE__ */ BdApi.React.createElement(
        "div",
        {
          className: "icon",
          onClick: (e) => renameFolder(e, folder),
          dangerouslySetInnerHTML: { __html: pencil_default }
        }
      )),
      /* @__PURE__ */ BdApi.React.createElement("div", { className: "controls" }, /* @__PURE__ */ BdApi.React.createElement(
        "div",
        {
          className: "icon",
          onClick: (e) => deleteFolder(e, folder),
          dangerouslySetInnerHTML: { __html: trash_can_outline_default }
        }
      ))
    );
  }), /* @__PURE__ */ BdApi.React.createElement("div", { className: "images" }, selectedFolder.images.map((image) => {
    return /* @__PURE__ */ BdApi.React.createElement(
      ImageComponent_default,
      {
        name: image.name,
        path: folderPath,
        updateFolder,
        key: `${folderPath}${image.name}`
      }
    );
  }))));
}
var imageTab_default = ImageTab;

// src/ImageFolder/index.ts
setup();
var fs5 = __require("fs");
var { join: join5 } = __require("path");
var Buffer3 = __require("buffer");
function patchMenu(returnVal, props) {
  if (!returnVal || !props?.attachment) return returnVal;
  if (!Object.values(mimeTypes).includes(props.attachment.content_type)) return returnVal;
  let exts = [];
  for (let ext in mimeTypes) {
    if (mimeTypes[ext] == props.attachment.content_type) exts.push(ext);
  }
  returnVal.props.children.push(BdApi.ContextMenu.buildItem({
    type: "separator"
  }), BdApi.ContextMenu.buildItem({
    type: "text",
    label: "Add Image to Folder",
    onClick: async () => {
      let res = await BdApi.UI.openDialog({
        mode: "save",
        defaultPath: join5(__dirname, "imageFolder", props.attachment.filename),
        filters: [
          {
            name: "Image",
            extensions: exts
          }
        ],
        title: "Save Image",
        message: "Select a folder to save the image to"
      });
      if (!res || res.canceled) return;
      fetch(props.attachment.url).then((res2) => res2.arrayBuffer()).then((array) => {
        let buff = Buffer3.from(array);
        fs5.writeFile(res.filePath, buff, (err) => {
          if (err) BdApi.UI.showToast("Failed to save image", { type: "error" });
          else BdApi.UI.showToast("Image saved", { type: "success" });
        });
      });
    }
  }));
  return returnVal;
}
onStart(() => {
  BdApi.DOM.addStyle("imgFolderStyles", styles_default);
  BdApi.Patcher.after("ImageFolder", buttonsModule, "type", (_, __, returnVal) => {
    if (!returnVal || !settings.showButton) return returnVal;
    let gifIndex = returnVal.props.children.findIndex((child) => child.key == "gif");
    if (gifIndex === -1) return;
    let type = returnVal.props.children[gifIndex].props.type;
    let div = BdApi.React.createElement("div", {
      className: "imgFolderBtn",
      onClick: () => {
        toggleExpressionPicker("if-image", type);
      },
      dangerouslySetInnerHTML: { __html: image_plus_outline_default }
    });
    returnVal.props.children.splice(gifIndex, 0, div);
    return returnVal;
  });
  let unpatch;
  BdApi.Patcher.after("ImageFolder", expressionModule, "type", (_, __, returnVal) => {
    if (!returnVal) return returnVal;
    if (unpatch) unpatch();
    unpatch = BdApi.Patcher.after("ImageFolder", returnVal.props.children.props, "children", (_2, __2, returnVal2) => {
      if (!returnVal2) return returnVal2;
      let sections = returnVal2?.props?.children?.props?.children?.[1]?.props?.children;
      let categories = sections?.[0]?.props?.children?.props?.children;
      if (!categories) return;
      let activeView = pickerStore.getState().activeView;
      let newCategory = BdApi.React.createElement(categories[0].type, {
        id: "image-folder-tab",
        "aria-controls": "image-folder-tab-panel",
        "aria-selected": activeView === "if-image",
        isActive: activeView === "if-image",
        viewType: "if-image",
        children: "Images"
      });
      categories.splice(0, 0, newCategory);
      if (activeView === "if-image") {
        const el = BdApi.React.createElement(imageTab_default, {});
        sections.push(el);
      }
      return returnVal2;
    });
    return returnVal;
  });
  BdApi.ContextMenu.patch("message", patchMenu);
});
onStop(() => {
  BdApi.Patcher.unpatchAll("ImageFolder");
  BdApi.DOM.removeStyle("imgFolderStyles");
  BdApi.ContextMenu.unpatch("message", patchMenu);
});
  }
}
