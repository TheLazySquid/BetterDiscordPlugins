/**
 * @name EditAttachments
 * @description Modify attachments before you send them
 * @version 0.1.0
 * @author TheLazySquid
 * @authorId 619261917352951815
 * @website https://github.com/TheLazySquid/BetterDiscordPlugins
 * @source https://github.com/TheLazySquid/BetterDiscordPlugins/tree/main/plugins/EditAttachments/EditAttachments.plugin.js
 */
module.exports = class {
  constructor() {
    let plugin = this;

// meta-ns:meta
var pluginName = "EditAttachments";

// shared/bd.ts
var Api = new BdApi(pluginName);
var createCallbackHandler = (callbackName) => {
  const fullName = callbackName + "Callbacks";
  plugin[fullName] = [];
  plugin[callbackName] = () => {
    for (let i2 = 0; i2 < plugin[fullName].length; i2++) {
      plugin[fullName][i2].callback();
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
      for (let i2 = 0; i2 < plugin[fullName].length; i2++) {
        if (plugin[fullName][i2].id === id) {
          plugin[fullName][i2] = object;
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

// shared/api/styles.ts
var count = 0;
function addStyle(css) {
  onStart(() => {
    Api.DOM.addStyle(`${pluginName}-${count++}`, css);
  });
}
onStop(() => {
  for (let i2 = 0; i2 < count; i2++) {
    Api.DOM.removeStyle(`${pluginName}-${i2}`);
  }
});

// plugins/EditAttachments/src/styles.css
addStyle(`.ea-editor {
  padding-top: 16px;
  padding-bottom: 24px;
}

.ea-interactive {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.ea-footer {
  padding-top: 12px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
}

.ea-cancel:hover {
  text-decoration: underline;
}

.ea-controls {
  padding-bottom: 12px;
}

.ea-tools {
  width: 150px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30px, 1fr));
  gap: 5px;
}

.ea-tool {
  cursor: pointer;
  padding: 3px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ea-tool:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.ea-tool.selected {
  background-color: rgba(255, 255, 255, 0.2);
}

.ea-canvas {
  aspect-ratio: 16 / 9;
  width: min(calc(100vw - 200px), 60vw);
  background-position: 0px 0px, 10px 10px;
  background-size: 20px 20px;
  background-image: linear-gradient(45deg, black 25%, transparent 25%, transparent 75%, black 75%, black 100%),
      linear-gradient(45deg, black 25%, #333 25%, #333 75%, black 75%, black 100%);
  cursor: pointer;
}

.ea-controls .react-colorful {
  width: 150px;
  height: 150px;
}

.ea-thickness {
  color: white;
  padding-top: 12px;
}

.ea-thickness-range {
  width: 100%;
}

.ea-colors {
  padding-top: 12px;
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
}

.ea-pipette {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ea-color {
  aspect-ratio: 1 / 1;
  border-radius: 4px;
  border: 2px solid white;
  cursor: pointer;
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

// shared/util/demangle.ts
function demangle(module, demangler) {
  let returned = {};
  let values = Object.values(module);
  for (let id in demangler) {
    for (let i2 = 0; i2 < values.length; i2++) {
      if (demangler[id](values[i2])) {
        returned[id] = values[i2];
        break;
      }
    }
  }
  return returned;
}

// modules-ns:$shared/modules
var Filters = BdApi.Webpack.Filters;
var [AttachmentButtons, AttachmentButton, AttachmentSystem, ModalMangled, ModalSystemMangled] = BdApi.Webpack.getBulk(
  { filter: Filters.byStrings("draftType:", "keyboardModeEnabled:", "currentColor"), defaultExport: false },
  { filter: Filters.byStrings("actionBarIcon", "hideOnClick") },
  { filter: (m2) => m2.setUploads?.name === "setUploads", searchExports: true },
  { filter: Filters.bySource(".MODAL_ROOT_LEGACY,properties") },
  { filter: Filters.bySource(".modalKey?") }
);
var Modal = demangle(ModalMangled, {
  Root: Filters.byStrings(".ImpressionNames.MODAL_ROOT_LEGACY"),
  Content: Filters.byStrings("scrollerRef", "scrollbarType"),
  Header: Filters.byStrings(".header,"),
  Close: Filters.byStrings(".closeWithCircleBackground]:"),
  Footer: Filters.byStrings(".footerSeparator]:")
});
var ModalSystem = demangle(ModalSystemMangled, {
  open: Filters.byStrings(",instant:"),
  close: Filters.byStrings(".onCloseCallback()")
});

// react-ns:react
var react_default = BdApi.React;
var { Children, Component, Fragment, Profiler, PureComponent, StrictMode, Suspense, act, cache, cloneElement, createContext, createElement, createRef, forwardRef, isValidElement, lazy, memo, startTransition, use, useActionState, useCallback, useContext, useDebugValue, useDeferredValue, useEffect, useId, useImperativeHandle, useInsertionEffect, useLayoutEffect, useMemo, useOptimistic, useReducer, useRef, useState, useSyncExternalStore, useTransition, version } = BdApi.React;

// plugins/EditAttachments/src/tools/tool.ts
var Tool = class {
  compositeOperation = "source-over";
  useType = "drag";
  editor;
  canvas;
  ctx;
  overlayCanvas;
  overlayCtx;
  renderCanvas;
  renderCtx;
  constructor(editor) {
    this.editor = editor;
    this.canvas = editor.changeCanvas;
    this.ctx = editor.changeCtx;
    this.overlayCanvas = editor.overlayCanvas;
    this.overlayCtx = editor.overlayCtx;
    this.renderCanvas = editor.renderCanvas;
    this.renderCtx = editor.renderCtx;
  }
  currentUse;
};

// plugins/EditAttachments/src/tools/shape.ts
var ShapeTool = class extends Tool {
  onStart(x2, y2, color, thickness) {
    this.currentUse = {
      type: this.type,
      start: { x: x2, y: y2 },
      end: { x: x2, y: y2 },
      color,
      thickness
    };
    this.applyUse(this.currentUse);
  }
  onMove(x2, y2, shiftPressed) {
    if (shiftPressed) {
      let dx = x2 - this.currentUse.start.x;
      let dy = y2 - this.currentUse.start.y;
      let distance = Math.max(Math.abs(dx), Math.abs(dy));
      this.currentUse.end = {
        x: this.currentUse.start.x + Math.sign(dx) * distance,
        y: this.currentUse.start.y + Math.sign(dy) * distance
      };
    } else {
      this.currentUse.end = { x: x2, y: y2 };
    }
    this.applyUse(this.currentUse);
  }
};

// plugins/EditAttachments/src/tools/rectangle.ts
var RectangleTool = class extends ShapeTool {
  type = "rectangle";
  applyUse(use2) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.strokeStyle = use2.color;
    this.ctx.lineWidth = use2.thickness;
    this.ctx.strokeRect(use2.start.x, use2.start.y, use2.end.x - use2.start.x, use2.end.y - use2.start.y);
  }
};

// node_modules/lucide-react/dist/esm/shared/src/utils.js
var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
var toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
var toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
var mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
var hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
};

// node_modules/lucide-react/dist/esm/defaultAttributes.js
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};

// node_modules/lucide-react/dist/esm/Icon.js
var Icon = forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => createElement(
    "svg",
    {
      ref,
      ...defaultAttributes,
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: mergeClasses("lucide", className),
      ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => createElement(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);

// node_modules/lucide-react/dist/esm/createLucideIcon.js
var createLucideIcon = (iconName, iconNode) => {
  const Component2 = forwardRef(
    ({ className, ...props }, ref) => createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component2.displayName = toPascalCase(iconName);
  return Component2;
};

// node_modules/lucide-react/dist/esm/icons/circle.js
var __iconNode = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]];
var Circle = createLucideIcon("circle", __iconNode);

// node_modules/lucide-react/dist/esm/icons/crop.js
var __iconNode2 = [
  ["path", { d: "M6 2v14a2 2 0 0 0 2 2h14", key: "ron5a4" }],
  ["path", { d: "M18 22V8a2 2 0 0 0-2-2H2", key: "7s9ehn" }]
];
var Crop = createLucideIcon("crop", __iconNode2);

// node_modules/lucide-react/dist/esm/icons/eraser.js
var __iconNode3 = [
  [
    "path",
    {
      d: "M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21",
      key: "g5wo59"
    }
  ],
  ["path", { d: "m5.082 11.09 8.828 8.828", key: "1wx5vj" }]
];
var Eraser = createLucideIcon("eraser", __iconNode3);

// node_modules/lucide-react/dist/esm/icons/file-pen.js
var __iconNode4 = [
  ["path", { d: "M12.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v9.5", key: "1couwa" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  [
    "path",
    {
      d: "M13.378 15.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
      key: "1y4qbx"
    }
  ]
];
var FilePen = createLucideIcon("file-pen", __iconNode4);

// node_modules/lucide-react/dist/esm/icons/move-up-right.js
var __iconNode5 = [
  ["path", { d: "M13 5H19V11", key: "1n1gyv" }],
  ["path", { d: "M19 5L5 19", key: "72u4yj" }]
];
var MoveUpRight = createLucideIcon("move-up-right", __iconNode5);

// node_modules/lucide-react/dist/esm/icons/pen.js
var __iconNode6 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
var Pen = createLucideIcon("pen", __iconNode6);

// node_modules/lucide-react/dist/esm/icons/pipette.js
var __iconNode7 = [
  [
    "path",
    {
      d: "m12 9-8.414 8.414A2 2 0 0 0 3 18.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 3.828 21h1.344a2 2 0 0 0 1.414-.586L15 12",
      key: "1y3wsu"
    }
  ],
  [
    "path",
    {
      d: "m18 9 .4.4a1 1 0 1 1-3 3l-3.8-3.8a1 1 0 1 1 3-3l.4.4 3.4-3.4a1 1 0 1 1 3 3z",
      key: "110lr1"
    }
  ],
  ["path", { d: "m2 22 .414-.414", key: "jhxm08" }]
];
var Pipette = createLucideIcon("pipette", __iconNode7);

// node_modules/lucide-react/dist/esm/icons/rectangle-horizontal.js
var __iconNode8 = [
  ["rect", { width: "20", height: "12", x: "2", y: "6", rx: "2", key: "9lu3g6" }]
];
var RectangleHorizontal = createLucideIcon("rectangle-horizontal", __iconNode8);

// node_modules/lucide-react/dist/esm/icons/type.js
var __iconNode9 = [
  ["path", { d: "M12 4v16", key: "1654pz" }],
  ["path", { d: "M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2", key: "e0r10z" }],
  ["path", { d: "M9 20h6", key: "s66wpe" }]
];
var Type = createLucideIcon("type", __iconNode9);

// plugins/EditAttachments/src/tools/freehand.ts
var FreehandTool = class extends Tool {
  onStart(x2, y2, color, thickness) {
    this.currentUse = {
      type: this.type,
      points: [x2, y2],
      color,
      thickness
    };
    this.applyUse(this.currentUse);
  }
  onMove(x2, y2) {
    this.currentUse.points.push(x2, y2);
    this.applyUse(this.currentUse);
  }
};

// plugins/EditAttachments/src/tools/eraser.ts
var EraserTool = class extends FreehandTool {
  compositeOperation = "destination-out";
  type = "eraser";
  applyUse(use2) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";
    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = use2.thickness;
    this.ctx.beginPath();
    this.ctx.moveTo(use2.points[0], use2.points[1]);
    for (let i2 = 0; i2 < use2.points.length; i2 += 2) {
      this.ctx.lineTo(use2.points[i2], use2.points[i2 + 1]);
    }
    this.ctx.stroke();
  }
};

// plugins/EditAttachments/src/tools/ellipse.ts
var EllipseTool = class extends ShapeTool {
  type = "ellipse";
  applyUse(use2) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.strokeStyle = use2.color;
    this.ctx.lineWidth = use2.thickness;
    this.ctx.beginPath();
    this.ctx.ellipse(
      (use2.start.x + use2.end.x) / 2,
      (use2.start.y + use2.end.y) / 2,
      Math.abs(use2.end.x - use2.start.x) / 2,
      Math.abs(use2.end.y - use2.start.y) / 2,
      0,
      0,
      2 * Math.PI
    );
    this.ctx.stroke();
  }
};

// plugins/EditAttachments/src/tools/arrow.ts
var ArrowTool = class extends ShapeTool {
  type = "arrow";
  applyUse(use2) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.strokeStyle = use2.color;
    this.ctx.fillStyle = use2.color;
    this.ctx.lineWidth = use2.thickness;
    const angle = Math.atan2(use2.end.y - use2.start.y, use2.end.x - use2.start.x);
    const length = Math.hypot(use2.end.x - use2.start.x, use2.end.y - use2.start.y) - 15;
    this.ctx.beginPath();
    this.ctx.moveTo(use2.start.x, use2.start.y);
    this.ctx.lineTo(
      use2.start.x + length * Math.cos(angle),
      use2.start.y + length * Math.sin(angle)
    );
    this.ctx.stroke();
    const tipLength = 25 + use2.thickness;
    const tipAngle = Math.PI / 6;
    this.ctx.beginPath();
    this.ctx.moveTo(use2.end.x, use2.end.y);
    this.ctx.lineTo(
      use2.end.x - tipLength * Math.cos(angle - tipAngle),
      use2.end.y - tipLength * Math.sin(angle - tipAngle)
    );
    this.ctx.lineTo(
      use2.end.x - tipLength * Math.cos(angle + tipAngle),
      use2.end.y - tipLength * Math.sin(angle + tipAngle)
    );
    this.ctx.closePath();
    this.ctx.fill();
  }
};

// plugins/EditAttachments/src/tools/pen.ts
var PenTool = class extends FreehandTool {
  type = "pen";
  applyUse(use2) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";
    this.ctx.strokeStyle = use2.color;
    this.ctx.lineWidth = use2.thickness;
    this.ctx.beginPath();
    this.ctx.moveTo(use2.points[0], use2.points[1]);
    for (let i2 = 0; i2 < use2.points.length; i2 += 2) {
      this.ctx.lineTo(use2.points[i2], use2.points[i2 + 1]);
    }
    this.ctx.stroke();
  }
};

// plugins/EditAttachments/src/tools/crop.ts
var CropTool = class extends Tool {
  type = "crop";
  applyUse(use2, renderCanvas = this.renderCanvas, renderCtx = this.renderCtx) {
    const topLeftX = Math.min(use2.start.x, use2.end.x);
    const topLeftY = Math.min(use2.start.y, use2.end.y);
    const width = Math.abs(use2.end.x - use2.start.x);
    const height = Math.abs(use2.end.y - use2.start.y);
    const data = renderCtx.getImageData(topLeftX, topLeftY, width, height);
    renderCanvas.width = width;
    renderCanvas.height = height;
    renderCtx.putImageData(data, 0, 0);
  }
  onStart(x2, y2) {
    this.currentUse = {
      type: "crop",
      start: { x: x2, y: y2 },
      end: { x: x2, y: y2 }
    };
  }
  onMove(x2, y2) {
    const start = this.currentUse.start;
    const end = { x: x2, y: y2 };
    this.currentUse.end = end;
    this.editor.clearOverlay();
    this.overlayCtx.lineWidth = 5 / this.editor.scale;
    this.overlayCtx.setLineDash([]);
    this.overlayCtx.strokeStyle = "black";
    this.overlayCtx.strokeRect(start.x, start.y, end.x - start.x, end.y - start.y);
    this.overlayCtx.setLineDash([15, 15]);
    this.overlayCtx.strokeStyle = "gray";
    this.overlayCtx.strokeRect(start.x, start.y, end.x - start.x, end.y - start.y);
  }
};

// plugins/EditAttachments/src/tools/text.ts
var TextTool = class extends Tool {
  useType = "confirm";
  applyUse(use2) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.font = `${use2.size}px sans-serif`;
    this.ctx.fillStyle = use2.color;
    this.ctx.textBaseline = "top";
    this.ctx.fillText(use2.text, use2.position.x, use2.position.y);
  }
  drawOutline(use2) {
    this.overlayCtx.clearRect(0, 0, this.overlayCanvas.width, this.overlayCanvas.height);
    this.overlayCtx.font = `${use2.size}px sans-serif`;
    const size = this.overlayCtx.measureText(use2.text);
    this.overlayCtx.strokeStyle = use2.color;
    this.overlayCtx.lineWidth = 0.1 / this.editor.scale * use2.size;
    const padding = 0.25 / this.editor.scale * use2.size;
    this.overlayCtx.strokeRect(use2.position.x - padding, use2.position.y - padding, size.width + padding * 2, use2.size + padding * 2);
  }
  onStart(x2, y2, color, thickness) {
    this.currentUse = {
      type: "text",
      position: { x: x2, y: y2 },
      text: "",
      color,
      size: thickness
    };
    this.drawOutline(this.currentUse);
  }
  onKeyPress(e) {
    if (e.key === "Backspace") {
      this.currentUse.text = this.currentUse.text.slice(0, -1);
    } else if (e.key.length === 1) {
      this.currentUse.text += e.key;
    }
    this.drawOutline(this.currentUse);
    this.applyUse(this.currentUse);
  }
};

// plugins/EditAttachments/src/editor.ts
var Editor = class {
  static tools = [];
  static tool;
  // What is displayed on the screen
  static viewCanvas;
  static viewCtx;
  // What the next tool usage is drawn ontol
  static changeCanvas;
  static changeCtx;
  // The image being edited
  static renderCanvas;
  static renderCtx;
  // The base image before the past 50 edits, used for undo
  static baseCanvas;
  static baseCtx;
  // Overlays drawn on top of the view canvas, eg text cursor
  static overlayCanvas;
  static overlayCtx;
  static panX = 0;
  static panY = 0;
  static scale = 1;
  static undoStack = [];
  static redoStack = [];
  static export(callback) {
    this.renderCanvas.toBlob(callback);
  }
  static init() {
    this.renderCanvas = document.createElement("canvas");
    this.renderCtx = this.renderCanvas.getContext("2d");
    this.baseCanvas = document.createElement("canvas");
    this.baseCtx = this.baseCanvas.getContext("2d");
    this.changeCanvas = document.createElement("canvas");
    this.changeCtx = this.changeCanvas.getContext("2d");
    this.overlayCanvas = document.createElement("canvas");
    this.overlayCtx = this.overlayCanvas.getContext("2d");
    this.tools = [
      { icon: Pen, id: "pen", tool: new PenTool(this) },
      { icon: RectangleHorizontal, id: "rectangle", tool: new RectangleTool(this) },
      { icon: Circle, id: "ellipse", tool: new EllipseTool(this) },
      { icon: MoveUpRight, id: "arrow", tool: new ArrowTool(this) },
      { icon: Type, id: "text", tool: new TextTool(this) },
      { icon: Eraser, id: "eraser", tool: new EraserTool(this) },
      { icon: Crop, id: "crop", tool: new CropTool(this) }
    ];
    this.tool = this.tools[0].tool;
  }
  static async createView(viewCanvas, url) {
    this.viewCanvas = viewCanvas;
    this.viewCtx = viewCanvas.getContext("2d");
    this.overlayCanvas.width = this.viewCanvas.width;
    this.overlayCanvas.height = this.viewCanvas.height;
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      this.renderCanvas.width = img.width;
      this.renderCanvas.height = img.height;
      this.baseCanvas.width = img.width;
      this.baseCanvas.height = img.height;
      this.changeCanvas.width = img.width;
      this.changeCanvas.height = img.height;
      this.baseCtx.drawImage(img, 0, 0);
      this.renderCtx.drawImage(img, 0, 0);
      this.drawView();
    };
    img.onerror = () => URL.revokeObjectURL(url);
    img.src = url;
  }
  static setTool(tool) {
    this.tool = tool;
  }
  static pan(dx, dy) {
    const factor = this.viewCanvas.width / this.viewCanvas.clientWidth;
    this.panX += dx * factor;
    this.panY += dy * factor;
    this.overlayCtx.setTransform(this.scale, 0, 0, this.scale, this.panX, this.panY);
    this.drawView();
  }
  static getViewCoords(x2, y2) {
    const factor = this.viewCanvas.width / this.viewCanvas.clientWidth;
    const rect = this.viewCanvas.getBoundingClientRect();
    const viewX = (x2 - rect.left) * factor;
    const viewY = (y2 - rect.top) * factor;
    return { x: viewX, y: viewY };
  }
  static getRenderCoords(x2, y2) {
    const viewCoords = this.getViewCoords(x2, y2);
    const renderX = (viewCoords.x - this.panX) / this.scale;
    const renderY = (viewCoords.y - this.panY) / this.scale;
    return { x: renderX, y: renderY };
  }
  static zoom(x2, y2, dy) {
    const viewCoords = this.getViewCoords(x2, y2);
    const renderX = (viewCoords.x - this.panX) / this.scale;
    const renderY = (viewCoords.y - this.panY) / this.scale;
    const scaleMultiplier = dy < 0 ? 1.1 : 1 / 1.1;
    this.scale *= scaleMultiplier;
    this.panX = viewCoords.x - renderX * this.scale;
    this.panY = viewCoords.y - renderY * this.scale;
    this.overlayCtx.setTransform(this.scale, 0, 0, this.scale, this.panX, this.panY);
    this.drawView();
  }
  static drawView() {
    this.viewCtx.fillStyle = "#444";
    this.viewCtx.fillRect(0, 0, this.viewCanvas.width, this.viewCanvas.height);
    this.viewCtx.save();
    this.viewCtx.setTransform(this.scale, 0, 0, this.scale, this.panX, this.panY);
    this.viewCtx.clearRect(0, 0, this.renderCanvas.width, this.renderCanvas.height);
    this.viewCtx.globalCompositeOperation = "source-over";
    this.viewCtx.drawImage(this.renderCanvas, 0, 0);
    this.viewCtx.globalCompositeOperation = this.tool.compositeOperation;
    this.viewCtx.drawImage(this.changeCanvas, 0, 0);
    this.viewCtx.restore();
    this.viewCtx.globalCompositeOperation = "source-over";
    this.viewCtx.drawImage(this.overlayCanvas, 0, 0);
  }
  static lastCoords = { x: 0, y: 0 };
  static startUse(x2, y2, color, thickness) {
    if (!this.tool) return;
    this.redoStack = [];
    const renderCoords = this.getRenderCoords(x2, y2);
    this.lastCoords = renderCoords;
    this.tool.onStart(renderCoords.x, renderCoords.y, color, thickness);
    this.drawView();
  }
  static moveUse(x2, y2, shiftPressed) {
    if (!this.tool || this.tool.useType !== "drag") return;
    const renderCoords = this.getRenderCoords(x2, y2);
    this.lastCoords = renderCoords;
    this.tool.onMove?.(renderCoords.x, renderCoords.y, shiftPressed);
    this.drawView();
  }
  static changeShiftPressed(shiftPressed) {
    if (!this.tool) return;
    this.tool.onMove?.(this.lastCoords.x, this.lastCoords.y, shiftPressed);
    this.drawView();
  }
  static endUse() {
    if (!this.tool) return;
    const use2 = this.tool.currentUse;
    this.tool.applyUse(use2);
    this.clearOverlay();
    this.renderCtx.globalCompositeOperation = this.tool.compositeOperation;
    this.renderCtx.drawImage(this.changeCanvas, 0, 0);
    this.changeCtx.clearRect(0, 0, this.changeCanvas.width, this.changeCanvas.height);
    this.undoStack.push(use2);
    if (this.undoStack.length > 50) {
      let use3 = this.undoStack.shift();
      let compositeOperation = this.useTool(use3, this.baseCanvas, this.baseCtx);
      this.baseCtx.globalCompositeOperation = compositeOperation;
      this.baseCtx.drawImage(this.changeCanvas, 0, 0);
      this.changeCtx.clearRect(0, 0, this.changeCanvas.width, this.changeCanvas.height);
    }
    this.drawView();
  }
  static undo() {
    let use2 = this.undoStack.pop();
    if (!use2) return;
    this.redoStack.push(use2);
    if (this.renderCanvas.width !== this.baseCanvas.width || this.renderCanvas.height !== this.baseCanvas.height) {
      this.renderCanvas.width = this.baseCanvas.width;
      this.renderCanvas.height = this.baseCanvas.height;
    } else {
      this.renderCtx.clearRect(0, 0, this.renderCanvas.width, this.renderCanvas.height);
    }
    this.renderCtx.globalCompositeOperation = "source-over";
    this.renderCtx.drawImage(this.baseCanvas, 0, 0);
    for (const use3 of this.undoStack) {
      let compositeOperation = this.useTool(use3);
      this.renderCtx.globalCompositeOperation = compositeOperation;
      this.renderCtx.drawImage(this.changeCanvas, 0, 0);
    }
    this.changeCtx.clearRect(0, 0, this.changeCanvas.width, this.changeCanvas.height);
    this.drawView();
  }
  static redo() {
    let use2 = this.redoStack.pop();
    if (!use2) return;
    this.undoStack.push(use2);
    let compositeOperation = this.useTool(use2);
    this.renderCtx.globalCompositeOperation = compositeOperation;
    this.renderCtx.drawImage(this.changeCanvas, 0, 0);
    this.changeCtx.clearRect(0, 0, this.changeCanvas.width, this.changeCanvas.height);
    this.drawView();
  }
  static useTool(use2, renderCanvas, renderCtx) {
    const tool = this.tools.find((t) => t.id === use2.type)?.tool;
    if (!tool) return "source-over";
    tool.applyUse(use2, renderCanvas, renderCtx);
    return tool.compositeOperation;
  }
  static getPixelColor(x2, y2) {
    const renderCoords = this.getRenderCoords(x2, y2);
    if (renderCoords.x < 0 || renderCoords.x >= this.renderCanvas.width || renderCoords.y < 0 || renderCoords.y >= this.renderCanvas.height) return null;
    const data = this.renderCtx.getImageData(renderCoords.x, renderCoords.y, 1, 1).data;
    return `#${(data[0] << 16 | data[1] << 8 | data[2]).toString(16).padStart(6, "0")}`;
  }
  static clearOverlay() {
    this.overlayCtx.save();
    this.overlayCtx.setTransform(1, 0, 0, 1, 0, 0);
    this.overlayCtx.clearRect(0, 0, this.overlayCanvas.width, this.overlayCanvas.height);
    this.overlayCtx.restore();
  }
  static onKeyPress(e) {
    this.tool.onKeyPress?.(e);
    this.drawView();
  }
};

// node_modules/react-colorful/dist/index.mjs
function u() {
  return (u = Object.assign || function(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = arguments[r];
      for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    }
    return e;
  }).apply(this, arguments);
}
function c(e, r) {
  if (null == e) return {};
  var t, n, o = {}, a = Object.keys(e);
  for (n = 0; n < a.length; n++) r.indexOf(t = a[n]) >= 0 || (o[t] = e[t]);
  return o;
}
function i(e) {
  var t = useRef(e), n = useRef(function(e2) {
    t.current && t.current(e2);
  });
  return t.current = e, n.current;
}
var s = function(e, r, t) {
  return void 0 === r && (r = 0), void 0 === t && (t = 1), e > t ? t : e < r ? r : e;
};
var f = function(e) {
  return "touches" in e;
};
var v = function(e) {
  return e && e.ownerDocument.defaultView || self;
};
var d = function(e, r, t) {
  var n = e.getBoundingClientRect(), o = f(r) ? function(e2, r2) {
    for (var t2 = 0; t2 < e2.length; t2++) if (e2[t2].identifier === r2) return e2[t2];
    return e2[0];
  }(r.touches, t) : r;
  return { left: s((o.pageX - (n.left + v(e).pageXOffset)) / n.width), top: s((o.pageY - (n.top + v(e).pageYOffset)) / n.height) };
};
var h = function(e) {
  !f(e) && e.preventDefault();
};
var m = react_default.memo(function(o) {
  var a = o.onMove, l = o.onKey, s2 = c(o, ["onMove", "onKey"]), m2 = useRef(null), g2 = i(a), p2 = i(l), b2 = useRef(null), _2 = useRef(false), x2 = useMemo(function() {
    var e = function(e2) {
      h(e2), (f(e2) ? e2.touches.length > 0 : e2.buttons > 0) && m2.current ? g2(d(m2.current, e2, b2.current)) : t(false);
    }, r = function() {
      return t(false);
    };
    function t(t2) {
      var n = _2.current, o2 = v(m2.current), a2 = t2 ? o2.addEventListener : o2.removeEventListener;
      a2(n ? "touchmove" : "mousemove", e), a2(n ? "touchend" : "mouseup", r);
    }
    return [function(e2) {
      var r2 = e2.nativeEvent, n = m2.current;
      if (n && (h(r2), !function(e3, r3) {
        return r3 && !f(e3);
      }(r2, _2.current) && n)) {
        if (f(r2)) {
          _2.current = true;
          var o2 = r2.changedTouches || [];
          o2.length && (b2.current = o2[0].identifier);
        }
        n.focus(), g2(d(n, r2, b2.current)), t(true);
      }
    }, function(e2) {
      var r2 = e2.which || e2.keyCode;
      r2 < 37 || r2 > 40 || (e2.preventDefault(), p2({ left: 39 === r2 ? 0.05 : 37 === r2 ? -0.05 : 0, top: 40 === r2 ? 0.05 : 38 === r2 ? -0.05 : 0 }));
    }, t];
  }, [p2, g2]), C2 = x2[0], E = x2[1], H = x2[2];
  return useEffect(function() {
    return H;
  }, [H]), react_default.createElement("div", u({}, s2, { onTouchStart: C2, onMouseDown: C2, className: "react-colorful__interactive", ref: m2, onKeyDown: E, tabIndex: 0, role: "slider" }));
});
var g = function(e) {
  return e.filter(Boolean).join(" ");
};
var p = function(r) {
  var t = r.color, n = r.left, o = r.top, a = void 0 === o ? 0.5 : o, l = g(["react-colorful__pointer", r.className]);
  return react_default.createElement("div", { className: l, style: { top: 100 * a + "%", left: 100 * n + "%" } }, react_default.createElement("div", { className: "react-colorful__pointer-fill", style: { backgroundColor: t } }));
};
var b = function(e, r, t) {
  return void 0 === r && (r = 0), void 0 === t && (t = Math.pow(10, r)), Math.round(t * e) / t;
};
var _ = { grad: 0.9, turn: 360, rad: 360 / (2 * Math.PI) };
var x = function(e) {
  return L(C(e));
};
var C = function(e) {
  return "#" === e[0] && (e = e.substring(1)), e.length < 6 ? { r: parseInt(e[0] + e[0], 16), g: parseInt(e[1] + e[1], 16), b: parseInt(e[2] + e[2], 16), a: 4 === e.length ? b(parseInt(e[3] + e[3], 16) / 255, 2) : 1 } : { r: parseInt(e.substring(0, 2), 16), g: parseInt(e.substring(2, 4), 16), b: parseInt(e.substring(4, 6), 16), a: 8 === e.length ? b(parseInt(e.substring(6, 8), 16) / 255, 2) : 1 };
};
var w = function(e) {
  return K(I(e));
};
var y = function(e) {
  var r = e.s, t = e.v, n = e.a, o = (200 - r) * t / 100;
  return { h: b(e.h), s: b(o > 0 && o < 200 ? r * t / 100 / (o <= 100 ? o : 200 - o) * 100 : 0), l: b(o / 2), a: b(n, 2) };
};
var q = function(e) {
  var r = y(e);
  return "hsl(" + r.h + ", " + r.s + "%, " + r.l + "%)";
};
var I = function(e) {
  var r = e.h, t = e.s, n = e.v, o = e.a;
  r = r / 360 * 6, t /= 100, n /= 100;
  var a = Math.floor(r), l = n * (1 - t), u2 = n * (1 - (r - a) * t), c2 = n * (1 - (1 - r + a) * t), i2 = a % 6;
  return { r: b(255 * [n, u2, l, l, c2, n][i2]), g: b(255 * [c2, n, n, u2, l, l][i2]), b: b(255 * [l, l, c2, n, n, u2][i2]), a: b(o, 2) };
};
var D = function(e) {
  var r = e.toString(16);
  return r.length < 2 ? "0" + r : r;
};
var K = function(e) {
  var r = e.r, t = e.g, n = e.b, o = e.a, a = o < 1 ? D(b(255 * o)) : "";
  return "#" + D(r) + D(t) + D(n) + a;
};
var L = function(e) {
  var r = e.r, t = e.g, n = e.b, o = e.a, a = Math.max(r, t, n), l = a - Math.min(r, t, n), u2 = l ? a === r ? (t - n) / l : a === t ? 2 + (n - r) / l : 4 + (r - t) / l : 0;
  return { h: b(60 * (u2 < 0 ? u2 + 6 : u2)), s: b(a ? l / a * 100 : 0), v: b(a / 255 * 100), a: o };
};
var S = react_default.memo(function(r) {
  var t = r.hue, n = r.onChange, o = g(["react-colorful__hue", r.className]);
  return react_default.createElement("div", { className: o }, react_default.createElement(m, { onMove: function(e) {
    n({ h: 360 * e.left });
  }, onKey: function(e) {
    n({ h: s(t + 360 * e.left, 0, 360) });
  }, "aria-label": "Hue", "aria-valuenow": b(t), "aria-valuemax": "360", "aria-valuemin": "0" }, react_default.createElement(p, { className: "react-colorful__hue-pointer", left: t / 360, color: q({ h: t, s: 100, v: 100, a: 1 }) })));
});
var T = react_default.memo(function(r) {
  var t = r.hsva, n = r.onChange, o = { backgroundColor: q({ h: t.h, s: 100, v: 100, a: 1 }) };
  return react_default.createElement("div", { className: "react-colorful__saturation", style: o }, react_default.createElement(m, { onMove: function(e) {
    n({ s: 100 * e.left, v: 100 - 100 * e.top });
  }, onKey: function(e) {
    n({ s: s(t.s + 100 * e.left, 0, 100), v: s(t.v - 100 * e.top, 0, 100) });
  }, "aria-label": "Color", "aria-valuetext": "Saturation " + b(t.s) + "%, Brightness " + b(t.v) + "%" }, react_default.createElement(p, { className: "react-colorful__saturation-pointer", top: 1 - t.v / 100, left: t.s / 100, color: q(t) })));
});
var F = function(e, r) {
  if (e === r) return true;
  for (var t in e) if (e[t] !== r[t]) return false;
  return true;
};
var X = function(e, r) {
  return e.toLowerCase() === r.toLowerCase() || F(C(e), C(r));
};
function Y(e, t, l) {
  var u2 = i(l), c2 = useState(function() {
    return e.toHsva(t);
  }), s2 = c2[0], f2 = c2[1], v2 = useRef({ color: t, hsva: s2 });
  useEffect(function() {
    if (!e.equal(t, v2.current.color)) {
      var r = e.toHsva(t);
      v2.current = { hsva: r, color: t }, f2(r);
    }
  }, [t, e]), useEffect(function() {
    var r;
    F(s2, v2.current.hsva) || e.equal(r = e.fromHsva(s2), v2.current.color) || (v2.current = { hsva: s2, color: r }, u2(r));
  }, [s2, e, u2]);
  var d2 = useCallback(function(e2) {
    f2(function(r) {
      return Object.assign({}, r, e2);
    });
  }, []);
  return [s2, d2];
}
var R;
var V = "undefined" != typeof window ? useLayoutEffect : useEffect;
var $ = function() {
  return R || ("undefined" != typeof __webpack_nonce__ ? __webpack_nonce__ : void 0);
};
var J = /* @__PURE__ */ new Map();
var Q = function(e) {
  V(function() {
    var r = e.current ? e.current.ownerDocument : document;
    if (void 0 !== r && !J.has(r)) {
      var t = r.createElement("style");
      t.innerHTML = `.react-colorful{position:relative;display:flex;flex-direction:column;width:200px;height:200px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.react-colorful__saturation{position:relative;flex-grow:1;border-color:transparent;border-bottom:12px solid #000;border-radius:8px 8px 0 0;background-image:linear-gradient(0deg,#000,transparent),linear-gradient(90deg,#fff,hsla(0,0%,100%,0))}.react-colorful__alpha-gradient,.react-colorful__pointer-fill{content:"";position:absolute;left:0;top:0;right:0;bottom:0;pointer-events:none;border-radius:inherit}.react-colorful__alpha-gradient,.react-colorful__saturation{box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}.react-colorful__alpha,.react-colorful__hue{position:relative;height:24px}.react-colorful__hue{background:linear-gradient(90deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red)}.react-colorful__last-control{border-radius:0 0 8px 8px}.react-colorful__interactive{position:absolute;left:0;top:0;right:0;bottom:0;border-radius:inherit;outline:none;touch-action:none}.react-colorful__pointer{position:absolute;z-index:1;box-sizing:border-box;width:28px;height:28px;transform:translate(-50%,-50%);background-color:#fff;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.2)}.react-colorful__interactive:focus .react-colorful__pointer{transform:translate(-50%,-50%) scale(1.1)}.react-colorful__alpha,.react-colorful__alpha-pointer{background-color:#fff;background-image:url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><path d="M8 0h8v8H8zM0 8h8v8H0z"/></svg>')}.react-colorful__saturation-pointer{z-index:3}.react-colorful__hue-pointer{z-index:2}`, J.set(r, t);
      var n = $();
      n && t.setAttribute("nonce", n), r.head.appendChild(t);
    }
  }, []);
};
var U = function(t) {
  var n = t.className, o = t.colorModel, a = t.color, l = void 0 === a ? o.defaultColor : a, i2 = t.onChange, s2 = c(t, ["className", "colorModel", "color", "onChange"]), f2 = useRef(null);
  Q(f2);
  var v2 = Y(o, l, i2), d2 = v2[0], h2 = v2[1], m2 = g(["react-colorful", n]);
  return react_default.createElement("div", u({}, s2, { ref: f2, className: m2 }), react_default.createElement(T, { hsva: d2, onChange: h2 }), react_default.createElement(S, { hue: d2.h, onChange: h2, className: "react-colorful__last-control" }));
};
var W = { defaultColor: "000", toHsva: x, fromHsva: function(e) {
  return w({ h: e.h, s: e.s, v: e.v, a: 1 });
}, equal: X };
var Z = function(r) {
  return react_default.createElement(U, u({}, r, { colorModel: W }));
};

// plugins/EditAttachments/src/thickness.tsx
var max = 120;
function ThicknessSlider({ thickness, setThickness }) {
  const dragging = react_default.useRef(false);
  const svg = react_default.useRef(null);
  const rect = react_default.useRef(null);
  const onMouseDown = () => {
    if (!svg.current) return;
    dragging.current = true;
    rect.current = svg.current.getBoundingClientRect();
  };
  const onMouseMove = (e) => {
    if (!dragging.current || !rect.current) return;
    const x2 = e.clientX - rect.current.left;
    const percent = x2 / rect.current.width;
    setThickness(Math.max(1, Math.min(max, Math.round(percent * max))));
  };
  const onMouseUp = () => {
    dragging.current = false;
  };
  react_default.useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);
  return /* @__PURE__ */ BdApi.React.createElement("div", { className: "ea-thickness" }, /* @__PURE__ */ BdApi.React.createElement("svg", { width: "120", height: "24", xmlns: "http://www.w3.org/2000/svg", overflow: "visible", ref: svg }, /* @__PURE__ */ BdApi.React.createElement("path", { d: "M0 12 L120 4 L120 20 Z", fill: "#999999" }), /* @__PURE__ */ BdApi.React.createElement(
    "circle",
    {
      r: "10",
      cx: thickness,
      cy: 12,
      fill: "#cccccc",
      stroke: "white",
      strokeWidth: "2",
      cursor: "ew-resize",
      onMouseDown
    }
  )));
}

// plugins/EditAttachments/src/editorElement.tsx
function Tool2({ selected, children, ...rest }) {
  return /* @__PURE__ */ BdApi.React.createElement("div", { className: `ea-tool ${selected ? "selected" : ""}`, ...rest }, children);
}
function EditorElement({ url, onCancel, onConfirm }) {
  const [color, setColor] = react_default.useState("#aaaaaa");
  const [activeTool, setActiveTool] = react_default.useState(Editor.tools[0].id);
  const [thicknessSlider, setThicknessSlider] = react_default.useState(80);
  const [thickness, setThickness] = react_default.useState(5);
  const [colors, setColors] = react_default.useState([color]);
  const colorUsed = react_default.useRef(false);
  const canvas = react_default.useRef(null);
  react_default.useEffect(() => {
    if (!canvas.current) return;
    Editor.createView(canvas.current, url);
  }, []);
  react_default.useEffect(() => {
    const scaled = thicknessSlider / 5 * Math.pow(1.02, thicknessSlider);
    setThickness(Math.floor(scaled));
  }, [thicknessSlider]);
  const onColorUpdate = (hex) => {
    if (colorUsed.current) {
      colorUsed.current = false;
      setColors((colors2) => [hex, ...colors2].slice(0, 4));
    } else {
      setColors((colors2) => colors2.map((c2, i2) => i2 === 0 ? hex : c2));
    }
    setColor(hex);
  };
  const panning = react_default.useRef(false);
  const using = react_default.useRef(false);
  const picking = react_default.useRef(false);
  const onMouseDown = (e) => {
    e.stopPropagation();
    if (e.button === 0) {
      if (picking.current) {
        let hex = Editor.getPixelColor(e.clientX, e.clientY);
        if (hex) onColorUpdate(hex);
        picking.current = false;
        if (canvas.current) canvas.current.style.cursor = "";
      } else if (!using.current) {
        Editor.startUse(e.clientX, e.clientY, color, thickness);
        colorUsed.current = true;
        using.current = true;
      } else if (Editor.tool.useType === "confirm") {
        Editor.endUse();
        using.current = false;
      }
    } else if (e.button === 1) {
      e.preventDefault();
      panning.current = true;
    }
  };
  const onMouseDownGlobal = (e) => {
    if (e.button === 0 && using.current && Editor.tool.useType === "confirm") {
      Editor.endUse();
      using.current = false;
    }
  };
  const onMouseUp = (e) => {
    panning.current = false;
    if (using.current && Editor.tool.useType === "drag") {
      using.current = false;
      Editor.moveUse(e.clientX, e.clientY, e.shiftKey);
      Editor.endUse();
    }
  };
  const onMouseMove = (e) => {
    if (picking.current) {
      let hex = Editor.getPixelColor(e.clientX, e.clientY);
      if (hex) onColorUpdate(hex);
    } else if (panning.current) {
      Editor.pan(e.movementX, e.movementY);
    } else if (using.current) {
      Editor.moveUse(e.clientX, e.clientY, e.shiftKey);
    }
  };
  const onKeyDown = (e) => {
    if (using.current) {
      Editor.onKeyPress(e);
    }
    if (e.code === "KeyZ" && e.ctrlKey) Editor.undo();
    else if (e.code === "KeyY" && e.ctrlKey) Editor.redo();
    else if (e.code === "Escape" && picking.current) {
      picking.current = false;
      if (canvas.current) canvas.current.style.cursor = "";
    } else if (e.key === "Shift" && using.current) {
      Editor.changeShiftPressed(true);
    }
  };
  const onKeyUp = (e) => {
    if (e.key === "Shift" && using.current) {
      Editor.changeShiftPressed(false);
    }
  };
  react_default.useEffect(() => {
    window.addEventListener("mousedown", onMouseDownGlobal);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("mousedown", onMouseDownGlobal);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);
  const onWheel = (e) => {
    Editor.zoom(e.clientX, e.clientY, e.deltaY);
    if (using.current) Editor.moveUse(e.clientX, e.clientY, e.shiftKey);
  };
  const exportRender = () => {
    Editor.export(onConfirm);
  };
  return /* @__PURE__ */ BdApi.React.createElement("div", { className: "ea-editor" }, /* @__PURE__ */ BdApi.React.createElement("div", { className: "ea-interactive" }, /* @__PURE__ */ BdApi.React.createElement("div", null, /* @__PURE__ */ BdApi.React.createElement("div", { className: "ea-controls" }, /* @__PURE__ */ BdApi.React.createElement(Z, { color, onChange: onColorUpdate }), /* @__PURE__ */ BdApi.React.createElement("div", { className: "ea-colors" }, /* @__PURE__ */ BdApi.React.createElement("div", { className: "ea-pipette", onClick: () => {
    if (canvas.current) canvas.current.style.cursor = "crosshair";
    picking.current = true;
  } }, /* @__PURE__ */ BdApi.React.createElement(Pipette, { color: "white", size: 20 })), colors.map((c2, i2) => /* @__PURE__ */ BdApi.React.createElement(
    "div",
    {
      className: "ea-color",
      style: { backgroundColor: c2 },
      onClick: () => {
        colors.splice(i2, 1);
        setColors([c2, ...colors]);
        setColor(c2);
        colorUsed.current = true;
      }
    }
  ))), /* @__PURE__ */ BdApi.React.createElement(ThicknessSlider, { thickness: thicknessSlider, setThickness: setThicknessSlider })), /* @__PURE__ */ BdApi.React.createElement("div", { className: "ea-tools" }, Editor.tools.map((tool) => /* @__PURE__ */ BdApi.React.createElement(
    Tool2,
    {
      selected: tool.id === activeTool,
      key: tool.id,
      onClick: () => {
        Editor.setTool(tool.tool);
        setActiveTool(tool.id);
      }
    },
    /* @__PURE__ */ BdApi.React.createElement(tool.icon, { color: "white" })
  )))), /* @__PURE__ */ BdApi.React.createElement(
    "canvas",
    {
      className: "ea-canvas",
      ref: canvas,
      onMouseDown,
      onWheel,
      width: 1920,
      height: 1080
    }
  )), /* @__PURE__ */ BdApi.React.createElement("div", { className: "ea-footer" }, /* @__PURE__ */ BdApi.React.createElement(
    "button",
    {
      className: "bd-button bd-button-link bd-button-color-primary bd-button-medium ea-cancel",
      onClick: onCancel
    },
    "Cancel"
  ), /* @__PURE__ */ BdApi.React.createElement(
    "button",
    {
      className: "bd-button bd-button-filled bd-button-color-brand bd-button-medium",
      onClick: exportRender
    },
    "Confirm"
  )));
}

// shared/api/toast.ts
function error(message, showName = true) {
  if (showName) BdApi.UI.showToast(`${pluginName}: ${message}`, { type: "error" });
  else BdApi.UI.showToast(message, { type: "error" });
}

// plugins/EditAttachments/src/index.tsx
Editor.init();
after(AttachmentButtons, "Z", ({ args, returnVal }) => {
  const editButton = BdApi.React.createElement(AttachmentButton, {
    tooltip: "Edit Attachment",
    onClick: () => {
      const { channelId, draftType, upload } = args[0];
      const onConfirm = (blob) => {
        ModalSystem.close(id);
        if (!blob) {
          error("Failed to save image.");
          return;
        }
        AttachmentSystem.remove(channelId, upload.id, draftType);
        const name = upload.item.file.name;
        const newName = name.slice(0, name.lastIndexOf(".")) + ".png";
        const newFile = new File([blob], newName, { type: "image/png" });
        AttachmentSystem.addFile({
          file: {
            file: newFile,
            isThumbnail: upload.item.isThumbnail,
            origin: upload.item.origin,
            platform: upload.item.platform
          },
          channelId,
          draftType,
          showLargeMessageDialog: false
        });
      };
      const file = args[0].upload.item.file;
      const url = URL.createObjectURL(file);
      let id = ModalSystem.open((props) => /* @__PURE__ */ BdApi.React.createElement(Modal.Root, { size: "dynamic", ...props }, /* @__PURE__ */ BdApi.React.createElement(Modal.Content, null, /* @__PURE__ */ BdApi.React.createElement(
        EditorElement,
        {
          url,
          onCancel: () => ModalSystem.close(id),
          onConfirm
        }
      ))), {
        onCloseRequest: () => false
      });
    }
  }, BdApi.React.createElement(FilePen));
  returnVal.props.actions.props.children.splice(1, 0, editButton);
});
  }
}
