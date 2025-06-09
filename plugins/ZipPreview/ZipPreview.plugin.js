/**
 * @name ZipPreview
 * @description Lets you see inside zips and preview/download files without ever downloading/extracting the zip
 * @version 0.4.4
 * @author TheLazySquid
 * @authorId 619261917352951815
 * @website https://github.com/TheLazySquid/BetterDiscordPlugins
 * @source https://github.com/TheLazySquid/BetterDiscordPlugins/tree/main/plugins/ZipPreview/ZipPreview.plugin.js
 */
module.exports = class {
  constructor() {
    let plugin = this;

// meta-ns:meta
var meta_default = { pluginName: "ZipPreview" };

// shared/bd.ts
var Api = new BdApi(meta_default.pluginName);
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
function check(module2, key) {
  if (!module2 || !key) {
    Api.Logger.warn("Missing module or key", module2, key);
    return false;
  }
  return true;
}
function after(module2, key, callback) {
  if (!check(module2, key)) return;
  onStart(() => {
    Api.Patcher.after(module2, key, (thisVal, args, returnVal) => {
      return callback({ thisVal, args, returnVal });
    });
  });
}
onStop(() => {
  Api.Patcher.unpatchAll();
});

// shared/modules.ts
var Webpack = BdApi.Webpack;
function getMangled(filter, mapper) {
  return Webpack.getMangled(filter, mapper);
}
var fileModule = /* @__PURE__ */ Webpack.getModule((m) => m.Z?.toString().includes("filenameLinkWrapper"));
var highlightModule = /* @__PURE__ */ Webpack.getByKeys("highlight", "hasLanguage");
var ModalSystem = /* @__PURE__ */ getMangled(".modalKey?", {
  open: /* @__PURE__ */ Webpack.Filters.byStrings(",instant:"),
  close: /* @__PURE__ */ Webpack.Filters.byStrings(".onCloseCallback()")
});
var Modal = /* @__PURE__ */ getMangled(".MODAL_ROOT_LEGACY,properties", {
  Root: /* @__PURE__ */ Webpack.Filters.byStrings(".ImpressionNames.MODAL_ROOT_LEGACY"),
  Content: /* @__PURE__ */ Webpack.Filters.byStrings("scrollerRef", "scrollbarType"),
  Header: /* @__PURE__ */ Webpack.Filters.byStrings(".header,"),
  Close: /* @__PURE__ */ Webpack.Filters.byStrings(".closeWithCircleBackground]:"),
  Footer: /* @__PURE__ */ Webpack.Filters.byStrings(".footerSeparator]:")
});

// shared/api/styles.ts
var count = 0;
function addStyle(css) {
  onStart(() => {
    Api.DOM.addStyle(`${meta_default.pluginName}-${count++}`, css);
  });
}
onStop(() => {
  for (let i = 0; i < count; i++) {
    Api.DOM.removeStyle(`${meta_default.pluginName}-${i}`);
  }
});

// plugins/ZipPreview/src/styles.css
addStyle(`.zp-wrap {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.zp-content {
  padding: 16px;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
}

.zp-dropdown-expander {
  width: 100%;
  display: flex;
  height: 16px;
  align-items: center;
  justify-content: center;
  border-top: 2px solid var(--border-subtle);
  cursor: pointer;
}

.zp-dropdown-expander svg {
  width: 16px;
  height: 16px;
  fill: var(--text-link);   
}

.zp-zip-preview {
  max-height: 0px;
  overflow: hidden;
  transition: max-height 0.3s ease;
  color: var(--text-normal);
  padding-left: 16px;
}

.zp-zip-preview.expanded {
  max-height: 500px;
  overflow-y: auto;
  padding-bottom: 10px;
}

.zp-entry {
  color: var(--text-link);
  text-decoration: underline;
  padding-bottom: 2px;
  cursor: pointer;
}

.zp-filesize {
  color: var(--text-normal);
  text-decoration: none;
  font-size: small;
  padding-left: 5px;
}

.zp-path {
  color: var(--text-normal);
  padding-bottom: 2px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.zp-folderReturn {
  cursor: pointer;
}

.zp-folderReturn svg {
  fill: var(--text-normal);
  width: 20px;
  height: 20px;
}

.zp-no-padding {
  padding: 0;
  overflow: hidden !important;
}

.zp-preview {
  color: var(--text-normal);
  max-width: 80vw;
  min-width: 30vw;
  max-height: 90vh;
  min-height: 20vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  user-select: text;
  border-radius: var(--radius-md);
}

.zp-preview-header {
  height: 45px;
  background: var(--background-primary);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  font-size: 28px;
  padding-left: 20px;
  padding-right: 20px;
  font-weight: 700;
  border-bottom: 1px solid #bbbbbb;
}

.zp-preview-title {
  flex-grow: 1;
  min-width: 0;
  overflow: hidden;
  text-wrap: nowrap;
  text-overflow: ellipsis;
  height: 100%;
  display: flex;
  align-items: center;
}

.zp-preview-close {
  height: 35px;
  width: 35px;
  fill: var(--text-normal);
  cursor: pointer;
}

.zp-preview-content-wrap {
  margin: 20px;
  margin-bottom: 0;
  padding: 20px;
  border: 1px solid #bbbbbb;
  border-radius: 10px;
  min-height: 0;
  overflow: hidden;
  display: flex;
  position: relative;
  align-self: stretch;
  flex-grow: 1;
}

.zp-preview-copy {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  fill: var(--text-normal);
  cursor: pointer;
}

.zp-preview-content {
  min-height: 0;
  overflow: auto;
  width: 100%;
  scrollbar-color: var(--background-primary) var(--background-secondary);
  /* prevents a scrollbar from randomly appearing for some reason */
  padding-top: 3px;
  padding-bottom: 3px;
}

.zp-preview audio {
  width: 100%;
}

.zp-preview img {
  
}

.zp-preview img, .zp-preview video {
  width: 100%;
  height: auto;
}

.zp-preview-override {
  margin: 10px;
  padding: 3px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
  background-color: red;
  color: white;
  font-weight: bold;
  text-align: center;
}

.zp-preview-footer {
  height: 55px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 20px;
  align-self: stretch;
}

.zp-preview-footer .icon {
  height: 35px;
  width: 35px;
  border: none;
  background-color: transparent;
  fill: var(--text-normal);
  display: flex;
  align-items: center;
  justify-content: center;
}`);

// node_modules/unzipit/dist/unzipit.module.js
function readBlobAsArrayBuffer(blob) {
  if (blob.arrayBuffer) {
    return blob.arrayBuffer();
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("loadend", () => {
      resolve(reader.result);
    });
    reader.addEventListener("error", reject);
    reader.readAsArrayBuffer(blob);
  });
}
async function readBlobAsUint8Array(blob) {
  const arrayBuffer = await readBlobAsArrayBuffer(blob);
  return new Uint8Array(arrayBuffer);
}
function isBlob(v) {
  return typeof Blob !== "undefined" && v instanceof Blob;
}
function isSharedArrayBuffer(b) {
  return typeof SharedArrayBuffer !== "undefined" && b instanceof SharedArrayBuffer;
}
var isNode = typeof process !== "undefined" && process.versions && typeof process.versions.node !== "undefined" && typeof process.versions.electron === "undefined";
function isTypedArraySameAsArrayBuffer(typedArray) {
  return typedArray.byteOffset === 0 && typedArray.byteLength === typedArray.buffer.byteLength;
}
var ArrayBufferReader = class {
  constructor(arrayBufferOrView) {
    this.typedArray = arrayBufferOrView instanceof ArrayBuffer || isSharedArrayBuffer(arrayBufferOrView) ? new Uint8Array(arrayBufferOrView) : new Uint8Array(arrayBufferOrView.buffer, arrayBufferOrView.byteOffset, arrayBufferOrView.byteLength);
  }
  async getLength() {
    return this.typedArray.byteLength;
  }
  async read(offset, length) {
    return new Uint8Array(this.typedArray.buffer, this.typedArray.byteOffset + offset, length);
  }
};
var BlobReader = class {
  constructor(blob) {
    this.blob = blob;
  }
  async getLength() {
    return this.blob.size;
  }
  async read(offset, length) {
    const blob = this.blob.slice(offset, offset + length);
    const arrayBuffer = await readBlobAsArrayBuffer(blob);
    return new Uint8Array(arrayBuffer);
  }
  async sliceAsBlob(offset, length, type = "") {
    return this.blob.slice(offset, offset + length, type);
  }
};
function inflate(data, buf) {
  var u8 = Uint8Array;
  if (data[0] == 3 && data[1] == 0) return buf ? buf : new u8(0);
  var bitsF = _bitsF, bitsE = _bitsE, decodeTiny = _decodeTiny, get17 = _get17;
  var noBuf = buf == null;
  if (noBuf) buf = new u8(data.length >>> 2 << 3);
  var BFINAL = 0, BTYPE = 0, HLIT = 0, HDIST = 0, HCLEN = 0, ML = 0, MD = 0;
  var off = 0, pos = 0;
  var lmap, dmap;
  while (BFINAL == 0) {
    BFINAL = bitsF(data, pos, 1);
    BTYPE = bitsF(data, pos + 1, 2);
    pos += 3;
    if (BTYPE == 0) {
      if ((pos & 7) != 0) pos += 8 - (pos & 7);
      var p8 = (pos >>> 3) + 4, len = data[p8 - 4] | data[p8 - 3] << 8;
      if (noBuf) buf = _check(buf, off + len);
      buf.set(new u8(data.buffer, data.byteOffset + p8, len), off);
      pos = p8 + len << 3;
      off += len;
      continue;
    }
    if (noBuf) buf = _check(buf, off + (1 << 17));
    if (BTYPE == 1) {
      lmap = U.flmap;
      dmap = U.fdmap;
      ML = (1 << 9) - 1;
      MD = (1 << 5) - 1;
    }
    if (BTYPE == 2) {
      HLIT = bitsE(data, pos, 5) + 257;
      HDIST = bitsE(data, pos + 5, 5) + 1;
      HCLEN = bitsE(data, pos + 10, 4) + 4;
      pos += 14;
      for (var i = 0; i < 38; i += 2) {
        U.itree[i] = 0;
        U.itree[i + 1] = 0;
      }
      var tl = 1;
      for (var i = 0; i < HCLEN; i++) {
        var l = bitsE(data, pos + i * 3, 3);
        U.itree[(U.ordr[i] << 1) + 1] = l;
        if (l > tl) tl = l;
      }
      pos += 3 * HCLEN;
      makeCodes(U.itree, tl);
      codes2map(U.itree, tl, U.imap);
      lmap = U.lmap;
      dmap = U.dmap;
      pos = decodeTiny(U.imap, (1 << tl) - 1, HLIT + HDIST, data, pos, U.ttree);
      var mx0 = _copyOut(U.ttree, 0, HLIT, U.ltree);
      ML = (1 << mx0) - 1;
      var mx1 = _copyOut(U.ttree, HLIT, HDIST, U.dtree);
      MD = (1 << mx1) - 1;
      makeCodes(U.ltree, mx0);
      codes2map(U.ltree, mx0, lmap);
      makeCodes(U.dtree, mx1);
      codes2map(U.dtree, mx1, dmap);
    }
    while (true) {
      var code = lmap[get17(data, pos) & ML];
      pos += code & 15;
      var lit = code >>> 4;
      if (lit >>> 8 == 0) {
        buf[off++] = lit;
      } else if (lit == 256) {
        break;
      } else {
        var end = off + lit - 254;
        if (lit > 264) {
          var ebs = U.ldef[lit - 257];
          end = off + (ebs >>> 3) + bitsE(data, pos, ebs & 7);
          pos += ebs & 7;
        }
        var dcode = dmap[get17(data, pos) & MD];
        pos += dcode & 15;
        var dlit = dcode >>> 4;
        var dbs = U.ddef[dlit], dst = (dbs >>> 4) + bitsF(data, pos, dbs & 15);
        pos += dbs & 15;
        if (noBuf) buf = _check(buf, off + (1 << 17));
        while (off < end) {
          buf[off] = buf[off++ - dst];
          buf[off] = buf[off++ - dst];
          buf[off] = buf[off++ - dst];
          buf[off] = buf[off++ - dst];
        }
        off = end;
      }
    }
  }
  return buf.length == off ? buf : buf.slice(0, off);
}
function _check(buf, len) {
  var bl = buf.length;
  if (len <= bl) return buf;
  var nbuf = new Uint8Array(Math.max(bl << 1, len));
  nbuf.set(buf, 0);
  return nbuf;
}
function _decodeTiny(lmap, LL, len, data, pos, tree) {
  var bitsE = _bitsE, get17 = _get17;
  var i = 0;
  while (i < len) {
    var code = lmap[get17(data, pos) & LL];
    pos += code & 15;
    var lit = code >>> 4;
    if (lit <= 15) {
      tree[i] = lit;
      i++;
    } else {
      var ll = 0, n = 0;
      if (lit == 16) {
        n = 3 + bitsE(data, pos, 2);
        pos += 2;
        ll = tree[i - 1];
      } else if (lit == 17) {
        n = 3 + bitsE(data, pos, 3);
        pos += 3;
      } else if (lit == 18) {
        n = 11 + bitsE(data, pos, 7);
        pos += 7;
      }
      var ni = i + n;
      while (i < ni) {
        tree[i] = ll;
        i++;
      }
    }
  }
  return pos;
}
function _copyOut(src, off, len, tree) {
  var mx = 0, i = 0, tl = tree.length >>> 1;
  while (i < len) {
    var v = src[i + off];
    tree[i << 1] = 0;
    tree[(i << 1) + 1] = v;
    if (v > mx) mx = v;
    i++;
  }
  while (i < tl) {
    tree[i << 1] = 0;
    tree[(i << 1) + 1] = 0;
    i++;
  }
  return mx;
}
function makeCodes(tree, MAX_BITS) {
  var max_code = tree.length;
  var code, bits, n, i, len;
  var bl_count = U.bl_count;
  for (var i = 0; i <= MAX_BITS; i++) bl_count[i] = 0;
  for (i = 1; i < max_code; i += 2) bl_count[tree[i]]++;
  var next_code = U.next_code;
  code = 0;
  bl_count[0] = 0;
  for (bits = 1; bits <= MAX_BITS; bits++) {
    code = code + bl_count[bits - 1] << 1;
    next_code[bits] = code;
  }
  for (n = 0; n < max_code; n += 2) {
    len = tree[n + 1];
    if (len != 0) {
      tree[n] = next_code[len];
      next_code[len]++;
    }
  }
}
function codes2map(tree, MAX_BITS, map) {
  var max_code = tree.length;
  var r15 = U.rev15;
  for (var i = 0; i < max_code; i += 2) if (tree[i + 1] != 0) {
    var lit = i >> 1;
    var cl = tree[i + 1], val = lit << 4 | cl;
    var rest = MAX_BITS - cl, i0 = tree[i] << rest, i1 = i0 + (1 << rest);
    while (i0 != i1) {
      var p0 = r15[i0] >>> 15 - MAX_BITS;
      map[p0] = val;
      i0++;
    }
  }
}
function revCodes(tree, MAX_BITS) {
  var r15 = U.rev15, imb = 15 - MAX_BITS;
  for (var i = 0; i < tree.length; i += 2) {
    var i0 = tree[i] << MAX_BITS - tree[i + 1];
    tree[i] = r15[i0] >>> imb;
  }
}
function _bitsE(dt, pos, length) {
  return (dt[pos >>> 3] | dt[(pos >>> 3) + 1] << 8) >>> (pos & 7) & (1 << length) - 1;
}
function _bitsF(dt, pos, length) {
  return (dt[pos >>> 3] | dt[(pos >>> 3) + 1] << 8 | dt[(pos >>> 3) + 2] << 16) >>> (pos & 7) & (1 << length) - 1;
}
function _get17(dt, pos) {
  return (dt[pos >>> 3] | dt[(pos >>> 3) + 1] << 8 | dt[(pos >>> 3) + 2] << 16) >>> (pos & 7);
}
var U = function() {
  var u16 = Uint16Array, u32 = Uint32Array;
  return {
    next_code: new u16(16),
    bl_count: new u16(16),
    ordr: [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
    of0: [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 999, 999, 999],
    exb: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0],
    ldef: new u16(32),
    df0: [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 65535, 65535],
    dxb: [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0],
    ddef: new u32(32),
    flmap: new u16(512),
    fltree: [],
    fdmap: new u16(32),
    fdtree: [],
    lmap: new u16(32768),
    ltree: [],
    ttree: [],
    dmap: new u16(32768),
    dtree: [],
    imap: new u16(512),
    itree: [],
    //rev9 : new u16(  512)
    rev15: new u16(1 << 15),
    lhst: new u32(286),
    dhst: new u32(30),
    ihst: new u32(19),
    lits: new u32(15e3),
    strt: new u16(1 << 16),
    prev: new u16(1 << 15)
  };
}();
(function() {
  var len = 1 << 15;
  for (var i = 0; i < len; i++) {
    var x = i;
    x = (x & 2863311530) >>> 1 | (x & 1431655765) << 1;
    x = (x & 3435973836) >>> 2 | (x & 858993459) << 2;
    x = (x & 4042322160) >>> 4 | (x & 252645135) << 4;
    x = (x & 4278255360) >>> 8 | (x & 16711935) << 8;
    U.rev15[i] = (x >>> 16 | x << 16) >>> 17;
  }
  function pushV(tgt, n, sv) {
    while (n-- != 0) tgt.push(0, sv);
  }
  for (var i = 0; i < 32; i++) {
    U.ldef[i] = U.of0[i] << 3 | U.exb[i];
    U.ddef[i] = U.df0[i] << 4 | U.dxb[i];
  }
  pushV(U.fltree, 144, 8);
  pushV(U.fltree, 255 - 143, 9);
  pushV(U.fltree, 279 - 255, 7);
  pushV(U.fltree, 287 - 279, 8);
  makeCodes(U.fltree, 9);
  codes2map(U.fltree, 9, U.flmap);
  revCodes(U.fltree, 9);
  pushV(U.fdtree, 32, 5);
  makeCodes(U.fdtree, 5);
  codes2map(U.fdtree, 5, U.fdmap);
  revCodes(U.fdtree, 5);
  pushV(U.itree, 19, 0);
  pushV(U.ltree, 286, 0);
  pushV(U.dtree, 30, 0);
  pushV(U.ttree, 320, 0);
})();
var crc = {
  table: function() {
    var tab = new Uint32Array(256);
    for (var n = 0; n < 256; n++) {
      var c = n;
      for (var k = 0; k < 8; k++) {
        if (c & 1) c = 3988292384 ^ c >>> 1;
        else c = c >>> 1;
      }
      tab[n] = c;
    }
    return tab;
  }(),
  update: function(c, buf, off, len) {
    for (var i = 0; i < len; i++) c = crc.table[(c ^ buf[off + i]) & 255] ^ c >>> 8;
    return c;
  },
  crc: function(b, o, l) {
    return crc.update(4294967295, b, o, l) ^ 4294967295;
  }
};
function inflateRaw(file, buf) {
  return inflate(file, buf);
}
var config = {
  numWorkers: 1,
  workerURL: "",
  useWorkers: false
};
var nextId = 0;
var numWorkers = 0;
var canUseWorkers = true;
var workers = [];
var availableWorkers = [];
var waitingForWorkerQueue = [];
var currentlyProcessingIdToRequestMap = /* @__PURE__ */ new Map();
function handleResult(e) {
  makeWorkerAvailable(e.target);
  const { id, error, data } = e.data;
  const request = currentlyProcessingIdToRequestMap.get(id);
  currentlyProcessingIdToRequestMap.delete(id);
  if (error) {
    request.reject(error);
  } else {
    request.resolve(data);
  }
}
function startWorker(url) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(url);
    worker.onmessage = (e) => {
      if (e.data === "start") {
        worker.onerror = void 0;
        worker.onmessage = void 0;
        resolve(worker);
      } else {
        reject(new Error(`unexpected message: ${e.data}`));
      }
    };
    worker.onerror = reject;
  });
}
function dynamicRequire(mod, request) {
  return mod.require ? mod.require(request) : {};
}
var workerHelper = function() {
  if (isNode) {
    const { Worker: Worker2 } = dynamicRequire(module, "worker_threads");
    return {
      async createWorker(url) {
        return new Worker2(url);
      },
      addEventListener(worker, fn) {
        worker.on("message", (data) => {
          fn({ target: worker, data });
        });
      },
      async terminate(worker) {
        await worker.terminate();
      }
    };
  } else {
    return {
      async createWorker(url) {
        try {
          const worker = await startWorker(url);
          return worker;
        } catch (e) {
          console.warn("could not load worker:", url);
        }
        let text;
        try {
          const req = await fetch(url, { mode: "cors" });
          if (!req.ok) {
            throw new Error(`could not load: ${url}`);
          }
          text = await req.text();
          url = URL.createObjectURL(new Blob([text], { type: "application/javascript" }));
          const worker = await startWorker(url);
          config.workerURL = url;
          return worker;
        } catch (e) {
          console.warn("could not load worker via fetch:", url);
        }
        if (text !== void 0) {
          try {
            url = `data:application/javascript;base64,${btoa(text)}`;
            const worker = await startWorker(url);
            config.workerURL = url;
            return worker;
          } catch (e) {
            console.warn("could not load worker via dataURI");
          }
        }
        console.warn("workers will not be used");
        throw new Error("can not start workers");
      },
      addEventListener(worker, fn) {
        worker.addEventListener("message", fn);
      },
      async terminate(worker) {
        worker.terminate();
      }
    };
  }
}();
function makeWorkerAvailable(worker) {
  availableWorkers.push(worker);
  processWaitingForWorkerQueue();
}
async function getAvailableWorker() {
  if (availableWorkers.length === 0 && numWorkers < config.numWorkers) {
    ++numWorkers;
    try {
      const worker = await workerHelper.createWorker(config.workerURL);
      workers.push(worker);
      availableWorkers.push(worker);
      workerHelper.addEventListener(worker, handleResult);
    } catch (e) {
      canUseWorkers = false;
    }
  }
  return availableWorkers.pop();
}
function inflateRawLocal(src, uncompressedSize, type, resolve) {
  const dst = new Uint8Array(uncompressedSize);
  inflateRaw(src, dst);
  resolve(type ? new Blob([dst], { type }) : dst.buffer);
}
async function processWaitingForWorkerQueue() {
  if (waitingForWorkerQueue.length === 0) {
    return;
  }
  if (config.useWorkers && canUseWorkers) {
    const worker = await getAvailableWorker();
    if (canUseWorkers) {
      if (worker) {
        if (waitingForWorkerQueue.length === 0) {
          makeWorkerAvailable(worker);
          return;
        }
        const { id, src, uncompressedSize, type, resolve, reject } = waitingForWorkerQueue.shift();
        currentlyProcessingIdToRequestMap.set(id, { id, resolve, reject });
        const transferables = [];
        worker.postMessage({
          type: "inflate",
          data: {
            id,
            type,
            src,
            uncompressedSize
          }
        }, transferables);
      }
      return;
    }
  }
  while (waitingForWorkerQueue.length) {
    const { src, uncompressedSize, type, resolve } = waitingForWorkerQueue.shift();
    let data = src;
    if (isBlob(src)) {
      data = await readBlobAsUint8Array(src);
    }
    inflateRawLocal(data, uncompressedSize, type, resolve);
  }
}
function inflateRawAsync(src, uncompressedSize, type) {
  return new Promise((resolve, reject) => {
    waitingForWorkerQueue.push({ src, uncompressedSize, type, resolve, reject, id: nextId++ });
    processWaitingForWorkerQueue();
  });
}
function dosDateTimeToDate(date, time) {
  const day = date & 31;
  const month = (date >> 5 & 15) - 1;
  const year = (date >> 9 & 127) + 1980;
  const millisecond = 0;
  const second = (time & 31) * 2;
  const minute = time >> 5 & 63;
  const hour = time >> 11 & 31;
  return new Date(year, month, day, hour, minute, second, millisecond);
}
var ZipEntry = class {
  constructor(reader, rawEntry) {
    this._reader = reader;
    this._rawEntry = rawEntry;
    this.name = rawEntry.name;
    this.nameBytes = rawEntry.nameBytes;
    this.size = rawEntry.uncompressedSize;
    this.compressedSize = rawEntry.compressedSize;
    this.comment = rawEntry.comment;
    this.commentBytes = rawEntry.commentBytes;
    this.compressionMethod = rawEntry.compressionMethod;
    this.lastModDate = dosDateTimeToDate(rawEntry.lastModFileDate, rawEntry.lastModFileTime);
    this.isDirectory = rawEntry.uncompressedSize === 0 && rawEntry.name.endsWith("/");
    this.encrypted = !!(rawEntry.generalPurposeBitFlag & 1);
    this.externalFileAttributes = rawEntry.externalFileAttributes;
    this.versionMadeBy = rawEntry.versionMadeBy;
  }
  // returns a promise that returns a Blob for this entry
  async blob(type = "application/octet-stream") {
    return await readEntryDataAsBlob(this._reader, this._rawEntry, type);
  }
  // returns a promise that returns an ArrayBuffer for this entry
  async arrayBuffer() {
    return await readEntryDataAsArrayBuffer(this._reader, this._rawEntry);
  }
  // returns text, assumes the text is valid utf8. If you want more options decode arrayBuffer yourself
  async text() {
    const buffer = await this.arrayBuffer();
    return decodeBuffer(new Uint8Array(buffer));
  }
  // returns text with JSON.parse called on it. If you want more options decode arrayBuffer yourself
  async json() {
    const text = await this.text();
    return JSON.parse(text);
  }
};
var EOCDR_WITHOUT_COMMENT_SIZE = 22;
var MAX_COMMENT_SIZE = 65535;
var EOCDR_SIGNATURE = 101010256;
var ZIP64_EOCDR_SIGNATURE = 101075792;
async function readAs(reader, offset, length) {
  return await reader.read(offset, length);
}
async function readAsBlobOrTypedArray(reader, offset, length, type) {
  if (reader.sliceAsBlob) {
    return await reader.sliceAsBlob(offset, length, type);
  }
  return await reader.read(offset, length);
}
var crc$1 = {
  unsigned() {
    return 0;
  }
};
function getUint16LE(uint8View, offset) {
  return uint8View[offset] + uint8View[offset + 1] * 256;
}
function getUint32LE(uint8View, offset) {
  return uint8View[offset] + uint8View[offset + 1] * 256 + uint8View[offset + 2] * 65536 + uint8View[offset + 3] * 16777216;
}
function getUint64LE(uint8View, offset) {
  return getUint32LE(uint8View, offset) + getUint32LE(uint8View, offset + 4) * 4294967296;
}
var utf8Decoder = new TextDecoder();
function decodeBuffer(uint8View, isUTF8) {
  if (isSharedArrayBuffer(uint8View.buffer)) {
    uint8View = new Uint8Array(uint8View);
  }
  return utf8Decoder.decode(uint8View);
}
async function findEndOfCentralDirector(reader, totalLength) {
  const size = Math.min(EOCDR_WITHOUT_COMMENT_SIZE + MAX_COMMENT_SIZE, totalLength);
  const readStart = totalLength - size;
  const data = await readAs(reader, readStart, size);
  for (let i = size - EOCDR_WITHOUT_COMMENT_SIZE; i >= 0; --i) {
    if (getUint32LE(data, i) !== EOCDR_SIGNATURE) {
      continue;
    }
    const eocdr = new Uint8Array(data.buffer, data.byteOffset + i, data.byteLength - i);
    const diskNumber = getUint16LE(eocdr, 4);
    if (diskNumber !== 0) {
      throw new Error(`multi-volume zip files are not supported. This is volume: ${diskNumber}`);
    }
    const entryCount = getUint16LE(eocdr, 10);
    const centralDirectorySize = getUint32LE(eocdr, 12);
    const centralDirectoryOffset = getUint32LE(eocdr, 16);
    const commentLength = getUint16LE(eocdr, 20);
    const expectedCommentLength = eocdr.length - EOCDR_WITHOUT_COMMENT_SIZE;
    if (commentLength !== expectedCommentLength) {
      throw new Error(`invalid comment length. expected: ${expectedCommentLength}, actual: ${commentLength}`);
    }
    const commentBytes = new Uint8Array(eocdr.buffer, eocdr.byteOffset + 22, commentLength);
    const comment = decodeBuffer(commentBytes);
    if (entryCount === 65535 || centralDirectoryOffset === 4294967295) {
      return await readZip64CentralDirectory(reader, readStart + i, comment, commentBytes);
    } else {
      return await readEntries(reader, centralDirectoryOffset, centralDirectorySize, entryCount, comment, commentBytes);
    }
  }
  throw new Error("could not find end of central directory. maybe not zip file");
}
var END_OF_CENTRAL_DIRECTORY_LOCATOR_SIGNATURE = 117853008;
async function readZip64CentralDirectory(reader, offset, comment, commentBytes) {
  const zip64EocdlOffset = offset - 20;
  const eocdl = await readAs(reader, zip64EocdlOffset, 20);
  if (getUint32LE(eocdl, 0) !== END_OF_CENTRAL_DIRECTORY_LOCATOR_SIGNATURE) {
    throw new Error("invalid zip64 end of central directory locator signature");
  }
  const zip64EocdrOffset = getUint64LE(eocdl, 8);
  const zip64Eocdr = await readAs(reader, zip64EocdrOffset, 56);
  if (getUint32LE(zip64Eocdr, 0) !== ZIP64_EOCDR_SIGNATURE) {
    throw new Error("invalid zip64 end of central directory record signature");
  }
  const entryCount = getUint64LE(zip64Eocdr, 32);
  const centralDirectorySize = getUint64LE(zip64Eocdr, 40);
  const centralDirectoryOffset = getUint64LE(zip64Eocdr, 48);
  return readEntries(reader, centralDirectoryOffset, centralDirectorySize, entryCount, comment, commentBytes);
}
var CENTRAL_DIRECTORY_FILE_HEADER_SIGNATURE = 33639248;
async function readEntries(reader, centralDirectoryOffset, centralDirectorySize, rawEntryCount, comment, commentBytes) {
  let readEntryCursor = 0;
  const allEntriesBuffer = await readAs(reader, centralDirectoryOffset, centralDirectorySize);
  const rawEntries = [];
  for (let e = 0; e < rawEntryCount; ++e) {
    const buffer = allEntriesBuffer.subarray(readEntryCursor, readEntryCursor + 46);
    const signature = getUint32LE(buffer, 0);
    if (signature !== CENTRAL_DIRECTORY_FILE_HEADER_SIGNATURE) {
      throw new Error(`invalid central directory file header signature: 0x${signature.toString(16)}`);
    }
    const rawEntry = {
      // 4 - Version made by
      versionMadeBy: getUint16LE(buffer, 4),
      // 6 - Version needed to extract (minimum)
      versionNeededToExtract: getUint16LE(buffer, 6),
      // 8 - General purpose bit flag
      generalPurposeBitFlag: getUint16LE(buffer, 8),
      // 10 - Compression method
      compressionMethod: getUint16LE(buffer, 10),
      // 12 - File last modification time
      lastModFileTime: getUint16LE(buffer, 12),
      // 14 - File last modification date
      lastModFileDate: getUint16LE(buffer, 14),
      // 16 - CRC-32
      crc32: getUint32LE(buffer, 16),
      // 20 - Compressed size
      compressedSize: getUint32LE(buffer, 20),
      // 24 - Uncompressed size
      uncompressedSize: getUint32LE(buffer, 24),
      // 28 - File name length (n)
      fileNameLength: getUint16LE(buffer, 28),
      // 30 - Extra field length (m)
      extraFieldLength: getUint16LE(buffer, 30),
      // 32 - File comment length (k)
      fileCommentLength: getUint16LE(buffer, 32),
      // 34 - Disk number where file starts
      // 36 - Internal file attributes
      internalFileAttributes: getUint16LE(buffer, 36),
      // 38 - External file attributes
      externalFileAttributes: getUint32LE(buffer, 38),
      // 42 - Relative offset of local file header
      relativeOffsetOfLocalHeader: getUint32LE(buffer, 42)
    };
    if (rawEntry.generalPurposeBitFlag & 64) {
      throw new Error("strong encryption is not supported");
    }
    readEntryCursor += 46;
    const data = allEntriesBuffer.subarray(readEntryCursor, readEntryCursor + rawEntry.fileNameLength + rawEntry.extraFieldLength + rawEntry.fileCommentLength);
    rawEntry.nameBytes = data.slice(0, rawEntry.fileNameLength);
    rawEntry.name = decodeBuffer(rawEntry.nameBytes);
    const fileCommentStart = rawEntry.fileNameLength + rawEntry.extraFieldLength;
    const extraFieldBuffer = data.slice(rawEntry.fileNameLength, fileCommentStart);
    rawEntry.extraFields = [];
    let i = 0;
    while (i < extraFieldBuffer.length - 3) {
      const headerId = getUint16LE(extraFieldBuffer, i + 0);
      const dataSize = getUint16LE(extraFieldBuffer, i + 2);
      const dataStart = i + 4;
      const dataEnd = dataStart + dataSize;
      if (dataEnd > extraFieldBuffer.length) {
        throw new Error("extra field length exceeds extra field buffer size");
      }
      rawEntry.extraFields.push({
        id: headerId,
        data: extraFieldBuffer.slice(dataStart, dataEnd)
      });
      i = dataEnd;
    }
    rawEntry.commentBytes = data.slice(fileCommentStart, fileCommentStart + rawEntry.fileCommentLength);
    rawEntry.comment = decodeBuffer(rawEntry.commentBytes);
    readEntryCursor += data.length;
    if (rawEntry.uncompressedSize === 4294967295 || rawEntry.compressedSize === 4294967295 || rawEntry.relativeOffsetOfLocalHeader === 4294967295) {
      const zip64ExtraField = rawEntry.extraFields.find((e2) => e2.id === 1);
      if (!zip64ExtraField) {
        throw new Error("expected zip64 extended information extra field");
      }
      const zip64EiefBuffer = zip64ExtraField.data;
      let index = 0;
      if (rawEntry.uncompressedSize === 4294967295) {
        if (index + 8 > zip64EiefBuffer.length) {
          throw new Error("zip64 extended information extra field does not include uncompressed size");
        }
        rawEntry.uncompressedSize = getUint64LE(zip64EiefBuffer, index);
        index += 8;
      }
      if (rawEntry.compressedSize === 4294967295) {
        if (index + 8 > zip64EiefBuffer.length) {
          throw new Error("zip64 extended information extra field does not include compressed size");
        }
        rawEntry.compressedSize = getUint64LE(zip64EiefBuffer, index);
        index += 8;
      }
      if (rawEntry.relativeOffsetOfLocalHeader === 4294967295) {
        if (index + 8 > zip64EiefBuffer.length) {
          throw new Error("zip64 extended information extra field does not include relative header offset");
        }
        rawEntry.relativeOffsetOfLocalHeader = getUint64LE(zip64EiefBuffer, index);
        index += 8;
      }
    }
    const nameField = rawEntry.extraFields.find((e2) => e2.id === 28789 && e2.data.length >= 6 && // too short to be meaningful
    e2.data[0] === 1 && // Version       1 byte      version of this extra field, currently 1
    getUint32LE(e2.data, 1), crc$1.unsigned(rawEntry.nameBytes));
    if (nameField) {
      rawEntry.fileName = decodeBuffer(nameField.data.slice(5));
    }
    if (rawEntry.compressionMethod === 0) {
      let expectedCompressedSize = rawEntry.uncompressedSize;
      if ((rawEntry.generalPurposeBitFlag & 1) !== 0) {
        expectedCompressedSize += 12;
      }
      if (rawEntry.compressedSize !== expectedCompressedSize) {
        throw new Error(`compressed size mismatch for stored file: ${rawEntry.compressedSize} != ${expectedCompressedSize}`);
      }
    }
    rawEntries.push(rawEntry);
  }
  const zip = {
    comment,
    commentBytes
  };
  return {
    zip,
    entries: rawEntries.map((e) => new ZipEntry(reader, e))
  };
}
async function readEntryDataHeader(reader, rawEntry) {
  if (rawEntry.generalPurposeBitFlag & 1) {
    throw new Error("encrypted entries not supported");
  }
  const buffer = await readAs(reader, rawEntry.relativeOffsetOfLocalHeader, 30);
  const totalLength = await reader.getLength();
  const signature = getUint32LE(buffer, 0);
  if (signature !== 67324752) {
    throw new Error(`invalid local file header signature: 0x${signature.toString(16)}`);
  }
  const fileNameLength = getUint16LE(buffer, 26);
  const extraFieldLength = getUint16LE(buffer, 28);
  const localFileHeaderEnd = rawEntry.relativeOffsetOfLocalHeader + buffer.length + fileNameLength + extraFieldLength;
  let decompress;
  if (rawEntry.compressionMethod === 0) {
    decompress = false;
  } else if (rawEntry.compressionMethod === 8) {
    decompress = true;
  } else {
    throw new Error(`unsupported compression method: ${rawEntry.compressionMethod}`);
  }
  const fileDataStart = localFileHeaderEnd;
  const fileDataEnd = fileDataStart + rawEntry.compressedSize;
  if (rawEntry.compressedSize !== 0) {
    if (fileDataEnd > totalLength) {
      throw new Error(`file data overflows file bounds: ${fileDataStart} +  ${rawEntry.compressedSize}  > ${totalLength}`);
    }
  }
  return {
    decompress,
    fileDataStart
  };
}
async function readEntryDataAsArrayBuffer(reader, rawEntry) {
  const { decompress, fileDataStart } = await readEntryDataHeader(reader, rawEntry);
  if (!decompress) {
    const dataView = await readAs(reader, fileDataStart, rawEntry.compressedSize);
    return isTypedArraySameAsArrayBuffer(dataView) ? dataView.buffer : dataView.slice().buffer;
  }
  const typedArrayOrBlob = await readAsBlobOrTypedArray(reader, fileDataStart, rawEntry.compressedSize);
  const result = await inflateRawAsync(typedArrayOrBlob, rawEntry.uncompressedSize);
  return result;
}
async function readEntryDataAsBlob(reader, rawEntry, type) {
  const { decompress, fileDataStart } = await readEntryDataHeader(reader, rawEntry);
  if (!decompress) {
    const typedArrayOrBlob2 = await readAsBlobOrTypedArray(reader, fileDataStart, rawEntry.compressedSize, type);
    if (isBlob(typedArrayOrBlob2)) {
      return typedArrayOrBlob2;
    }
    return new Blob([isSharedArrayBuffer(typedArrayOrBlob2.buffer) ? new Uint8Array(typedArrayOrBlob2) : typedArrayOrBlob2], { type });
  }
  const typedArrayOrBlob = await readAsBlobOrTypedArray(reader, fileDataStart, rawEntry.compressedSize);
  const result = await inflateRawAsync(typedArrayOrBlob, rawEntry.uncompressedSize, type);
  return result;
}
async function unzipRaw(source) {
  let reader;
  if (typeof Blob !== "undefined" && source instanceof Blob) {
    reader = new BlobReader(source);
  } else if (source instanceof ArrayBuffer || source && source.buffer && source.buffer instanceof ArrayBuffer) {
    reader = new ArrayBufferReader(source);
  } else if (isSharedArrayBuffer(source) || isSharedArrayBuffer(source.buffer)) {
    reader = new ArrayBufferReader(source);
  } else if (typeof source === "string") {
    const req = await fetch(source);
    if (!req.ok) {
      throw new Error(`failed http request ${source}, status: ${req.status}: ${req.statusText}`);
    }
    const blob = await req.blob();
    reader = new BlobReader(blob);
  } else if (typeof source.getLength === "function" && typeof source.read === "function") {
    reader = source;
  } else {
    throw new Error("unsupported source type");
  }
  const totalLength = await reader.getLength();
  if (totalLength > Number.MAX_SAFE_INTEGER) {
    throw new Error(`file too large. size: ${totalLength}. Only file sizes up 4503599627370496 bytes are supported`);
  }
  return await findEndOfCentralDirector(reader, totalLength);
}
async function unzip(source) {
  const { zip, entries } = await unzipRaw(source);
  return {
    zip,
    entries: Object.fromEntries(entries.map((v) => [v.name, v]))
  };
}

