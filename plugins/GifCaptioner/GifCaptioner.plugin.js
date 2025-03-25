/**
 * @name GifCaptioner
 * @description A BetterDiscord plugin that allows you to add a caption to discord gifs
 * @version 0.4.1
 * @author TheLazySquid
 * @authorId 619261917352951815
 * @website https://github.com/TheLazySquid/BetterDiscordPlugins
 * @source https://github.com/TheLazySquid/BetterDiscordPlugins/tree/main/plugins/GifCaptioner/GifCaptioner.plugin.js
 */
module.exports = class {
  constructor() {
    let plugin = this;
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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

// node_modules/gif.js/dist/gif.js
var require_gif = __commonJS({
  "node_modules/gif.js/dist/gif.js"(exports, module) {
    (function(f) {
      if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = f();
      } else if (typeof define === "function" && define.amd) {
        define([], f);
      } else {
        var g;
        if (typeof window !== "undefined") {
          g = window;
        } else if (typeof global !== "undefined") {
          g = global;
        } else if (typeof self !== "undefined") {
          g = self;
        } else {
          g = this;
        }
        g.GIF = f();
      }
    })(function() {
      var define2, module2, exports2;
      return function e(t, n, r) {
        function s(o2, u) {
          if (!n[o2]) {
            if (!t[o2]) {
              var a = typeof __require == "function" && __require;
              if (!u && a) return a(o2, true);
              if (i) return i(o2, true);
              var f = new Error("Cannot find module '" + o2 + "'");
              throw f.code = "MODULE_NOT_FOUND", f;
            }
            var l = n[o2] = { exports: {} };
            t[o2][0].call(l.exports, function(e2) {
              var n2 = t[o2][1][e2];
              return s(n2 ? n2 : e2);
            }, l, l.exports, e, t, n, r);
          }
          return n[o2].exports;
        }
        var i = typeof __require == "function" && __require;
        for (var o = 0; o < r.length; o++) s(r[o]);
        return s;
      }({ 1: [function(require2, module3, exports3) {
        function EventEmitter() {
          this._events = this._events || {};
          this._maxListeners = this._maxListeners || void 0;
        }
        module3.exports = EventEmitter;
        EventEmitter.EventEmitter = EventEmitter;
        EventEmitter.prototype._events = void 0;
        EventEmitter.prototype._maxListeners = void 0;
        EventEmitter.defaultMaxListeners = 10;
        EventEmitter.prototype.setMaxListeners = function(n) {
          if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError("n must be a positive number");
          this._maxListeners = n;
          return this;
        };
        EventEmitter.prototype.emit = function(type) {
          var er, handler, len, args, i, listeners;
          if (!this._events) this._events = {};
          if (type === "error") {
            if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
              er = arguments[1];
              if (er instanceof Error) {
                throw er;
              } else {
                var err = new Error('Uncaught, unspecified "error" event. (' + er + ")");
                err.context = er;
                throw err;
              }
            }
          }
          handler = this._events[type];
          if (isUndefined(handler)) return false;
          if (isFunction(handler)) {
            switch (arguments.length) {
              case 1:
                handler.call(this);
                break;
              case 2:
                handler.call(this, arguments[1]);
                break;
              case 3:
                handler.call(this, arguments[1], arguments[2]);
                break;
              default:
                args = Array.prototype.slice.call(arguments, 1);
                handler.apply(this, args);
            }
          } else if (isObject(handler)) {
            args = Array.prototype.slice.call(arguments, 1);
            listeners = handler.slice();
            len = listeners.length;
            for (i = 0; i < len; i++) listeners[i].apply(this, args);
          }
          return true;
        };
        EventEmitter.prototype.addListener = function(type, listener) {
          var m;
          if (!isFunction(listener)) throw TypeError("listener must be a function");
          if (!this._events) this._events = {};
          if (this._events.newListener) this.emit("newListener", type, isFunction(listener.listener) ? listener.listener : listener);
          if (!this._events[type]) this._events[type] = listener;
          else if (isObject(this._events[type])) this._events[type].push(listener);
          else this._events[type] = [this._events[type], listener];
          if (isObject(this._events[type]) && !this._events[type].warned) {
            if (!isUndefined(this._maxListeners)) {
              m = this._maxListeners;
            } else {
              m = EventEmitter.defaultMaxListeners;
            }
            if (m && m > 0 && this._events[type].length > m) {
              this._events[type].warned = true;
              console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[type].length);
              if (typeof console.trace === "function") {
                console.trace();
              }
            }
          }
          return this;
        };
        EventEmitter.prototype.on = EventEmitter.prototype.addListener;
        EventEmitter.prototype.once = function(type, listener) {
          if (!isFunction(listener)) throw TypeError("listener must be a function");
          var fired = false;
          function g() {
            this.removeListener(type, g);
            if (!fired) {
              fired = true;
              listener.apply(this, arguments);
            }
          }
          g.listener = listener;
          this.on(type, g);
          return this;
        };
        EventEmitter.prototype.removeListener = function(type, listener) {
          var list, position, length, i;
          if (!isFunction(listener)) throw TypeError("listener must be a function");
          if (!this._events || !this._events[type]) return this;
          list = this._events[type];
          length = list.length;
          position = -1;
          if (list === listener || isFunction(list.listener) && list.listener === listener) {
            delete this._events[type];
            if (this._events.removeListener) this.emit("removeListener", type, listener);
          } else if (isObject(list)) {
            for (i = length; i-- > 0; ) {
              if (list[i] === listener || list[i].listener && list[i].listener === listener) {
                position = i;
                break;
              }
            }
            if (position < 0) return this;
            if (list.length === 1) {
              list.length = 0;
              delete this._events[type];
            } else {
              list.splice(position, 1);
            }
            if (this._events.removeListener) this.emit("removeListener", type, listener);
          }
          return this;
        };
        EventEmitter.prototype.removeAllListeners = function(type) {
          var key, listeners;
          if (!this._events) return this;
          if (!this._events.removeListener) {
            if (arguments.length === 0) this._events = {};
            else if (this._events[type]) delete this._events[type];
            return this;
          }
          if (arguments.length === 0) {
            for (key in this._events) {
              if (key === "removeListener") continue;
              this.removeAllListeners(key);
            }
            this.removeAllListeners("removeListener");
            this._events = {};
            return this;
          }
          listeners = this._events[type];
          if (isFunction(listeners)) {
            this.removeListener(type, listeners);
          } else if (listeners) {
            while (listeners.length) this.removeListener(type, listeners[listeners.length - 1]);
          }
          delete this._events[type];
          return this;
        };
        EventEmitter.prototype.listeners = function(type) {
          var ret;
          if (!this._events || !this._events[type]) ret = [];
          else if (isFunction(this._events[type])) ret = [this._events[type]];
          else ret = this._events[type].slice();
          return ret;
        };
        EventEmitter.prototype.listenerCount = function(type) {
          if (this._events) {
            var evlistener = this._events[type];
            if (isFunction(evlistener)) return 1;
            else if (evlistener) return evlistener.length;
          }
          return 0;
        };
        EventEmitter.listenerCount = function(emitter, type) {
          return emitter.listenerCount(type);
        };
        function isFunction(arg) {
          return typeof arg === "function";
        }
        function isNumber(arg) {
          return typeof arg === "number";
        }
        function isObject(arg) {
          return typeof arg === "object" && arg !== null;
        }
        function isUndefined(arg) {
          return arg === void 0;
        }
      }, {}], 2: [function(require2, module3, exports3) {
        var UA, browser, mode, platform, ua;
        ua = navigator.userAgent.toLowerCase();
        platform = navigator.platform.toLowerCase();
        UA = ua.match(/(opera|ie|firefox|chrome|version)[\s\/:]([\w\d\.]+)?.*?(safari|version[\s\/:]([\w\d\.]+)|$)/) || [null, "unknown", 0];
        mode = UA[1] === "ie" && document.documentMode;
        browser = { name: UA[1] === "version" ? UA[3] : UA[1], version: mode || parseFloat(UA[1] === "opera" && UA[4] ? UA[4] : UA[2]), platform: { name: ua.match(/ip(?:ad|od|hone)/) ? "ios" : (ua.match(/(?:webos|android)/) || platform.match(/mac|win|linux/) || ["other"])[0] } };
        browser[browser.name] = true;
        browser[browser.name + parseInt(browser.version, 10)] = true;
        browser.platform[browser.platform.name] = true;
        module3.exports = browser;
      }, {}], 3: [function(require2, module3, exports3) {
        var EventEmitter, GIF2, browser, extend = function(child, parent) {
          for (var key in parent) {
            if (hasProp.call(parent, key)) child[key] = parent[key];
          }
          function ctor() {
            this.constructor = child;
          }
          ctor.prototype = parent.prototype;
          child.prototype = new ctor();
          child.__super__ = parent.prototype;
          return child;
        }, hasProp = {}.hasOwnProperty, indexOf = [].indexOf || function(item) {
          for (var i = 0, l = this.length; i < l; i++) {
            if (i in this && this[i] === item) return i;
          }
          return -1;
        }, slice = [].slice;
        EventEmitter = require2("events").EventEmitter;
        browser = require2("./browser.coffee");
        GIF2 = function(superClass) {
          var defaults, frameDefaults;
          extend(GIF3, superClass);
          defaults = { workerScript: "gif.worker.js", workers: 2, repeat: 0, background: "#fff", quality: 10, width: null, height: null, transparent: null, debug: false, dither: false };
          frameDefaults = { delay: 500, copy: false };
          function GIF3(options) {
            var base, key, value;
            this.running = false;
            this.options = {};
            this.frames = [];
            this.freeWorkers = [];
            this.activeWorkers = [];
            this.setOptions(options);
            for (key in defaults) {
              value = defaults[key];
              if ((base = this.options)[key] == null) {
                base[key] = value;
              }
            }
          }
          GIF3.prototype.setOption = function(key, value) {
            this.options[key] = value;
            if (this._canvas != null && (key === "width" || key === "height")) {
              return this._canvas[key] = value;
            }
          };
          GIF3.prototype.setOptions = function(options) {
            var key, results, value;
            results = [];
            for (key in options) {
              if (!hasProp.call(options, key)) continue;
              value = options[key];
              results.push(this.setOption(key, value));
            }
            return results;
          };
          GIF3.prototype.addFrame = function(image, options) {
            var frame, key;
            if (options == null) {
              options = {};
            }
            frame = {};
            frame.transparent = this.options.transparent;
            for (key in frameDefaults) {
              frame[key] = options[key] || frameDefaults[key];
            }
            if (this.options.width == null) {
              this.setOption("width", image.width);
            }
            if (this.options.height == null) {
              this.setOption("height", image.height);
            }
            if (typeof ImageData !== "undefined" && ImageData !== null && image instanceof ImageData) {
              frame.data = image.data;
            } else if (typeof CanvasRenderingContext2D !== "undefined" && CanvasRenderingContext2D !== null && image instanceof CanvasRenderingContext2D || typeof WebGLRenderingContext !== "undefined" && WebGLRenderingContext !== null && image instanceof WebGLRenderingContext) {
              if (options.copy) {
                frame.data = this.getContextData(image);
              } else {
                frame.context = image;
              }
            } else if (image.childNodes != null) {
              if (options.copy) {
                frame.data = this.getImageData(image);
              } else {
                frame.image = image;
              }
            } else {
              throw new Error("Invalid image");
            }
            return this.frames.push(frame);
          };
          GIF3.prototype.render = function() {
            var i, j, numWorkers, ref;
            if (this.running) {
              throw new Error("Already running");
            }
            if (this.options.width == null || this.options.height == null) {
              throw new Error("Width and height must be set prior to rendering");
            }
            this.running = true;
            this.nextFrame = 0;
            this.finishedFrames = 0;
            this.imageParts = function() {
              var j2, ref2, results;
              results = [];
              for (i = j2 = 0, ref2 = this.frames.length; 0 <= ref2 ? j2 < ref2 : j2 > ref2; i = 0 <= ref2 ? ++j2 : --j2) {
                results.push(null);
              }
              return results;
            }.call(this);
            numWorkers = this.spawnWorkers();
            if (this.options.globalPalette === true) {
              this.renderNextFrame();
            } else {
              for (i = j = 0, ref = numWorkers; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
                this.renderNextFrame();
              }
            }
            this.emit("start");
            return this.emit("progress", 0);
          };
          GIF3.prototype.abort = function() {
            var worker;
            while (true) {
              worker = this.activeWorkers.shift();
              if (worker == null) {
                break;
              }
              this.log("killing active worker");
              worker.terminate();
            }
            this.running = false;
            return this.emit("abort");
          };
          GIF3.prototype.spawnWorkers = function() {
            var j, numWorkers, ref, results;
            numWorkers = Math.min(this.options.workers, this.frames.length);
            (function() {
              results = [];
              for (var j2 = ref = this.freeWorkers.length; ref <= numWorkers ? j2 < numWorkers : j2 > numWorkers; ref <= numWorkers ? j2++ : j2--) {
                results.push(j2);
              }
              return results;
            }).apply(this).forEach(/* @__PURE__ */ function(_this) {
              return function(i) {
                var worker;
                _this.log("spawning worker " + i);
                worker = new Worker(_this.options.workerScript);
                worker.onmessage = function(event) {
                  _this.activeWorkers.splice(_this.activeWorkers.indexOf(worker), 1);
                  _this.freeWorkers.push(worker);
                  return _this.frameFinished(event.data);
                };
                return _this.freeWorkers.push(worker);
              };
            }(this));
            return numWorkers;
          };
          GIF3.prototype.frameFinished = function(frame) {
            var i, j, ref;
            this.log("frame " + frame.index + " finished - " + this.activeWorkers.length + " active");
            this.finishedFrames++;
            this.emit("progress", this.finishedFrames / this.frames.length);
            this.imageParts[frame.index] = frame;
            if (this.options.globalPalette === true) {
              this.options.globalPalette = frame.globalPalette;
              this.log("global palette analyzed");
              if (this.frames.length > 2) {
                for (i = j = 1, ref = this.freeWorkers.length; 1 <= ref ? j < ref : j > ref; i = 1 <= ref ? ++j : --j) {
                  this.renderNextFrame();
                }
              }
            }
            if (indexOf.call(this.imageParts, null) >= 0) {
              return this.renderNextFrame();
            } else {
              return this.finishRendering();
            }
          };
          GIF3.prototype.finishRendering = function() {
            var data, frame, i, image, j, k, l, len, len1, len2, len3, offset, page, ref, ref1, ref2;
            len = 0;
            ref = this.imageParts;
            for (j = 0, len1 = ref.length; j < len1; j++) {
              frame = ref[j];
              len += (frame.data.length - 1) * frame.pageSize + frame.cursor;
            }
            len += frame.pageSize - frame.cursor;
            this.log("rendering finished - filesize " + Math.round(len / 1e3) + "kb");
            data = new Uint8Array(len);
            offset = 0;
            ref1 = this.imageParts;
            for (k = 0, len2 = ref1.length; k < len2; k++) {
              frame = ref1[k];
              ref2 = frame.data;
              for (i = l = 0, len3 = ref2.length; l < len3; i = ++l) {
                page = ref2[i];
                data.set(page, offset);
                if (i === frame.data.length - 1) {
                  offset += frame.cursor;
                } else {
                  offset += frame.pageSize;
                }
              }
            }
            image = new Blob([data], { type: "image/gif" });
            return this.emit("finished", image, data);
          };
          GIF3.prototype.renderNextFrame = function() {
            var frame, task, worker;
            if (this.freeWorkers.length === 0) {
              throw new Error("No free workers");
            }
            if (this.nextFrame >= this.frames.length) {
              return;
            }
            frame = this.frames[this.nextFrame++];
            worker = this.freeWorkers.shift();
            task = this.getTask(frame);
            this.log("starting frame " + (task.index + 1) + " of " + this.frames.length);
            this.activeWorkers.push(worker);
            return worker.postMessage(task);
          };
          GIF3.prototype.getContextData = function(ctx) {
            return ctx.getImageData(0, 0, this.options.width, this.options.height).data;
          };
          GIF3.prototype.getImageData = function(image) {
            var ctx;
            if (this._canvas == null) {
              this._canvas = document.createElement("canvas");
              this._canvas.width = this.options.width;
              this._canvas.height = this.options.height;
            }
            ctx = this._canvas.getContext("2d");
            ctx.setFill = this.options.background;
            ctx.fillRect(0, 0, this.options.width, this.options.height);
            ctx.drawImage(image, 0, 0);
            return this.getContextData(ctx);
          };
          GIF3.prototype.getTask = function(frame) {
            var index, task;
            index = this.frames.indexOf(frame);
            task = { index, last: index === this.frames.length - 1, delay: frame.delay, transparent: frame.transparent, width: this.options.width, height: this.options.height, quality: this.options.quality, dither: this.options.dither, globalPalette: this.options.globalPalette, repeat: this.options.repeat, canTransfer: browser.name === "chrome" };
            if (frame.data != null) {
              task.data = frame.data;
            } else if (frame.context != null) {
              task.data = this.getContextData(frame.context);
            } else if (frame.image != null) {
              task.data = this.getImageData(frame.image);
            } else {
              throw new Error("Invalid frame");
            }
            return task;
          };
          GIF3.prototype.log = function() {
            var args;
            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            if (!this.options.debug) {
              return;
            }
            return console.log.apply(console, args);
          };
          return GIF3;
        }(EventEmitter);
        module3.exports = GIF2;
      }, { "./browser.coffee": 2, events: 1 }] }, {}, [3])(3);
    });
  }
});

