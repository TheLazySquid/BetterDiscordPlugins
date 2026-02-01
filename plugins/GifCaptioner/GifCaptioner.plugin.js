/**
 * @name GifCaptioner
 * @description A BetterDiscord plugin that allows you to add a caption to discord gifs
 * @version 2.1.2
 * @author TheLazySquid
 * @authorId 619261917352951815
 * @website https://github.com/TheLazySquid/BetterDiscordPlugins
 * @source https://github.com/TheLazySquid/BetterDiscordPlugins/tree/main/plugins/GifCaptioner/GifCaptioner.plugin.js
 * @invite fKdAaFYbD5
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
            var worker2;
            while (true) {
              worker2 = this.activeWorkers.shift();
              if (worker2 == null) {
                break;
              }
              this.log("killing active worker");
              worker2.terminate();
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
                var worker2;
                _this.log("spawning worker " + i);
                worker2 = new Worker(_this.options.workerScript);
                worker2.onmessage = function(event) {
                  _this.activeWorkers.splice(_this.activeWorkers.indexOf(worker2), 1);
                  _this.freeWorkers.push(worker2);
                  return _this.frameFinished(event.data);
                };
                return _this.freeWorkers.push(worker2);
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
            var frame, task, worker2;
            if (this.freeWorkers.length === 0) {
              throw new Error("No free workers");
            }
            if (this.nextFrame >= this.frames.length) {
              return;
            }
            frame = this.frames[this.nextFrame++];
            worker2 = this.freeWorkers.shift();
            task = this.getTask(frame);
            this.log("starting frame " + (task.index + 1) + " of " + this.frames.length);
            this.activeWorkers.push(worker2);
            return worker2.postMessage(task);
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
      var datum, bits, count2, first, top, pi, bi;
      datum = bits = count2 = first = top = pi = bi = 0;
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

// assets/Futura Condensed Extra Bold.otf
var Futura_Condensed_Extra_Bold_default = __toBinary("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");

// meta-ns:meta
var pluginName = "GifCaptioner";

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

// shared/api/fonts.ts
function addFont(data, family) {
  onStart(() => {
    for (let font2 of document.fonts) {
      if (font2.family === family) return;
    }
    let font = new FontFace(family, data);
    document.fonts.add(font);
    onStop(() => {
      document.fonts.delete(font);
    }, true);
  });
}

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

// shared/api/toast.ts
function error(message) {
  BdApi.UI.showToast(message, { type: "error" });
}

// shared/util/modules.ts
function demangle(module, demangler) {
  let returned = {};
  let values = Object.values(module);
  for (let id in demangler) {
    for (let i = 0; i < values.length; i++) {
      if (demangler[id](values[i])) {
        returned[id] = values[i];
        break;
      }
    }
  }
  return returned;
}
function findExport(module, filter) {
  for (let value of Object.values(module)) {
    if (filter === true || filter(value)) return value;
  }
}
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
var [chatboxModule, CloudUploaderModule, expressionPickerMangled, gifDisplayModule, ModalSystemMangled, ModalMangled, maxUploadSizeModule] = getModules([
  {
    id: 133343,
    filter: (m) => Object.values(m).some((e) => {
      let str = e?.type?.render?.toString?.();
      if (!str) return false;
      return str.includes("pendingScheduledMessage") && str.includes(".CHANNEL_TEXT_AREA");
    })
  },
  {
    id: 743445,
    filter: (m) => Object.values(m).some((e) => e?.UPLOADING === "UPLOADING")
  },
  {
    id: 151271,
    filter: Filters.bySource("lastActiveView", "isSearchSuggestion")
  },
  {
    id: 247683,
    filter: (m) => Object.values(m).some(Filters.byStrings("renderGIF()", "imagePool"))
  },
  {
    id: 192308,
    filter: Filters.bySource(".modalKey?")
  },
  {
    id: 935462,
    filter: Filters.bySource(".MODAL_ROOT_LEGACY,properties")
  },
  {
    id: 453771,
    filter: Filters.bySource("getUserMaxFileSize", "premiumTier")
  }
]);
var chatbox = findExport(chatboxModule, (e) => e.type);
var CloudUploader = findExport(CloudUploaderModule, (e) => e.fromJson);
var expressionPicker = demangle(expressionPickerMangled, {
  toggle: (f) => f.toString().includes("activeView==="),
  close: (f) => f.toString().includes("activeView:null"),
  store: (f) => f.getState
});
var gifDisplay = findExport(gifDisplayModule, (e) => e.prototype?.renderGIF);
var ModalSystem = demangle(ModalSystemMangled, {
  open: Filters.byStrings(",instant:"),
  close: Filters.byStrings(".onCloseCallback()")
});
var Modal = demangle(ModalMangled, {
  Root: Filters.byStrings(".ImpressionNames.MODAL_ROOT_LEGACY"),
  Content: Filters.byStrings("scrollerRef", "scrollbarType"),
  Header: Filters.byStrings("headerIdIsManaged"),
  Close: Filters.byStrings(".withCircleBackground"),
  Footer: Filters.byStrings("grow:0")
});
var maxUploadSize = findExport(maxUploadSizeModule, Filters.byStrings("getUserMaxFileSize", "premiumTier"));

// plugins/GifCaptioner/src/gif.worker.txt
var gif_worker_default = `// gif.worker.js 0.2.0-wasm - https://github.com/jnordberg/gif.js
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){"use strict";exports.byteLength=byteLength;exports.toByteArray=toByteArray;exports.fromByteArray=fromByteArray;var lookup=[];var revLookup=[];var Arr=typeof Uint8Array!=="undefined"?Uint8Array:Array;var code="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";for(var i=0,len=code.length;i<len;++i){lookup[i]=code[i];revLookup[code.charCodeAt(i)]=i}revLookup["-".charCodeAt(0)]=62;revLookup["_".charCodeAt(0)]=63;function placeHoldersCount(b64){var len=b64.length;if(len%4>0){throw new Error("Invalid string. Length must be a multiple of 4")}return b64[len-2]==="="?2:b64[len-1]==="="?1:0}function byteLength(b64){return b64.length*3/4-placeHoldersCount(b64)}function toByteArray(b64){var i,j,l,tmp,placeHolders,arr;var len=b64.length;placeHolders=placeHoldersCount(b64);arr=new Arr(len*3/4-placeHolders);l=placeHolders>0?len-4:len;var L=0;for(i=0,j=0;i<l;i+=4,j+=3){tmp=revLookup[b64.charCodeAt(i)]<<18|revLookup[b64.charCodeAt(i+1)]<<12|revLookup[b64.charCodeAt(i+2)]<<6|revLookup[b64.charCodeAt(i+3)];arr[L++]=tmp>>16&255;arr[L++]=tmp>>8&255;arr[L++]=tmp&255}if(placeHolders===2){tmp=revLookup[b64.charCodeAt(i)]<<2|revLookup[b64.charCodeAt(i+1)]>>4;arr[L++]=tmp&255}else if(placeHolders===1){tmp=revLookup[b64.charCodeAt(i)]<<10|revLookup[b64.charCodeAt(i+1)]<<4|revLookup[b64.charCodeAt(i+2)]>>2;arr[L++]=tmp>>8&255;arr[L++]=tmp&255}return arr}function tripletToBase64(num){return lookup[num>>18&63]+lookup[num>>12&63]+lookup[num>>6&63]+lookup[num&63]}function encodeChunk(uint8,start,end){var tmp;var output=[];for(var i=start;i<end;i+=3){tmp=(uint8[i]<<16)+(uint8[i+1]<<8)+uint8[i+2];output.push(tripletToBase64(tmp))}return output.join("")}function fromByteArray(uint8){var tmp;var len=uint8.length;var extraBytes=len%3;var output="";var parts=[];var maxChunkLength=16383;for(var i=0,len2=len-extraBytes;i<len2;i+=maxChunkLength){parts.push(encodeChunk(uint8,i,i+maxChunkLength>len2?len2:i+maxChunkLength))}if(extraBytes===1){tmp=uint8[len-1];output+=lookup[tmp>>2];output+=lookup[tmp<<4&63];output+="=="}else if(extraBytes===2){tmp=(uint8[len-2]<<8)+uint8[len-1];output+=lookup[tmp>>10];output+=lookup[tmp>>4&63];output+=lookup[tmp<<2&63];output+="="}parts.push(output);return parts.join("")}},{}],2:[function(require,module,exports){"use strict";var base64=require("base64-js");var ieee754=require("ieee754");exports.Buffer=Buffer;exports.SlowBuffer=SlowBuffer;exports.INSPECT_MAX_BYTES=50;var K_MAX_LENGTH=2147483647;exports.kMaxLength=K_MAX_LENGTH;Buffer.TYPED_ARRAY_SUPPORT=typedArraySupport();if(!Buffer.TYPED_ARRAY_SUPPORT&&typeof console!=="undefined"&&typeof console.error==="function"){console.error("This browser lacks typed array (Uint8Array) support which is required by "+"\`buffer\` v5.x. Use \`buffer\` v4.x if you require old browser support.")}function typedArraySupport(){try{var arr=new Uint8Array(1);arr.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}};return arr.foo()===42}catch(e){return false}}function createBuffer(length){if(length>K_MAX_LENGTH){throw new RangeError("Invalid typed array length")}var buf=new Uint8Array(length);buf.__proto__=Buffer.prototype;return buf}function Buffer(arg,encodingOrOffset,length){if(typeof arg==="number"){if(typeof encodingOrOffset==="string"){throw new Error("If encoding is specified then the first argument must be a string")}return allocUnsafe(arg)}return from(arg,encodingOrOffset,length)}if(typeof Symbol!=="undefined"&&Symbol.species&&Buffer[Symbol.species]===Buffer){Object.defineProperty(Buffer,Symbol.species,{value:null,configurable:true,enumerable:false,writable:false})}Buffer.poolSize=8192;function from(value,encodingOrOffset,length){if(typeof value==="number"){throw new TypeError('"value" argument must not be a number')}if(value instanceof ArrayBuffer){return fromArrayBuffer(value,encodingOrOffset,length)}if(typeof value==="string"){return fromString(value,encodingOrOffset)}return fromObject(value)}Buffer.from=function(value,encodingOrOffset,length){return from(value,encodingOrOffset,length)};Buffer.prototype.__proto__=Uint8Array.prototype;Buffer.__proto__=Uint8Array;function assertSize(size){if(typeof size!=="number"){throw new TypeError('"size" argument must be a number')}else if(size<0){throw new RangeError('"size" argument must not be negative')}}function alloc(size,fill,encoding){assertSize(size);if(size<=0){return createBuffer(size)}if(fill!==undefined){return typeof encoding==="string"?createBuffer(size).fill(fill,encoding):createBuffer(size).fill(fill)}return createBuffer(size)}Buffer.alloc=function(size,fill,encoding){return alloc(size,fill,encoding)};function allocUnsafe(size){assertSize(size);return createBuffer(size<0?0:checked(size)|0)}Buffer.allocUnsafe=function(size){return allocUnsafe(size)};Buffer.allocUnsafeSlow=function(size){return allocUnsafe(size)};function fromString(string,encoding){if(typeof encoding!=="string"||encoding===""){encoding="utf8"}if(!Buffer.isEncoding(encoding)){throw new TypeError('"encoding" must be a valid string encoding')}var length=byteLength(string,encoding)|0;var buf=createBuffer(length);var actual=buf.write(string,encoding);if(actual!==length){buf=buf.slice(0,actual)}return buf}function fromArrayLike(array){var length=array.length<0?0:checked(array.length)|0;var buf=createBuffer(length);for(var i=0;i<length;i+=1){buf[i]=array[i]&255}return buf}function fromArrayBuffer(array,byteOffset,length){if(byteOffset<0||array.byteLength<byteOffset){throw new RangeError("'offset' is out of bounds")}if(array.byteLength<byteOffset+(length||0)){throw new RangeError("'length' is out of bounds")}var buf;if(byteOffset===undefined&&length===undefined){buf=new Uint8Array(array)}else if(length===undefined){buf=new Uint8Array(array,byteOffset)}else{buf=new Uint8Array(array,byteOffset,length)}buf.__proto__=Buffer.prototype;return buf}function fromObject(obj){if(Buffer.isBuffer(obj)){var len=checked(obj.length)|0;var buf=createBuffer(len);if(buf.length===0){return buf}obj.copy(buf,0,0,len);return buf}if(obj){if(isArrayBufferView(obj)||"length"in obj){if(typeof obj.length!=="number"||numberIsNaN(obj.length)){return createBuffer(0)}return fromArrayLike(obj)}if(obj.type==="Buffer"&&Array.isArray(obj.data)){return fromArrayLike(obj.data)}}throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}function checked(length){if(length>=K_MAX_LENGTH){throw new RangeError("Attempt to allocate Buffer larger than maximum "+"size: 0x"+K_MAX_LENGTH.toString(16)+" bytes")}return length|0}function SlowBuffer(length){if(+length!=length){length=0}return Buffer.alloc(+length)}Buffer.isBuffer=function isBuffer(b){return b!=null&&b._isBuffer===true};Buffer.compare=function compare(a,b){if(!Buffer.isBuffer(a)||!Buffer.isBuffer(b)){throw new TypeError("Arguments must be Buffers")}if(a===b)return 0;var x=a.length;var y=b.length;for(var i=0,len=Math.min(x,y);i<len;++i){if(a[i]!==b[i]){x=a[i];y=b[i];break}}if(x<y)return-1;if(y<x)return 1;return 0};Buffer.isEncoding=function isEncoding(encoding){switch(String(encoding).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return true;default:return false}};Buffer.concat=function concat(list,length){if(!Array.isArray(list)){throw new TypeError('"list" argument must be an Array of Buffers')}if(list.length===0){return Buffer.alloc(0)}var i;if(length===undefined){length=0;for(i=0;i<list.length;++i){length+=list[i].length}}var buffer=Buffer.allocUnsafe(length);var pos=0;for(i=0;i<list.length;++i){var buf=list[i];if(!Buffer.isBuffer(buf)){throw new TypeError('"list" argument must be an Array of Buffers')}buf.copy(buffer,pos);pos+=buf.length}return buffer};function byteLength(string,encoding){if(Buffer.isBuffer(string)){return string.length}if(isArrayBufferView(string)||string instanceof ArrayBuffer){return string.byteLength}if(typeof string!=="string"){string=""+string}var len=string.length;if(len===0)return 0;var loweredCase=false;for(;;){switch(encoding){case"ascii":case"latin1":case"binary":return len;case"utf8":case"utf-8":case undefined:return utf8ToBytes(string).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return len*2;case"hex":return len>>>1;case"base64":return base64ToBytes(string).length;default:if(loweredCase)return utf8ToBytes(string).length;encoding=(""+encoding).toLowerCase();loweredCase=true}}}Buffer.byteLength=byteLength;function slowToString(encoding,start,end){var loweredCase=false;if(start===undefined||start<0){start=0}if(start>this.length){return""}if(end===undefined||end>this.length){end=this.length}if(end<=0){return""}end>>>=0;start>>>=0;if(end<=start){return""}if(!encoding)encoding="utf8";while(true){switch(encoding){case"hex":return hexSlice(this,start,end);case"utf8":case"utf-8":return utf8Slice(this,start,end);case"ascii":return asciiSlice(this,start,end);case"latin1":case"binary":return latin1Slice(this,start,end);case"base64":return base64Slice(this,start,end);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return utf16leSlice(this,start,end);default:if(loweredCase)throw new TypeError("Unknown encoding: "+encoding);encoding=(encoding+"").toLowerCase();loweredCase=true}}}Buffer.prototype._isBuffer=true;function swap(b,n,m){var i=b[n];b[n]=b[m];b[m]=i}Buffer.prototype.swap16=function swap16(){var len=this.length;if(len%2!==0){throw new RangeError("Buffer size must be a multiple of 16-bits")}for(var i=0;i<len;i+=2){swap(this,i,i+1)}return this};Buffer.prototype.swap32=function swap32(){var len=this.length;if(len%4!==0){throw new RangeError("Buffer size must be a multiple of 32-bits")}for(var i=0;i<len;i+=4){swap(this,i,i+3);swap(this,i+1,i+2)}return this};Buffer.prototype.swap64=function swap64(){var len=this.length;if(len%8!==0){throw new RangeError("Buffer size must be a multiple of 64-bits")}for(var i=0;i<len;i+=8){swap(this,i,i+7);swap(this,i+1,i+6);swap(this,i+2,i+5);swap(this,i+3,i+4)}return this};Buffer.prototype.toString=function toString(){var length=this.length;if(length===0)return"";if(arguments.length===0)return utf8Slice(this,0,length);return slowToString.apply(this,arguments)};Buffer.prototype.equals=function equals(b){if(!Buffer.isBuffer(b))throw new TypeError("Argument must be a Buffer");if(this===b)return true;return Buffer.compare(this,b)===0};Buffer.prototype.inspect=function inspect(){var str="";var max=exports.INSPECT_MAX_BYTES;if(this.length>0){str=this.toString("hex",0,max).match(/.{2}/g).join(" ");if(this.length>max)str+=" ... "}return"<Buffer "+str+">"};Buffer.prototype.compare=function compare(target,start,end,thisStart,thisEnd){if(!Buffer.isBuffer(target)){throw new TypeError("Argument must be a Buffer")}if(start===undefined){start=0}if(end===undefined){end=target?target.length:0}if(thisStart===undefined){thisStart=0}if(thisEnd===undefined){thisEnd=this.length}if(start<0||end>target.length||thisStart<0||thisEnd>this.length){throw new RangeError("out of range index")}if(thisStart>=thisEnd&&start>=end){return 0}if(thisStart>=thisEnd){return-1}if(start>=end){return 1}start>>>=0;end>>>=0;thisStart>>>=0;thisEnd>>>=0;if(this===target)return 0;var x=thisEnd-thisStart;var y=end-start;var len=Math.min(x,y);var thisCopy=this.slice(thisStart,thisEnd);var targetCopy=target.slice(start,end);for(var i=0;i<len;++i){if(thisCopy[i]!==targetCopy[i]){x=thisCopy[i];y=targetCopy[i];break}}if(x<y)return-1;if(y<x)return 1;return 0};function bidirectionalIndexOf(buffer,val,byteOffset,encoding,dir){if(buffer.length===0)return-1;if(typeof byteOffset==="string"){encoding=byteOffset;byteOffset=0}else if(byteOffset>2147483647){byteOffset=2147483647}else if(byteOffset<-2147483648){byteOffset=-2147483648}byteOffset=+byteOffset;if(numberIsNaN(byteOffset)){byteOffset=dir?0:buffer.length-1}if(byteOffset<0)byteOffset=buffer.length+byteOffset;if(byteOffset>=buffer.length){if(dir)return-1;else byteOffset=buffer.length-1}else if(byteOffset<0){if(dir)byteOffset=0;else return-1}if(typeof val==="string"){val=Buffer.from(val,encoding)}if(Buffer.isBuffer(val)){if(val.length===0){return-1}return arrayIndexOf(buffer,val,byteOffset,encoding,dir)}else if(typeof val==="number"){val=val&255;if(typeof Uint8Array.prototype.indexOf==="function"){if(dir){return Uint8Array.prototype.indexOf.call(buffer,val,byteOffset)}else{return Uint8Array.prototype.lastIndexOf.call(buffer,val,byteOffset)}}return arrayIndexOf(buffer,[val],byteOffset,encoding,dir)}throw new TypeError("val must be string, number or Buffer")}function arrayIndexOf(arr,val,byteOffset,encoding,dir){var indexSize=1;var arrLength=arr.length;var valLength=val.length;if(encoding!==undefined){encoding=String(encoding).toLowerCase();if(encoding==="ucs2"||encoding==="ucs-2"||encoding==="utf16le"||encoding==="utf-16le"){if(arr.length<2||val.length<2){return-1}indexSize=2;arrLength/=2;valLength/=2;byteOffset/=2}}function read(buf,i){if(indexSize===1){return buf[i]}else{return buf.readUInt16BE(i*indexSize)}}var i;if(dir){var foundIndex=-1;for(i=byteOffset;i<arrLength;i++){if(read(arr,i)===read(val,foundIndex===-1?0:i-foundIndex)){if(foundIndex===-1)foundIndex=i;if(i-foundIndex+1===valLength)return foundIndex*indexSize}else{if(foundIndex!==-1)i-=i-foundIndex;foundIndex=-1}}}else{if(byteOffset+valLength>arrLength)byteOffset=arrLength-valLength;for(i=byteOffset;i>=0;i--){var found=true;for(var j=0;j<valLength;j++){if(read(arr,i+j)!==read(val,j)){found=false;break}}if(found)return i}}return-1}Buffer.prototype.includes=function includes(val,byteOffset,encoding){return this.indexOf(val,byteOffset,encoding)!==-1};Buffer.prototype.indexOf=function indexOf(val,byteOffset,encoding){return bidirectionalIndexOf(this,val,byteOffset,encoding,true)};Buffer.prototype.lastIndexOf=function lastIndexOf(val,byteOffset,encoding){return bidirectionalIndexOf(this,val,byteOffset,encoding,false)};function hexWrite(buf,string,offset,length){offset=Number(offset)||0;var remaining=buf.length-offset;if(!length){length=remaining}else{length=Number(length);if(length>remaining){length=remaining}}var strLen=string.length;if(strLen%2!==0)throw new TypeError("Invalid hex string");if(length>strLen/2){length=strLen/2}for(var i=0;i<length;++i){var parsed=parseInt(string.substr(i*2,2),16);if(numberIsNaN(parsed))return i;buf[offset+i]=parsed}return i}function utf8Write(buf,string,offset,length){return blitBuffer(utf8ToBytes(string,buf.length-offset),buf,offset,length)}function asciiWrite(buf,string,offset,length){return blitBuffer(asciiToBytes(string),buf,offset,length)}function latin1Write(buf,string,offset,length){return asciiWrite(buf,string,offset,length)}function base64Write(buf,string,offset,length){return blitBuffer(base64ToBytes(string),buf,offset,length)}function ucs2Write(buf,string,offset,length){return blitBuffer(utf16leToBytes(string,buf.length-offset),buf,offset,length)}Buffer.prototype.write=function write(string,offset,length,encoding){if(offset===undefined){encoding="utf8";length=this.length;offset=0}else if(length===undefined&&typeof offset==="string"){encoding=offset;length=this.length;offset=0}else if(isFinite(offset)){offset=offset>>>0;if(isFinite(length)){length=length>>>0;if(encoding===undefined)encoding="utf8"}else{encoding=length;length=undefined}}else{throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported")}var remaining=this.length-offset;if(length===undefined||length>remaining)length=remaining;if(string.length>0&&(length<0||offset<0)||offset>this.length){throw new RangeError("Attempt to write outside buffer bounds")}if(!encoding)encoding="utf8";var loweredCase=false;for(;;){switch(encoding){case"hex":return hexWrite(this,string,offset,length);case"utf8":case"utf-8":return utf8Write(this,string,offset,length);case"ascii":return asciiWrite(this,string,offset,length);case"latin1":case"binary":return latin1Write(this,string,offset,length);case"base64":return base64Write(this,string,offset,length);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return ucs2Write(this,string,offset,length);default:if(loweredCase)throw new TypeError("Unknown encoding: "+encoding);encoding=(""+encoding).toLowerCase();loweredCase=true}}};Buffer.prototype.toJSON=function toJSON(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};function base64Slice(buf,start,end){if(start===0&&end===buf.length){return base64.fromByteArray(buf)}else{return base64.fromByteArray(buf.slice(start,end))}}function utf8Slice(buf,start,end){end=Math.min(buf.length,end);var res=[];var i=start;while(i<end){var firstByte=buf[i];var codePoint=null;var bytesPerSequence=firstByte>239?4:firstByte>223?3:firstByte>191?2:1;if(i+bytesPerSequence<=end){var secondByte,thirdByte,fourthByte,tempCodePoint;switch(bytesPerSequence){case 1:if(firstByte<128){codePoint=firstByte}break;case 2:secondByte=buf[i+1];if((secondByte&192)===128){tempCodePoint=(firstByte&31)<<6|secondByte&63;if(tempCodePoint>127){codePoint=tempCodePoint}}break;case 3:secondByte=buf[i+1];thirdByte=buf[i+2];if((secondByte&192)===128&&(thirdByte&192)===128){tempCodePoint=(firstByte&15)<<12|(secondByte&63)<<6|thirdByte&63;if(tempCodePoint>2047&&(tempCodePoint<55296||tempCodePoint>57343)){codePoint=tempCodePoint}}break;case 4:secondByte=buf[i+1];thirdByte=buf[i+2];fourthByte=buf[i+3];if((secondByte&192)===128&&(thirdByte&192)===128&&(fourthByte&192)===128){tempCodePoint=(firstByte&15)<<18|(secondByte&63)<<12|(thirdByte&63)<<6|fourthByte&63;if(tempCodePoint>65535&&tempCodePoint<1114112){codePoint=tempCodePoint}}}}if(codePoint===null){codePoint=65533;bytesPerSequence=1}else if(codePoint>65535){codePoint-=65536;res.push(codePoint>>>10&1023|55296);codePoint=56320|codePoint&1023}res.push(codePoint);i+=bytesPerSequence}return decodeCodePointsArray(res)}var MAX_ARGUMENTS_LENGTH=4096;function decodeCodePointsArray(codePoints){var len=codePoints.length;if(len<=MAX_ARGUMENTS_LENGTH){return String.fromCharCode.apply(String,codePoints)}var res="";var i=0;while(i<len){res+=String.fromCharCode.apply(String,codePoints.slice(i,i+=MAX_ARGUMENTS_LENGTH))}return res}function asciiSlice(buf,start,end){var ret="";end=Math.min(buf.length,end);for(var i=start;i<end;++i){ret+=String.fromCharCode(buf[i]&127)}return ret}function latin1Slice(buf,start,end){var ret="";end=Math.min(buf.length,end);for(var i=start;i<end;++i){ret+=String.fromCharCode(buf[i])}return ret}function hexSlice(buf,start,end){var len=buf.length;if(!start||start<0)start=0;if(!end||end<0||end>len)end=len;var out="";for(var i=start;i<end;++i){out+=toHex(buf[i])}return out}function utf16leSlice(buf,start,end){var bytes=buf.slice(start,end);var res="";for(var i=0;i<bytes.length;i+=2){res+=String.fromCharCode(bytes[i]+bytes[i+1]*256)}return res}Buffer.prototype.slice=function slice(start,end){var len=this.length;start=~~start;end=end===undefined?len:~~end;if(start<0){start+=len;if(start<0)start=0}else if(start>len){start=len}if(end<0){end+=len;if(end<0)end=0}else if(end>len){end=len}if(end<start)end=start;var newBuf=this.subarray(start,end);newBuf.__proto__=Buffer.prototype;return newBuf};function checkOffset(offset,ext,length){if(offset%1!==0||offset<0)throw new RangeError("offset is not uint");if(offset+ext>length)throw new RangeError("Trying to access beyond buffer length")}Buffer.prototype.readUIntLE=function readUIntLE(offset,byteLength,noAssert){offset=offset>>>0;byteLength=byteLength>>>0;if(!noAssert)checkOffset(offset,byteLength,this.length);var val=this[offset];var mul=1;var i=0;while(++i<byteLength&&(mul*=256)){val+=this[offset+i]*mul}return val};Buffer.prototype.readUIntBE=function readUIntBE(offset,byteLength,noAssert){offset=offset>>>0;byteLength=byteLength>>>0;if(!noAssert){checkOffset(offset,byteLength,this.length)}var val=this[offset+--byteLength];var mul=1;while(byteLength>0&&(mul*=256)){val+=this[offset+--byteLength]*mul}return val};Buffer.prototype.readUInt8=function readUInt8(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,1,this.length);return this[offset]};Buffer.prototype.readUInt16LE=function readUInt16LE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,2,this.length);return this[offset]|this[offset+1]<<8};Buffer.prototype.readUInt16BE=function readUInt16BE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,2,this.length);return this[offset]<<8|this[offset+1]};Buffer.prototype.readUInt32LE=function readUInt32LE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,4,this.length);return(this[offset]|this[offset+1]<<8|this[offset+2]<<16)+this[offset+3]*16777216};Buffer.prototype.readUInt32BE=function readUInt32BE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,4,this.length);return this[offset]*16777216+(this[offset+1]<<16|this[offset+2]<<8|this[offset+3])};Buffer.prototype.readIntLE=function readIntLE(offset,byteLength,noAssert){offset=offset>>>0;byteLength=byteLength>>>0;if(!noAssert)checkOffset(offset,byteLength,this.length);var val=this[offset];var mul=1;var i=0;while(++i<byteLength&&(mul*=256)){val+=this[offset+i]*mul}mul*=128;if(val>=mul)val-=Math.pow(2,8*byteLength);return val};Buffer.prototype.readIntBE=function readIntBE(offset,byteLength,noAssert){offset=offset>>>0;byteLength=byteLength>>>0;if(!noAssert)checkOffset(offset,byteLength,this.length);var i=byteLength;var mul=1;var val=this[offset+--i];while(i>0&&(mul*=256)){val+=this[offset+--i]*mul}mul*=128;if(val>=mul)val-=Math.pow(2,8*byteLength);return val};Buffer.prototype.readInt8=function readInt8(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,1,this.length);if(!(this[offset]&128))return this[offset];return(255-this[offset]+1)*-1};Buffer.prototype.readInt16LE=function readInt16LE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,2,this.length);var val=this[offset]|this[offset+1]<<8;return val&32768?val|4294901760:val};Buffer.prototype.readInt16BE=function readInt16BE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,2,this.length);var val=this[offset+1]|this[offset]<<8;return val&32768?val|4294901760:val};Buffer.prototype.readInt32LE=function readInt32LE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,4,this.length);return this[offset]|this[offset+1]<<8|this[offset+2]<<16|this[offset+3]<<24};Buffer.prototype.readInt32BE=function readInt32BE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,4,this.length);return this[offset]<<24|this[offset+1]<<16|this[offset+2]<<8|this[offset+3]};Buffer.prototype.readFloatLE=function readFloatLE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,4,this.length);return ieee754.read(this,offset,true,23,4)};Buffer.prototype.readFloatBE=function readFloatBE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,4,this.length);return ieee754.read(this,offset,false,23,4)};Buffer.prototype.readDoubleLE=function readDoubleLE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,8,this.length);return ieee754.read(this,offset,true,52,8)};Buffer.prototype.readDoubleBE=function readDoubleBE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,8,this.length);return ieee754.read(this,offset,false,52,8)};function checkInt(buf,value,offset,ext,max,min){if(!Buffer.isBuffer(buf))throw new TypeError('"buffer" argument must be a Buffer instance');if(value>max||value<min)throw new RangeError('"value" argument is out of bounds');if(offset+ext>buf.length)throw new RangeError("Index out of range")}Buffer.prototype.writeUIntLE=function writeUIntLE(value,offset,byteLength,noAssert){value=+value;offset=offset>>>0;byteLength=byteLength>>>0;if(!noAssert){var maxBytes=Math.pow(2,8*byteLength)-1;checkInt(this,value,offset,byteLength,maxBytes,0)}var mul=1;var i=0;this[offset]=value&255;while(++i<byteLength&&(mul*=256)){this[offset+i]=value/mul&255}return offset+byteLength};Buffer.prototype.writeUIntBE=function writeUIntBE(value,offset,byteLength,noAssert){value=+value;offset=offset>>>0;byteLength=byteLength>>>0;if(!noAssert){var maxBytes=Math.pow(2,8*byteLength)-1;checkInt(this,value,offset,byteLength,maxBytes,0)}var i=byteLength-1;var mul=1;this[offset+i]=value&255;while(--i>=0&&(mul*=256)){this[offset+i]=value/mul&255}return offset+byteLength};Buffer.prototype.writeUInt8=function writeUInt8(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,1,255,0);this[offset]=value&255;return offset+1};Buffer.prototype.writeUInt16LE=function writeUInt16LE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,2,65535,0);this[offset]=value&255;this[offset+1]=value>>>8;return offset+2};Buffer.prototype.writeUInt16BE=function writeUInt16BE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,2,65535,0);this[offset]=value>>>8;this[offset+1]=value&255;return offset+2};Buffer.prototype.writeUInt32LE=function writeUInt32LE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,4,4294967295,0);this[offset+3]=value>>>24;this[offset+2]=value>>>16;this[offset+1]=value>>>8;this[offset]=value&255;return offset+4};Buffer.prototype.writeUInt32BE=function writeUInt32BE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,4,4294967295,0);this[offset]=value>>>24;this[offset+1]=value>>>16;this[offset+2]=value>>>8;this[offset+3]=value&255;return offset+4};Buffer.prototype.writeIntLE=function writeIntLE(value,offset,byteLength,noAssert){value=+value;offset=offset>>>0;if(!noAssert){var limit=Math.pow(2,8*byteLength-1);checkInt(this,value,offset,byteLength,limit-1,-limit)}var i=0;var mul=1;var sub=0;this[offset]=value&255;while(++i<byteLength&&(mul*=256)){if(value<0&&sub===0&&this[offset+i-1]!==0){sub=1}this[offset+i]=(value/mul>>0)-sub&255}return offset+byteLength};Buffer.prototype.writeIntBE=function writeIntBE(value,offset,byteLength,noAssert){value=+value;offset=offset>>>0;if(!noAssert){var limit=Math.pow(2,8*byteLength-1);checkInt(this,value,offset,byteLength,limit-1,-limit)}var i=byteLength-1;var mul=1;var sub=0;this[offset+i]=value&255;while(--i>=0&&(mul*=256)){if(value<0&&sub===0&&this[offset+i+1]!==0){sub=1}this[offset+i]=(value/mul>>0)-sub&255}return offset+byteLength};Buffer.prototype.writeInt8=function writeInt8(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,1,127,-128);if(value<0)value=255+value+1;this[offset]=value&255;return offset+1};Buffer.prototype.writeInt16LE=function writeInt16LE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,2,32767,-32768);this[offset]=value&255;this[offset+1]=value>>>8;return offset+2};Buffer.prototype.writeInt16BE=function writeInt16BE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,2,32767,-32768);this[offset]=value>>>8;this[offset+1]=value&255;return offset+2};Buffer.prototype.writeInt32LE=function writeInt32LE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,4,2147483647,-2147483648);this[offset]=value&255;this[offset+1]=value>>>8;this[offset+2]=value>>>16;this[offset+3]=value>>>24;return offset+4};Buffer.prototype.writeInt32BE=function writeInt32BE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,4,2147483647,-2147483648);if(value<0)value=4294967295+value+1;this[offset]=value>>>24;this[offset+1]=value>>>16;this[offset+2]=value>>>8;this[offset+3]=value&255;return offset+4};function checkIEEE754(buf,value,offset,ext,max,min){if(offset+ext>buf.length)throw new RangeError("Index out of range");if(offset<0)throw new RangeError("Index out of range")}function writeFloat(buf,value,offset,littleEndian,noAssert){value=+value;offset=offset>>>0;if(!noAssert){checkIEEE754(buf,value,offset,4,3.4028234663852886e38,-3.4028234663852886e38)}ieee754.write(buf,value,offset,littleEndian,23,4);return offset+4}Buffer.prototype.writeFloatLE=function writeFloatLE(value,offset,noAssert){return writeFloat(this,value,offset,true,noAssert)};Buffer.prototype.writeFloatBE=function writeFloatBE(value,offset,noAssert){return writeFloat(this,value,offset,false,noAssert)};function writeDouble(buf,value,offset,littleEndian,noAssert){value=+value;offset=offset>>>0;if(!noAssert){checkIEEE754(buf,value,offset,8,1.7976931348623157e308,-1.7976931348623157e308)}ieee754.write(buf,value,offset,littleEndian,52,8);return offset+8}Buffer.prototype.writeDoubleLE=function writeDoubleLE(value,offset,noAssert){return writeDouble(this,value,offset,true,noAssert)};Buffer.prototype.writeDoubleBE=function writeDoubleBE(value,offset,noAssert){return writeDouble(this,value,offset,false,noAssert)};Buffer.prototype.copy=function copy(target,targetStart,start,end){if(!start)start=0;if(!end&&end!==0)end=this.length;if(targetStart>=target.length)targetStart=target.length;if(!targetStart)targetStart=0;if(end>0&&end<start)end=start;if(end===start)return 0;if(target.length===0||this.length===0)return 0;if(targetStart<0){throw new RangeError("targetStart out of bounds")}if(start<0||start>=this.length)throw new RangeError("sourceStart out of bounds");if(end<0)throw new RangeError("sourceEnd out of bounds");if(end>this.length)end=this.length;if(target.length-targetStart<end-start){end=target.length-targetStart+start}var len=end-start;var i;if(this===target&&start<targetStart&&targetStart<end){for(i=len-1;i>=0;--i){target[i+targetStart]=this[i+start]}}else if(len<1e3){for(i=0;i<len;++i){target[i+targetStart]=this[i+start]}}else{Uint8Array.prototype.set.call(target,this.subarray(start,start+len),targetStart)}return len};Buffer.prototype.fill=function fill(val,start,end,encoding){if(typeof val==="string"){if(typeof start==="string"){encoding=start;start=0;end=this.length}else if(typeof end==="string"){encoding=end;end=this.length}if(val.length===1){var code=val.charCodeAt(0);if(code<256){val=code}}if(encoding!==undefined&&typeof encoding!=="string"){throw new TypeError("encoding must be a string")}if(typeof encoding==="string"&&!Buffer.isEncoding(encoding)){throw new TypeError("Unknown encoding: "+encoding)}}else if(typeof val==="number"){val=val&255}if(start<0||this.length<start||this.length<end){throw new RangeError("Out of range index")}if(end<=start){return this}start=start>>>0;end=end===undefined?this.length:end>>>0;if(!val)val=0;var i;if(typeof val==="number"){for(i=start;i<end;++i){this[i]=val}}else{var bytes=Buffer.isBuffer(val)?val:new Buffer(val,encoding);var len=bytes.length;for(i=0;i<end-start;++i){this[i+start]=bytes[i%len]}}return this};var INVALID_BASE64_RE=/[^+\\/0-9A-Za-z-_]/g;function base64clean(str){str=str.trim().replace(INVALID_BASE64_RE,"");if(str.length<2)return"";while(str.length%4!==0){str=str+"="}return str}function toHex(n){if(n<16)return"0"+n.toString(16);return n.toString(16)}function utf8ToBytes(string,units){units=units||Infinity;var codePoint;var length=string.length;var leadSurrogate=null;var bytes=[];for(var i=0;i<length;++i){codePoint=string.charCodeAt(i);if(codePoint>55295&&codePoint<57344){if(!leadSurrogate){if(codePoint>56319){if((units-=3)>-1)bytes.push(239,191,189);continue}else if(i+1===length){if((units-=3)>-1)bytes.push(239,191,189);continue}leadSurrogate=codePoint;continue}if(codePoint<56320){if((units-=3)>-1)bytes.push(239,191,189);leadSurrogate=codePoint;continue}codePoint=(leadSurrogate-55296<<10|codePoint-56320)+65536}else if(leadSurrogate){if((units-=3)>-1)bytes.push(239,191,189)}leadSurrogate=null
;if(codePoint<128){if((units-=1)<0)break;bytes.push(codePoint)}else if(codePoint<2048){if((units-=2)<0)break;bytes.push(codePoint>>6|192,codePoint&63|128)}else if(codePoint<65536){if((units-=3)<0)break;bytes.push(codePoint>>12|224,codePoint>>6&63|128,codePoint&63|128)}else if(codePoint<1114112){if((units-=4)<0)break;bytes.push(codePoint>>18|240,codePoint>>12&63|128,codePoint>>6&63|128,codePoint&63|128)}else{throw new Error("Invalid code point")}}return bytes}function asciiToBytes(str){var byteArray=[];for(var i=0;i<str.length;++i){byteArray.push(str.charCodeAt(i)&255)}return byteArray}function utf16leToBytes(str,units){var c,hi,lo;var byteArray=[];for(var i=0;i<str.length;++i){if((units-=2)<0)break;c=str.charCodeAt(i);hi=c>>8;lo=c%256;byteArray.push(lo);byteArray.push(hi)}return byteArray}function base64ToBytes(str){return base64.toByteArray(base64clean(str))}function blitBuffer(src,dst,offset,length){for(var i=0;i<length;++i){if(i+offset>=dst.length||i>=src.length)break;dst[i+offset]=src[i]}return i}function isArrayBufferView(obj){return typeof ArrayBuffer.isView==="function"&&ArrayBuffer.isView(obj)}function numberIsNaN(obj){return obj!==obj}},{"base64-js":1,ieee754:3}],3:[function(require,module,exports){exports.read=function(buffer,offset,isLE,mLen,nBytes){var e,m;var eLen=nBytes*8-mLen-1;var eMax=(1<<eLen)-1;var eBias=eMax>>1;var nBits=-7;var i=isLE?nBytes-1:0;var d=isLE?-1:1;var s=buffer[offset+i];i+=d;e=s&(1<<-nBits)-1;s>>=-nBits;nBits+=eLen;for(;nBits>0;e=e*256+buffer[offset+i],i+=d,nBits-=8){}m=e&(1<<-nBits)-1;e>>=-nBits;nBits+=mLen;for(;nBits>0;m=m*256+buffer[offset+i],i+=d,nBits-=8){}if(e===0){e=1-eBias}else if(e===eMax){return m?NaN:(s?-1:1)*Infinity}else{m=m+Math.pow(2,mLen);e=e-eBias}return(s?-1:1)*m*Math.pow(2,e-mLen)};exports.write=function(buffer,value,offset,isLE,mLen,nBytes){var e,m,c;var eLen=nBytes*8-mLen-1;var eMax=(1<<eLen)-1;var eBias=eMax>>1;var rt=mLen===23?Math.pow(2,-24)-Math.pow(2,-77):0;var i=isLE?0:nBytes-1;var d=isLE?1:-1;var s=value<0||value===0&&1/value<0?1:0;value=Math.abs(value);if(isNaN(value)||value===Infinity){m=isNaN(value)?1:0;e=eMax}else{e=Math.floor(Math.log(value)/Math.LN2);if(value*(c=Math.pow(2,-e))<1){e--;c*=2}if(e+eBias>=1){value+=rt/c}else{value+=rt*Math.pow(2,1-eBias)}if(value*c>=2){e++;c/=2}if(e+eBias>=eMax){m=0;e=eMax}else if(e+eBias>=1){m=(value*c-1)*Math.pow(2,mLen);e=e+eBias}else{m=value*Math.pow(2,eBias-1)*Math.pow(2,mLen);e=0}}for(;mLen>=8;buffer[offset+i]=m&255,i+=d,m/=256,mLen-=8){}e=e<<mLen|m;eLen+=mLen;for(;eLen>0;buffer[offset+i]=e&255,i+=d,e/=256,eLen-=8){}buffer[offset+i-d]|=s*128}},{}],4:[function(require,module,exports){var NeuQuant=require("./WasmNeuQuant.js");var LZWEncoder=require("./LZWEncoder.js");function ByteArray(){this.page=-1;this.pages=[];this.newPage()}ByteArray.pageSize=4096;ByteArray.charMap={};for(var i=0;i<256;i++)ByteArray.charMap[i]=String.fromCharCode(i);ByteArray.prototype.newPage=function(){this.pages[++this.page]=new Uint8Array(ByteArray.pageSize);this.cursor=0};ByteArray.prototype.getData=function(){var rv="";for(var p=0;p<this.pages.length;p++){for(var i=0;i<ByteArray.pageSize;i++){rv+=ByteArray.charMap[this.pages[p][i]]}}return rv};ByteArray.prototype.writeByte=function(val){if(this.cursor>=ByteArray.pageSize)this.newPage();this.pages[this.page][this.cursor++]=val};ByteArray.prototype.writeUTFBytes=function(string){for(var l=string.length,i=0;i<l;i++)this.writeByte(string.charCodeAt(i))};ByteArray.prototype.writeBytes=function(array,offset,length){for(var l=length||array.length,i=offset||0;i<l;i++)this.writeByte(array[i])};function GIFEncoder(width,height){this.width=~~width;this.height=~~height;this.transparent=null;this.transIndex=0;this.repeat=-1;this.delay=0;this.image=null;this.pixels=null;this.indexedPixels=null;this.colorDepth=null;this.colorTab=null;this.neuQuant=null;this.usedEntry=new Array;this.palSize=7;this.dispose=-1;this.firstFrame=true;this.sample=10;this.dither=false;this.globalPalette=false;this.out=new ByteArray}GIFEncoder.prototype.setDelay=function(milliseconds){this.delay=Math.round(milliseconds/10)};GIFEncoder.prototype.setFrameRate=function(fps){this.delay=Math.round(100/fps)};GIFEncoder.prototype.setDispose=function(disposalCode){if(disposalCode>=0)this.dispose=disposalCode};GIFEncoder.prototype.setRepeat=function(repeat){this.repeat=repeat};GIFEncoder.prototype.setTransparent=function(color){this.transparent=color};GIFEncoder.prototype.addFrame=function(imageData){this.image=imageData;this.colorTab=this.globalPalette&&this.globalPalette.slice?this.globalPalette:null;this.getImagePixels();this.analyzePixels();if(this.globalPalette===true)this.globalPalette=this.colorTab;if(this.firstFrame){this.writeLSD();this.writePalette();if(this.repeat>=0){this.writeNetscapeExt()}}this.writeGraphicCtrlExt();this.writeImageDesc();if(!this.firstFrame&&!this.globalPalette)this.writePalette();this.writePixels();this.firstFrame=false};GIFEncoder.prototype.finish=function(){this.out.writeByte(59)};GIFEncoder.prototype.setQuality=function(quality){if(quality<1)quality=1;this.sample=quality};GIFEncoder.prototype.setDither=function(dither){if(dither===true)dither="FloydSteinberg";this.dither=dither};GIFEncoder.prototype.setGlobalPalette=function(palette){this.globalPalette=palette};GIFEncoder.prototype.getGlobalPalette=function(){return this.globalPalette&&this.globalPalette.slice&&this.globalPalette.slice(0)||this.globalPalette};GIFEncoder.prototype.writeHeader=function(){this.out.writeUTFBytes("GIF89a")};GIFEncoder.prototype.analyzePixels=function(){if(!this.colorTab){this.neuQuant=new NeuQuant(this.pixels,this.sample);this.neuQuant.buildColormap();this.colorTab=this.neuQuant.getColormap()}if(this.dither){this.ditherPixels(this.dither.replace("-serpentine",""),this.dither.match(/-serpentine/)!==null)}else{this.indexPixels()}this.pixels=null;this.colorDepth=8;this.palSize=7;if(this.transparent!==null){this.transIndex=this.findClosest(this.transparent,true)}};GIFEncoder.prototype.indexPixels=function(imgq){var nPix=this.pixels.length/3;this.indexedPixels=new Uint8Array(nPix);var k=0;for(var j=0;j<nPix;j++){var index=this.findClosestRGB(this.pixels[k++]&255,this.pixels[k++]&255,this.pixels[k++]&255);this.usedEntry[index]=true;this.indexedPixels[j]=index}};GIFEncoder.prototype.ditherPixels=function(kernel,serpentine){var kernels={FalseFloydSteinberg:[[3/8,1,0],[3/8,0,1],[2/8,1,1]],FloydSteinberg:[[7/16,1,0],[3/16,-1,1],[5/16,0,1],[1/16,1,1]],Stucki:[[8/42,1,0],[4/42,2,0],[2/42,-2,1],[4/42,-1,1],[8/42,0,1],[4/42,1,1],[2/42,2,1],[1/42,-2,2],[2/42,-1,2],[4/42,0,2],[2/42,1,2],[1/42,2,2]],Atkinson:[[1/8,1,0],[1/8,2,0],[1/8,-1,1],[1/8,0,1],[1/8,1,1],[1/8,0,2]]};if(!kernel||!kernels[kernel]){throw"Unknown dithering kernel: "+kernel}var ds=kernels[kernel];var index=0,height=this.height,width=this.width,data=this.pixels;var direction=serpentine?-1:1;this.indexedPixels=new Uint8Array(this.pixels.length/3);for(var y=0;y<height;y++){if(serpentine)direction=direction*-1;for(var x=direction==1?0:width-1,xend=direction==1?width:0;x!==xend;x+=direction){index=y*width+x;var idx=index*3;var r1=data[idx];var g1=data[idx+1];var b1=data[idx+2];idx=this.findClosestRGB(r1,g1,b1);this.usedEntry[idx]=true;this.indexedPixels[index]=idx;idx*=3;var r2=this.colorTab[idx];var g2=this.colorTab[idx+1];var b2=this.colorTab[idx+2];var er=r1-r2;var eg=g1-g2;var eb=b1-b2;for(var i=direction==1?0:ds.length-1,end=direction==1?ds.length:0;i!==end;i+=direction){var x1=ds[i][1];var y1=ds[i][2];if(x1+x>=0&&x1+x<width&&y1+y>=0&&y1+y<height){var d=ds[i][0];idx=index+x1+y1*width;idx*=3;data[idx]=Math.max(0,Math.min(255,data[idx]+er*d));data[idx+1]=Math.max(0,Math.min(255,data[idx+1]+eg*d));data[idx+2]=Math.max(0,Math.min(255,data[idx+2]+eb*d))}}}}};GIFEncoder.prototype.findClosest=function(c,used){return this.findClosestRGB((c&16711680)>>16,(c&65280)>>8,c&255,used)};GIFEncoder.prototype.findClosestRGB=function(r,g,b,used){if(this.colorTab===null)return-1;if(this.neuQuant&&!used){return this.neuQuant.lookupRGB(r,g,b)}var c=b|g<<8|r<<16;var minpos=0;var dmin=256*256*256;var len=this.colorTab.length;for(var i=0,index=0;i<len;index++){var dr=r-(this.colorTab[i++]&255);var dg=g-(this.colorTab[i++]&255);var db=b-(this.colorTab[i++]&255);var d=dr*dr+dg*dg+db*db;if((!used||this.usedEntry[index])&&d<dmin){dmin=d;minpos=index}}return minpos};GIFEncoder.prototype.getImagePixels=function(){var w=this.width;var h=this.height;this.pixels=new Uint8Array(w*h*3);var data=this.image;var srcPos=0;var count=0;for(var i=0;i<h;i++){for(var j=0;j<w;j++){this.pixels[count++]=data[srcPos++];this.pixels[count++]=data[srcPos++];this.pixels[count++]=data[srcPos++];srcPos++}}};GIFEncoder.prototype.writeGraphicCtrlExt=function(){this.out.writeByte(33);this.out.writeByte(249);this.out.writeByte(4);var transp,disp;if(this.transparent===null){transp=0;disp=0}else{transp=1;disp=2}if(this.dispose>=0){disp=this.dispose&7}disp<<=2;this.out.writeByte(0|disp|0|transp);this.writeShort(this.delay);this.out.writeByte(this.transIndex);this.out.writeByte(0)};GIFEncoder.prototype.writeImageDesc=function(){this.out.writeByte(44);this.writeShort(0);this.writeShort(0);this.writeShort(this.width);this.writeShort(this.height);if(this.firstFrame||this.globalPalette){this.out.writeByte(0)}else{this.out.writeByte(128|0|0|0|this.palSize)}};GIFEncoder.prototype.writeLSD=function(){this.writeShort(this.width);this.writeShort(this.height);this.out.writeByte(128|112|0|this.palSize);this.out.writeByte(0);this.out.writeByte(0)};GIFEncoder.prototype.writeNetscapeExt=function(){this.out.writeByte(33);this.out.writeByte(255);this.out.writeByte(11);this.out.writeUTFBytes("NETSCAPE2.0");this.out.writeByte(3);this.out.writeByte(1);this.writeShort(this.repeat);this.out.writeByte(0)};GIFEncoder.prototype.writePalette=function(){this.out.writeBytes(this.colorTab);var n=3*256-this.colorTab.length;for(var i=0;i<n;i++)this.out.writeByte(0)};GIFEncoder.prototype.writeShort=function(pValue){this.out.writeByte(pValue&255);this.out.writeByte(pValue>>8&255)};GIFEncoder.prototype.writePixels=function(){var enc=new LZWEncoder(this.width,this.height,this.indexedPixels,this.colorDepth);enc.encode(this.out)};GIFEncoder.prototype.stream=function(){return this.out};module.exports=GIFEncoder},{"./LZWEncoder.js":5,"./WasmNeuQuant.js":6}],5:[function(require,module,exports){var EOF=-1;var BITS=12;var HSIZE=5003;var masks=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535];function LZWEncoder(width,height,pixels,colorDepth){var initCodeSize=Math.max(2,colorDepth);var accum=new Uint8Array(256);var htab=new Int32Array(HSIZE);var codetab=new Int32Array(HSIZE);var cur_accum,cur_bits=0;var a_count;var free_ent=0;var maxcode;var clear_flg=false;var g_init_bits,ClearCode,EOFCode;function char_out(c,outs){accum[a_count++]=c;if(a_count>=254)flush_char(outs)}function cl_block(outs){cl_hash(HSIZE);free_ent=ClearCode+2;clear_flg=true;output(ClearCode,outs)}function cl_hash(hsize){for(var i=0;i<hsize;++i)htab[i]=-1}function compress(init_bits,outs){var fcode,c,i,ent,disp,hsize_reg,hshift;g_init_bits=init_bits;clear_flg=false;n_bits=g_init_bits;maxcode=MAXCODE(n_bits);ClearCode=1<<init_bits-1;EOFCode=ClearCode+1;free_ent=ClearCode+2;a_count=0;ent=nextPixel();hshift=0;for(fcode=HSIZE;fcode<65536;fcode*=2)++hshift;hshift=8-hshift;hsize_reg=HSIZE;cl_hash(hsize_reg);output(ClearCode,outs);outer_loop:while((c=nextPixel())!=EOF){fcode=(c<<BITS)+ent;i=c<<hshift^ent;if(htab[i]===fcode){ent=codetab[i];continue}else if(htab[i]>=0){disp=hsize_reg-i;if(i===0)disp=1;do{if((i-=disp)<0)i+=hsize_reg;if(htab[i]===fcode){ent=codetab[i];continue outer_loop}}while(htab[i]>=0)}output(ent,outs);ent=c;if(free_ent<1<<BITS){codetab[i]=free_ent++;htab[i]=fcode}else{cl_block(outs)}}output(ent,outs);output(EOFCode,outs)}function encode(outs){outs.writeByte(initCodeSize);remaining=width*height;curPixel=0;compress(initCodeSize+1,outs);outs.writeByte(0)}function flush_char(outs){if(a_count>0){outs.writeByte(a_count);outs.writeBytes(accum,0,a_count);a_count=0}}function MAXCODE(n_bits){return(1<<n_bits)-1}function nextPixel(){if(remaining===0)return EOF;--remaining;var pix=pixels[curPixel++];return pix&255}function output(code,outs){cur_accum&=masks[cur_bits];if(cur_bits>0)cur_accum|=code<<cur_bits;else cur_accum=code;cur_bits+=n_bits;while(cur_bits>=8){char_out(cur_accum&255,outs);cur_accum>>=8;cur_bits-=8}if(free_ent>maxcode||clear_flg){if(clear_flg){maxcode=MAXCODE(n_bits=g_init_bits);clear_flg=false}else{++n_bits;if(n_bits==BITS)maxcode=1<<BITS;else maxcode=MAXCODE(n_bits)}}if(code==EOFCode){while(cur_bits>0){char_out(cur_accum&255,outs);cur_accum>>=8;cur_bits-=8}flush_char(outs)}}this.encode=encode}module.exports=LZWEncoder},{}],6:[function(require,module,exports){(function(Buffer){var src=Buffer("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","base64");var wamodule=new WebAssembly.Module(src);var instance;var memarray;function NeuQuant(pixels,samplefac){if(!instance){var table=new WebAssembly.Table({initial:0,element:"anyfunc"});var memory=new WebAssembly.Memory({initial:1});memarray=new Uint8Array(memory.buffer);var env={};env.memoryBase=0;env.memory=memory;env.tableBase=0;env.table=table;env.memset=function(){};env._grow=function(){memarray=new Uint8Array(memory.buffer)};env._abort=function(){throw new Error("Abort")};env._exit=function(){throw new Error("Exit")};instance=new WebAssembly.Instance(wamodule,{env:env})}var pixelPtr=instance.exports.malloc(pixels.byteLength);memarray.set(pixels,pixelPtr);instance.exports.init(pixelPtr,pixels.length,samplefac);this.buildColormap=function(){instance.exports.learn();instance.exports.unbiasnet();instance.exports.inxbuild();instance.exports.free(pixelPtr)};this.getColormap=function(){var map=new Uint8Array(256*3);var mapPtr=instance.exports.getColormap();map.set(memarray.subarray(mapPtr,mapPtr+map.byteLength));return map};this.lookupRGB=instance.exports.inxsearch}module.exports=NeuQuant}).call(this,require("buffer").Buffer)},{buffer:2}],7:[function(require,module,exports){
var GIFEncoder,renderFrame;GIFEncoder=require("./GIFEncoder.js");renderFrame=function(frame){var encoder,page,stream,transfer;encoder=new GIFEncoder(frame.width,frame.height);if(frame.index===0){encoder.writeHeader()}else{encoder.firstFrame=false}encoder.setTransparent(frame.transparent);encoder.setDispose(frame.dispose);encoder.setRepeat(frame.repeat);encoder.setDelay(frame.delay);encoder.setQuality(frame.quality);encoder.setDither(frame.dither);encoder.setGlobalPalette(frame.globalPalette);encoder.addFrame(frame.data);if(frame.last){encoder.finish()}if(frame.globalPalette===true){frame.globalPalette=encoder.getGlobalPalette()}stream=encoder.stream();frame.data=stream.pages;frame.cursor=stream.cursor;frame.pageSize=stream.constructor.pageSize;if(frame.canTransfer){transfer=function(){var i,len,ref,results;ref=frame.data;results=[];for(i=0,len=ref.length;i<len;i++){page=ref[i];results.push(page.buffer)}return results}();return self.postMessage(frame,transfer)}else{return self.postMessage(frame)}};self.onmessage=function(event){return renderFrame(event.data)}},{"./GIFEncoder.js":4}]},{},[7]);
//# sourceMappingURL=gif.worker.js.map`;

// shared/util/blob.ts
function getUrl(data, type = "application/javascript") {
  let output = { url: null };
  onStart(() => {
    const blob = new Blob([data], { type });
    output.url = URL.createObjectURL(blob);
    onStop(() => {
      if (!output.url) return;
      URL.revokeObjectURL(output.url);
      output.url = null;
    }, true);
  });
  return output;
}

// shared/util/canvas.ts
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

// plugins/GifCaptioner/src/render/gifRenderer.ts
var import_gif = __toESM(require_gif(), 1);

// shared/stores.ts
var selectedChannelStore = BdApi.Webpack.getStore("SelectedChannelStore");
var selectedGuildStore = BdApi.Webpack.getStore("SelectedGuildStore");

// shared/util/upload.ts
var onSubmit = null;
before(chatbox?.type, "render", ({ args }) => onSubmit = args[0].onSubmit);
async function uploadFile(file) {
  const channelId = selectedChannelStore.getCurrentlySelectedChannelId();
  if (!channelId) return;
  const upload = new CloudUploader({ file, platform: 1 }, channelId);
  if (!onSubmit) {
    error("Failed to send file, try switching channels");
    return;
  }
  onSubmit({
    value: "",
    stickers: [],
    uploads: [upload]
  });
}

// plugins/GifCaptioner/src/render/speechbubble.ts
function bezierPoint(t, start, control, end) {
  let x = (1 - t) * (1 - t) * start[0] + 2 * (1 - t) * t * control[0] + t * t * end[0];
  let y = (1 - t) * (1 - t) * start[1] + 2 * (1 - t) * t * control[1] + t * t * end[1];
  return [x, y];
}
function moveAway(point, from, distance) {
  const dx = point[0] - from[0];
  const dy = point[1] - from[1];
  const length = Math.sqrt(dx ** 2 + dy ** 2);
  const scale = distance / length;
  return [point[0] + dx * scale, point[1] + dy * scale];
}
function renderSpeechbubble(ctx, width, height, tipX, tipY, tipBase) {
  const start = [0, height * 0.1];
  const control = [width * 0.5, height * 0.2];
  const end = [width, height * 0.1];
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(...start);
  ctx.quadraticCurveTo(...control, ...end);
  ctx.lineTo(width, 0);
  ctx.lineTo(0, 0);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(...start);
  ctx.quadraticCurveTo(...control, ...end);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.stroke();
  const tipWidth = 0.2;
  const base1 = bezierPoint(tipBase, start, control, end);
  const base2 = bezierPoint(tipBase + tipWidth, start, control, end);
  const tip = [tipX, tipY];
  const bgDistance = 5;
  ctx.beginPath();
  ctx.moveTo(...moveAway(base1, tip, bgDistance));
  ctx.lineTo(tipX, tipY);
  ctx.lineTo(...moveAway(base2, tip, bgDistance));
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(...base1);
  ctx.lineTo(tipX, tipY);
  ctx.lineTo(...base2);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.stroke();
}

// shared/util/permissions.ts
function getMaxFileSize() {
  const id = selectedGuildStore.getGuildId();
  return maxUploadSize(id);
}

// plugins/GifCaptioner/src/render/gifRenderer.ts
var worker = getUrl(gif_worker_default);
console.log("HERE?", getMaxFileSize());
var GifRenderer = class {
  canvas = document.createElement("canvas");
  ctx = this.canvas.getContext("2d", { willReadFrequently: true });
  topOffset = 0;
  width;
  height;
  // Doesn't include caption height
  transform;
  gif;
  progress;
  constructor({ progress, frames, width, height, transform }) {
    this.progress = progress;
    this.width = width;
    this.height = height;
    this.transform = transform;
    if (!worker.url) {
      progress.close();
      error("Attempted to encode gif while GifCaptioner is disabled");
      throw new Error("Worker url missing");
    }
    let fullHeight = height;
    if (transform.type === "caption") {
      this.ctx.font = `${transform.size}px futuraBoldCondensed`;
      let lines = getLines(this.ctx, transform.text, this.width);
      fullHeight = lines.length * transform.size + 10 + this.height;
    }
    const fullSize = fullHeight * this.width;
    const sizeEstimate = fullSize * frames;
    const maxSize = getMaxFileSize();
    let scaleFactor = Math.max(1, Math.sqrt(sizeEstimate / maxSize));
    Api.Logger.log("Scale factor set to", scaleFactor);
    const newWidth = Math.floor(this.width / scaleFactor);
    const newHeight = Math.floor(this.height / scaleFactor);
    const newFullHeight = Math.floor(fullHeight / scaleFactor);
    this.width = this.canvas.width = newWidth;
    this.height = newHeight;
    this.canvas.height = newFullHeight;
    this.gif = new import_gif.default({
      workerScript: worker.url,
      height: newFullHeight,
      width: newWidth
    });
    if (transform.type === "caption") {
      const newSize = Math.floor(transform.size / scaleFactor);
      this.drawCaption(transform.text, newWidth, newSize);
    } else if (transform.type === "speechbubble") {
      const newTipX = transform.tipX / scaleFactor;
      const newTipY = transform.tipY / scaleFactor;
      this.drawSpeechBubble(newTipX, newTipY, transform.tipBase);
    }
  }
  tempCanvas;
  tempCtx;
  gifCanvas;
  gifCtx;
  needsDisposal = false;
  frameImageData;
  addGifFrame(source, parsed) {
    if (!this.tempCanvas) this.tempCanvas = document.createElement("canvas");
    if (!this.tempCtx) this.tempCtx = this.tempCanvas.getContext("2d");
    if (!this.gifCanvas) {
      this.gifCanvas = document.createElement("canvas");
      this.gifCanvas.width = parsed.lsd.width;
      this.gifCanvas.height = parsed.lsd.height;
    }
    if (!this.gifCtx) this.gifCtx = this.gifCanvas.getContext("2d");
    if (this.needsDisposal) {
      this.gifCtx.clearRect(0, this.topOffset, this.width, this.height);
      this.needsDisposal = false;
    }
    if (source.disposalType == 2) this.needsDisposal = true;
    if (!this.frameImageData || source.dims.width !== this.frameImageData.width || source.dims.height !== this.frameImageData.height) {
      this.tempCanvas.width = source.dims.width;
      this.tempCanvas.height = source.dims.height;
      this.frameImageData = this.tempCtx.createImageData(source.dims.width, source.dims.height);
    }
    this.frameImageData.data.set(source.patch);
    this.tempCtx.putImageData(this.frameImageData, 0, 0);
    this.gifCtx.drawImage(this.tempCanvas, source.dims.left, source.dims.top);
    this.ctx.drawImage(this.gifCanvas, 0, this.topOffset, this.width, this.height);
    this.addFrameToGif(source.delay);
  }
  addVideoFrame(canvas, delay) {
    this.ctx.drawImage(canvas, 0, this.topOffset, this.width, this.height);
    this.addFrameToGif(delay * 1e3);
  }
  addFrameToGif(delay) {
    if (this.transform.type === "speechbubble" && this.speechBubbleCanvas) {
      this.ctx.drawImage(this.speechBubbleCanvas, 0, this.topOffset, this.width, this.height);
    }
    this.gif.addFrame(this.ctx, { delay, copy: true });
  }
  render() {
    this.gif.once("finished", (blob) => {
      const file = new File([blob], "rendered.gif", { type: "image/gif" });
      uploadFile(file);
      this.progress.close();
    });
    this.gif.on("progress", (amount) => {
      this.progress.update("Encoding", amount);
    });
    this.progress.update("Encoding", 0);
    this.gif.render();
  }
  drawCaption(text, width, size) {
    this.ctx.font = `${size}px futuraBoldCondensed`;
    let lines = getLines(this.ctx, text, width);
    this.topOffset = lines.length * size + 10;
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, width, lines.length * size + 10);
    this.ctx.fillStyle = "black";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "top";
    for (let i = 0; i < lines.length; i++) {
      this.ctx.fillText(lines[i], width / 2, size * i + 5);
    }
  }
  speechBubbleCanvas;
  speechBubbleCtx;
  drawSpeechBubble(tipX, tipY, tipBase) {
    if (!this.speechBubbleCanvas) {
      this.speechBubbleCanvas = document.createElement("canvas");
      this.speechBubbleCanvas.width = this.width;
      this.speechBubbleCanvas.height = this.height;
    }
    if (!this.speechBubbleCtx) this.speechBubbleCtx = this.speechBubbleCanvas.getContext("2d");
    renderSpeechbubble(this.speechBubbleCtx, this.width, this.height, tipX, tipY, tipBase);
  }
};

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

// shared/util/progress.css
addStyle(`.lz-progress {
  color: white;
  width: 300px;
}

.lz-status {
  font-size: 30px;
  font-weight: bold;
  white-space: nowrap;
}

.lz-progress progress {
  width: 100%;
  margin: 10px 0;
  height: 20px;
}`);

// shared/util/progress.tsx
function Progress({ onUpdater, status: initialStatus }) {
  const React = BdApi.React;
  const [status, setStatus] = React.useState(initialStatus);
  const [progress, setProgress] = React.useState();
  React.useEffect(() => {
    onUpdater((status2, progress2) => {
      setStatus(status2);
      setProgress(progress2);
    });
  }, []);
  return /* @__PURE__ */ BdApi.React.createElement("div", { className: "lz-progress" }, /* @__PURE__ */ BdApi.React.createElement("h2", { className: "lz-status" }, status), /* @__PURE__ */ BdApi.React.createElement("progress", { value: progress, max: 1 }));
}
var ProgressDisplay = class {
  updater;
  modalId;
  onCancelCallback;
  canceled = false;
  constructor(status, cancelable = false) {
    this.modalId = ModalSystem.open((props) => {
      return /* @__PURE__ */ BdApi.React.createElement(Modal.Root, { size: "dynamic", ...props }, /* @__PURE__ */ BdApi.React.createElement(Modal.Content, null, cancelable ? /* @__PURE__ */ BdApi.React.createElement("div", { style: { position: "absolute", top: "10px", right: "10px" } }, /* @__PURE__ */ BdApi.React.createElement(Modal.Close, { onClick: () => {
        this.close();
        this.onCancelCallback?.();
        this.canceled = true;
      } })) : null, /* @__PURE__ */ BdApi.React.createElement(
        Progress,
        {
          status,
          onUpdater: (updater) => this.updater = updater
        }
      )));
    }, {
      onCloseRequest: () => false
    });
  }
  onCancel(callback) {
    this.onCancelCallback = callback;
  }
  update(status, progress) {
    if (!this.updater) return;
    this.updater(status, progress);
  }
  close() {
    ModalSystem.close(this.modalId);
  }
};

// node_modules/mediabunny/dist/modules/src/misc.js
function assert(x) {
  if (!x) {
    throw new Error("Assertion failed.");
  }
}
var normalizeRotation = (rotation) => {
  const mappedRotation = (rotation % 360 + 360) % 360;
  if (mappedRotation === 0 || mappedRotation === 90 || mappedRotation === 180 || mappedRotation === 270) {
    return mappedRotation;
  } else {
    throw new Error(`Invalid rotation ${rotation}.`);
  }
};
var last = (arr) => {
  return arr && arr[arr.length - 1];
};
var Bitstream = class _Bitstream {
  constructor(bytes) {
    this.bytes = bytes;
    this.pos = 0;
  }
  seekToByte(byteOffset) {
    this.pos = 8 * byteOffset;
  }
  readBit() {
    const byteIndex = Math.floor(this.pos / 8);
    const byte = this.bytes[byteIndex] ?? 0;
    const bitIndex = 7 - (this.pos & 7);
    const bit = (byte & 1 << bitIndex) >> bitIndex;
    this.pos++;
    return bit;
  }
  readBits(n) {
    if (n === 1) {
      return this.readBit();
    }
    let result = 0;
    for (let i = 0; i < n; i++) {
      result <<= 1;
      result |= this.readBit();
    }
    return result;
  }
  writeBits(n, value) {
    const end = this.pos + n;
    for (let i = this.pos; i < end; i++) {
      const byteIndex = Math.floor(i / 8);
      let byte = this.bytes[byteIndex];
      const bitIndex = 7 - (i & 7);
      byte &= ~(1 << bitIndex);
      byte |= (value & 1 << end - i - 1) >> end - i - 1 << bitIndex;
      this.bytes[byteIndex] = byte;
    }
    this.pos = end;
  }
  readAlignedByte() {
    if (this.pos % 8 !== 0) {
      throw new Error("Bitstream is not byte-aligned.");
    }
    const byteIndex = this.pos / 8;
    const byte = this.bytes[byteIndex] ?? 0;
    this.pos += 8;
    return byte;
  }
  skipBits(n) {
    this.pos += n;
  }
  getBitsLeft() {
    return this.bytes.length * 8 - this.pos;
  }
  clone() {
    const clone = new _Bitstream(this.bytes);
    clone.pos = this.pos;
    return clone;
  }
};
var readExpGolomb = (bitstream) => {
  let leadingZeroBits = 0;
  while (bitstream.readBits(1) === 0 && leadingZeroBits < 32) {
    leadingZeroBits++;
  }
  if (leadingZeroBits >= 32) {
    throw new Error("Invalid exponential-Golomb code.");
  }
  const result = (1 << leadingZeroBits) - 1 + bitstream.readBits(leadingZeroBits);
  return result;
};
var readSignedExpGolomb = (bitstream) => {
  const codeNum = readExpGolomb(bitstream);
  return (codeNum & 1) === 0 ? -(codeNum >> 1) : codeNum + 1 >> 1;
};
var toUint8Array = (source) => {
  if (source instanceof Uint8Array) {
    return source;
  } else if (source instanceof ArrayBuffer) {
    return new Uint8Array(source);
  } else {
    return new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
  }
};
var toDataView = (source) => {
  if (source instanceof DataView) {
    return source;
  } else if (source instanceof ArrayBuffer) {
    return new DataView(source);
  } else {
    return new DataView(source.buffer, source.byteOffset, source.byteLength);
  }
};
var textDecoder = new TextDecoder();
var textEncoder = new TextEncoder();
var invertObject = (object) => {
  return Object.fromEntries(Object.entries(object).map(([key, value]) => [value, key]));
};
var COLOR_PRIMARIES_MAP = {
  bt709: 1,
  // ITU-R BT.709
  bt470bg: 5,
  // ITU-R BT.470BG
  smpte170m: 6,
  // ITU-R BT.601 525 - SMPTE 170M
  bt2020: 9,
  // ITU-R BT.202
  smpte432: 12
  // SMPTE EG 432-1
};
var COLOR_PRIMARIES_MAP_INVERSE = invertObject(COLOR_PRIMARIES_MAP);
var TRANSFER_CHARACTERISTICS_MAP = {
  "bt709": 1,
  // ITU-R BT.709
  "smpte170m": 6,
  // SMPTE 170M
  "linear": 8,
  // Linear transfer characteristics
  "iec61966-2-1": 13,
  // IEC 61966-2-1
  "pg": 16,
  // Rec. ITU-R BT.2100-2 perceptual quantization (PQ) system
  "hlg": 18
  // Rec. ITU-R BT.2100-2 hybrid loggamma (HLG) system
};
var TRANSFER_CHARACTERISTICS_MAP_INVERSE = invertObject(TRANSFER_CHARACTERISTICS_MAP);
var MATRIX_COEFFICIENTS_MAP = {
  "rgb": 0,
  // Identity
  "bt709": 1,
  // ITU-R BT.709
  "bt470bg": 5,
  // ITU-R BT.470BG
  "smpte170m": 6,
  // SMPTE 170M
  "bt2020-ncl": 9
  // ITU-R BT.2020-2 (non-constant luminance)
};
var MATRIX_COEFFICIENTS_MAP_INVERSE = invertObject(MATRIX_COEFFICIENTS_MAP);
var isAllowSharedBufferSource = (x) => {
  return x instanceof ArrayBuffer || typeof SharedArrayBuffer !== "undefined" && x instanceof SharedArrayBuffer || ArrayBuffer.isView(x);
};
var AsyncMutex = class {
  constructor() {
    this.currentPromise = Promise.resolve();
  }
  async acquire() {
    let resolver;
    const nextPromise = new Promise((resolve) => {
      resolver = resolve;
    });
    const currentPromiseAlias = this.currentPromise;
    this.currentPromise = nextPromise;
    await currentPromiseAlias;
    return resolver;
  }
};
var bytesToHexString = (bytes) => {
  return [...bytes].map((x) => x.toString(16).padStart(2, "0")).join("");
};
var reverseBitsU32 = (x) => {
  x = x >> 1 & 1431655765 | (x & 1431655765) << 1;
  x = x >> 2 & 858993459 | (x & 858993459) << 2;
  x = x >> 4 & 252645135 | (x & 252645135) << 4;
  x = x >> 8 & 16711935 | (x & 16711935) << 8;
  x = x >> 16 & 65535 | (x & 65535) << 16;
  return x >>> 0;
};
var binarySearchExact = (arr, key, valueGetter) => {
  let low = 0;
  let high = arr.length - 1;
  let ans = -1;
  while (low <= high) {
    const mid = low + high >> 1;
    const midVal = valueGetter(arr[mid]);
    if (midVal === key) {
      ans = mid;
      high = mid - 1;
    } else if (midVal < key) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return ans;
};
var binarySearchLessOrEqual = (arr, key, valueGetter) => {
  let low = 0;
  let high = arr.length - 1;
  let ans = -1;
  while (low <= high) {
    const mid = low + (high - low + 1) / 2 | 0;
    const midVal = valueGetter(arr[mid]);
    if (midVal <= key) {
      ans = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return ans;
};
var insertSorted = (arr, item, valueGetter) => {
  const insertionIndex = binarySearchLessOrEqual(arr, valueGetter(item), valueGetter);
  arr.splice(insertionIndex + 1, 0, item);
};
var promiseWithResolvers = () => {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
};
var removeItem = (arr, item) => {
  const index = arr.indexOf(item);
  if (index !== -1) {
    arr.splice(index, 1);
  }
};
var findLast = (arr, predicate) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (predicate(arr[i])) {
      return arr[i];
    }
  }
  return void 0;
};
var findLastIndex = (arr, predicate) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (predicate(arr[i])) {
      return i;
    }
  }
  return -1;
};
var toAsyncIterator = async function* (source) {
  if (Symbol.iterator in source) {
    yield* source[Symbol.iterator]();
  } else {
    yield* source[Symbol.asyncIterator]();
  }
};
var validateAnyIterable = (iterable) => {
  if (!(Symbol.iterator in iterable) && !(Symbol.asyncIterator in iterable)) {
    throw new TypeError("Argument must be an iterable or async iterable.");
  }
};
var assertNever = (x) => {
  throw new Error(`Unexpected value: ${x}`);
};
var mapAsyncGenerator = (generator, map) => {
  return {
    async next() {
      const result = await generator.next();
      if (result.done) {
        return { value: void 0, done: true };
      } else {
        return { value: map(result.value), done: false };
      }
    },
    return() {
      return generator.return();
    },
    throw(error2) {
      return generator.throw(error2);
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  };
};
var UNDETERMINED_LANGUAGE = "und";
var roundToPrecision = (value, digits) => {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
};
var roundToMultiple = (value, multiple) => {
  return Math.round(value / multiple) * multiple;
};
var ilog = (x) => {
  let ret = 0;
  while (x) {
    ret++;
    x >>= 1;
  }
  return ret;
};
var ISO_639_2_REGEX = /^[a-z]{3}$/;
var isIso639Dash2LanguageCode = (x) => {
  return ISO_639_2_REGEX.test(x);
};
var SECOND_TO_MICROSECOND_FACTOR = 1e6 * (1 + Number.EPSILON);
var CallSerializer = class {
  constructor() {
    this.currentPromise = Promise.resolve();
  }
  call(fn) {
    return this.currentPromise = this.currentPromise.then(fn);
  }
};
var isSafariCache = null;
var isSafari = () => {
  if (isSafariCache !== null) {
    return isSafariCache;
  }
  const result = !!(typeof navigator !== "undefined" && navigator.vendor?.match(/apple/i) && !navigator.userAgent?.match(/crios/i) && !navigator.userAgent?.match(/fxios/i) && !navigator.userAgent?.match(/Opera|OPT\//));
  isSafariCache = result;
  return result;
};

// node_modules/mediabunny/dist/modules/src/codec.js
var PCM_AUDIO_CODECS = [
  "pcm-s16",
  // We don't prefix 'le' so we're compatible with the WebCodecs-registered PCM codec strings
  "pcm-s16be",
  "pcm-s24",
  "pcm-s24be",
  "pcm-s32",
  "pcm-s32be",
  "pcm-f32",
  "pcm-f32be",
  "pcm-f64",
  "pcm-f64be",
  "pcm-u8",
  "pcm-s8",
  "ulaw",
  "alaw"
];
var NON_PCM_AUDIO_CODECS = [
  "aac",
  "opus",
  "mp3",
  "vorbis",
  "flac"
];
var AUDIO_CODECS = [
  ...NON_PCM_AUDIO_CODECS,
  ...PCM_AUDIO_CODECS
];
var VP9_LEVEL_TABLE = [
  { maxPictureSize: 36864, maxBitrate: 2e5, level: 10 },
  // Level 1
  { maxPictureSize: 73728, maxBitrate: 8e5, level: 11 },
  // Level 1.1
  { maxPictureSize: 122880, maxBitrate: 18e5, level: 20 },
  // Level 2
  { maxPictureSize: 245760, maxBitrate: 36e5, level: 21 },
  // Level 2.1
  { maxPictureSize: 552960, maxBitrate: 72e5, level: 30 },
  // Level 3
  { maxPictureSize: 983040, maxBitrate: 12e6, level: 31 },
  // Level 3.1
  { maxPictureSize: 2228224, maxBitrate: 18e6, level: 40 },
  // Level 4
  { maxPictureSize: 2228224, maxBitrate: 3e7, level: 41 },
  // Level 4.1
  { maxPictureSize: 8912896, maxBitrate: 6e7, level: 50 },
  // Level 5
  { maxPictureSize: 8912896, maxBitrate: 12e7, level: 51 },
  // Level 5.1
  { maxPictureSize: 8912896, maxBitrate: 18e7, level: 52 },
  // Level 5.2
  { maxPictureSize: 35651584, maxBitrate: 18e7, level: 60 },
  // Level 6
  { maxPictureSize: 35651584, maxBitrate: 24e7, level: 61 },
  // Level 6.1
  { maxPictureSize: 35651584, maxBitrate: 48e7, level: 62 }
  // Level 6.2
];
var VP9_DEFAULT_SUFFIX = ".01.01.01.01.00";
var AV1_DEFAULT_SUFFIX = ".0.110.01.01.01.0";
var extractVideoCodecString = (trackInfo) => {
  const { codec, codecDescription, colorSpace, avcCodecInfo, hevcCodecInfo, vp9CodecInfo, av1CodecInfo } = trackInfo;
  if (codec === "avc") {
    if (avcCodecInfo) {
      const bytes = new Uint8Array([
        avcCodecInfo.avcProfileIndication,
        avcCodecInfo.profileCompatibility,
        avcCodecInfo.avcLevelIndication
      ]);
      return `avc1.${bytesToHexString(bytes)}`;
    }
    if (!codecDescription || codecDescription.byteLength < 4) {
      throw new TypeError("AVC decoder description is not provided or is not at least 4 bytes long.");
    }
    return `avc1.${bytesToHexString(codecDescription.subarray(1, 4))}`;
  } else if (codec === "hevc") {
    let generalProfileSpace;
    let generalProfileIdc;
    let compatibilityFlags;
    let generalTierFlag;
    let generalLevelIdc;
    let constraintFlags;
    if (hevcCodecInfo) {
      generalProfileSpace = hevcCodecInfo.generalProfileSpace;
      generalProfileIdc = hevcCodecInfo.generalProfileIdc;
      compatibilityFlags = reverseBitsU32(hevcCodecInfo.generalProfileCompatibilityFlags);
      generalTierFlag = hevcCodecInfo.generalTierFlag;
      generalLevelIdc = hevcCodecInfo.generalLevelIdc;
      constraintFlags = [...hevcCodecInfo.generalConstraintIndicatorFlags];
    } else {
      if (!codecDescription || codecDescription.byteLength < 23) {
        throw new TypeError("HEVC decoder description is not provided or is not at least 23 bytes long.");
      }
      const view = toDataView(codecDescription);
      const profileByte = view.getUint8(1);
      generalProfileSpace = profileByte >> 6 & 3;
      generalProfileIdc = profileByte & 31;
      compatibilityFlags = reverseBitsU32(view.getUint32(2));
      generalTierFlag = profileByte >> 5 & 1;
      generalLevelIdc = view.getUint8(12);
      constraintFlags = [];
      for (let i = 0; i < 6; i++) {
        constraintFlags.push(view.getUint8(6 + i));
      }
    }
    let codecString = "hev1.";
    codecString += ["", "A", "B", "C"][generalProfileSpace] + generalProfileIdc;
    codecString += ".";
    codecString += compatibilityFlags.toString(16).toUpperCase();
    codecString += ".";
    codecString += generalTierFlag === 0 ? "L" : "H";
    codecString += generalLevelIdc;
    while (constraintFlags.length > 0 && constraintFlags[constraintFlags.length - 1] === 0) {
      constraintFlags.pop();
    }
    if (constraintFlags.length > 0) {
      codecString += ".";
      codecString += constraintFlags.map((x) => x.toString(16).toUpperCase()).join(".");
    }
    return codecString;
  } else if (codec === "vp8") {
    return "vp8";
  } else if (codec === "vp9") {
    if (!vp9CodecInfo) {
      const pictureSize = trackInfo.width * trackInfo.height;
      let level2 = last(VP9_LEVEL_TABLE).level;
      for (const entry of VP9_LEVEL_TABLE) {
        if (pictureSize <= entry.maxPictureSize) {
          level2 = entry.level;
          break;
        }
      }
      return `vp09.00.${level2.toString().padStart(2, "0")}.08`;
    }
    const profile = vp9CodecInfo.profile.toString().padStart(2, "0");
    const level = vp9CodecInfo.level.toString().padStart(2, "0");
    const bitDepth = vp9CodecInfo.bitDepth.toString().padStart(2, "0");
    const chromaSubsampling = vp9CodecInfo.chromaSubsampling.toString().padStart(2, "0");
    const colourPrimaries = vp9CodecInfo.colourPrimaries.toString().padStart(2, "0");
    const transferCharacteristics = vp9CodecInfo.transferCharacteristics.toString().padStart(2, "0");
    const matrixCoefficients = vp9CodecInfo.matrixCoefficients.toString().padStart(2, "0");
    const videoFullRangeFlag = vp9CodecInfo.videoFullRangeFlag.toString().padStart(2, "0");
    let string = `vp09.${profile}.${level}.${bitDepth}.${chromaSubsampling}`;
    string += `.${colourPrimaries}.${transferCharacteristics}.${matrixCoefficients}.${videoFullRangeFlag}`;
    if (string.endsWith(VP9_DEFAULT_SUFFIX)) {
      string = string.slice(0, -VP9_DEFAULT_SUFFIX.length);
    }
    return string;
  } else if (codec === "av1") {
    if (!av1CodecInfo) {
      const pictureSize = trackInfo.width * trackInfo.height;
      let level2 = last(VP9_LEVEL_TABLE).level;
      for (const entry of VP9_LEVEL_TABLE) {
        if (pictureSize <= entry.maxPictureSize) {
          level2 = entry.level;
          break;
        }
      }
      return `av01.0.${level2.toString().padStart(2, "0")}M.08`;
    }
    const profile = av1CodecInfo.profile;
    const level = av1CodecInfo.level.toString().padStart(2, "0");
    const tier = av1CodecInfo.tier ? "H" : "M";
    const bitDepth = av1CodecInfo.bitDepth.toString().padStart(2, "0");
    const monochrome = av1CodecInfo.monochrome ? "1" : "0";
    const chromaSubsampling = 100 * av1CodecInfo.chromaSubsamplingX + 10 * av1CodecInfo.chromaSubsamplingY + 1 * (av1CodecInfo.chromaSubsamplingX && av1CodecInfo.chromaSubsamplingY ? av1CodecInfo.chromaSamplePosition : 0);
    const colorPrimaries = colorSpace?.primaries ? COLOR_PRIMARIES_MAP[colorSpace.primaries] : 1;
    const transferCharacteristics = colorSpace?.transfer ? TRANSFER_CHARACTERISTICS_MAP[colorSpace.transfer] : 1;
    const matrixCoefficients = colorSpace?.matrix ? MATRIX_COEFFICIENTS_MAP[colorSpace.matrix] : 1;
    const videoFullRangeFlag = colorSpace?.fullRange ? 1 : 0;
    let string = `av01.${profile}.${level}${tier}.${bitDepth}`;
    string += `.${monochrome}.${chromaSubsampling.toString().padStart(3, "0")}`;
    string += `.${colorPrimaries.toString().padStart(2, "0")}`;
    string += `.${transferCharacteristics.toString().padStart(2, "0")}`;
    string += `.${matrixCoefficients.toString().padStart(2, "0")}`;
    string += `.${videoFullRangeFlag}`;
    if (string.endsWith(AV1_DEFAULT_SUFFIX)) {
      string = string.slice(0, -AV1_DEFAULT_SUFFIX.length);
    }
    return string;
  }
  throw new TypeError(`Unhandled codec '${codec}'.`);
};
var extractAudioCodecString = (trackInfo) => {
  const { codec, codecDescription, aacCodecInfo } = trackInfo;
  if (codec === "aac") {
    if (!aacCodecInfo) {
      throw new TypeError("AAC codec info must be provided.");
    }
    if (aacCodecInfo.isMpeg2) {
      return "mp4a.67";
    } else {
      const audioSpecificConfig = parseAacAudioSpecificConfig(codecDescription);
      return `mp4a.40.${audioSpecificConfig.objectType}`;
    }
  } else if (codec === "mp3") {
    return "mp3";
  } else if (codec === "opus") {
    return "opus";
  } else if (codec === "vorbis") {
    return "vorbis";
  } else if (codec === "flac") {
    return "flac";
  } else if (codec && PCM_AUDIO_CODECS.includes(codec)) {
    return codec;
  }
  throw new TypeError(`Unhandled codec '${codec}'.`);
};
var aacFrequencyTable = [
  96e3,
  88200,
  64e3,
  48e3,
  44100,
  32e3,
  24e3,
  22050,
  16e3,
  12e3,
  11025,
  8e3,
  7350
];
var aacChannelMap = [-1, 1, 2, 3, 4, 5, 6, 8];
var parseAacAudioSpecificConfig = (bytes) => {
  if (!bytes || bytes.byteLength < 2) {
    throw new TypeError("AAC description must be at least 2 bytes long.");
  }
  const bitstream = new Bitstream(bytes);
  let objectType = bitstream.readBits(5);
  if (objectType === 31) {
    objectType = 32 + bitstream.readBits(6);
  }
  const frequencyIndex = bitstream.readBits(4);
  let sampleRate = null;
  if (frequencyIndex === 15) {
    sampleRate = bitstream.readBits(24);
  } else {
    if (frequencyIndex < aacFrequencyTable.length) {
      sampleRate = aacFrequencyTable[frequencyIndex];
    }
  }
  const channelConfiguration = bitstream.readBits(4);
  let numberOfChannels = null;
  if (channelConfiguration >= 1 && channelConfiguration <= 7) {
    numberOfChannels = aacChannelMap[channelConfiguration];
  }
  return {
    objectType,
    frequencyIndex,
    sampleRate,
    channelConfiguration,
    numberOfChannels
  };
};
var OPUS_INTERNAL_SAMPLE_RATE = 48e3;
var PCM_CODEC_REGEX = /^pcm-([usf])(\d+)+(be)?$/;
var parsePcmCodec = (codec) => {
  assert(PCM_AUDIO_CODECS.includes(codec));
  if (codec === "ulaw") {
    return { dataType: "ulaw", sampleSize: 1, littleEndian: true, silentValue: 255 };
  } else if (codec === "alaw") {
    return { dataType: "alaw", sampleSize: 1, littleEndian: true, silentValue: 213 };
  }
  const match = PCM_CODEC_REGEX.exec(codec);
  assert(match);
  let dataType;
  if (match[1] === "u") {
    dataType = "unsigned";
  } else if (match[1] === "s") {
    dataType = "signed";
  } else {
    dataType = "float";
  }
  const sampleSize = Number(match[2]) / 8;
  const littleEndian = match[3] !== "be";
  const silentValue = codec === "pcm-u8" ? 2 ** 7 : 0;
  return { dataType, sampleSize, littleEndian, silentValue };
};
var Quality = class {
  /** @internal */
  constructor(factor) {
    this._factor = factor;
  }
  /** @internal */
  _toVideoBitrate(codec, width, height) {
    const pixels = width * height;
    const codecEfficiencyFactors = {
      avc: 1,
      // H.264/AVC (baseline)
      hevc: 0.6,
      // H.265/HEVC (~40% more efficient than AVC)
      vp9: 0.6,
      // Similar to HEVC
      av1: 0.4,
      // ~60% more efficient than AVC
      vp8: 1.2
      // Slightly less efficient than AVC
    };
    const referencePixels = 1920 * 1080;
    const referenceBitrate = 3e6;
    const scaleFactor = Math.pow(pixels / referencePixels, 0.95);
    const baseBitrate = referenceBitrate * scaleFactor;
    const codecAdjustedBitrate = baseBitrate * codecEfficiencyFactors[codec];
    const finalBitrate = codecAdjustedBitrate * this._factor;
    return Math.ceil(finalBitrate / 1e3) * 1e3;
  }
  /** @internal */
  _toAudioBitrate(codec) {
    if (PCM_AUDIO_CODECS.includes(codec) || codec === "flac") {
      return void 0;
    }
    const baseRates = {
      aac: 128e3,
      // 128kbps base for AAC
      opus: 64e3,
      // 64kbps base for Opus
      mp3: 16e4,
      // 160kbps base for MP3
      vorbis: 64e3
      // 64kbps base for Vorbis
    };
    const baseBitrate = baseRates[codec];
    if (!baseBitrate) {
      throw new Error(`Unhandled codec: ${codec}`);
    }
    let finalBitrate = baseBitrate * this._factor;
    if (codec === "aac") {
      const validRates = [96e3, 128e3, 16e4, 192e3];
      finalBitrate = validRates.reduce((prev, curr) => Math.abs(curr - finalBitrate) < Math.abs(prev - finalBitrate) ? curr : prev);
    } else if (codec === "opus" || codec === "vorbis") {
      finalBitrate = Math.max(6e3, finalBitrate);
    } else if (codec === "mp3") {
      const validRates = [
        8e3,
        16e3,
        24e3,
        32e3,
        4e4,
        48e3,
        64e3,
        8e4,
        96e3,
        112e3,
        128e3,
        16e4,
        192e3,
        224e3,
        256e3,
        32e4
      ];
      finalBitrate = validRates.reduce((prev, curr) => Math.abs(curr - finalBitrate) < Math.abs(prev - finalBitrate) ? curr : prev);
    }
    return Math.round(finalBitrate / 1e3) * 1e3;
  }
};
var QUALITY_VERY_LOW = new Quality(0.3);
var QUALITY_LOW = new Quality(0.6);
var QUALITY_MEDIUM = new Quality(1);
var QUALITY_HIGH = new Quality(2);
var QUALITY_VERY_HIGH = new Quality(4);

// node_modules/mediabunny/dist/modules/src/codec-data.js
var findNalUnitsInAnnexB = (packetData) => {
  const nalUnits = [];
  let i = 0;
  while (i < packetData.length) {
    let startCodePos = -1;
    let startCodeLength = 0;
    for (let j = i; j < packetData.length - 3; j++) {
      if (packetData[j] === 0 && packetData[j + 1] === 0 && packetData[j + 2] === 1) {
        startCodePos = j;
        startCodeLength = 3;
        break;
      }
      if (j < packetData.length - 4 && packetData[j] === 0 && packetData[j + 1] === 0 && packetData[j + 2] === 0 && packetData[j + 3] === 1) {
        startCodePos = j;
        startCodeLength = 4;
        break;
      }
    }
    if (startCodePos === -1) {
      break;
    }
    if (i > 0 && startCodePos > i) {
      const nalData = packetData.subarray(i, startCodePos);
      if (nalData.length > 0) {
        nalUnits.push(nalData);
      }
    }
    i = startCodePos + startCodeLength;
  }
  if (i < packetData.length) {
    const nalData = packetData.subarray(i);
    if (nalData.length > 0) {
      nalUnits.push(nalData);
    }
  }
  return nalUnits;
};
var findNalUnitsInLengthPrefixed = (packetData, lengthSize) => {
  const nalUnits = [];
  let offset = 0;
  const dataView = new DataView(packetData.buffer, packetData.byteOffset, packetData.byteLength);
  while (offset + lengthSize <= packetData.length) {
    let nalUnitLength;
    if (lengthSize === 1) {
      nalUnitLength = dataView.getUint8(offset);
    } else if (lengthSize === 2) {
      nalUnitLength = dataView.getUint16(offset, false);
    } else if (lengthSize === 3) {
      nalUnitLength = (dataView.getUint16(offset, false) << 8) + dataView.getUint8(offset + 2);
    } else if (lengthSize === 4) {
      nalUnitLength = dataView.getUint32(offset, false);
    } else {
      assertNever(lengthSize);
      assert(false);
    }
    offset += lengthSize;
    const nalUnit = packetData.subarray(offset, offset + nalUnitLength);
    nalUnits.push(nalUnit);
    offset += nalUnitLength;
  }
  return nalUnits;
};
var removeEmulationPreventionBytes = (data) => {
  const result = [];
  const len = data.length;
  for (let i = 0; i < len; i++) {
    if (i + 2 < len && data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 3) {
      result.push(0, 0);
      i += 2;
    } else {
      result.push(data[i]);
    }
  }
  return new Uint8Array(result);
};
var extractNalUnitTypeForAvc = (data) => {
  return data[0] & 31;
};
var extractAvcDecoderConfigurationRecord = (packetData) => {
  try {
    const nalUnits = findNalUnitsInAnnexB(packetData);
    const spsUnits = nalUnits.filter((unit) => extractNalUnitTypeForAvc(unit) === 7);
    const ppsUnits = nalUnits.filter((unit) => extractNalUnitTypeForAvc(unit) === 8);
    const spsExtUnits = nalUnits.filter((unit) => extractNalUnitTypeForAvc(unit) === 13);
    if (spsUnits.length === 0) {
      return null;
    }
    if (ppsUnits.length === 0) {
      return null;
    }
    const spsData = spsUnits[0];
    const bitstream = new Bitstream(removeEmulationPreventionBytes(spsData));
    bitstream.skipBits(1);
    bitstream.skipBits(2);
    const nal_unit_type = bitstream.readBits(5);
    if (nal_unit_type !== 7) {
      console.error("Invalid SPS NAL unit type");
      return null;
    }
    const profile_idc = bitstream.readAlignedByte();
    const constraint_flags = bitstream.readAlignedByte();
    const level_idc = bitstream.readAlignedByte();
    const record = {
      configurationVersion: 1,
      avcProfileIndication: profile_idc,
      profileCompatibility: constraint_flags,
      avcLevelIndication: level_idc,
      lengthSizeMinusOne: 3,
      // Typically 4 bytes for length field
      sequenceParameterSets: spsUnits,
      pictureParameterSets: ppsUnits,
      chromaFormat: null,
      bitDepthLumaMinus8: null,
      bitDepthChromaMinus8: null,
      sequenceParameterSetExt: null
    };
    if (profile_idc === 100 || profile_idc === 110 || profile_idc === 122 || profile_idc === 144) {
      readExpGolomb(bitstream);
      const chroma_format_idc = readExpGolomb(bitstream);
      if (chroma_format_idc === 3) {
        bitstream.skipBits(1);
      }
      const bit_depth_luma_minus8 = readExpGolomb(bitstream);
      const bit_depth_chroma_minus8 = readExpGolomb(bitstream);
      record.chromaFormat = chroma_format_idc;
      record.bitDepthLumaMinus8 = bit_depth_luma_minus8;
      record.bitDepthChromaMinus8 = bit_depth_chroma_minus8;
      record.sequenceParameterSetExt = spsExtUnits;
    }
    return record;
  } catch (error2) {
    console.error("Error building AVC Decoder Configuration Record:", error2);
    return null;
  }
};
var NALU_TYPE_VPS = 32;
var NALU_TYPE_SPS = 33;
var NALU_TYPE_PPS = 34;
var NALU_TYPE_SEI_PREFIX = 39;
var NALU_TYPE_SEI_SUFFIX = 40;
var extractNalUnitTypeForHevc = (data) => {
  return data[0] >> 1 & 63;
};
var extractHevcDecoderConfigurationRecord = (packetData) => {
  try {
    const nalUnits = findNalUnitsInAnnexB(packetData);
    const vpsUnits = nalUnits.filter((unit) => extractNalUnitTypeForHevc(unit) === NALU_TYPE_VPS);
    const spsUnits = nalUnits.filter((unit) => extractNalUnitTypeForHevc(unit) === NALU_TYPE_SPS);
    const ppsUnits = nalUnits.filter((unit) => extractNalUnitTypeForHevc(unit) === NALU_TYPE_PPS);
    const seiUnits = nalUnits.filter((unit) => extractNalUnitTypeForHevc(unit) === NALU_TYPE_SEI_PREFIX || extractNalUnitTypeForHevc(unit) === NALU_TYPE_SEI_SUFFIX);
    if (spsUnits.length === 0 || ppsUnits.length === 0)
      return null;
    const sps = spsUnits[0];
    const bitstream = new Bitstream(removeEmulationPreventionBytes(sps));
    bitstream.skipBits(16);
    bitstream.readBits(4);
    const sps_max_sub_layers_minus1 = bitstream.readBits(3);
    const sps_temporal_id_nesting_flag = bitstream.readBits(1);
    const { general_profile_space, general_tier_flag, general_profile_idc, general_profile_compatibility_flags, general_constraint_indicator_flags, general_level_idc } = parseProfileTierLevel(bitstream, sps_max_sub_layers_minus1);
    readExpGolomb(bitstream);
    const chroma_format_idc = readExpGolomb(bitstream);
    if (chroma_format_idc === 3)
      bitstream.skipBits(1);
    readExpGolomb(bitstream);
    readExpGolomb(bitstream);
    if (bitstream.readBits(1)) {
      readExpGolomb(bitstream);
      readExpGolomb(bitstream);
      readExpGolomb(bitstream);
      readExpGolomb(bitstream);
    }
    const bit_depth_luma_minus8 = readExpGolomb(bitstream);
    const bit_depth_chroma_minus8 = readExpGolomb(bitstream);
    readExpGolomb(bitstream);
    const sps_sub_layer_ordering_info_present_flag = bitstream.readBits(1);
    const maxNum = sps_sub_layer_ordering_info_present_flag ? 0 : sps_max_sub_layers_minus1;
    for (let i = maxNum; i <= sps_max_sub_layers_minus1; i++) {
      readExpGolomb(bitstream);
      readExpGolomb(bitstream);
      readExpGolomb(bitstream);
    }
    readExpGolomb(bitstream);
    readExpGolomb(bitstream);
    readExpGolomb(bitstream);
    readExpGolomb(bitstream);
    readExpGolomb(bitstream);
    readExpGolomb(bitstream);
    if (bitstream.readBits(1)) {
      if (bitstream.readBits(1)) {
        skipScalingListData(bitstream);
      }
    }
    bitstream.skipBits(1);
    bitstream.skipBits(1);
    if (bitstream.readBits(1)) {
      bitstream.skipBits(4);
      bitstream.skipBits(4);
      readExpGolomb(bitstream);
      readExpGolomb(bitstream);
      bitstream.skipBits(1);
    }
    const num_short_term_ref_pic_sets = readExpGolomb(bitstream);
    skipAllStRefPicSets(bitstream, num_short_term_ref_pic_sets);
    if (bitstream.readBits(1)) {
      const num_long_term_ref_pics_sps = readExpGolomb(bitstream);
      for (let i = 0; i < num_long_term_ref_pics_sps; i++) {
        readExpGolomb(bitstream);
        bitstream.skipBits(1);
      }
    }
    bitstream.skipBits(1);
    bitstream.skipBits(1);
    let min_spatial_segmentation_idc = 0;
    if (bitstream.readBits(1)) {
      min_spatial_segmentation_idc = parseVuiForMinSpatialSegmentationIdc(bitstream, sps_max_sub_layers_minus1);
    }
    let parallelismType = 0;
    if (ppsUnits.length > 0) {
      const pps = ppsUnits[0];
      const ppsBitstream = new Bitstream(removeEmulationPreventionBytes(pps));
      ppsBitstream.skipBits(16);
      readExpGolomb(ppsBitstream);
      readExpGolomb(ppsBitstream);
      ppsBitstream.skipBits(1);
      ppsBitstream.skipBits(1);
      ppsBitstream.skipBits(3);
      ppsBitstream.skipBits(1);
      ppsBitstream.skipBits(1);
      readExpGolomb(ppsBitstream);
      readExpGolomb(ppsBitstream);
      readSignedExpGolomb(ppsBitstream);
      ppsBitstream.skipBits(1);
      ppsBitstream.skipBits(1);
      if (ppsBitstream.readBits(1)) {
        readExpGolomb(ppsBitstream);
      }
      readSignedExpGolomb(ppsBitstream);
      readSignedExpGolomb(ppsBitstream);
      ppsBitstream.skipBits(1);
      ppsBitstream.skipBits(1);
      ppsBitstream.skipBits(1);
      ppsBitstream.skipBits(1);
      const tiles_enabled_flag = ppsBitstream.readBits(1);
      const entropy_coding_sync_enabled_flag = ppsBitstream.readBits(1);
      if (!tiles_enabled_flag && !entropy_coding_sync_enabled_flag)
        parallelismType = 0;
      else if (tiles_enabled_flag && !entropy_coding_sync_enabled_flag)
        parallelismType = 2;
      else if (!tiles_enabled_flag && entropy_coding_sync_enabled_flag)
        parallelismType = 3;
      else
        parallelismType = 0;
    }
    const arrays = [
      ...vpsUnits.length ? [
        {
          arrayCompleteness: 1,
          nalUnitType: NALU_TYPE_VPS,
          nalUnits: vpsUnits
        }
      ] : [],
      ...spsUnits.length ? [
        {
          arrayCompleteness: 1,
          nalUnitType: NALU_TYPE_SPS,
          nalUnits: spsUnits
        }
      ] : [],
      ...ppsUnits.length ? [
        {
          arrayCompleteness: 1,
          nalUnitType: NALU_TYPE_PPS,
          nalUnits: ppsUnits
        }
      ] : [],
      ...seiUnits.length ? [
        {
          arrayCompleteness: 1,
          nalUnitType: extractNalUnitTypeForHevc(seiUnits[0]),
          nalUnits: seiUnits
        }
      ] : []
    ];
    const record = {
      configurationVersion: 1,
      generalProfileSpace: general_profile_space,
      generalTierFlag: general_tier_flag,
      generalProfileIdc: general_profile_idc,
      generalProfileCompatibilityFlags: general_profile_compatibility_flags,
      generalConstraintIndicatorFlags: general_constraint_indicator_flags,
      generalLevelIdc: general_level_idc,
      minSpatialSegmentationIdc: min_spatial_segmentation_idc,
      parallelismType,
      chromaFormatIdc: chroma_format_idc,
      bitDepthLumaMinus8: bit_depth_luma_minus8,
      bitDepthChromaMinus8: bit_depth_chroma_minus8,
      avgFrameRate: 0,
      constantFrameRate: 0,
      numTemporalLayers: sps_max_sub_layers_minus1 + 1,
      temporalIdNested: sps_temporal_id_nesting_flag,
      lengthSizeMinusOne: 3,
      arrays
    };
    return record;
  } catch (error2) {
    console.error("Error building HEVC Decoder Configuration Record:", error2);
    return null;
  }
};
var parseProfileTierLevel = (bitstream, maxNumSubLayersMinus1) => {
  const general_profile_space = bitstream.readBits(2);
  const general_tier_flag = bitstream.readBits(1);
  const general_profile_idc = bitstream.readBits(5);
  let general_profile_compatibility_flags = 0;
  for (let i = 0; i < 32; i++) {
    general_profile_compatibility_flags = general_profile_compatibility_flags << 1 | bitstream.readBits(1);
  }
  const general_constraint_indicator_flags = new Uint8Array(6);
  for (let i = 0; i < 6; i++) {
    general_constraint_indicator_flags[i] = bitstream.readBits(8);
  }
  const general_level_idc = bitstream.readBits(8);
  const sub_layer_profile_present_flag = [];
  const sub_layer_level_present_flag = [];
  for (let i = 0; i < maxNumSubLayersMinus1; i++) {
    sub_layer_profile_present_flag.push(bitstream.readBits(1));
    sub_layer_level_present_flag.push(bitstream.readBits(1));
  }
  if (maxNumSubLayersMinus1 > 0) {
    for (let i = maxNumSubLayersMinus1; i < 8; i++) {
      bitstream.skipBits(2);
    }
  }
  for (let i = 0; i < maxNumSubLayersMinus1; i++) {
    if (sub_layer_profile_present_flag[i])
      bitstream.skipBits(88);
    if (sub_layer_level_present_flag[i])
      bitstream.skipBits(8);
  }
  return {
    general_profile_space,
    general_tier_flag,
    general_profile_idc,
    general_profile_compatibility_flags,
    general_constraint_indicator_flags,
    general_level_idc
  };
};
var skipScalingListData = (bitstream) => {
  for (let sizeId = 0; sizeId < 4; sizeId++) {
    for (let matrixId = 0; matrixId < (sizeId === 3 ? 2 : 6); matrixId++) {
      const scaling_list_pred_mode_flag = bitstream.readBits(1);
      if (!scaling_list_pred_mode_flag) {
        readExpGolomb(bitstream);
      } else {
        const coefNum = Math.min(64, 1 << 4 + (sizeId << 1));
        if (sizeId > 1) {
          readSignedExpGolomb(bitstream);
        }
        for (let i = 0; i < coefNum; i++) {
          readSignedExpGolomb(bitstream);
        }
      }
    }
  }
};
var skipAllStRefPicSets = (bitstream, num_short_term_ref_pic_sets) => {
  const NumDeltaPocs = [];
  for (let stRpsIdx = 0; stRpsIdx < num_short_term_ref_pic_sets; stRpsIdx++) {
    NumDeltaPocs[stRpsIdx] = skipStRefPicSet(bitstream, stRpsIdx, num_short_term_ref_pic_sets, NumDeltaPocs);
  }
};
var skipStRefPicSet = (bitstream, stRpsIdx, num_short_term_ref_pic_sets, NumDeltaPocs) => {
  let NumDeltaPocsThis = 0;
  let inter_ref_pic_set_prediction_flag = 0;
  let RefRpsIdx = 0;
  if (stRpsIdx !== 0) {
    inter_ref_pic_set_prediction_flag = bitstream.readBits(1);
  }
  if (inter_ref_pic_set_prediction_flag) {
    if (stRpsIdx === num_short_term_ref_pic_sets) {
      const delta_idx_minus1 = readExpGolomb(bitstream);
      RefRpsIdx = stRpsIdx - (delta_idx_minus1 + 1);
    } else {
      RefRpsIdx = stRpsIdx - 1;
    }
    bitstream.readBits(1);
    readExpGolomb(bitstream);
    const numDelta = NumDeltaPocs[RefRpsIdx] ?? 0;
    for (let j = 0; j <= numDelta; j++) {
      const used_by_curr_pic_flag = bitstream.readBits(1);
      if (!used_by_curr_pic_flag) {
        bitstream.readBits(1);
      }
    }
    NumDeltaPocsThis = NumDeltaPocs[RefRpsIdx];
  } else {
    const num_negative_pics = readExpGolomb(bitstream);
    const num_positive_pics = readExpGolomb(bitstream);
    for (let i = 0; i < num_negative_pics; i++) {
      readExpGolomb(bitstream);
      bitstream.readBits(1);
    }
    for (let i = 0; i < num_positive_pics; i++) {
      readExpGolomb(bitstream);
      bitstream.readBits(1);
    }
    NumDeltaPocsThis = num_negative_pics + num_positive_pics;
  }
  return NumDeltaPocsThis;
};
var parseVuiForMinSpatialSegmentationIdc = (bitstream, sps_max_sub_layers_minus1) => {
  if (bitstream.readBits(1)) {
    const aspect_ratio_idc = bitstream.readBits(8);
    if (aspect_ratio_idc === 255) {
      bitstream.readBits(16);
      bitstream.readBits(16);
    }
  }
  if (bitstream.readBits(1)) {
    bitstream.readBits(1);
  }
  if (bitstream.readBits(1)) {
    bitstream.readBits(3);
    bitstream.readBits(1);
    if (bitstream.readBits(1)) {
      bitstream.readBits(8);
      bitstream.readBits(8);
      bitstream.readBits(8);
    }
  }
  if (bitstream.readBits(1)) {
    readExpGolomb(bitstream);
    readExpGolomb(bitstream);
  }
  bitstream.readBits(1);
  bitstream.readBits(1);
  bitstream.readBits(1);
  if (bitstream.readBits(1)) {
    readExpGolomb(bitstream);
    readExpGolomb(bitstream);
    readExpGolomb(bitstream);
    readExpGolomb(bitstream);
  }
  if (bitstream.readBits(1)) {
    bitstream.readBits(32);
    bitstream.readBits(32);
    if (bitstream.readBits(1)) {
      readExpGolomb(bitstream);
    }
    if (bitstream.readBits(1)) {
      skipHrdParameters(bitstream, true, sps_max_sub_layers_minus1);
    }
  }
  if (bitstream.readBits(1)) {
    bitstream.readBits(1);
    bitstream.readBits(1);
    bitstream.readBits(1);
    const min_spatial_segmentation_idc = readExpGolomb(bitstream);
    readExpGolomb(bitstream);
    readExpGolomb(bitstream);
    readExpGolomb(bitstream);
    readExpGolomb(bitstream);
    return min_spatial_segmentation_idc;
  }
  return 0;
};
var skipHrdParameters = (bitstream, commonInfPresentFlag, maxNumSubLayersMinus1) => {
  let nal_hrd_parameters_present_flag = false;
  let vcl_hrd_parameters_present_flag = false;
  let sub_pic_hrd_params_present_flag = false;
  if (commonInfPresentFlag) {
    nal_hrd_parameters_present_flag = bitstream.readBits(1) === 1;
    vcl_hrd_parameters_present_flag = bitstream.readBits(1) === 1;
    if (nal_hrd_parameters_present_flag || vcl_hrd_parameters_present_flag) {
      sub_pic_hrd_params_present_flag = bitstream.readBits(1) === 1;
      if (sub_pic_hrd_params_present_flag) {
        bitstream.readBits(8);
        bitstream.readBits(5);
        bitstream.readBits(1);
        bitstream.readBits(5);
      }
      bitstream.readBits(4);
      bitstream.readBits(4);
      if (sub_pic_hrd_params_present_flag) {
        bitstream.readBits(4);
      }
      bitstream.readBits(5);
      bitstream.readBits(5);
      bitstream.readBits(5);
    }
  }
  for (let i = 0; i <= maxNumSubLayersMinus1; i++) {
    const fixed_pic_rate_general_flag = bitstream.readBits(1) === 1;
    let fixed_pic_rate_within_cvs_flag = true;
    if (!fixed_pic_rate_general_flag) {
      fixed_pic_rate_within_cvs_flag = bitstream.readBits(1) === 1;
    }
    let low_delay_hrd_flag = false;
    if (fixed_pic_rate_within_cvs_flag) {
      readExpGolomb(bitstream);
    } else {
      low_delay_hrd_flag = bitstream.readBits(1) === 1;
    }
    let CpbCnt = 1;
    if (!low_delay_hrd_flag) {
      const cpb_cnt_minus1 = readExpGolomb(bitstream);
      CpbCnt = cpb_cnt_minus1 + 1;
    }
    if (nal_hrd_parameters_present_flag) {
      skipSubLayerHrdParameters(bitstream, CpbCnt, sub_pic_hrd_params_present_flag);
    }
    if (vcl_hrd_parameters_present_flag) {
      skipSubLayerHrdParameters(bitstream, CpbCnt, sub_pic_hrd_params_present_flag);
    }
  }
};
var skipSubLayerHrdParameters = (bitstream, CpbCnt, sub_pic_hrd_params_present_flag) => {
  for (let i = 0; i < CpbCnt; i++) {
    readExpGolomb(bitstream);
    readExpGolomb(bitstream);
    if (sub_pic_hrd_params_present_flag) {
      readExpGolomb(bitstream);
      readExpGolomb(bitstream);
    }
    bitstream.readBits(1);
  }
};
var extractVp9CodecInfoFromPacket = (packet) => {
  const bitstream = new Bitstream(packet);
  const frameMarker = bitstream.readBits(2);
  if (frameMarker !== 2) {
    return null;
  }
  const profileLowBit = bitstream.readBits(1);
  const profileHighBit = bitstream.readBits(1);
  const profile = (profileHighBit << 1) + profileLowBit;
  if (profile === 3) {
    bitstream.skipBits(1);
  }
  const showExistingFrame = bitstream.readBits(1);
  if (showExistingFrame === 1) {
    return null;
  }
  const frameType = bitstream.readBits(1);
  if (frameType !== 0) {
    return null;
  }
  bitstream.skipBits(2);
  const syncCode = bitstream.readBits(24);
  if (syncCode !== 4817730) {
    return null;
  }
  let bitDepth = 8;
  if (profile >= 2) {
    const tenOrTwelveBit = bitstream.readBits(1);
    bitDepth = tenOrTwelveBit ? 12 : 10;
  }
  const colorSpace = bitstream.readBits(3);
  let chromaSubsampling = 0;
  let videoFullRangeFlag = 0;
  if (colorSpace !== 7) {
    const colorRange = bitstream.readBits(1);
    videoFullRangeFlag = colorRange;
    if (profile === 1 || profile === 3) {
      const subsamplingX = bitstream.readBits(1);
      const subsamplingY = bitstream.readBits(1);
      chromaSubsampling = !subsamplingX && !subsamplingY ? 3 : subsamplingX && !subsamplingY ? 2 : 1;
      bitstream.skipBits(1);
    } else {
      chromaSubsampling = 1;
    }
  } else {
    chromaSubsampling = 3;
    videoFullRangeFlag = 1;
  }
  const widthMinusOne = bitstream.readBits(16);
  const heightMinusOne = bitstream.readBits(16);
  const width = widthMinusOne + 1;
  const height = heightMinusOne + 1;
  const pictureSize = width * height;
  let level = last(VP9_LEVEL_TABLE).level;
  for (const entry of VP9_LEVEL_TABLE) {
    if (pictureSize <= entry.maxPictureSize) {
      level = entry.level;
      break;
    }
  }
  const matrixCoefficients = colorSpace === 7 ? 0 : colorSpace === 2 ? 1 : colorSpace === 1 ? 6 : 2;
  const colourPrimaries = colorSpace === 2 ? 1 : colorSpace === 1 ? 6 : 2;
  const transferCharacteristics = colorSpace === 2 ? 1 : colorSpace === 1 ? 6 : 2;
  return {
    profile,
    level,
    bitDepth,
    chromaSubsampling,
    videoFullRangeFlag,
    colourPrimaries,
    transferCharacteristics,
    matrixCoefficients
  };
};
function* iterateAv1PacketObus(packet) {
  const bitstream = new Bitstream(packet);
  const readLeb128 = () => {
    let value = 0;
    for (let i = 0; i < 8; i++) {
      const byte = bitstream.readAlignedByte();
      value |= (byte & 127) << i * 7;
      if (!(byte & 128)) {
        break;
      }
      if (i === 7 && byte & 128) {
        return null;
      }
    }
    if (value >= 2 ** 32 - 1) {
      return null;
    }
    return value;
  };
  while (bitstream.getBitsLeft() >= 8) {
    bitstream.skipBits(1);
    const obuType = bitstream.readBits(4);
    const obuExtension = bitstream.readBits(1);
    const obuHasSizeField = bitstream.readBits(1);
    bitstream.skipBits(1);
    if (obuExtension) {
      bitstream.skipBits(8);
    }
    let obuSize;
    if (obuHasSizeField) {
      const obuSizeValue = readLeb128();
      if (obuSizeValue === null)
        return;
      obuSize = obuSizeValue;
    } else {
      obuSize = Math.floor(bitstream.getBitsLeft() / 8);
    }
    assert(bitstream.pos % 8 === 0);
    yield {
      type: obuType,
      data: packet.subarray(bitstream.pos / 8, bitstream.pos / 8 + obuSize)
    };
    bitstream.skipBits(obuSize * 8);
  }
}
var extractAv1CodecInfoFromPacket = (packet) => {
  for (const { type, data } of iterateAv1PacketObus(packet)) {
    if (type !== 1) {
      continue;
    }
    const bitstream = new Bitstream(data);
    const seqProfile = bitstream.readBits(3);
    const stillPicture = bitstream.readBits(1);
    const reducedStillPictureHeader = bitstream.readBits(1);
    let seqLevel = 0;
    let seqTier = 0;
    let bufferDelayLengthMinus1 = 0;
    if (reducedStillPictureHeader) {
      seqLevel = bitstream.readBits(5);
    } else {
      const timingInfoPresentFlag = bitstream.readBits(1);
      if (timingInfoPresentFlag) {
        bitstream.skipBits(32);
        bitstream.skipBits(32);
        const equalPictureInterval = bitstream.readBits(1);
        if (equalPictureInterval) {
          return null;
        }
      }
      const decoderModelInfoPresentFlag = bitstream.readBits(1);
      if (decoderModelInfoPresentFlag) {
        bufferDelayLengthMinus1 = bitstream.readBits(5);
        bitstream.skipBits(32);
        bitstream.skipBits(5);
        bitstream.skipBits(5);
      }
      const operatingPointsCntMinus1 = bitstream.readBits(5);
      for (let i = 0; i <= operatingPointsCntMinus1; i++) {
        bitstream.skipBits(12);
        const seqLevelIdx = bitstream.readBits(5);
        if (i === 0) {
          seqLevel = seqLevelIdx;
        }
        if (seqLevelIdx > 7) {
          const seqTierTemp = bitstream.readBits(1);
          if (i === 0) {
            seqTier = seqTierTemp;
          }
        }
        if (decoderModelInfoPresentFlag) {
          const decoderModelPresentForThisOp = bitstream.readBits(1);
          if (decoderModelPresentForThisOp) {
            const n = bufferDelayLengthMinus1 + 1;
            bitstream.skipBits(n);
            bitstream.skipBits(n);
            bitstream.skipBits(1);
          }
        }
        const initialDisplayDelayPresentFlag = bitstream.readBits(1);
        if (initialDisplayDelayPresentFlag) {
          bitstream.skipBits(4);
        }
      }
    }
    const highBitdepth = bitstream.readBits(1);
    let bitDepth = 8;
    if (seqProfile === 2 && highBitdepth) {
      const twelveBit = bitstream.readBits(1);
      bitDepth = twelveBit ? 12 : 10;
    } else if (seqProfile <= 2) {
      bitDepth = highBitdepth ? 10 : 8;
    }
    let monochrome = 0;
    if (seqProfile !== 1) {
      monochrome = bitstream.readBits(1);
    }
    let chromaSubsamplingX = 1;
    let chromaSubsamplingY = 1;
    let chromaSamplePosition = 0;
    if (!monochrome) {
      if (seqProfile === 0) {
        chromaSubsamplingX = 1;
        chromaSubsamplingY = 1;
      } else if (seqProfile === 1) {
        chromaSubsamplingX = 0;
        chromaSubsamplingY = 0;
      } else {
        if (bitDepth === 12) {
          chromaSubsamplingX = bitstream.readBits(1);
          if (chromaSubsamplingX) {
            chromaSubsamplingY = bitstream.readBits(1);
          }
        }
      }
      if (chromaSubsamplingX && chromaSubsamplingY) {
        chromaSamplePosition = bitstream.readBits(2);
      }
    }
    return {
      profile: seqProfile,
      level: seqLevel,
      tier: seqTier,
      bitDepth,
      monochrome,
      chromaSubsamplingX,
      chromaSubsamplingY,
      chromaSamplePosition
    };
  }
  return null;
};
var parseOpusIdentificationHeader = (bytes) => {
  const view = toDataView(bytes);
  const outputChannelCount = view.getUint8(9);
  const preSkip = view.getUint16(10, true);
  const inputSampleRate = view.getUint32(12, true);
  const outputGain = view.getInt16(16, true);
  const channelMappingFamily = view.getUint8(18);
  let channelMappingTable = null;
  if (channelMappingFamily) {
    channelMappingTable = bytes.subarray(19, 19 + 2 + outputChannelCount);
  }
  return {
    outputChannelCount,
    preSkip,
    inputSampleRate,
    outputGain,
    channelMappingFamily,
    channelMappingTable
  };
};
var OPUS_FRAME_DURATION_TABLE = [
  480,
  960,
  1920,
  2880,
  480,
  960,
  1920,
  2880,
  480,
  960,
  1920,
  2880,
  480,
  960,
  480,
  960,
  120,
  240,
  480,
  960,
  120,
  240,
  480,
  960,
  120,
  240,
  480,
  960,
  120,
  240,
  480,
  960
];
var parseOpusTocByte = (packet) => {
  const config = packet[0] >> 3;
  return {
    durationInSamples: OPUS_FRAME_DURATION_TABLE[config]
  };
};
var parseModesFromVorbisSetupPacket = (setupHeader) => {
  if (setupHeader.length < 7) {
    throw new Error("Setup header is too short.");
  }
  if (setupHeader[0] !== 5) {
    throw new Error("Wrong packet type in Setup header.");
  }
  const signature = String.fromCharCode(...setupHeader.slice(1, 7));
  if (signature !== "vorbis") {
    throw new Error("Invalid packet signature in Setup header.");
  }
  const bufSize = setupHeader.length;
  const revBuffer = new Uint8Array(bufSize);
  for (let i = 0; i < bufSize; i++) {
    revBuffer[i] = setupHeader[bufSize - 1 - i];
  }
  const bitstream = new Bitstream(revBuffer);
  let gotFramingBit = 0;
  while (bitstream.getBitsLeft() > 97) {
    if (bitstream.readBits(1) === 1) {
      gotFramingBit = bitstream.pos;
      break;
    }
  }
  if (gotFramingBit === 0) {
    throw new Error("Invalid Setup header: framing bit not found.");
  }
  let modeCount = 0;
  let gotModeHeader = false;
  let lastModeCount = 0;
  while (bitstream.getBitsLeft() >= 97) {
    const tempPos = bitstream.pos;
    const a = bitstream.readBits(8);
    const b = bitstream.readBits(16);
    const c = bitstream.readBits(16);
    if (a > 63 || b !== 0 || c !== 0) {
      bitstream.pos = tempPos;
      break;
    }
    bitstream.skipBits(1);
    modeCount++;
    if (modeCount > 64) {
      break;
    }
    const bsClone = bitstream.clone();
    const candidate = bsClone.readBits(6) + 1;
    if (candidate === modeCount) {
      gotModeHeader = true;
      lastModeCount = modeCount;
    }
  }
  if (!gotModeHeader) {
    throw new Error("Invalid Setup header: mode header not found.");
  }
  if (lastModeCount > 63) {
    throw new Error(`Unsupported mode count: ${lastModeCount}.`);
  }
  const finalModeCount = lastModeCount;
  bitstream.pos = 0;
  bitstream.skipBits(gotFramingBit);
  const modeBlockflags = Array(finalModeCount).fill(0);
  for (let i = finalModeCount - 1; i >= 0; i--) {
    bitstream.skipBits(40);
    modeBlockflags[i] = bitstream.readBits(1);
  }
  return { modeBlockflags };
};
var determineVideoPacketType = async (videoTrack, packet) => {
  assert(videoTrack.codec);
  switch (videoTrack.codec) {
    case "avc":
      {
        const decoderConfig = await videoTrack.getDecoderConfig();
        assert(decoderConfig);
        let nalUnits;
        if (decoderConfig.description) {
          const bytes = toUint8Array(decoderConfig.description);
          const lengthSizeMinusOne = bytes[4] & 3;
          const lengthSize = lengthSizeMinusOne + 1;
          nalUnits = findNalUnitsInLengthPrefixed(packet.data, lengthSize);
        } else {
          nalUnits = findNalUnitsInAnnexB(packet.data);
        }
        const isKeyframe = nalUnits.some((x) => extractNalUnitTypeForAvc(x) === 5);
        return isKeyframe ? "key" : "delta";
      }
      ;
    case "hevc":
      {
        const decoderConfig = await videoTrack.getDecoderConfig();
        assert(decoderConfig);
        let nalUnits;
        if (decoderConfig.description) {
          const bytes = toUint8Array(decoderConfig.description);
          const lengthSizeMinusOne = bytes[21] & 3;
          const lengthSize = lengthSizeMinusOne + 1;
          nalUnits = findNalUnitsInLengthPrefixed(packet.data, lengthSize);
        } else {
          nalUnits = findNalUnitsInAnnexB(packet.data);
        }
        const isKeyframe = nalUnits.some((x) => {
          const type = extractNalUnitTypeForHevc(x);
          return 16 <= type && type <= 23;
        });
        return isKeyframe ? "key" : "delta";
      }
      ;
    case "vp8":
      {
        const frameType = packet.data[0] & 1;
        return frameType === 0 ? "key" : "delta";
      }
      ;
    case "vp9":
      {
        const bitstream = new Bitstream(packet.data);
        if (bitstream.readBits(2) !== 2) {
          return null;
        }
        ;
        const profileLowBit = bitstream.readBits(1);
        const profileHighBit = bitstream.readBits(1);
        const profile = (profileHighBit << 1) + profileLowBit;
        if (profile === 3) {
          bitstream.skipBits(1);
        }
        const showExistingFrame = bitstream.readBits(1);
        if (showExistingFrame) {
          return null;
        }
        const frameType = bitstream.readBits(1);
        return frameType === 0 ? "key" : "delta";
      }
      ;
    case "av1":
      {
        let reducedStillPictureHeader = false;
        for (const { type, data } of iterateAv1PacketObus(packet.data)) {
          if (type === 1) {
            const bitstream = new Bitstream(data);
            bitstream.skipBits(4);
            reducedStillPictureHeader = !!bitstream.readBits(1);
          } else if (type === 3 || type === 6 || type === 7) {
            if (reducedStillPictureHeader) {
              return "key";
            }
            const bitstream = new Bitstream(data);
            const showExistingFrame = bitstream.readBits(1);
            if (showExistingFrame) {
              return null;
            }
            const frameType = bitstream.readBits(2);
            return frameType === 0 ? "key" : "delta";
          }
        }
        return null;
      }
      ;
    default:
      {
        assertNever(videoTrack.codec);
        assert(false);
      }
      ;
  }
};

// node_modules/mediabunny/dist/modules/src/isobmff/isobmff-misc.js
var buildIsobmffMimeType = (info) => {
  const base = info.hasVideo ? "video/" : info.hasAudio ? "audio/" : "application/";
  let string = base + (info.isQuickTime ? "quicktime" : "mp4");
  if (info.codecStrings.length > 0) {
    const uniqueCodecMimeTypes = [...new Set(info.codecStrings)];
    string += `; codecs="${uniqueCodecMimeTypes.join(", ")}"`;
  }
  return string;
};

// node_modules/mediabunny/dist/modules/src/isobmff/isobmff-reader.js
var MIN_BOX_HEADER_SIZE = 8;
var MAX_BOX_HEADER_SIZE = 16;
var IsobmffReader = class {
  constructor(reader) {
    this.reader = reader;
    this.pos = 0;
  }
  readBytes(length) {
    const { view, offset } = this.reader.getViewAndOffset(this.pos, this.pos + length);
    this.pos += length;
    return new Uint8Array(view.buffer, offset, length);
  }
  readU8() {
    const { view, offset } = this.reader.getViewAndOffset(this.pos, this.pos + 1);
    this.pos++;
    return view.getUint8(offset);
  }
  readU16() {
    const { view, offset } = this.reader.getViewAndOffset(this.pos, this.pos + 2);
    this.pos += 2;
    return view.getUint16(offset, false);
  }
  readI16() {
    const { view, offset } = this.reader.getViewAndOffset(this.pos, this.pos + 2);
    this.pos += 2;
    return view.getInt16(offset, false);
  }
  readU24() {
    const { view, offset } = this.reader.getViewAndOffset(this.pos, this.pos + 3);
    this.pos += 3;
    const high = view.getUint16(offset, false);
    const low = view.getUint8(offset + 2);
    return high * 256 + low;
  }
  readU32() {
    const { view, offset } = this.reader.getViewAndOffset(this.pos, this.pos + 4);
    this.pos += 4;
    return view.getUint32(offset, false);
  }
  readI32() {
    const { view, offset } = this.reader.getViewAndOffset(this.pos, this.pos + 4);
    this.pos += 4;
    return view.getInt32(offset, false);
  }
  readU64() {
    const high = this.readU32();
    const low = this.readU32();
    return high * 4294967296 + low;
  }
  readI64() {
    const high = this.readI32();
    const low = this.readU32();
    return high * 4294967296 + low;
  }
  readF64() {
    const { view, offset } = this.reader.getViewAndOffset(this.pos, this.pos + 8);
    this.pos += 8;
    return view.getFloat64(offset, false);
  }
  readFixed_16_16() {
    return this.readI32() / 65536;
  }
  readFixed_2_30() {
    return this.readI32() / 1073741824;
  }
  readAscii(length) {
    const { view, offset } = this.reader.getViewAndOffset(this.pos, this.pos + length);
    this.pos += length;
    let str = "";
    for (let i = 0; i < length; i++) {
      str += String.fromCharCode(view.getUint8(offset + i));
    }
    return str;
  }
  readIsomVariableInteger() {
    let result = 0;
    for (let i = 0; i < 4; i++) {
      result <<= 7;
      const nextByte = this.readU8();
      result |= nextByte & 127;
      if ((nextByte & 128) === 0) {
        break;
      }
    }
    return result;
  }
  readBoxHeader() {
    let totalSize = this.readU32();
    const name = this.readAscii(4);
    let headerSize = 8;
    const hasLargeSize = totalSize === 1;
    if (hasLargeSize) {
      totalSize = this.readU64();
      headerSize = 16;
    }
    const contentSize = totalSize - headerSize;
    if (contentSize < 0) {
      return null;
    }
    return { name, totalSize, headerSize, contentSize };
  }
};

// node_modules/mediabunny/dist/modules/src/matroska/ebml.js
var EBMLId;
(function(EBMLId2) {
  EBMLId2[EBMLId2["EBML"] = 440786851] = "EBML";
  EBMLId2[EBMLId2["EBMLVersion"] = 17030] = "EBMLVersion";
  EBMLId2[EBMLId2["EBMLReadVersion"] = 17143] = "EBMLReadVersion";
  EBMLId2[EBMLId2["EBMLMaxIDLength"] = 17138] = "EBMLMaxIDLength";
  EBMLId2[EBMLId2["EBMLMaxSizeLength"] = 17139] = "EBMLMaxSizeLength";
  EBMLId2[EBMLId2["DocType"] = 17026] = "DocType";
  EBMLId2[EBMLId2["DocTypeVersion"] = 17031] = "DocTypeVersion";
  EBMLId2[EBMLId2["DocTypeReadVersion"] = 17029] = "DocTypeReadVersion";
  EBMLId2[EBMLId2["SeekHead"] = 290298740] = "SeekHead";
  EBMLId2[EBMLId2["Seek"] = 19899] = "Seek";
  EBMLId2[EBMLId2["SeekID"] = 21419] = "SeekID";
  EBMLId2[EBMLId2["SeekPosition"] = 21420] = "SeekPosition";
  EBMLId2[EBMLId2["Duration"] = 17545] = "Duration";
  EBMLId2[EBMLId2["Info"] = 357149030] = "Info";
  EBMLId2[EBMLId2["TimestampScale"] = 2807729] = "TimestampScale";
  EBMLId2[EBMLId2["MuxingApp"] = 19840] = "MuxingApp";
  EBMLId2[EBMLId2["WritingApp"] = 22337] = "WritingApp";
  EBMLId2[EBMLId2["Tracks"] = 374648427] = "Tracks";
  EBMLId2[EBMLId2["TrackEntry"] = 174] = "TrackEntry";
  EBMLId2[EBMLId2["TrackNumber"] = 215] = "TrackNumber";
  EBMLId2[EBMLId2["TrackUID"] = 29637] = "TrackUID";
  EBMLId2[EBMLId2["TrackType"] = 131] = "TrackType";
  EBMLId2[EBMLId2["FlagEnabled"] = 185] = "FlagEnabled";
  EBMLId2[EBMLId2["FlagDefault"] = 136] = "FlagDefault";
  EBMLId2[EBMLId2["FlagForced"] = 21930] = "FlagForced";
  EBMLId2[EBMLId2["FlagLacing"] = 156] = "FlagLacing";
  EBMLId2[EBMLId2["Name"] = 21358] = "Name";
  EBMLId2[EBMLId2["Language"] = 2274716] = "Language";
  EBMLId2[EBMLId2["LanguageBCP47"] = 2274717] = "LanguageBCP47";
  EBMLId2[EBMLId2["CodecID"] = 134] = "CodecID";
  EBMLId2[EBMLId2["CodecPrivate"] = 25506] = "CodecPrivate";
  EBMLId2[EBMLId2["CodecDelay"] = 22186] = "CodecDelay";
  EBMLId2[EBMLId2["SeekPreRoll"] = 22203] = "SeekPreRoll";
  EBMLId2[EBMLId2["DefaultDuration"] = 2352003] = "DefaultDuration";
  EBMLId2[EBMLId2["Video"] = 224] = "Video";
  EBMLId2[EBMLId2["PixelWidth"] = 176] = "PixelWidth";
  EBMLId2[EBMLId2["PixelHeight"] = 186] = "PixelHeight";
  EBMLId2[EBMLId2["Audio"] = 225] = "Audio";
  EBMLId2[EBMLId2["SamplingFrequency"] = 181] = "SamplingFrequency";
  EBMLId2[EBMLId2["Channels"] = 159] = "Channels";
  EBMLId2[EBMLId2["BitDepth"] = 25188] = "BitDepth";
  EBMLId2[EBMLId2["Segment"] = 408125543] = "Segment";
  EBMLId2[EBMLId2["SimpleBlock"] = 163] = "SimpleBlock";
  EBMLId2[EBMLId2["BlockGroup"] = 160] = "BlockGroup";
  EBMLId2[EBMLId2["Block"] = 161] = "Block";
  EBMLId2[EBMLId2["BlockAdditions"] = 30113] = "BlockAdditions";
  EBMLId2[EBMLId2["BlockMore"] = 166] = "BlockMore";
  EBMLId2[EBMLId2["BlockAdditional"] = 165] = "BlockAdditional";
  EBMLId2[EBMLId2["BlockAddID"] = 238] = "BlockAddID";
  EBMLId2[EBMLId2["BlockDuration"] = 155] = "BlockDuration";
  EBMLId2[EBMLId2["ReferenceBlock"] = 251] = "ReferenceBlock";
  EBMLId2[EBMLId2["Cluster"] = 524531317] = "Cluster";
  EBMLId2[EBMLId2["Timestamp"] = 231] = "Timestamp";
  EBMLId2[EBMLId2["Cues"] = 475249515] = "Cues";
  EBMLId2[EBMLId2["CuePoint"] = 187] = "CuePoint";
  EBMLId2[EBMLId2["CueTime"] = 179] = "CueTime";
  EBMLId2[EBMLId2["CueTrackPositions"] = 183] = "CueTrackPositions";
  EBMLId2[EBMLId2["CueTrack"] = 247] = "CueTrack";
  EBMLId2[EBMLId2["CueClusterPosition"] = 241] = "CueClusterPosition";
  EBMLId2[EBMLId2["Colour"] = 21936] = "Colour";
  EBMLId2[EBMLId2["MatrixCoefficients"] = 21937] = "MatrixCoefficients";
  EBMLId2[EBMLId2["TransferCharacteristics"] = 21946] = "TransferCharacteristics";
  EBMLId2[EBMLId2["Primaries"] = 21947] = "Primaries";
  EBMLId2[EBMLId2["Range"] = 21945] = "Range";
  EBMLId2[EBMLId2["Projection"] = 30320] = "Projection";
  EBMLId2[EBMLId2["ProjectionType"] = 30321] = "ProjectionType";
  EBMLId2[EBMLId2["ProjectionPoseRoll"] = 30325] = "ProjectionPoseRoll";
  EBMLId2[EBMLId2["Attachments"] = 423732329] = "Attachments";
  EBMLId2[EBMLId2["Chapters"] = 272869232] = "Chapters";
  EBMLId2[EBMLId2["Tags"] = 307544935] = "Tags";
})(EBMLId || (EBMLId = {}));
var LEVEL_0_EBML_IDS = [
  EBMLId.EBML,
  EBMLId.Segment
];
var LEVEL_1_EBML_IDS = [
  EBMLId.SeekHead,
  EBMLId.Info,
  EBMLId.Cluster,
  EBMLId.Tracks,
  EBMLId.Cues,
  EBMLId.Attachments,
  EBMLId.Chapters,
  EBMLId.Tags
];
var LEVEL_0_AND_1_EBML_IDS = [
  ...LEVEL_0_EBML_IDS,
  ...LEVEL_1_EBML_IDS
];
var MAX_VAR_INT_SIZE = 8;
var MIN_HEADER_SIZE = 2;
var MAX_HEADER_SIZE = 2 * MAX_VAR_INT_SIZE;
var EBMLReader = class {
  constructor(reader) {
    this.reader = reader;
    this.pos = 0;
  }
  readBytes(length) {
    const { view, offset } = this.reader.getViewAndOffset(this.pos, this.pos + length);
    this.pos += length;
    return new Uint8Array(view.buffer, offset, length);
  }
  readU8() {
    const { view, offset } = this.reader.getViewAndOffset(this.pos, this.pos + 1);
    this.pos++;
    return view.getUint8(offset);
  }
  readS16() {
    const { view, offset } = this.reader.getViewAndOffset(this.pos, this.pos + 2);
    this.pos += 2;
    return view.getInt16(offset, false);
  }
  readVarIntSize() {
    const { view, offset } = this.reader.getViewAndOffset(this.pos, this.pos + 1);
    const firstByte = view.getUint8(offset);
    if (firstByte === 0) {
      return null;
    }
    let width = 1;
    let mask = 128;
    while ((firstByte & mask) === 0) {
      width++;
      mask >>= 1;
    }
    return width;
  }
  readVarInt() {
    const { view, offset } = this.reader.getViewAndOffset(this.pos, this.pos + 1);
    const firstByte = view.getUint8(offset);
    if (firstByte === 0) {
      return null;
    }
    let width = 1;
    let mask = 1 << 7;
    while ((firstByte & mask) === 0) {
      width++;
      mask >>= 1;
    }
    const { view: fullView, offset: fullOffset } = this.reader.getViewAndOffset(this.pos, this.pos + width);
    let value = firstByte & mask - 1;
    for (let i = 1; i < width; i++) {
      value *= 1 << 8;
      value += fullView.getUint8(fullOffset + i);
    }
    this.pos += width;
    return value;
  }
  readUnsignedInt(width) {
    if (width < 1 || width > 8) {
      throw new Error("Bad unsigned int size " + width);
    }
    const { view, offset } = this.reader.getViewAndOffset(this.pos, this.pos + width);
    let value = 0;
    for (let i = 0; i < width; i++) {
      value *= 1 << 8;
      value += view.getUint8(offset + i);
    }
    this.pos += width;
    return value;
  }
  readSignedInt(width) {
    let value = this.readUnsignedInt(width);
    if (value & 1 << width * 8 - 1) {
      value -= 2 ** (width * 8);
    }
    return value;
  }
  readFloat(width) {
    if (width === 0) {
      return 0;
    }
    if (width !== 4 && width !== 8) {
      throw new Error("Bad float size " + width);
    }
    const { view, offset } = this.reader.getViewAndOffset(this.pos, this.pos + width);
    const value = width === 4 ? view.getFloat32(offset, false) : view.getFloat64(offset, false);
    this.pos += width;
    return value;
  }
  readAsciiString(length) {
    const { view, offset } = this.reader.getViewAndOffset(this.pos, this.pos + length);
    this.pos += length;
    let strLength = 0;
    while (strLength < length && view.getUint8(offset + strLength) !== 0) {
      strLength += 1;
    }
    return String.fromCharCode(...new Uint8Array(view.buffer, offset, strLength));
  }
  readUnicodeString(length) {
    const { view, offset } = this.reader.getViewAndOffset(this.pos, this.pos + length);
    this.pos += length;
    let strLength = 0;
    while (strLength < length && view.getUint8(offset + strLength) !== 0) {
      strLength += 1;
    }
    return textDecoder.decode(new Uint8Array(view.buffer, offset, strLength));
  }
  readElementId() {
    const size = this.readVarIntSize();
    if (size === null) {
      return null;
    }
    const id = this.readUnsignedInt(size);
    return id;
  }
  readElementSize() {
    let size = this.readU8();
    if (size === 255) {
      size = null;
    } else {
      this.pos--;
      size = this.readVarInt();
      if (size === 72057594037927940) {
        size = null;
      }
    }
    return size;
  }
  readElementHeader() {
    const id = this.readElementId();
    if (id === null) {
      return null;
    }
    const size = this.readElementSize();
    return { id, size };
  }
  /** Returns the byte offset in the file of the next element with a matching ID. */
  async searchForNextElementId(ids, until) {
    const loadChunkSize = 2 ** 20;
    const idsSet = new Set(ids);
    while (this.pos <= until - MIN_HEADER_SIZE) {
      if (!this.reader.rangeIsLoaded(this.pos, Math.min(this.pos + MAX_HEADER_SIZE, until))) {
        await this.reader.loadRange(this.pos, Math.min(this.pos + loadChunkSize, until));
      }
      const elementStartPos = this.pos;
      const elementHeader = this.readElementHeader();
      if (!elementHeader) {
        break;
      }
      if (idsSet.has(elementHeader.id)) {
        return elementStartPos;
      }
      assertDefinedSize(elementHeader.size);
      this.pos += elementHeader.size;
    }
    return null;
  }
  /** Searches for the next occurrence of an element ID using a naive byte-wise search. */
  async resync(ids, until) {
    const loadChunkSize = 2 ** 20;
    const idsSet = new Set(ids);
    while (this.pos <= until - MIN_HEADER_SIZE) {
      if (!this.reader.rangeIsLoaded(this.pos, Math.min(this.pos + MAX_HEADER_SIZE, until))) {
        await this.reader.loadRange(this.pos, Math.min(this.pos + loadChunkSize, until));
      }
      const elementStartPos = this.pos;
      const elementId = this.readElementId();
      if (elementId !== null && idsSet.has(elementId)) {
        return elementStartPos;
      }
      this.pos = elementStartPos + 1;
    }
    return null;
  }
};
var CODEC_STRING_MAP = {
  "avc": "V_MPEG4/ISO/AVC",
  "hevc": "V_MPEGH/ISO/HEVC",
  "vp8": "V_VP8",
  "vp9": "V_VP9",
  "av1": "V_AV1",
  "aac": "A_AAC",
  "mp3": "A_MPEG/L3",
  "opus": "A_OPUS",
  "vorbis": "A_VORBIS",
  "flac": "A_FLAC",
  "pcm-u8": "A_PCM/INT/LIT",
  "pcm-s16": "A_PCM/INT/LIT",
  "pcm-s16be": "A_PCM/INT/BIG",
  "pcm-s24": "A_PCM/INT/LIT",
  "pcm-s24be": "A_PCM/INT/BIG",
  "pcm-s32": "A_PCM/INT/LIT",
  "pcm-s32be": "A_PCM/INT/BIG",
  "pcm-f32": "A_PCM/FLOAT/IEEE",
  "pcm-f64": "A_PCM/FLOAT/IEEE",
  "webvtt": "S_TEXT/WEBVTT"
};
var readVarInt = (data, offset) => {
  if (offset >= data.length) {
    throw new Error("Offset out of bounds.");
  }
  const firstByte = data[offset];
  let width = 1;
  let mask = 1 << 7;
  while ((firstByte & mask) === 0 && width < 8) {
    width++;
    mask >>= 1;
  }
  if (offset + width > data.length) {
    throw new Error("VarInt extends beyond data bounds.");
  }
  let value = firstByte & mask - 1;
  for (let i = 1; i < width; i++) {
    value *= 1 << 8;
    value += data[offset + i];
  }
  return { value, width };
};
function assertDefinedSize(size) {
  if (size === null) {
    throw new Error("Undefined element size is used in a place where it is not supported.");
  }
}

// node_modules/mediabunny/dist/modules/src/matroska/matroska-misc.js
var buildMatroskaMimeType = (info) => {
  const base = info.hasVideo ? "video/" : info.hasAudio ? "audio/" : "application/";
  let string = base + (info.isWebM ? "webm" : "x-matroska");
  if (info.codecStrings.length > 0) {
    const uniqueCodecMimeTypes = [...new Set(info.codecStrings.filter(Boolean))];
    string += `; codecs="${uniqueCodecMimeTypes.join(", ")}"`;
  }
  return string;
};

// node_modules/mediabunny/dist/modules/shared/mp3-misc.js
var FRAME_HEADER_SIZE = 4;
var MPEG_V1_BITRATES = {
  // Layer 3
  1: [-1, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, -1],
  // Layer 2
  2: [-1, 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384, -1],
  // Layer 1
  3: [-1, 32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, -1]
};
var MPEG_V2_BITRATES = {
  // Layer 3
  1: [-1, 32, 48, 56, 64, 80, 96, 112, 128, 144, 160, 176, 192, 224, 256, -1],
  // Layer 2
  2: [-1, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160, -1],
  // Layer 1
  3: [-1, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160, -1]
};
var SAMPLING_RATES = {
  // MPEG Version 2.5
  0: [11025, 12e3, 8e3, -1],
  // MPEG Version 2 (ISO/IEC 13818-3)
  2: [22050, 24e3, 16e3, -1],
  // MPEG Version 1 (ISO/IEC 11172-3)
  3: [44100, 48e3, 32e3, -1]
};
var XING = 1483304551;
var INFO = 1231971951;
var computeMp3FrameSize = (layer, bitrate, sampleRate, padding) => {
  if (layer === 3) {
    return Math.floor((12 * bitrate / sampleRate + padding) * 4);
  } else {
    return Math.floor(144 * bitrate / sampleRate + padding);
  }
};
var getXingOffset = (mpegVersionId, channel) => {
  return mpegVersionId === 3 ? channel === 3 ? 21 : 36 : channel === 3 ? 13 : 21;
};
var readFrameHeader = (word, reader) => {
  const startPos = reader.pos;
  const firstByte = word >>> 24;
  const secondByte = word >>> 16 & 255;
  const thirdByte = word >>> 8 & 255;
  const fourthByte = word & 255;
  if (firstByte !== 255 && secondByte !== 255 && thirdByte !== 255 && fourthByte !== 255) {
    reader.pos += 4;
    return null;
  }
  reader.pos += 1;
  if (firstByte !== 255) {
    return null;
  }
  if ((secondByte & 224) !== 224) {
    return null;
  }
  const mpegVersionId = secondByte >> 3 & 3;
  const layer = secondByte >> 1 & 3;
  const bitrateIndex = thirdByte >> 4 & 15;
  const frequencyIndex = thirdByte >> 2 & 3;
  const padding = thirdByte >> 1 & 1;
  const channel = fourthByte >> 6 & 3;
  const modeExtension = fourthByte >> 4 & 3;
  const copyright = fourthByte >> 3 & 1;
  const original = fourthByte >> 2 & 1;
  const emphasis = fourthByte & 3;
  const kilobitRate = mpegVersionId === 3 ? MPEG_V1_BITRATES[layer]?.[bitrateIndex] : MPEG_V2_BITRATES[layer]?.[bitrateIndex];
  if (!kilobitRate || kilobitRate === -1) {
    return null;
  }
  const bitrate = kilobitRate * 1e3;
  const sampleRate = SAMPLING_RATES[mpegVersionId]?.[frequencyIndex];
  if (!sampleRate || sampleRate === -1) {
    return null;
  }
  const frameLength = computeMp3FrameSize(layer, bitrate, sampleRate, padding);
  if (reader.fileSize !== null && reader.fileSize - startPos < frameLength) {
    return null;
  }
  let audioSamplesInFrame;
  if (mpegVersionId === 3) {
    audioSamplesInFrame = layer === 3 ? 384 : 1152;
  } else {
    if (layer === 3) {
      audioSamplesInFrame = 384;
    } else if (layer === 2) {
      audioSamplesInFrame = 1152;
    } else {
      audioSamplesInFrame = 576;
    }
  }
  return {
    startPos,
    totalSize: frameLength,
    mpegVersionId,
    layer,
    bitrate,
    frequencyIndex,
    sampleRate,
    channel,
    modeExtension,
    copyright,
    original,
    emphasis,
    audioSamplesInFrame
  };
};

// node_modules/mediabunny/dist/modules/src/ogg/ogg-misc.js
var OGGS = 1399285583;
var OGG_CRC_POLYNOMIAL = 79764919;
var OGG_CRC_TABLE = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let crc = n << 24;
  for (let k = 0; k < 8; k++) {
    crc = crc & 2147483648 ? crc << 1 ^ OGG_CRC_POLYNOMIAL : crc << 1;
  }
  OGG_CRC_TABLE[n] = crc >>> 0 & 4294967295;
}
var computeOggPageCrc = (bytes) => {
  const view = toDataView(bytes);
  const originalChecksum = view.getUint32(22, true);
  view.setUint32(22, 0, true);
  let crc = 0;
  for (let i = 0; i < bytes.length; i++) {
    const byte = bytes[i];
    crc = (crc << 8 ^ OGG_CRC_TABLE[crc >>> 24 ^ byte]) >>> 0;
  }
  view.setUint32(22, originalChecksum, true);
  return crc;
};
var extractSampleMetadata = (data, codecInfo, vorbisLastBlocksize) => {
  let durationInSamples = 0;
  let currentBlocksize = null;
  if (data.length > 0) {
    if (codecInfo.codec === "vorbis") {
      assert(codecInfo.vorbisInfo);
      const vorbisModeCount = codecInfo.vorbisInfo.modeBlockflags.length;
      const bitCount = ilog(vorbisModeCount - 1);
      const modeMask = (1 << bitCount) - 1 << 1;
      const modeNumber = (data[0] & modeMask) >> 1;
      if (modeNumber >= codecInfo.vorbisInfo.modeBlockflags.length) {
        throw new Error("Invalid mode number.");
      }
      let prevBlocksize = vorbisLastBlocksize;
      const blockflag = codecInfo.vorbisInfo.modeBlockflags[modeNumber];
      currentBlocksize = codecInfo.vorbisInfo.blocksizes[blockflag];
      if (blockflag === 1) {
        const prevMask = (modeMask | 1) + 1;
        const flag = data[0] & prevMask ? 1 : 0;
        prevBlocksize = codecInfo.vorbisInfo.blocksizes[flag];
      }
      durationInSamples = prevBlocksize !== null ? prevBlocksize + currentBlocksize >> 2 : 0;
    } else if (codecInfo.codec === "opus") {
      const toc = parseOpusTocByte(data);
      durationInSamples = toc.durationInSamples;
    }
  }
  return {
    durationInSamples,
    vorbisBlockSize: currentBlocksize
  };
};
var buildOggMimeType = (info) => {
  let string = "audio/ogg";
  if (info.codecStrings) {
    const uniqueCodecMimeTypes = [...new Set(info.codecStrings)];
    string += `; codecs="${uniqueCodecMimeTypes.join(", ")}"`;
  }
  return string;
};

// node_modules/mediabunny/dist/modules/src/ogg/ogg-reader.js
var MIN_PAGE_HEADER_SIZE = 27;
var MAX_PAGE_HEADER_SIZE = 27 + 255;
var MAX_PAGE_SIZE = MAX_PAGE_HEADER_SIZE + 255 * 255;
var OggReader = class {
  constructor(reader) {
    this.reader = reader;
    this.pos = 0;
  }
  readBytes(length) {
    const { view, offset } = this.reader.getViewAndOffset(this.pos, this.pos + length);
    this.pos += length;
    return new Uint8Array(view.buffer, offset, length);
  }
  readU8() {
    const { view, offset } = this.reader.getViewAndOffset(this.pos, this.pos + 1);
    this.pos += 1;
    return view.getUint8(offset);
  }
  readU32() {
    const { view, offset } = this.reader.getViewAndOffset(this.pos, this.pos + 4);
    this.pos += 4;
    return view.getUint32(offset, true);
  }
  readI32() {
    const { view, offset } = this.reader.getViewAndOffset(this.pos, this.pos + 4);
    this.pos += 4;
    return view.getInt32(offset, true);
  }
  readI64() {
    const low = this.readU32();
    const high = this.readI32();
    return high * 4294967296 + low;
  }
  readAscii(length) {
    const { view, offset } = this.reader.getViewAndOffset(this.pos, this.pos + length);
    this.pos += length;
    let str = "";
    for (let i = 0; i < length; i++) {
      str += String.fromCharCode(view.getUint8(offset + i));
    }
    return str;
  }
  readPageHeader() {
    const startPos = this.pos;
    const capturePattern = this.readU32();
    if (capturePattern !== OGGS) {
      return null;
    }
    this.pos += 1;
    const headerType = this.readU8();
    const granulePosition = this.readI64();
    const serialNumber = this.readU32();
    const sequenceNumber = this.readU32();
    const checksum = this.readU32();
    const numberPageSegments = this.readU8();
    const lacingValues = new Uint8Array(numberPageSegments);
    for (let i = 0; i < numberPageSegments; i++) {
      lacingValues[i] = this.readU8();
    }
    const headerSize = 27 + numberPageSegments;
    const dataSize = lacingValues.reduce((a, b) => a + b, 0);
    const totalSize = headerSize + dataSize;
    return {
      headerStartPos: startPos,
      totalSize,
      dataStartPos: startPos + headerSize,
      dataSize,
      headerType,
      granulePosition,
      serialNumber,
      sequenceNumber,
      checksum,
      lacingValues
    };
  }
  findNextPageHeader(until) {
    while (this.pos < until - (4 - 1)) {
      const word = this.readU32();
      const firstByte = word & 255;
      const secondByte = word >>> 8 & 255;
      const thirdByte = word >>> 16 & 255;
      const fourthByte = word >>> 24 & 255;
      const O = 79;
      if (firstByte !== O && secondByte !== O && thirdByte !== O && fourthByte !== O) {
        continue;
      }
      this.pos -= 4;
      if (word === OGGS) {
        return true;
      }
      this.pos += 1;
    }
    return false;
  }
};

// node_modules/mediabunny/dist/modules/src/demuxer.js
var Demuxer = class {
  constructor(input) {
    this.input = input;
  }
};

// node_modules/mediabunny/dist/modules/src/custom-coder.js
var customVideoDecoders = [];
var customAudioDecoders = [];

// node_modules/mediabunny/dist/modules/src/packet.js
var PLACEHOLDER_DATA = new Uint8Array(0);
var EncodedPacket = class _EncodedPacket {
  constructor(data, type, timestamp, duration, sequenceNumber = -1, byteLength) {
    this.data = data;
    this.type = type;
    this.timestamp = timestamp;
    this.duration = duration;
    this.sequenceNumber = sequenceNumber;
    if (data === PLACEHOLDER_DATA && byteLength === void 0) {
      throw new Error("Internal error: byteLength must be explicitly provided when constructing metadata-only packets.");
    }
    if (byteLength === void 0) {
      byteLength = data.byteLength;
    }
    if (!(data instanceof Uint8Array)) {
      throw new TypeError("data must be a Uint8Array.");
    }
    if (type !== "key" && type !== "delta") {
      throw new TypeError('type must be either "key" or "delta".');
    }
    if (!Number.isFinite(timestamp)) {
      throw new TypeError("timestamp must be a number.");
    }
    if (!Number.isFinite(duration) || duration < 0) {
      throw new TypeError("duration must be a non-negative number.");
    }
    if (!Number.isFinite(sequenceNumber)) {
      throw new TypeError("sequenceNumber must be a number.");
    }
    if (!Number.isInteger(byteLength) || byteLength < 0) {
      throw new TypeError("byteLength must be a non-negative integer.");
    }
    this.byteLength = byteLength;
  }
  /** If this packet is a metadata-only packet. Metadata-only packets don't contain their packet data. */
  get isMetadataOnly() {
    return this.data === PLACEHOLDER_DATA;
  }
  /** The timestamp of this packet in microseconds. */
  get microsecondTimestamp() {
    return Math.trunc(SECOND_TO_MICROSECOND_FACTOR * this.timestamp);
  }
  /** The duration of this packet in microseconds. */
  get microsecondDuration() {
    return Math.trunc(SECOND_TO_MICROSECOND_FACTOR * this.duration);
  }
  /** Converts this packet to an EncodedVideoChunk for use with the WebCodecs API. */
  toEncodedVideoChunk() {
    if (this.isMetadataOnly) {
      throw new TypeError("Metadata-only packets cannot be converted to a video chunk.");
    }
    if (typeof EncodedVideoChunk === "undefined") {
      throw new Error("Your browser does not support EncodedVideoChunk.");
    }
    return new EncodedVideoChunk({
      data: this.data,
      type: this.type,
      timestamp: this.microsecondTimestamp,
      duration: this.microsecondDuration
    });
  }
  /** Converts this packet to an EncodedAudioChunk for use with the WebCodecs API. */
  toEncodedAudioChunk() {
    if (this.isMetadataOnly) {
      throw new TypeError("Metadata-only packets cannot be converted to an audio chunk.");
    }
    if (typeof EncodedAudioChunk === "undefined") {
      throw new Error("Your browser does not support EncodedAudioChunk.");
    }
    return new EncodedAudioChunk({
      data: this.data,
      type: this.type,
      timestamp: this.microsecondTimestamp,
      duration: this.microsecondDuration
    });
  }
  /**
   * Creates an EncodedPacket from an EncodedVideoChunk or EncodedAudioChunk. This method is useful for converting
   * chunks from the WebCodecs API to EncodedPackets.
   */
  static fromEncodedChunk(chunk) {
    if (!(chunk instanceof EncodedVideoChunk || chunk instanceof EncodedAudioChunk)) {
      throw new TypeError("chunk must be an EncodedVideoChunk or EncodedAudioChunk.");
    }
    const data = new Uint8Array(chunk.byteLength);
    chunk.copyTo(data);
    return new _EncodedPacket(data, chunk.type, chunk.timestamp / 1e6, (chunk.duration ?? 0) / 1e6);
  }
  /** Clones this packet while optionally updating timing information. */
  clone(options) {
    if (options !== void 0 && (typeof options !== "object" || options === null)) {
      throw new TypeError("options, when provided, must be an object.");
    }
    if (options?.timestamp !== void 0 && !Number.isFinite(options.timestamp)) {
      throw new TypeError("options.timestamp, when provided, must be a number.");
    }
    if (options?.duration !== void 0 && !Number.isFinite(options.duration)) {
      throw new TypeError("options.duration, when provided, must be a number.");
    }
    return new _EncodedPacket(this.data, this.type, options?.timestamp ?? this.timestamp, options?.duration ?? this.duration, this.sequenceNumber, this.byteLength);
  }
};

// node_modules/mediabunny/dist/modules/src/sample.js
var VideoSample = class _VideoSample {
  /** The width of the frame in pixels after rotation. */
  get displayWidth() {
    return this.rotation % 180 === 0 ? this.codedWidth : this.codedHeight;
  }
  /** The height of the frame in pixels after rotation. */
  get displayHeight() {
    return this.rotation % 180 === 0 ? this.codedHeight : this.codedWidth;
  }
  /** The presentation timestamp of the frame in microseconds. */
  get microsecondTimestamp() {
    return Math.trunc(SECOND_TO_MICROSECOND_FACTOR * this.timestamp);
  }
  /** The duration of the frame in microseconds. */
  get microsecondDuration() {
    return Math.trunc(SECOND_TO_MICROSECOND_FACTOR * this.duration);
  }
  constructor(data, init) {
    this._closed = false;
    if (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) {
      if (!init || typeof init !== "object") {
        throw new TypeError("init must be an object.");
      }
      if (!("format" in init) || typeof init.format !== "string") {
        throw new TypeError("init.format must be a string.");
      }
      if (!Number.isInteger(init.codedWidth) || init.codedWidth <= 0) {
        throw new TypeError("init.codedWidth must be a positive integer.");
      }
      if (!Number.isInteger(init.codedHeight) || init.codedHeight <= 0) {
        throw new TypeError("init.codedHeight must be a positive integer.");
      }
      if (init.rotation !== void 0 && ![0, 90, 180, 270].includes(init.rotation)) {
        throw new TypeError("init.rotation, when provided, must be 0, 90, 180, or 270.");
      }
      if (!Number.isFinite(init.timestamp)) {
        throw new TypeError("init.timestamp must be a number.");
      }
      if (init.duration !== void 0 && (!Number.isFinite(init.duration) || init.duration < 0)) {
        throw new TypeError("init.duration, when provided, must be a non-negative number.");
      }
      this._data = toUint8Array(data).slice();
      this.format = init.format;
      this.codedWidth = init.codedWidth;
      this.codedHeight = init.codedHeight;
      this.rotation = init.rotation ?? 0;
      this.timestamp = init.timestamp;
      this.duration = init.duration ?? 0;
      this.colorSpace = new VideoColorSpace(init.colorSpace);
    } else if (typeof VideoFrame !== "undefined" && data instanceof VideoFrame) {
      if (init?.rotation !== void 0 && ![0, 90, 180, 270].includes(init.rotation)) {
        throw new TypeError("init.rotation, when provided, must be 0, 90, 180, or 270.");
      }
      if (init?.timestamp !== void 0 && !Number.isFinite(init?.timestamp)) {
        throw new TypeError("init.timestamp, when provided, must be a number.");
      }
      if (init?.duration !== void 0 && (!Number.isFinite(init.duration) || init.duration < 0)) {
        throw new TypeError("init.duration, when provided, must be a non-negative number.");
      }
      this._data = data;
      this.format = data.format;
      this.codedWidth = data.codedWidth;
      this.codedHeight = data.codedHeight;
      this.rotation = init?.rotation ?? 0;
      this.timestamp = init?.timestamp ?? data.timestamp / 1e6;
      this.duration = init?.duration ?? (data.duration ?? 0) / 1e6;
      this.colorSpace = data.colorSpace;
    } else if (typeof HTMLImageElement !== "undefined" && data instanceof HTMLImageElement || typeof SVGImageElement !== "undefined" && data instanceof SVGImageElement || typeof ImageBitmap !== "undefined" && data instanceof ImageBitmap || typeof HTMLVideoElement !== "undefined" && data instanceof HTMLVideoElement || typeof HTMLCanvasElement !== "undefined" && data instanceof HTMLCanvasElement || typeof OffscreenCanvas !== "undefined" && data instanceof OffscreenCanvas) {
      if (!init || typeof init !== "object") {
        throw new TypeError("init must be an object.");
      }
      if (init.rotation !== void 0 && ![0, 90, 180, 270].includes(init.rotation)) {
        throw new TypeError("init.rotation, when provided, must be 0, 90, 180, or 270.");
      }
      if (!Number.isFinite(init.timestamp)) {
        throw new TypeError("init.timestamp must be a number.");
      }
      if (init.duration !== void 0 && (!Number.isFinite(init.duration) || init.duration < 0)) {
        throw new TypeError("init.duration, when provided, must be a non-negative number.");
      }
      if (typeof VideoFrame !== "undefined") {
        return new _VideoSample(new VideoFrame(data, {
          timestamp: Math.trunc(init.timestamp * SECOND_TO_MICROSECOND_FACTOR),
          duration: Math.trunc((init.duration ?? 0) * SECOND_TO_MICROSECOND_FACTOR)
        }), init);
      }
      let width = 0;
      let height = 0;
      if ("naturalWidth" in data) {
        width = data.naturalWidth;
        height = data.naturalHeight;
      } else if ("videoWidth" in data) {
        width = data.videoWidth;
        height = data.videoHeight;
      } else if ("width" in data) {
        width = Number(data.width);
        height = Number(data.height);
      }
      if (!width || !height) {
        throw new TypeError("Could not determine dimensions.");
      }
      const canvas = new OffscreenCanvas(width, height);
      const context = canvas.getContext("2d", { alpha: false, willReadFrequently: true });
      assert(context);
      context.drawImage(data, 0, 0);
      this._data = canvas;
      this.format = "RGBX";
      this.codedWidth = width;
      this.codedHeight = height;
      this.rotation = init.rotation ?? 0;
      this.timestamp = init.timestamp;
      this.duration = init.duration ?? 0;
      this.colorSpace = new VideoColorSpace({
        matrix: "rgb",
        primaries: "bt709",
        transfer: "iec61966-2-1",
        fullRange: true
      });
    } else {
      throw new TypeError("Invalid data type: Must be a BufferSource or CanvasImageSource.");
    }
  }
  /** Clones this video sample. */
  clone() {
    if (this._closed) {
      throw new Error("VideoSample is closed.");
    }
    assert(this._data !== null);
    if (isVideoFrame(this._data)) {
      return new _VideoSample(this._data.clone(), {
        timestamp: this.timestamp,
        duration: this.duration,
        rotation: this.rotation
      });
    } else if (this._data instanceof Uint8Array) {
      return new _VideoSample(this._data.slice(), {
        format: this.format,
        codedWidth: this.codedWidth,
        codedHeight: this.codedHeight,
        timestamp: this.timestamp,
        duration: this.duration,
        colorSpace: this.colorSpace,
        rotation: this.rotation
      });
    } else {
      return new _VideoSample(this._data, {
        format: this.format,
        codedWidth: this.codedWidth,
        codedHeight: this.codedHeight,
        timestamp: this.timestamp,
        duration: this.duration,
        colorSpace: this.colorSpace,
        rotation: this.rotation
      });
    }
  }
  /**
   * Closes this video sample, releasing held resources. Video samples should be closed as soon as they are not
   * needed anymore.
   */
  close() {
    if (this._closed) {
      return;
    }
    if (isVideoFrame(this._data)) {
      this._data.close();
    } else {
      this._data = null;
    }
    this._closed = true;
  }
  /** Returns the number of bytes required to hold this video sample's pixel data. */
  allocationSize() {
    if (this._closed) {
      throw new Error("VideoSample is closed.");
    }
    assert(this._data !== null);
    if (isVideoFrame(this._data)) {
      return this._data.allocationSize();
    } else if (this._data instanceof Uint8Array) {
      return this._data.byteLength;
    } else {
      return this.codedWidth * this.codedHeight * 4;
    }
  }
  /** Copies this video sample's pixel data to an ArrayBuffer or ArrayBufferView. */
  async copyTo(destination) {
    if (!isAllowSharedBufferSource(destination)) {
      throw new TypeError("destination must be an ArrayBuffer or an ArrayBuffer view.");
    }
    if (this._closed) {
      throw new Error("VideoSample is closed.");
    }
    assert(this._data !== null);
    if (isVideoFrame(this._data)) {
      await this._data.copyTo(destination);
    } else if (this._data instanceof Uint8Array) {
      const dest = toUint8Array(destination);
      dest.set(this._data);
    } else {
      const canvas = this._data;
      const context = canvas.getContext("2d", { alpha: false });
      assert(context);
      const imageData = context.getImageData(0, 0, this.codedWidth, this.codedHeight);
      const dest = toUint8Array(destination);
      dest.set(imageData.data);
    }
  }
  /**
   * Converts this video sample to a VideoFrame for use with the WebCodecs API. The VideoFrame returned by this
   * method *must* be closed separately from this video sample.
   */
  toVideoFrame() {
    if (this._closed) {
      throw new Error("VideoSample is closed.");
    }
    assert(this._data !== null);
    if (isVideoFrame(this._data)) {
      return new VideoFrame(this._data, {
        timestamp: this.microsecondTimestamp,
        duration: this.microsecondDuration || void 0
        // Drag 0 duration to undefined, glitches some codecs
      });
    } else if (this._data instanceof Uint8Array) {
      return new VideoFrame(this._data, {
        format: this.format,
        codedWidth: this.codedWidth,
        codedHeight: this.codedHeight,
        timestamp: this.microsecondTimestamp,
        duration: this.microsecondDuration,
        colorSpace: this.colorSpace
      });
    } else {
      return new VideoFrame(this._data, {
        timestamp: this.microsecondTimestamp,
        duration: this.microsecondDuration
      });
    }
  }
  draw(context, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
    let sx = 0;
    let sy = 0;
    let sWidth = this.displayWidth;
    let sHeight = this.displayHeight;
    let dx = 0;
    let dy = 0;
    let dWidth = this.displayWidth;
    let dHeight = this.displayHeight;
    if (arg5 !== void 0) {
      sx = arg1;
      sy = arg2;
      sWidth = arg3;
      sHeight = arg4;
      dx = arg5;
      dy = arg6;
      if (arg7 !== void 0) {
        dWidth = arg7;
        dHeight = arg8;
      } else {
        dWidth = sWidth;
        dHeight = sHeight;
      }
    } else {
      dx = arg1;
      dy = arg2;
      if (arg3 !== void 0) {
        dWidth = arg3;
        dHeight = arg4;
      }
    }
    if (!(typeof CanvasRenderingContext2D !== "undefined" && context instanceof CanvasRenderingContext2D || typeof OffscreenCanvasRenderingContext2D !== "undefined" && context instanceof OffscreenCanvasRenderingContext2D)) {
      throw new TypeError("context must be a CanvasRenderingContext2D or OffscreenCanvasRenderingContext2D.");
    }
    if (!Number.isFinite(sx)) {
      throw new TypeError("sx must be a number.");
    }
    if (!Number.isFinite(sy)) {
      throw new TypeError("sy must be a number.");
    }
    if (!Number.isFinite(sWidth) || sWidth < 0) {
      throw new TypeError("sWidth must be a non-negative number.");
    }
    if (!Number.isFinite(sHeight) || sHeight < 0) {
      throw new TypeError("sHeight must be a non-negative number.");
    }
    if (!Number.isFinite(dx)) {
      throw new TypeError("dx must be a number.");
    }
    if (!Number.isFinite(dy)) {
      throw new TypeError("dy must be a number.");
    }
    if (!Number.isFinite(dWidth) || dWidth < 0) {
      throw new TypeError("dWidth must be a non-negative number.");
    }
    if (!Number.isFinite(dHeight) || dHeight < 0) {
      throw new TypeError("dHeight must be a non-negative number.");
    }
    if (this._closed) {
      throw new Error("VideoSample is closed.");
    }
    if (this.rotation === 90) {
      [sx, sy, sWidth, sHeight] = [
        sy,
        this.codedHeight - sx - sWidth,
        sHeight,
        sWidth
      ];
    } else if (this.rotation === 180) {
      [sx, sy] = [
        this.codedWidth - sx - sWidth,
        this.codedHeight - sy - sHeight
      ];
    } else if (this.rotation === 270) {
      [sx, sy, sWidth, sHeight] = [
        this.codedWidth - sy - sHeight,
        sx,
        sHeight,
        sWidth
      ];
    }
    const source = this.toCanvasImageSource();
    context.save();
    const centerX = dx + dWidth / 2;
    const centerY = dy + dHeight / 2;
    context.translate(centerX, centerY);
    context.rotate(this.rotation * Math.PI / 180);
    const aspectRatioChange = this.rotation % 180 === 0 ? 1 : dWidth / dHeight;
    context.scale(1 / aspectRatioChange, aspectRatioChange);
    context.drawImage(source, sx, sy, sWidth, sHeight, -dWidth / 2, -dHeight / 2, dWidth, dHeight);
    context.restore();
  }
  /**
   * Draws the sample in the middle of the canvas corresponding to the context with the specified fit behavior.
   */
  drawWithFit(context, options) {
    const canvasWidth = context.canvas.width;
    const canvasHeight = context.canvas.height;
    const rotation = options.rotation ?? this.rotation;
    let dx;
    let dy;
    let newWidth;
    let newHeight;
    if (options.fit === "fill") {
      dx = 0;
      dy = 0;
      newWidth = canvasWidth;
      newHeight = canvasHeight;
    } else {
      const [sampleWidth, sampleHeight] = rotation % 180 === 0 ? [this.codedWidth, this.codedHeight] : [this.codedHeight, this.codedWidth];
      const scale = options.fit === "contain" ? Math.min(canvasWidth / sampleWidth, canvasHeight / sampleHeight) : Math.max(canvasWidth / sampleWidth, canvasHeight / sampleHeight);
      newWidth = sampleWidth * scale;
      newHeight = sampleHeight * scale;
      dx = (canvasWidth - newWidth) / 2;
      dy = (canvasHeight - newHeight) / 2;
    }
    const aspectRatioChange = rotation % 180 === 0 ? 1 : newWidth / newHeight;
    context.translate(canvasWidth / 2, canvasHeight / 2);
    context.rotate(rotation * Math.PI / 180);
    context.scale(1 / aspectRatioChange, aspectRatioChange);
    context.translate(-canvasWidth / 2, -canvasHeight / 2);
    context.drawImage(this.toCanvasImageSource(), dx, dy, newWidth, newHeight);
  }
  /**
   * Converts this video sample to a CanvasImageSource for drawing to a canvas.
   *
   * You must use the value returned by this method immediately, as any VideoFrame created internally will
   * automatically be closed in the next microtask.
   */
  toCanvasImageSource() {
    if (this._closed) {
      throw new Error("VideoSample is closed.");
    }
    assert(this._data !== null);
    if (this._data instanceof Uint8Array) {
      const videoFrame = this.toVideoFrame();
      queueMicrotask(() => videoFrame.close());
      return videoFrame;
    } else {
      return this._data;
    }
  }
  /** Sets the rotation metadata of this video sample. */
  setRotation(newRotation) {
    if (![0, 90, 180, 270].includes(newRotation)) {
      throw new TypeError("newRotation must be 0, 90, 180, or 270.");
    }
    this.rotation = newRotation;
  }
  /** Sets the presentation timestamp of this video sample, in seconds. */
  setTimestamp(newTimestamp) {
    if (!Number.isFinite(newTimestamp)) {
      throw new TypeError("newTimestamp must be a number.");
    }
    this.timestamp = newTimestamp;
  }
  /** Sets the duration of this video sample, in seconds. */
  setDuration(newDuration) {
    if (!Number.isFinite(newDuration) || newDuration < 0) {
      throw new TypeError("newDuration must be a non-negative number.");
    }
    this.duration = newDuration;
  }
};
var isVideoFrame = (x) => {
  return typeof VideoFrame !== "undefined" && x instanceof VideoFrame;
};

// node_modules/mediabunny/dist/modules/src/media-sink.js
var validatePacketRetrievalOptions = (options) => {
  if (!options || typeof options !== "object") {
    throw new TypeError("options must be an object.");
  }
  if (options.metadataOnly !== void 0 && typeof options.metadataOnly !== "boolean") {
    throw new TypeError("options.metadataOnly, when defined, must be a boolean.");
  }
  if (options.verifyKeyPackets !== void 0 && typeof options.verifyKeyPackets !== "boolean") {
    throw new TypeError("options.verifyKeyPackets, when defined, must be a boolean.");
  }
  if (options.verifyKeyPackets && options.metadataOnly) {
    throw new TypeError("options.verifyKeyPackets and options.metadataOnly cannot be enabled together.");
  }
};
var validateTimestamp = (timestamp) => {
  if (typeof timestamp !== "number" || Number.isNaN(timestamp)) {
    throw new TypeError("timestamp must be a number.");
  }
};
var maybeFixPacketType = (track, promise, options) => {
  if (options.verifyKeyPackets) {
    return promise.then(async (packet) => {
      if (!packet || packet.type === "delta") {
        return packet;
      }
      const determinedType = await track.determinePacketType(packet);
      if (determinedType) {
        packet.type = determinedType;
      }
      return packet;
    });
  } else {
    return promise;
  }
};
var EncodedPacketSink = class {
  constructor(track) {
    if (!(track instanceof InputTrack)) {
      throw new TypeError("track must be an InputTrack.");
    }
    this._track = track;
  }
  /**
   * Retrieves the track's first packet (in decode order), or null if it has no packets. The first packet is very
   * likely to be a key packet.
   */
  getFirstPacket(options = {}) {
    validatePacketRetrievalOptions(options);
    return maybeFixPacketType(this._track, this._track._backing.getFirstPacket(options), options);
  }
  /**
   * Retrieves the packet corresponding to the given timestamp, in seconds. More specifically, returns the last packet
   * (in presentation order) with a start timestamp less than or equal to the given timestamp. This method can be
   * used to retrieve a track's last packet using `getPacket(Infinity)`. The method returns null if the timestamp
   * is before the first packet in the track.
   *
   * @param timestamp - The timestamp used for retrieval, in seconds.
   */
  getPacket(timestamp, options = {}) {
    validateTimestamp(timestamp);
    validatePacketRetrievalOptions(options);
    return maybeFixPacketType(this._track, this._track._backing.getPacket(timestamp, options), options);
  }
  /**
   * Retrieves the packet following the given packet (in decode order), or null if the given packet is the
   * last packet.
   */
  getNextPacket(packet, options = {}) {
    if (!(packet instanceof EncodedPacket)) {
      throw new TypeError("packet must be an EncodedPacket.");
    }
    validatePacketRetrievalOptions(options);
    return maybeFixPacketType(this._track, this._track._backing.getNextPacket(packet, options), options);
  }
  /**
   * Retrieves the key packet corresponding to the given timestamp, in seconds. More specifically, returns the last
   * key packet (in presentation order) with a start timestamp less than or equal to the given timestamp. A key packet
   * is a packet that doesn't require previous packets to be decoded. This method can be used to retrieve a track's
   * last key packet using `getKeyPacket(Infinity)`. The method returns null if the timestamp is before the first
   * key packet in the track.
   *
   * To ensure that the returned packet is guaranteed to be a real key frame, enable `options.verifyKeyPackets`.
   *
   * @param timestamp - The timestamp used for retrieval, in seconds.
   */
  async getKeyPacket(timestamp, options = {}) {
    validateTimestamp(timestamp);
    validatePacketRetrievalOptions(options);
    if (!options.verifyKeyPackets) {
      return this._track._backing.getKeyPacket(timestamp, options);
    }
    const packet = await this._track._backing.getKeyPacket(timestamp, options);
    if (!packet || packet.type === "delta") {
      return packet;
    }
    const determinedType = await this._track.determinePacketType(packet);
    if (determinedType === "delta") {
      return this.getKeyPacket(packet.timestamp - 1 / this._track.timeResolution, options);
    }
    return packet;
  }
  /**
   * Retrieves the key packet following the given packet (in decode order), or null if the given packet is the last
   * key packet.
   *
   * To ensure that the returned packet is guaranteed to be a real key frame, enable `options.verifyKeyPackets`.
   */
  async getNextKeyPacket(packet, options = {}) {
    if (!(packet instanceof EncodedPacket)) {
      throw new TypeError("packet must be an EncodedPacket.");
    }
    validatePacketRetrievalOptions(options);
    if (!options.verifyKeyPackets) {
      return this._track._backing.getNextKeyPacket(packet, options);
    }
    const nextPacket = await this._track._backing.getNextKeyPacket(packet, options);
    if (!nextPacket || nextPacket.type === "delta") {
      return nextPacket;
    }
    const determinedType = await this._track.determinePacketType(nextPacket);
    if (determinedType === "delta") {
      return this.getNextKeyPacket(nextPacket, options);
    }
    return nextPacket;
  }
  /**
   * Creates an async iterator that yields the packets in this track in decode order. To enable fast iteration, this
   * method will intelligently preload packets based on the speed of the consumer.
   *
   * @param startPacket - (optional) The packet from which iteration should begin. This packet will also be yielded.
   * @param endTimestamp - (optional) The timestamp at which iteration should end. This packet will _not_ be yielded.
   */
  packets(startPacket, endPacket, options = {}) {
    if (startPacket !== void 0 && !(startPacket instanceof EncodedPacket)) {
      throw new TypeError("startPacket must be an EncodedPacket.");
    }
    if (startPacket !== void 0 && startPacket.isMetadataOnly && !options?.metadataOnly) {
      throw new TypeError("startPacket can only be metadata-only if options.metadataOnly is enabled.");
    }
    if (endPacket !== void 0 && !(endPacket instanceof EncodedPacket)) {
      throw new TypeError("endPacket must be an EncodedPacket.");
    }
    validatePacketRetrievalOptions(options);
    const packetQueue = [];
    let { promise: queueNotEmpty, resolve: onQueueNotEmpty } = promiseWithResolvers();
    let { promise: queueDequeue, resolve: onQueueDequeue } = promiseWithResolvers();
    let ended = false;
    let terminated = false;
    let outOfBandError = null;
    const timestamps = [];
    const maxQueueSize = () => Math.max(2, timestamps.length);
    (async () => {
      let packet = startPacket ?? await this.getFirstPacket(options);
      while (packet && !terminated) {
        if (endPacket && packet.sequenceNumber >= endPacket?.sequenceNumber) {
          break;
        }
        if (packetQueue.length > maxQueueSize()) {
          ({ promise: queueDequeue, resolve: onQueueDequeue } = promiseWithResolvers());
          await queueDequeue;
          continue;
        }
        packetQueue.push(packet);
        onQueueNotEmpty();
        ({ promise: queueNotEmpty, resolve: onQueueNotEmpty } = promiseWithResolvers());
        packet = await this.getNextPacket(packet, options);
      }
      ended = true;
      onQueueNotEmpty();
    })().catch((error2) => {
      if (!outOfBandError) {
        outOfBandError = error2;
        onQueueNotEmpty();
      }
    });
    return {
      async next() {
        while (true) {
          if (terminated) {
            return { value: void 0, done: true };
          } else if (outOfBandError) {
            throw outOfBandError;
          } else if (packetQueue.length > 0) {
            const value = packetQueue.shift();
            const now = performance.now();
            timestamps.push(now);
            while (timestamps.length > 0 && now - timestamps[0] >= 1e3) {
              timestamps.shift();
            }
            onQueueDequeue();
            return { value, done: false };
          } else if (ended) {
            return { value: void 0, done: true };
          } else {
            await queueNotEmpty;
          }
        }
      },
      async return() {
        terminated = true;
        onQueueDequeue();
        onQueueNotEmpty();
        return { value: void 0, done: true };
      },
      async throw(error2) {
        throw error2;
      },
      [Symbol.asyncIterator]() {
        return this;
      }
    };
  }
};
var DecoderWrapper = class {
  constructor(onSample, onError) {
    this.onSample = onSample;
    this.onError = onError;
  }
};
var BaseMediaSampleSink = class {
  /** @internal */
  mediaSamplesInRange(startTimestamp = 0, endTimestamp = Infinity) {
    validateTimestamp(startTimestamp);
    validateTimestamp(endTimestamp);
    const sampleQueue = [];
    let firstSampleQueued = false;
    let lastSample = null;
    let { promise: queueNotEmpty, resolve: onQueueNotEmpty } = promiseWithResolvers();
    let { promise: queueDequeue, resolve: onQueueDequeue } = promiseWithResolvers();
    let decoderIsFlushed = false;
    let ended = false;
    let terminated = false;
    let outOfBandError = null;
    (async () => {
      const decoderError = new Error();
      const decoder = await this._createDecoder((sample) => {
        onQueueDequeue();
        if (sample.timestamp >= endTimestamp) {
          ended = true;
        }
        if (ended) {
          sample.close();
          return;
        }
        if (lastSample) {
          if (sample.timestamp > startTimestamp) {
            sampleQueue.push(lastSample);
            firstSampleQueued = true;
          } else {
            lastSample.close();
          }
        }
        if (sample.timestamp >= startTimestamp) {
          sampleQueue.push(sample);
          firstSampleQueued = true;
        }
        lastSample = firstSampleQueued ? null : sample;
        if (sampleQueue.length > 0) {
          onQueueNotEmpty();
          ({ promise: queueNotEmpty, resolve: onQueueNotEmpty } = promiseWithResolvers());
        }
      }, (error2) => {
        if (!outOfBandError) {
          error2.stack = decoderError.stack;
          outOfBandError = error2;
          onQueueNotEmpty();
        }
      });
      const packetSink = this._createPacketSink();
      const keyPacket = await packetSink.getKeyPacket(startTimestamp, { verifyKeyPackets: true }) ?? await packetSink.getFirstPacket();
      if (!keyPacket) {
        return;
      }
      let currentPacket = keyPacket;
      let endPacket = void 0;
      if (endTimestamp < Infinity) {
        const packet = await packetSink.getPacket(endTimestamp);
        const keyPacket2 = !packet ? null : packet.type === "key" && packet.timestamp === endTimestamp ? packet : await packetSink.getNextKeyPacket(packet, { verifyKeyPackets: true });
        if (keyPacket2) {
          endPacket = keyPacket2;
        }
      }
      const packets = packetSink.packets(keyPacket, endPacket);
      await packets.next();
      while (currentPacket && !ended) {
        const maxQueueSize = computeMaxQueueSize(sampleQueue.length);
        if (sampleQueue.length + decoder.getDecodeQueueSize() > maxQueueSize) {
          ({ promise: queueDequeue, resolve: onQueueDequeue } = promiseWithResolvers());
          await queueDequeue;
          continue;
        }
        decoder.decode(currentPacket);
        const packetResult = await packets.next();
        if (packetResult.done) {
          break;
        }
        currentPacket = packetResult.value;
      }
      await packets.return();
      if (!terminated)
        await decoder.flush();
      decoder.close();
      if (!firstSampleQueued && lastSample) {
        sampleQueue.push(lastSample);
      }
      decoderIsFlushed = true;
      onQueueNotEmpty();
    })().catch((error2) => {
      if (!outOfBandError) {
        outOfBandError = error2;
        onQueueNotEmpty();
      }
    });
    return {
      async next() {
        while (true) {
          if (terminated) {
            return { value: void 0, done: true };
          } else if (outOfBandError) {
            throw outOfBandError;
          } else if (sampleQueue.length > 0) {
            const value = sampleQueue.shift();
            onQueueDequeue();
            return { value, done: false };
          } else if (!decoderIsFlushed) {
            await queueNotEmpty;
          } else {
            return { value: void 0, done: true };
          }
        }
      },
      async return() {
        terminated = true;
        ended = true;
        onQueueDequeue();
        onQueueNotEmpty();
        lastSample?.close();
        for (const sample of sampleQueue) {
          sample.close();
        }
        return { value: void 0, done: true };
      },
      async throw(error2) {
        throw error2;
      },
      [Symbol.asyncIterator]() {
        return this;
      }
    };
  }
  /** @internal */
  mediaSamplesAtTimestamps(timestamps) {
    validateAnyIterable(timestamps);
    const timestampIterator = toAsyncIterator(timestamps);
    const timestampsOfInterest = [];
    const sampleQueue = [];
    let { promise: queueNotEmpty, resolve: onQueueNotEmpty } = promiseWithResolvers();
    let { promise: queueDequeue, resolve: onQueueDequeue } = promiseWithResolvers();
    let decoderIsFlushed = false;
    let terminated = false;
    let outOfBandError = null;
    const pushToQueue = (sample) => {
      sampleQueue.push(sample);
      onQueueNotEmpty();
      ({ promise: queueNotEmpty, resolve: onQueueNotEmpty } = promiseWithResolvers());
    };
    (async () => {
      const decoderError = new Error();
      const decoder = await this._createDecoder((sample) => {
        onQueueDequeue();
        if (terminated) {
          sample.close();
          return;
        }
        let sampleUses = 0;
        while (timestampsOfInterest.length > 0 && sample.timestamp - timestampsOfInterest[0] > -1e-10) {
          sampleUses++;
          timestampsOfInterest.shift();
        }
        if (sampleUses > 0) {
          for (let i = 0; i < sampleUses; i++) {
            pushToQueue(i < sampleUses - 1 ? sample.clone() : sample);
          }
        } else {
          sample.close();
        }
      }, (error2) => {
        if (!outOfBandError) {
          error2.stack = decoderError.stack;
          outOfBandError = error2;
          onQueueNotEmpty();
        }
      });
      const packetSink = this._createPacketSink();
      let lastPacket = null;
      let lastKeyPacket = null;
      let maxSequenceNumber = -1;
      const decodePackets = async () => {
        assert(lastKeyPacket);
        let currentPacket = lastKeyPacket;
        decoder.decode(currentPacket);
        while (currentPacket.sequenceNumber < maxSequenceNumber) {
          const maxQueueSize = computeMaxQueueSize(sampleQueue.length);
          while (sampleQueue.length + decoder.getDecodeQueueSize() > maxQueueSize && !terminated) {
            ({ promise: queueDequeue, resolve: onQueueDequeue } = promiseWithResolvers());
            await queueDequeue;
          }
          if (terminated) {
            break;
          }
          const nextPacket = await packetSink.getNextPacket(currentPacket);
          assert(nextPacket);
          currentPacket = nextPacket;
          decoder.decode(nextPacket);
        }
        maxSequenceNumber = -1;
      };
      const flushDecoder = async () => {
        await decoder.flush();
        for (let i = 0; i < timestampsOfInterest.length; i++) {
          pushToQueue(null);
        }
        timestampsOfInterest.length = 0;
      };
      for await (const timestamp of timestampIterator) {
        validateTimestamp(timestamp);
        if (terminated) {
          break;
        }
        const targetPacket = await packetSink.getPacket(timestamp);
        const keyPacket = targetPacket && await packetSink.getKeyPacket(timestamp, { verifyKeyPackets: true });
        if (!keyPacket) {
          if (maxSequenceNumber !== -1) {
            await decodePackets();
            await flushDecoder();
          }
          pushToQueue(null);
          lastPacket = null;
          continue;
        }
        if (lastPacket && (keyPacket.sequenceNumber !== lastKeyPacket.sequenceNumber || targetPacket.timestamp < lastPacket.timestamp)) {
          await decodePackets();
          await flushDecoder();
        }
        timestampsOfInterest.push(targetPacket.timestamp);
        maxSequenceNumber = Math.max(targetPacket.sequenceNumber, maxSequenceNumber);
        lastPacket = targetPacket;
        lastKeyPacket = keyPacket;
      }
      if (!terminated) {
        if (maxSequenceNumber !== -1) {
          await decodePackets();
        }
        await flushDecoder();
      }
      decoder.close();
      decoderIsFlushed = true;
      onQueueNotEmpty();
    })().catch((error2) => {
      if (!outOfBandError) {
        outOfBandError = error2;
        onQueueNotEmpty();
      }
    });
    return {
      async next() {
        while (true) {
          if (terminated) {
            return { value: void 0, done: true };
          } else if (outOfBandError) {
            throw outOfBandError;
          } else if (sampleQueue.length > 0) {
            const value = sampleQueue.shift();
            assert(value !== void 0);
            onQueueDequeue();
            return { value, done: false };
          } else if (!decoderIsFlushed) {
            await queueNotEmpty;
          } else {
            return { value: void 0, done: true };
          }
        }
      },
      async return() {
        terminated = true;
        onQueueDequeue();
        onQueueNotEmpty();
        for (const sample of sampleQueue) {
          sample?.close();
        }
        return { value: void 0, done: true };
      },
      async throw(error2) {
        throw error2;
      },
      [Symbol.asyncIterator]() {
        return this;
      }
    };
  }
};
var computeMaxQueueSize = (decodedSampleQueueSize) => {
  return decodedSampleQueueSize === 0 ? 40 : 8;
};
var VideoDecoderWrapper = class extends DecoderWrapper {
  constructor(onSample, onError, codec, decoderConfig, rotation, timeResolution) {
    super(onSample, onError);
    this.rotation = rotation;
    this.timeResolution = timeResolution;
    this.decoder = null;
    this.customDecoder = null;
    this.customDecoderCallSerializer = new CallSerializer();
    this.customDecoderQueueSize = 0;
    this.inputTimestamps = [];
    this.sampleQueue = [];
    const MatchingCustomDecoder = customVideoDecoders.find((x) => x.supports(codec, decoderConfig));
    if (MatchingCustomDecoder) {
      this.customDecoder = new MatchingCustomDecoder();
      this.customDecoder.codec = codec;
      this.customDecoder.config = decoderConfig;
      this.customDecoder.onSample = (sample) => {
        if (!(sample instanceof VideoSample)) {
          throw new TypeError("The argument passed to onSample must be a VideoSample.");
        }
        this.finalizeAndEmitSample(sample);
      };
      void this.customDecoderCallSerializer.call(() => this.customDecoder.init());
    } else {
      const sampleHandler = (sample) => {
        if (isSafari()) {
          if (this.sampleQueue.length > 0 && sample.timestamp >= last(this.sampleQueue).timestamp) {
            for (const sample2 of this.sampleQueue) {
              this.finalizeAndEmitSample(sample2);
            }
            this.sampleQueue.length = 0;
          }
          insertSorted(this.sampleQueue, sample, (x) => x.timestamp);
        } else {
          const timestamp = this.inputTimestamps.shift();
          assert(timestamp !== void 0);
          sample.setTimestamp(timestamp);
          this.finalizeAndEmitSample(sample);
        }
      };
      this.decoder = new VideoDecoder({
        output: (frame) => sampleHandler(new VideoSample(frame)),
        error: onError
      });
      this.decoder.configure(decoderConfig);
    }
  }
  finalizeAndEmitSample(sample) {
    sample.setTimestamp(Math.round(sample.timestamp * this.timeResolution) / this.timeResolution);
    sample.setDuration(Math.round(sample.duration * this.timeResolution) / this.timeResolution);
    sample.setRotation(this.rotation);
    this.onSample(sample);
  }
  getDecodeQueueSize() {
    if (this.customDecoder) {
      return this.customDecoderQueueSize;
    } else {
      assert(this.decoder);
      return this.decoder.decodeQueueSize;
    }
  }
  decode(packet) {
    if (this.customDecoder) {
      this.customDecoderQueueSize++;
      void this.customDecoderCallSerializer.call(() => this.customDecoder.decode(packet)).then(() => this.customDecoderQueueSize--);
    } else {
      assert(this.decoder);
      if (!isSafari()) {
        insertSorted(this.inputTimestamps, packet.timestamp, (x) => x);
      }
      this.decoder.decode(packet.toEncodedVideoChunk());
    }
  }
  async flush() {
    if (this.customDecoder) {
      await this.customDecoderCallSerializer.call(() => this.customDecoder.flush());
    } else {
      assert(this.decoder);
      await this.decoder.flush();
    }
    if (isSafari()) {
      for (const sample of this.sampleQueue) {
        this.finalizeAndEmitSample(sample);
      }
      this.sampleQueue.length = 0;
    }
  }
  close() {
    if (this.customDecoder) {
      void this.customDecoderCallSerializer.call(() => this.customDecoder.close());
    } else {
      assert(this.decoder);
      this.decoder.close();
    }
    for (const sample of this.sampleQueue) {
      sample.close();
    }
    this.sampleQueue.length = 0;
  }
};
var VideoSampleSink = class extends BaseMediaSampleSink {
  constructor(videoTrack) {
    if (!(videoTrack instanceof InputVideoTrack)) {
      throw new TypeError("videoTrack must be an InputVideoTrack.");
    }
    super();
    this._videoTrack = videoTrack;
  }
  /** @internal */
  async _createDecoder(onSample, onError) {
    if (!await this._videoTrack.canDecode()) {
      throw new Error("This video track cannot be decoded by this browser. Make sure to check decodability before using a track.");
    }
    const codec = this._videoTrack.codec;
    const rotation = this._videoTrack.rotation;
    const decoderConfig = await this._videoTrack.getDecoderConfig();
    const timeResolution = this._videoTrack.timeResolution;
    assert(codec && decoderConfig);
    return new VideoDecoderWrapper(onSample, onError, codec, decoderConfig, rotation, timeResolution);
  }
  /** @internal */
  _createPacketSink() {
    return new EncodedPacketSink(this._videoTrack);
  }
  /**
   * Retrieves the video sample (frame) corresponding to the given timestamp, in seconds. More specifically, returns
   * the last video sample (in presentation order) with a start timestamp less than or equal to the given timestamp.
   * Returns null if the timestamp is before the track's first timestamp.
   *
   * @param timestamp - The timestamp used for retrieval, in seconds.
   */
  async getSample(timestamp) {
    validateTimestamp(timestamp);
    for await (const sample of this.mediaSamplesAtTimestamps([timestamp])) {
      return sample;
    }
    throw new Error("Internal error: Iterator returned nothing.");
  }
  /**
   * Creates an async iterator that yields the video samples (frames) of this track in presentation order. This method
   * will intelligently pre-decode a few frames ahead to enable fast iteration.
   *
   * @param startTimestamp - The timestamp in seconds at which to start yielding samples (inclusive).
   * @param endTimestamp - The timestamp in seconds at which to stop yielding samples (exclusive).
   */
  samples(startTimestamp = 0, endTimestamp = Infinity) {
    return this.mediaSamplesInRange(startTimestamp, endTimestamp);
  }
  /**
   * Creates an async iterator that yields a video sample (frame) for each timestamp in the argument. This method
   * uses an optimized decoding pipeline if these timestamps are monotonically sorted, decoding each packet at most
   * once, and is therefore more efficient than manually getting the sample for every timestamp. The iterator may
   * yield null if no frame is available for a given timestamp.
   *
   * @param timestamps - An iterable or async iterable of timestamps in seconds.
   */
  samplesAtTimestamps(timestamps) {
    return this.mediaSamplesAtTimestamps(timestamps);
  }
};
var CanvasSink = class {
  constructor(videoTrack, options = {}) {
    this._nextCanvasIndex = 0;
    if (!(videoTrack instanceof InputVideoTrack)) {
      throw new TypeError("videoTrack must be an InputVideoTrack.");
    }
    if (options && typeof options !== "object") {
      throw new TypeError("options must be an object.");
    }
    if (options.width !== void 0 && (!Number.isInteger(options.width) || options.width <= 0)) {
      throw new TypeError("options.width, when defined, must be a positive integer.");
    }
    if (options.height !== void 0 && (!Number.isInteger(options.height) || options.height <= 0)) {
      throw new TypeError("options.height, when defined, must be a positive integer.");
    }
    if (options.fit !== void 0 && !["fill", "contain", "cover"].includes(options.fit)) {
      throw new TypeError('options.fit, when provided, must be one of "fill", "contain", or "cover".');
    }
    if (options.width !== void 0 && options.height !== void 0 && options.fit === void 0) {
      throw new TypeError("When both options.width and options.height are provided, options.fit must also be provided.");
    }
    if (options.rotation !== void 0 && ![0, 90, 180, 270].includes(options.rotation)) {
      throw new TypeError("options.rotation, when provided, must be 0, 90, 180 or 270.");
    }
    if (options.poolSize !== void 0 && (typeof options.poolSize !== "number" || !Number.isInteger(options.poolSize) || options.poolSize < 0)) {
      throw new TypeError("poolSize must be a non-negative integer.");
    }
    const rotation = options.rotation ?? videoTrack.rotation;
    let [width, height] = rotation % 180 === 0 ? [videoTrack.codedWidth, videoTrack.codedHeight] : [videoTrack.codedHeight, videoTrack.codedWidth];
    const originalAspectRatio = width / height;
    if (options.width !== void 0 && options.height === void 0) {
      width = options.width;
      height = Math.round(width / originalAspectRatio);
    } else if (options.width === void 0 && options.height !== void 0) {
      height = options.height;
      width = Math.round(height * originalAspectRatio);
    } else if (options.width !== void 0 && options.height !== void 0) {
      width = options.width;
      height = options.height;
    }
    this._videoTrack = videoTrack;
    this._width = width;
    this._height = height;
    this._rotation = rotation;
    this._fit = options.fit ?? "fill";
    this._videoSampleSink = new VideoSampleSink(videoTrack);
    this._canvasPool = Array.from({ length: options.poolSize ?? 0 }, () => null);
  }
  /** @internal */
  _videoSampleToWrappedCanvas(sample) {
    let canvas = this._canvasPool[this._nextCanvasIndex];
    let canvasIsNew = false;
    if (!canvas) {
      if (typeof document !== "undefined") {
        canvas = document.createElement("canvas");
        canvas.width = this._width;
        canvas.height = this._height;
      } else {
        canvas = new OffscreenCanvas(this._width, this._height);
      }
      if (this._canvasPool.length > 0) {
        this._canvasPool[this._nextCanvasIndex] = canvas;
      }
      canvasIsNew = true;
    }
    if (this._canvasPool.length > 0) {
      this._nextCanvasIndex = (this._nextCanvasIndex + 1) % this._canvasPool.length;
    }
    const context = canvas.getContext("2d", { alpha: false });
    assert(context);
    context.resetTransform();
    if (!canvasIsNew) {
      context.clearRect(0, 0, this._width, this._height);
    }
    sample.drawWithFit(context, {
      fit: this._fit,
      rotation: this._rotation
    });
    const result = {
      canvas,
      timestamp: sample.timestamp,
      duration: sample.duration
    };
    sample.close();
    return result;
  }
  /**
   * Retrieves a canvas with the video frame corresponding to the given timestamp, in seconds. More specifically,
   * returns the last video frame (in presentation order) with a start timestamp less than or equal to the given
   * timestamp. Returns null if the timestamp is before the track's first timestamp.
   *
   * @param timestamp - The timestamp used for retrieval, in seconds.
   */
  async getCanvas(timestamp) {
    validateTimestamp(timestamp);
    const sample = await this._videoSampleSink.getSample(timestamp);
    return sample && this._videoSampleToWrappedCanvas(sample);
  }
  /**
   * Creates an async iterator that yields canvases with the video frames of this track in presentation order. This
   * method will intelligently pre-decode a few frames ahead to enable fast iteration.
   *
   * @param startTimestamp - The timestamp in seconds at which to start yielding canvases (inclusive).
   * @param endTimestamp - The timestamp in seconds at which to stop yielding canvases (exclusive).
   */
  canvases(startTimestamp = 0, endTimestamp = Infinity) {
    return mapAsyncGenerator(this._videoSampleSink.samples(startTimestamp, endTimestamp), (sample) => this._videoSampleToWrappedCanvas(sample));
  }
  /**
   * Creates an async iterator that yields a canvas for each timestamp in the argument. This method uses an optimized
   * decoding pipeline if these timestamps are monotonically sorted, decoding each packet at most once, and is
   * therefore more efficient than manually getting the canvas for every timestamp. The iterator may yield null if
   * no frame is available for a given timestamp.
   *
   * @param timestamps - An iterable or async iterable of timestamps in seconds.
   */
  canvasesAtTimestamps(timestamps) {
    return mapAsyncGenerator(this._videoSampleSink.samplesAtTimestamps(timestamps), (sample) => sample && this._videoSampleToWrappedCanvas(sample));
  }
};

// node_modules/mediabunny/dist/modules/src/input-track.js
var InputTrack = class {
  /** @internal */
  constructor(backing) {
    this._backing = backing;
  }
  /** Returns true iff this track is a video track. */
  isVideoTrack() {
    return this instanceof InputVideoTrack;
  }
  /** Returns true iff this track is an audio track. */
  isAudioTrack() {
    return this instanceof InputAudioTrack;
  }
  /** The unique ID of this track in the input file. */
  get id() {
    return this._backing.getId();
  }
  /**
   * The identifier of the codec used internally by the container. It is not homogenized by Mediabunny
   * and depends entirely on the container format.
   *
   * This field can be used to determine the codec of a track in case Mediabunny doesn't know that codec.
   *
   * - For ISOBMFF files, this field returns the name of the Sample Description Box (e.g. 'avc1').
   * - For Matroska files, this field returns the value of the CodecID element.
   * - For WAVE files, this field returns the value of the format tag in the 'fmt ' chunk.
   * - For ADTS files, this field contains the MPEG-4 Audio Object Type.
   * - In all other cases, this field is `null`.
   */
  get internalCodecId() {
    return this._backing.getInternalCodecId();
  }
  /** The ISO 639-2/T language code for this track. If the language is unknown, this field is 'und' (undetermined). */
  get languageCode() {
    return this._backing.getLanguageCode();
  }
  /** A user-defined name for this track. */
  get name() {
    return this._backing.getName();
  }
  /**
   * A positive number x such that all timestamps and durations of all packets of this track are
   * integer multiples of 1/x.
   */
  get timeResolution() {
    return this._backing.getTimeResolution();
  }
  /**
   * Returns the start timestamp of the first packet of this track, in seconds. While often near zero, this value
   * may be positive or even negative. A negative starting timestamp means the track's timing has been offset. Samples
   * with a negative timestamp should not be presented.
   */
  getFirstTimestamp() {
    return this._backing.getFirstTimestamp();
  }
  /** Returns the end timestamp of the last packet of this track, in seconds. */
  computeDuration() {
    return this._backing.computeDuration();
  }
  /**
   * Computes aggregate packet statistics for this track, such as average packet rate or bitrate.
   *
   * @param targetPacketCount - This optional parameter sets a target for how many packets this method must have
   * looked at before it can return early; this means, you can use it to aggregate only a subset (prefix) of all
   * packets. This is very useful for getting a great estimate of video frame rate without having to scan through the
   * entire file.
   */
  async computePacketStats(targetPacketCount = Infinity) {
    const sink = new EncodedPacketSink(this);
    let startTimestamp = Infinity;
    let endTimestamp = -Infinity;
    let packetCount = 0;
    let totalPacketBytes = 0;
    for await (const packet of sink.packets(void 0, void 0, { metadataOnly: true })) {
      if (packetCount >= targetPacketCount && packet.timestamp >= endTimestamp) {
        break;
      }
      startTimestamp = Math.min(startTimestamp, packet.timestamp);
      endTimestamp = Math.max(endTimestamp, packet.timestamp + packet.duration);
      packetCount++;
      totalPacketBytes += packet.byteLength;
    }
    return {
      packetCount,
      averagePacketRate: packetCount ? Number((packetCount / (endTimestamp - startTimestamp)).toPrecision(16)) : 0,
      averageBitrate: packetCount ? Number((8 * totalPacketBytes / (endTimestamp - startTimestamp)).toPrecision(16)) : 0
    };
  }
};
var InputVideoTrack = class extends InputTrack {
  /** @internal */
  constructor(backing) {
    super(backing);
    this._backing = backing;
  }
  get type() {
    return "video";
  }
  get codec() {
    return this._backing.getCodec();
  }
  /** The width in pixels of the track's coded samples, before any transformations or rotations. */
  get codedWidth() {
    return this._backing.getCodedWidth();
  }
  /** The height in pixels of the track's coded samples, before any transformations or rotations. */
  get codedHeight() {
    return this._backing.getCodedHeight();
  }
  /** The angle in degrees by which the track's frames should be rotated (clockwise). */
  get rotation() {
    return this._backing.getRotation();
  }
  /** The width in pixels of the track's frames after rotation. */
  get displayWidth() {
    const rotation = this._backing.getRotation();
    return rotation % 180 === 0 ? this._backing.getCodedWidth() : this._backing.getCodedHeight();
  }
  /** The height in pixels of the track's frames after rotation. */
  get displayHeight() {
    const rotation = this._backing.getRotation();
    return rotation % 180 === 0 ? this._backing.getCodedHeight() : this._backing.getCodedWidth();
  }
  /** Returns the color space of the track's samples. */
  getColorSpace() {
    return this._backing.getColorSpace();
  }
  /** If this method returns true, the track's samples use a high dynamic range (HDR). */
  async hasHighDynamicRange() {
    const colorSpace = await this._backing.getColorSpace();
    return colorSpace.primaries === "bt2020" || colorSpace.primaries === "smpte432" || colorSpace.transfer === "pg" || colorSpace.transfer === "hlg" || colorSpace.matrix === "bt2020-ncl";
  }
  /**
   * Returns the decoder configuration for decoding the track's packets using a VideoDecoder. Returns null if the
   * track's codec is unknown.
   */
  getDecoderConfig() {
    return this._backing.getDecoderConfig();
  }
  async getCodecParameterString() {
    const decoderConfig = await this._backing.getDecoderConfig();
    return decoderConfig?.codec ?? null;
  }
  async canDecode() {
    try {
      const decoderConfig = await this._backing.getDecoderConfig();
      if (!decoderConfig) {
        return false;
      }
      const codec = this._backing.getCodec();
      assert(codec !== null);
      if (customVideoDecoders.some((x) => x.supports(codec, decoderConfig))) {
        return true;
      }
      if (typeof VideoDecoder === "undefined") {
        return false;
      }
      const support = await VideoDecoder.isConfigSupported(decoderConfig);
      return support.supported === true;
    } catch (error2) {
      console.error("Error during decodability check:", error2);
      return false;
    }
  }
  async determinePacketType(packet) {
    if (!(packet instanceof EncodedPacket)) {
      throw new TypeError("packet must be an EncodedPacket.");
    }
    if (packet.isMetadataOnly) {
      throw new TypeError("packet must not be metadata-only to determine its type.");
    }
    if (this.codec === null) {
      return null;
    }
    return determineVideoPacketType(this, packet);
  }
};
var InputAudioTrack = class extends InputTrack {
  /** @internal */
  constructor(backing) {
    super(backing);
    this._backing = backing;
  }
  get type() {
    return "audio";
  }
  get codec() {
    return this._backing.getCodec();
  }
  /** The number of audio channels in the track. */
  get numberOfChannels() {
    return this._backing.getNumberOfChannels();
  }
  /** The track's audio sample rate in hertz. */
  get sampleRate() {
    return this._backing.getSampleRate();
  }
  /**
   * Returns the decoder configuration for decoding the track's packets using an AudioDecoder. Returns null if the
   * track's codec is unknown.
   */
  getDecoderConfig() {
    return this._backing.getDecoderConfig();
  }
  async getCodecParameterString() {
    const decoderConfig = await this._backing.getDecoderConfig();
    return decoderConfig?.codec ?? null;
  }
  async canDecode() {
    try {
      const decoderConfig = await this._backing.getDecoderConfig();
      if (!decoderConfig) {
        return false;
      }
      const codec = this._backing.getCodec();
      assert(codec !== null);
      if (customAudioDecoders.some((x) => x.supports(codec, decoderConfig))) {
        return true;
      }
      if (decoderConfig.codec.startsWith("pcm-")) {
        return true;
      } else {
        if (typeof AudioDecoder === "undefined") {
          return false;
        }
        const support = await AudioDecoder.isConfigSupported(decoderConfig);
        return support.supported === true;
      }
    } catch (error2) {
      console.error("Error during decodability check:", error2);
      return false;
    }
  }
  async determinePacketType(packet) {
    if (!(packet instanceof EncodedPacket)) {
      throw new TypeError("packet must be an EncodedPacket.");
    }
    if (this.codec === null) {
      return null;
    }
    return "key";
  }
};

// node_modules/mediabunny/dist/modules/src/reader.js
var Reader = class {
  constructor(source, maxStorableBytes = Infinity) {
    this.source = source;
    this.maxStorableBytes = maxStorableBytes;
    this.loadedSegments = [];
    this.loadingSegments = [];
    this.sourceSizePromise = null;
    this.nextAge = 0;
    this.totalStoredBytes = 0;
  }
  async loadRange(start, end) {
    end = Math.min(end, await this.source.getSize());
    if (start >= end) {
      return;
    }
    const matchingLoadingSegment = this.loadingSegments.find((x) => x.start <= start && x.end >= end);
    if (matchingLoadingSegment) {
      await matchingLoadingSegment.promise;
      return;
    }
    const index = binarySearchLessOrEqual(this.loadedSegments, start, (x) => x.start);
    if (index !== -1) {
      for (let i = index; i < this.loadedSegments.length; i++) {
        const segment = this.loadedSegments[i];
        if (segment.start > start) {
          break;
        }
        const segmentEncasesRequestedRange = segment.end >= end;
        if (segmentEncasesRequestedRange) {
          return;
        }
      }
    }
    this.source.onread?.(start, end);
    const bytesPromise = this.source._read(start, end);
    const loadingSegment = { start, end, promise: bytesPromise };
    this.loadingSegments.push(loadingSegment);
    const bytes = await bytesPromise;
    removeItem(this.loadingSegments, loadingSegment);
    this.insertIntoLoadedSegments(start, bytes);
  }
  rangeIsLoaded(start, end) {
    if (end <= start) {
      return true;
    }
    const index = binarySearchLessOrEqual(this.loadedSegments, start, (x) => x.start);
    if (index === -1) {
      return false;
    }
    for (let i = index; i < this.loadedSegments.length; i++) {
      const segment = this.loadedSegments[i];
      if (segment.start > start) {
        break;
      }
      const segmentEncasesRequestedRange = segment.end >= end;
      if (segmentEncasesRequestedRange) {
        return true;
      }
    }
    return false;
  }
  insertIntoLoadedSegments(start, bytes) {
    const segment = {
      start,
      end: start + bytes.byteLength,
      bytes,
      view: new DataView(bytes.buffer),
      age: this.nextAge++
    };
    let index = binarySearchLessOrEqual(this.loadedSegments, start, (x) => x.start);
    if (index === -1 || this.loadedSegments[index].start < segment.start) {
      index++;
    }
    this.loadedSegments.splice(index, 0, segment);
    this.totalStoredBytes += bytes.byteLength;
    for (let i = index + 1; i < this.loadedSegments.length; i++) {
      const otherSegment = this.loadedSegments[i];
      if (otherSegment.start >= segment.end) {
        break;
      }
      if (segment.start <= otherSegment.start && otherSegment.end <= segment.end) {
        this.loadedSegments.splice(i, 1);
        i--;
      }
    }
    while (this.totalStoredBytes > this.maxStorableBytes && this.loadedSegments.length > 1) {
      let oldestSegment = null;
      let oldestSegmentIndex = -1;
      for (let i = 0; i < this.loadedSegments.length; i++) {
        const candidate = this.loadedSegments[i];
        if (!oldestSegment || candidate.age < oldestSegment.age) {
          oldestSegment = candidate;
          oldestSegmentIndex = i;
        }
      }
      assert(oldestSegment);
      this.totalStoredBytes -= oldestSegment.bytes.byteLength;
      this.loadedSegments.splice(oldestSegmentIndex, 1);
    }
  }
  getViewAndOffset(start, end) {
    const startIndex = binarySearchLessOrEqual(this.loadedSegments, start, (x) => x.start);
    let segment = null;
    if (startIndex !== -1) {
      for (let i = startIndex; i < this.loadedSegments.length; i++) {
        const candidate = this.loadedSegments[i];
        if (candidate.start > start) {
          break;
        }
        if (end <= candidate.end) {
          segment = candidate;
          break;
        }
      }
    }
    if (!segment) {
      throw new Error(`No segment loaded for range [${start}, ${end}).`);
    }
    segment.age = this.nextAge++;
    return {
      view: segment.view,
      offset: segment.bytes.byteOffset + start - segment.start
    };
  }
  forgetRange(start, end) {
    if (end <= start) {
      return;
    }
    const startIndex = binarySearchLessOrEqual(this.loadedSegments, start, (x) => x.start);
    if (startIndex === -1) {
      return;
    }
    const segment = this.loadedSegments[startIndex];
    if (segment.start !== start || segment.end !== end) {
      return;
    }
    this.loadedSegments.splice(startIndex, 1);
    this.totalStoredBytes -= segment.bytes.byteLength;
  }
};

// node_modules/mediabunny/dist/modules/src/wave/riff-reader.js
var RiffReader = class {
  constructor(reader) {
    this.reader = reader;
    this.pos = 0;
    this.littleEndian = true;
  }
  readBytes(length) {
    const { view, offset } = this.reader.getViewAndOffset(this.pos, this.pos + length);
    this.pos += length;
    return new Uint8Array(view.buffer, offset, length);
  }
  readU16() {
    const { view, offset } = this.reader.getViewAndOffset(this.pos, this.pos + 2);
    this.pos += 2;
    return view.getUint16(offset, this.littleEndian);
  }
  readU32() {
    const { view, offset } = this.reader.getViewAndOffset(this.pos, this.pos + 4);
    this.pos += 4;
    return view.getUint32(offset, this.littleEndian);
  }
  readU64() {
    let low;
    let high;
    if (this.littleEndian) {
      low = this.readU32();
      high = this.readU32();
    } else {
      high = this.readU32();
      low = this.readU32();
    }
    return high * 4294967296 + low;
  }
  readAscii(length) {
    const { view, offset } = this.reader.getViewAndOffset(this.pos, this.pos + length);
    this.pos += length;
    let str = "";
    for (let i = 0; i < length; i++) {
      str += String.fromCharCode(view.getUint8(offset + i));
    }
    return str;
  }
};

// node_modules/mediabunny/dist/modules/src/wave/wave-demuxer.js
var WaveFormat;
(function(WaveFormat2) {
  WaveFormat2[WaveFormat2["PCM"] = 1] = "PCM";
  WaveFormat2[WaveFormat2["IEEE_FLOAT"] = 3] = "IEEE_FLOAT";
  WaveFormat2[WaveFormat2["ALAW"] = 6] = "ALAW";
  WaveFormat2[WaveFormat2["MULAW"] = 7] = "MULAW";
  WaveFormat2[WaveFormat2["EXTENSIBLE"] = 65534] = "EXTENSIBLE";
})(WaveFormat || (WaveFormat = {}));
var WaveDemuxer = class extends Demuxer {
  constructor(input) {
    super(input);
    this.metadataPromise = null;
    this.dataStart = -1;
    this.dataSize = -1;
    this.audioInfo = null;
    this.tracks = [];
    this.metadataReader = new RiffReader(input._mainReader);
    this.chunkReader = new RiffReader(new Reader(input.source, 64 * 2 ** 20));
  }
  async readMetadata() {
    return this.metadataPromise ??= (async () => {
      const actualFileSize = await this.metadataReader.reader.source.getSize();
      const riffType = this.metadataReader.readAscii(4);
      this.metadataReader.littleEndian = riffType !== "RIFX";
      const isRf64 = riffType === "RF64";
      const outerChunkSize = this.metadataReader.readU32();
      let totalFileSize = isRf64 ? actualFileSize : Math.min(outerChunkSize + 8, actualFileSize);
      const format = this.metadataReader.readAscii(4);
      if (format !== "WAVE") {
        throw new Error("Invalid WAVE file - wrong format");
      }
      this.metadataReader.pos = 12;
      let chunksRead = 0;
      let dataChunkSize = null;
      while (this.metadataReader.pos < totalFileSize) {
        await this.metadataReader.reader.loadRange(this.metadataReader.pos, this.metadataReader.pos + 8);
        const chunkId = this.metadataReader.readAscii(4);
        const chunkSize = this.metadataReader.readU32();
        const startPos = this.metadataReader.pos;
        if (isRf64 && chunksRead === 0 && chunkId !== "ds64") {
          throw new Error('Invalid RF64 file: First chunk must be "ds64".');
        }
        if (chunkId === "fmt ") {
          await this.parseFmtChunk(chunkSize);
        } else if (chunkId === "data") {
          dataChunkSize ??= chunkSize;
          this.dataStart = this.metadataReader.pos;
          this.dataSize = Math.min(dataChunkSize, totalFileSize - this.dataStart);
        } else if (chunkId === "ds64") {
          const riffChunkSize = this.metadataReader.readU64();
          dataChunkSize = this.metadataReader.readU64();
          totalFileSize = Math.min(riffChunkSize + 8, actualFileSize);
        }
        this.metadataReader.pos = startPos + chunkSize + (chunkSize & 1);
        chunksRead++;
      }
      if (!this.audioInfo) {
        throw new Error('Invalid WAVE file - missing "fmt " chunk');
      }
      if (this.dataStart === -1) {
        throw new Error('Invalid WAVE file - missing "data" chunk');
      }
      const blockSize = this.audioInfo.blockSizeInBytes;
      this.dataSize = Math.floor(this.dataSize / blockSize) * blockSize;
      this.tracks.push(new InputAudioTrack(new WaveAudioTrackBacking(this)));
    })();
  }
  async parseFmtChunk(size) {
    await this.metadataReader.reader.loadRange(this.metadataReader.pos, this.metadataReader.pos + size);
    let formatTag = this.metadataReader.readU16();
    const numChannels = this.metadataReader.readU16();
    const sampleRate = this.metadataReader.readU32();
    this.metadataReader.pos += 4;
    const blockAlign = this.metadataReader.readU16();
    let bitsPerSample;
    if (size === 14) {
      bitsPerSample = 8;
    } else {
      bitsPerSample = this.metadataReader.readU16();
    }
    if (size >= 18 && formatTag !== 357) {
      const cbSize = this.metadataReader.readU16();
      const remainingSize = size - 18;
      const extensionSize = Math.min(remainingSize, cbSize);
      if (extensionSize >= 22 && formatTag === WaveFormat.EXTENSIBLE) {
        this.metadataReader.pos += 2 + 4;
        const subFormat = this.metadataReader.readBytes(16);
        formatTag = subFormat[0] | subFormat[1] << 8;
      }
    }
    if (formatTag === WaveFormat.MULAW || formatTag === WaveFormat.ALAW) {
      bitsPerSample = 8;
    }
    this.audioInfo = {
      format: formatTag,
      numberOfChannels: numChannels,
      sampleRate,
      sampleSizeInBytes: Math.ceil(bitsPerSample / 8),
      blockSizeInBytes: blockAlign
    };
  }
  getCodec() {
    assert(this.audioInfo);
    if (this.audioInfo.format === WaveFormat.MULAW) {
      return "ulaw";
    }
    if (this.audioInfo.format === WaveFormat.ALAW) {
      return "alaw";
    }
    if (this.audioInfo.format === WaveFormat.PCM) {
      if (this.audioInfo.sampleSizeInBytes === 1) {
        return "pcm-u8";
      } else if (this.audioInfo.sampleSizeInBytes === 2) {
        return "pcm-s16";
      } else if (this.audioInfo.sampleSizeInBytes === 3) {
        return "pcm-s24";
      } else if (this.audioInfo.sampleSizeInBytes === 4) {
        return "pcm-s32";
      }
    }
    if (this.audioInfo.format === WaveFormat.IEEE_FLOAT) {
      if (this.audioInfo.sampleSizeInBytes === 4) {
        return "pcm-f32";
      }
    }
    return null;
  }
  async getMimeType() {
    return "audio/wav";
  }
  async computeDuration() {
    await this.readMetadata();
    assert(this.audioInfo);
    const numberOfBlocks = this.dataSize / this.audioInfo.blockSizeInBytes;
    return numberOfBlocks / this.audioInfo.sampleRate;
  }
  async getTracks() {
    await this.readMetadata();
    return this.tracks;
  }
};
var PACKET_SIZE_IN_FRAMES = 2048;
var WaveAudioTrackBacking = class {
  constructor(demuxer) {
    this.demuxer = demuxer;
  }
  getId() {
    return 1;
  }
  getCodec() {
    return this.demuxer.getCodec();
  }
  getInternalCodecId() {
    assert(this.demuxer.audioInfo);
    return this.demuxer.audioInfo.format;
  }
  async getDecoderConfig() {
    const codec = this.demuxer.getCodec();
    if (!codec) {
      return null;
    }
    assert(this.demuxer.audioInfo);
    return {
      codec,
      numberOfChannels: this.demuxer.audioInfo.numberOfChannels,
      sampleRate: this.demuxer.audioInfo.sampleRate
    };
  }
  computeDuration() {
    return this.demuxer.computeDuration();
  }
  getNumberOfChannels() {
    assert(this.demuxer.audioInfo);
    return this.demuxer.audioInfo.numberOfChannels;
  }
  getSampleRate() {
    assert(this.demuxer.audioInfo);
    return this.demuxer.audioInfo.sampleRate;
  }
  getTimeResolution() {
    assert(this.demuxer.audioInfo);
    return this.demuxer.audioInfo.sampleRate;
  }
  getName() {
    return null;
  }
  getLanguageCode() {
    return UNDETERMINED_LANGUAGE;
  }
  async getFirstTimestamp() {
    return 0;
  }
  async getPacketAtIndex(packetIndex, options) {
    assert(this.demuxer.audioInfo);
    const startOffset = packetIndex * PACKET_SIZE_IN_FRAMES * this.demuxer.audioInfo.blockSizeInBytes;
    if (startOffset >= this.demuxer.dataSize) {
      return null;
    }
    const sizeInBytes = Math.min(PACKET_SIZE_IN_FRAMES * this.demuxer.audioInfo.blockSizeInBytes, this.demuxer.dataSize - startOffset);
    let data;
    if (options.metadataOnly) {
      data = PLACEHOLDER_DATA;
    } else {
      const sizeOfOnePacket = PACKET_SIZE_IN_FRAMES * this.demuxer.audioInfo.blockSizeInBytes;
      const chunkSize = Math.ceil(2 ** 19 / sizeOfOnePacket) * sizeOfOnePacket;
      const chunkStart = Math.floor(startOffset / chunkSize) * chunkSize;
      const chunkEnd = chunkStart + chunkSize;
      await this.demuxer.chunkReader.reader.loadRange(this.demuxer.dataStart + chunkStart, this.demuxer.dataStart + chunkEnd);
      this.demuxer.chunkReader.pos = this.demuxer.dataStart + startOffset;
      data = this.demuxer.chunkReader.readBytes(sizeInBytes);
    }
    const timestamp = packetIndex * PACKET_SIZE_IN_FRAMES / this.demuxer.audioInfo.sampleRate;
    const duration = sizeInBytes / this.demuxer.audioInfo.blockSizeInBytes / this.demuxer.audioInfo.sampleRate;
    return new EncodedPacket(data, "key", timestamp, duration, packetIndex, sizeInBytes);
  }
  getFirstPacket(options) {
    return this.getPacketAtIndex(0, options);
  }
  getPacket(timestamp, options) {
    assert(this.demuxer.audioInfo);
    const packetIndex = Math.floor(timestamp * this.demuxer.audioInfo.sampleRate / PACKET_SIZE_IN_FRAMES);
    return this.getPacketAtIndex(packetIndex, options);
  }
  getNextPacket(packet, options) {
    assert(this.demuxer.audioInfo);
    const packetIndex = Math.round(packet.timestamp * this.demuxer.audioInfo.sampleRate / PACKET_SIZE_IN_FRAMES);
    return this.getPacketAtIndex(packetIndex + 1, options);
  }
  getKeyPacket(timestamp, options) {
    return this.getPacket(timestamp, options);
  }
  getNextKeyPacket(packet, options) {
    return this.getNextPacket(packet, options);
  }
};

// node_modules/mediabunny/dist/modules/src/source.js
var Source = class {
  constructor() {
    this._sizePromise = null;
    this.onread = null;
  }
  /**
   * Resolves with the total size of the file in bytes. This function is memoized, meaning only the first call
   * will retrieve the size.
   */
  getSize() {
    return this._sizePromise ??= this._retrieveSize();
  }
};
var BufferSource = class extends Source {
  constructor(buffer) {
    if (!(buffer instanceof ArrayBuffer) && !(buffer instanceof Uint8Array)) {
      throw new TypeError("buffer must be an ArrayBuffer or Uint8Array.");
    }
    super();
    this._bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  }
  /** @internal */
  async _read(start, end) {
    return this._bytes.subarray(start, end);
  }
  /** @internal */
  async _retrieveSize() {
    return this._bytes.byteLength;
  }
};

// node_modules/mediabunny/dist/modules/src/isobmff/isobmff-demuxer.js
var IsobmffDemuxer = class extends Demuxer {
  constructor(input) {
    super(input);
    this.currentTrack = null;
    this.tracks = [];
    this.metadataPromise = null;
    this.movieTimescale = -1;
    this.movieDurationInTimescale = -1;
    this.isQuickTime = false;
    this.isFragmented = false;
    this.fragmentTrackDefaults = [];
    this.fragments = [];
    this.currentFragment = null;
    this.fragmentLookupMutex = new AsyncMutex();
    this.metadataReader = new IsobmffReader(input._mainReader);
    this.chunkReader = new IsobmffReader(new Reader(input.source, 64 * 2 ** 20));
  }
  async computeDuration() {
    const tracks = await this.getTracks();
    const trackDurations = await Promise.all(tracks.map((x) => x.computeDuration()));
    return Math.max(0, ...trackDurations);
  }
  async getTracks() {
    await this.readMetadata();
    return this.tracks.map((track) => track.inputTrack);
  }
  async getMimeType() {
    await this.readMetadata();
    const codecStrings = await Promise.all(this.tracks.map((x) => x.inputTrack.getCodecParameterString()));
    return buildIsobmffMimeType({
      isQuickTime: this.isQuickTime,
      hasVideo: this.tracks.some((x) => x.info?.type === "video"),
      hasAudio: this.tracks.some((x) => x.info?.type === "audio"),
      codecStrings: codecStrings.filter(Boolean)
    });
  }
  readMetadata() {
    return this.metadataPromise ??= (async () => {
      const sourceSize = await this.metadataReader.reader.source.getSize();
      while (this.metadataReader.pos < sourceSize) {
        await this.metadataReader.reader.loadRange(this.metadataReader.pos, this.metadataReader.pos + MAX_BOX_HEADER_SIZE);
        const startPos = this.metadataReader.pos;
        const boxInfo = this.metadataReader.readBoxHeader();
        if (!boxInfo) {
          break;
        }
        if (boxInfo.name === "ftyp") {
          const majorBrand = this.metadataReader.readAscii(4);
          this.isQuickTime = majorBrand === "qt  ";
        } else if (boxInfo.name === "moov") {
          await this.metadataReader.reader.loadRange(this.metadataReader.pos, this.metadataReader.pos + boxInfo.contentSize);
          this.readContiguousBoxes(boxInfo.contentSize);
          for (const track of this.tracks) {
            const previousSegmentDurationsInSeconds = track.editListPreviousSegmentDurations / this.movieTimescale;
            track.editListOffset -= Math.round(previousSegmentDurationsInSeconds * track.timescale);
          }
          break;
        }
        this.metadataReader.pos = startPos + boxInfo.totalSize;
      }
      if (this.isFragmented) {
        await this.metadataReader.reader.loadRange(sourceSize - 4, sourceSize);
        this.metadataReader.pos = sourceSize - 4;
        const lastWord = this.metadataReader.readU32();
        const potentialMfraPos = sourceSize - lastWord;
        if (potentialMfraPos >= 0 && potentialMfraPos <= sourceSize - MAX_BOX_HEADER_SIZE) {
          await this.metadataReader.reader.loadRange(potentialMfraPos, potentialMfraPos + 2 ** 16);
          this.metadataReader.pos = potentialMfraPos;
          const boxInfo = this.metadataReader.readBoxHeader();
          if (boxInfo && boxInfo.name === "mfra") {
            await this.metadataReader.reader.loadRange(potentialMfraPos, potentialMfraPos + boxInfo.totalSize);
            this.readContiguousBoxes(boxInfo.contentSize);
          }
        }
      }
    })();
  }
  getSampleTableForTrack(internalTrack) {
    if (internalTrack.sampleTable) {
      return internalTrack.sampleTable;
    }
    const sampleTable = {
      sampleTimingEntries: [],
      sampleCompositionTimeOffsets: [],
      sampleSizes: [],
      keySampleIndices: null,
      chunkOffsets: [],
      sampleToChunk: [],
      presentationTimestamps: null,
      presentationTimestampIndexMap: null
    };
    internalTrack.sampleTable = sampleTable;
    this.metadataReader.pos = internalTrack.sampleTableByteOffset;
    this.currentTrack = internalTrack;
    this.traverseBox();
    this.currentTrack = null;
    const isPcmCodec = internalTrack.info?.type === "audio" && internalTrack.info.codec && PCM_AUDIO_CODECS.includes(internalTrack.info.codec);
    if (isPcmCodec && sampleTable.sampleCompositionTimeOffsets.length === 0) {
      assert(internalTrack.info?.type === "audio");
      const pcmInfo = parsePcmCodec(internalTrack.info.codec);
      const newSampleTimingEntries = [];
      const newSampleSizes = [];
      for (let i = 0; i < sampleTable.sampleToChunk.length; i++) {
        const chunkEntry = sampleTable.sampleToChunk[i];
        const nextEntry = sampleTable.sampleToChunk[i + 1];
        const chunkCount = (nextEntry ? nextEntry.startChunkIndex : sampleTable.chunkOffsets.length) - chunkEntry.startChunkIndex;
        for (let j = 0; j < chunkCount; j++) {
          const startSampleIndex = chunkEntry.startSampleIndex + j * chunkEntry.samplesPerChunk;
          const endSampleIndex = startSampleIndex + chunkEntry.samplesPerChunk;
          const startTimingEntryIndex = binarySearchLessOrEqual(sampleTable.sampleTimingEntries, startSampleIndex, (x) => x.startIndex);
          const startTimingEntry = sampleTable.sampleTimingEntries[startTimingEntryIndex];
          const endTimingEntryIndex = binarySearchLessOrEqual(sampleTable.sampleTimingEntries, endSampleIndex, (x) => x.startIndex);
          const endTimingEntry = sampleTable.sampleTimingEntries[endTimingEntryIndex];
          const firstSampleTimestamp = startTimingEntry.startDecodeTimestamp + (startSampleIndex - startTimingEntry.startIndex) * startTimingEntry.delta;
          const lastSampleTimestamp = endTimingEntry.startDecodeTimestamp + (endSampleIndex - endTimingEntry.startIndex) * endTimingEntry.delta;
          const delta = lastSampleTimestamp - firstSampleTimestamp;
          const lastSampleTimingEntry = last(newSampleTimingEntries);
          if (lastSampleTimingEntry && lastSampleTimingEntry.delta === delta) {
            lastSampleTimingEntry.count++;
          } else {
            newSampleTimingEntries.push({
              startIndex: chunkEntry.startChunkIndex + j,
              startDecodeTimestamp: firstSampleTimestamp,
              count: 1,
              delta
            });
          }
          const chunkSize = chunkEntry.samplesPerChunk * pcmInfo.sampleSize * internalTrack.info.numberOfChannels;
          newSampleSizes.push(chunkSize);
        }
        chunkEntry.startSampleIndex = chunkEntry.startChunkIndex;
        chunkEntry.samplesPerChunk = 1;
      }
      sampleTable.sampleTimingEntries = newSampleTimingEntries;
      sampleTable.sampleSizes = newSampleSizes;
    }
    if (sampleTable.sampleCompositionTimeOffsets.length > 0) {
      sampleTable.presentationTimestamps = [];
      for (const entry of sampleTable.sampleTimingEntries) {
        for (let i = 0; i < entry.count; i++) {
          sampleTable.presentationTimestamps.push({
            presentationTimestamp: entry.startDecodeTimestamp + i * entry.delta,
            sampleIndex: entry.startIndex + i
          });
        }
      }
      for (const entry of sampleTable.sampleCompositionTimeOffsets) {
        for (let i = 0; i < entry.count; i++) {
          const sampleIndex = entry.startIndex + i;
          const sample = sampleTable.presentationTimestamps[sampleIndex];
          if (!sample) {
            continue;
          }
          sample.presentationTimestamp += entry.offset;
        }
      }
      sampleTable.presentationTimestamps.sort((a, b) => a.presentationTimestamp - b.presentationTimestamp);
      sampleTable.presentationTimestampIndexMap = Array(sampleTable.presentationTimestamps.length).fill(-1);
      for (let i = 0; i < sampleTable.presentationTimestamps.length; i++) {
        sampleTable.presentationTimestampIndexMap[sampleTable.presentationTimestamps[i].sampleIndex] = i;
      }
    } else {
    }
    return sampleTable;
  }
  async readFragment() {
    const startPos = this.metadataReader.pos;
    await this.metadataReader.reader.loadRange(this.metadataReader.pos, this.metadataReader.pos + MAX_BOX_HEADER_SIZE);
    const moofBoxInfo = this.metadataReader.readBoxHeader();
    assert(moofBoxInfo?.name === "moof");
    const contentStart = this.metadataReader.pos;
    await this.metadataReader.reader.loadRange(contentStart, contentStart + moofBoxInfo.contentSize);
    this.metadataReader.pos = startPos;
    this.traverseBox();
    const index = binarySearchExact(this.fragments, startPos, (x) => x.moofOffset);
    assert(index !== -1);
    const fragment = this.fragments[index];
    assert(fragment.moofOffset === startPos);
    this.metadataReader.reader.forgetRange(contentStart, contentStart + moofBoxInfo.contentSize);
    for (const [trackId, trackData] of fragment.trackData) {
      if (trackData.startTimestampIsFinal) {
        continue;
      }
      const internalTrack = this.tracks.find((x) => x.id === trackId);
      this.metadataReader.pos = 0;
      let currentFragment = null;
      let lastFragment = null;
      const index2 = binarySearchLessOrEqual(internalTrack.fragments, startPos - 1, (x) => x.moofOffset);
      if (index2 !== -1) {
        currentFragment = internalTrack.fragments[index2];
        lastFragment = currentFragment;
        this.metadataReader.pos = currentFragment.moofOffset + currentFragment.moofSize;
      }
      let nextFragmentIsFirstFragment = this.metadataReader.pos === 0;
      while (this.metadataReader.pos <= startPos - MIN_BOX_HEADER_SIZE) {
        if (currentFragment?.nextFragment) {
          currentFragment = currentFragment.nextFragment;
          this.metadataReader.pos = currentFragment.moofOffset + currentFragment.moofSize;
        } else {
          await this.metadataReader.reader.loadRange(this.metadataReader.pos, this.metadataReader.pos + MAX_BOX_HEADER_SIZE);
          const startPos2 = this.metadataReader.pos;
          const boxInfo = this.metadataReader.readBoxHeader();
          if (!boxInfo) {
            break;
          }
          if (boxInfo.name === "moof") {
            const index3 = binarySearchExact(this.fragments, startPos2, (x) => x.moofOffset);
            let fragment2;
            if (index3 === -1) {
              this.metadataReader.pos = startPos2;
              fragment2 = await this.readFragment();
            } else {
              fragment2 = this.fragments[index3];
            }
            if (currentFragment)
              currentFragment.nextFragment = fragment2;
            currentFragment = fragment2;
            if (nextFragmentIsFirstFragment) {
              fragment2.isKnownToBeFirstFragment = true;
              nextFragmentIsFirstFragment = false;
            }
          }
          this.metadataReader.pos = startPos2 + boxInfo.totalSize;
        }
        if (currentFragment && currentFragment.trackData.has(trackId)) {
          lastFragment = currentFragment;
        }
      }
      if (lastFragment) {
        const otherTrackData = lastFragment.trackData.get(trackId);
        assert(otherTrackData.startTimestampIsFinal);
        offsetFragmentTrackDataByTimestamp(trackData, otherTrackData.endTimestamp);
      }
      trackData.startTimestampIsFinal = true;
    }
    return fragment;
  }
  readContiguousBoxes(totalSize) {
    const startIndex = this.metadataReader.pos;
    while (this.metadataReader.pos - startIndex <= totalSize - MIN_BOX_HEADER_SIZE) {
      const foundBox = this.traverseBox();
      if (!foundBox) {
        break;
      }
    }
  }
  traverseBox() {
    const startPos = this.metadataReader.pos;
    const boxInfo = this.metadataReader.readBoxHeader();
    if (!boxInfo) {
      return false;
    }
    const boxEndPos = startPos + boxInfo.totalSize;
    switch (boxInfo.name) {
      case "mdia":
      case "minf":
      case "dinf":
      case "mfra":
      case "edts":
      case "udta":
        {
          this.readContiguousBoxes(boxInfo.contentSize);
        }
        ;
        break;
      case "mvhd":
        {
          const version = this.metadataReader.readU8();
          this.metadataReader.pos += 3;
          if (version === 1) {
            this.metadataReader.pos += 8 + 8;
            this.movieTimescale = this.metadataReader.readU32();
            this.movieDurationInTimescale = this.metadataReader.readU64();
          } else {
            this.metadataReader.pos += 4 + 4;
            this.movieTimescale = this.metadataReader.readU32();
            this.movieDurationInTimescale = this.metadataReader.readU32();
          }
        }
        ;
        break;
      case "trak":
        {
          const track = {
            id: -1,
            demuxer: this,
            inputTrack: null,
            info: null,
            timescale: -1,
            durationInMovieTimescale: -1,
            durationInMediaTimescale: -1,
            rotation: 0,
            internalCodecId: null,
            name: null,
            languageCode: UNDETERMINED_LANGUAGE,
            sampleTableByteOffset: -1,
            sampleTable: null,
            fragmentLookupTable: null,
            currentFragmentState: null,
            fragments: [],
            fragmentsWithKeyFrame: [],
            editListPreviousSegmentDurations: 0,
            editListOffset: 0
          };
          this.currentTrack = track;
          this.readContiguousBoxes(boxInfo.contentSize);
          if (track.id !== -1 && track.timescale !== -1 && track.info !== null) {
            if (track.info.type === "video" && track.info.width !== -1) {
              const videoTrack = track;
              track.inputTrack = new InputVideoTrack(new IsobmffVideoTrackBacking(videoTrack));
              this.tracks.push(track);
            } else if (track.info.type === "audio" && track.info.numberOfChannels !== -1) {
              const audioTrack = track;
              track.inputTrack = new InputAudioTrack(new IsobmffAudioTrackBacking(audioTrack));
              this.tracks.push(track);
            }
          }
          this.currentTrack = null;
        }
        ;
        break;
      case "tkhd":
        {
          const track = this.currentTrack;
          assert(track);
          const version = this.metadataReader.readU8();
          const flags = this.metadataReader.readU24();
          const trackEnabled = (flags & 1) !== 0;
          if (!trackEnabled) {
            break;
          }
          if (version === 0) {
            this.metadataReader.pos += 8;
            track.id = this.metadataReader.readU32();
            this.metadataReader.pos += 4;
            track.durationInMovieTimescale = this.metadataReader.readU32();
          } else if (version === 1) {
            this.metadataReader.pos += 16;
            track.id = this.metadataReader.readU32();
            this.metadataReader.pos += 4;
            track.durationInMovieTimescale = this.metadataReader.readU64();
          } else {
            throw new Error(`Incorrect track header version ${version}.`);
          }
          this.metadataReader.pos += 2 * 4 + 2 + 2 + 2 + 2;
          const matrix = [
            this.metadataReader.readFixed_16_16(),
            this.metadataReader.readFixed_16_16(),
            this.metadataReader.readFixed_2_30(),
            this.metadataReader.readFixed_16_16(),
            this.metadataReader.readFixed_16_16(),
            this.metadataReader.readFixed_2_30(),
            this.metadataReader.readFixed_16_16(),
            this.metadataReader.readFixed_16_16(),
            this.metadataReader.readFixed_2_30()
          ];
          const rotation = normalizeRotation(roundToMultiple(extractRotationFromMatrix(matrix), 90));
          assert(rotation === 0 || rotation === 90 || rotation === 180 || rotation === 270);
          track.rotation = rotation;
        }
        ;
        break;
      case "elst":
        {
          const track = this.currentTrack;
          assert(track);
          const version = this.metadataReader.readU8();
          this.metadataReader.pos += 3;
          let relevantEntryFound = false;
          let previousSegmentDurations = 0;
          const entryCount = this.metadataReader.readU32();
          for (let i = 0; i < entryCount; i++) {
            const segmentDuration = version === 1 ? this.metadataReader.readU64() : this.metadataReader.readU32();
            const mediaTime = version === 1 ? this.metadataReader.readI64() : this.metadataReader.readI32();
            const mediaRate = this.metadataReader.readFixed_16_16();
            if (segmentDuration === 0) {
              continue;
            }
            if (relevantEntryFound) {
              console.warn("Unsupported edit list: multiple edits are not currently supported. Only using first edit.");
              break;
            }
            if (mediaTime === -1) {
              previousSegmentDurations += segmentDuration;
              continue;
            }
            if (mediaRate !== 1) {
              console.warn("Unsupported edit list entry: media rate must be 1.");
              break;
            }
            track.editListPreviousSegmentDurations = previousSegmentDurations;
            track.editListOffset = mediaTime;
            relevantEntryFound = true;
          }
        }
        ;
        break;
      case "mdhd":
        {
          const track = this.currentTrack;
          assert(track);
          const version = this.metadataReader.readU8();
          this.metadataReader.pos += 3;
          if (version === 0) {
            this.metadataReader.pos += 8;
            track.timescale = this.metadataReader.readU32();
            track.durationInMediaTimescale = this.metadataReader.readU32();
          } else if (version === 1) {
            this.metadataReader.pos += 16;
            track.timescale = this.metadataReader.readU32();
            track.durationInMediaTimescale = this.metadataReader.readU64();
          }
          let language = this.metadataReader.readU16();
          if (language > 0) {
            track.languageCode = "";
            for (let i = 0; i < 3; i++) {
              track.languageCode = String.fromCharCode(96 + (language & 31)) + track.languageCode;
              language >>= 5;
            }
            if (!isIso639Dash2LanguageCode(track.languageCode)) {
              track.languageCode = UNDETERMINED_LANGUAGE;
            }
          }
        }
        ;
        break;
      case "hdlr":
        {
          const track = this.currentTrack;
          assert(track);
          this.metadataReader.pos += 8;
          const handlerType = this.metadataReader.readAscii(4);
          if (handlerType === "vide") {
            track.info = {
              type: "video",
              width: -1,
              height: -1,
              codec: null,
              codecDescription: null,
              colorSpace: null,
              avcCodecInfo: null,
              hevcCodecInfo: null,
              vp9CodecInfo: null,
              av1CodecInfo: null
            };
          } else if (handlerType === "soun") {
            track.info = {
              type: "audio",
              numberOfChannels: -1,
              sampleRate: -1,
              codec: null,
              codecDescription: null,
              aacCodecInfo: null
            };
          }
        }
        ;
        break;
      case "stbl":
        {
          const track = this.currentTrack;
          assert(track);
          track.sampleTableByteOffset = startPos;
          this.readContiguousBoxes(boxInfo.contentSize);
        }
        ;
        break;
      case "stsd":
        {
          const track = this.currentTrack;
          assert(track);
          if (track.info === null || track.sampleTable) {
            break;
          }
          const stsdVersion = this.metadataReader.readU8();
          this.metadataReader.pos += 3;
          const entries = this.metadataReader.readU32();
          for (let i = 0; i < entries; i++) {
            const startPos2 = this.metadataReader.pos;
            const sampleBoxInfo = this.metadataReader.readBoxHeader();
            if (!sampleBoxInfo) {
              break;
            }
            track.internalCodecId = sampleBoxInfo.name;
            const lowercaseBoxName = sampleBoxInfo.name.toLowerCase();
            if (track.info.type === "video") {
              if (lowercaseBoxName === "avc1") {
                track.info.codec = "avc";
              } else if (lowercaseBoxName === "hvc1" || lowercaseBoxName === "hev1") {
                track.info.codec = "hevc";
              } else if (lowercaseBoxName === "vp08") {
                track.info.codec = "vp8";
              } else if (lowercaseBoxName === "vp09") {
                track.info.codec = "vp9";
              } else if (lowercaseBoxName === "av01") {
                track.info.codec = "av1";
              } else {
                console.warn(`Unsupported video codec (sample entry type '${sampleBoxInfo.name}').`);
              }
              this.metadataReader.pos += 6 * 1 + 2 + 2 + 2 + 3 * 4;
              track.info.width = this.metadataReader.readU16();
              track.info.height = this.metadataReader.readU16();
              this.metadataReader.pos += 4 + 4 + 4 + 2 + 32 + 2 + 2;
              this.readContiguousBoxes(startPos2 + sampleBoxInfo.totalSize - this.metadataReader.pos);
            } else {
              if (lowercaseBoxName === "mp4a") {
              } else if (lowercaseBoxName === "opus") {
                track.info.codec = "opus";
              } else if (lowercaseBoxName === "flac") {
                track.info.codec = "flac";
              } else if (lowercaseBoxName === "twos" || lowercaseBoxName === "sowt" || lowercaseBoxName === "raw " || lowercaseBoxName === "in24" || lowercaseBoxName === "in32" || lowercaseBoxName === "fl32" || lowercaseBoxName === "fl64" || lowercaseBoxName === "lpcm" || lowercaseBoxName === "ipcm" || lowercaseBoxName === "fpcm") {
              } else if (lowercaseBoxName === "ulaw") {
                track.info.codec = "ulaw";
              } else if (lowercaseBoxName === "alaw") {
                track.info.codec = "alaw";
              } else {
                console.warn(`Unsupported audio codec (sample entry type '${sampleBoxInfo.name}').`);
              }
              this.metadataReader.pos += 6 * 1 + 2;
              const version = this.metadataReader.readU16();
              this.metadataReader.pos += 3 * 2;
              let channelCount = this.metadataReader.readU16();
              let sampleSize = this.metadataReader.readU16();
              this.metadataReader.pos += 2 * 2;
              let sampleRate = this.metadataReader.readU32() / 65536;
              if (stsdVersion === 0 && version > 0) {
                if (version === 1) {
                  this.metadataReader.pos += 4;
                  sampleSize = 8 * this.metadataReader.readU32();
                  this.metadataReader.pos += 2 * 4;
                } else if (version === 2) {
                  this.metadataReader.pos += 4;
                  sampleRate = this.metadataReader.readF64();
                  channelCount = this.metadataReader.readU32();
                  this.metadataReader.pos += 4;
                  sampleSize = this.metadataReader.readU32();
                  const flags = this.metadataReader.readU32();
                  this.metadataReader.pos += 2 * 4;
                  if (lowercaseBoxName === "lpcm") {
                    const bytesPerSample = sampleSize + 7 >> 3;
                    const isFloat = Boolean(flags & 1);
                    const isBigEndian = Boolean(flags & 2);
                    const sFlags = flags & 4 ? -1 : 0;
                    if (sampleSize > 0 && sampleSize <= 64) {
                      if (isFloat) {
                        if (sampleSize === 32) {
                          track.info.codec = isBigEndian ? "pcm-f32be" : "pcm-f32";
                        }
                      } else {
                        if (sFlags & 1 << bytesPerSample - 1) {
                          if (bytesPerSample === 1) {
                            track.info.codec = "pcm-s8";
                          } else if (bytesPerSample === 2) {
                            track.info.codec = isBigEndian ? "pcm-s16be" : "pcm-s16";
                          } else if (bytesPerSample === 3) {
                            track.info.codec = isBigEndian ? "pcm-s24be" : "pcm-s24";
                          } else if (bytesPerSample === 4) {
                            track.info.codec = isBigEndian ? "pcm-s32be" : "pcm-s32";
                          }
                        } else {
                          if (bytesPerSample === 1) {
                            track.info.codec = "pcm-u8";
                          }
                        }
                      }
                    }
                    if (track.info.codec === null) {
                      console.warn("Unsupported PCM format.");
                    }
                  }
                }
              }
              track.info.numberOfChannels = channelCount;
              track.info.sampleRate = sampleRate;
              if (lowercaseBoxName === "twos") {
                if (sampleSize === 8) {
                  track.info.codec = "pcm-s8";
                } else if (sampleSize === 16) {
                  track.info.codec = "pcm-s16be";
                } else {
                  console.warn(`Unsupported sample size ${sampleSize} for codec 'twos'.`);
                  track.info.codec = null;
                }
              } else if (lowercaseBoxName === "sowt") {
                if (sampleSize === 8) {
                  track.info.codec = "pcm-s8";
                } else if (sampleSize === 16) {
                  track.info.codec = "pcm-s16";
                } else {
                  console.warn(`Unsupported sample size ${sampleSize} for codec 'sowt'.`);
                  track.info.codec = null;
                }
              } else if (lowercaseBoxName === "raw ") {
                track.info.codec = "pcm-u8";
              } else if (lowercaseBoxName === "in24") {
                track.info.codec = "pcm-s24be";
              } else if (lowercaseBoxName === "in32") {
                track.info.codec = "pcm-s32be";
              } else if (lowercaseBoxName === "fl32") {
                track.info.codec = "pcm-f32be";
              } else if (lowercaseBoxName === "fl64") {
                track.info.codec = "pcm-f64be";
              } else if (lowercaseBoxName === "ipcm") {
                track.info.codec = "pcm-s16be";
              } else if (lowercaseBoxName === "fpcm") {
                track.info.codec = "pcm-f32be";
              }
              this.readContiguousBoxes(startPos2 + sampleBoxInfo.totalSize - this.metadataReader.pos);
            }
          }
        }
        ;
        break;
      case "avcC":
        {
          const track = this.currentTrack;
          assert(track && track.info);
          track.info.codecDescription = this.metadataReader.readBytes(boxInfo.contentSize);
        }
        ;
        break;
      case "hvcC":
        {
          const track = this.currentTrack;
          assert(track && track.info);
          track.info.codecDescription = this.metadataReader.readBytes(boxInfo.contentSize);
        }
        ;
        break;
      case "vpcC":
        {
          const track = this.currentTrack;
          assert(track && track.info?.type === "video");
          this.metadataReader.pos += 4;
          const profile = this.metadataReader.readU8();
          const level = this.metadataReader.readU8();
          const thirdByte = this.metadataReader.readU8();
          const bitDepth = thirdByte >> 4;
          const chromaSubsampling = thirdByte >> 1 & 7;
          const videoFullRangeFlag = thirdByte & 1;
          const colourPrimaries = this.metadataReader.readU8();
          const transferCharacteristics = this.metadataReader.readU8();
          const matrixCoefficients = this.metadataReader.readU8();
          track.info.vp9CodecInfo = {
            profile,
            level,
            bitDepth,
            chromaSubsampling,
            videoFullRangeFlag,
            colourPrimaries,
            transferCharacteristics,
            matrixCoefficients
          };
        }
        ;
        break;
      case "av1C":
        {
          const track = this.currentTrack;
          assert(track && track.info?.type === "video");
          this.metadataReader.pos += 1;
          const secondByte = this.metadataReader.readU8();
          const profile = secondByte >> 5;
          const level = secondByte & 31;
          const thirdByte = this.metadataReader.readU8();
          const tier = thirdByte >> 7;
          const highBitDepth = thirdByte >> 6 & 1;
          const twelveBit = thirdByte >> 5 & 1;
          const monochrome = thirdByte >> 4 & 1;
          const chromaSubsamplingX = thirdByte >> 3 & 1;
          const chromaSubsamplingY = thirdByte >> 2 & 1;
          const chromaSamplePosition = thirdByte & 3;
          const bitDepth = profile === 2 && highBitDepth ? twelveBit ? 12 : 10 : highBitDepth ? 10 : 8;
          track.info.av1CodecInfo = {
            profile,
            level,
            tier,
            bitDepth,
            monochrome,
            chromaSubsamplingX,
            chromaSubsamplingY,
            chromaSamplePosition
          };
        }
        ;
        break;
      case "colr":
        {
          const track = this.currentTrack;
          assert(track && track.info?.type === "video");
          const colourType = this.metadataReader.readAscii(4);
          if (colourType !== "nclx") {
            break;
          }
          const colourPrimaries = this.metadataReader.readU16();
          const transferCharacteristics = this.metadataReader.readU16();
          const matrixCoefficients = this.metadataReader.readU16();
          const fullRangeFlag = Boolean(this.metadataReader.readU8() & 128);
          track.info.colorSpace = {
            primaries: COLOR_PRIMARIES_MAP_INVERSE[colourPrimaries],
            transfer: TRANSFER_CHARACTERISTICS_MAP_INVERSE[transferCharacteristics],
            matrix: MATRIX_COEFFICIENTS_MAP_INVERSE[matrixCoefficients],
            fullRange: fullRangeFlag
          };
        }
        ;
        break;
      case "wave":
        {
          this.readContiguousBoxes(boxInfo.contentSize);
        }
        ;
        break;
      case "esds":
        {
          const track = this.currentTrack;
          assert(track && track.info?.type === "audio");
          this.metadataReader.pos += 4;
          const tag = this.metadataReader.readU8();
          assert(tag === 3);
          this.metadataReader.readIsomVariableInteger();
          this.metadataReader.pos += 2;
          const mixed = this.metadataReader.readU8();
          const streamDependenceFlag = (mixed & 128) !== 0;
          const urlFlag = (mixed & 64) !== 0;
          const ocrStreamFlag = (mixed & 32) !== 0;
          if (streamDependenceFlag) {
            this.metadataReader.pos += 2;
          }
          if (urlFlag) {
            const urlLength = this.metadataReader.readU8();
            this.metadataReader.pos += urlLength;
          }
          if (ocrStreamFlag) {
            this.metadataReader.pos += 2;
          }
          const decoderConfigTag = this.metadataReader.readU8();
          assert(decoderConfigTag === 4);
          const decoderConfigDescriptorLength = this.metadataReader.readIsomVariableInteger();
          const payloadStart = this.metadataReader.pos;
          const objectTypeIndication = this.metadataReader.readU8();
          if (objectTypeIndication === 64 || objectTypeIndication === 103) {
            track.info.codec = "aac";
            track.info.aacCodecInfo = { isMpeg2: objectTypeIndication === 103 };
          } else if (objectTypeIndication === 105 || objectTypeIndication === 107) {
            track.info.codec = "mp3";
          } else if (objectTypeIndication === 221) {
            track.info.codec = "vorbis";
          } else {
            console.warn(`Unsupported audio codec (objectTypeIndication ${objectTypeIndication}) - discarding track.`);
          }
          this.metadataReader.pos += 1 + 3 + 4 + 4;
          if (decoderConfigDescriptorLength > this.metadataReader.pos - payloadStart) {
            const decoderSpecificInfoTag = this.metadataReader.readU8();
            assert(decoderSpecificInfoTag === 5);
            const decoderSpecificInfoLength = this.metadataReader.readIsomVariableInteger();
            track.info.codecDescription = this.metadataReader.readBytes(decoderSpecificInfoLength);
            if (track.info.codec === "aac") {
              const audioSpecificConfig = parseAacAudioSpecificConfig(track.info.codecDescription);
              if (audioSpecificConfig.numberOfChannels !== null) {
                track.info.numberOfChannels = audioSpecificConfig.numberOfChannels;
              }
              if (audioSpecificConfig.sampleRate !== null) {
                track.info.sampleRate = audioSpecificConfig.sampleRate;
              }
            }
          }
        }
        ;
        break;
      case "enda":
        {
          const track = this.currentTrack;
          assert(track && track.info?.type === "audio");
          const littleEndian = this.metadataReader.readU16() & 255;
          if (littleEndian) {
            if (track.info.codec === "pcm-s16be") {
              track.info.codec = "pcm-s16";
            } else if (track.info.codec === "pcm-s24be") {
              track.info.codec = "pcm-s24";
            } else if (track.info.codec === "pcm-s32be") {
              track.info.codec = "pcm-s32";
            } else if (track.info.codec === "pcm-f32be") {
              track.info.codec = "pcm-f32";
            } else if (track.info.codec === "pcm-f64be") {
              track.info.codec = "pcm-f64";
            }
          }
        }
        ;
        break;
      case "pcmC":
        {
          const track = this.currentTrack;
          assert(track && track.info?.type === "audio");
          this.metadataReader.pos += 1 + 3;
          const formatFlags = this.metadataReader.readU8();
          const isLittleEndian = Boolean(formatFlags & 1);
          const pcmSampleSize = this.metadataReader.readU8();
          if (track.info.codec === "pcm-s16be") {
            if (isLittleEndian) {
              if (pcmSampleSize === 16) {
                track.info.codec = "pcm-s16";
              } else if (pcmSampleSize === 24) {
                track.info.codec = "pcm-s24";
              } else if (pcmSampleSize === 32) {
                track.info.codec = "pcm-s32";
              } else {
                console.warn(`Invalid ipcm sample size ${pcmSampleSize}.`);
                track.info.codec = null;
              }
            } else {
              if (pcmSampleSize === 16) {
                track.info.codec = "pcm-s16be";
              } else if (pcmSampleSize === 24) {
                track.info.codec = "pcm-s24be";
              } else if (pcmSampleSize === 32) {
                track.info.codec = "pcm-s32be";
              } else {
                console.warn(`Invalid ipcm sample size ${pcmSampleSize}.`);
                track.info.codec = null;
              }
            }
          } else if (track.info.codec === "pcm-f32be") {
            if (isLittleEndian) {
              if (pcmSampleSize === 32) {
                track.info.codec = "pcm-f32";
              } else if (pcmSampleSize === 64) {
                track.info.codec = "pcm-f64";
              } else {
                console.warn(`Invalid fpcm sample size ${pcmSampleSize}.`);
                track.info.codec = null;
              }
            } else {
              if (pcmSampleSize === 32) {
                track.info.codec = "pcm-f32be";
              } else if (pcmSampleSize === 64) {
                track.info.codec = "pcm-f64be";
              } else {
                console.warn(`Invalid fpcm sample size ${pcmSampleSize}.`);
                track.info.codec = null;
              }
            }
          }
          break;
        }
        ;
      case "dOps":
        {
          const track = this.currentTrack;
          assert(track && track.info?.type === "audio");
          this.metadataReader.pos += 1;
          const outputChannelCount = this.metadataReader.readU8();
          const preSkip = this.metadataReader.readU16();
          const inputSampleRate = this.metadataReader.readU32();
          const outputGain = this.metadataReader.readI16();
          const channelMappingFamily = this.metadataReader.readU8();
          let channelMappingTable;
          if (channelMappingFamily !== 0) {
            channelMappingTable = this.metadataReader.readBytes(2 + outputChannelCount);
          } else {
            channelMappingTable = new Uint8Array(0);
          }
          const description = new Uint8Array(8 + 1 + 1 + 2 + 4 + 2 + 1 + channelMappingTable.byteLength);
          const view = new DataView(description.buffer);
          view.setUint32(0, 1332770163, false);
          view.setUint32(4, 1214603620, false);
          view.setUint8(8, 1);
          view.setUint8(9, outputChannelCount);
          view.setUint16(10, preSkip, true);
          view.setUint32(12, inputSampleRate, true);
          view.setInt16(16, outputGain, true);
          view.setUint8(18, channelMappingFamily);
          description.set(channelMappingTable, 19);
          track.info.codecDescription = description;
          track.info.numberOfChannels = outputChannelCount;
          track.info.sampleRate = inputSampleRate;
        }
        ;
        break;
      case "dfLa":
        {
          const track = this.currentTrack;
          assert(track && track.info?.type === "audio");
          this.metadataReader.pos += 4;
          const BLOCK_TYPE_MASK = 127;
          const LAST_METADATA_BLOCK_FLAG_MASK = 128;
          const startPos2 = this.metadataReader.pos;
          while (this.metadataReader.pos < boxEndPos) {
            const flagAndType = this.metadataReader.readU8();
            const metadataBlockLength = this.metadataReader.readU24();
            const type = flagAndType & BLOCK_TYPE_MASK;
            if (type === 0) {
              this.metadataReader.pos += 10;
              const word = this.metadataReader.readU32();
              const sampleRate = word >>> 12;
              const numberOfChannels = (word >> 9 & 7) + 1;
              track.info.sampleRate = sampleRate;
              track.info.numberOfChannels = numberOfChannels;
              this.metadataReader.pos += 20;
            } else {
              this.metadataReader.pos += metadataBlockLength;
            }
            if (flagAndType & LAST_METADATA_BLOCK_FLAG_MASK) {
              break;
            }
          }
          const endPos = this.metadataReader.pos;
          this.metadataReader.pos = startPos2;
          const bytes = this.metadataReader.readBytes(endPos - startPos2);
          const description = new Uint8Array(4 + bytes.byteLength);
          const view = new DataView(description.buffer);
          view.setUint32(0, 1716281667, false);
          description.set(bytes, 4);
          track.info.codecDescription = description;
        }
        ;
        break;
      case "stts":
        {
          const track = this.currentTrack;
          assert(track);
          if (!track.sampleTable) {
            break;
          }
          this.metadataReader.pos += 4;
          const entryCount = this.metadataReader.readU32();
          let currentIndex = 0;
          let currentTimestamp = 0;
          for (let i = 0; i < entryCount; i++) {
            const sampleCount = this.metadataReader.readU32();
            const sampleDelta = this.metadataReader.readU32();
            track.sampleTable.sampleTimingEntries.push({
              startIndex: currentIndex,
              startDecodeTimestamp: currentTimestamp,
              count: sampleCount,
              delta: sampleDelta
            });
            currentIndex += sampleCount;
            currentTimestamp += sampleCount * sampleDelta;
          }
        }
        ;
        break;
      case "ctts":
        {
          const track = this.currentTrack;
          assert(track);
          if (!track.sampleTable) {
            break;
          }
          this.metadataReader.pos += 1 + 3;
          const entryCount = this.metadataReader.readU32();
          let sampleIndex = 0;
          for (let i = 0; i < entryCount; i++) {
            const sampleCount = this.metadataReader.readU32();
            const sampleOffset = this.metadataReader.readI32();
            track.sampleTable.sampleCompositionTimeOffsets.push({
              startIndex: sampleIndex,
              count: sampleCount,
              offset: sampleOffset
            });
            sampleIndex += sampleCount;
          }
        }
        ;
        break;
      case "stsz":
        {
          const track = this.currentTrack;
          assert(track);
          if (!track.sampleTable) {
            break;
          }
          this.metadataReader.pos += 4;
          const sampleSize = this.metadataReader.readU32();
          const sampleCount = this.metadataReader.readU32();
          if (sampleSize === 0) {
            for (let i = 0; i < sampleCount; i++) {
              const sampleSize2 = this.metadataReader.readU32();
              track.sampleTable.sampleSizes.push(sampleSize2);
            }
          } else {
            track.sampleTable.sampleSizes.push(sampleSize);
          }
        }
        ;
        break;
      case "stz2":
        {
          const track = this.currentTrack;
          assert(track);
          if (!track.sampleTable) {
            break;
          }
          this.metadataReader.pos += 4;
          this.metadataReader.pos += 3;
          const fieldSize = this.metadataReader.readU8();
          const sampleCount = this.metadataReader.readU32();
          const bytes = this.metadataReader.readBytes(Math.ceil(sampleCount * fieldSize / 8));
          const bitstream = new Bitstream(bytes);
          for (let i = 0; i < sampleCount; i++) {
            const sampleSize = bitstream.readBits(fieldSize);
            track.sampleTable.sampleSizes.push(sampleSize);
          }
        }
        ;
        break;
      case "stss":
        {
          const track = this.currentTrack;
          assert(track);
          if (!track.sampleTable) {
            break;
          }
          this.metadataReader.pos += 4;
          track.sampleTable.keySampleIndices = [];
          const entryCount = this.metadataReader.readU32();
          for (let i = 0; i < entryCount; i++) {
            const sampleIndex = this.metadataReader.readU32() - 1;
            track.sampleTable.keySampleIndices.push(sampleIndex);
          }
          if (track.sampleTable.keySampleIndices[0] !== 0) {
            track.sampleTable.keySampleIndices.unshift(0);
          }
        }
        ;
        break;
      case "stsc":
        {
          const track = this.currentTrack;
          assert(track);
          if (!track.sampleTable) {
            break;
          }
          this.metadataReader.pos += 4;
          const entryCount = this.metadataReader.readU32();
          for (let i = 0; i < entryCount; i++) {
            const startChunkIndex = this.metadataReader.readU32() - 1;
            const samplesPerChunk = this.metadataReader.readU32();
            const sampleDescriptionIndex = this.metadataReader.readU32();
            track.sampleTable.sampleToChunk.push({
              startSampleIndex: -1,
              startChunkIndex,
              samplesPerChunk,
              sampleDescriptionIndex
            });
          }
          let startSampleIndex = 0;
          for (let i = 0; i < track.sampleTable.sampleToChunk.length; i++) {
            track.sampleTable.sampleToChunk[i].startSampleIndex = startSampleIndex;
            if (i < track.sampleTable.sampleToChunk.length - 1) {
              const nextChunk = track.sampleTable.sampleToChunk[i + 1];
              const chunkCount = nextChunk.startChunkIndex - track.sampleTable.sampleToChunk[i].startChunkIndex;
              startSampleIndex += chunkCount * track.sampleTable.sampleToChunk[i].samplesPerChunk;
            }
          }
        }
        ;
        break;
      case "stco":
        {
          const track = this.currentTrack;
          assert(track);
          if (!track.sampleTable) {
            break;
          }
          this.metadataReader.pos += 4;
          const entryCount = this.metadataReader.readU32();
          for (let i = 0; i < entryCount; i++) {
            const chunkOffset = this.metadataReader.readU32();
            track.sampleTable.chunkOffsets.push(chunkOffset);
          }
        }
        ;
        break;
      case "co64":
        {
          const track = this.currentTrack;
          assert(track);
          if (!track.sampleTable) {
            break;
          }
          this.metadataReader.pos += 4;
          const entryCount = this.metadataReader.readU32();
          for (let i = 0; i < entryCount; i++) {
            const chunkOffset = this.metadataReader.readU64();
            track.sampleTable.chunkOffsets.push(chunkOffset);
          }
        }
        ;
        break;
      case "mvex":
        {
          this.isFragmented = true;
          this.readContiguousBoxes(boxInfo.contentSize);
        }
        ;
        break;
      case "mehd":
        {
          const version = this.metadataReader.readU8();
          this.metadataReader.pos += 3;
          const fragmentDuration = version === 1 ? this.metadataReader.readU64() : this.metadataReader.readU32();
          this.movieDurationInTimescale = fragmentDuration;
        }
        ;
        break;
      case "trex":
        {
          this.metadataReader.pos += 4;
          const trackId = this.metadataReader.readU32();
          const defaultSampleDescriptionIndex = this.metadataReader.readU32();
          const defaultSampleDuration = this.metadataReader.readU32();
          const defaultSampleSize = this.metadataReader.readU32();
          const defaultSampleFlags = this.metadataReader.readU32();
          this.fragmentTrackDefaults.push({
            trackId,
            defaultSampleDescriptionIndex,
            defaultSampleDuration,
            defaultSampleSize,
            defaultSampleFlags
          });
        }
        ;
        break;
      case "tfra":
        {
          const version = this.metadataReader.readU8();
          this.metadataReader.pos += 3;
          const trackId = this.metadataReader.readU32();
          const track = this.tracks.find((x2) => x2.id === trackId);
          if (!track) {
            break;
          }
          track.fragmentLookupTable = [];
          const word = this.metadataReader.readU32();
          const lengthSizeOfTrafNum = (word & 48) >> 4;
          const lengthSizeOfTrunNum = (word & 12) >> 2;
          const lengthSizeOfSampleNum = word & 3;
          const x = this.metadataReader;
          const functions = [x.readU8.bind(x), x.readU16.bind(x), x.readU24.bind(x), x.readU32.bind(x)];
          const readTrafNum = functions[lengthSizeOfTrafNum];
          const readTrunNum = functions[lengthSizeOfTrunNum];
          const readSampleNum = functions[lengthSizeOfSampleNum];
          const numberOfEntries = this.metadataReader.readU32();
          for (let i = 0; i < numberOfEntries; i++) {
            const time = version === 1 ? this.metadataReader.readU64() : this.metadataReader.readU32();
            const moofOffset = version === 1 ? this.metadataReader.readU64() : this.metadataReader.readU32();
            const trafNumber = readTrafNum();
            const trunNumber = readTrunNum();
            const sampleNumber = readSampleNum();
            track.fragmentLookupTable.push({
              timestamp: time,
              moofOffset
            });
          }
        }
        ;
        break;
      case "moof":
        {
          this.currentFragment = {
            moofOffset: startPos,
            moofSize: boxInfo.totalSize,
            implicitBaseDataOffset: startPos,
            trackData: /* @__PURE__ */ new Map(),
            dataStart: Infinity,
            dataEnd: 0,
            nextFragment: null,
            isKnownToBeFirstFragment: false
          };
          this.readContiguousBoxes(boxInfo.contentSize);
          insertSorted(this.fragments, this.currentFragment, (x) => x.moofOffset);
          for (const [, trackData] of this.currentFragment.trackData) {
            const firstSample = trackData.samples[0];
            const lastSample = last(trackData.samples);
            this.currentFragment.dataStart = Math.min(this.currentFragment.dataStart, firstSample.byteOffset);
            this.currentFragment.dataEnd = Math.max(this.currentFragment.dataEnd, lastSample.byteOffset + lastSample.byteSize);
          }
          this.currentFragment = null;
        }
        ;
        break;
      case "traf":
        {
          assert(this.currentFragment);
          this.readContiguousBoxes(boxInfo.contentSize);
          if (this.currentTrack) {
            const trackData = this.currentFragment.trackData.get(this.currentTrack.id);
            if (trackData) {
              insertSorted(this.currentTrack.fragments, this.currentFragment, (x) => x.moofOffset);
              const hasKeyFrame = trackData.firstKeyFrameTimestamp !== null;
              if (hasKeyFrame) {
                insertSorted(this.currentTrack.fragmentsWithKeyFrame, this.currentFragment, (x) => x.moofOffset);
              }
              const { currentFragmentState } = this.currentTrack;
              assert(currentFragmentState);
              if (currentFragmentState.startTimestamp !== null) {
                offsetFragmentTrackDataByTimestamp(trackData, currentFragmentState.startTimestamp);
                trackData.startTimestampIsFinal = true;
              }
            }
            this.currentTrack.currentFragmentState = null;
            this.currentTrack = null;
          }
        }
        ;
        break;
      case "tfhd":
        {
          assert(this.currentFragment);
          this.metadataReader.pos += 1;
          const flags = this.metadataReader.readU24();
          const baseDataOffsetPresent = Boolean(flags & 1);
          const sampleDescriptionIndexPresent = Boolean(flags & 2);
          const defaultSampleDurationPresent = Boolean(flags & 8);
          const defaultSampleSizePresent = Boolean(flags & 16);
          const defaultSampleFlagsPresent = Boolean(flags & 32);
          const durationIsEmpty = Boolean(flags & 65536);
          const defaultBaseIsMoof = Boolean(flags & 131072);
          const trackId = this.metadataReader.readU32();
          const track = this.tracks.find((x) => x.id === trackId);
          if (!track) {
            break;
          }
          const defaults = this.fragmentTrackDefaults.find((x) => x.trackId === trackId);
          this.currentTrack = track;
          track.currentFragmentState = {
            baseDataOffset: this.currentFragment.implicitBaseDataOffset,
            sampleDescriptionIndex: defaults?.defaultSampleDescriptionIndex ?? null,
            defaultSampleDuration: defaults?.defaultSampleDuration ?? null,
            defaultSampleSize: defaults?.defaultSampleSize ?? null,
            defaultSampleFlags: defaults?.defaultSampleFlags ?? null,
            startTimestamp: null
          };
          if (baseDataOffsetPresent) {
            track.currentFragmentState.baseDataOffset = this.metadataReader.readU64();
          } else if (defaultBaseIsMoof) {
            track.currentFragmentState.baseDataOffset = this.currentFragment.moofOffset;
          }
          if (sampleDescriptionIndexPresent) {
            track.currentFragmentState.sampleDescriptionIndex = this.metadataReader.readU32();
          }
          if (defaultSampleDurationPresent) {
            track.currentFragmentState.defaultSampleDuration = this.metadataReader.readU32();
          }
          if (defaultSampleSizePresent) {
            track.currentFragmentState.defaultSampleSize = this.metadataReader.readU32();
          }
          if (defaultSampleFlagsPresent) {
            track.currentFragmentState.defaultSampleFlags = this.metadataReader.readU32();
          }
          if (durationIsEmpty) {
            track.currentFragmentState.defaultSampleDuration = 0;
          }
        }
        ;
        break;
      case "tfdt":
        {
          const track = this.currentTrack;
          if (!track) {
            break;
          }
          assert(track.currentFragmentState);
          const version = this.metadataReader.readU8();
          this.metadataReader.pos += 3;
          const baseMediaDecodeTime = version === 0 ? this.metadataReader.readU32() : this.metadataReader.readU64();
          track.currentFragmentState.startTimestamp = baseMediaDecodeTime;
        }
        ;
        break;
      case "trun":
        {
          const track = this.currentTrack;
          if (!track) {
            break;
          }
          assert(this.currentFragment);
          assert(track.currentFragmentState);
          if (this.currentFragment.trackData.has(track.id)) {
            console.warn("Can't have two trun boxes for the same track in one fragment. Ignoring...");
            break;
          }
          const version = this.metadataReader.readU8();
          const flags = this.metadataReader.readU24();
          const dataOffsetPresent = Boolean(flags & 1);
          const firstSampleFlagsPresent = Boolean(flags & 4);
          const sampleDurationPresent = Boolean(flags & 256);
          const sampleSizePresent = Boolean(flags & 512);
          const sampleFlagsPresent = Boolean(flags & 1024);
          const sampleCompositionTimeOffsetsPresent = Boolean(flags & 2048);
          const sampleCount = this.metadataReader.readU32();
          let dataOffset = track.currentFragmentState.baseDataOffset;
          if (dataOffsetPresent) {
            dataOffset += this.metadataReader.readI32();
          }
          let firstSampleFlags = null;
          if (firstSampleFlagsPresent) {
            firstSampleFlags = this.metadataReader.readU32();
          }
          let currentOffset = dataOffset;
          if (sampleCount === 0) {
            this.currentFragment.implicitBaseDataOffset = currentOffset;
            break;
          }
          let currentTimestamp = 0;
          const trackData = {
            startTimestamp: 0,
            endTimestamp: 0,
            firstKeyFrameTimestamp: null,
            samples: [],
            presentationTimestamps: [],
            startTimestampIsFinal: false
          };
          this.currentFragment.trackData.set(track.id, trackData);
          for (let i = 0; i < sampleCount; i++) {
            let sampleDuration;
            if (sampleDurationPresent) {
              sampleDuration = this.metadataReader.readU32();
            } else {
              assert(track.currentFragmentState.defaultSampleDuration !== null);
              sampleDuration = track.currentFragmentState.defaultSampleDuration;
            }
            let sampleSize;
            if (sampleSizePresent) {
              sampleSize = this.metadataReader.readU32();
            } else {
              assert(track.currentFragmentState.defaultSampleSize !== null);
              sampleSize = track.currentFragmentState.defaultSampleSize;
            }
            let sampleFlags;
            if (sampleFlagsPresent) {
              sampleFlags = this.metadataReader.readU32();
            } else {
              assert(track.currentFragmentState.defaultSampleFlags !== null);
              sampleFlags = track.currentFragmentState.defaultSampleFlags;
            }
            if (i === 0 && firstSampleFlags !== null) {
              sampleFlags = firstSampleFlags;
            }
            let sampleCompositionTimeOffset = 0;
            if (sampleCompositionTimeOffsetsPresent) {
              if (version === 0) {
                sampleCompositionTimeOffset = this.metadataReader.readU32();
              } else {
                sampleCompositionTimeOffset = this.metadataReader.readI32();
              }
            }
            const isKeyFrame = !(sampleFlags & 65536);
            trackData.samples.push({
              presentationTimestamp: currentTimestamp + sampleCompositionTimeOffset,
              duration: sampleDuration,
              byteOffset: currentOffset,
              byteSize: sampleSize,
              isKeyFrame
            });
            currentOffset += sampleSize;
            currentTimestamp += sampleDuration;
          }
          trackData.presentationTimestamps = trackData.samples.map((x, i) => ({ presentationTimestamp: x.presentationTimestamp, sampleIndex: i })).sort((a, b) => a.presentationTimestamp - b.presentationTimestamp);
          for (let i = 0; i < trackData.presentationTimestamps.length; i++) {
            const currentEntry = trackData.presentationTimestamps[i];
            const currentSample = trackData.samples[currentEntry.sampleIndex];
            if (trackData.firstKeyFrameTimestamp === null && currentSample.isKeyFrame) {
              trackData.firstKeyFrameTimestamp = currentSample.presentationTimestamp;
            }
            if (i < trackData.presentationTimestamps.length - 1) {
              const nextEntry = trackData.presentationTimestamps[i + 1];
              currentSample.duration = nextEntry.presentationTimestamp - currentEntry.presentationTimestamp;
            }
          }
          const firstSample = trackData.samples[trackData.presentationTimestamps[0].sampleIndex];
          const lastSample = trackData.samples[last(trackData.presentationTimestamps).sampleIndex];
          trackData.startTimestamp = firstSample.presentationTimestamp;
          trackData.endTimestamp = lastSample.presentationTimestamp + lastSample.duration;
          this.currentFragment.implicitBaseDataOffset = currentOffset;
        }
        ;
        break;
      // These appear in udta:
      case "\xA9nam":
      case "name":
        {
          if (!this.currentTrack) {
            break;
          }
          this.currentTrack.name = textDecoder.decode(this.metadataReader.readBytes(boxInfo.contentSize));
        }
        ;
        break;
    }
    this.metadataReader.pos = boxEndPos;
    return true;
  }
};
var IsobmffTrackBacking = class {
  constructor(internalTrack) {
    this.internalTrack = internalTrack;
    this.packetToSampleIndex = /* @__PURE__ */ new WeakMap();
    this.packetToFragmentLocation = /* @__PURE__ */ new WeakMap();
  }
  getId() {
    return this.internalTrack.id;
  }
  getCodec() {
    throw new Error("Not implemented on base class.");
  }
  getInternalCodecId() {
    return this.internalTrack.internalCodecId;
  }
  getName() {
    return this.internalTrack.name;
  }
  getLanguageCode() {
    return this.internalTrack.languageCode;
  }
  getTimeResolution() {
    return this.internalTrack.timescale;
  }
  async computeDuration() {
    const lastPacket = await this.getPacket(Infinity, { metadataOnly: true });
    return (lastPacket?.timestamp ?? 0) + (lastPacket?.duration ?? 0);
  }
  async getFirstTimestamp() {
    const firstPacket = await this.getFirstPacket({ metadataOnly: true });
    return firstPacket?.timestamp ?? 0;
  }
  async getFirstPacket(options) {
    const regularPacket = await this.fetchPacketForSampleIndex(0, options);
    if (regularPacket || !this.internalTrack.demuxer.isFragmented) {
      return regularPacket;
    }
    return this.performFragmentedLookup(
      () => {
        const startFragment = this.internalTrack.demuxer.fragments[0] ?? null;
        if (startFragment?.isKnownToBeFirstFragment) {
          let currentFragment = startFragment;
          while (currentFragment) {
            const trackData = currentFragment.trackData.get(this.internalTrack.id);
            if (trackData) {
              return {
                fragmentIndex: binarySearchExact(this.internalTrack.fragments, currentFragment.moofOffset, (x) => x.moofOffset),
                sampleIndex: 0,
                correctSampleFound: true
              };
            }
            currentFragment = currentFragment.nextFragment;
          }
        }
        return {
          fragmentIndex: -1,
          sampleIndex: -1,
          correctSampleFound: false
        };
      },
      -Infinity,
      // Use -Infinity as a search timestamp to avoid using the lookup entries
      Infinity,
      options
    );
  }
  mapTimestampIntoTimescale(timestamp) {
    return roundToPrecision(timestamp * this.internalTrack.timescale, 14) + this.internalTrack.editListOffset;
  }
  async getPacket(timestamp, options) {
    const timestampInTimescale = this.mapTimestampIntoTimescale(timestamp);
    const sampleTable = this.internalTrack.demuxer.getSampleTableForTrack(this.internalTrack);
    const sampleIndex = getSampleIndexForTimestamp(sampleTable, timestampInTimescale);
    const regularPacket = await this.fetchPacketForSampleIndex(sampleIndex, options);
    if (!sampleTableIsEmpty(sampleTable) || !this.internalTrack.demuxer.isFragmented) {
      return regularPacket;
    }
    return this.performFragmentedLookup(() => this.findSampleInFragmentsForTimestamp(timestampInTimescale), timestampInTimescale, timestampInTimescale, options);
  }
  async getNextPacket(packet, options) {
    const regularSampleIndex = this.packetToSampleIndex.get(packet);
    if (regularSampleIndex !== void 0) {
      return this.fetchPacketForSampleIndex(regularSampleIndex + 1, options);
    }
    const locationInFragment = this.packetToFragmentLocation.get(packet);
    if (locationInFragment === void 0) {
      throw new Error("Packet was not created from this track.");
    }
    const trackData = locationInFragment.fragment.trackData.get(this.internalTrack.id);
    const fragmentIndex = binarySearchExact(this.internalTrack.fragments, locationInFragment.fragment.moofOffset, (x) => x.moofOffset);
    assert(fragmentIndex !== -1);
    return this.performFragmentedLookup(
      () => {
        if (locationInFragment.sampleIndex + 1 < trackData.samples.length) {
          return {
            fragmentIndex,
            sampleIndex: locationInFragment.sampleIndex + 1,
            correctSampleFound: true
          };
        } else {
          let currentFragment = locationInFragment.fragment;
          while (currentFragment.nextFragment) {
            currentFragment = currentFragment.nextFragment;
            const trackData2 = currentFragment.trackData.get(this.internalTrack.id);
            if (trackData2) {
              const fragmentIndex2 = binarySearchExact(this.internalTrack.fragments, currentFragment.moofOffset, (x) => x.moofOffset);
              assert(fragmentIndex2 !== -1);
              return {
                fragmentIndex: fragmentIndex2,
                sampleIndex: 0,
                correctSampleFound: true
              };
            }
          }
          return {
            fragmentIndex,
            sampleIndex: -1,
            correctSampleFound: false
          };
        }
      },
      -Infinity,
      // Use -Infinity as a search timestamp to avoid using the lookup entries
      Infinity,
      options
    );
  }
  async getKeyPacket(timestamp, options) {
    const timestampInTimescale = this.mapTimestampIntoTimescale(timestamp);
    const sampleTable = this.internalTrack.demuxer.getSampleTableForTrack(this.internalTrack);
    const sampleIndex = getSampleIndexForTimestamp(sampleTable, timestampInTimescale);
    const keyFrameSampleIndex = sampleIndex === -1 ? -1 : getRelevantKeyframeIndexForSample(sampleTable, sampleIndex);
    const regularPacket = await this.fetchPacketForSampleIndex(keyFrameSampleIndex, options);
    if (!sampleTableIsEmpty(sampleTable) || !this.internalTrack.demuxer.isFragmented) {
      return regularPacket;
    }
    return this.performFragmentedLookup(() => this.findKeySampleInFragmentsForTimestamp(timestampInTimescale), timestampInTimescale, timestampInTimescale, options);
  }
  async getNextKeyPacket(packet, options) {
    const regularSampleIndex = this.packetToSampleIndex.get(packet);
    if (regularSampleIndex !== void 0) {
      const sampleTable = this.internalTrack.demuxer.getSampleTableForTrack(this.internalTrack);
      const nextKeyFrameSampleIndex = getNextKeyframeIndexForSample(sampleTable, regularSampleIndex);
      return this.fetchPacketForSampleIndex(nextKeyFrameSampleIndex, options);
    }
    const locationInFragment = this.packetToFragmentLocation.get(packet);
    if (locationInFragment === void 0) {
      throw new Error("Packet was not created from this track.");
    }
    const trackData = locationInFragment.fragment.trackData.get(this.internalTrack.id);
    const fragmentIndex = binarySearchExact(this.internalTrack.fragments, locationInFragment.fragment.moofOffset, (x) => x.moofOffset);
    assert(fragmentIndex !== -1);
    return this.performFragmentedLookup(
      () => {
        const nextKeyFrameIndex = trackData.samples.findIndex((x, i) => x.isKeyFrame && i > locationInFragment.sampleIndex);
        if (nextKeyFrameIndex !== -1) {
          return {
            fragmentIndex,
            sampleIndex: nextKeyFrameIndex,
            correctSampleFound: true
          };
        } else {
          let currentFragment = locationInFragment.fragment;
          while (currentFragment.nextFragment) {
            currentFragment = currentFragment.nextFragment;
            const trackData2 = currentFragment.trackData.get(this.internalTrack.id);
            if (trackData2 && trackData2.firstKeyFrameTimestamp !== null) {
              const fragmentIndex2 = binarySearchExact(this.internalTrack.fragments, currentFragment.moofOffset, (x) => x.moofOffset);
              assert(fragmentIndex2 !== -1);
              const keyFrameIndex = trackData2.samples.findIndex((x) => x.isKeyFrame);
              assert(keyFrameIndex !== -1);
              return {
                fragmentIndex: fragmentIndex2,
                sampleIndex: keyFrameIndex,
                correctSampleFound: true
              };
            }
          }
          return {
            fragmentIndex,
            sampleIndex: -1,
            correctSampleFound: false
          };
        }
      },
      -Infinity,
      // Use -Infinity as a search timestamp to avoid using the lookup entries
      Infinity,
      options
    );
  }
  async fetchPacketForSampleIndex(sampleIndex, options) {
    if (sampleIndex === -1) {
      return null;
    }
    const sampleTable = this.internalTrack.demuxer.getSampleTableForTrack(this.internalTrack);
    const sampleInfo = getSampleInfo(sampleTable, sampleIndex);
    if (!sampleInfo) {
      return null;
    }
    let data;
    if (options.metadataOnly) {
      data = PLACEHOLDER_DATA;
    } else {
      await this.internalTrack.demuxer.chunkReader.reader.loadRange(sampleInfo.chunkOffset, sampleInfo.chunkOffset + sampleInfo.chunkSize);
      this.internalTrack.demuxer.chunkReader.pos = sampleInfo.sampleOffset;
      data = this.internalTrack.demuxer.chunkReader.readBytes(sampleInfo.sampleSize);
    }
    const timestamp = (sampleInfo.presentationTimestamp - this.internalTrack.editListOffset) / this.internalTrack.timescale;
    const duration = sampleInfo.duration / this.internalTrack.timescale;
    const packet = new EncodedPacket(data, sampleInfo.isKeyFrame ? "key" : "delta", timestamp, duration, sampleIndex, sampleInfo.sampleSize);
    this.packetToSampleIndex.set(packet, sampleIndex);
    return packet;
  }
  async fetchPacketInFragment(fragment, sampleIndex, options) {
    if (sampleIndex === -1) {
      return null;
    }
    const trackData = fragment.trackData.get(this.internalTrack.id);
    const fragmentSample = trackData.samples[sampleIndex];
    assert(fragmentSample);
    let data;
    if (options.metadataOnly) {
      data = PLACEHOLDER_DATA;
    } else {
      await this.internalTrack.demuxer.chunkReader.reader.loadRange(fragment.dataStart, fragment.dataEnd);
      this.internalTrack.demuxer.chunkReader.pos = fragmentSample.byteOffset;
      data = this.internalTrack.demuxer.chunkReader.readBytes(fragmentSample.byteSize);
    }
    const timestamp = (fragmentSample.presentationTimestamp - this.internalTrack.editListOffset) / this.internalTrack.timescale;
    const duration = fragmentSample.duration / this.internalTrack.timescale;
    const packet = new EncodedPacket(data, fragmentSample.isKeyFrame ? "key" : "delta", timestamp, duration, fragment.moofOffset + sampleIndex, fragmentSample.byteSize);
    this.packetToFragmentLocation.set(packet, { fragment, sampleIndex });
    return packet;
  }
  findSampleInFragmentsForTimestamp(timestampInTimescale) {
    const fragmentIndex = binarySearchLessOrEqual(
      // This array is technically not sorted by start timestamp, but for any reasonable file, it basically is.
      this.internalTrack.fragments,
      timestampInTimescale,
      (x) => x.trackData.get(this.internalTrack.id).startTimestamp
    );
    let sampleIndex = -1;
    let correctSampleFound = false;
    if (fragmentIndex !== -1) {
      const fragment = this.internalTrack.fragments[fragmentIndex];
      const trackData = fragment.trackData.get(this.internalTrack.id);
      const index = binarySearchLessOrEqual(trackData.presentationTimestamps, timestampInTimescale, (x) => x.presentationTimestamp);
      assert(index !== -1);
      sampleIndex = trackData.presentationTimestamps[index].sampleIndex;
      correctSampleFound = timestampInTimescale < trackData.endTimestamp;
    }
    return { fragmentIndex, sampleIndex, correctSampleFound };
  }
  findKeySampleInFragmentsForTimestamp(timestampInTimescale) {
    const indexInKeyFrameFragments = binarySearchLessOrEqual(
      // This array is technically not sorted by start timestamp, but for any reasonable file, it basically is.
      this.internalTrack.fragmentsWithKeyFrame,
      timestampInTimescale,
      (x) => x.trackData.get(this.internalTrack.id).startTimestamp
    );
    let fragmentIndex = -1;
    let sampleIndex = -1;
    let correctSampleFound = false;
    if (indexInKeyFrameFragments !== -1) {
      const fragment = this.internalTrack.fragmentsWithKeyFrame[indexInKeyFrameFragments];
      fragmentIndex = binarySearchExact(this.internalTrack.fragments, fragment.moofOffset, (x) => x.moofOffset);
      assert(fragmentIndex !== -1);
      const trackData = fragment.trackData.get(this.internalTrack.id);
      const index = findLastIndex(trackData.presentationTimestamps, (x) => {
        const sample = trackData.samples[x.sampleIndex];
        return sample.isKeyFrame && x.presentationTimestamp <= timestampInTimescale;
      });
      assert(index !== -1);
      const entry = trackData.presentationTimestamps[index];
      sampleIndex = entry.sampleIndex;
      correctSampleFound = timestampInTimescale < trackData.endTimestamp;
    }
    return { fragmentIndex, sampleIndex, correctSampleFound };
  }
  /** Looks for a packet in the fragments while trying to load as few fragments as possible to retrieve it. */
  async performFragmentedLookup(getBestMatch, searchTimestamp, latestTimestamp, options) {
    const demuxer = this.internalTrack.demuxer;
    const release = await demuxer.fragmentLookupMutex.acquire();
    try {
      const { fragmentIndex, sampleIndex, correctSampleFound } = getBestMatch();
      if (correctSampleFound) {
        const fragment = this.internalTrack.fragments[fragmentIndex];
        return this.fetchPacketInFragment(fragment, sampleIndex, options);
      }
      const metadataReader = demuxer.metadataReader;
      const sourceSize = await metadataReader.reader.source.getSize();
      let prevFragment = null;
      let bestFragmentIndex = fragmentIndex;
      let bestSampleIndex = sampleIndex;
      const lookupEntryIndex = this.internalTrack.fragmentLookupTable ? binarySearchLessOrEqual(this.internalTrack.fragmentLookupTable, searchTimestamp, (x) => x.timestamp) : -1;
      const lookupEntry = lookupEntryIndex !== -1 ? this.internalTrack.fragmentLookupTable[lookupEntryIndex] : null;
      let nextFragmentIsFirstFragment = false;
      if (fragmentIndex === -1) {
        metadataReader.pos = lookupEntry?.moofOffset ?? 0;
        nextFragmentIsFirstFragment = metadataReader.pos === 0;
      } else {
        const fragment = this.internalTrack.fragments[fragmentIndex];
        if (!lookupEntry || fragment.moofOffset >= lookupEntry.moofOffset) {
          metadataReader.pos = fragment.moofOffset + fragment.moofSize;
          prevFragment = fragment;
        } else {
          metadataReader.pos = lookupEntry.moofOffset;
        }
      }
      while (metadataReader.pos < sourceSize) {
        if (prevFragment) {
          const trackData = prevFragment.trackData.get(this.internalTrack.id);
          if (trackData && trackData.startTimestamp > latestTimestamp) {
            break;
          }
          if (prevFragment.nextFragment) {
            metadataReader.pos = prevFragment.nextFragment.moofOffset + prevFragment.nextFragment.moofSize;
            prevFragment = prevFragment.nextFragment;
            continue;
          }
        }
        await metadataReader.reader.loadRange(metadataReader.pos, metadataReader.pos + MAX_BOX_HEADER_SIZE);
        const startPos = metadataReader.pos;
        const boxInfo = metadataReader.readBoxHeader();
        if (!boxInfo) {
          break;
        }
        if (boxInfo.name === "moof") {
          const index = binarySearchExact(demuxer.fragments, startPos, (x) => x.moofOffset);
          let fragment;
          if (index === -1) {
            metadataReader.pos = startPos;
            fragment = await demuxer.readFragment();
          } else {
            fragment = demuxer.fragments[index];
          }
          if (prevFragment)
            prevFragment.nextFragment = fragment;
          prevFragment = fragment;
          if (nextFragmentIsFirstFragment) {
            fragment.isKnownToBeFirstFragment = true;
            nextFragmentIsFirstFragment = false;
          }
          const { fragmentIndex: fragmentIndex2, sampleIndex: sampleIndex2, correctSampleFound: correctSampleFound2 } = getBestMatch();
          if (correctSampleFound2) {
            const fragment2 = this.internalTrack.fragments[fragmentIndex2];
            return this.fetchPacketInFragment(fragment2, sampleIndex2, options);
          }
          if (fragmentIndex2 !== -1) {
            bestFragmentIndex = fragmentIndex2;
            bestSampleIndex = sampleIndex2;
          }
        }
        metadataReader.pos = startPos + boxInfo.totalSize;
      }
      const bestFragment = bestFragmentIndex !== -1 ? this.internalTrack.fragments[bestFragmentIndex] : null;
      if (lookupEntry && (!bestFragment || bestFragment.moofOffset < lookupEntry.moofOffset)) {
        const previousLookupEntry = this.internalTrack.fragmentLookupTable[lookupEntryIndex - 1];
        const newSearchTimestamp = previousLookupEntry?.timestamp ?? -Infinity;
        return this.performFragmentedLookup(getBestMatch, newSearchTimestamp, latestTimestamp, options);
      }
      if (bestFragment) {
        return this.fetchPacketInFragment(bestFragment, bestSampleIndex, options);
      }
      return null;
    } finally {
      release();
    }
  }
};
var IsobmffVideoTrackBacking = class extends IsobmffTrackBacking {
  constructor(internalTrack) {
    super(internalTrack);
    this.decoderConfigPromise = null;
    this.internalTrack = internalTrack;
  }
  getCodec() {
    return this.internalTrack.info.codec;
  }
  getCodedWidth() {
    return this.internalTrack.info.width;
  }
  getCodedHeight() {
    return this.internalTrack.info.height;
  }
  getRotation() {
    return this.internalTrack.rotation;
  }
  async getColorSpace() {
    return {
      primaries: this.internalTrack.info.colorSpace?.primaries,
      transfer: this.internalTrack.info.colorSpace?.transfer,
      matrix: this.internalTrack.info.colorSpace?.matrix,
      fullRange: this.internalTrack.info.colorSpace?.fullRange
    };
  }
  async getDecoderConfig() {
    if (!this.internalTrack.info.codec) {
      return null;
    }
    return this.decoderConfigPromise ??= (async () => {
      if (this.internalTrack.info.codec === "vp9" && !this.internalTrack.info.vp9CodecInfo) {
        const firstPacket = await this.getFirstPacket({});
        this.internalTrack.info.vp9CodecInfo = firstPacket && extractVp9CodecInfoFromPacket(firstPacket.data);
      } else if (this.internalTrack.info.codec === "av1" && !this.internalTrack.info.av1CodecInfo) {
        const firstPacket = await this.getFirstPacket({});
        this.internalTrack.info.av1CodecInfo = firstPacket && extractAv1CodecInfoFromPacket(firstPacket.data);
      }
      return {
        codec: extractVideoCodecString(this.internalTrack.info),
        codedWidth: this.internalTrack.info.width,
        codedHeight: this.internalTrack.info.height,
        description: this.internalTrack.info.codecDescription ?? void 0,
        colorSpace: this.internalTrack.info.colorSpace ?? void 0
      };
    })();
  }
};
var IsobmffAudioTrackBacking = class extends IsobmffTrackBacking {
  constructor(internalTrack) {
    super(internalTrack);
    this.decoderConfig = null;
    this.internalTrack = internalTrack;
  }
  getCodec() {
    return this.internalTrack.info.codec;
  }
  getNumberOfChannels() {
    return this.internalTrack.info.numberOfChannels;
  }
  getSampleRate() {
    return this.internalTrack.info.sampleRate;
  }
  async getDecoderConfig() {
    if (!this.internalTrack.info.codec) {
      return null;
    }
    return this.decoderConfig ??= {
      codec: extractAudioCodecString(this.internalTrack.info),
      numberOfChannels: this.internalTrack.info.numberOfChannels,
      sampleRate: this.internalTrack.info.sampleRate,
      description: this.internalTrack.info.codecDescription ?? void 0
    };
  }
};
var getSampleIndexForTimestamp = (sampleTable, timescaleUnits) => {
  if (sampleTable.presentationTimestamps) {
    const index = binarySearchLessOrEqual(sampleTable.presentationTimestamps, timescaleUnits, (x) => x.presentationTimestamp);
    if (index === -1) {
      return -1;
    }
    return sampleTable.presentationTimestamps[index].sampleIndex;
  } else {
    const index = binarySearchLessOrEqual(sampleTable.sampleTimingEntries, timescaleUnits, (x) => x.startDecodeTimestamp);
    if (index === -1) {
      return -1;
    }
    const entry = sampleTable.sampleTimingEntries[index];
    return entry.startIndex + Math.min(Math.floor((timescaleUnits - entry.startDecodeTimestamp) / entry.delta), entry.count - 1);
  }
};
var getSampleInfo = (sampleTable, sampleIndex) => {
  const timingEntryIndex = binarySearchLessOrEqual(sampleTable.sampleTimingEntries, sampleIndex, (x) => x.startIndex);
  const timingEntry = sampleTable.sampleTimingEntries[timingEntryIndex];
  if (!timingEntry || timingEntry.startIndex + timingEntry.count <= sampleIndex) {
    return null;
  }
  const decodeTimestamp = timingEntry.startDecodeTimestamp + (sampleIndex - timingEntry.startIndex) * timingEntry.delta;
  let presentationTimestamp = decodeTimestamp;
  const offsetEntryIndex = binarySearchLessOrEqual(sampleTable.sampleCompositionTimeOffsets, sampleIndex, (x) => x.startIndex);
  const offsetEntry = sampleTable.sampleCompositionTimeOffsets[offsetEntryIndex];
  if (offsetEntry && sampleIndex - offsetEntry.startIndex < offsetEntry.count) {
    presentationTimestamp += offsetEntry.offset;
  }
  const sampleSize = sampleTable.sampleSizes[Math.min(sampleIndex, sampleTable.sampleSizes.length - 1)];
  const chunkEntryIndex = binarySearchLessOrEqual(sampleTable.sampleToChunk, sampleIndex, (x) => x.startSampleIndex);
  const chunkEntry = sampleTable.sampleToChunk[chunkEntryIndex];
  assert(chunkEntry);
  const chunkIndex = chunkEntry.startChunkIndex + Math.floor((sampleIndex - chunkEntry.startSampleIndex) / chunkEntry.samplesPerChunk);
  const chunkOffset = sampleTable.chunkOffsets[chunkIndex];
  const startSampleIndexOfChunk = chunkEntry.startSampleIndex + (chunkIndex - chunkEntry.startChunkIndex) * chunkEntry.samplesPerChunk;
  let chunkSize = 0;
  let sampleOffset = chunkOffset;
  if (sampleTable.sampleSizes.length === 1) {
    sampleOffset += sampleSize * (sampleIndex - startSampleIndexOfChunk);
    chunkSize += sampleSize * chunkEntry.samplesPerChunk;
  } else {
    for (let i = startSampleIndexOfChunk; i < startSampleIndexOfChunk + chunkEntry.samplesPerChunk; i++) {
      const sampleSize2 = sampleTable.sampleSizes[i];
      if (i < sampleIndex) {
        sampleOffset += sampleSize2;
      }
      chunkSize += sampleSize2;
    }
  }
  let duration = timingEntry.delta;
  if (sampleTable.presentationTimestamps) {
    const presentationIndex = sampleTable.presentationTimestampIndexMap[sampleIndex];
    assert(presentationIndex !== void 0);
    if (presentationIndex < sampleTable.presentationTimestamps.length - 1) {
      const nextEntry = sampleTable.presentationTimestamps[presentationIndex + 1];
      const nextPresentationTimestamp = nextEntry.presentationTimestamp;
      duration = nextPresentationTimestamp - presentationTimestamp;
    }
  }
  return {
    presentationTimestamp,
    duration,
    sampleOffset,
    sampleSize,
    chunkOffset,
    chunkSize,
    isKeyFrame: sampleTable.keySampleIndices ? binarySearchExact(sampleTable.keySampleIndices, sampleIndex, (x) => x) !== -1 : true
  };
};
var getRelevantKeyframeIndexForSample = (sampleTable, sampleIndex) => {
  if (!sampleTable.keySampleIndices) {
    return sampleIndex;
  }
  const index = binarySearchLessOrEqual(sampleTable.keySampleIndices, sampleIndex, (x) => x);
  return sampleTable.keySampleIndices[index] ?? -1;
};
var getNextKeyframeIndexForSample = (sampleTable, sampleIndex) => {
  if (!sampleTable.keySampleIndices) {
    return sampleIndex + 1;
  }
  const index = binarySearchLessOrEqual(sampleTable.keySampleIndices, sampleIndex, (x) => x);
  return sampleTable.keySampleIndices[index + 1] ?? -1;
};
var offsetFragmentTrackDataByTimestamp = (trackData, timestamp) => {
  trackData.startTimestamp += timestamp;
  trackData.endTimestamp += timestamp;
  for (const sample of trackData.samples) {
    sample.presentationTimestamp += timestamp;
  }
  for (const entry of trackData.presentationTimestamps) {
    entry.presentationTimestamp += timestamp;
  }
};
var extractRotationFromMatrix = (matrix) => {
  const [m11, , , m21] = matrix;
  const scaleX = Math.hypot(m11, m21);
  const cosTheta = m11 / scaleX;
  const sinTheta = m21 / scaleX;
  const result = -Math.atan2(sinTheta, cosTheta) * (180 / Math.PI);
  if (!Number.isFinite(result)) {
    return 0;
  }
  return result;
};
var sampleTableIsEmpty = (sampleTable) => {
  return sampleTable.sampleSizes.length === 0;
};

// node_modules/mediabunny/dist/modules/src/matroska/matroska-demuxer.js
var BlockLacing;
(function(BlockLacing2) {
  BlockLacing2[BlockLacing2["None"] = 0] = "None";
  BlockLacing2[BlockLacing2["Xiph"] = 1] = "Xiph";
  BlockLacing2[BlockLacing2["FixedSize"] = 2] = "FixedSize";
  BlockLacing2[BlockLacing2["Ebml"] = 3] = "Ebml";
})(BlockLacing || (BlockLacing = {}));
var METADATA_ELEMENTS = [
  { id: EBMLId.SeekHead, flag: "seekHeadSeen" },
  { id: EBMLId.Info, flag: "infoSeen" },
  { id: EBMLId.Tracks, flag: "tracksSeen" },
  { id: EBMLId.Cues, flag: "cuesSeen" }
];
var MAX_RESYNC_LENGTH = 10 * 2 ** 20;
var MatroskaDemuxer = class extends Demuxer {
  constructor(input) {
    super(input);
    this.readMetadataPromise = null;
    this.segments = [];
    this.currentSegment = null;
    this.currentTrack = null;
    this.currentCluster = null;
    this.currentBlock = null;
    this.currentCueTime = null;
    this.isWebM = false;
    this.metadataReader = new EBMLReader(input._mainReader);
    this.clusterReader = new EBMLReader(new Reader(input.source, 64 * 2 ** 20));
  }
  async computeDuration() {
    const tracks = await this.getTracks();
    const trackDurations = await Promise.all(tracks.map((x) => x.computeDuration()));
    return Math.max(0, ...trackDurations);
  }
  async getTracks() {
    await this.readMetadata();
    return this.segments.flatMap((segment) => segment.tracks.map((track) => track.inputTrack));
  }
  async getMimeType() {
    await this.readMetadata();
    const tracks = await this.getTracks();
    const codecStrings = await Promise.all(tracks.map((x) => x.getCodecParameterString()));
    return buildMatroskaMimeType({
      isWebM: this.isWebM,
      hasVideo: this.segments.some((segment) => segment.tracks.some((x) => x.info?.type === "video")),
      hasAudio: this.segments.some((segment) => segment.tracks.some((x) => x.info?.type === "audio")),
      codecStrings: codecStrings.filter(Boolean)
    });
  }
  readMetadata() {
    return this.readMetadataPromise ??= (async () => {
      this.metadataReader.pos = 0;
      const fileSize = await this.input.source.getSize();
      while (this.metadataReader.pos <= fileSize - MIN_HEADER_SIZE) {
        await this.metadataReader.reader.loadRange(this.metadataReader.pos, this.metadataReader.pos + MAX_HEADER_SIZE);
        const header = this.metadataReader.readElementHeader();
        if (!header) {
          break;
        }
        const id = header.id;
        let size = header.size;
        const startPos = this.metadataReader.pos;
        if (id === EBMLId.EBML) {
          assertDefinedSize(size);
          await this.metadataReader.reader.loadRange(this.metadataReader.pos, this.metadataReader.pos + size);
          this.readContiguousElements(this.metadataReader, size);
        } else if (id === EBMLId.Segment) {
          await this.readSegment(size);
          if (size === null) {
            break;
          }
        } else if (id === EBMLId.Cluster) {
          if (size === null) {
            const nextElementPos = await this.clusterReader.searchForNextElementId(LEVEL_0_AND_1_EBML_IDS, fileSize);
            size = (nextElementPos ?? fileSize) - startPos;
          }
          const lastSegment = last(this.segments);
          if (lastSegment) {
            lastSegment.elementEndPos = startPos + size;
          }
        }
        assertDefinedSize(size);
        this.metadataReader.pos = startPos + size;
      }
    })();
  }
  async readSegment(dataSize) {
    const segmentDataStart = this.metadataReader.pos;
    this.currentSegment = {
      seekHeadSeen: false,
      infoSeen: false,
      tracksSeen: false,
      cuesSeen: false,
      timestampScale: -1,
      timestampFactor: -1,
      duration: -1,
      seekEntries: [],
      tracks: [],
      cuePoints: [],
      dataStartPos: segmentDataStart,
      elementEndPos: dataSize === null ? await this.input.source.getSize() : segmentDataStart + dataSize,
      clusterSeekStartPos: segmentDataStart,
      clusters: [],
      clusterLookupMutex: new AsyncMutex()
    };
    this.segments.push(this.currentSegment);
    await this.metadataReader.reader.loadRange(this.metadataReader.pos, this.metadataReader.pos + 2 ** 14);
    let clusterEncountered = false;
    while (this.metadataReader.pos <= this.currentSegment.elementEndPos - MIN_HEADER_SIZE) {
      await this.metadataReader.reader.loadRange(this.metadataReader.pos, this.metadataReader.pos + MAX_HEADER_SIZE);
      const elementStartPos = this.metadataReader.pos;
      const header = this.metadataReader.readElementHeader();
      if (!header || !LEVEL_1_EBML_IDS.includes(header.id)) {
        this.metadataReader.pos = elementStartPos;
        const nextPos = await this.metadataReader.resync(LEVEL_1_EBML_IDS, Math.min(this.currentSegment.elementEndPos, this.metadataReader.pos + MAX_RESYNC_LENGTH));
        if (nextPos) {
          this.metadataReader.pos = nextPos;
          continue;
        } else {
          break;
        }
      }
      const { id, size } = header;
      const dataStartPos = this.metadataReader.pos;
      const metadataElementIndex = METADATA_ELEMENTS.findIndex((x) => x.id === id);
      if (metadataElementIndex !== -1) {
        const field = METADATA_ELEMENTS[metadataElementIndex].flag;
        this.currentSegment[field] = true;
        assertDefinedSize(size);
        await this.metadataReader.reader.loadRange(this.metadataReader.pos, this.metadataReader.pos + size);
        this.readContiguousElements(this.metadataReader, size);
      } else if (id === EBMLId.Cluster) {
        if (!clusterEncountered) {
          clusterEncountered = true;
          this.currentSegment.clusterSeekStartPos = elementStartPos;
        }
      }
      if (size !== null) {
        this.metadataReader.pos = dataStartPos + size;
      }
      if (this.currentSegment.infoSeen && this.currentSegment.tracksSeen && this.currentSegment.cuesSeen) {
        break;
      }
      if (this.currentSegment.seekHeadSeen) {
        let hasInfo = this.currentSegment.infoSeen;
        let hasTracks = this.currentSegment.tracksSeen;
        let hasCues = this.currentSegment.cuesSeen;
        for (const entry of this.currentSegment.seekEntries) {
          if (entry.id === EBMLId.Info) {
            hasInfo = true;
          } else if (entry.id === EBMLId.Tracks) {
            hasTracks = true;
          } else if (entry.id === EBMLId.Cues) {
            hasCues = true;
          }
        }
        if (hasInfo && hasTracks && hasCues) {
          break;
        }
      }
      if (size === null) {
        break;
      }
    }
    if (!clusterEncountered) {
      const seekEntry = this.currentSegment.seekEntries.find((entry) => entry.id === EBMLId.Cluster);
      if (seekEntry) {
        this.currentSegment.clusterSeekStartPos = segmentDataStart + seekEntry.segmentPosition;
      } else {
        this.currentSegment.clusterSeekStartPos = this.metadataReader.pos;
      }
    }
    for (const target of METADATA_ELEMENTS) {
      if (this.currentSegment[target.flag])
        continue;
      const seekEntry = this.currentSegment.seekEntries.find((entry) => entry.id === target.id);
      if (!seekEntry)
        continue;
      this.metadataReader.pos = segmentDataStart + seekEntry.segmentPosition;
      await this.metadataReader.reader.loadRange(this.metadataReader.pos, this.metadataReader.pos + 2 ** 12);
      const header = this.metadataReader.readElementHeader();
      if (!header)
        continue;
      const { id, size } = header;
      if (id !== target.id)
        continue;
      assertDefinedSize(size);
      this.currentSegment[target.flag] = true;
      await this.metadataReader.reader.loadRange(this.metadataReader.pos, this.metadataReader.pos + size);
      this.readContiguousElements(this.metadataReader, size);
    }
    if (this.currentSegment.timestampScale === -1) {
      this.currentSegment.timestampScale = 1e6;
      this.currentSegment.timestampFactor = 1e9 / 1e6;
    }
    this.currentSegment.tracks.sort((a, b) => Number(b.isDefault) - Number(a.isDefault));
    this.currentSegment.cuePoints.sort((a, b) => a.clusterPosition - b.clusterPosition);
    const allTrackIds = this.currentSegment.tracks.map((x) => x.id);
    const remainingTrackIds = /* @__PURE__ */ new Set();
    let lastClusterPosition = null;
    let lastCuePoint = null;
    for (const cuePoint of this.currentSegment.cuePoints) {
      if (cuePoint.clusterPosition !== lastClusterPosition) {
        for (const id of remainingTrackIds) {
          assert(lastCuePoint);
          const track2 = this.currentSegment.tracks.find((x) => x.id === id);
          track2.cuePoints.push(lastCuePoint);
        }
        for (const id of allTrackIds) {
          remainingTrackIds.add(id);
        }
      }
      lastCuePoint = cuePoint;
      if (!remainingTrackIds.has(cuePoint.trackId)) {
        continue;
      }
      const track = this.currentSegment.tracks.find((x) => x.id === cuePoint.trackId);
      track.cuePoints.push(cuePoint);
      remainingTrackIds.delete(cuePoint.trackId);
      lastClusterPosition = cuePoint.clusterPosition;
    }
    for (const id of remainingTrackIds) {
      assert(lastCuePoint);
      const track = this.currentSegment.tracks.find((x) => x.id === id);
      track.cuePoints.push(lastCuePoint);
    }
    for (const track of this.currentSegment.tracks) {
      track.cuePoints.sort((a, b) => a.time - b.time);
    }
    this.currentSegment = null;
  }
  async readCluster(segment) {
    await this.metadataReader.reader.loadRange(this.metadataReader.pos, this.metadataReader.pos + MAX_HEADER_SIZE);
    const elementStartPos = this.metadataReader.pos;
    const elementHeader = this.metadataReader.readElementHeader();
    assert(elementHeader);
    const id = elementHeader.id;
    let size = elementHeader.size;
    const dataStartPos = this.metadataReader.pos;
    if (size === null) {
      this.clusterReader.pos = dataStartPos;
      const nextElementPos = await this.clusterReader.searchForNextElementId(LEVEL_0_AND_1_EBML_IDS, segment.elementEndPos);
      size = (nextElementPos ?? segment.elementEndPos) - dataStartPos;
    }
    assert(id === EBMLId.Cluster);
    this.clusterReader.pos = dataStartPos;
    await this.clusterReader.reader.loadRange(this.clusterReader.pos, this.clusterReader.pos + size);
    const cluster = {
      elementStartPos,
      elementEndPos: dataStartPos + size,
      dataStartPos,
      timestamp: -1,
      trackData: /* @__PURE__ */ new Map(),
      nextCluster: null,
      isKnownToBeFirstCluster: false
    };
    this.currentCluster = cluster;
    this.readContiguousElements(this.clusterReader, size);
    for (const [trackId, trackData] of cluster.trackData) {
      const track = segment.tracks.find((x) => x.id === trackId) ?? null;
      assert(trackData.blocks.length > 0);
      let blockReferencesExist = false;
      let hasLacedBlocks = false;
      for (let i = 0; i < trackData.blocks.length; i++) {
        const block = trackData.blocks[i];
        block.timestamp += cluster.timestamp;
        blockReferencesExist ||= block.referencedTimestamps.length > 0;
        hasLacedBlocks ||= block.lacing !== BlockLacing.None;
      }
      if (blockReferencesExist) {
        trackData.blocks = sortBlocksByReferences(trackData.blocks);
      }
      trackData.presentationTimestamps = trackData.blocks.map((block, i) => ({ timestamp: block.timestamp, blockIndex: i })).sort((a, b) => a.timestamp - b.timestamp);
      for (let i = 0; i < trackData.presentationTimestamps.length; i++) {
        const currentEntry = trackData.presentationTimestamps[i];
        const currentBlock = trackData.blocks[currentEntry.blockIndex];
        if (trackData.firstKeyFrameTimestamp === null && currentBlock.isKeyFrame) {
          trackData.firstKeyFrameTimestamp = currentBlock.timestamp;
        }
        if (i < trackData.presentationTimestamps.length - 1) {
          const nextEntry = trackData.presentationTimestamps[i + 1];
          currentBlock.duration = nextEntry.timestamp - currentBlock.timestamp;
        } else if (currentBlock.duration === 0) {
          if (track?.defaultDuration != null) {
            if (currentBlock.lacing === BlockLacing.None) {
              currentBlock.duration = track.defaultDuration;
            } else {
            }
          }
        }
      }
      if (hasLacedBlocks) {
        this.expandLacedBlocks(trackData.blocks, track);
        trackData.presentationTimestamps = trackData.blocks.map((block, i) => ({ timestamp: block.timestamp, blockIndex: i })).sort((a, b) => a.timestamp - b.timestamp);
      }
      const firstBlock = trackData.blocks[trackData.presentationTimestamps[0].blockIndex];
      const lastBlock = trackData.blocks[last(trackData.presentationTimestamps).blockIndex];
      trackData.startTimestamp = firstBlock.timestamp;
      trackData.endTimestamp = lastBlock.timestamp + lastBlock.duration;
      if (track) {
        insertSorted(track.clusters, cluster, (x) => x.elementStartPos);
        const hasKeyFrame = trackData.firstKeyFrameTimestamp !== null;
        if (hasKeyFrame) {
          insertSorted(track.clustersWithKeyFrame, cluster, (x) => x.elementStartPos);
        }
      }
    }
    insertSorted(segment.clusters, cluster, (x) => x.elementStartPos);
    this.currentCluster = null;
    return cluster;
  }
  getTrackDataInCluster(cluster, trackNumber) {
    let trackData = cluster.trackData.get(trackNumber);
    if (!trackData) {
      trackData = {
        startTimestamp: 0,
        endTimestamp: 0,
        firstKeyFrameTimestamp: null,
        blocks: [],
        presentationTimestamps: []
      };
      cluster.trackData.set(trackNumber, trackData);
    }
    return trackData;
  }
  expandLacedBlocks(blocks, track) {
    for (let blockIndex = 0; blockIndex < blocks.length; blockIndex++) {
      const originalBlock = blocks[blockIndex];
      if (originalBlock.lacing === BlockLacing.None) {
        continue;
      }
      const data = originalBlock.data;
      let pos = 0;
      const frameSizes = [];
      const frameCount = data[pos] + 1;
      pos++;
      switch (originalBlock.lacing) {
        case BlockLacing.Xiph:
          {
            let totalUsedSize = 0;
            for (let i = 0; i < frameCount - 1; i++) {
              let frameSize = 0;
              while (pos < data.length) {
                const value = data[pos];
                frameSize += value;
                pos++;
                if (value < 255) {
                  frameSizes.push(frameSize);
                  totalUsedSize += frameSize;
                  break;
                }
              }
            }
            frameSizes.push(data.length - (pos + totalUsedSize));
          }
          ;
          break;
        case BlockLacing.FixedSize:
          {
            const totalDataSize = data.length - 1;
            const frameSize = Math.floor(totalDataSize / frameCount);
            for (let i = 0; i < frameCount; i++) {
              frameSizes.push(frameSize);
            }
          }
          ;
          break;
        case BlockLacing.Ebml:
          {
            const firstResult = readVarInt(data, pos);
            let currentSize = firstResult.value;
            frameSizes.push(currentSize);
            pos += firstResult.width;
            let totalUsedSize = currentSize;
            for (let i = 1; i < frameCount - 1; i++) {
              const diffResult = readVarInt(data, pos);
              const unsignedDiff = diffResult.value;
              const bias = (1 << diffResult.width * 7 - 1) - 1;
              const diff = unsignedDiff - bias;
              currentSize += diff;
              frameSizes.push(currentSize);
              pos += diffResult.width;
              totalUsedSize += currentSize;
            }
            frameSizes.push(data.length - (pos + totalUsedSize));
          }
          ;
          break;
        default:
          assert(false);
      }
      assert(frameSizes.length === frameCount);
      blocks.splice(blockIndex, 1);
      let dataOffset = pos;
      for (let i = 0; i < frameCount; i++) {
        const frameSize = frameSizes[i];
        const frameData = data.subarray(dataOffset, dataOffset + frameSize);
        const blockDuration = originalBlock.duration || frameCount * (track?.defaultDuration ?? 0);
        const frameTimestamp = originalBlock.timestamp + blockDuration * i / frameCount;
        const frameDuration = blockDuration / frameCount;
        blocks.splice(blockIndex + i, 0, {
          timestamp: frameTimestamp,
          duration: frameDuration,
          isKeyFrame: originalBlock.isKeyFrame,
          referencedTimestamps: originalBlock.referencedTimestamps,
          data: frameData,
          lacing: BlockLacing.None
        });
        dataOffset += frameSize;
      }
      blockIndex += frameCount;
      blockIndex--;
    }
  }
  readContiguousElements(reader, totalSize) {
    const startIndex = reader.pos;
    while (reader.pos - startIndex <= totalSize - MIN_HEADER_SIZE) {
      const foundElement = this.traverseElement(reader);
      if (!foundElement) {
        break;
      }
    }
  }
  traverseElement(reader) {
    const header = reader.readElementHeader();
    if (!header) {
      return false;
    }
    const { id, size } = header;
    const dataStartPos = reader.pos;
    assertDefinedSize(size);
    switch (id) {
      case EBMLId.DocType:
        {
          this.isWebM = reader.readAsciiString(size) === "webm";
        }
        ;
        break;
      case EBMLId.Seek:
        {
          if (!this.currentSegment)
            break;
          const seekEntry = { id: -1, segmentPosition: -1 };
          this.currentSegment.seekEntries.push(seekEntry);
          this.readContiguousElements(reader, size);
          if (seekEntry.id === -1 || seekEntry.segmentPosition === -1) {
            this.currentSegment.seekEntries.pop();
          }
        }
        ;
        break;
      case EBMLId.SeekID:
        {
          const lastSeekEntry = this.currentSegment?.seekEntries[this.currentSegment.seekEntries.length - 1];
          if (!lastSeekEntry)
            break;
          lastSeekEntry.id = reader.readUnsignedInt(size);
        }
        ;
        break;
      case EBMLId.SeekPosition:
        {
          const lastSeekEntry = this.currentSegment?.seekEntries[this.currentSegment.seekEntries.length - 1];
          if (!lastSeekEntry)
            break;
          lastSeekEntry.segmentPosition = reader.readUnsignedInt(size);
        }
        ;
        break;
      case EBMLId.TimestampScale:
        {
          if (!this.currentSegment)
            break;
          this.currentSegment.timestampScale = reader.readUnsignedInt(size);
          this.currentSegment.timestampFactor = 1e9 / this.currentSegment.timestampScale;
        }
        ;
        break;
      case EBMLId.Duration:
        {
          if (!this.currentSegment)
            break;
          this.currentSegment.duration = reader.readFloat(size);
        }
        ;
        break;
      case EBMLId.TrackEntry:
        {
          if (!this.currentSegment)
            break;
          this.currentTrack = {
            id: -1,
            segment: this.currentSegment,
            demuxer: this,
            clusters: [],
            clustersWithKeyFrame: [],
            cuePoints: [],
            isDefault: false,
            inputTrack: null,
            codecId: null,
            codecPrivate: null,
            defaultDuration: null,
            name: null,
            languageCode: UNDETERMINED_LANGUAGE,
            info: null
          };
          this.readContiguousElements(reader, size);
          if (this.currentTrack && this.currentTrack.id !== -1 && this.currentTrack.codecId && this.currentTrack.info) {
            const slashIndex = this.currentTrack.codecId.indexOf("/");
            const codecIdWithoutSuffix = slashIndex === -1 ? this.currentTrack.codecId : this.currentTrack.codecId.slice(0, slashIndex);
            if (this.currentTrack.info.type === "video" && this.currentTrack.info.width !== -1 && this.currentTrack.info.height !== -1) {
              if (this.currentTrack.codecId === CODEC_STRING_MAP.avc) {
                this.currentTrack.info.codec = "avc";
                this.currentTrack.info.codecDescription = this.currentTrack.codecPrivate;
              } else if (this.currentTrack.codecId === CODEC_STRING_MAP.hevc) {
                this.currentTrack.info.codec = "hevc";
                this.currentTrack.info.codecDescription = this.currentTrack.codecPrivate;
              } else if (codecIdWithoutSuffix === CODEC_STRING_MAP.vp8) {
                this.currentTrack.info.codec = "vp8";
              } else if (codecIdWithoutSuffix === CODEC_STRING_MAP.vp9) {
                this.currentTrack.info.codec = "vp9";
              } else if (codecIdWithoutSuffix === CODEC_STRING_MAP.av1) {
                this.currentTrack.info.codec = "av1";
              }
              const videoTrack = this.currentTrack;
              const inputTrack = new InputVideoTrack(new MatroskaVideoTrackBacking(videoTrack));
              this.currentTrack.inputTrack = inputTrack;
              this.currentSegment.tracks.push(this.currentTrack);
            } else if (this.currentTrack.info.type === "audio" && this.currentTrack.info.numberOfChannels !== -1 && this.currentTrack.info.sampleRate !== -1) {
              if (codecIdWithoutSuffix === CODEC_STRING_MAP.aac) {
                this.currentTrack.info.codec = "aac";
                this.currentTrack.info.aacCodecInfo = {
                  isMpeg2: this.currentTrack.codecId.includes("MPEG2")
                };
                this.currentTrack.info.codecDescription = this.currentTrack.codecPrivate;
              } else if (this.currentTrack.codecId === CODEC_STRING_MAP.mp3) {
                this.currentTrack.info.codec = "mp3";
              } else if (codecIdWithoutSuffix === CODEC_STRING_MAP.opus) {
                this.currentTrack.info.codec = "opus";
                this.currentTrack.info.codecDescription = this.currentTrack.codecPrivate;
              } else if (codecIdWithoutSuffix === CODEC_STRING_MAP.vorbis) {
                this.currentTrack.info.codec = "vorbis";
                this.currentTrack.info.codecDescription = this.currentTrack.codecPrivate;
              } else if (codecIdWithoutSuffix === CODEC_STRING_MAP.flac) {
                this.currentTrack.info.codec = "flac";
                this.currentTrack.info.codecDescription = this.currentTrack.codecPrivate;
              } else if (this.currentTrack.codecId === "A_PCM/INT/LIT") {
                if (this.currentTrack.info.bitDepth === 8) {
                  this.currentTrack.info.codec = "pcm-u8";
                } else if (this.currentTrack.info.bitDepth === 16) {
                  this.currentTrack.info.codec = "pcm-s16";
                } else if (this.currentTrack.info.bitDepth === 24) {
                  this.currentTrack.info.codec = "pcm-s24";
                } else if (this.currentTrack.info.bitDepth === 32) {
                  this.currentTrack.info.codec = "pcm-s32";
                }
              } else if (this.currentTrack.codecId === "A_PCM/INT/BIG") {
                if (this.currentTrack.info.bitDepth === 8) {
                  this.currentTrack.info.codec = "pcm-u8";
                } else if (this.currentTrack.info.bitDepth === 16) {
                  this.currentTrack.info.codec = "pcm-s16be";
                } else if (this.currentTrack.info.bitDepth === 24) {
                  this.currentTrack.info.codec = "pcm-s24be";
                } else if (this.currentTrack.info.bitDepth === 32) {
                  this.currentTrack.info.codec = "pcm-s32be";
                }
              } else if (this.currentTrack.codecId === "A_PCM/FLOAT/IEEE") {
                if (this.currentTrack.info.bitDepth === 32) {
                  this.currentTrack.info.codec = "pcm-f32";
                } else if (this.currentTrack.info.bitDepth === 64) {
                  this.currentTrack.info.codec = "pcm-f64";
                }
              }
              const audioTrack = this.currentTrack;
              const inputTrack = new InputAudioTrack(new MatroskaAudioTrackBacking(audioTrack));
              this.currentTrack.inputTrack = inputTrack;
              this.currentSegment.tracks.push(this.currentTrack);
            }
          }
          this.currentTrack = null;
        }
        ;
        break;
      case EBMLId.TrackNumber:
        {
          if (!this.currentTrack)
            break;
          this.currentTrack.id = reader.readUnsignedInt(size);
        }
        ;
        break;
      case EBMLId.TrackType:
        {
          if (!this.currentTrack)
            break;
          const type = reader.readUnsignedInt(size);
          if (type === 1) {
            this.currentTrack.info = {
              type: "video",
              width: -1,
              height: -1,
              rotation: 0,
              codec: null,
              codecDescription: null,
              colorSpace: null
            };
          } else if (type === 2) {
            this.currentTrack.info = {
              type: "audio",
              numberOfChannels: -1,
              sampleRate: -1,
              bitDepth: -1,
              codec: null,
              codecDescription: null,
              aacCodecInfo: null
            };
          }
        }
        ;
        break;
      case EBMLId.FlagEnabled:
        {
          if (!this.currentTrack)
            break;
          const enabled = reader.readUnsignedInt(size);
          if (!enabled) {
            this.currentSegment.tracks.pop();
            this.currentTrack = null;
          }
        }
        ;
        break;
      case EBMLId.FlagDefault:
        {
          if (!this.currentTrack)
            break;
          this.currentTrack.isDefault = !!reader.readUnsignedInt(size);
        }
        ;
        break;
      case EBMLId.CodecID:
        {
          if (!this.currentTrack)
            break;
          this.currentTrack.codecId = reader.readAsciiString(size);
        }
        ;
        break;
      case EBMLId.CodecPrivate:
        {
          if (!this.currentTrack)
            break;
          this.currentTrack.codecPrivate = reader.readBytes(size);
        }
        ;
        break;
      case EBMLId.DefaultDuration:
        {
          if (!this.currentTrack)
            break;
          this.currentTrack.defaultDuration = this.currentTrack.segment.timestampFactor * reader.readUnsignedInt(size) / 1e9;
        }
        ;
        break;
      case EBMLId.Name:
        {
          if (!this.currentTrack)
            break;
          this.currentTrack.name = reader.readUnicodeString(size);
        }
        ;
        break;
      case EBMLId.Language:
        {
          if (!this.currentTrack)
            break;
          if (this.currentTrack.languageCode !== UNDETERMINED_LANGUAGE) {
            break;
          }
          this.currentTrack.languageCode = reader.readAsciiString(size);
          if (!isIso639Dash2LanguageCode(this.currentTrack.languageCode)) {
            this.currentTrack.languageCode = UNDETERMINED_LANGUAGE;
          }
        }
        ;
        break;
      case EBMLId.LanguageBCP47:
        {
          if (!this.currentTrack)
            break;
          const bcp47 = reader.readAsciiString(size);
          const languageSubtag = bcp47.split("-")[0];
          if (languageSubtag) {
            this.currentTrack.languageCode = languageSubtag;
          } else {
            this.currentTrack.languageCode = UNDETERMINED_LANGUAGE;
          }
        }
        ;
        break;
      case EBMLId.Video:
        {
          if (this.currentTrack?.info?.type !== "video")
            break;
          this.readContiguousElements(reader, size);
        }
        ;
        break;
      case EBMLId.PixelWidth:
        {
          if (this.currentTrack?.info?.type !== "video")
            break;
          this.currentTrack.info.width = reader.readUnsignedInt(size);
        }
        ;
        break;
      case EBMLId.PixelHeight:
        {
          if (this.currentTrack?.info?.type !== "video")
            break;
          this.currentTrack.info.height = reader.readUnsignedInt(size);
        }
        ;
        break;
      case EBMLId.Colour:
        {
          if (this.currentTrack?.info?.type !== "video")
            break;
          this.currentTrack.info.colorSpace = {};
          this.readContiguousElements(reader, size);
        }
        ;
        break;
      case EBMLId.MatrixCoefficients:
        {
          if (this.currentTrack?.info?.type !== "video" || !this.currentTrack.info.colorSpace)
            break;
          const matrixCoefficients = reader.readUnsignedInt(size);
          const mapped = MATRIX_COEFFICIENTS_MAP_INVERSE[matrixCoefficients] ?? null;
          this.currentTrack.info.colorSpace.matrix = mapped;
        }
        ;
        break;
      case EBMLId.Range:
        {
          if (this.currentTrack?.info?.type !== "video" || !this.currentTrack.info.colorSpace)
            break;
          this.currentTrack.info.colorSpace.fullRange = reader.readUnsignedInt(size) === 2;
        }
        ;
        break;
      case EBMLId.TransferCharacteristics:
        {
          if (this.currentTrack?.info?.type !== "video" || !this.currentTrack.info.colorSpace)
            break;
          const transferCharacteristics = reader.readUnsignedInt(size);
          const mapped = TRANSFER_CHARACTERISTICS_MAP_INVERSE[transferCharacteristics] ?? null;
          this.currentTrack.info.colorSpace.transfer = mapped;
        }
        ;
        break;
      case EBMLId.Primaries:
        {
          if (this.currentTrack?.info?.type !== "video" || !this.currentTrack.info.colorSpace)
            break;
          const primaries = reader.readUnsignedInt(size);
          const mapped = COLOR_PRIMARIES_MAP_INVERSE[primaries] ?? null;
          this.currentTrack.info.colorSpace.primaries = mapped;
        }
        ;
        break;
      case EBMLId.Projection:
        {
          if (this.currentTrack?.info?.type !== "video")
            break;
          this.readContiguousElements(reader, size);
        }
        ;
        break;
      case EBMLId.ProjectionPoseRoll:
        {
          if (this.currentTrack?.info?.type !== "video")
            break;
          const rotation = reader.readFloat(size);
          const flippedRotation = -rotation;
          try {
            this.currentTrack.info.rotation = normalizeRotation(flippedRotation);
          } catch {
          }
        }
        ;
        break;
      case EBMLId.Audio:
        {
          if (this.currentTrack?.info?.type !== "audio")
            break;
          this.readContiguousElements(reader, size);
        }
        ;
        break;
      case EBMLId.SamplingFrequency:
        {
          if (this.currentTrack?.info?.type !== "audio")
            break;
          this.currentTrack.info.sampleRate = reader.readFloat(size);
        }
        ;
        break;
      case EBMLId.Channels:
        {
          if (this.currentTrack?.info?.type !== "audio")
            break;
          this.currentTrack.info.numberOfChannels = reader.readUnsignedInt(size);
        }
        ;
        break;
      case EBMLId.BitDepth:
        {
          if (this.currentTrack?.info?.type !== "audio")
            break;
          this.currentTrack.info.bitDepth = reader.readUnsignedInt(size);
        }
        ;
        break;
      case EBMLId.CuePoint:
        {
          if (!this.currentSegment)
            break;
          this.readContiguousElements(reader, size);
          this.currentCueTime = null;
        }
        ;
        break;
      case EBMLId.CueTime:
        {
          this.currentCueTime = reader.readUnsignedInt(size);
        }
        ;
        break;
      case EBMLId.CueTrackPositions:
        {
          if (this.currentCueTime === null)
            break;
          assert(this.currentSegment);
          const cuePoint = { time: this.currentCueTime, trackId: -1, clusterPosition: -1 };
          this.currentSegment.cuePoints.push(cuePoint);
          this.readContiguousElements(reader, size);
          if (cuePoint.trackId === -1 || cuePoint.clusterPosition === -1) {
            this.currentSegment.cuePoints.pop();
          }
        }
        ;
        break;
      case EBMLId.CueTrack:
        {
          const lastCuePoint = this.currentSegment?.cuePoints[this.currentSegment.cuePoints.length - 1];
          if (!lastCuePoint)
            break;
          lastCuePoint.trackId = reader.readUnsignedInt(size);
        }
        ;
        break;
      case EBMLId.CueClusterPosition:
        {
          const lastCuePoint = this.currentSegment?.cuePoints[this.currentSegment.cuePoints.length - 1];
          if (!lastCuePoint)
            break;
          assert(this.currentSegment);
          lastCuePoint.clusterPosition = this.currentSegment.dataStartPos + reader.readUnsignedInt(size);
        }
        ;
        break;
      case EBMLId.Timestamp:
        {
          if (!this.currentCluster)
            break;
          this.currentCluster.timestamp = reader.readUnsignedInt(size);
        }
        ;
        break;
      case EBMLId.SimpleBlock:
        {
          if (!this.currentCluster)
            break;
          const trackNumber = reader.readVarInt();
          if (trackNumber === null)
            break;
          const relativeTimestamp = reader.readS16();
          const flags = reader.readU8();
          const isKeyFrame = !!(flags & 128);
          const lacing = flags >> 1 & 3;
          const trackData = this.getTrackDataInCluster(this.currentCluster, trackNumber);
          trackData.blocks.push({
            timestamp: relativeTimestamp,
            // We'll add the cluster's timestamp to this later
            duration: 0,
            // Will set later
            isKeyFrame,
            referencedTimestamps: [],
            data: reader.readBytes(size - (reader.pos - dataStartPos)),
            lacing
          });
        }
        ;
        break;
      case EBMLId.BlockGroup:
        {
          if (!this.currentCluster)
            break;
          this.readContiguousElements(reader, size);
          if (this.currentBlock) {
            for (let i = 0; i < this.currentBlock.referencedTimestamps.length; i++) {
              this.currentBlock.referencedTimestamps[i] += this.currentBlock.timestamp;
            }
            this.currentBlock = null;
          }
        }
        ;
        break;
      case EBMLId.Block:
        {
          if (!this.currentCluster)
            break;
          const trackNumber = reader.readVarInt();
          if (trackNumber === null)
            break;
          const relativeTimestamp = reader.readS16();
          const flags = reader.readU8();
          const lacing = flags >> 1 & 3;
          const trackData = this.getTrackDataInCluster(this.currentCluster, trackNumber);
          this.currentBlock = {
            timestamp: relativeTimestamp,
            // We'll add the cluster's timestamp to this later
            duration: 0,
            // Will set later
            isKeyFrame: true,
            referencedTimestamps: [],
            data: reader.readBytes(size - (reader.pos - dataStartPos)),
            lacing
          };
          trackData.blocks.push(this.currentBlock);
        }
        ;
        break;
      case EBMLId.BlockDuration:
        {
          if (!this.currentBlock)
            break;
          this.currentBlock.duration = reader.readUnsignedInt(size);
        }
        ;
        break;
      case EBMLId.ReferenceBlock:
        {
          if (!this.currentBlock)
            break;
          this.currentBlock.isKeyFrame = false;
          const relativeTimestamp = reader.readSignedInt(size);
          this.currentBlock.referencedTimestamps.push(relativeTimestamp);
        }
        ;
        break;
    }
    reader.pos = dataStartPos + size;
    return true;
  }
};
var MatroskaTrackBacking = class {
  constructor(internalTrack) {
    this.internalTrack = internalTrack;
    this.packetToClusterLocation = /* @__PURE__ */ new WeakMap();
  }
  getId() {
    return this.internalTrack.id;
  }
  getCodec() {
    throw new Error("Not implemented on base class.");
  }
  getInternalCodecId() {
    return this.internalTrack.codecId;
  }
  async computeDuration() {
    const lastPacket = await this.getPacket(Infinity, { metadataOnly: true });
    return (lastPacket?.timestamp ?? 0) + (lastPacket?.duration ?? 0);
  }
  getName() {
    return this.internalTrack.name;
  }
  getLanguageCode() {
    return this.internalTrack.languageCode;
  }
  async getFirstTimestamp() {
    const firstPacket = await this.getFirstPacket({ metadataOnly: true });
    return firstPacket?.timestamp ?? 0;
  }
  getTimeResolution() {
    return this.internalTrack.segment.timestampFactor;
  }
  async getFirstPacket(options) {
    return this.performClusterLookup(
      () => {
        const startCluster = this.internalTrack.segment.clusters[0] ?? null;
        if (startCluster?.isKnownToBeFirstCluster) {
          let currentCluster = startCluster;
          while (currentCluster) {
            const trackData = currentCluster.trackData.get(this.internalTrack.id);
            if (trackData) {
              return {
                clusterIndex: binarySearchExact(this.internalTrack.clusters, currentCluster.elementStartPos, (x) => x.elementStartPos),
                blockIndex: 0,
                correctBlockFound: true
              };
            }
            currentCluster = currentCluster.nextCluster;
          }
        }
        return {
          clusterIndex: -1,
          blockIndex: -1,
          correctBlockFound: false
        };
      },
      -Infinity,
      // Use -Infinity as a search timestamp to avoid using the cues
      Infinity,
      options
    );
  }
  intoTimescale(timestamp) {
    return roundToPrecision(timestamp * this.internalTrack.segment.timestampFactor, 14);
  }
  async getPacket(timestamp, options) {
    const timestampInTimescale = this.intoTimescale(timestamp);
    return this.performClusterLookup(() => this.findBlockInClustersForTimestamp(timestampInTimescale), timestampInTimescale, timestampInTimescale, options);
  }
  async getNextPacket(packet, options) {
    const locationInCluster = this.packetToClusterLocation.get(packet);
    if (locationInCluster === void 0) {
      throw new Error("Packet was not created from this track.");
    }
    const trackData = locationInCluster.cluster.trackData.get(this.internalTrack.id);
    const clusterIndex = binarySearchExact(this.internalTrack.clusters, locationInCluster.cluster.elementStartPos, (x) => x.elementStartPos);
    assert(clusterIndex !== -1);
    return this.performClusterLookup(
      () => {
        if (locationInCluster.blockIndex + 1 < trackData.blocks.length) {
          return {
            clusterIndex,
            blockIndex: locationInCluster.blockIndex + 1,
            correctBlockFound: true
          };
        } else {
          let currentCluster = locationInCluster.cluster;
          while (currentCluster.nextCluster) {
            currentCluster = currentCluster.nextCluster;
            const trackData2 = currentCluster.trackData.get(this.internalTrack.id);
            if (trackData2) {
              const clusterIndex2 = binarySearchExact(this.internalTrack.clusters, currentCluster.elementStartPos, (x) => x.elementStartPos);
              assert(clusterIndex2 !== -1);
              return {
                clusterIndex: clusterIndex2,
                blockIndex: 0,
                correctBlockFound: true
              };
            }
          }
          return {
            clusterIndex,
            blockIndex: -1,
            correctBlockFound: false
          };
        }
      },
      -Infinity,
      // Use -Infinity as a search timestamp to avoid using the cues
      Infinity,
      options
    );
  }
  async getKeyPacket(timestamp, options) {
    const timestampInTimescale = this.intoTimescale(timestamp);
    return this.performClusterLookup(() => this.findKeyBlockInClustersForTimestamp(timestampInTimescale), timestampInTimescale, timestampInTimescale, options);
  }
  async getNextKeyPacket(packet, options) {
    const locationInCluster = this.packetToClusterLocation.get(packet);
    if (locationInCluster === void 0) {
      throw new Error("Packet was not created from this track.");
    }
    const trackData = locationInCluster.cluster.trackData.get(this.internalTrack.id);
    const clusterIndex = binarySearchExact(this.internalTrack.clusters, locationInCluster.cluster.elementStartPos, (x) => x.elementStartPos);
    assert(clusterIndex !== -1);
    return this.performClusterLookup(
      () => {
        const nextKeyFrameIndex = trackData.blocks.findIndex((x, i) => x.isKeyFrame && i > locationInCluster.blockIndex);
        if (nextKeyFrameIndex !== -1) {
          return {
            clusterIndex,
            blockIndex: nextKeyFrameIndex,
            correctBlockFound: true
          };
        } else {
          let currentCluster = locationInCluster.cluster;
          while (currentCluster.nextCluster) {
            currentCluster = currentCluster.nextCluster;
            const trackData2 = currentCluster.trackData.get(this.internalTrack.id);
            if (trackData2 && trackData2.firstKeyFrameTimestamp !== null) {
              const clusterIndex2 = binarySearchExact(this.internalTrack.clusters, currentCluster.elementStartPos, (x) => x.elementStartPos);
              assert(clusterIndex2 !== -1);
              const keyFrameIndex = trackData2.blocks.findIndex((x) => x.isKeyFrame);
              assert(keyFrameIndex !== -1);
              return {
                clusterIndex: clusterIndex2,
                blockIndex: keyFrameIndex,
                correctBlockFound: true
              };
            }
          }
          return {
            clusterIndex,
            blockIndex: -1,
            correctBlockFound: false
          };
        }
      },
      -Infinity,
      // Use -Infinity as a search timestamp to avoid using the cues
      Infinity,
      options
    );
  }
  async fetchPacketInCluster(cluster, blockIndex, options) {
    if (blockIndex === -1) {
      return null;
    }
    const trackData = cluster.trackData.get(this.internalTrack.id);
    const block = trackData.blocks[blockIndex];
    assert(block);
    const data = options.metadataOnly ? PLACEHOLDER_DATA : block.data;
    const timestamp = block.timestamp / this.internalTrack.segment.timestampFactor;
    const duration = block.duration / this.internalTrack.segment.timestampFactor;
    const packet = new EncodedPacket(data, block.isKeyFrame ? "key" : "delta", timestamp, duration, cluster.dataStartPos + blockIndex, block.data.byteLength);
    this.packetToClusterLocation.set(packet, { cluster, blockIndex });
    return packet;
  }
  findBlockInClustersForTimestamp(timestampInTimescale) {
    const clusterIndex = binarySearchLessOrEqual(
      // This array is technically not sorted by start timestamp, but for any reasonable file, it basically is.
      this.internalTrack.clusters,
      timestampInTimescale,
      (x) => x.trackData.get(this.internalTrack.id).startTimestamp
    );
    let blockIndex = -1;
    let correctBlockFound = false;
    if (clusterIndex !== -1) {
      const cluster = this.internalTrack.clusters[clusterIndex];
      const trackData = cluster.trackData.get(this.internalTrack.id);
      const index = binarySearchLessOrEqual(trackData.presentationTimestamps, timestampInTimescale, (x) => x.timestamp);
      assert(index !== -1);
      blockIndex = trackData.presentationTimestamps[index].blockIndex;
      correctBlockFound = timestampInTimescale < trackData.endTimestamp;
    }
    return { clusterIndex, blockIndex, correctBlockFound };
  }
  findKeyBlockInClustersForTimestamp(timestampInTimescale) {
    const indexInKeyFrameClusters = binarySearchLessOrEqual(
      // This array is technically not sorted by start timestamp, but for any reasonable file, it basically is.
      this.internalTrack.clustersWithKeyFrame,
      timestampInTimescale,
      (x) => x.trackData.get(this.internalTrack.id).firstKeyFrameTimestamp
    );
    let clusterIndex = -1;
    let blockIndex = -1;
    let correctBlockFound = false;
    if (indexInKeyFrameClusters !== -1) {
      const cluster = this.internalTrack.clustersWithKeyFrame[indexInKeyFrameClusters];
      clusterIndex = binarySearchExact(this.internalTrack.clusters, cluster.elementStartPos, (x) => x.elementStartPos);
      assert(clusterIndex !== -1);
      const trackData = cluster.trackData.get(this.internalTrack.id);
      const index = findLastIndex(trackData.presentationTimestamps, (x) => {
        const block = trackData.blocks[x.blockIndex];
        return block.isKeyFrame && x.timestamp <= timestampInTimescale;
      });
      assert(index !== -1);
      const entry = trackData.presentationTimestamps[index];
      blockIndex = entry.blockIndex;
      correctBlockFound = timestampInTimescale < trackData.endTimestamp;
    }
    return { clusterIndex, blockIndex, correctBlockFound };
  }
  /** Looks for a packet in the clusters while trying to load as few clusters as possible to retrieve it. */
  async performClusterLookup(getBestMatch, searchTimestamp, latestTimestamp, options) {
    const { demuxer, segment } = this.internalTrack;
    const release = await segment.clusterLookupMutex.acquire();
    try {
      const { clusterIndex, blockIndex, correctBlockFound } = getBestMatch();
      if (correctBlockFound) {
        const cluster = this.internalTrack.clusters[clusterIndex];
        return this.fetchPacketInCluster(cluster, blockIndex, options);
      }
      const metadataReader = demuxer.metadataReader;
      const clusterReader = demuxer.clusterReader;
      let prevCluster = null;
      let bestClusterIndex = clusterIndex;
      let bestBlockIndex = blockIndex;
      const cuePointIndex = binarySearchLessOrEqual(this.internalTrack.cuePoints, searchTimestamp, (x) => x.time);
      const cuePoint = cuePointIndex !== -1 ? this.internalTrack.cuePoints[cuePointIndex] : null;
      let nextClusterIsFirstCluster = false;
      if (clusterIndex === -1) {
        metadataReader.pos = cuePoint?.clusterPosition ?? segment.clusterSeekStartPos;
        nextClusterIsFirstCluster = metadataReader.pos === segment.clusterSeekStartPos;
      } else {
        const cluster = this.internalTrack.clusters[clusterIndex];
        if (!cuePoint || cluster.elementStartPos >= cuePoint.clusterPosition) {
          metadataReader.pos = cluster.elementEndPos;
          prevCluster = cluster;
        } else {
          metadataReader.pos = cuePoint.clusterPosition;
        }
      }
      while (metadataReader.pos <= segment.elementEndPos - MIN_HEADER_SIZE) {
        if (prevCluster) {
          const trackData = prevCluster.trackData.get(this.internalTrack.id);
          if (trackData && trackData.startTimestamp > latestTimestamp) {
            break;
          }
          if (prevCluster.nextCluster) {
            metadataReader.pos = prevCluster.nextCluster.elementEndPos;
            prevCluster = prevCluster.nextCluster;
            continue;
          }
        }
        await metadataReader.reader.loadRange(metadataReader.pos, metadataReader.pos + MAX_HEADER_SIZE);
        const elementStartPos = metadataReader.pos;
        const elementHeader = metadataReader.readElementHeader();
        if (!elementHeader || !LEVEL_1_EBML_IDS.includes(elementHeader.id)) {
          metadataReader.pos = elementStartPos;
          const nextPos = await metadataReader.resync(LEVEL_1_EBML_IDS, Math.min(segment.elementEndPos, metadataReader.pos + MAX_RESYNC_LENGTH));
          if (nextPos) {
            metadataReader.pos = nextPos;
            continue;
          } else {
            break;
          }
        }
        const id = elementHeader.id;
        let size = elementHeader.size;
        const dataStartPos = metadataReader.pos;
        if (id === EBMLId.Cluster) {
          const index = binarySearchExact(segment.clusters, elementStartPos, (x) => x.elementStartPos);
          let cluster;
          if (index === -1) {
            metadataReader.pos = elementStartPos;
            cluster = await demuxer.readCluster(segment);
          } else {
            cluster = segment.clusters[index];
          }
          if (prevCluster)
            prevCluster.nextCluster = cluster;
          prevCluster = cluster;
          if (nextClusterIsFirstCluster) {
            cluster.isKnownToBeFirstCluster = true;
            nextClusterIsFirstCluster = false;
          }
          const { clusterIndex: clusterIndex2, blockIndex: blockIndex2, correctBlockFound: correctBlockFound2 } = getBestMatch();
          if (correctBlockFound2) {
            const cluster2 = this.internalTrack.clusters[clusterIndex2];
            return this.fetchPacketInCluster(cluster2, blockIndex2, options);
          }
          if (clusterIndex2 !== -1) {
            bestClusterIndex = clusterIndex2;
            bestBlockIndex = blockIndex2;
          }
        }
        if (size === null) {
          if (id === EBMLId.Cluster) {
            assert(prevCluster);
            size = prevCluster.elementEndPos - dataStartPos;
          } else {
            clusterReader.pos = dataStartPos;
            const nextElementPos = await clusterReader.searchForNextElementId(LEVEL_0_AND_1_EBML_IDS, segment.elementEndPos);
            size = (nextElementPos ?? segment.elementEndPos) - dataStartPos;
          }
          const endPos = dataStartPos + size;
          if (endPos > segment.elementEndPos - MIN_HEADER_SIZE) {
            break;
          } else {
            clusterReader.pos = endPos;
            const elementId = clusterReader.readElementId();
            if (elementId === EBMLId.Segment) {
              segment.elementEndPos = endPos;
              break;
            }
          }
        }
        metadataReader.pos = dataStartPos + size;
      }
      const bestCluster = bestClusterIndex !== -1 ? this.internalTrack.clusters[bestClusterIndex] : null;
      if (cuePoint && (!bestCluster || bestCluster.elementStartPos < cuePoint.clusterPosition)) {
        const previousCuePoint = this.internalTrack.cuePoints[cuePointIndex - 1];
        const newSearchTimestamp = previousCuePoint?.time ?? -Infinity;
        return this.performClusterLookup(getBestMatch, newSearchTimestamp, latestTimestamp, options);
      }
      if (bestCluster) {
        return this.fetchPacketInCluster(bestCluster, bestBlockIndex, options);
      }
      return null;
    } finally {
      release();
    }
  }
};
var MatroskaVideoTrackBacking = class extends MatroskaTrackBacking {
  constructor(internalTrack) {
    super(internalTrack);
    this.decoderConfigPromise = null;
    this.internalTrack = internalTrack;
  }
  getCodec() {
    return this.internalTrack.info.codec;
  }
  getCodedWidth() {
    return this.internalTrack.info.width;
  }
  getCodedHeight() {
    return this.internalTrack.info.height;
  }
  getRotation() {
    return this.internalTrack.info.rotation;
  }
  async getColorSpace() {
    return {
      primaries: this.internalTrack.info.colorSpace?.primaries,
      transfer: this.internalTrack.info.colorSpace?.transfer,
      matrix: this.internalTrack.info.colorSpace?.matrix,
      fullRange: this.internalTrack.info.colorSpace?.fullRange
    };
  }
  async getDecoderConfig() {
    if (!this.internalTrack.info.codec) {
      return null;
    }
    return this.decoderConfigPromise ??= (async () => {
      let firstPacket = null;
      const needsPacketForAdditionalInfo = this.internalTrack.info.codec === "vp9" || this.internalTrack.info.codec === "av1" || this.internalTrack.info.codec === "avc" && !this.internalTrack.info.codecDescription || this.internalTrack.info.codec === "hevc" && !this.internalTrack.info.codecDescription;
      if (needsPacketForAdditionalInfo) {
        firstPacket = await this.getFirstPacket({});
      }
      return {
        codec: extractVideoCodecString({
          width: this.internalTrack.info.width,
          height: this.internalTrack.info.height,
          codec: this.internalTrack.info.codec,
          codecDescription: this.internalTrack.info.codecDescription,
          colorSpace: this.internalTrack.info.colorSpace,
          avcCodecInfo: this.internalTrack.info.codec === "avc" && firstPacket ? extractAvcDecoderConfigurationRecord(firstPacket.data) : null,
          hevcCodecInfo: this.internalTrack.info.codec === "hevc" && firstPacket ? extractHevcDecoderConfigurationRecord(firstPacket.data) : null,
          vp9CodecInfo: this.internalTrack.info.codec === "vp9" && firstPacket ? extractVp9CodecInfoFromPacket(firstPacket.data) : null,
          av1CodecInfo: this.internalTrack.info.codec === "av1" && firstPacket ? extractAv1CodecInfoFromPacket(firstPacket.data) : null
        }),
        codedWidth: this.internalTrack.info.width,
        codedHeight: this.internalTrack.info.height,
        description: this.internalTrack.info.codecDescription ?? void 0,
        colorSpace: this.internalTrack.info.colorSpace ?? void 0
      };
    })();
  }
};
var MatroskaAudioTrackBacking = class extends MatroskaTrackBacking {
  constructor(internalTrack) {
    super(internalTrack);
    this.decoderConfig = null;
    this.internalTrack = internalTrack;
  }
  getCodec() {
    return this.internalTrack.info.codec;
  }
  getNumberOfChannels() {
    return this.internalTrack.info.numberOfChannels;
  }
  getSampleRate() {
    return this.internalTrack.info.sampleRate;
  }
  async getDecoderConfig() {
    if (!this.internalTrack.info.codec) {
      return null;
    }
    return this.decoderConfig ??= {
      codec: extractAudioCodecString({
        codec: this.internalTrack.info.codec,
        codecDescription: this.internalTrack.info.codecDescription,
        aacCodecInfo: this.internalTrack.info.aacCodecInfo
      }),
      numberOfChannels: this.internalTrack.info.numberOfChannels,
      sampleRate: this.internalTrack.info.sampleRate,
      description: this.internalTrack.info.codecDescription ?? void 0
    };
  }
};
var sortBlocksByReferences = (blocks) => {
  const timestampToBlock = /* @__PURE__ */ new Map();
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    timestampToBlock.set(block.timestamp, block);
  }
  const processedBlocks = /* @__PURE__ */ new Set();
  const result = [];
  const processBlock = (block) => {
    if (processedBlocks.has(block)) {
      return;
    }
    processedBlocks.add(block);
    for (let j = 0; j < block.referencedTimestamps.length; j++) {
      const timestamp = block.referencedTimestamps[j];
      const otherBlock = timestampToBlock.get(timestamp);
      if (!otherBlock) {
        continue;
      }
      processBlock(otherBlock);
    }
    result.push(block);
  };
  for (let i = 0; i < blocks.length; i++) {
    processBlock(blocks[i]);
  }
  return result;
};

// node_modules/mediabunny/dist/modules/src/mp3/mp3-reader.js
var Mp3Reader = class {
  constructor(reader) {
    this.reader = reader;
    this.pos = 0;
    this.fileSize = null;
  }
  readBytes(length) {
    const { view, offset } = this.reader.getViewAndOffset(this.pos, this.pos + length);
    this.pos += length;
    return new Uint8Array(view.buffer, offset, length);
  }
  readU16() {
    const { view, offset } = this.reader.getViewAndOffset(this.pos, this.pos + 2);
    this.pos += 2;
    return view.getUint16(offset, false);
  }
  readU32() {
    const { view, offset } = this.reader.getViewAndOffset(this.pos, this.pos + 4);
    this.pos += 4;
    return view.getUint32(offset, false);
  }
  readAscii(length) {
    const { view, offset } = this.reader.getViewAndOffset(this.pos, this.pos + length);
    this.pos += length;
    let str = "";
    for (let i = 0; i < length; i++) {
      str += String.fromCharCode(view.getUint8(offset + i));
    }
    return str;
  }
  readId3() {
    const tag = this.readAscii(3);
    if (tag !== "ID3") {
      this.pos -= 3;
      return null;
    }
    this.pos += 3;
    const size = decodeSynchsafe(this.readU32());
    return { size };
  }
  readNextFrameHeader(until) {
    assert(this.fileSize);
    until ??= this.fileSize;
    while (this.pos <= until - FRAME_HEADER_SIZE) {
      const word = this.readU32();
      this.pos -= 4;
      const header = readFrameHeader(word, this);
      if (header) {
        return header;
      }
    }
    return null;
  }
};
var decodeSynchsafe = (synchsafed) => {
  let mask = 2130706432;
  let unsynchsafed = 0;
  while (mask !== 0) {
    unsynchsafed >>= 1;
    unsynchsafed |= synchsafed & mask;
    mask >>= 8;
  }
  return unsynchsafed;
};

// node_modules/mediabunny/dist/modules/src/mp3/mp3-demuxer.js
var Mp3Demuxer = class extends Demuxer {
  constructor(input) {
    super(input);
    this.metadataPromise = null;
    this.firstFrameHeader = null;
    this.loadedSamples = [];
    this.tracks = [];
    this.readingMutex = new AsyncMutex();
    this.lastLoadedPos = 0;
    this.fileSize = 0;
    this.nextTimestampInSamples = 0;
    this.reader = new Mp3Reader(input._mainReader);
  }
  async readMetadata() {
    return this.metadataPromise ??= (async () => {
      this.fileSize = await this.input.source.getSize();
      this.reader.fileSize = this.fileSize;
      while (!this.firstFrameHeader && this.lastLoadedPos < this.fileSize) {
        await this.loadNextChunk();
      }
      assert(this.firstFrameHeader);
      this.tracks = [new InputAudioTrack(new Mp3AudioTrackBacking(this))];
    })();
  }
  /** Loads the next 0.5 MiB of frames. */
  async loadNextChunk() {
    assert(this.lastLoadedPos < this.fileSize);
    const chunkSize = 0.5 * 1024 * 1024;
    const endPos = Math.min(this.lastLoadedPos + chunkSize, this.fileSize);
    await this.reader.reader.loadRange(this.lastLoadedPos, endPos);
    this.lastLoadedPos = endPos;
    assert(this.lastLoadedPos <= this.fileSize);
    if (this.reader.pos === 0) {
      const id3Tag = this.reader.readId3();
      if (id3Tag) {
        this.reader.pos += id3Tag.size;
      }
    }
    this.parseFramesFromLoadedData();
  }
  parseFramesFromLoadedData() {
    while (true) {
      const startPos = this.reader.pos;
      const header = this.reader.readNextFrameHeader();
      if (!header) {
        break;
      }
      if (header.startPos + header.totalSize > this.lastLoadedPos) {
        this.reader.pos = startPos;
        this.lastLoadedPos = startPos;
        break;
      }
      const xingOffset = getXingOffset(header.mpegVersionId, header.channel);
      this.reader.pos = header.startPos + xingOffset;
      const word = this.reader.readU32();
      const isXing = word === XING || word === INFO;
      this.reader.pos = header.startPos + header.totalSize - 1;
      if (isXing) {
        continue;
      }
      if (!this.firstFrameHeader) {
        this.firstFrameHeader = header;
      }
      const sampleDuration = header.audioSamplesInFrame / header.sampleRate;
      const sample = {
        timestamp: this.nextTimestampInSamples / header.sampleRate,
        duration: sampleDuration,
        dataStart: header.startPos,
        dataSize: header.totalSize
      };
      this.loadedSamples.push(sample);
      this.nextTimestampInSamples += header.audioSamplesInFrame;
    }
  }
  async getMimeType() {
    return "audio/mpeg";
  }
  async getTracks() {
    await this.readMetadata();
    return this.tracks;
  }
  async computeDuration() {
    await this.readMetadata();
    const track = this.tracks[0];
    assert(track);
    return track.computeDuration();
  }
};
var Mp3AudioTrackBacking = class {
  constructor(demuxer) {
    this.demuxer = demuxer;
  }
  getId() {
    return 1;
  }
  async getFirstTimestamp() {
    return 0;
  }
  getTimeResolution() {
    assert(this.demuxer.firstFrameHeader);
    return this.demuxer.firstFrameHeader.sampleRate / this.demuxer.firstFrameHeader.audioSamplesInFrame;
  }
  async computeDuration() {
    const lastPacket = await this.getPacket(Infinity, { metadataOnly: true });
    return (lastPacket?.timestamp ?? 0) + (lastPacket?.duration ?? 0);
  }
  getName() {
    return null;
  }
  getLanguageCode() {
    return UNDETERMINED_LANGUAGE;
  }
  getCodec() {
    return "mp3";
  }
  getInternalCodecId() {
    return null;
  }
  getNumberOfChannels() {
    assert(this.demuxer.firstFrameHeader);
    return this.demuxer.firstFrameHeader.channel === 3 ? 1 : 2;
  }
  getSampleRate() {
    assert(this.demuxer.firstFrameHeader);
    return this.demuxer.firstFrameHeader.sampleRate;
  }
  async getDecoderConfig() {
    assert(this.demuxer.firstFrameHeader);
    return {
      codec: "mp3",
      numberOfChannels: this.demuxer.firstFrameHeader.channel === 3 ? 1 : 2,
      sampleRate: this.demuxer.firstFrameHeader.sampleRate
    };
  }
  getPacketAtIndex(sampleIndex, options) {
    if (sampleIndex === -1) {
      return null;
    }
    const rawSample = this.demuxer.loadedSamples[sampleIndex];
    if (!rawSample) {
      return null;
    }
    let data;
    if (options.metadataOnly) {
      data = PLACEHOLDER_DATA;
    } else {
      this.demuxer.reader.pos = rawSample.dataStart;
      data = this.demuxer.reader.readBytes(rawSample.dataSize);
    }
    return new EncodedPacket(data, "key", rawSample.timestamp, rawSample.duration, sampleIndex, rawSample.dataSize);
  }
  async getFirstPacket(options) {
    return this.getPacketAtIndex(0, options);
  }
  async getNextPacket(packet, options) {
    const release = await this.demuxer.readingMutex.acquire();
    try {
      const sampleIndex = binarySearchExact(this.demuxer.loadedSamples, packet.timestamp, (x) => x.timestamp);
      if (sampleIndex === -1) {
        throw new Error("Packet was not created from this track.");
      }
      const nextIndex = sampleIndex + 1;
      while (nextIndex >= this.demuxer.loadedSamples.length && this.demuxer.lastLoadedPos < this.demuxer.fileSize) {
        await this.demuxer.loadNextChunk();
      }
      return this.getPacketAtIndex(nextIndex, options);
    } finally {
      release();
    }
  }
  async getPacket(timestamp, options) {
    const release = await this.demuxer.readingMutex.acquire();
    try {
      while (true) {
        const index = binarySearchLessOrEqual(this.demuxer.loadedSamples, timestamp, (x) => x.timestamp);
        if (index === -1 && this.demuxer.loadedSamples.length > 0) {
          return null;
        }
        if (this.demuxer.lastLoadedPos === this.demuxer.fileSize) {
          return this.getPacketAtIndex(index, options);
        }
        if (index >= 0 && index + 1 < this.demuxer.loadedSamples.length) {
          return this.getPacketAtIndex(index, options);
        }
        await this.demuxer.loadNextChunk();
      }
    } finally {
      release();
    }
  }
  getKeyPacket(timestamp, options) {
    return this.getPacket(timestamp, options);
  }
  getNextKeyPacket(packet, options) {
    return this.getNextPacket(packet, options);
  }
};

// node_modules/mediabunny/dist/modules/src/ogg/ogg-demuxer.js
var OggDemuxer = class extends Demuxer {
  constructor(input) {
    super(input);
    this.readingMutex = new AsyncMutex();
    this.metadataPromise = null;
    this.fileSize = null;
    this.bitstreams = [];
    this.tracks = [];
    this.reader = new OggReader(new Reader(input.source, 64 * 2 ** 20));
  }
  async readMetadata() {
    return this.metadataPromise ??= (async () => {
      this.fileSize = await this.input.source.getSize();
      while (this.reader.pos < this.fileSize - MIN_PAGE_HEADER_SIZE) {
        await this.reader.reader.loadRange(this.reader.pos, this.reader.pos + MAX_PAGE_HEADER_SIZE);
        const page = this.reader.readPageHeader();
        if (!page) {
          break;
        }
        const isBos = !!(page.headerType & 2);
        if (!isBos) {
          break;
        }
        this.bitstreams.push({
          serialNumber: page.serialNumber,
          bosPage: page,
          description: null,
          numberOfChannels: -1,
          sampleRate: -1,
          codecInfo: {
            codec: null,
            vorbisInfo: null,
            opusInfo: null
          },
          lastMetadataPacket: null
        });
        this.reader.pos = page.headerStartPos + page.totalSize;
      }
      for (const bitstream of this.bitstreams) {
        const firstPacket = await this.readPacket(this.reader, bitstream.bosPage, 0);
        if (!firstPacket) {
          continue;
        }
        if (
          // Check for Vorbis
          firstPacket.data.byteLength >= 7 && firstPacket.data[0] === 1 && firstPacket.data[1] === 118 && firstPacket.data[2] === 111 && firstPacket.data[3] === 114 && firstPacket.data[4] === 98 && firstPacket.data[5] === 105 && firstPacket.data[6] === 115
        ) {
          await this.readVorbisMetadata(firstPacket, bitstream);
        } else if (
          // Check for Opus
          firstPacket.data.byteLength >= 8 && firstPacket.data[0] === 79 && firstPacket.data[1] === 112 && firstPacket.data[2] === 117 && firstPacket.data[3] === 115 && firstPacket.data[4] === 72 && firstPacket.data[5] === 101 && firstPacket.data[6] === 97 && firstPacket.data[7] === 100
        ) {
          await this.readOpusMetadata(firstPacket, bitstream);
        }
        if (bitstream.codecInfo.codec !== null) {
          this.tracks.push(new InputAudioTrack(new OggAudioTrackBacking(bitstream, this)));
        }
      }
    })();
  }
  async readVorbisMetadata(firstPacket, bitstream) {
    let nextPacketPosition = await this.findNextPacketStart(this.reader, firstPacket);
    if (!nextPacketPosition) {
      return;
    }
    const secondPacket = await this.readPacket(this.reader, nextPacketPosition.startPage, nextPacketPosition.startSegmentIndex);
    if (!secondPacket) {
      return;
    }
    nextPacketPosition = await this.findNextPacketStart(this.reader, secondPacket);
    if (!nextPacketPosition) {
      return;
    }
    const thirdPacket = await this.readPacket(this.reader, nextPacketPosition.startPage, nextPacketPosition.startSegmentIndex);
    if (!thirdPacket) {
      return;
    }
    if (secondPacket.data[0] !== 3 || thirdPacket.data[0] !== 5) {
      return;
    }
    const lacingValues = [];
    const addBytesToSegmentTable = (bytes) => {
      while (true) {
        lacingValues.push(Math.min(255, bytes));
        if (bytes < 255) {
          break;
        }
        bytes -= 255;
      }
    };
    addBytesToSegmentTable(firstPacket.data.length);
    addBytesToSegmentTable(secondPacket.data.length);
    const description = new Uint8Array(1 + lacingValues.length + firstPacket.data.length + secondPacket.data.length + thirdPacket.data.length);
    description[0] = lacingValues.length;
    description.set(lacingValues, 1);
    description.set(firstPacket.data, 1 + lacingValues.length);
    description.set(secondPacket.data, 1 + lacingValues.length + firstPacket.data.length);
    description.set(thirdPacket.data, 1 + lacingValues.length + firstPacket.data.length + secondPacket.data.length);
    bitstream.codecInfo.codec = "vorbis";
    bitstream.description = description;
    bitstream.lastMetadataPacket = thirdPacket;
    const view = toDataView(firstPacket.data);
    bitstream.numberOfChannels = view.getUint8(11);
    bitstream.sampleRate = view.getUint32(12, true);
    const blockSizeByte = view.getUint8(28);
    bitstream.codecInfo.vorbisInfo = {
      blocksizes: [
        1 << (blockSizeByte & 15),
        1 << (blockSizeByte >> 4)
      ],
      modeBlockflags: parseModesFromVorbisSetupPacket(thirdPacket.data).modeBlockflags
    };
  }
  async readOpusMetadata(firstPacket, bitstream) {
    const nextPacketPosition = await this.findNextPacketStart(this.reader, firstPacket);
    if (!nextPacketPosition) {
      return;
    }
    const secondPacket = await this.readPacket(this.reader, nextPacketPosition.startPage, nextPacketPosition.startSegmentIndex);
    if (!secondPacket) {
      return;
    }
    bitstream.codecInfo.codec = "opus";
    bitstream.description = firstPacket.data;
    bitstream.lastMetadataPacket = secondPacket;
    const header = parseOpusIdentificationHeader(firstPacket.data);
    bitstream.numberOfChannels = header.outputChannelCount;
    bitstream.sampleRate = header.inputSampleRate;
    bitstream.codecInfo.opusInfo = {
      preSkip: header.preSkip
    };
  }
  async readPacket(reader, startPage, startSegmentIndex) {
    assert(startSegmentIndex < startPage.lacingValues.length);
    assert(this.fileSize);
    let startDataOffset = 0;
    for (let i = 0; i < startSegmentIndex; i++) {
      startDataOffset += startPage.lacingValues[i];
    }
    let currentPage = startPage;
    let currentDataOffset = startDataOffset;
    let currentSegmentIndex = startSegmentIndex;
    const chunks = [];
    outer: while (true) {
      await reader.reader.loadRange(currentPage.dataStartPos, currentPage.dataStartPos + currentPage.dataSize);
      reader.pos = currentPage.dataStartPos;
      const pageData = reader.readBytes(currentPage.dataSize);
      while (true) {
        if (currentSegmentIndex === currentPage.lacingValues.length) {
          chunks.push(pageData.subarray(startDataOffset, currentDataOffset));
          break;
        }
        const lacingValue = currentPage.lacingValues[currentSegmentIndex];
        currentDataOffset += lacingValue;
        if (lacingValue < 255) {
          chunks.push(pageData.subarray(startDataOffset, currentDataOffset));
          break outer;
        }
        currentSegmentIndex++;
      }
      while (true) {
        reader.pos = currentPage.headerStartPos + currentPage.totalSize;
        if (reader.pos >= this.fileSize - MIN_PAGE_HEADER_SIZE) {
          return null;
        }
        await reader.reader.loadRange(reader.pos, reader.pos + MAX_PAGE_HEADER_SIZE);
        const nextPage = reader.readPageHeader();
        if (!nextPage) {
          return null;
        }
        currentPage = nextPage;
        if (currentPage.serialNumber === startPage.serialNumber) {
          break;
        }
      }
      startDataOffset = 0;
      currentDataOffset = 0;
      currentSegmentIndex = 0;
    }
    const totalPacketSize = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
    const packetData = new Uint8Array(totalPacketSize);
    let offset = 0;
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      packetData.set(chunk, offset);
      offset += chunk.length;
    }
    return {
      data: packetData,
      endPage: currentPage,
      endSegmentIndex: currentSegmentIndex
    };
  }
  async findNextPacketStart(reader, lastPacket) {
    assert(this.fileSize !== null);
    if (lastPacket.endSegmentIndex < lastPacket.endPage.lacingValues.length - 1) {
      return { startPage: lastPacket.endPage, startSegmentIndex: lastPacket.endSegmentIndex + 1 };
    }
    const isEos = !!(lastPacket.endPage.headerType & 4);
    if (isEos) {
      return null;
    }
    reader.pos = lastPacket.endPage.headerStartPos + lastPacket.endPage.totalSize;
    while (true) {
      if (reader.pos >= this.fileSize - MIN_PAGE_HEADER_SIZE) {
        return null;
      }
      await reader.reader.loadRange(reader.pos, reader.pos + MAX_PAGE_HEADER_SIZE);
      const nextPage = reader.readPageHeader();
      if (!nextPage) {
        return null;
      }
      if (nextPage.serialNumber === lastPacket.endPage.serialNumber) {
        return { startPage: nextPage, startSegmentIndex: 0 };
      }
      reader.pos = nextPage.headerStartPos + nextPage.totalSize;
    }
  }
  async getMimeType() {
    await this.readMetadata();
    const codecStrings = await Promise.all(this.tracks.map((x) => x.getCodecParameterString()));
    return buildOggMimeType({
      codecStrings: codecStrings.filter(Boolean)
    });
  }
  async getTracks() {
    await this.readMetadata();
    return this.tracks;
  }
  async computeDuration() {
    const tracks = await this.getTracks();
    const trackDurations = await Promise.all(tracks.map((x) => x.computeDuration()));
    return Math.max(0, ...trackDurations);
  }
};
var OggAudioTrackBacking = class {
  constructor(bitstream, demuxer) {
    this.bitstream = bitstream;
    this.demuxer = demuxer;
    this.encodedPacketToMetadata = /* @__PURE__ */ new WeakMap();
    this.internalSampleRate = bitstream.codecInfo.codec === "opus" ? OPUS_INTERNAL_SAMPLE_RATE : bitstream.sampleRate;
  }
  getId() {
    return this.bitstream.serialNumber;
  }
  getNumberOfChannels() {
    return this.bitstream.numberOfChannels;
  }
  getSampleRate() {
    return this.bitstream.sampleRate;
  }
  getTimeResolution() {
    return this.bitstream.sampleRate;
  }
  getCodec() {
    return this.bitstream.codecInfo.codec;
  }
  getInternalCodecId() {
    return null;
  }
  async getDecoderConfig() {
    assert(this.bitstream.codecInfo.codec);
    return {
      codec: this.bitstream.codecInfo.codec,
      numberOfChannels: this.bitstream.numberOfChannels,
      sampleRate: this.bitstream.sampleRate,
      description: this.bitstream.description ?? void 0
    };
  }
  getName() {
    return null;
  }
  getLanguageCode() {
    return UNDETERMINED_LANGUAGE;
  }
  async getFirstTimestamp() {
    return 0;
  }
  async computeDuration() {
    const lastPacket = await this.getPacket(Infinity, { metadataOnly: true });
    return (lastPacket?.timestamp ?? 0) + (lastPacket?.duration ?? 0);
  }
  granulePositionToTimestampInSamples(granulePosition) {
    if (this.bitstream.codecInfo.codec === "opus") {
      assert(this.bitstream.codecInfo.opusInfo);
      return granulePosition - this.bitstream.codecInfo.opusInfo.preSkip;
    }
    return granulePosition;
  }
  createEncodedPacketFromOggPacket(packet, additional, options) {
    if (!packet) {
      return null;
    }
    const { durationInSamples, vorbisBlockSize } = extractSampleMetadata(packet.data, this.bitstream.codecInfo, additional.vorbisLastBlocksize);
    const encodedPacket = new EncodedPacket(options.metadataOnly ? PLACEHOLDER_DATA : packet.data, "key", Math.max(0, additional.timestampInSamples) / this.internalSampleRate, durationInSamples / this.internalSampleRate, packet.endPage.headerStartPos + packet.endSegmentIndex, packet.data.byteLength);
    this.encodedPacketToMetadata.set(encodedPacket, {
      packet,
      timestampInSamples: additional.timestampInSamples,
      durationInSamples,
      vorbisBlockSize
    });
    return encodedPacket;
  }
  async getFirstPacket(options, exclusive = true) {
    const release = exclusive ? await this.demuxer.readingMutex.acquire() : null;
    try {
      assert(this.bitstream.lastMetadataPacket);
      const packetPosition = await this.demuxer.findNextPacketStart(this.demuxer.reader, this.bitstream.lastMetadataPacket);
      if (!packetPosition) {
        return null;
      }
      let timestampInSamples = 0;
      if (this.bitstream.codecInfo.codec === "opus") {
        assert(this.bitstream.codecInfo.opusInfo);
        timestampInSamples -= this.bitstream.codecInfo.opusInfo.preSkip;
      }
      const packet = await this.demuxer.readPacket(this.demuxer.reader, packetPosition.startPage, packetPosition.startSegmentIndex);
      return this.createEncodedPacketFromOggPacket(packet, {
        timestampInSamples,
        vorbisLastBlocksize: null
      }, options);
    } finally {
      release?.();
    }
  }
  async getNextPacket(prevPacket, options) {
    const release = await this.demuxer.readingMutex.acquire();
    try {
      const prevMetadata = this.encodedPacketToMetadata.get(prevPacket);
      if (!prevMetadata) {
        throw new Error("Packet was not created from this track.");
      }
      const packetPosition = await this.demuxer.findNextPacketStart(this.demuxer.reader, prevMetadata.packet);
      if (!packetPosition) {
        return null;
      }
      const timestampInSamples = prevMetadata.timestampInSamples + prevMetadata.durationInSamples;
      const packet = await this.demuxer.readPacket(this.demuxer.reader, packetPosition.startPage, packetPosition.startSegmentIndex);
      return this.createEncodedPacketFromOggPacket(packet, {
        timestampInSamples,
        vorbisLastBlocksize: prevMetadata.vorbisBlockSize
      }, options);
    } finally {
      release();
    }
  }
  async getPacket(timestamp, options) {
    const release = await this.demuxer.readingMutex.acquire();
    try {
      assert(this.demuxer.fileSize !== null);
      const timestampInSamples = roundToPrecision(timestamp * this.internalSampleRate, 14);
      if (timestampInSamples === 0) {
        return this.getFirstPacket(options, false);
      }
      if (timestampInSamples < 0) {
        return null;
      }
      const reader = this.demuxer.reader;
      assert(this.bitstream.lastMetadataPacket);
      const startPosition = await this.demuxer.findNextPacketStart(reader, this.bitstream.lastMetadataPacket);
      if (!startPosition) {
        return null;
      }
      let lowPage = startPosition.startPage;
      let high = this.demuxer.fileSize;
      const lowPages = [lowPage];
      outer: while (lowPage.headerStartPos + lowPage.totalSize < high) {
        const low = lowPage.headerStartPos;
        const mid = Math.floor((low + high) / 2);
        let searchStartPos = mid;
        while (true) {
          const until = Math.min(searchStartPos + MAX_PAGE_SIZE, high - MIN_PAGE_HEADER_SIZE);
          await reader.reader.loadRange(searchStartPos, until);
          reader.pos = searchStartPos;
          const found = reader.findNextPageHeader(until);
          if (!found) {
            high = mid + MIN_PAGE_HEADER_SIZE;
            continue outer;
          }
          await reader.reader.loadRange(reader.pos, reader.pos + MAX_PAGE_HEADER_SIZE);
          const page = reader.readPageHeader();
          assert(page);
          let pageValid = false;
          if (page.serialNumber === this.bitstream.serialNumber) {
            pageValid = true;
          } else {
            await reader.reader.loadRange(page.headerStartPos, page.headerStartPos + page.totalSize);
            reader.pos = page.headerStartPos;
            const bytes = reader.readBytes(page.totalSize);
            const crc = computeOggPageCrc(bytes);
            pageValid = crc === page.checksum;
          }
          if (!pageValid) {
            searchStartPos = page.headerStartPos + 4;
            continue;
          }
          if (pageValid && page.serialNumber !== this.bitstream.serialNumber) {
            searchStartPos = page.headerStartPos + page.totalSize;
            continue;
          }
          const isContinuationPage = page.granulePosition === -1;
          if (isContinuationPage) {
            searchStartPos = page.headerStartPos + page.totalSize;
            continue;
          }
          if (this.granulePositionToTimestampInSamples(page.granulePosition) > timestampInSamples) {
            high = page.headerStartPos;
          } else {
            lowPage = page;
            lowPages.push(page);
          }
          continue outer;
        }
      }
      let lowerPage = startPosition.startPage;
      for (const otherLowPage of lowPages) {
        if (otherLowPage.granulePosition === lowPage.granulePosition) {
          break;
        }
        if (!lowerPage || otherLowPage.headerStartPos > lowerPage.headerStartPos) {
          lowerPage = otherLowPage;
        }
      }
      let currentPage = lowerPage;
      const previousPages = [currentPage];
      while (true) {
        if (currentPage.serialNumber === this.bitstream.serialNumber && currentPage.granulePosition === lowPage.granulePosition) {
          break;
        }
        reader.pos = currentPage.headerStartPos + currentPage.totalSize;
        await reader.reader.loadRange(reader.pos, reader.pos + MAX_PAGE_HEADER_SIZE);
        const nextPage = reader.readPageHeader();
        assert(nextPage);
        currentPage = nextPage;
        if (currentPage.serialNumber === this.bitstream.serialNumber) {
          previousPages.push(currentPage);
        }
      }
      assert(currentPage.granulePosition !== -1);
      let currentSegmentIndex = null;
      let currentTimestampInSamples;
      let currentTimestampIsCorrect;
      let endPage = currentPage;
      let endSegmentIndex = 0;
      if (currentPage.headerStartPos === startPosition.startPage.headerStartPos) {
        currentTimestampInSamples = this.granulePositionToTimestampInSamples(0);
        currentTimestampIsCorrect = true;
        currentSegmentIndex = 0;
      } else {
        currentTimestampInSamples = 0;
        currentTimestampIsCorrect = false;
        for (let i = currentPage.lacingValues.length - 1; i >= 0; i--) {
          const value = currentPage.lacingValues[i];
          if (value < 255) {
            currentSegmentIndex = i + 1;
            break;
          }
        }
        if (currentSegmentIndex === null) {
          throw new Error("Invalid page with granule position: no packets end on this page.");
        }
        endSegmentIndex = currentSegmentIndex - 1;
        const pseudopacket = {
          data: PLACEHOLDER_DATA,
          endPage,
          endSegmentIndex
        };
        const nextPosition = await this.demuxer.findNextPacketStart(reader, pseudopacket);
        if (nextPosition) {
          const endPosition = findPreviousPacketEndPosition(previousPages, currentPage, currentSegmentIndex);
          assert(endPosition);
          const startPosition2 = findPacketStartPosition(previousPages, endPosition.page, endPosition.segmentIndex);
          if (startPosition2) {
            currentPage = startPosition2.page;
            currentSegmentIndex = startPosition2.segmentIndex;
          }
        } else {
          while (true) {
            const endPosition = findPreviousPacketEndPosition(previousPages, currentPage, currentSegmentIndex);
            if (!endPosition) {
              break;
            }
            const startPosition2 = findPacketStartPosition(previousPages, endPosition.page, endPosition.segmentIndex);
            if (!startPosition2) {
              break;
            }
            currentPage = startPosition2.page;
            currentSegmentIndex = startPosition2.segmentIndex;
            if (endPosition.page.headerStartPos !== endPage.headerStartPos) {
              endPage = endPosition.page;
              endSegmentIndex = endPosition.segmentIndex;
              break;
            }
          }
        }
      }
      let lastEncodedPacket = null;
      let lastEncodedPacketMetadata = null;
      while (currentPage !== null) {
        assert(currentSegmentIndex !== null);
        const packet = await this.demuxer.readPacket(reader, currentPage, currentSegmentIndex);
        if (!packet) {
          break;
        }
        const skipPacket = currentPage.headerStartPos === startPosition.startPage.headerStartPos && currentSegmentIndex < startPosition.startSegmentIndex;
        if (!skipPacket) {
          let encodedPacket = this.createEncodedPacketFromOggPacket(packet, {
            timestampInSamples: currentTimestampInSamples,
            vorbisLastBlocksize: lastEncodedPacketMetadata?.vorbisBlockSize ?? null
          }, options);
          assert(encodedPacket);
          let encodedPacketMetadata = this.encodedPacketToMetadata.get(encodedPacket);
          assert(encodedPacketMetadata);
          if (!currentTimestampIsCorrect && packet.endPage.headerStartPos === endPage.headerStartPos && packet.endSegmentIndex === endSegmentIndex) {
            currentTimestampInSamples = this.granulePositionToTimestampInSamples(currentPage.granulePosition);
            currentTimestampIsCorrect = true;
            encodedPacket = this.createEncodedPacketFromOggPacket(packet, {
              timestampInSamples: currentTimestampInSamples - encodedPacketMetadata.durationInSamples,
              vorbisLastBlocksize: lastEncodedPacketMetadata?.vorbisBlockSize ?? null
            }, options);
            assert(encodedPacket);
            encodedPacketMetadata = this.encodedPacketToMetadata.get(encodedPacket);
            assert(encodedPacketMetadata);
          } else {
            currentTimestampInSamples += encodedPacketMetadata.durationInSamples;
          }
          lastEncodedPacket = encodedPacket;
          lastEncodedPacketMetadata = encodedPacketMetadata;
          if (currentTimestampIsCorrect && // Next timestamp will be too late
          (Math.max(currentTimestampInSamples, 0) > timestampInSamples || Math.max(encodedPacketMetadata.timestampInSamples, 0) === timestampInSamples)) {
            break;
          }
        }
        const nextPosition = await this.demuxer.findNextPacketStart(reader, packet);
        if (!nextPosition) {
          break;
        }
        currentPage = nextPosition.startPage;
        currentSegmentIndex = nextPosition.startSegmentIndex;
      }
      return lastEncodedPacket;
    } finally {
      release();
    }
  }
  getKeyPacket(timestamp, options) {
    return this.getPacket(timestamp, options);
  }
  getNextKeyPacket(packet, options) {
    return this.getNextPacket(packet, options);
  }
};
var findPacketStartPosition = (pageList, endPage, endSegmentIndex) => {
  let page = endPage;
  let segmentIndex = endSegmentIndex;
  outer: while (true) {
    segmentIndex--;
    for (segmentIndex; segmentIndex >= 0; segmentIndex--) {
      const lacingValue = page.lacingValues[segmentIndex];
      if (lacingValue < 255) {
        segmentIndex++;
        break outer;
      }
    }
    assert(segmentIndex === -1);
    const pageStartsWithFreshPacket = !(page.headerType & 1);
    if (pageStartsWithFreshPacket) {
      segmentIndex = 0;
      break;
    }
    const previousPage = findLast(pageList, (x) => x.headerStartPos < page.headerStartPos);
    if (!previousPage) {
      return null;
    }
    page = previousPage;
    segmentIndex = page.lacingValues.length;
  }
  assert(segmentIndex !== -1);
  if (segmentIndex === page.lacingValues.length) {
    const nextPage = pageList[pageList.indexOf(page) + 1];
    assert(nextPage);
    page = nextPage;
    segmentIndex = 0;
  }
  return { page, segmentIndex };
};
var findPreviousPacketEndPosition = (pageList, startPage, startSegmentIndex) => {
  if (startSegmentIndex > 0) {
    return { page: startPage, segmentIndex: startSegmentIndex - 1 };
  }
  const previousPage = findLast(pageList, (x) => x.headerStartPos < startPage.headerStartPos);
  if (!previousPage) {
    return null;
  }
  return { page: previousPage, segmentIndex: previousPage.lacingValues.length - 1 };
};

// node_modules/mediabunny/dist/modules/src/adts/adts-reader.js
var MAX_FRAME_HEADER_SIZE = 9;
var AdtsReader = class {
  constructor(reader) {
    this.reader = reader;
    this.pos = 0;
  }
  readBytes(length) {
    const { view, offset } = this.reader.getViewAndOffset(this.pos, this.pos + length);
    this.pos += length;
    return new Uint8Array(view.buffer, offset, length);
  }
  readFrameHeader() {
    const startPos = this.pos;
    const bytes = this.readBytes(9);
    const bitstream = new Bitstream(bytes);
    const syncword = bitstream.readBits(12);
    if (syncword !== 4095) {
      return null;
    }
    bitstream.skipBits(1);
    const layer = bitstream.readBits(2);
    if (layer !== 0) {
      return null;
    }
    const protectionAbsence = bitstream.readBits(1);
    const objectType = bitstream.readBits(2) + 1;
    const samplingFrequencyIndex = bitstream.readBits(4);
    if (samplingFrequencyIndex === 15) {
      return null;
    }
    bitstream.skipBits(1);
    const channelConfiguration = bitstream.readBits(3);
    if (channelConfiguration === 0) {
      throw new Error("ADTS frames with channel configuration 0 are not supported.");
    }
    bitstream.skipBits(1);
    bitstream.skipBits(1);
    bitstream.skipBits(1);
    bitstream.skipBits(1);
    const frameLength = bitstream.readBits(13);
    bitstream.skipBits(11);
    const numberOfAacFrames = bitstream.readBits(2) + 1;
    if (numberOfAacFrames !== 1) {
      throw new Error("ADTS frames with more than one AAC frame are not supported.");
    }
    let crcCheck = null;
    if (protectionAbsence === 1) {
      this.pos -= 2;
    } else {
      crcCheck = bitstream.readBits(16);
    }
    return {
      objectType,
      samplingFrequencyIndex,
      channelConfiguration,
      frameLength,
      numberOfAacFrames,
      crcCheck,
      startPos
    };
  }
};

// node_modules/mediabunny/dist/modules/src/adts/adts-demuxer.js
var SAMPLES_PER_AAC_FRAME = 1024;
var AdtsDemuxer = class extends Demuxer {
  constructor(input) {
    super(input);
    this.metadataPromise = null;
    this.firstFrameHeader = null;
    this.loadedSamples = [];
    this.tracks = [];
    this.readingMutex = new AsyncMutex();
    this.lastLoadedPos = 0;
    this.fileSize = 0;
    this.nextTimestampInSamples = 0;
    this.reader = new AdtsReader(input._mainReader);
  }
  async readMetadata() {
    return this.metadataPromise ??= (async () => {
      this.fileSize = await this.input.source.getSize();
      await this.loadNextChunk();
      assert(this.firstFrameHeader);
      this.tracks = [new InputAudioTrack(new AdtsAudioTrackBacking(this))];
    })();
  }
  async loadNextChunk() {
    assert(this.lastLoadedPos < this.fileSize);
    const chunkSize = 0.5 * 1024 * 1024;
    const endPos = Math.min(this.lastLoadedPos + chunkSize, this.fileSize);
    await this.reader.reader.loadRange(this.lastLoadedPos, endPos);
    this.lastLoadedPos = endPos;
    assert(this.lastLoadedPos <= this.fileSize);
    this.parseFramesFromLoadedData();
  }
  parseFramesFromLoadedData() {
    while (this.reader.pos <= this.fileSize - MAX_FRAME_HEADER_SIZE) {
      const startPos = this.reader.pos;
      const header = this.reader.readFrameHeader();
      if (!header) {
        break;
      }
      if (startPos + header.frameLength > this.lastLoadedPos) {
        this.reader.pos = startPos;
        this.lastLoadedPos = startPos;
        break;
      }
      if (!this.firstFrameHeader) {
        this.firstFrameHeader = header;
      }
      const sampleRate = aacFrequencyTable[header.samplingFrequencyIndex];
      assert(sampleRate !== void 0);
      const sampleDuration = SAMPLES_PER_AAC_FRAME / sampleRate;
      const headerSize = header.crcCheck ? MAX_FRAME_HEADER_SIZE : MAX_FRAME_HEADER_SIZE - 2;
      const sample = {
        timestamp: this.nextTimestampInSamples / sampleRate,
        duration: sampleDuration,
        dataStart: startPos + headerSize,
        dataSize: header.frameLength - headerSize
      };
      this.loadedSamples.push(sample);
      this.nextTimestampInSamples += SAMPLES_PER_AAC_FRAME;
      this.reader.pos = startPos + header.frameLength;
    }
  }
  async getMimeType() {
    return "audio/aac";
  }
  async getTracks() {
    await this.readMetadata();
    return this.tracks;
  }
  async computeDuration() {
    await this.readMetadata();
    const track = this.tracks[0];
    assert(track);
    return track.computeDuration();
  }
};
var AdtsAudioTrackBacking = class {
  constructor(demuxer) {
    this.demuxer = demuxer;
  }
  getId() {
    return 1;
  }
  async getFirstTimestamp() {
    return 0;
  }
  getTimeResolution() {
    const sampleRate = this.getSampleRate();
    return sampleRate / SAMPLES_PER_AAC_FRAME;
  }
  async computeDuration() {
    const lastPacket = await this.getPacket(Infinity, { metadataOnly: true });
    return (lastPacket?.timestamp ?? 0) + (lastPacket?.duration ?? 0);
  }
  getName() {
    return null;
  }
  getLanguageCode() {
    return UNDETERMINED_LANGUAGE;
  }
  getCodec() {
    return "aac";
  }
  getInternalCodecId() {
    assert(this.demuxer.firstFrameHeader);
    return this.demuxer.firstFrameHeader.objectType;
  }
  getNumberOfChannels() {
    assert(this.demuxer.firstFrameHeader);
    const numberOfChannels = aacChannelMap[this.demuxer.firstFrameHeader.channelConfiguration];
    assert(numberOfChannels !== void 0);
    return numberOfChannels;
  }
  getSampleRate() {
    assert(this.demuxer.firstFrameHeader);
    const sampleRate = aacFrequencyTable[this.demuxer.firstFrameHeader.samplingFrequencyIndex];
    assert(sampleRate !== void 0);
    return sampleRate;
  }
  async getDecoderConfig() {
    assert(this.demuxer.firstFrameHeader);
    const bytes = new Uint8Array(3);
    const bitstream = new Bitstream(bytes);
    const { objectType, samplingFrequencyIndex, channelConfiguration } = this.demuxer.firstFrameHeader;
    if (objectType > 31) {
      bitstream.writeBits(5, 31);
      bitstream.writeBits(6, objectType - 32);
    } else {
      bitstream.writeBits(5, objectType);
    }
    bitstream.writeBits(4, samplingFrequencyIndex);
    bitstream.writeBits(4, channelConfiguration);
    return {
      codec: `mp4a.40.${this.demuxer.firstFrameHeader.objectType}`,
      numberOfChannels: this.getNumberOfChannels(),
      sampleRate: this.getSampleRate(),
      description: bytes.subarray(0, Math.ceil((bitstream.pos - 1) / 8))
    };
  }
  getPacketAtIndex(sampleIndex, options) {
    if (sampleIndex === -1) {
      return null;
    }
    const rawSample = this.demuxer.loadedSamples[sampleIndex];
    if (!rawSample) {
      return null;
    }
    let data;
    if (options.metadataOnly) {
      data = PLACEHOLDER_DATA;
    } else {
      this.demuxer.reader.pos = rawSample.dataStart;
      data = this.demuxer.reader.readBytes(rawSample.dataSize);
    }
    return new EncodedPacket(data, "key", rawSample.timestamp, rawSample.duration, sampleIndex, rawSample.dataSize);
  }
  async getFirstPacket(options) {
    return this.getPacketAtIndex(0, options);
  }
  async getNextPacket(packet, options) {
    const release = await this.demuxer.readingMutex.acquire();
    try {
      const sampleIndex = binarySearchExact(this.demuxer.loadedSamples, packet.timestamp, (x) => x.timestamp);
      if (sampleIndex === -1) {
        throw new Error("Packet was not created from this track.");
      }
      const nextIndex = sampleIndex + 1;
      while (nextIndex >= this.demuxer.loadedSamples.length && this.demuxer.lastLoadedPos < this.demuxer.fileSize) {
        await this.demuxer.loadNextChunk();
      }
      return this.getPacketAtIndex(nextIndex, options);
    } finally {
      release();
    }
  }
  async getPacket(timestamp, options) {
    const release = await this.demuxer.readingMutex.acquire();
    try {
      while (true) {
        const index = binarySearchLessOrEqual(this.demuxer.loadedSamples, timestamp, (x) => x.timestamp);
        if (index === -1 && this.demuxer.loadedSamples.length > 0) {
          return null;
        }
        if (this.demuxer.lastLoadedPos === this.demuxer.fileSize) {
          return this.getPacketAtIndex(index, options);
        }
        if (index >= 0 && index + 1 < this.demuxer.loadedSamples.length) {
          return this.getPacketAtIndex(index, options);
        }
        await this.demuxer.loadNextChunk();
      }
    } finally {
      release();
    }
  }
  getKeyPacket(timestamp, options) {
    return this.getPacket(timestamp, options);
  }
  getNextKeyPacket(packet, options) {
    return this.getNextPacket(packet, options);
  }
};

// node_modules/mediabunny/dist/modules/src/input-format.js
var InputFormat = class {
};
var IsobmffInputFormat = class extends InputFormat {
  /** @internal */
  async _getMajorBrand(input) {
    const sourceSize = await input._mainReader.source.getSize();
    if (sourceSize < 12) {
      return null;
    }
    const isobmffReader = new IsobmffReader(input._mainReader);
    isobmffReader.pos = 4;
    const fourCc = isobmffReader.readAscii(4);
    if (fourCc !== "ftyp") {
      return null;
    }
    return isobmffReader.readAscii(4);
  }
  /** @internal */
  _createDemuxer(input) {
    return new IsobmffDemuxer(input);
  }
};
var Mp4InputFormat = class extends IsobmffInputFormat {
  /** @internal */
  async _canReadInput(input) {
    const majorBrand = await this._getMajorBrand(input);
    return !!majorBrand && majorBrand !== "qt  ";
  }
  get name() {
    return "MP4";
  }
  get mimeType() {
    return "video/mp4";
  }
};
var QuickTimeInputFormat = class extends IsobmffInputFormat {
  /** @internal */
  async _canReadInput(input) {
    const majorBrand = await this._getMajorBrand(input);
    return majorBrand === "qt  ";
  }
  get name() {
    return "QuickTime File Format";
  }
  get mimeType() {
    return "video/quicktime";
  }
};
function foo() {
  return 5;
}
var MatroskaInputFormat = class extends InputFormat {
  /** @internal */
  async isSupportedEBMLOfDocType(input, desiredDocType) {
    const sourceSize = await input._mainReader.source.getSize();
    if (sourceSize < 8) {
      return false;
    }
    const ebmlReader = new EBMLReader(input._mainReader);
    const varIntSize = ebmlReader.readVarIntSize();
    if (varIntSize === null) {
      return false;
    }
    foo();
    if (varIntSize < 1 || varIntSize > 8) {
      return false;
    }
    const id = ebmlReader.readUnsignedInt(varIntSize);
    if (id !== EBMLId.EBML) {
      return false;
    }
    const dataSize = ebmlReader.readElementSize();
    if (dataSize === null) {
      return false;
    }
    const startPos = ebmlReader.pos;
    while (ebmlReader.pos <= startPos + dataSize - MIN_HEADER_SIZE) {
      const header = ebmlReader.readElementHeader();
      if (!header)
        break;
      const { id: id2, size } = header;
      const dataStartPos = ebmlReader.pos;
      if (size === null)
        return false;
      switch (id2) {
        case EBMLId.EBMLVersion:
          {
            const ebmlVersion = ebmlReader.readUnsignedInt(size);
            if (ebmlVersion !== 1) {
              return false;
            }
          }
          ;
          break;
        case EBMLId.EBMLReadVersion:
          {
            const ebmlReadVersion = ebmlReader.readUnsignedInt(size);
            if (ebmlReadVersion !== 1) {
              return false;
            }
          }
          ;
          break;
        case EBMLId.DocType:
          {
            const docType = ebmlReader.readAsciiString(size);
            if (docType !== desiredDocType) {
              return false;
            }
          }
          ;
          break;
        case EBMLId.DocTypeVersion:
          {
            const docTypeVersion = ebmlReader.readUnsignedInt(size);
            if (docTypeVersion > 4) {
              return false;
            }
          }
          ;
          break;
      }
      ebmlReader.pos = dataStartPos + size;
    }
    return true;
  }
  /** @internal */
  _canReadInput(input) {
    return this.isSupportedEBMLOfDocType(input, "matroska");
  }
  /** @internal */
  _createDemuxer(input) {
    return new MatroskaDemuxer(input);
  }
  get name() {
    return "Matroska";
  }
  get mimeType() {
    return "video/x-matroska";
  }
};
var WebMInputFormat = class extends MatroskaInputFormat {
  /** @internal */
  _canReadInput(input) {
    return this.isSupportedEBMLOfDocType(input, "webm");
  }
  get name() {
    return "WebM";
  }
  get mimeType() {
    return "video/webm";
  }
};
var Mp3InputFormat = class extends InputFormat {
  /** @internal */
  async _canReadInput(input) {
    const sourceSize = await input._mainReader.source.getSize();
    if (sourceSize < 4) {
      return false;
    }
    const mp3Reader = new Mp3Reader(input._mainReader);
    mp3Reader.fileSize = sourceSize;
    const id3Tag = mp3Reader.readId3();
    if (id3Tag) {
      mp3Reader.pos += id3Tag.size;
    }
    const framesStartPos = mp3Reader.pos;
    await mp3Reader.reader.loadRange(mp3Reader.pos, mp3Reader.pos + 4096);
    const firstHeader = mp3Reader.readNextFrameHeader(Math.min(framesStartPos + 4096, sourceSize));
    if (!firstHeader) {
      return false;
    }
    if (id3Tag) {
      return true;
    }
    mp3Reader.pos = firstHeader.startPos + firstHeader.totalSize;
    await mp3Reader.reader.loadRange(mp3Reader.pos, mp3Reader.pos + FRAME_HEADER_SIZE);
    const secondHeader = mp3Reader.readNextFrameHeader(mp3Reader.pos + FRAME_HEADER_SIZE);
    if (!secondHeader) {
      return false;
    }
    if (firstHeader.channel !== secondHeader.channel || firstHeader.sampleRate !== secondHeader.sampleRate) {
      return false;
    }
    return true;
  }
  /** @internal */
  _createDemuxer(input) {
    return new Mp3Demuxer(input);
  }
  get name() {
    return "MP3";
  }
  get mimeType() {
    return "audio/mpeg";
  }
};
var WaveInputFormat = class extends InputFormat {
  /** @internal */
  async _canReadInput(input) {
    const sourceSize = await input._mainReader.source.getSize();
    if (sourceSize < 12) {
      return false;
    }
    const riffReader = new RiffReader(input._mainReader);
    const riffType = riffReader.readAscii(4);
    if (riffType !== "RIFF" && riffType !== "RIFX" && riffType !== "RF64") {
      return false;
    }
    riffReader.pos = 8;
    const format = riffReader.readAscii(4);
    return format === "WAVE";
  }
  /** @internal */
  _createDemuxer(input) {
    return new WaveDemuxer(input);
  }
  get name() {
    return "WAVE";
  }
  get mimeType() {
    return "audio/wav";
  }
};
var OggInputFormat = class extends InputFormat {
  /** @internal */
  async _canReadInput(input) {
    const sourceSize = await input._mainReader.source.getSize();
    if (sourceSize < 4) {
      return false;
    }
    const oggReader = new OggReader(input._mainReader);
    return oggReader.readAscii(4) === "OggS";
  }
  /** @internal */
  _createDemuxer(input) {
    return new OggDemuxer(input);
  }
  get name() {
    return "Ogg";
  }
  get mimeType() {
    return "application/ogg";
  }
};
var AdtsInputFormat = class extends InputFormat {
  /** @internal */
  async _canReadInput(input) {
    const sourceSize = await input._mainReader.source.getSize();
    if (sourceSize < MAX_FRAME_HEADER_SIZE) {
      return false;
    }
    const adtsReader = new AdtsReader(input._mainReader);
    const firstHeader = adtsReader.readFrameHeader();
    if (!firstHeader) {
      return false;
    }
    if (sourceSize < firstHeader.frameLength + MAX_FRAME_HEADER_SIZE) {
      return false;
    }
    adtsReader.pos = firstHeader.frameLength;
    await adtsReader.reader.loadRange(adtsReader.pos, adtsReader.pos + MAX_FRAME_HEADER_SIZE);
    const secondHeader = adtsReader.readFrameHeader();
    if (!secondHeader) {
      return false;
    }
    return firstHeader.objectType === secondHeader.objectType && firstHeader.samplingFrequencyIndex === secondHeader.samplingFrequencyIndex && firstHeader.channelConfiguration === secondHeader.channelConfiguration;
  }
  /** @internal */
  _createDemuxer(input) {
    return new AdtsDemuxer(input);
  }
  get name() {
    return "ADTS";
  }
  get mimeType() {
    return "audio/aac";
  }
};
var MP4 = new Mp4InputFormat();
var QTFF = new QuickTimeInputFormat();
var MATROSKA = new MatroskaInputFormat();
var WEBM = new WebMInputFormat();
var MP3 = new Mp3InputFormat();
var WAVE = new WaveInputFormat();
var OGG = new OggInputFormat();
var ADTS = new AdtsInputFormat();

// node_modules/mediabunny/dist/modules/src/input.js
var Input = class {
  constructor(options) {
    this._demuxerPromise = null;
    this._format = null;
    if (!options || typeof options !== "object") {
      throw new TypeError("options must be an object.");
    }
    if (!Array.isArray(options.formats) || options.formats.some((x) => !(x instanceof InputFormat))) {
      throw new TypeError("options.formats must be an array of InputFormat.");
    }
    if (!(options.source instanceof Source)) {
      throw new TypeError("options.source must be a Source.");
    }
    this._formats = options.formats;
    this._source = options.source;
    this._mainReader = new Reader(options.source);
  }
  /** @internal */
  _getDemuxer() {
    return this._demuxerPromise ??= (async () => {
      await this._mainReader.loadRange(0, 4096);
      for (const format of this._formats) {
        const canRead = await format._canReadInput(this);
        if (canRead) {
          this._format = format;
          return format._createDemuxer(this);
        }
      }
      throw new Error("Input has an unsupported or unrecognizable format.");
    })();
  }
  /**
   * Returns the source from which this input file reads its data. This is the same source that was passed to the
   * constructor.
   */
  get source() {
    return this._source;
  }
  /**
   * Returns the format of the input file. You can compare this result directly to the InputFormat singletons or use
   * `instanceof` checks for subset-aware logic (for example, `format instanceof MatroskaInputFormat` is true for
   * both MKV and WebM).
   */
  async getFormat() {
    await this._getDemuxer();
    assert(this._format);
    return this._format;
  }
  /**
   * Computes the duration of the input file, in seconds. More precisely, returns the largest end timestamp among
   * all tracks.
   */
  async computeDuration() {
    const demuxer = await this._getDemuxer();
    return demuxer.computeDuration();
  }
  /** Returns the list of all tracks of this input file. */
  async getTracks() {
    const demuxer = await this._getDemuxer();
    return demuxer.getTracks();
  }
  /** Returns the list of all video tracks of this input file. */
  async getVideoTracks() {
    const tracks = await this.getTracks();
    return tracks.filter((x) => x.isVideoTrack());
  }
  /** Returns the primary video track of this input file, or null if there are no video tracks. */
  async getPrimaryVideoTrack() {
    const tracks = await this.getTracks();
    return tracks.find((x) => x.isVideoTrack()) ?? null;
  }
  /** Returns the list of all audio tracks of this input file. */
  async getAudioTracks() {
    const tracks = await this.getTracks();
    return tracks.filter((x) => x.isAudioTrack());
  }
  /** Returns the primary audio track of this input file, or null if there are no audio tracks. */
  async getPrimaryAudioTrack() {
    const tracks = await this.getTracks();
    return tracks.find((x) => x.isAudioTrack()) ?? null;
  }
  /** Returns the full MIME type of this input file, including track codecs. */
  async getMimeType() {
    const demuxer = await this._getDemuxer();
    return demuxer.getMimeType();
  }
};

// plugins/GifCaptioner/src/render/video.ts
async function captionMp4(url, width, height, transform) {
  const progress = new ProgressDisplay("Fetching");
  try {
    const res = await BdApi.Net.fetch(url);
    if (!res.ok || !res.headers.get("content-type")?.startsWith("video/")) {
      throw new Error("Failed to fetch video");
    }
    const arrayBuffer = await res.arrayBuffer();
    const input = new Input({
      formats: [WEBM, MP4],
      source: new BufferSource(arrayBuffer)
    });
    const track = await input.getPrimaryVideoTrack();
    if (!track) throw new Error("Video has no track");
    const sampleSink = new VideoSampleSink(track);
    const canvasSink = new CanvasSink(track);
    progress.update("Preparing");
    let frames = await countFrames(sampleSink);
    progress.update("Rendering", 0);
    const renderer = new GifRenderer({ progress, frames, width, height, transform });
    let i = 0;
    for await (const frame of getCanvases(canvasSink)) {
      progress.update("Rendering", i / frames);
      renderer.addVideoFrame(frame.canvas, frame.delay);
      i++;
    }
    renderer.render();
  } catch (e) {
    Api.Logger.error("Failed to caption video", e);
    error("Failed to caption video");
  }
}
var minFrameLength = 1 / 50;
async function countFrames(sink) {
  let time = 0;
  let lastFrameTime = 0;
  let frames = 0;
  for await (const sample of sink.samples()) {
    time += sample.duration;
    let delay = time - lastFrameTime;
    if (delay >= minFrameLength) {
      lastFrameTime = time;
      frames++;
    }
    sample.close();
  }
  return frames;
}
async function* getCanvases(sink) {
  let time = 0;
  let lastFrameTime = 0;
  for await (const sample of sink.canvases()) {
    time += sample.duration;
    let delay = time - lastFrameTime;
    if (delay >= minFrameLength) {
      lastFrameTime = time;
      yield { canvas: sample.canvas, delay };
    }
  }
}

// plugins/GifCaptioner/src/styles.css
addStyle(`.gc-trigger {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: transparent;
  margin: 0;
  padding: 0;
}

.gc-tabs {
  display: flex;
  gap: 5px;
  border-radius: 5px;
  border: 1px solid var(--border-subtle);
  overflow: hidden;
  margin-bottom: 5px;
}

.gc-tabs button {
  color: white;
  padding: 5px 10px;
  border: none;
  flex-grow: 1;
  background-color: transparent;
}

.gc-tabs button.active {
  background-color: var(--background-base-lower);
}

.gc-editor {
  display: flex;
  flex-direction: column;
}

.gc-caption {
  background-color: var(--background-accent);
  color: white;
  border: 1px solid black;
  border-radius: 5px;
  padding: 4px;
}

.gc-range {
  display: flex;
  align-items: center;
  gap: 5px;
  color: white;
  margin: 10px 0;
}

.gc-range input {
  flex-grow: 1;
}

.gc-modal canvas {
  width: 100%;
}

.gc-modal img, .gc-modal video {
  width: 100%;
}

.gc-speechbubbler {
  position: relative;
}

.gc-speechbubbler canvas {
  position: absolute;
  top: 0;
  left: 0;
}`);

// plugins/GifCaptioner/src/render/gif.ts
var import_gifuct_js = __toESM(require_lib2(), 1);
async function captionGif(url, width, height, transform) {
  const progress = new ProgressDisplay("Fetching");
  try {
    const res = await BdApi.Net.fetch(url);
    const buffer = await res.arrayBuffer();
    const parsed = (0, import_gifuct_js.parseGIF)(buffer);
    const frames = (0, import_gifuct_js.decompressFrames)(parsed, true);
    const numFrames = frames.length;
    const renderer = new GifRenderer({ progress, width, height, transform, frames: frames.length });
    let frame;
    let i = 0;
    while (frame = frames.shift()) {
      progress.update("Rendering", i / numFrames);
      renderer.addGifFrame(frame, parsed);
      i++;
      await new Promise((res2) => setTimeout(res2));
    }
    renderer.render();
  } catch (e) {
    Api.Logger.error("Failed to caption gif", e);
    error("Failed to caption gif");
  }
}

// plugins/GifCaptioner/src/ui/captioner.tsx
function Captioner({ width, element, onSubmit: onSubmit2 }) {
  const React = BdApi.React;
  const [text, setText] = React.useState("");
  const [size, setSize] = React.useState(width / 10);
  const input = React.useRef(null);
  const wrapper = React.useRef(null);
  const canvas = React.useRef(null);
  const ctx = React.useRef(null);
  onSubmit2(() => ({
    text,
    size,
    type: "caption"
  }));
  const render = () => {
    if (!canvas.current || !ctx.current) return;
    let lines = getLines(ctx.current, text || "Enter caption...", width);
    let captionHeight = lines.length * size + 10;
    canvas.current.height = captionHeight;
    ctx.current.fillStyle = "white";
    ctx.current.fillRect(0, 0, width, captionHeight);
    ctx.current.textAlign = "center";
    ctx.current.textBaseline = "top";
    ctx.current.font = `${size}px futuraBoldCondensed`;
    ctx.current.fillStyle = "black";
    for (let i = 0; i < lines.length; i++) {
      ctx.current.fillText(lines[i], width / 2, size * i + 5);
    }
  };
  React.useEffect(render, [text, size]);
  React.useEffect(() => {
    setTimeout(() => input.current?.focus(), 100);
    if (!wrapper.current || !canvas.current) return;
    wrapper.current.appendChild(element);
    ctx.current = canvas.current.getContext("2d");
    render();
  }, []);
  return /* @__PURE__ */ BdApi.React.createElement("div", { className: "gc-editor", ref: wrapper }, /* @__PURE__ */ BdApi.React.createElement(
    "input",
    {
      onChange: (e) => setText(e.target.value),
      ref: input,
      className: "gc-caption",
      placeholder: "Enter caption..."
    }
  ), /* @__PURE__ */ BdApi.React.createElement("div", { className: "gc-range" }, /* @__PURE__ */ BdApi.React.createElement("div", null, "Font size"), /* @__PURE__ */ BdApi.React.createElement(
    "input",
    {
      type: "range",
      min: 5,
      max: 200,
      value: size,
      onChange: (e) => setSize(parseFloat(e.target.value))
    }
  )), /* @__PURE__ */ BdApi.React.createElement("canvas", { width, ref: canvas }));
}

// plugins/GifCaptioner/src/ui/speechBubbler.tsx
function SpeechBubbler({ width, height, element, onSubmit: onSubmit2 }) {
  const React = BdApi.React;
  const [tipX, setTipX] = React.useState(width / 3);
  const [tipY, setTipY] = React.useState(height / 3);
  const [tipBase, setTipBase] = React.useState(10);
  const wrapper = React.useRef(null);
  const canvas = React.useRef(null);
  const ctx = React.useRef(null);
  onSubmit2(() => ({
    type: "speechbubble",
    tipX,
    tipY,
    tipBase: tipBase / 100
  }));
  const render = () => {
    if (!ctx.current) return;
    ctx.current.clearRect(0, 0, width, height);
    renderSpeechbubble(ctx.current, width, height, tipX, tipY, tipBase / 100);
  };
  const moveTip = (e) => {
    if (!canvas.current) return;
    const rect = canvas.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width * width;
    const y = (e.clientY - rect.top) / rect.height * height;
    setTipX(x);
    setTipY(y);
  };
  React.useEffect(render, [tipX, tipY, tipBase]);
  React.useEffect(() => {
    if (!wrapper.current || !canvas.current) return;
    wrapper.current.insertBefore(element, canvas.current);
    ctx.current = canvas.current.getContext("2d");
    render();
  }, []);
  return /* @__PURE__ */ BdApi.React.createElement("div", { className: "gc-editor" }, /* @__PURE__ */ BdApi.React.createElement("div", { className: "gc-range" }, /* @__PURE__ */ BdApi.React.createElement("div", null, "Tip Base Position"), /* @__PURE__ */ BdApi.React.createElement(
    "input",
    {
      type: "range",
      min: 0,
      max: 80,
      value: tipBase,
      onChange: (e) => setTipBase(parseFloat(e.target.value))
    }
  )), /* @__PURE__ */ BdApi.React.createElement("div", { className: "gc-speechbubbler", ref: wrapper }, /* @__PURE__ */ BdApi.React.createElement("canvas", { width, height, onClick: moveTip, ref: canvas })));
}

// plugins/GifCaptioner/src/ui/modal.tsx
var tabs = [
  { key: "caption", label: "Caption" },
  { key: "speechbubble", label: "Speech Bubble" }
];
function Modal2({ width, height, element, onSubmit: onSubmit2 }) {
  const React = BdApi.React;
  const [activeTab, setTab] = React.useState(Api.Data.load("tab") || "caption");
  return /* @__PURE__ */ BdApi.React.createElement("div", { className: "gc-modal" }, /* @__PURE__ */ BdApi.React.createElement("div", { className: "gc-tabs" }, tabs.map((tab) => /* @__PURE__ */ BdApi.React.createElement(
    "button",
    {
      key: tab.key,
      onClick: () => setTab(tab.key),
      className: activeTab === tab.key ? "active" : ""
    },
    tab.label
  ))), activeTab === "caption" ? /* @__PURE__ */ BdApi.React.createElement(Captioner, { width, element, onSubmit: onSubmit2 }) : /* @__PURE__ */ BdApi.React.createElement(SpeechBubbler, { width, height, element, onSubmit: onSubmit2 }));
}

// shared/ui/icons.tsx
function CCIcon() {
  return /* @__PURE__ */ BdApi.React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: "30", height: "30" }, /* @__PURE__ */ BdApi.React.createElement("rect", { x: "5", y: "5", width: "14", height: "10", fill: "white" }), /* @__PURE__ */ BdApi.React.createElement("path", { d: "M18,11H16.5V10.5H14.5V13.5H16.5V13H18V14A1,1 0 0,1 17,15H14A1,1 0 0,1 13,14V10A1,1 0 0,1 14,9H17A1,1 0 0,1 18,10M11,11H9.5V10.5H7.5V13.5H9.5V13H11V14A1,1 0 0,1 10,15H7A1,1 0 0,1 6,14V10A1,1 0 0,1 7,9H10A1,1 0 0,1 11,10M19,4H5C3.89,4 3,4.89 3,6V18A2,2 0 0,0 5,20H19A2,2 0 0,0 21,18V6C21,4.89 20.1,4 19,4Z" }));
}

// plugins/GifCaptioner/src/index.ts
addFont(Futura_Condensed_Extra_Bold_default, "futuraBoldCondensed");
after(gifDisplay.prototype, "render", ({ thisVal, returnVal }) => {
  const button = BdApi.React.createElement("button", {
    className: "gc-trigger",
    onClick: (e) => {
      e.stopPropagation();
      const isGif = thisVal.props.format === 1;
      const rawUrl = thisVal.props.src;
      const url = formatUrl(rawUrl);
      Api.Logger.info("URL formatted to", url);
      if (isGif) {
        let image = document.createElement("img");
        image.src = url;
        image.addEventListener("load", () => {
          let { width, height } = image;
          showCaptioner(width, height, image, (transform) => {
            captionGif(url, width, height, transform);
          });
        });
        image.addEventListener("error", () => error("Failed to load gif"));
      } else {
        let video = document.createElement("video");
        video.src = url;
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.load();
        video.addEventListener("canplaythrough", () => {
          let { videoWidth, videoHeight } = video;
          showCaptioner(videoWidth, videoHeight, video, (transform) => {
            captionMp4(url, videoWidth, videoHeight, transform);
          });
        }, { once: true });
        video.addEventListener("error", () => error("Failed to load gif"));
      }
    }
  }, BdApi.React.createElement(CCIcon));
  returnVal.props.children.unshift(button);
});
function showCaptioner(width, height, element, onConfirm) {
  let submitCallback;
  const modal = BdApi.React.createElement(Modal2, {
    width,
    height,
    element,
    onSubmit: (cb) => submitCallback = cb
  });
  BdApi.UI.showConfirmationModal("Edit GIF", modal, {
    onConfirm: () => {
      expressionPicker.close();
      let res = submitCallback?.();
      if (res) onConfirm(res);
    }
  });
}
function formatUrl(rawUrl) {
  const url = new URL(rawUrl, location.href);
  if (url.hostname === "media.discordapp.net") url.hostname = "cdn.discordapp.com";
  url.searchParams.delete("format");
  url.searchParams.delete("animated");
  url.searchParams.delete("width");
  url.searchParams.delete("height");
  url.searchParams.delete("quality");
  if (url.hostname.endsWith("tenor.com")) {
    const path = url.pathname;
    const typeIndex = path.lastIndexOf("/") - 1;
    url.pathname = path.slice(0, typeIndex) + "o" + path.slice(typeIndex + 1);
  }
  return url.toString();
}
  }
}