// node_modules/arraybuffer-isbinary/dist/index.mjs
var MAX_BYTES = 512;
var Reader = class {
  constructor(fileBuffer, size) {
    this.fileBuffer = fileBuffer;
    this.size = size;
    this.offset = 0;
    this.error = false;
  }
  hasError() {
    return this.error;
  }
  nextByte() {
    if (this.offset === this.size || this.hasError()) {
      this.error = true;
      return 255;
    }
    return this.fileBuffer[this.offset++];
  }
  next(len) {
    const n = [];
    for (let i = 0; i < len; i++)
      n[i] = this.nextByte();
    return n;
  }
};
function readProtoVarInt(reader) {
  let idx = 0;
  let varInt = 0;
  while (!reader.hasError()) {
    const b = reader.nextByte();
    varInt = varInt | (b & 127) << 7 * idx;
    if ((b & 128) === 0)
      break;
    idx++;
  }
  return varInt;
}
function readProtoMessage(reader) {
  const varInt = readProtoVarInt(reader);
  const wireType = varInt & 7;
  switch (wireType) {
    case 0:
      readProtoVarInt(reader);
      return true;
    case 1:
      reader.next(8);
      return true;
    case 2:
      const len = readProtoVarInt(reader);
      reader.next(len);
      return true;
    case 5:
      reader.next(4);
      return true;
  }
  return false;
}
function isBinaryProto(fileBuffer, totalBytes) {
  const reader = new Reader(fileBuffer, totalBytes);
  let numMessages = 0;
  while (true) {
    if (!readProtoMessage(reader) && !reader.hasError())
      return false;
    if (reader.hasError())
      break;
    numMessages++;
  }
  return numMessages > 0;
}
function isBinaryFile(file, size) {
  if (size === void 0)
    size = file.byteLength;
  if (file + "" === "[object ArrayBuffer]")
    file = new Uint8Array(file);
  return isBinaryCheck(file, size);
}
function isBinaryCheck(fileBuffer, bytesRead) {
  if (bytesRead === 0)
    return false;
  let suspiciousBytes = 0;
  const totalBytes = Math.min(bytesRead, MAX_BYTES);
  if (bytesRead >= 3 && fileBuffer[0] === 239 && fileBuffer[1] === 187 && fileBuffer[2] === 191)
    return false;
  if (bytesRead >= 4 && fileBuffer[0] === 0 && fileBuffer[1] === 0 && fileBuffer[2] === 254 && fileBuffer[3] === 255)
    return false;
  if (bytesRead >= 4 && fileBuffer[0] === 255 && fileBuffer[1] === 254 && fileBuffer[2] === 0 && fileBuffer[3] === 0)
    return false;
  if (bytesRead >= 4 && fileBuffer[0] === 132 && fileBuffer[1] === 49 && fileBuffer[2] === 149 && fileBuffer[3] === 51)
    return false;
  if (totalBytes >= 5 && fileBuffer.slice(0, 5).toString() === "%PDF-") {
    return true;
  }
  if (bytesRead >= 2 && fileBuffer[0] === 254 && fileBuffer[1] === 255)
    return false;
  if (bytesRead >= 2 && fileBuffer[0] === 255 && fileBuffer[1] === 254)
    return false;
  for (let i = 0; i < totalBytes; i++) {
    if (fileBuffer[i] === 0) {
      return true;
    } else if ((fileBuffer[i] < 7 || fileBuffer[i] > 14) && (fileBuffer[i] < 32 || fileBuffer[i] > 127)) {
      if (fileBuffer[i] > 193 && fileBuffer[i] < 224 && i + 1 < totalBytes) {
        i++;
        if (fileBuffer[i] > 127 && fileBuffer[i] < 192)
          continue;
      } else if (fileBuffer[i] > 223 && fileBuffer[i] < 240 && i + 2 < totalBytes) {
        i++;
        if (fileBuffer[i] > 127 && fileBuffer[i] < 192 && fileBuffer[i + 1] > 127 && fileBuffer[i + 1] < 192) {
          i++;
          continue;
        }
      }
      suspiciousBytes++;
      if (i >= 32 && suspiciousBytes * 100 / totalBytes > 10)
        return true;
    }
  }
  if (suspiciousBytes * 100 / totalBytes > 10)
    return true;
  if (suspiciousBytes > 1 && isBinaryProto(fileBuffer, totalBytes))
    return true;
  return false;
}