// node_modules/js-binary-schema-parser/lib/index.js
var require_lib = __commonJS({
  "node_modules/js-binary-schema-parser/lib/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.loop = exports.conditional = exports.parse = void 0;
    var parse = function parse2(stream, schema) {
      var result = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      var parent = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : result;
      if (Array.isArray(schema)) {
        schema.forEach(function(partSchema) {
          return parse2(stream, partSchema, result, parent);
        });
      } else if (typeof schema === "function") {
        schema(stream, result, parent, parse2);
      } else {
        var key = Object.keys(schema)[0];
        if (Array.isArray(schema[key])) {
          parent[key] = {};
          parse2(stream, schema[key], result, parent[key]);
        } else {
          parent[key] = schema[key](stream, result, parent, parse2);
        }
      }
      return result;
    };
    exports.parse = parse;
    var conditional = function conditional2(schema, conditionFunc) {
      return function(stream, result, parent, parse2) {
        if (conditionFunc(stream, result, parent)) {
          parse2(stream, schema, result, parent);
        }
      };
    };
    exports.conditional = conditional;
    var loop = function loop2(schema, continueFunc) {
      return function(stream, result, parent, parse2) {
        var arr = [];
        var lastStreamPos = stream.pos;
        while (continueFunc(stream, result, parent)) {
          var newParent = {};
          parse2(stream, schema, result, newParent);
          if (stream.pos === lastStreamPos) {
            break;
          }
          lastStreamPos = stream.pos;
          arr.push(newParent);
        }
        return arr;
      };
    };
    exports.loop = loop;
  }
});

// node_modules/js-binary-schema-parser/lib/parsers/uint8.js
var require_uint8 = __commonJS({
  "node_modules/js-binary-schema-parser/lib/parsers/uint8.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.readBits = exports.readArray = exports.readUnsigned = exports.readString = exports.peekBytes = exports.readBytes = exports.peekByte = exports.readByte = exports.buildStream = void 0;
    var buildStream = function buildStream2(uint8Data) {
      return {
        data: uint8Data,
        pos: 0
      };
    };
    exports.buildStream = buildStream;
    var readByte = function readByte2() {
      return function(stream) {
        return stream.data[stream.pos++];
      };
    };
    exports.readByte = readByte;
    var peekByte = function peekByte2() {
      var offset = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
      return function(stream) {
        return stream.data[stream.pos + offset];
      };
    };
    exports.peekByte = peekByte;
    var readBytes = function readBytes2(length) {
      return function(stream) {
        return stream.data.subarray(stream.pos, stream.pos += length);
      };
    };
    exports.readBytes = readBytes;
    var peekBytes = function peekBytes2(length) {
      return function(stream) {
        return stream.data.subarray(stream.pos, stream.pos + length);
      };
    };
    exports.peekBytes = peekBytes;
    var readString = function readString2(length) {
      return function(stream) {
        return Array.from(readBytes(length)(stream)).map(function(value) {
          return String.fromCharCode(value);
        }).join("");
      };
    };
    exports.readString = readString;
    var readUnsigned = function readUnsigned2(littleEndian) {
      return function(stream) {
        var bytes = readBytes(2)(stream);
        return littleEndian ? (bytes[1] << 8) + bytes[0] : (bytes[0] << 8) + bytes[1];
      };
    };
    exports.readUnsigned = readUnsigned;
    var readArray = function readArray2(byteSize, totalOrFunc) {
      return function(stream, result, parent) {
        var total = typeof totalOrFunc === "function" ? totalOrFunc(stream, result, parent) : totalOrFunc;
        var parser = readBytes(byteSize);
        var arr = new Array(total);
        for (var i = 0; i < total; i++) {
          arr[i] = parser(stream);
        }
        return arr;
      };
    };
    exports.readArray = readArray;
    var subBitsTotal = function subBitsTotal2(bits, startIndex, length) {
      var result = 0;
      for (var i = 0; i < length; i++) {
        result += bits[startIndex + i] && Math.pow(2, length - i - 1);
      }
      return result;
    };
    var readBits = function readBits2(schema) {
      return function(stream) {
        var _byte = readByte()(stream);
        var bits = new Array(8);
        for (var i = 0; i < 8; i++) {
          bits[7 - i] = !!(_byte & 1 << i);
        }
        return Object.keys(schema).reduce(function(res, key) {
          var def = schema[key];
          if (def.length) {
            res[key] = subBitsTotal(bits, def.index, def.length);
          } else {
            res[key] = bits[def.index];
          }
          return res;
        }, {});
      };
    };
    exports.readBits = readBits;
  }
});

// node_modules/js-binary-schema-parser/lib/schemas/gif.js
var require_gif2 = __commonJS({
  "node_modules/js-binary-schema-parser/lib/schemas/gif.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    var _ = require_lib();
    var _uint = require_uint8();
    var subBlocksSchema = {
      blocks: function blocks(stream) {
        var terminator = 0;
        var chunks = [];
        var streamSize = stream.data.length;
        var total = 0;
        for (var size = (0, _uint.readByte)()(stream); size !== terminator; size = (0, _uint.readByte)()(stream)) {
          if (!size) break;
          if (stream.pos + size >= streamSize) {
            var availableSize = streamSize - stream.pos;
            chunks.push((0, _uint.readBytes)(availableSize)(stream));
            total += availableSize;
            break;
          }
          chunks.push((0, _uint.readBytes)(size)(stream));
          total += size;
        }
        var result = new Uint8Array(total);
        var offset = 0;
        for (var i = 0; i < chunks.length; i++) {
          result.set(chunks[i], offset);
          offset += chunks[i].length;
        }
        return result;
      }
    };
    var gceSchema = (0, _.conditional)({
      gce: [{
        codes: (0, _uint.readBytes)(2)
      }, {
        byteSize: (0, _uint.readByte)()
      }, {
        extras: (0, _uint.readBits)({
          future: {
            index: 0,
            length: 3
          },
          disposal: {
            index: 3,
            length: 3
          },
          userInput: {
            index: 6
          },
          transparentColorGiven: {
            index: 7
          }
        })
      }, {
        delay: (0, _uint.readUnsigned)(true)
      }, {
        transparentColorIndex: (0, _uint.readByte)()
      }, {
        terminator: (0, _uint.readByte)()
      }]
    }, function(stream) {
      var codes = (0, _uint.peekBytes)(2)(stream);
      return codes[0] === 33 && codes[1] === 249;
    });
    var imageSchema = (0, _.conditional)({
      image: [{
        code: (0, _uint.readByte)()
      }, {
        descriptor: [{
          left: (0, _uint.readUnsigned)(true)
        }, {
          top: (0, _uint.readUnsigned)(true)
        }, {
          width: (0, _uint.readUnsigned)(true)
        }, {
          height: (0, _uint.readUnsigned)(true)
        }, {
          lct: (0, _uint.readBits)({
            exists: {
              index: 0
            },
            interlaced: {
              index: 1
            },
            sort: {
              index: 2
            },
            future: {
              index: 3,
              length: 2
            },
            size: {
              index: 5,
              length: 3
            }
          })
        }]
      }, (0, _.conditional)({
        lct: (0, _uint.readArray)(3, function(stream, result, parent) {
          return Math.pow(2, parent.descriptor.lct.size + 1);
        })
      }, function(stream, result, parent) {
        return parent.descriptor.lct.exists;
      }), {
        data: [{
          minCodeSize: (0, _uint.readByte)()
        }, subBlocksSchema]
      }]
    }, function(stream) {
      return (0, _uint.peekByte)()(stream) === 44;
    });
    var textSchema = (0, _.conditional)({
      text: [{
        codes: (0, _uint.readBytes)(2)
      }, {
        blockSize: (0, _uint.readByte)()
      }, {
        preData: function preData(stream, result, parent) {
          return (0, _uint.readBytes)(parent.text.blockSize)(stream);
        }
      }, subBlocksSchema]
    }, function(stream) {
      var codes = (0, _uint.peekBytes)(2)(stream);
      return codes[0] === 33 && codes[1] === 1;
    });
    var applicationSchema = (0, _.conditional)({
      application: [{
        codes: (0, _uint.readBytes)(2)
      }, {
        blockSize: (0, _uint.readByte)()
      }, {
        id: function id(stream, result, parent) {
          return (0, _uint.readString)(parent.blockSize)(stream);
        }
      }, subBlocksSchema]
    }, function(stream) {
      var codes = (0, _uint.peekBytes)(2)(stream);
      return codes[0] === 33 && codes[1] === 255;
    });
    var commentSchema = (0, _.conditional)({
      comment: [{
        codes: (0, _uint.readBytes)(2)
      }, subBlocksSchema]
    }, function(stream) {
      var codes = (0, _uint.peekBytes)(2)(stream);
      return codes[0] === 33 && codes[1] === 254;
    });
    var schema = [
      {
        header: [{
          signature: (0, _uint.readString)(3)
        }, {
          version: (0, _uint.readString)(3)
        }]
      },
      {
        lsd: [{
          width: (0, _uint.readUnsigned)(true)
        }, {
          height: (0, _uint.readUnsigned)(true)
        }, {
          gct: (0, _uint.readBits)({
            exists: {
              index: 0
            },
            resolution: {
              index: 1,
              length: 3
            },
            sort: {
              index: 4
            },
            size: {
              index: 5,
              length: 3
            }
          })
        }, {
          backgroundColorIndex: (0, _uint.readByte)()
        }, {
          pixelAspectRatio: (0, _uint.readByte)()
        }]
      },
      (0, _.conditional)({
        gct: (0, _uint.readArray)(3, function(stream, result) {
          return Math.pow(2, result.lsd.gct.size + 1);
        })
      }, function(stream, result) {
        return result.lsd.gct.exists;
      }),
      // content frames
      {
        frames: (0, _.loop)([gceSchema, applicationSchema, commentSchema, imageSchema, textSchema], function(stream) {
          var nextCode = (0, _uint.peekByte)()(stream);
          return nextCode === 33 || nextCode === 44;
        })
      }
    ];
    var _default = schema;
    exports["default"] = _default;
  }
});

// node_modules/gifuct-js/lib/deinterlace.js
var require_deinterlace = __commonJS({
  "node_modules/gifuct-js/lib/deinterlace.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.deinterlace = void 0;
    var deinterlace = function deinterlace2(pixels, width) {
      var newPixels = new Array(pixels.length);
      var rows = pixels.length / width;
      var cpRow = function cpRow2(toRow2, fromRow2) {
        var fromPixels = pixels.slice(fromRow2 * width, (fromRow2 + 1) * width);
        newPixels.splice.apply(newPixels, [toRow2 * width, width].concat(fromPixels));
      };
      var offsets = [0, 4, 2, 1];
      var steps = [8, 8, 4, 2];
      var fromRow = 0;
      for (var pass = 0; pass < 4; pass++) {
        for (var toRow = offsets[pass]; toRow < rows; toRow += steps[pass]) {
          cpRow(toRow, fromRow);
          fromRow++;
        }
      }
      return newPixels;
    };
    exports.deinterlace = deinterlace;
  }
});

// node_modules/gifuct-js/lib/lzw.js
var require_lzw = __commonJS({
  "node_modules/gifuct-js/lib/lzw.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.lzw = void 0;
    var lzw = function lzw2(minCodeSize, data, pixelCount) {
      var MAX_STACK_SIZE = 4096;
      var nullCode = -1;
      var npix = pixelCount;
      var available, clear, code_mask, code_size, end_of_information, in_code, old_code, bits, code, i, datum, data_size, first, top, bi, pi;
      var dstPixels = new Array(pixelCount);
      var prefix = new Array(MAX_STACK_SIZE);
      var suffix = new Array(MAX_STACK_SIZE);
      var pixelStack = new Array(MAX_STACK_SIZE + 1);
      data_size = minCodeSize;
      clear = 1 << data_size;
      end_of_information = clear + 1;
      available = clear + 2;
      old_code = nullCode;
      code_size = data_size + 1;
      code_mask = (1 << code_size) - 1;
      for (code = 0; code < clear; code++) {
        prefix[code] = 0;
        suffix[code] = code;
      }
      var datum, bits, count, first, top, pi, bi;
      datum = bits = count = first = top = pi = bi = 0;
      for (i = 0; i < npix; ) {
        if (top === 0) {
          if (bits < code_size) {
            datum += data[bi] << bits;
            bits += 8;
            bi++;
            continue;
          }
          code = datum & code_mask;
          datum >>= code_size;
          bits -= code_size;
          if (code > available || code == end_of_information) {
            break;
          }
          if (code == clear) {
            code_size = data_size + 1;
            code_mask = (1 << code_size) - 1;
            available = clear + 2;
            old_code = nullCode;
            continue;
          }
          if (old_code == nullCode) {
            pixelStack[top++] = suffix[code];
            old_code = code;
            first = code;
            continue;
          }
          in_code = code;
          if (code == available) {
            pixelStack[top++] = first;
            code = old_code;
          }
          while (code > clear) {
            pixelStack[top++] = suffix[code];
            code = prefix[code];
          }
          first = suffix[code] & 255;
          pixelStack[top++] = first;
          if (available < MAX_STACK_SIZE) {
            prefix[available] = old_code;
            suffix[available] = first;
            available++;
            if ((available & code_mask) === 0 && available < MAX_STACK_SIZE) {
              code_size++;
              code_mask += available;
            }
          }
          old_code = in_code;
        }
        top--;
        dstPixels[pi++] = pixelStack[top];
        i++;
      }
      for (i = pi; i < npix; i++) {
        dstPixels[i] = 0;
      }
      return dstPixels;
    };
    exports.lzw = lzw;
  }
});

// node_modules/gifuct-js/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/gifuct-js/lib/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.decompressFrames = exports.decompressFrame = exports.parseGIF = void 0;
    var _gif = _interopRequireDefault(require_gif2());
    var _jsBinarySchemaParser = require_lib();
    var _uint = require_uint8();
    var _deinterlace = require_deinterlace();
    var _lzw = require_lzw();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var parseGIF2 = function parseGIF3(arrayBuffer) {
      var byteData = new Uint8Array(arrayBuffer);
      return (0, _jsBinarySchemaParser.parse)((0, _uint.buildStream)(byteData), _gif["default"]);
    };
    exports.parseGIF = parseGIF2;
    var generatePatch = function generatePatch2(image) {
      var totalPixels = image.pixels.length;
      var patchData = new Uint8ClampedArray(totalPixels * 4);
      for (var i = 0; i < totalPixels; i++) {
        var pos = i * 4;
        var colorIndex = image.pixels[i];
        var color = image.colorTable[colorIndex] || [0, 0, 0];
        patchData[pos] = color[0];
        patchData[pos + 1] = color[1];
        patchData[pos + 2] = color[2];
        patchData[pos + 3] = colorIndex !== image.transparentIndex ? 255 : 0;
      }
      return patchData;
    };
    var decompressFrame = function decompressFrame2(frame, gct, buildImagePatch) {
      if (!frame.image) {
        console.warn("gif frame does not have associated image.");
        return;
      }
      var image = frame.image;
      var totalPixels = image.descriptor.width * image.descriptor.height;
      var pixels = (0, _lzw.lzw)(image.data.minCodeSize, image.data.blocks, totalPixels);
      if (image.descriptor.lct.interlaced) {
        pixels = (0, _deinterlace.deinterlace)(pixels, image.descriptor.width);
      }
      var resultImage = {
        pixels,
        dims: {
          top: frame.image.descriptor.top,
          left: frame.image.descriptor.left,
          width: frame.image.descriptor.width,
          height: frame.image.descriptor.height
        }
      };
      if (image.descriptor.lct && image.descriptor.lct.exists) {
        resultImage.colorTable = image.lct;
      } else {
        resultImage.colorTable = gct;
      }
      if (frame.gce) {
        resultImage.delay = (frame.gce.delay || 10) * 10;
        resultImage.disposalType = frame.gce.extras.disposal;
        if (frame.gce.extras.transparentColorGiven) {
          resultImage.transparentIndex = frame.gce.transparentColorIndex;
        }
      }
      if (buildImagePatch) {
        resultImage.patch = generatePatch(resultImage);
      }
      return resultImage;
    };
    exports.decompressFrame = decompressFrame;
    var decompressFrames2 = function decompressFrames3(parsedGif, buildImagePatches) {
      return parsedGif.frames.filter(function(f) {
        return f.image;
      }).map(function(f) {
        return decompressFrame(f, parsedGif.gct, buildImagePatches);
      });
    };
    exports.decompressFrames = decompressFrames2;
  }
});

// plugins/GifCaptioner/src/index.ts
var import_gif = __toESM(require_gif(), 1);

// assets/Futura Condensed Extra Bold.otf
var Futura_Condensed_Extra_Bold_default = __toBinary("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");

// assets/page-layout-header.svg
var page_layout_header_default = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30"><rect x="5" y="5" width="14" height="10" fill="white"></rect><path d="M18,11H16.5V10.5H14.5V13.5H16.5V13H18V14A1,1 0 0,1 17,15H14A1,1 0 0,1 13,14V10A1,1 0 0,1 14,9H17A1,1 0 0,1 18,10M11,11H9.5V10.5H7.5V13.5H9.5V13H11V14A1,1 0 0,1 10,15H7A1,1 0 0,1 6,14V10A1,1 0 0,1 7,9H10A1,1 0 0,1 11,10M19,4H5C3.89,4 3,4.89 3,6V18A2,2 0 0,0 5,20H19A2,2 0 0,0 21,18V6C21,4.89 20.1,4 19,4Z" /></svg>';

// plugins/GifCaptioner/src/styles.css
var styles_default = "#progressDialog {\r\n    width: 100vw;\r\n    height: 100vh;\r\n    background-color: rgba(0, 0, 0, 0.5);\r\n    text-align: center;\r\n    color: white;\r\n    font-size: 80px;\r\n    outline: none;\r\n    border: none;\r\n}\r\n\r\n#cancelRender {\r\n    background-color: red;\r\n    border-radius: 9999px;\r\n    font-size: 30px;\r\n    padding: 10px;\r\n    padding-left: 35px;\r\n    padding-right: 35px;\r\n}\r\n\r\n.gif-captioner-btn {\r\n    position: absolute;\r\n    z-index: 4;\r\n    top: 0px;\r\n    left: 0px;\r\n    background-color: transparent;\r\n    border: none;\r\n    outline: none;\r\n    color: white;\r\n    padding: 0px;\r\n}\r\n\r\n.caption-creator {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    width: 100%;\r\n    color: white;\r\n}\r\n\r\n.settings {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    width: 100%;\r\n    margin-bottom: 20px;\r\n}\r\n\r\n.caption-input {\r\n    flex-grow: 1;\r\n    margin-right: 10px;\r\n}\r\n\r\n.font-size-slider {\r\n    width: 100px;\r\n}\r\n\r\n.caption-canvas {\r\n    border: 1px solid #000;\r\n    width: 100%;\r\n    border: none;\r\n    outline: none;\r\n}\r\n\r\n.caption-preview {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    width: 100%;\r\n    border: 2px solid black;\r\n}\r\n\r\n.caption-gif {\r\n    width: 100%;\r\n}";

// plugins/GifCaptioner/src/util.ts
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

// plugins/GifCaptioner/src/captionCreator.jsx
function CaptionCreator({ src, width, onUpdate, isVideo }) {
  const React = BdApi.React;
  const { useState, useEffect, useRef } = React;
  const padding = 10;
  const [caption, setCaption] = useState("");
  const [fontSize, setFontSize] = useState(35);
  const canvasRef = useRef(null);
  function rerender() {
    onUpdate(caption, fontSize);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.font = `${fontSize}px futuraBoldCondensed`;
    const lines = getLines(ctx, caption, width);
    canvas.height = lines.length * fontSize + padding * 2;
    ctx.font = `${fontSize}px futuraBoldCondensed`;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    for (let line = 0; line < lines.length; line++) {
      ctx.fillText(lines[line], width / 2, line * fontSize + padding);
    }
  }
  useEffect(rerender, [caption, fontSize]);
  return /* @__PURE__ */ BdApi.React.createElement("div", { className: "caption-creator" }, /* @__PURE__ */ BdApi.React.createElement("div", { className: "settings" }, /* @__PURE__ */ BdApi.React.createElement(
    "input",
    {
      className: "caption-input",
      type: "text",
      placeholder: "Caption",
      onChange: (e) => setCaption(e.target.value)
    }
  ), /* @__PURE__ */ BdApi.React.createElement("label", { htmlFor: "font-size-slider" }, "Font Size"), /* @__PURE__ */ BdApi.React.createElement(
    "input",
    {
      id: "font-size-slider",
      className: "font-size-slider",
      type: "range",
      min: "5",
      max: "100",
      defaultValue: "35",
      onChange: (e) => setFontSize(e.target.value)
    }
  )), /* @__PURE__ */ BdApi.React.createElement("div", { className: "caption-preview" }, /* @__PURE__ */ BdApi.React.createElement("canvas", { className: "caption-canvas", ref: canvasRef, width, height: padding * 2 }), isVideo ? /* @__PURE__ */ BdApi.React.createElement("video", { className: "caption-gif", src, loop: true, muted: true, autoPlay: true }) : /* @__PURE__ */ BdApi.React.createElement("img", { className: "caption-gif", src })));
}