// assets/arrow-expand-down.svg
var arrow_expand_down_default = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22,4V2H2V4H11V18.17L5.5,12.67L4.08,14.08L12,22L19.92,14.08L18.5,12.67L13,18.17V4H22Z" /></svg>';

// assets/arrow-expand-up.svg
var arrow_expand_up_default = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2,20V22H22V20H13V5.83L18.5,11.33L19.92,9.92L12,2L4.08,9.92L5.5,11.33L11,5.83V20H2Z" /></svg>';

// assets/folder-arrow-left-outline.svg
var folder_arrow_left_outline_default = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 8V13.81C21.39 13.46 20.72 13.22 20 13.09V8H4V18H13.09C13.04 18.33 13 18.66 13 19C13 19.34 13.04 19.67 13.09 20H4C2.9 20 2 19.11 2 18V6C2 4.89 2.89 4 4 4H10L12 6H20C21.1 6 22 6.89 22 8M18 16L15 19L18 22V20H22V18H18V16Z" /></svg>';

// assets/download.svg
var download_default = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" /></svg>';

// assets/close.svg
var close_default = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>';

// assets/content-copy.svg
var content_copy_default = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" /></svg>';

// plugins/ZipPreview/src/FilePreview.tsx
var React = BdApi.React;
function FilePreview({ name, type: startType, blob, buff, onClose }) {
  const [type, setType] = React.useState(startType);
  const url = URL.createObjectURL(blob);
  function close() {
    URL.revokeObjectURL(url);
    onClose();
  }
  function downloadFile() {
    let a = document.createElement("a");
    document.body.appendChild(a);
    a.href = url;
    a.download = name;
    a.click();
    document.body.removeChild(a);
  }
  function copyFile() {
    if (type == "text") {
      DiscordNative.clipboard.copy(new TextDecoder().decode(buff));
    } else {
      DiscordNative.clipboard.copyImage(new Uint8Array(buff), name);
    }
    BdApi.UI.showToast("Copied!", {
      type: "success"
    });
  }
  const ext = name.split(".").at(-1);
  const hasCode = highlightModule.hasLanguage(ext);
  return /* @__PURE__ */ BdApi.React.createElement("div", { className: "zp-preview", onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ BdApi.React.createElement("div", { className: "zp-preview-header" }, /* @__PURE__ */ BdApi.React.createElement("div", { className: "zp-preview-title" }, name), /* @__PURE__ */ BdApi.React.createElement(
    "div",
    {
      className: "zp-preview-close",
      onClick: close,
      dangerouslySetInnerHTML: { __html: close_default }
    }
  )), /* @__PURE__ */ BdApi.React.createElement("div", { className: "zp-preview-content-wrap" }, type == "text" || type == "image" ? /* @__PURE__ */ BdApi.React.createElement(
    "div",
    {
      className: "zp-preview-copy",
      onClick: copyFile,
      dangerouslySetInnerHTML: { __html: content_copy_default }
    }
  ) : null, /* @__PURE__ */ BdApi.React.createElement("div", { className: "zp-preview-content" }, type == "image" ? /* @__PURE__ */ BdApi.React.createElement("img", { src: url }) : null, type == "video" ? /* @__PURE__ */ BdApi.React.createElement("video", { autoPlay: true, controls: true, src: url }) : null, type == "audio" ? /* @__PURE__ */ BdApi.React.createElement("audio", { autoPlay: true, controls: true, src: url }) : null, type == "text" ? hasCode ? /* @__PURE__ */ BdApi.React.createElement("pre", { dangerouslySetInnerHTML: {
    __html: highlightModule.highlight(ext, new TextDecoder().decode(buff), true).value
  } }) : /* @__PURE__ */ BdApi.React.createElement("pre", null, new TextDecoder().decode(buff)) : null, type == "binary" ? /* @__PURE__ */ BdApi.React.createElement("div", null, "Can't preview this file :(", /* @__PURE__ */ BdApi.React.createElement("button", { className: "zp-preview-override", onClick: () => setType("text") }, "Do it anyways")) : null)), /* @__PURE__ */ BdApi.React.createElement("div", { className: "zp-preview-footer" }, type == "text" || type == "image" ? /* @__PURE__ */ BdApi.React.createElement(
    "button",
    {
      className: "icon",
      onClick: copyFile,
      dangerouslySetInnerHTML: { __html: content_copy_default }
    }
  ) : null, /* @__PURE__ */ BdApi.React.createElement(
    "button",
    {
      className: "icon",
      onClick: downloadFile,
      dangerouslySetInnerHTML: { __html: download_default }
    }
  ), /* @__PURE__ */ BdApi.React.createElement(
    "button",
    {
      onClick: close,
      className: "bd-button bd-button-filled bd-button-color-brand bd-button-medium"
    },
    "Close"
  )));
}

// plugins/ZipPreview/src/ZipPreview.tsx
var React2 = BdApi.React;
function ZipPreview({ url }) {
  const [expanded, setExpanded] = React2.useState(false);
  const [folderContents, setFolderContents] = React2.useState(null);
  let zipInfo = null;
  function toggleExpanded() {
    setExpanded(!expanded);
    if (expanded || zipInfo != null) return;
    BdApi.Net.fetch(url).then((res) => res.blob()).then((blob) => unzip(blob)).then((info) => {
      let contents = { folders: {}, files: {}, path: "/" };
      for (let filename in info.entries) {
        let file = info.entries[filename];
        if (file.isDirectory) continue;
        let path = filename.split("/");
        let current = contents;
        for (let i = 0; i < path.length - 1; i++) {
          if (!current.folders[path[i]]) {
            current.folders[path[i]] = {
              folders: {},
              files: {},
              path: current.path + path[i] + "/",
              parent: current
            };
          }
          current = current.folders[path[i]];
        }
        current.files[path[path.length - 1]] = file;
      }
      console.log("[ZipPreview] extracted zip", contents);
      setFolderContents(contents);
    });
  }
  async function openFile(name, file) {
    let [blob, buff] = await Promise.all([file.blob(), file.arrayBuffer()]);
    const ext = name.split(".").pop();
    const images = ["png", "jpg", "jpeg", "webp", "avif"];
    const videos = ["mp4", "webm", "mov", "avi", "mkv"];
    const audio = ["mp3", "wav", "ogg", "opus"];
    let type = "text";
    if (ext) {
      if (images.includes(ext)) type = "image";
      else if (videos.includes(ext)) type = "video";
      else if (audio.includes(ext)) type = "audio";
    }
    if (type == "text" && isBinaryFile(buff)) type = "binary";
    let id = ModalSystem.open((props) => /* @__PURE__ */ BdApi.React.createElement(Modal.Root, { size: "dynamic", ...props }, /* @__PURE__ */ BdApi.React.createElement(Modal.Content, { className: "zp-no-padding" }, /* @__PURE__ */ BdApi.React.createElement(
      FilePreview,
      {
        name,
        type,
        blob,
        buff,
        onClose: () => ModalSystem.close(id)
      }
    ))));
  }
  function formatSize(size) {
    if (size < 1024) return size + " B";
    if (size < 1024 * 1024) return (size / 1024).toFixed(2) + " KB";
    if (size < 1024 * 1024 * 1024) return (size / 1024 / 1024).toFixed(2) + " MB";
    return (size / 1024 / 1024 / 1024).toFixed(2) + " GB";
  }
  return /* @__PURE__ */ BdApi.React.createElement("div", null, /* @__PURE__ */ BdApi.React.createElement("div", { className: "zp-zip-preview " + (expanded ? "expanded" : "") }, folderContents ? [
    /* @__PURE__ */ BdApi.React.createElement("div", { className: "zp-path" }, /* @__PURE__ */ BdApi.React.createElement(
      "div",
      {
        dangerouslySetInnerHTML: { __html: folder_arrow_left_outline_default },
        className: "zp-folderReturn",
        onClick: () => {
          if (folderContents.parent) {
            setFolderContents(folderContents.parent);
          }
        }
      }
    ), /* @__PURE__ */ BdApi.React.createElement("div", null, folderContents.path)),
    Object.keys(folderContents.folders).map((name) => {
      return /* @__PURE__ */ BdApi.React.createElement(
        "div",
        {
          key: name,
          className: "zp-entry",
          onClick: () => {
            setFolderContents(folderContents.folders[name]);
          }
        },
        name,
        "/"
      );
    }),
    Object.entries(folderContents.files).map((parts) => {
      return /* @__PURE__ */ BdApi.React.createElement("div", { key: parts[0], onClick: () => openFile(parts[0], parts[1]) }, /* @__PURE__ */ BdApi.React.createElement("span", { className: "zp-entry" }, parts[0]), /* @__PURE__ */ BdApi.React.createElement("span", { className: "zp-filesize" }, "(", formatSize(parts[1].size), ")"));
    })
  ] : "Loading..."), /* @__PURE__ */ BdApi.React.createElement(
    "div",
    {
      className: "zp-dropdown-expander",
      dangerouslySetInnerHTML: { __html: expanded ? arrow_expand_up_default : arrow_expand_down_default },
      onClick: toggleExpanded
    }
  ));
}
var ZipPreview_default = React2.memo(ZipPreview);

// plugins/ZipPreview/src/index.ts
var previews = /* @__PURE__ */ new Map();
onSwitch(() => {
  previews.clear();
});
after(fileModule, "Z", ({ args, returnVal }) => {
  if (args[0].item?.contentType !== "application/zip") return;
  let url = args[0].url;
  let preview;
  if (!previews.has(url)) {
    preview = BdApi.React.createElement(ZipPreview_default, {
      url
    });
    previews.set(url, preview);
  } else {
    preview = previews.get(url);
  }
  preview = previews.get(url);
  const content = BdApi.React.createElement("div", {
    className: "zp-content"
  }, returnVal.props.children[0].props.children);
  const wrapDiv = BdApi.React.createElement("div", {
    className: "zp-wrap"
  }, [content, preview]);
  returnVal.props.children[0].props.style = { padding: 0 };
  returnVal.props.children[0].props.children = wrapDiv;
});
  }
}