// shared/bdFuncs.ts
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

// shared/dom.ts
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

// plugins/GifCaptioner/src/index.ts
var import_gifuct_js = __toESM(require_lib2(), 1);

// plugins/GifCaptioner/src/gif.worker.txt
var gif_worker_default = `// gif.worker.js 0.2.0-wasm - https://github.com/jnordberg/gif.js\r
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){"use strict";exports.byteLength=byteLength;exports.toByteArray=toByteArray;exports.fromByteArray=fromByteArray;var lookup=[];var revLookup=[];var Arr=typeof Uint8Array!=="undefined"?Uint8Array:Array;var code="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";for(var i=0,len=code.length;i<len;++i){lookup[i]=code[i];revLookup[code.charCodeAt(i)]=i}revLookup["-".charCodeAt(0)]=62;revLookup["_".charCodeAt(0)]=63;function placeHoldersCount(b64){var len=b64.length;if(len%4>0){throw new Error("Invalid string. Length must be a multiple of 4")}return b64[len-2]==="="?2:b64[len-1]==="="?1:0}function byteLength(b64){return b64.length*3/4-placeHoldersCount(b64)}function toByteArray(b64){var i,j,l,tmp,placeHolders,arr;var len=b64.length;placeHolders=placeHoldersCount(b64);arr=new Arr(len*3/4-placeHolders);l=placeHolders>0?len-4:len;var L=0;for(i=0,j=0;i<l;i+=4,j+=3){tmp=revLookup[b64.charCodeAt(i)]<<18|revLookup[b64.charCodeAt(i+1)]<<12|revLookup[b64.charCodeAt(i+2)]<<6|revLookup[b64.charCodeAt(i+3)];arr[L++]=tmp>>16&255;arr[L++]=tmp>>8&255;arr[L++]=tmp&255}if(placeHolders===2){tmp=revLookup[b64.charCodeAt(i)]<<2|revLookup[b64.charCodeAt(i+1)]>>4;arr[L++]=tmp&255}else if(placeHolders===1){tmp=revLookup[b64.charCodeAt(i)]<<10|revLookup[b64.charCodeAt(i+1)]<<4|revLookup[b64.charCodeAt(i+2)]>>2;arr[L++]=tmp>>8&255;arr[L++]=tmp&255}return arr}function tripletToBase64(num){return lookup[num>>18&63]+lookup[num>>12&63]+lookup[num>>6&63]+lookup[num&63]}function encodeChunk(uint8,start,end){var tmp;var output=[];for(var i=start;i<end;i+=3){tmp=(uint8[i]<<16)+(uint8[i+1]<<8)+uint8[i+2];output.push(tripletToBase64(tmp))}return output.join("")}function fromByteArray(uint8){var tmp;var len=uint8.length;var extraBytes=len%3;var output="";var parts=[];var maxChunkLength=16383;for(var i=0,len2=len-extraBytes;i<len2;i+=maxChunkLength){parts.push(encodeChunk(uint8,i,i+maxChunkLength>len2?len2:i+maxChunkLength))}if(extraBytes===1){tmp=uint8[len-1];output+=lookup[tmp>>2];output+=lookup[tmp<<4&63];output+="=="}else if(extraBytes===2){tmp=(uint8[len-2]<<8)+uint8[len-1];output+=lookup[tmp>>10];output+=lookup[tmp>>4&63];output+=lookup[tmp<<2&63];output+="="}parts.push(output);return parts.join("")}},{}],2:[function(require,module,exports){"use strict";var base64=require("base64-js");var ieee754=require("ieee754");exports.Buffer=Buffer;exports.SlowBuffer=SlowBuffer;exports.INSPECT_MAX_BYTES=50;var K_MAX_LENGTH=2147483647;exports.kMaxLength=K_MAX_LENGTH;Buffer.TYPED_ARRAY_SUPPORT=typedArraySupport();if(!Buffer.TYPED_ARRAY_SUPPORT&&typeof console!=="undefined"&&typeof console.error==="function"){console.error("This browser lacks typed array (Uint8Array) support which is required by "+"\`buffer\` v5.x. Use \`buffer\` v4.x if you require old browser support.")}function typedArraySupport(){try{var arr=new Uint8Array(1);arr.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}};return arr.foo()===42}catch(e){return false}}function createBuffer(length){if(length>K_MAX_LENGTH){throw new RangeError("Invalid typed array length")}var buf=new Uint8Array(length);buf.__proto__=Buffer.prototype;return buf}function Buffer(arg,encodingOrOffset,length){if(typeof arg==="number"){if(typeof encodingOrOffset==="string"){throw new Error("If encoding is specified then the first argument must be a string")}return allocUnsafe(arg)}return from(arg,encodingOrOffset,length)}if(typeof Symbol!=="undefined"&&Symbol.species&&Buffer[Symbol.species]===Buffer){Object.defineProperty(Buffer,Symbol.species,{value:null,configurable:true,enumerable:false,writable:false})}Buffer.poolSize=8192;function from(value,encodingOrOffset,length){if(typeof value==="number"){throw new TypeError('"value" argument must not be a number')}if(value instanceof ArrayBuffer){return fromArrayBuffer(value,encodingOrOffset,length)}if(typeof value==="string"){return fromString(value,encodingOrOffset)}return fromObject(value)}Buffer.from=function(value,encodingOrOffset,length){return from(value,encodingOrOffset,length)};Buffer.prototype.__proto__=Uint8Array.prototype;Buffer.__proto__=Uint8Array;function assertSize(size){if(typeof size!=="number"){throw new TypeError('"size" argument must be a number')}else if(size<0){throw new RangeError('"size" argument must not be negative')}}function alloc(size,fill,encoding){assertSize(size);if(size<=0){return createBuffer(size)}if(fill!==undefined){return typeof encoding==="string"?createBuffer(size).fill(fill,encoding):createBuffer(size).fill(fill)}return createBuffer(size)}Buffer.alloc=function(size,fill,encoding){return alloc(size,fill,encoding)};function allocUnsafe(size){assertSize(size);return createBuffer(size<0?0:checked(size)|0)}Buffer.allocUnsafe=function(size){return allocUnsafe(size)};Buffer.allocUnsafeSlow=function(size){return allocUnsafe(size)};function fromString(string,encoding){if(typeof encoding!=="string"||encoding===""){encoding="utf8"}if(!Buffer.isEncoding(encoding)){throw new TypeError('"encoding" must be a valid string encoding')}var length=byteLength(string,encoding)|0;var buf=createBuffer(length);var actual=buf.write(string,encoding);if(actual!==length){buf=buf.slice(0,actual)}return buf}function fromArrayLike(array){var length=array.length<0?0:checked(array.length)|0;var buf=createBuffer(length);for(var i=0;i<length;i+=1){buf[i]=array[i]&255}return buf}function fromArrayBuffer(array,byteOffset,length){if(byteOffset<0||array.byteLength<byteOffset){throw new RangeError("'offset' is out of bounds")}if(array.byteLength<byteOffset+(length||0)){throw new RangeError("'length' is out of bounds")}var buf;if(byteOffset===undefined&&length===undefined){buf=new Uint8Array(array)}else if(length===undefined){buf=new Uint8Array(array,byteOffset)}else{buf=new Uint8Array(array,byteOffset,length)}buf.__proto__=Buffer.prototype;return buf}function fromObject(obj){if(Buffer.isBuffer(obj)){var len=checked(obj.length)|0;var buf=createBuffer(len);if(buf.length===0){return buf}obj.copy(buf,0,0,len);return buf}if(obj){if(isArrayBufferView(obj)||"length"in obj){if(typeof obj.length!=="number"||numberIsNaN(obj.length)){return createBuffer(0)}return fromArrayLike(obj)}if(obj.type==="Buffer"&&Array.isArray(obj.data)){return fromArrayLike(obj.data)}}throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}function checked(length){if(length>=K_MAX_LENGTH){throw new RangeError("Attempt to allocate Buffer larger than maximum "+"size: 0x"+K_MAX_LENGTH.toString(16)+" bytes")}return length|0}function SlowBuffer(length){if(+length!=length){length=0}return Buffer.alloc(+length)}Buffer.isBuffer=function isBuffer(b){return b!=null&&b._isBuffer===true};Buffer.compare=function compare(a,b){if(!Buffer.isBuffer(a)||!Buffer.isBuffer(b)){throw new TypeError("Arguments must be Buffers")}if(a===b)return 0;var x=a.length;var y=b.length;for(var i=0,len=Math.min(x,y);i<len;++i){if(a[i]!==b[i]){x=a[i];y=b[i];break}}if(x<y)return-1;if(y<x)return 1;return 0};Buffer.isEncoding=function isEncoding(encoding){switch(String(encoding).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return true;default:return false}};Buffer.concat=function concat(list,length){if(!Array.isArray(list)){throw new TypeError('"list" argument must be an Array of Buffers')}if(list.length===0){return Buffer.alloc(0)}var i;if(length===undefined){length=0;for(i=0;i<list.length;++i){length+=list[i].length}}var buffer=Buffer.allocUnsafe(length);var pos=0;for(i=0;i<list.length;++i){var buf=list[i];if(!Buffer.isBuffer(buf)){throw new TypeError('"list" argument must be an Array of Buffers')}buf.copy(buffer,pos);pos+=buf.length}return buffer};function byteLength(string,encoding){if(Buffer.isBuffer(string)){return string.length}if(isArrayBufferView(string)||string instanceof ArrayBuffer){return string.byteLength}if(typeof string!=="string"){string=""+string}var len=string.length;if(len===0)return 0;var loweredCase=false;for(;;){switch(encoding){case"ascii":case"latin1":case"binary":return len;case"utf8":case"utf-8":case undefined:return utf8ToBytes(string).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return len*2;case"hex":return len>>>1;case"base64":return base64ToBytes(string).length;default:if(loweredCase)return utf8ToBytes(string).length;encoding=(""+encoding).toLowerCase();loweredCase=true}}}Buffer.byteLength=byteLength;function slowToString(encoding,start,end){var loweredCase=false;if(start===undefined||start<0){start=0}if(start>this.length){return""}if(end===undefined||end>this.length){end=this.length}if(end<=0){return""}end>>>=0;start>>>=0;if(end<=start){return""}if(!encoding)encoding="utf8";while(true){switch(encoding){case"hex":return hexSlice(this,start,end);case"utf8":case"utf-8":return utf8Slice(this,start,end);case"ascii":return asciiSlice(this,start,end);case"latin1":case"binary":return latin1Slice(this,start,end);case"base64":return base64Slice(this,start,end);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return utf16leSlice(this,start,end);default:if(loweredCase)throw new TypeError("Unknown encoding: "+encoding);encoding=(encoding+"").toLowerCase();loweredCase=true}}}Buffer.prototype._isBuffer=true;function swap(b,n,m){var i=b[n];b[n]=b[m];b[m]=i}Buffer.prototype.swap16=function swap16(){var len=this.length;if(len%2!==0){throw new RangeError("Buffer size must be a multiple of 16-bits")}for(var i=0;i<len;i+=2){swap(this,i,i+1)}return this};Buffer.prototype.swap32=function swap32(){var len=this.length;if(len%4!==0){throw new RangeError("Buffer size must be a multiple of 32-bits")}for(var i=0;i<len;i+=4){swap(this,i,i+3);swap(this,i+1,i+2)}return this};Buffer.prototype.swap64=function swap64(){var len=this.length;if(len%8!==0){throw new RangeError("Buffer size must be a multiple of 64-bits")}for(var i=0;i<len;i+=8){swap(this,i,i+7);swap(this,i+1,i+6);swap(this,i+2,i+5);swap(this,i+3,i+4)}return this};Buffer.prototype.toString=function toString(){var length=this.length;if(length===0)return"";if(arguments.length===0)return utf8Slice(this,0,length);return slowToString.apply(this,arguments)};Buffer.prototype.equals=function equals(b){if(!Buffer.isBuffer(b))throw new TypeError("Argument must be a Buffer");if(this===b)return true;return Buffer.compare(this,b)===0};Buffer.prototype.inspect=function inspect(){var str="";var max=exports.INSPECT_MAX_BYTES;if(this.length>0){str=this.toString("hex",0,max).match(/.{2}/g).join(" ");if(this.length>max)str+=" ... "}return"<Buffer "+str+">"};Buffer.prototype.compare=function compare(target,start,end,thisStart,thisEnd){if(!Buffer.isBuffer(target)){throw new TypeError("Argument must be a Buffer")}if(start===undefined){start=0}if(end===undefined){end=target?target.length:0}if(thisStart===undefined){thisStart=0}if(thisEnd===undefined){thisEnd=this.length}if(start<0||end>target.length||thisStart<0||thisEnd>this.length){throw new RangeError("out of range index")}if(thisStart>=thisEnd&&start>=end){return 0}if(thisStart>=thisEnd){return-1}if(start>=end){return 1}start>>>=0;end>>>=0;thisStart>>>=0;thisEnd>>>=0;if(this===target)return 0;var x=thisEnd-thisStart;var y=end-start;var len=Math.min(x,y);var thisCopy=this.slice(thisStart,thisEnd);var targetCopy=target.slice(start,end);for(var i=0;i<len;++i){if(thisCopy[i]!==targetCopy[i]){x=thisCopy[i];y=targetCopy[i];break}}if(x<y)return-1;if(y<x)return 1;return 0};function bidirectionalIndexOf(buffer,val,byteOffset,encoding,dir){if(buffer.length===0)return-1;if(typeof byteOffset==="string"){encoding=byteOffset;byteOffset=0}else if(byteOffset>2147483647){byteOffset=2147483647}else if(byteOffset<-2147483648){byteOffset=-2147483648}byteOffset=+byteOffset;if(numberIsNaN(byteOffset)){byteOffset=dir?0:buffer.length-1}if(byteOffset<0)byteOffset=buffer.length+byteOffset;if(byteOffset>=buffer.length){if(dir)return-1;else byteOffset=buffer.length-1}else if(byteOffset<0){if(dir)byteOffset=0;else return-1}if(typeof val==="string"){val=Buffer.from(val,encoding)}if(Buffer.isBuffer(val)){if(val.length===0){return-1}return arrayIndexOf(buffer,val,byteOffset,encoding,dir)}else if(typeof val==="number"){val=val&255;if(typeof Uint8Array.prototype.indexOf==="function"){if(dir){return Uint8Array.prototype.indexOf.call(buffer,val,byteOffset)}else{return Uint8Array.prototype.lastIndexOf.call(buffer,val,byteOffset)}}return arrayIndexOf(buffer,[val],byteOffset,encoding,dir)}throw new TypeError("val must be string, number or Buffer")}function arrayIndexOf(arr,val,byteOffset,encoding,dir){var indexSize=1;var arrLength=arr.length;var valLength=val.length;if(encoding!==undefined){encoding=String(encoding).toLowerCase();if(encoding==="ucs2"||encoding==="ucs-2"||encoding==="utf16le"||encoding==="utf-16le"){if(arr.length<2||val.length<2){return-1}indexSize=2;arrLength/=2;valLength/=2;byteOffset/=2}}function read(buf,i){if(indexSize===1){return buf[i]}else{return buf.readUInt16BE(i*indexSize)}}var i;if(dir){var foundIndex=-1;for(i=byteOffset;i<arrLength;i++){if(read(arr,i)===read(val,foundIndex===-1?0:i-foundIndex)){if(foundIndex===-1)foundIndex=i;if(i-foundIndex+1===valLength)return foundIndex*indexSize}else{if(foundIndex!==-1)i-=i-foundIndex;foundIndex=-1}}}else{if(byteOffset+valLength>arrLength)byteOffset=arrLength-valLength;for(i=byteOffset;i>=0;i--){var found=true;for(var j=0;j<valLength;j++){if(read(arr,i+j)!==read(val,j)){found=false;break}}if(found)return i}}return-1}Buffer.prototype.includes=function includes(val,byteOffset,encoding){return this.indexOf(val,byteOffset,encoding)!==-1};Buffer.prototype.indexOf=function indexOf(val,byteOffset,encoding){return bidirectionalIndexOf(this,val,byteOffset,encoding,true)};Buffer.prototype.lastIndexOf=function lastIndexOf(val,byteOffset,encoding){return bidirectionalIndexOf(this,val,byteOffset,encoding,false)};function hexWrite(buf,string,offset,length){offset=Number(offset)||0;var remaining=buf.length-offset;if(!length){length=remaining}else{length=Number(length);if(length>remaining){length=remaining}}var strLen=string.length;if(strLen%2!==0)throw new TypeError("Invalid hex string");if(length>strLen/2){length=strLen/2}for(var i=0;i<length;++i){var parsed=parseInt(string.substr(i*2,2),16);if(numberIsNaN(parsed))return i;buf[offset+i]=parsed}return i}function utf8Write(buf,string,offset,length){return blitBuffer(utf8ToBytes(string,buf.length-offset),buf,offset,length)}function asciiWrite(buf,string,offset,length){return blitBuffer(asciiToBytes(string),buf,offset,length)}function latin1Write(buf,string,offset,length){return asciiWrite(buf,string,offset,length)}function base64Write(buf,string,offset,length){return blitBuffer(base64ToBytes(string),buf,offset,length)}function ucs2Write(buf,string,offset,length){return blitBuffer(utf16leToBytes(string,buf.length-offset),buf,offset,length)}Buffer.prototype.write=function write(string,offset,length,encoding){if(offset===undefined){encoding="utf8";length=this.length;offset=0}else if(length===undefined&&typeof offset==="string"){encoding=offset;length=this.length;offset=0}else if(isFinite(offset)){offset=offset>>>0;if(isFinite(length)){length=length>>>0;if(encoding===undefined)encoding="utf8"}else{encoding=length;length=undefined}}else{throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported")}var remaining=this.length-offset;if(length===undefined||length>remaining)length=remaining;if(string.length>0&&(length<0||offset<0)||offset>this.length){throw new RangeError("Attempt to write outside buffer bounds")}if(!encoding)encoding="utf8";var loweredCase=false;for(;;){switch(encoding){case"hex":return hexWrite(this,string,offset,length);case"utf8":case"utf-8":return utf8Write(this,string,offset,length);case"ascii":return asciiWrite(this,string,offset,length);case"latin1":case"binary":return latin1Write(this,string,offset,length);case"base64":return base64Write(this,string,offset,length);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return ucs2Write(this,string,offset,length);default:if(loweredCase)throw new TypeError("Unknown encoding: "+encoding);encoding=(""+encoding).toLowerCase();loweredCase=true}}};Buffer.prototype.toJSON=function toJSON(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};function base64Slice(buf,start,end){if(start===0&&end===buf.length){return base64.fromByteArray(buf)}else{return base64.fromByteArray(buf.slice(start,end))}}function utf8Slice(buf,start,end){end=Math.min(buf.length,end);var res=[];var i=start;while(i<end){var firstByte=buf[i];var codePoint=null;var bytesPerSequence=firstByte>239?4:firstByte>223?3:firstByte>191?2:1;if(i+bytesPerSequence<=end){var secondByte,thirdByte,fourthByte,tempCodePoint;switch(bytesPerSequence){case 1:if(firstByte<128){codePoint=firstByte}break;case 2:secondByte=buf[i+1];if((secondByte&192)===128){tempCodePoint=(firstByte&31)<<6|secondByte&63;if(tempCodePoint>127){codePoint=tempCodePoint}}break;case 3:secondByte=buf[i+1];thirdByte=buf[i+2];if((secondByte&192)===128&&(thirdByte&192)===128){tempCodePoint=(firstByte&15)<<12|(secondByte&63)<<6|thirdByte&63;if(tempCodePoint>2047&&(tempCodePoint<55296||tempCodePoint>57343)){codePoint=tempCodePoint}}break;case 4:secondByte=buf[i+1];thirdByte=buf[i+2];fourthByte=buf[i+3];if((secondByte&192)===128&&(thirdByte&192)===128&&(fourthByte&192)===128){tempCodePoint=(firstByte&15)<<18|(secondByte&63)<<12|(thirdByte&63)<<6|fourthByte&63;if(tempCodePoint>65535&&tempCodePoint<1114112){codePoint=tempCodePoint}}}}if(codePoint===null){codePoint=65533;bytesPerSequence=1}else if(codePoint>65535){codePoint-=65536;res.push(codePoint>>>10&1023|55296);codePoint=56320|codePoint&1023}res.push(codePoint);i+=bytesPerSequence}return decodeCodePointsArray(res)}var MAX_ARGUMENTS_LENGTH=4096;function decodeCodePointsArray(codePoints){var len=codePoints.length;if(len<=MAX_ARGUMENTS_LENGTH){return String.fromCharCode.apply(String,codePoints)}var res="";var i=0;while(i<len){res+=String.fromCharCode.apply(String,codePoints.slice(i,i+=MAX_ARGUMENTS_LENGTH))}return res}function asciiSlice(buf,start,end){var ret="";end=Math.min(buf.length,end);for(var i=start;i<end;++i){ret+=String.fromCharCode(buf[i]&127)}return ret}function latin1Slice(buf,start,end){var ret="";end=Math.min(buf.length,end);for(var i=start;i<end;++i){ret+=String.fromCharCode(buf[i])}return ret}function hexSlice(buf,start,end){var len=buf.length;if(!start||start<0)start=0;if(!end||end<0||end>len)end=len;var out="";for(var i=start;i<end;++i){out+=toHex(buf[i])}return out}function utf16leSlice(buf,start,end){var bytes=buf.slice(start,end);var res="";for(var i=0;i<bytes.length;i+=2){res+=String.fromCharCode(bytes[i]+bytes[i+1]*256)}return res}Buffer.prototype.slice=function slice(start,end){var len=this.length;start=~~start;end=end===undefined?len:~~end;if(start<0){start+=len;if(start<0)start=0}else if(start>len){start=len}if(end<0){end+=len;if(end<0)end=0}else if(end>len){end=len}if(end<start)end=start;var newBuf=this.subarray(start,end);newBuf.__proto__=Buffer.prototype;return newBuf};function checkOffset(offset,ext,length){if(offset%1!==0||offset<0)throw new RangeError("offset is not uint");if(offset+ext>length)throw new RangeError("Trying to access beyond buffer length")}Buffer.prototype.readUIntLE=function readUIntLE(offset,byteLength,noAssert){offset=offset>>>0;byteLength=byteLength>>>0;if(!noAssert)checkOffset(offset,byteLength,this.length);var val=this[offset];var mul=1;var i=0;while(++i<byteLength&&(mul*=256)){val+=this[offset+i]*mul}return val};Buffer.prototype.readUIntBE=function readUIntBE(offset,byteLength,noAssert){offset=offset>>>0;byteLength=byteLength>>>0;if(!noAssert){checkOffset(offset,byteLength,this.length)}var val=this[offset+--byteLength];var mul=1;while(byteLength>0&&(mul*=256)){val+=this[offset+--byteLength]*mul}return val};Buffer.prototype.readUInt8=function readUInt8(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,1,this.length);return this[offset]};Buffer.prototype.readUInt16LE=function readUInt16LE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,2,this.length);return this[offset]|this[offset+1]<<8};Buffer.prototype.readUInt16BE=function readUInt16BE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,2,this.length);return this[offset]<<8|this[offset+1]};Buffer.prototype.readUInt32LE=function readUInt32LE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,4,this.length);return(this[offset]|this[offset+1]<<8|this[offset+2]<<16)+this[offset+3]*16777216};Buffer.prototype.readUInt32BE=function readUInt32BE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,4,this.length);return this[offset]*16777216+(this[offset+1]<<16|this[offset+2]<<8|this[offset+3])};Buffer.prototype.readIntLE=function readIntLE(offset,byteLength,noAssert){offset=offset>>>0;byteLength=byteLength>>>0;if(!noAssert)checkOffset(offset,byteLength,this.length);var val=this[offset];var mul=1;var i=0;while(++i<byteLength&&(mul*=256)){val+=this[offset+i]*mul}mul*=128;if(val>=mul)val-=Math.pow(2,8*byteLength);return val};Buffer.prototype.readIntBE=function readIntBE(offset,byteLength,noAssert){offset=offset>>>0;byteLength=byteLength>>>0;if(!noAssert)checkOffset(offset,byteLength,this.length);var i=byteLength;var mul=1;var val=this[offset+--i];while(i>0&&(mul*=256)){val+=this[offset+--i]*mul}mul*=128;if(val>=mul)val-=Math.pow(2,8*byteLength);return val};Buffer.prototype.readInt8=function readInt8(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,1,this.length);if(!(this[offset]&128))return this[offset];return(255-this[offset]+1)*-1};Buffer.prototype.readInt16LE=function readInt16LE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,2,this.length);var val=this[offset]|this[offset+1]<<8;return val&32768?val|4294901760:val};Buffer.prototype.readInt16BE=function readInt16BE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,2,this.length);var val=this[offset+1]|this[offset]<<8;return val&32768?val|4294901760:val};Buffer.prototype.readInt32LE=function readInt32LE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,4,this.length);return this[offset]|this[offset+1]<<8|this[offset+2]<<16|this[offset+3]<<24};Buffer.prototype.readInt32BE=function readInt32BE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,4,this.length);return this[offset]<<24|this[offset+1]<<16|this[offset+2]<<8|this[offset+3]};Buffer.prototype.readFloatLE=function readFloatLE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,4,this.length);return ieee754.read(this,offset,true,23,4)};Buffer.prototype.readFloatBE=function readFloatBE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,4,this.length);return ieee754.read(this,offset,false,23,4)};Buffer.prototype.readDoubleLE=function readDoubleLE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,8,this.length);return ieee754.read(this,offset,true,52,8)};Buffer.prototype.readDoubleBE=function readDoubleBE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,8,this.length);return ieee754.read(this,offset,false,52,8)};function checkInt(buf,value,offset,ext,max,min){if(!Buffer.isBuffer(buf))throw new TypeError('"buffer" argument must be a Buffer instance');if(value>max||value<min)throw new RangeError('"value" argument is out of bounds');if(offset+ext>buf.length)throw new RangeError("Index out of range")}Buffer.prototype.writeUIntLE=function writeUIntLE(value,offset,byteLength,noAssert){value=+value;offset=offset>>>0;byteLength=byteLength>>>0;if(!noAssert){var maxBytes=Math.pow(2,8*byteLength)-1;checkInt(this,value,offset,byteLength,maxBytes,0)}var mul=1;var i=0;this[offset]=value&255;while(++i<byteLength&&(mul*=256)){this[offset+i]=value/mul&255}return offset+byteLength};Buffer.prototype.writeUIntBE=function writeUIntBE(value,offset,byteLength,noAssert){value=+value;offset=offset>>>0;byteLength=byteLength>>>0;if(!noAssert){var maxBytes=Math.pow(2,8*byteLength)-1;checkInt(this,value,offset,byteLength,maxBytes,0)}var i=byteLength-1;var mul=1;this[offset+i]=value&255;while(--i>=0&&(mul*=256)){this[offset+i]=value/mul&255}return offset+byteLength};Buffer.prototype.writeUInt8=function writeUInt8(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,1,255,0);this[offset]=value&255;return offset+1};Buffer.prototype.writeUInt16LE=function writeUInt16LE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,2,65535,0);this[offset]=value&255;this[offset+1]=value>>>8;return offset+2};Buffer.prototype.writeUInt16BE=function writeUInt16BE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,2,65535,0);this[offset]=value>>>8;this[offset+1]=value&255;return offset+2};Buffer.prototype.writeUInt32LE=function writeUInt32LE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,4,4294967295,0);this[offset+3]=value>>>24;this[offset+2]=value>>>16;this[offset+1]=value>>>8;this[offset]=value&255;return offset+4};Buffer.prototype.writeUInt32BE=function writeUInt32BE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,4,4294967295,0);this[offset]=value>>>24;this[offset+1]=value>>>16;this[offset+2]=value>>>8;this[offset+3]=value&255;return offset+4};Buffer.prototype.writeIntLE=function writeIntLE(value,offset,byteLength,noAssert){value=+value;offset=offset>>>0;if(!noAssert){var limit=Math.pow(2,8*byteLength-1);checkInt(this,value,offset,byteLength,limit-1,-limit)}var i=0;var mul=1;var sub=0;this[offset]=value&255;while(++i<byteLength&&(mul*=256)){if(value<0&&sub===0&&this[offset+i-1]!==0){sub=1}this[offset+i]=(value/mul>>0)-sub&255}return offset+byteLength};Buffer.prototype.writeIntBE=function writeIntBE(value,offset,byteLength,noAssert){value=+value;offset=offset>>>0;if(!noAssert){var limit=Math.pow(2,8*byteLength-1);checkInt(this,value,offset,byteLength,limit-1,-limit)}var i=byteLength-1;var mul=1;var sub=0;this[offset+i]=value&255;while(--i>=0&&(mul*=256)){if(value<0&&sub===0&&this[offset+i+1]!==0){sub=1}this[offset+i]=(value/mul>>0)-sub&255}return offset+byteLength};Buffer.prototype.writeInt8=function writeInt8(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,1,127,-128);if(value<0)value=255+value+1;this[offset]=value&255;return offset+1};Buffer.prototype.writeInt16LE=function writeInt16LE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,2,32767,-32768);this[offset]=value&255;this[offset+1]=value>>>8;return offset+2};Buffer.prototype.writeInt16BE=function writeInt16BE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,2,32767,-32768);this[offset]=value>>>8;this[offset+1]=value&255;return offset+2};Buffer.prototype.writeInt32LE=function writeInt32LE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,4,2147483647,-2147483648);this[offset]=value&255;this[offset+1]=value>>>8;this[offset+2]=value>>>16;this[offset+3]=value>>>24;return offset+4};Buffer.prototype.writeInt32BE=function writeInt32BE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,4,2147483647,-2147483648);if(value<0)value=4294967295+value+1;this[offset]=value>>>24;this[offset+1]=value>>>16;this[offset+2]=value>>>8;this[offset+3]=value&255;return offset+4};function checkIEEE754(buf,value,offset,ext,max,min){if(offset+ext>buf.length)throw new RangeError("Index out of range");if(offset<0)throw new RangeError("Index out of range")}function writeFloat(buf,value,offset,littleEndian,noAssert){value=+value;offset=offset>>>0;if(!noAssert){checkIEEE754(buf,value,offset,4,3.4028234663852886e38,-3.4028234663852886e38)}ieee754.write(buf,value,offset,littleEndian,23,4);return offset+4}Buffer.prototype.writeFloatLE=function writeFloatLE(value,offset,noAssert){return writeFloat(this,value,offset,true,noAssert)};Buffer.prototype.writeFloatBE=function writeFloatBE(value,offset,noAssert){return writeFloat(this,value,offset,false,noAssert)};function writeDouble(buf,value,offset,littleEndian,noAssert){value=+value;offset=offset>>>0;if(!noAssert){checkIEEE754(buf,value,offset,8,1.7976931348623157e308,-1.7976931348623157e308)}ieee754.write(buf,value,offset,littleEndian,52,8);return offset+8}Buffer.prototype.writeDoubleLE=function writeDoubleLE(value,offset,noAssert){return writeDouble(this,value,offset,true,noAssert)};Buffer.prototype.writeDoubleBE=function writeDoubleBE(value,offset,noAssert){return writeDouble(this,value,offset,false,noAssert)};Buffer.prototype.copy=function copy(target,targetStart,start,end){if(!start)start=0;if(!end&&end!==0)end=this.length;if(targetStart>=target.length)targetStart=target.length;if(!targetStart)targetStart=0;if(end>0&&end<start)end=start;if(end===start)return 0;if(target.length===0||this.length===0)return 0;if(targetStart<0){throw new RangeError("targetStart out of bounds")}if(start<0||start>=this.length)throw new RangeError("sourceStart out of bounds");if(end<0)throw new RangeError("sourceEnd out of bounds");if(end>this.length)end=this.length;if(target.length-targetStart<end-start){end=target.length-targetStart+start}var len=end-start;var i;if(this===target&&start<targetStart&&targetStart<end){for(i=len-1;i>=0;--i){target[i+targetStart]=this[i+start]}}else if(len<1e3){for(i=0;i<len;++i){target[i+targetStart]=this[i+start]}}else{Uint8Array.prototype.set.call(target,this.subarray(start,start+len),targetStart)}return len};Buffer.prototype.fill=function fill(val,start,end,encoding){if(typeof val==="string"){if(typeof start==="string"){encoding=start;start=0;end=this.length}else if(typeof end==="string"){encoding=end;end=this.length}if(val.length===1){var code=val.charCodeAt(0);if(code<256){val=code}}if(encoding!==undefined&&typeof encoding!=="string"){throw new TypeError("encoding must be a string")}if(typeof encoding==="string"&&!Buffer.isEncoding(encoding)){throw new TypeError("Unknown encoding: "+encoding)}}else if(typeof val==="number"){val=val&255}if(start<0||this.length<start||this.length<end){throw new RangeError("Out of range index")}if(end<=start){return this}start=start>>>0;end=end===undefined?this.length:end>>>0;if(!val)val=0;var i;if(typeof val==="number"){for(i=start;i<end;++i){this[i]=val}}else{var bytes=Buffer.isBuffer(val)?val:new Buffer(val,encoding);var len=bytes.length;for(i=0;i<end-start;++i){this[i+start]=bytes[i%len]}}return this};var INVALID_BASE64_RE=/[^+\\/0-9A-Za-z-_]/g;function base64clean(str){str=str.trim().replace(INVALID_BASE64_RE,"");if(str.length<2)return"";while(str.length%4!==0){str=str+"="}return str}function toHex(n){if(n<16)return"0"+n.toString(16);return n.toString(16)}function utf8ToBytes(string,units){units=units||Infinity;var codePoint;var length=string.length;var leadSurrogate=null;var bytes=[];for(var i=0;i<length;++i){codePoint=string.charCodeAt(i);if(codePoint>55295&&codePoint<57344){if(!leadSurrogate){if(codePoint>56319){if((units-=3)>-1)bytes.push(239,191,189);continue}else if(i+1===length){if((units-=3)>-1)bytes.push(239,191,189);continue}leadSurrogate=codePoint;continue}if(codePoint<56320){if((units-=3)>-1)bytes.push(239,191,189);leadSurrogate=codePoint;continue}codePoint=(leadSurrogate-55296<<10|codePoint-56320)+65536}else if(leadSurrogate){if((units-=3)>-1)bytes.push(239,191,189)}leadSurrogate=null\r
;if(codePoint<128){if((units-=1)<0)break;bytes.push(codePoint)}else if(codePoint<2048){if((units-=2)<0)break;bytes.push(codePoint>>6|192,codePoint&63|128)}else if(codePoint<65536){if((units-=3)<0)break;bytes.push(codePoint>>12|224,codePoint>>6&63|128,codePoint&63|128)}else if(codePoint<1114112){if((units-=4)<0)break;bytes.push(codePoint>>18|240,codePoint>>12&63|128,codePoint>>6&63|128,codePoint&63|128)}else{throw new Error("Invalid code point")}}return bytes}function asciiToBytes(str){var byteArray=[];for(var i=0;i<str.length;++i){byteArray.push(str.charCodeAt(i)&255)}return byteArray}function utf16leToBytes(str,units){var c,hi,lo;var byteArray=[];for(var i=0;i<str.length;++i){if((units-=2)<0)break;c=str.charCodeAt(i);hi=c>>8;lo=c%256;byteArray.push(lo);byteArray.push(hi)}return byteArray}function base64ToBytes(str){return base64.toByteArray(base64clean(str))}function blitBuffer(src,dst,offset,length){for(var i=0;i<length;++i){if(i+offset>=dst.length||i>=src.length)break;dst[i+offset]=src[i]}return i}function isArrayBufferView(obj){return typeof ArrayBuffer.isView==="function"&&ArrayBuffer.isView(obj)}function numberIsNaN(obj){return obj!==obj}},{"base64-js":1,ieee754:3}],3:[function(require,module,exports){exports.read=function(buffer,offset,isLE,mLen,nBytes){var e,m;var eLen=nBytes*8-mLen-1;var eMax=(1<<eLen)-1;var eBias=eMax>>1;var nBits=-7;var i=isLE?nBytes-1:0;var d=isLE?-1:1;var s=buffer[offset+i];i+=d;e=s&(1<<-nBits)-1;s>>=-nBits;nBits+=eLen;for(;nBits>0;e=e*256+buffer[offset+i],i+=d,nBits-=8){}m=e&(1<<-nBits)-1;e>>=-nBits;nBits+=mLen;for(;nBits>0;m=m*256+buffer[offset+i],i+=d,nBits-=8){}if(e===0){e=1-eBias}else if(e===eMax){return m?NaN:(s?-1:1)*Infinity}else{m=m+Math.pow(2,mLen);e=e-eBias}return(s?-1:1)*m*Math.pow(2,e-mLen)};exports.write=function(buffer,value,offset,isLE,mLen,nBytes){var e,m,c;var eLen=nBytes*8-mLen-1;var eMax=(1<<eLen)-1;var eBias=eMax>>1;var rt=mLen===23?Math.pow(2,-24)-Math.pow(2,-77):0;var i=isLE?0:nBytes-1;var d=isLE?1:-1;var s=value<0||value===0&&1/value<0?1:0;value=Math.abs(value);if(isNaN(value)||value===Infinity){m=isNaN(value)?1:0;e=eMax}else{e=Math.floor(Math.log(value)/Math.LN2);if(value*(c=Math.pow(2,-e))<1){e--;c*=2}if(e+eBias>=1){value+=rt/c}else{value+=rt*Math.pow(2,1-eBias)}if(value*c>=2){e++;c/=2}if(e+eBias>=eMax){m=0;e=eMax}else if(e+eBias>=1){m=(value*c-1)*Math.pow(2,mLen);e=e+eBias}else{m=value*Math.pow(2,eBias-1)*Math.pow(2,mLen);e=0}}for(;mLen>=8;buffer[offset+i]=m&255,i+=d,m/=256,mLen-=8){}e=e<<mLen|m;eLen+=mLen;for(;eLen>0;buffer[offset+i]=e&255,i+=d,e/=256,eLen-=8){}buffer[offset+i-d]|=s*128}},{}],4:[function(require,module,exports){var NeuQuant=require("./WasmNeuQuant.js");var LZWEncoder=require("./LZWEncoder.js");function ByteArray(){this.page=-1;this.pages=[];this.newPage()}ByteArray.pageSize=4096;ByteArray.charMap={};for(var i=0;i<256;i++)ByteArray.charMap[i]=String.fromCharCode(i);ByteArray.prototype.newPage=function(){this.pages[++this.page]=new Uint8Array(ByteArray.pageSize);this.cursor=0};ByteArray.prototype.getData=function(){var rv="";for(var p=0;p<this.pages.length;p++){for(var i=0;i<ByteArray.pageSize;i++){rv+=ByteArray.charMap[this.pages[p][i]]}}return rv};ByteArray.prototype.writeByte=function(val){if(this.cursor>=ByteArray.pageSize)this.newPage();this.pages[this.page][this.cursor++]=val};ByteArray.prototype.writeUTFBytes=function(string){for(var l=string.length,i=0;i<l;i++)this.writeByte(string.charCodeAt(i))};ByteArray.prototype.writeBytes=function(array,offset,length){for(var l=length||array.length,i=offset||0;i<l;i++)this.writeByte(array[i])};function GIFEncoder(width,height){this.width=~~width;this.height=~~height;this.transparent=null;this.transIndex=0;this.repeat=-1;this.delay=0;this.image=null;this.pixels=null;this.indexedPixels=null;this.colorDepth=null;this.colorTab=null;this.neuQuant=null;this.usedEntry=new Array;this.palSize=7;this.dispose=-1;this.firstFrame=true;this.sample=10;this.dither=false;this.globalPalette=false;this.out=new ByteArray}GIFEncoder.prototype.setDelay=function(milliseconds){this.delay=Math.round(milliseconds/10)};GIFEncoder.prototype.setFrameRate=function(fps){this.delay=Math.round(100/fps)};GIFEncoder.prototype.setDispose=function(disposalCode){if(disposalCode>=0)this.dispose=disposalCode};GIFEncoder.prototype.setRepeat=function(repeat){this.repeat=repeat};GIFEncoder.prototype.setTransparent=function(color){this.transparent=color};GIFEncoder.prototype.addFrame=function(imageData){this.image=imageData;this.colorTab=this.globalPalette&&this.globalPalette.slice?this.globalPalette:null;this.getImagePixels();this.analyzePixels();if(this.globalPalette===true)this.globalPalette=this.colorTab;if(this.firstFrame){this.writeLSD();this.writePalette();if(this.repeat>=0){this.writeNetscapeExt()}}this.writeGraphicCtrlExt();this.writeImageDesc();if(!this.firstFrame&&!this.globalPalette)this.writePalette();this.writePixels();this.firstFrame=false};GIFEncoder.prototype.finish=function(){this.out.writeByte(59)};GIFEncoder.prototype.setQuality=function(quality){if(quality<1)quality=1;this.sample=quality};GIFEncoder.prototype.setDither=function(dither){if(dither===true)dither="FloydSteinberg";this.dither=dither};GIFEncoder.prototype.setGlobalPalette=function(palette){this.globalPalette=palette};GIFEncoder.prototype.getGlobalPalette=function(){return this.globalPalette&&this.globalPalette.slice&&this.globalPalette.slice(0)||this.globalPalette};GIFEncoder.prototype.writeHeader=function(){this.out.writeUTFBytes("GIF89a")};GIFEncoder.prototype.analyzePixels=function(){if(!this.colorTab){this.neuQuant=new NeuQuant(this.pixels,this.sample);this.neuQuant.buildColormap();this.colorTab=this.neuQuant.getColormap()}if(this.dither){this.ditherPixels(this.dither.replace("-serpentine",""),this.dither.match(/-serpentine/)!==null)}else{this.indexPixels()}this.pixels=null;this.colorDepth=8;this.palSize=7;if(this.transparent!==null){this.transIndex=this.findClosest(this.transparent,true)}};GIFEncoder.prototype.indexPixels=function(imgq){var nPix=this.pixels.length/3;this.indexedPixels=new Uint8Array(nPix);var k=0;for(var j=0;j<nPix;j++){var index=this.findClosestRGB(this.pixels[k++]&255,this.pixels[k++]&255,this.pixels[k++]&255);this.usedEntry[index]=true;this.indexedPixels[j]=index}};GIFEncoder.prototype.ditherPixels=function(kernel,serpentine){var kernels={FalseFloydSteinberg:[[3/8,1,0],[3/8,0,1],[2/8,1,1]],FloydSteinberg:[[7/16,1,0],[3/16,-1,1],[5/16,0,1],[1/16,1,1]],Stucki:[[8/42,1,0],[4/42,2,0],[2/42,-2,1],[4/42,-1,1],[8/42,0,1],[4/42,1,1],[2/42,2,1],[1/42,-2,2],[2/42,-1,2],[4/42,0,2],[2/42,1,2],[1/42,2,2]],Atkinson:[[1/8,1,0],[1/8,2,0],[1/8,-1,1],[1/8,0,1],[1/8,1,1],[1/8,0,2]]};if(!kernel||!kernels[kernel]){throw"Unknown dithering kernel: "+kernel}var ds=kernels[kernel];var index=0,height=this.height,width=this.width,data=this.pixels;var direction=serpentine?-1:1;this.indexedPixels=new Uint8Array(this.pixels.length/3);for(var y=0;y<height;y++){if(serpentine)direction=direction*-1;for(var x=direction==1?0:width-1,xend=direction==1?width:0;x!==xend;x+=direction){index=y*width+x;var idx=index*3;var r1=data[idx];var g1=data[idx+1];var b1=data[idx+2];idx=this.findClosestRGB(r1,g1,b1);this.usedEntry[idx]=true;this.indexedPixels[index]=idx;idx*=3;var r2=this.colorTab[idx];var g2=this.colorTab[idx+1];var b2=this.colorTab[idx+2];var er=r1-r2;var eg=g1-g2;var eb=b1-b2;for(var i=direction==1?0:ds.length-1,end=direction==1?ds.length:0;i!==end;i+=direction){var x1=ds[i][1];var y1=ds[i][2];if(x1+x>=0&&x1+x<width&&y1+y>=0&&y1+y<height){var d=ds[i][0];idx=index+x1+y1*width;idx*=3;data[idx]=Math.max(0,Math.min(255,data[idx]+er*d));data[idx+1]=Math.max(0,Math.min(255,data[idx+1]+eg*d));data[idx+2]=Math.max(0,Math.min(255,data[idx+2]+eb*d))}}}}};GIFEncoder.prototype.findClosest=function(c,used){return this.findClosestRGB((c&16711680)>>16,(c&65280)>>8,c&255,used)};GIFEncoder.prototype.findClosestRGB=function(r,g,b,used){if(this.colorTab===null)return-1;if(this.neuQuant&&!used){return this.neuQuant.lookupRGB(r,g,b)}var c=b|g<<8|r<<16;var minpos=0;var dmin=256*256*256;var len=this.colorTab.length;for(var i=0,index=0;i<len;index++){var dr=r-(this.colorTab[i++]&255);var dg=g-(this.colorTab[i++]&255);var db=b-(this.colorTab[i++]&255);var d=dr*dr+dg*dg+db*db;if((!used||this.usedEntry[index])&&d<dmin){dmin=d;minpos=index}}return minpos};GIFEncoder.prototype.getImagePixels=function(){var w=this.width;var h=this.height;this.pixels=new Uint8Array(w*h*3);var data=this.image;var srcPos=0;var count=0;for(var i=0;i<h;i++){for(var j=0;j<w;j++){this.pixels[count++]=data[srcPos++];this.pixels[count++]=data[srcPos++];this.pixels[count++]=data[srcPos++];srcPos++}}};GIFEncoder.prototype.writeGraphicCtrlExt=function(){this.out.writeByte(33);this.out.writeByte(249);this.out.writeByte(4);var transp,disp;if(this.transparent===null){transp=0;disp=0}else{transp=1;disp=2}if(this.dispose>=0){disp=this.dispose&7}disp<<=2;this.out.writeByte(0|disp|0|transp);this.writeShort(this.delay);this.out.writeByte(this.transIndex);this.out.writeByte(0)};GIFEncoder.prototype.writeImageDesc=function(){this.out.writeByte(44);this.writeShort(0);this.writeShort(0);this.writeShort(this.width);this.writeShort(this.height);if(this.firstFrame||this.globalPalette){this.out.writeByte(0)}else{this.out.writeByte(128|0|0|0|this.palSize)}};GIFEncoder.prototype.writeLSD=function(){this.writeShort(this.width);this.writeShort(this.height);this.out.writeByte(128|112|0|this.palSize);this.out.writeByte(0);this.out.writeByte(0)};GIFEncoder.prototype.writeNetscapeExt=function(){this.out.writeByte(33);this.out.writeByte(255);this.out.writeByte(11);this.out.writeUTFBytes("NETSCAPE2.0");this.out.writeByte(3);this.out.writeByte(1);this.writeShort(this.repeat);this.out.writeByte(0)};GIFEncoder.prototype.writePalette=function(){this.out.writeBytes(this.colorTab);var n=3*256-this.colorTab.length;for(var i=0;i<n;i++)this.out.writeByte(0)};GIFEncoder.prototype.writeShort=function(pValue){this.out.writeByte(pValue&255);this.out.writeByte(pValue>>8&255)};GIFEncoder.prototype.writePixels=function(){var enc=new LZWEncoder(this.width,this.height,this.indexedPixels,this.colorDepth);enc.encode(this.out)};GIFEncoder.prototype.stream=function(){return this.out};module.exports=GIFEncoder},{"./LZWEncoder.js":5,"./WasmNeuQuant.js":6}],5:[function(require,module,exports){var EOF=-1;var BITS=12;var HSIZE=5003;var masks=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535];function LZWEncoder(width,height,pixels,colorDepth){var initCodeSize=Math.max(2,colorDepth);var accum=new Uint8Array(256);var htab=new Int32Array(HSIZE);var codetab=new Int32Array(HSIZE);var cur_accum,cur_bits=0;var a_count;var free_ent=0;var maxcode;var clear_flg=false;var g_init_bits,ClearCode,EOFCode;function char_out(c,outs){accum[a_count++]=c;if(a_count>=254)flush_char(outs)}function cl_block(outs){cl_hash(HSIZE);free_ent=ClearCode+2;clear_flg=true;output(ClearCode,outs)}function cl_hash(hsize){for(var i=0;i<hsize;++i)htab[i]=-1}function compress(init_bits,outs){var fcode,c,i,ent,disp,hsize_reg,hshift;g_init_bits=init_bits;clear_flg=false;n_bits=g_init_bits;maxcode=MAXCODE(n_bits);ClearCode=1<<init_bits-1;EOFCode=ClearCode+1;free_ent=ClearCode+2;a_count=0;ent=nextPixel();hshift=0;for(fcode=HSIZE;fcode<65536;fcode*=2)++hshift;hshift=8-hshift;hsize_reg=HSIZE;cl_hash(hsize_reg);output(ClearCode,outs);outer_loop:while((c=nextPixel())!=EOF){fcode=(c<<BITS)+ent;i=c<<hshift^ent;if(htab[i]===fcode){ent=codetab[i];continue}else if(htab[i]>=0){disp=hsize_reg-i;if(i===0)disp=1;do{if((i-=disp)<0)i+=hsize_reg;if(htab[i]===fcode){ent=codetab[i];continue outer_loop}}while(htab[i]>=0)}output(ent,outs);ent=c;if(free_ent<1<<BITS){codetab[i]=free_ent++;htab[i]=fcode}else{cl_block(outs)}}output(ent,outs);output(EOFCode,outs)}function encode(outs){outs.writeByte(initCodeSize);remaining=width*height;curPixel=0;compress(initCodeSize+1,outs);outs.writeByte(0)}function flush_char(outs){if(a_count>0){outs.writeByte(a_count);outs.writeBytes(accum,0,a_count);a_count=0}}function MAXCODE(n_bits){return(1<<n_bits)-1}function nextPixel(){if(remaining===0)return EOF;--remaining;var pix=pixels[curPixel++];return pix&255}function output(code,outs){cur_accum&=masks[cur_bits];if(cur_bits>0)cur_accum|=code<<cur_bits;else cur_accum=code;cur_bits+=n_bits;while(cur_bits>=8){char_out(cur_accum&255,outs);cur_accum>>=8;cur_bits-=8}if(free_ent>maxcode||clear_flg){if(clear_flg){maxcode=MAXCODE(n_bits=g_init_bits);clear_flg=false}else{++n_bits;if(n_bits==BITS)maxcode=1<<BITS;else maxcode=MAXCODE(n_bits)}}if(code==EOFCode){while(cur_bits>0){char_out(cur_accum&255,outs);cur_accum>>=8;cur_bits-=8}flush_char(outs)}}this.encode=encode}module.exports=LZWEncoder},{}],6:[function(require,module,exports){(function(Buffer){var src=Buffer("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","base64");var wamodule=new WebAssembly.Module(src);var instance;var memarray;function NeuQuant(pixels,samplefac){if(!instance){var table=new WebAssembly.Table({initial:0,element:"anyfunc"});var memory=new WebAssembly.Memory({initial:1});memarray=new Uint8Array(memory.buffer);var env={};env.memoryBase=0;env.memory=memory;env.tableBase=0;env.table=table;env.memset=function(){};env._grow=function(){memarray=new Uint8Array(memory.buffer)};env._abort=function(){throw new Error("Abort")};env._exit=function(){throw new Error("Exit")};instance=new WebAssembly.Instance(wamodule,{env:env})}var pixelPtr=instance.exports.malloc(pixels.byteLength);memarray.set(pixels,pixelPtr);instance.exports.init(pixelPtr,pixels.length,samplefac);this.buildColormap=function(){instance.exports.learn();instance.exports.unbiasnet();instance.exports.inxbuild();instance.exports.free(pixelPtr)};this.getColormap=function(){var map=new Uint8Array(256*3);var mapPtr=instance.exports.getColormap();map.set(memarray.subarray(mapPtr,mapPtr+map.byteLength));return map};this.lookupRGB=instance.exports.inxsearch}module.exports=NeuQuant}).call(this,require("buffer").Buffer)},{buffer:2}],7:[function(require,module,exports){\r
var GIFEncoder,renderFrame;GIFEncoder=require("./GIFEncoder.js");renderFrame=function(frame){var encoder,page,stream,transfer;encoder=new GIFEncoder(frame.width,frame.height);if(frame.index===0){encoder.writeHeader()}else{encoder.firstFrame=false}encoder.setTransparent(frame.transparent);encoder.setDispose(frame.dispose);encoder.setRepeat(frame.repeat);encoder.setDelay(frame.delay);encoder.setQuality(frame.quality);encoder.setDither(frame.dither);encoder.setGlobalPalette(frame.globalPalette);encoder.addFrame(frame.data);if(frame.last){encoder.finish()}if(frame.globalPalette===true){frame.globalPalette=encoder.getGlobalPalette()}stream=encoder.stream();frame.data=stream.pages;frame.cursor=stream.cursor;frame.pageSize=stream.constructor.pageSize;if(frame.canTransfer){transfer=function(){var i,len,ref,results;ref=frame.data;results=[];for(i=0,len=ref.length;i<len;i++){page=ref[i];results.push(page.buffer)}return results}();return self.postMessage(frame,transfer)}else{return self.postMessage(frame)}};self.onmessage=function(event){return renderFrame(event.data)}},{"./GIFEncoder.js":4}]},{},[7]);\r
//# sourceMappingURL=gif.worker.js.map`;

// shared/modules.ts
var imgAdder = BdApi.Webpack.getByKeys("addFile");
var chatKeyHandlers = BdApi.Webpack.getAllByStrings("selectNextCommandOption");
var fileModule = BdApi.Webpack.getModule((m) => m.Z?.toString().includes("filenameLinkWrapper"));

// plugins/GifCaptioner/src/settings.ts
var settings = {
  upload: BdApi.Data.load("GifCaptioner", "upload") ?? true
};
function createSettings() {
  return BdApi.UI.buildSettingsPanel({
    settings: [
      {
        type: "switch",
        id: "upload",
        value: settings.upload,
        name: "Automatically upload gifs after rendering?",
        note: ""
      }
    ],
    onChange: (_, id, value) => {
      settings[id] = value;
      BdApi.Data.save("GifCaptioner", id, value);
    }
  });
}

// plugins/GifCaptioner/src/index.ts
var rendering = false;
var gifSelector = "video[class^='gif'], img[class^='gif']";
watchElement(gifSelector, (gif) => {
  if (gif.querySelector(".gif-captioner-btn")) return;
  let captionBtn = document.createElement("button");
  captionBtn.innerHTML = page_layout_header_default;
  captionBtn.classList.add("gif-captioner-btn");
  gif.before(captionBtn);
  BdApi.UI.createTooltip(captionBtn, "Add Custom Caption", {});
  let isVideo = gif.nodeName === "VIDEO";
  captionBtn.addEventListener("click", async (e) => {
    e.stopPropagation();
    e.preventDefault();
    let settings2 = { caption: "", fontSize: 35 };
    let src = gif.src;
    let width;
    let parsedGif;
    if (isVideo) width = gif.videoWidth;
    else {
      let res = await BdApi.Net.fetch(src);
      let buff = await res.arrayBuffer();
      parsedGif = (0, import_gifuct_js.parseGIF)(buff);
      width = parsedGif.lsd.width;
    }
    const reactEl = BdApi.React.createElement(CaptionCreator, {
      src,
      width,
      onUpdate: (caption, fontSize) => {
        settings2.caption = caption;
        settings2.fontSize = parseInt(fontSize);
      },
      isVideo
    });
    const onConfirm = () => {
      renderGif(
        src,
        settings2.caption,
        settings2.fontSize,
        isVideo,
        parsedGif
      );
      document.querySelector(
        ".expression-picker-chat-input-button > button"
      )?.click();
    };
    BdApi.UI.showConfirmationModal("Add Caption", reactEl, {
      confirmText: "Upload",
      cancelText: "Cancel",
      onConfirm
    });
  });
});
function getChannelId() {
  const channelID = location.href.split("/").pop();
  if (isNaN(Number(channelID))) return null;
  return channelID;
}
var font = new FontFace("futuraBoldCondensed", Futura_Condensed_Extra_Bold_default);
var chatKeyHandlers2 = BdApi.Webpack.getModule(
  (exports) => Object.values(exports)?.[0]?.toString?.().includes("selectNextCommandOption")
);
var submitMessage;
onStart(() => {
  document.fonts.add(font);
  BdApi.Patcher.before(
    "GifCaptioner",
    chatKeyHandlers2,
    Object.keys(chatKeyHandlers2)[0],
    (_, args) => {
      submitMessage = args[0].submit;
    }
  );
});
onStop(() => {
  document.fonts.delete(font);
  BdApi.Patcher.unpatchAll("GifCaptioner");
});
function uploadFile(channelId, file) {
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
  if (settings.upload) {
    submitMessage();
  }
}
var workerUrl = null;
onStart(() => {
  let blob = new Blob([gif_worker_default], { type: "application/javascript" });
  workerUrl = URL.createObjectURL(blob);
});
onStop(() => {
  if (workerUrl) URL.revokeObjectURL(workerUrl);
  workerUrl = null;
});
async function renderGif(originalSrc, caption, fontSize, isVideo, parsedGif) {
  if (rendering || !workerUrl) return;
  rendering = true;
  const channel = getChannelId();
  if (!channel) return;
  let progressDialog = document.createElement("dialog");
  progressDialog.id = "progressDialog";
  progressDialog.addEventListener("close", (e) => e.preventDefault());
  progressDialog.innerHTML = `
        <label for="renderProgress">Preparing...</label>
        <progress id="renderProgress" value="0" max="1"></progress> <br />
        <button id="cancelRender">Cancel</button>
    `;
  let progress = progressDialog.querySelector(
    "#renderProgress"
  );
  document.body.appendChild(progressDialog);
  progressDialog.showModal();
  let width, height, frames, duration;
  let gifFrames = [];
  let video;
  if (isVideo) {
    video = document.createElement("video");
    video.src = originalSrc;
    video.crossOrigin = "anonymous";
    await new Promise((res) => {
      video.addEventListener("canplaythrough", res, { once: true });
    });
    video.currentTime = 0;
    video.playbackRate = 16;
    video.play();
    await new Promise(
      (res) => video.addEventListener("ended", res, { once: true })
    );
    let quality = video.getVideoPlaybackQuality();
    frames = quality.totalVideoFrames;
    video.pause();
    width = video.videoWidth;
    height = video.videoHeight;
    duration = video.duration;
  } else {
    gifFrames = (0, import_gifuct_js.decompressFrames)(parsedGif, true);
    width = parsedGif.lsd.width;
    height = parsedGif.lsd.height;
    frames = gifFrames.length;
    duration = 0;
    for (let frame of gifFrames) duration += frame.delay;
  }
  console.log("Frames:", frames);
  if (duration == 0) duration = 1;
  const padding = 10;
  let renderCanvas = document.createElement("canvas");
  renderCanvas.width = width;
  let renderCtx = renderCanvas.getContext("2d");
  renderCtx.font = `${fontSize}px futuraBoldCondensed`;
  let lines = getLines(renderCtx, caption, renderCanvas.width);
  renderCanvas.height = height + lines.length * fontSize + padding * 2;
  renderCtx.font = `${fontSize}px futuraBoldCondensed`;
  renderCtx.textAlign = "center";
  renderCtx.textBaseline = "top";
  console.log("Rendering to", renderCanvas.width, "x", renderCanvas.height);
  const maxSize = 1e7;
  const estSize = frames * renderCanvas.width * renderCanvas.height;
  console.log("Estimated size:", estSize);
  const factor = Math.max(1, Math.sqrt(estSize / maxSize));
  const newWidth = Math.floor(renderCanvas.width / factor);
  const newHeight = Math.floor(renderCanvas.height / factor);
  console.log(
    "Scaling down by a factor of",
    factor,
    "to",
    newWidth,
    "x",
    newHeight
  );
  let gif = new import_gif.default({
    quality: 10,
    width: newWidth,
    height: newHeight,
    workerScript: workerUrl
  });
  let aborted = false;
  progressDialog.querySelector("#cancelRender").addEventListener("click", () => {
    if (gif.running) gif.abort();
    aborted = true;
    document.body.removeChild(progressDialog);
  });
  gif.on("progress", (e) => {
    progress.value = e;
  });
  gif.on("finished", (blob) => {
    rendering = false;
    document.body.removeChild(progressDialog);
    console.log("Final size:", blob.size);
    let file = new File([blob], "rendered.gif", { type: "image/gif" });
    uploadFile(channel, file);
  });
  let fps = frames / duration;
  let scaledCanvas = document.createElement("canvas");
  let scaledCtx = scaledCanvas.getContext("2d");
  scaledCanvas.width = newWidth;
  scaledCanvas.height = newHeight;
  progressDialog.querySelector("label").innerHTML = "Rendering...";
  renderCtx.fillStyle = "white";
  renderCtx.fillRect(0, 0, renderCanvas.width, renderCanvas.height);
  renderCtx.font = `${fontSize}px futuraBoldCondensed`;
  renderCtx.fillStyle = "black";
  for (let i = 0; i < lines.length; i++) {
    renderCtx.fillText(
      lines[i],
      renderCanvas.width / 2,
      i * fontSize + padding
    );
  }
  const captionHeight = lines.length * fontSize + padding * 2;
  let tempC = document.createElement("canvas");
  let tempCtx = tempC.getContext("2d");
  let frameImageData;
  let needsDisposal = false;
  for (let frame = 0; frame < frames; frame++) {
    if (aborted) break;
    if (needsDisposal) {
      renderCtx.clearRect(
        0,
        captionHeight,
        renderCanvas.width,
        renderCanvas.height
      );
      needsDisposal = false;
    }
    if (isVideo) {
      video.currentTime = frame * 1 / fps + Number.MIN_VALUE;
      await new Promise(
        (res) => video.addEventListener("seeked", res, { once: true })
      );
      renderCtx.drawImage(video, 0, captionHeight);
    } else {
      let gifFrame = gifFrames[frame];
      if (gifFrame.disposalType == 2) {
        needsDisposal = true;
      }
      if (!frameImageData || gifFrame.dims.width != frameImageData.width || gifFrame.dims.height != frameImageData.height) {
        tempC.width = gifFrame.dims.width;
        tempC.height = gifFrame.dims.height;
        frameImageData = tempCtx.createImageData(
          gifFrame.dims.width,
          gifFrame.dims.height
        );
      }
      frameImageData.data.set(gifFrame.patch);
      tempCtx.putImageData(frameImageData, 0, 0);
      renderCtx.drawImage(
        tempC,
        gifFrame.dims.left,
        gifFrame.dims.top + captionHeight
      );
    }
    scaledCtx.drawImage(renderCanvas, 0, 0, newWidth, newHeight);
    if (isVideo) {
      gif.addFrame(scaledCtx, { delay: 1 / fps * 1e3, copy: true });
    } else {
      gif.addFrame(scaledCtx, {
        delay: gifFrames[frame].delay,
        copy: true
      });
    }
    progress.value = frame / frames;
  }
  progressDialog.querySelector("label").innerHTML = "Encoding...";
  gif.render();
}
onStart(() => {
  BdApi.DOM.addStyle("gif-captioner-style", styles_default);
});
onStop(() => {
  BdApi.DOM.removeStyle("gif-captioner-style");
  let btns = document.querySelectorAll(".gif-captioner-btn");
  for (let btn of btns) {
    btn.remove();
  }
});
setSettingsPanel(createSettings);
  }
}
