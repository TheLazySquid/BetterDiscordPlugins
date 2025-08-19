/**
 * @name GifCaptioner
 * @description A BetterDiscord plugin that allows you to add a caption to discord gifs
 * @version 1.3.0
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
  get: (a, b2) => (typeof require !== "undefined" ? require : a)[b2]
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
    for (var i2 = 0, j2 = 0; i2 < n; ) {
      var c0 = table[base64.charCodeAt(i2++)], c1 = table[base64.charCodeAt(i2++)];
      var c2 = table[base64.charCodeAt(i2++)], c3 = table[base64.charCodeAt(i2++)];
      bytes[j2++] = c0 << 2 | c1 >> 4;
      bytes[j2++] = c1 << 4 | c2 >> 2;
      bytes[j2++] = c2 << 6 | c3;
    }
    return bytes;
  };
})();

// node_modules/gif.js/dist/gif.js
var require_gif = __commonJS({
  "node_modules/gif.js/dist/gif.js"(exports, module) {
    (function(f2) {
      if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = f2();
      } else if (typeof define === "function" && define.amd) {
        define([], f2);
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
        g.GIF = f2();
      }
    })(function() {
      var define2, module2, exports2;
      return function e(t, n, r) {
        function s6(o2, u2) {
          if (!n[o2]) {
            if (!t[o2]) {
              var a = typeof __require == "function" && __require;
              if (!u2 && a) return a(o2, true);
              if (i) return i(o2, true);
              var f2 = new Error("Cannot find module '" + o2 + "'");
              throw f2.code = "MODULE_NOT_FOUND", f2;
            }
            var l = n[o2] = { exports: {} };
            t[o2][0].call(l.exports, function(e2) {
              var n2 = t[o2][1][e2];
              return s6(n2 ? n2 : e2);
            }, l, l.exports, e, t, n, r);
          }
          return n[o2].exports;
        }
        var i = typeof __require == "function" && __require;
        for (var o = 0; o < r.length; o++) s6(r[o]);
        return s6;
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
          var er2, handler, len, args, i, listeners;
          if (!this._events) this._events = {};
          if (type === "error") {
            if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
              er2 = arguments[1];
              if (er2 instanceof Error) {
                throw er2;
              } else {
                var err = new Error('Uncaught, unspecified "error" event. (' + er2 + ")");
                err.context = er2;
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
            var i, j2, numWorkers, ref;
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
              var j3, ref2, results;
              results = [];
              for (i = j3 = 0, ref2 = this.frames.length; 0 <= ref2 ? j3 < ref2 : j3 > ref2; i = 0 <= ref2 ? ++j3 : --j3) {
                results.push(null);
              }
              return results;
            }.call(this);
            numWorkers = this.spawnWorkers();
            if (this.options.globalPalette === true) {
              this.renderNextFrame();
            } else {
              for (i = j2 = 0, ref = numWorkers; 0 <= ref ? j2 < ref : j2 > ref; i = 0 <= ref ? ++j2 : --j2) {
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
            var j2, numWorkers, ref, results;
            numWorkers = Math.min(this.options.workers, this.frames.length);
            (function() {
              results = [];
              for (var j3 = ref = this.freeWorkers.length; ref <= numWorkers ? j3 < numWorkers : j3 > numWorkers; ref <= numWorkers ? j3++ : j3--) {
                results.push(j3);
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
            var i, j2, ref;
            this.log("frame " + frame.index + " finished - " + this.activeWorkers.length + " active");
            this.finishedFrames++;
            this.emit("progress", this.finishedFrames / this.frames.length);
            this.imageParts[frame.index] = frame;
            if (this.options.globalPalette === true) {
              this.options.globalPalette = frame.globalPalette;
              this.log("global palette analyzed");
              if (this.frames.length > 2) {
                for (i = j2 = 1, ref = this.freeWorkers.length; 1 <= ref ? j2 < ref : j2 > ref; i = 1 <= ref ? ++j2 : --j2) {
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
            var data, frame, i, image, j2, k, l, len, len1, len2, len3, offset, page, ref, ref1, ref2;
            len = 0;
            ref = this.imageParts;
            for (j2 = 0, len1 = ref.length; j2 < len1; j2++) {
              frame = ref[j2];
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
    var _2 = require_lib();
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
    var gceSchema = (0, _2.conditional)({
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
    var imageSchema = (0, _2.conditional)({
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
      }, (0, _2.conditional)({
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
    var textSchema = (0, _2.conditional)({
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
    var applicationSchema = (0, _2.conditional)({
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
    var commentSchema = (0, _2.conditional)({
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
      (0, _2.conditional)({
        gct: (0, _uint.readArray)(3, function(stream, result) {
          return Math.pow(2, result.lsd.gct.size + 1);
        })
      }, function(stream, result) {
        return result.lsd.gct.exists;
      }),
      // content frames
      {
        frames: (0, _2.loop)([gceSchema, applicationSchema, commentSchema, imageSchema, textSchema], function(stream) {
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
      var available, clear, code_mask, code_size, end_of_information, in_code, old_code, bits, code, i, datum, data_size, first, top, bi2, pi2;
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
      var datum, bits, count2, first, top, pi2, bi2;
      datum = bits = count2 = first = top = pi2 = bi2 = 0;
      for (i = 0; i < npix; ) {
        if (top === 0) {
          if (bits < code_size) {
            datum += data[bi2] << bits;
            bits += 8;
            bi2++;
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
        dstPixels[pi2++] = pixelStack[top];
        i++;
      }
      for (i = pi2; i < npix; i++) {
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
      return parsedGif.frames.filter(function(f2) {
        return f2.image;
      }).map(function(f2) {
        return decompressFrame(f2, parsedGif.gct, buildImagePatches);
      });
    };
    exports.decompressFrames = decompressFrames2;
  }
});

// assets/Futura Condensed Extra Bold.otf
var Futura_Condensed_Extra_Bold_default = __toBinary("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");

// assets/page-layout-header.svg
var page_layout_header_default = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30"><rect x="5" y="5" width="14" height="10" fill="white"></rect><path d="M18,11H16.5V10.5H14.5V13.5H16.5V13H18V14A1,1 0 0,1 17,15H14A1,1 0 0,1 13,14V10A1,1 0 0,1 14,9H17A1,1 0 0,1 18,10M11,11H9.5V10.5H7.5V13.5H9.5V13H11V14A1,1 0 0,1 10,15H7A1,1 0 0,1 6,14V10A1,1 0 0,1 7,9H10A1,1 0 0,1 11,10M19,4H5C3.89,4 3,4.89 3,6V18A2,2 0 0,0 5,20H19A2,2 0 0,0 21,18V6C21,4.89 20.1,4 19,4Z" /></svg>';

// meta-ns:meta
var pluginName = "GifCaptioner";

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
function expose(key, value) {
  plugin[key] = value;
}

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
  BdApi.UI.showToast(`${pluginName}: ${message}`, { type: "error" });
}

// shared/util/demangle.ts
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

// modules-ns:$shared/modules
var Filters = BdApi.Webpack.Filters;
var [chatbox, CloudUploader, expressionPickerMangled, gifDisplay, ModalSystemMangled, ModalMangled, premiumPermissions] = BdApi.Webpack.getBulk(
  { filter: (m) => {
    let str = m?.type?.render?.toString?.();
    if (!str) return false;
    return str.includes("pendingScheduledMessage") && str.includes(".CHANNEL_TEXT_AREA");
  }, searchExports: true },
  { filter: Filters.byStrings("uploadFileToCloud"), searchExports: true },
  { filter: Filters.bySource("lastActiveView") },
  { filter: Filters.byStrings("renderGIF()", "imagePool"), searchExports: true },
  { filter: Filters.bySource(".modalKey?") },
  { filter: Filters.bySource(".MODAL_ROOT_LEGACY,properties") },
  { filter: Filters.byKeys("getUserMaxFileSize") }
);
var expressionPicker = demangle(expressionPickerMangled, {
  toggle: (f2) => f2.toString().includes("activeView==="),
  close: (f2) => f2.toString().includes("activeView:null"),
  store: (f2) => f2.getState
});
var ModalSystem = demangle(ModalSystemMangled, {
  open: Filters.byStrings(",instant:"),
  close: Filters.byStrings(".onCloseCallback()")
});
var Modal = demangle(ModalMangled, {
  Root: Filters.byStrings(".ImpressionNames.MODAL_ROOT_LEGACY"),
  Content: Filters.byStrings("scrollerRef", "scrollbarType"),
  Header: Filters.byStrings(".header,"),
  Close: Filters.byStrings(".closeWithCircleBackground]:"),
  Footer: Filters.byStrings(".footerSeparator]:")
});

// node_modules/mp4box/dist/mp4box.all.js
var so = Object.defineProperty;
var Vn = (s6, t) => {
  for (var e in t) so(s6, e, { get: t[e], enumerable: true });
};
var j = Math.pow(2, 32);
var jn = 1;
var Kn = 2;
var qn = 4;
var ne = 1;
var oe = 2;
var ae = 8;
var fe = 16;
var le = 32;
var _t = 131072;
var W = 1;
var de = 4;
var Z = 256;
var X = 512;
var J = 1024;
var Q = 2048;
var G = 0;
var w = 1;
var K = class extends ArrayBuffer {
  static fromArrayBuffer(t, e) {
    let i = t;
    return i.fileStart = e, i;
  }
};
var be = ((e) => (e[e.BIG_ENDIAN = 1] = "BIG_ENDIAN", e[e.LITTLE_ENDIAN = 2] = "LITTLE_ENDIAN", e))(be || {});
var E = class s {
  constructor(t, e, i) {
    this._byteLength = 0;
    this.failurePosition = 0;
    this._dynamicSize = 1;
    this._byteOffset = e || 0, t instanceof ArrayBuffer ? this.buffer = K.fromArrayBuffer(t, 0) : t instanceof DataView ? (this.dataView = t, e && (this._byteOffset += e)) : this.buffer = new K(t || 0), this.position = 0, this.endianness = i || 2;
  }
  static {
    this.ENDIANNESS = new Int8Array(new Int16Array([1]).buffer)[0] > 0 ? 2 : 1;
  }
  getPosition() {
    return this.position;
  }
  _realloc(t) {
    if (!this._dynamicSize) return;
    let e = this._byteOffset + this.position + t, i = this._buffer.byteLength;
    if (e <= i) {
      e > this._byteLength && (this._byteLength = e);
      return;
    }
    for (i < 1 && (i = 1); e > i; ) i *= 2;
    let r = new K(i), n = new Uint8Array(this._buffer);
    new Uint8Array(r, 0, n.length).set(n), this.buffer = r, this._byteLength = e;
  }
  _trimAlloc() {
    if (this._byteLength === this._buffer.byteLength) return;
    let t = new K(this._byteLength), e = new Uint8Array(t), i = new Uint8Array(this._buffer, 0, e.length);
    e.set(i), this.buffer = t;
  }
  get byteLength() {
    return this._byteLength - this._byteOffset;
  }
  get buffer() {
    return this._trimAlloc(), this._buffer;
  }
  set buffer(t) {
    this._buffer = t, this._dataView = new DataView(t, this._byteOffset), this._byteLength = t.byteLength;
  }
  get byteOffset() {
    return this._byteOffset;
  }
  set byteOffset(t) {
    this._byteOffset = t, this._dataView = new DataView(this._buffer, this._byteOffset), this._byteLength = this._buffer.byteLength;
  }
  get dataView() {
    return this._dataView;
  }
  set dataView(t) {
    this._byteOffset = t.byteOffset, this._buffer = K.fromArrayBuffer(t.buffer, 0), this._dataView = new DataView(this._buffer, this._byteOffset), this._byteLength = this._byteOffset + t.byteLength;
  }
  seek(t) {
    let e = Math.max(0, Math.min(this.byteLength, t));
    this.position = isNaN(e) || !isFinite(e) ? 0 : e;
  }
  isEof() {
    return this.position >= this._byteLength;
  }
  #e(t) {
    return Array.isArray(t) && t.length === 3 && t[0] === "[]";
  }
  mapUint8Array(t) {
    this._realloc(t * 1);
    let e = new Uint8Array(this._buffer, this.byteOffset + this.position, t);
    return this.position += t * 1, e;
  }
  readInt32Array(t, e) {
    t = t === null ? this.byteLength - this.position / 4 : t;
    let i = new Int32Array(t);
    return s.memcpy(i.buffer, 0, this.buffer, this.byteOffset + this.position, t * i.BYTES_PER_ELEMENT), s.arrayToNative(i, e ?? this.endianness), this.position += i.byteLength, i;
  }
  readInt16Array(t, e) {
    t = t === null ? this.byteLength - this.position / 2 : t;
    let i = new Int16Array(t);
    return s.memcpy(i.buffer, 0, this.buffer, this.byteOffset + this.position, t * i.BYTES_PER_ELEMENT), s.arrayToNative(i, e ?? this.endianness), this.position += i.byteLength, i;
  }
  readInt8Array(t) {
    t = t === null ? this.byteLength - this.position : t;
    let e = new Int8Array(t);
    return s.memcpy(e.buffer, 0, this.buffer, this.byteOffset + this.position, t * e.BYTES_PER_ELEMENT), this.position += e.byteLength, e;
  }
  readUint32Array(t, e) {
    t = t === null ? this.byteLength - this.position / 4 : t;
    let i = new Uint32Array(t);
    return s.memcpy(i.buffer, 0, this.buffer, this.byteOffset + this.position, t * i.BYTES_PER_ELEMENT), s.arrayToNative(i, e ?? this.endianness), this.position += i.byteLength, i;
  }
  readUint16Array(t, e) {
    t = t === null ? this.byteLength - this.position / 2 : t;
    let i = new Uint16Array(t);
    return s.memcpy(i.buffer, 0, this.buffer, this.byteOffset + this.position, t * i.BYTES_PER_ELEMENT), s.arrayToNative(i, e ?? this.endianness), this.position += i.byteLength, i;
  }
  readUint8Array(t) {
    t = t === null ? this.byteLength - this.position : t;
    let e = new Uint8Array(t);
    return s.memcpy(e.buffer, 0, this.buffer, this.byteOffset + this.position, t * e.BYTES_PER_ELEMENT), this.position += e.byteLength, e;
  }
  readFloat64Array(t, e) {
    t = t === null ? this.byteLength - this.position / 8 : t;
    let i = new Float64Array(t);
    return s.memcpy(i.buffer, 0, this.buffer, this.byteOffset + this.position, t * i.BYTES_PER_ELEMENT), s.arrayToNative(i, e ?? this.endianness), this.position += i.byteLength, i;
  }
  readFloat32Array(t, e) {
    t = t === null ? this.byteLength - this.position / 4 : t;
    let i = new Float32Array(t);
    return s.memcpy(i.buffer, 0, this.buffer, this.byteOffset + this.position, t * i.BYTES_PER_ELEMENT), s.arrayToNative(i, e ?? this.endianness), this.position += i.byteLength, i;
  }
  readInt32(t) {
    let e = this._dataView.getInt32(this.position, (t ?? this.endianness) === 2);
    return this.position += 4, e;
  }
  readInt16(t) {
    let e = this._dataView.getInt16(this.position, (t ?? this.endianness) === 2);
    return this.position += 2, e;
  }
  readInt8() {
    let t = this._dataView.getInt8(this.position);
    return this.position += 1, t;
  }
  readUint32(t) {
    let e = this._dataView.getUint32(this.position, (t ?? this.endianness) === 2);
    return this.position += 4, e;
  }
  readUint16(t) {
    let e = this._dataView.getUint16(this.position, (t ?? this.endianness) === 2);
    return this.position += 2, e;
  }
  readUint8() {
    let t = this._dataView.getUint8(this.position);
    return this.position += 1, t;
  }
  readFloat32(t) {
    let e = this._dataView.getFloat32(this.position, (t ?? this.endianness) === 2);
    return this.position += 4, e;
  }
  readFloat64(t) {
    let e = this._dataView.getFloat64(this.position, (t ?? this.endianness) === 2);
    return this.position += 8, e;
  }
  static memcpy(t, e, i, r, n) {
    let o = new Uint8Array(t, e, n), a = new Uint8Array(i, r, n);
    o.set(a);
  }
  static arrayToNative(t, e) {
    return e === s.ENDIANNESS ? t : this.flipArrayEndianness(t);
  }
  static nativeToEndian(t, e) {
    return e && s.ENDIANNESS === 2 ? t : this.flipArrayEndianness(t);
  }
  static flipArrayEndianness(t) {
    let e = new Uint8Array(t.buffer, t.byteOffset, t.byteLength);
    for (let i = 0; i < t.byteLength; i += t.BYTES_PER_ELEMENT) for (let r = i + t.BYTES_PER_ELEMENT - 1, n = i; r > n; r--, n++) {
      let o = e[n];
      e[n] = e[r], e[r] = o;
    }
    return t;
  }
  readString(t, e) {
    return e === null || e === "ASCII" ? Yn(this.mapUint8Array(t === null ? this.byteLength - this.position : t)) : new TextDecoder(e).decode(this.mapUint8Array(t));
  }
  readCString(t) {
    let e = 0, i = this.byteLength - this.position, r = new Uint8Array(this._buffer, this._byteOffset + this.position), n = t !== void 0 ? Math.min(t, i) : i;
    for (; e < n && r[e] !== 0; e++) ;
    let o = Yn(this.mapUint8Array(e));
    return t !== void 0 ? this.position += n - e : e !== i && (this.position += 1), o;
  }
  readInt64() {
    return this.readInt32() * j + this.readUint32();
  }
  readUint64() {
    return this.readUint32() * j + this.readUint32();
  }
  readUint24() {
    return (this.readUint8() << 16) + (this.readUint8() << 8) + this.readUint8();
  }
  save(t) {
    let e = new Blob([this.buffer]);
    if (typeof window < "u" && typeof document < "u") if (window.URL && URL.createObjectURL) {
      let i = window.URL.createObjectURL(e), r = document.createElement("a");
      document.body.appendChild(r), r.setAttribute("href", i), r.setAttribute("download", t), r.setAttribute("target", "_self"), r.click(), window.URL.revokeObjectURL(i), document.body.removeChild(r);
    } else throw new Error("DataStream.save: Can't create object URL.");
    return e;
  }
  get dynamicSize() {
    return this._dynamicSize;
  }
  set dynamicSize(t) {
    t || this._trimAlloc(), this._dynamicSize = t;
  }
  shift(t) {
    let e = new K(this._byteLength - t), i = new Uint8Array(e), r = new Uint8Array(this._buffer, t, i.length);
    i.set(r), this.buffer = e, this.position -= t;
  }
  writeInt32Array(t, e) {
    if (this._realloc(t.length * 4), t instanceof Int32Array && this.byteOffset + this.position % t.BYTES_PER_ELEMENT === 0) s.memcpy(this._buffer, this.byteOffset + this.position, t.buffer, 0, t.byteLength), this.mapInt32Array(t.length, e);
    else for (let i = 0; i < t.length; i++) this.writeInt32(t[i], e);
  }
  writeInt16Array(t, e) {
    if (this._realloc(t.length * 2), t instanceof Int16Array && this.byteOffset + this.position % t.BYTES_PER_ELEMENT === 0) s.memcpy(this._buffer, this.byteOffset + this.position, t.buffer, 0, t.byteLength), this.mapInt16Array(t.length, e);
    else for (let i = 0; i < t.length; i++) this.writeInt16(t[i], e);
  }
  writeInt8Array(t) {
    if (this._realloc(t.length * 1), t instanceof Int8Array && this.byteOffset + this.position % t.BYTES_PER_ELEMENT === 0) s.memcpy(this._buffer, this.byteOffset + this.position, t.buffer, 0, t.byteLength), this.mapInt8Array(t.length);
    else for (let e = 0; e < t.length; e++) this.writeInt8(t[e]);
  }
  writeUint32Array(t, e) {
    if (this._realloc(t.length * 4), t instanceof Uint32Array && this.byteOffset + this.position % t.BYTES_PER_ELEMENT === 0) s.memcpy(this._buffer, this.byteOffset + this.position, t.buffer, 0, t.byteLength), this.mapUint32Array(t.length, e);
    else for (let i = 0; i < t.length; i++) this.writeUint32(t[i], e);
  }
  writeUint16Array(t, e) {
    if (this._realloc(t.length * 2), t instanceof Uint16Array && this.byteOffset + this.position % t.BYTES_PER_ELEMENT === 0) s.memcpy(this._buffer, this.byteOffset + this.position, t.buffer, 0, t.byteLength), this.mapUint16Array(t.length, e);
    else for (let i = 0; i < t.length; i++) this.writeUint16(t[i], e);
  }
  writeUint8Array(t) {
    if (this._realloc(t.length * 1), t instanceof Uint8Array && this.byteOffset + this.position % t.BYTES_PER_ELEMENT === 0) s.memcpy(this._buffer, this.byteOffset + this.position, t.buffer, 0, t.byteLength), this.mapUint8Array(t.length);
    else for (let e = 0; e < t.length; e++) this.writeUint8(t[e]);
  }
  writeFloat64Array(t, e) {
    if (this._realloc(t.length * 8), t instanceof Float64Array && this.byteOffset + this.position % t.BYTES_PER_ELEMENT === 0) s.memcpy(this._buffer, this.byteOffset + this.position, t.buffer, 0, t.byteLength), this.mapFloat64Array(t.length, e);
    else for (let i = 0; i < t.length; i++) this.writeFloat64(t[i], e);
  }
  writeFloat32Array(t, e) {
    if (this._realloc(t.length * 4), t instanceof Float32Array && this.byteOffset + this.position % t.BYTES_PER_ELEMENT === 0) s.memcpy(this._buffer, this.byteOffset + this.position, t.buffer, 0, t.byteLength), this.mapFloat32Array(t.length, e);
    else for (let i = 0; i < t.length; i++) this.writeFloat32(t[i], e);
  }
  writeInt64(t, e) {
    this._realloc(8), this._dataView.setBigInt64(this.position, BigInt(t), (e ?? this.endianness) === 2), this.position += 8;
  }
  writeInt32(t, e) {
    this._realloc(4), this._dataView.setInt32(this.position, t, (e ?? this.endianness) === 2), this.position += 4;
  }
  writeInt16(t, e) {
    this._realloc(2), this._dataView.setInt16(this.position, t, (e ?? this.endianness) === 2), this.position += 2;
  }
  writeInt8(t) {
    this._realloc(1), this._dataView.setInt8(this.position, t), this.position += 1;
  }
  writeUint32(t, e) {
    this._realloc(4), this._dataView.setUint32(this.position, t, (e ?? this.endianness) === 2), this.position += 4;
  }
  writeUint16(t, e) {
    this._realloc(2), this._dataView.setUint16(this.position, t, (e ?? this.endianness) === 2), this.position += 2;
  }
  writeUint8(t) {
    this._realloc(1), this._dataView.setUint8(this.position, t), this.position += 1;
  }
  writeFloat32(t, e) {
    this._realloc(4), this._dataView.setFloat32(this.position, t, (e ?? this.endianness) === 2), this.position += 4;
  }
  writeFloat64(t, e) {
    this._realloc(8), this._dataView.setFloat64(this.position, t, (e ?? this.endianness) === 2), this.position += 8;
  }
  writeUCS2String(t, e, i) {
    i === null && (i = t.length);
    let r;
    for (r = 0; r < t.length && r < i; r++) this.writeUint16(t.charCodeAt(r), e);
    for (; r < i; r++) this.writeUint16(0);
  }
  writeString(t, e, i) {
    let r = 0;
    if (e === null || e === "ASCII") if (i !== null) {
      let n = Math.min(t.length, i);
      for (r = 0; r < n; r++) this.writeUint8(t.charCodeAt(r));
      for (; r < i; r++) this.writeUint8(0);
    } else for (r = 0; r < t.length; r++) this.writeUint8(t.charCodeAt(r));
    else this.writeUint8Array(new TextEncoder(e).encode(t.substring(0, i)));
  }
  writeCString(t, e) {
    let i = 0;
    if (e !== null) {
      let r = Math.min(t.length, e);
      for (i = 0; i < r; i++) this.writeUint8(t.charCodeAt(i));
      for (; i < e; i++) this.writeUint8(0);
    } else {
      for (i = 0; i < t.length; i++) this.writeUint8(t.charCodeAt(i));
      this.writeUint8(0);
    }
  }
  writeStruct(t, e) {
    for (let i = 0; i < t.length; i++) {
      let [r, n] = t[i], o = e[r];
      this.writeType(n, o, e);
    }
  }
  writeType(t, e, i) {
    if (typeof t == "function") return t(this, e);
    if (typeof t == "object" && !(t instanceof Array)) return t.set(this, e, i);
    let r = null, n = "ASCII", o = this.position, a = t;
    if (typeof t == "string" && /:/.test(t)) {
      let l = t.split(":");
      a = l[0], r = parseInt(l[1]);
    }
    if (typeof a == "string" && /,/.test(a)) {
      let l = a.split(",");
      a = l[0], n = l[1];
    }
    switch (a) {
      case "uint8":
        this.writeUint8(e);
        break;
      case "int8":
        this.writeInt8(e);
        break;
      case "uint16":
        this.writeUint16(e, this.endianness);
        break;
      case "int16":
        this.writeInt16(e, this.endianness);
        break;
      case "uint32":
        this.writeUint32(e, this.endianness);
        break;
      case "int32":
        this.writeInt32(e, this.endianness);
        break;
      case "float32":
        this.writeFloat32(e, this.endianness);
        break;
      case "float64":
        this.writeFloat64(e, this.endianness);
        break;
      case "uint16be":
        this.writeUint16(e, 1);
        break;
      case "int16be":
        this.writeInt16(e, 1);
        break;
      case "uint32be":
        this.writeUint32(e, 1);
        break;
      case "int32be":
        this.writeInt32(e, 1);
        break;
      case "float32be":
        this.writeFloat32(e, 1);
        break;
      case "float64be":
        this.writeFloat64(e, 1);
        break;
      case "uint16le":
        this.writeUint16(e, 2);
        break;
      case "int16le":
        this.writeInt16(e, 2);
        break;
      case "uint32le":
        this.writeUint32(e, 2);
        break;
      case "int32le":
        this.writeInt32(e, 2);
        break;
      case "float32le":
        this.writeFloat32(e, 2);
        break;
      case "float64le":
        this.writeFloat64(e, 2);
        break;
      case "cstring":
        this.writeCString(e, r);
        break;
      case "string":
        this.writeString(e, n, r);
        break;
      case "u16string":
        this.writeUCS2String(e, this.endianness, r);
        break;
      case "u16stringle":
        this.writeUCS2String(e, 2, r);
        break;
      case "u16stringbe":
        this.writeUCS2String(e, 1, r);
        break;
      default:
        if (this.#e(a)) {
          let [, l] = a;
          for (let d = 0; d < e.length; d++) this.writeType(l, e[d]);
          break;
        } else {
          this.writeStruct(a, e);
          break;
        }
    }
    r !== null && (this.position = o, this._realloc(r), this.position = o + r);
  }
  writeUint64(t) {
    let e = Math.floor(t / j);
    this.writeUint32(e), this.writeUint32(t & 4294967295);
  }
  writeUint24(t) {
    this.writeUint8((t & 16711680) >> 16), this.writeUint8((t & 65280) >> 8), this.writeUint8(t & 255);
  }
  adjustUint32(t, e) {
    let i = this.position;
    this.seek(t), this.writeUint32(e), this.seek(i);
  }
  readStruct(t) {
    let e = {}, i = this.position;
    for (let r = 0; r < t.length; r += 1) {
      let n = t[r][1], o = this.readType(n, e);
      if (o === null) return this.failurePosition === 0 && (this.failurePosition = this.position), this.position = i, null;
      e[t[r][0]] = o;
    }
    return e;
  }
  readUCS2String(t, e) {
    return String.fromCharCode.apply(null, this.readUint16Array(t, e));
  }
  readType(t, e) {
    if (typeof t == "function") return t(this, e);
    if (typeof t == "object" && !(t instanceof Array)) return t.get(this, e);
    if (t instanceof Array && t.length !== 3) return this.readStruct(t);
    let i = null, r = null, n = "ASCII", o = this.position, a = t;
    if (typeof a == "string" && /:/.test(a)) {
      let l = a.split(":");
      a = l[0], r = parseInt(l[1]);
    }
    if (typeof a == "string" && /,/.test(a)) {
      let l = a.split(",");
      a = l[0], n = l[1];
    }
    switch (a) {
      case "uint8":
        i = this.readUint8();
        break;
      case "int8":
        i = this.readInt8();
        break;
      case "uint16":
        i = this.readUint16(this.endianness);
        break;
      case "int16":
        i = this.readInt16(this.endianness);
        break;
      case "uint32":
        i = this.readUint32(this.endianness);
        break;
      case "int32":
        i = this.readInt32(this.endianness);
        break;
      case "float32":
        i = this.readFloat32(this.endianness);
        break;
      case "float64":
        i = this.readFloat64(this.endianness);
        break;
      case "uint16be":
        i = this.readUint16(1);
        break;
      case "int16be":
        i = this.readInt16(1);
        break;
      case "uint32be":
        i = this.readUint32(1);
        break;
      case "int32be":
        i = this.readInt32(1);
        break;
      case "float32be":
        i = this.readFloat32(1);
        break;
      case "float64be":
        i = this.readFloat64(1);
        break;
      case "uint16le":
        i = this.readUint16(2);
        break;
      case "int16le":
        i = this.readInt16(2);
        break;
      case "uint32le":
        i = this.readUint32(2);
        break;
      case "int32le":
        i = this.readInt32(2);
        break;
      case "float32le":
        i = this.readFloat32(2);
        break;
      case "float64le":
        i = this.readFloat64(2);
        break;
      case "cstring":
        i = this.readCString(r);
        break;
      case "string":
        i = this.readString(r, n);
        break;
      case "u16string":
        i = this.readUCS2String(r, this.endianness);
        break;
      case "u16stringle":
        i = this.readUCS2String(r, 2);
        break;
      case "u16stringbe":
        i = this.readUCS2String(r, 1);
        break;
      default:
        if (this.#e(a)) {
          let [, l, d] = a, p = typeof d == "function" ? d(e, this, a) : typeof d == "string" && e[d] !== null ? parseInt(e[d]) : typeof d == "number" ? d : d === "*" ? null : parseInt(d);
          if (typeof l == "string") {
            let m = l.replace(/(le|be)$/, ""), h;
            switch (/le$/.test(l) ? h = 2 : /be$/.test(l) && (h = 1), m) {
              case "uint8":
                i = this.readUint8Array(p);
                break;
              case "uint16":
                i = this.readUint16Array(p, h);
                break;
              case "uint32":
                i = this.readUint32Array(p, h);
                break;
              case "int8":
                i = this.readInt8Array(p);
                break;
              case "int16":
                i = this.readInt16Array(p, h);
                break;
              case "int32":
                i = this.readInt32Array(p, h);
                break;
              case "float32":
                i = this.readFloat32Array(p, h);
                break;
              case "float64":
                i = this.readFloat64Array(p, h);
                break;
              case "cstring":
              case "utf16string":
              case "string":
                if (p === null) for (i = []; !this.isEof(); ) {
                  let x = this.readType(l, e);
                  if (x === null) break;
                  i.push(x);
                }
                else {
                  i = new Array(p);
                  for (let x = 0; x < p; x++) i[x] = this.readType(l, e);
                }
                break;
            }
          } else if (p === null) for (i = []; ; ) {
            let m = this.position;
            try {
              let h = this.readType(l, e);
              if (h === null) {
                this.position = m;
                break;
              }
              i.push(h);
            } catch {
              this.position = m;
              break;
            }
          }
          else {
            i = new Array(p);
            for (let m = 0; m < p; m++) {
              let h = this.readType(l, e);
              if (h === null) return null;
              i[m] = h;
            }
          }
          break;
        }
    }
    return r !== null && (this.position = o + r), i;
  }
  mapInt32Array(t, e) {
    this._realloc(t * 4);
    let i = new Int32Array(this._buffer, this.byteOffset + this.position, t);
    return s.arrayToNative(i, e ?? this.endianness), this.position += t * 4, i;
  }
  mapInt16Array(t, e) {
    this._realloc(t * 2);
    let i = new Int16Array(this._buffer, this.byteOffset + this.position, t);
    return s.arrayToNative(i, e ?? this.endianness), this.position += t * 2, i;
  }
  mapInt8Array(t, e) {
    this._realloc(t * 1);
    let i = new Int8Array(this._buffer, this.byteOffset + this.position, t);
    return this.position += t * 1, i;
  }
  mapUint32Array(t, e) {
    this._realloc(t * 4);
    let i = new Uint32Array(this._buffer, this.byteOffset + this.position, t);
    return s.arrayToNative(i, e ?? this.endianness), this.position += t * 4, i;
  }
  mapUint16Array(t, e) {
    this._realloc(t * 2);
    let i = new Uint16Array(this._buffer, this.byteOffset + this.position, t);
    return s.arrayToNative(i, e ?? this.endianness), this.position += t * 2, i;
  }
  mapFloat64Array(t, e) {
    this._realloc(t * 8);
    let i = new Float64Array(this._buffer, this.byteOffset + this.position, t);
    return s.arrayToNative(i, e ?? this.endianness), this.position += t * 8, i;
  }
  mapFloat32Array(t, e) {
    this._realloc(t * 4);
    let i = new Float32Array(this._buffer, this.byteOffset + this.position, t);
    return s.arrayToNative(i, e ?? this.endianness), this.position += t * 4, i;
  }
};
function Yn(s6) {
  let t = [];
  for (let e = 0; e < s6.length; e++) t[e] = s6[e];
  return String.fromCharCode.apply(null, t);
}
var et = /* @__PURE__ */ new Date();
var tt = 4;
var $n = 3;
var Wn = 2;
var Zn = 1;
var q = tt;
var u = { setLogLevel(s6) {
  s6 === this.debug ? q = Zn : s6 === this.info ? q = Wn : s6 === this.warn ? q = $n : (this.error, q = tt);
}, debug(s6, t) {
  console.debug === void 0 && (console.debug = console.log), Zn >= q && console.debug("[" + u.getDurationString((/* @__PURE__ */ new Date()).getTime() - et.getTime(), 1e3) + "]", "[" + s6 + "]", t);
}, log(s6, t) {
  this.debug(s6.msg);
}, info(s6, t) {
  Wn >= q && console.info("[" + u.getDurationString((/* @__PURE__ */ new Date()).getTime() - et.getTime(), 1e3) + "]", "[" + s6 + "]", t);
}, warn(s6, t) {
  $n >= q && console.warn("[" + u.getDurationString((/* @__PURE__ */ new Date()).getTime() - et.getTime(), 1e3) + "]", "[" + s6 + "]", t);
}, error(s6, t) {
  tt >= q && console.error("[" + u.getDurationString((/* @__PURE__ */ new Date()).getTime() - et.getTime(), 1e3) + "]", "[" + s6 + "]", t);
}, getDurationString(s6, t) {
  let e;
  function i(d, p) {
    let h = ("" + d).split(".");
    for (; h[0].length < p; ) h[0] = "0" + h[0];
    return h.join(".");
  }
  s6 < 0 ? (e = true, s6 = -s6) : e = false;
  let n = s6 / (t || 1), o = Math.floor(n / 3600);
  n -= o * 3600;
  let a = Math.floor(n / 60);
  n -= a * 60;
  let l = n * 1e3;
  return n = Math.floor(n), l -= n * 1e3, l = Math.floor(l), (e ? "-" : "") + o + ":" + i(a, 2) + ":" + i(n, 2) + "." + i(l, 3);
}, printRanges(s6) {
  let t = s6.length;
  if (t > 0) {
    let e = "";
    for (let i = 0; i < t; i++) i > 0 && (e += ","), e += "[" + u.getDurationString(s6.start(i)) + "," + u.getDurationString(s6.end(i)) + "]";
    return e;
  } else return "(empty)";
} };
function no(s6, t) {
  u.debug("ArrayBuffer", "Trying to create a new buffer of size: " + (s6.byteLength + t.byteLength));
  let e = new Uint8Array(s6.byteLength + t.byteLength);
  return e.set(new Uint8Array(s6), 0), e.set(new Uint8Array(t), s6.byteLength), e.buffer;
}
var ue = class extends E {
  constructor(t) {
    super(new ArrayBuffer(), 0, 1), this.buffers = [], this.bufferIndex = -1, t && (this.insertBuffer(t), this.bufferIndex = 0);
  }
  initialized() {
    if (this.bufferIndex > -1) return true;
    if (this.buffers.length > 0) {
      let t = this.buffers[0];
      return t.fileStart === 0 ? (this.buffer = t, this.bufferIndex = 0, u.debug("MultiBufferStream", "Stream ready for parsing"), true) : (u.warn("MultiBufferStream", "The first buffer should have a fileStart of 0"), this.logBufferLevel(), false);
    } else return u.warn("MultiBufferStream", "No buffer to start parsing from"), this.logBufferLevel(), false;
  }
  reduceBuffer(t, e, i) {
    let r = new Uint8Array(i);
    return r.set(new Uint8Array(t, e, i)), r.buffer.fileStart = t.fileStart + e, r.buffer.usedBytes = 0, r.buffer;
  }
  insertBuffer(t) {
    let e = true, i = 0;
    for (; i < this.buffers.length; i++) {
      let r = this.buffers[i];
      if (t.fileStart <= r.fileStart) {
        if (t.fileStart === r.fileStart) if (t.byteLength > r.byteLength) {
          this.buffers.splice(i, 1), i--;
          continue;
        } else u.warn("MultiBufferStream", "Buffer (fileStart: " + t.fileStart + " - Length: " + t.byteLength + ") already appended, ignoring");
        else t.fileStart + t.byteLength <= r.fileStart || (t = this.reduceBuffer(t, 0, r.fileStart - t.fileStart)), u.debug("MultiBufferStream", "Appending new buffer (fileStart: " + t.fileStart + " - Length: " + t.byteLength + ")"), this.buffers.splice(i, 0, t), i === 0 && (this.buffer = t);
        e = false;
        break;
      } else if (t.fileStart < r.fileStart + r.byteLength) {
        let n = r.fileStart + r.byteLength - t.fileStart, o = t.byteLength - n;
        if (o > 0) t = this.reduceBuffer(t, n, o);
        else {
          e = false;
          break;
        }
      }
    }
    e && (u.debug("MultiBufferStream", "Appending new buffer (fileStart: " + t.fileStart + " - Length: " + t.byteLength + ")"), this.buffers.push(t), i === 0 && (this.buffer = t));
  }
  logBufferLevel(t) {
    let e = [], i = "", r, n = 0, o = 0;
    for (let l = 0; l < this.buffers.length; l++) {
      let d = this.buffers[l];
      l === 0 ? (r = { start: d.fileStart, end: d.fileStart + d.byteLength }, e.push(r), i += "[" + r.start + "-") : r.end === d.fileStart ? r.end = d.fileStart + d.byteLength : (r = { start: d.fileStart, end: d.fileStart + d.byteLength }, i += e[e.length - 1].end - 1 + "], [" + r.start + "-", e.push(r)), n += d.usedBytes, o += d.byteLength;
    }
    e.length > 0 && (i += r.end - 1 + "]");
    let a = t ? u.info : u.debug;
    this.buffers.length === 0 ? a("MultiBufferStream", "No more buffer in memory") : a("MultiBufferStream", "" + this.buffers.length + " stored buffer(s) (" + n + "/" + o + " bytes), continuous ranges: " + i);
  }
  cleanBuffers() {
    for (let t = 0; t < this.buffers.length; t++) {
      let e = this.buffers[t];
      e.usedBytes === e.byteLength && (u.debug("MultiBufferStream", "Removing buffer #" + t), this.buffers.splice(t, 1), t--);
    }
  }
  mergeNextBuffer() {
    if (this.bufferIndex + 1 < this.buffers.length) {
      let t = this.buffers[this.bufferIndex + 1];
      if (t.fileStart === this.buffer.fileStart + this.buffer.byteLength) {
        let e = this.buffer.byteLength, i = this.buffer.usedBytes, r = this.buffer.fileStart;
        return this.buffers[this.bufferIndex] = no(this.buffer, t), this.buffer = this.buffers[this.bufferIndex], this.buffers.splice(this.bufferIndex + 1, 1), this.buffer.usedBytes = i, this.buffer.fileStart = r, u.debug("ISOFile", "Concatenating buffer for box parsing (length: " + e + "->" + this.buffer.byteLength + ")"), true;
      } else return false;
    } else return false;
  }
  findPosition(t, e, i) {
    let r = -1, n = t === true ? 0 : this.bufferIndex;
    for (; n < this.buffers.length; ) {
      let a = this.buffers[n];
      if (a && a.fileStart <= e) r = n, i && (a.fileStart + a.byteLength <= e ? a.usedBytes = a.byteLength : a.usedBytes = e - a.fileStart, this.logBufferLevel());
      else break;
      n++;
    }
    if (r === -1) return -1;
    let o = this.buffers[r];
    return o.fileStart + o.byteLength >= e ? (u.debug("MultiBufferStream", "Found position in existing buffer #" + r), r) : -1;
  }
  findEndContiguousBuf(t) {
    let e = t !== void 0 ? t : this.bufferIndex, i = this.buffers[e];
    if (this.buffers.length > e + 1) for (let r = e + 1; r < this.buffers.length; r++) {
      let n = this.buffers[r];
      if (n.fileStart === i.fileStart + i.byteLength) i = n;
      else break;
    }
    return i.fileStart + i.byteLength;
  }
  getEndFilePositionAfter(t) {
    let e = this.findPosition(true, t, false);
    return e !== -1 ? this.findEndContiguousBuf(e) : t;
  }
  addUsedBytes(t) {
    this.buffer.usedBytes += t, this.logBufferLevel();
  }
  setAllUsedBytes() {
    this.buffer.usedBytes = this.buffer.byteLength, this.logBufferLevel();
  }
  seek(t, e, i) {
    let r = this.findPosition(e, t, i);
    return r !== -1 ? (this.buffer = this.buffers[r], this.bufferIndex = r, this.position = t - this.buffer.fileStart, u.debug("MultiBufferStream", "Repositioning parser at buffer position: " + this.position), true) : (u.debug("MultiBufferStream", "Position " + t + " not found in buffered data"), false);
  }
  getPosition() {
    return this.bufferIndex === -1 || this.buffers[this.bufferIndex] === null ? 0 : this.buffers[this.bufferIndex].fileStart + this.position;
  }
  getLength() {
    return this.byteLength;
  }
  getEndPosition() {
    return this.bufferIndex === -1 || this.buffers[this.bufferIndex] === null ? 0 : this.buffers[this.bufferIndex].fileStart + this.byteLength;
  }
};
var V = class {
  constructor(t) {
    this.position = 0;
    if (t instanceof ArrayBuffer) this.buffer = t, this.dataview = new DataView(t);
    else throw new Error("Needs an array buffer");
  }
  getPosition() {
    return this.position;
  }
  getEndPosition() {
    return this.buffer.byteLength;
  }
  getLength() {
    return this.buffer.byteLength;
  }
  seek(t) {
    let e = Math.max(0, Math.min(this.buffer.byteLength, t));
    return this.position = isNaN(e) || !isFinite(e) ? 0 : e, true;
  }
  isEos() {
    return this.getPosition() >= this.getEndPosition();
  }
  readAnyInt(t, e) {
    let i = 0;
    if (this.position + t <= this.buffer.byteLength) {
      switch (t) {
        case 1:
          e ? i = this.dataview.getInt8(this.position) : i = this.dataview.getUint8(this.position);
          break;
        case 2:
          e ? i = this.dataview.getInt16(this.position) : i = this.dataview.getUint16(this.position);
          break;
        case 3:
          if (e) throw new Error("No method for reading signed 24 bits values");
          i = this.dataview.getUint8(this.position) << 16, i |= this.dataview.getUint8(this.position + 1) << 8, i |= this.dataview.getUint8(this.position + 2);
          break;
        case 4:
          e ? i = this.dataview.getInt32(this.position) : i = this.dataview.getUint32(this.position);
          break;
        case 8:
          if (e) throw new Error("No method for reading signed 64 bits values");
          i = this.dataview.getUint32(this.position) << 32, i |= this.dataview.getUint32(this.position + 4);
          break;
        default:
          throw new Error("readInt method not implemented for size: " + t);
      }
      return this.position += t, i;
    } else throw new Error("Not enough bytes in buffer");
  }
  readUint8() {
    return this.readAnyInt(1, false);
  }
  readUint16() {
    return this.readAnyInt(2, false);
  }
  readUint24() {
    return this.readAnyInt(3, false);
  }
  readUint32() {
    return this.readAnyInt(4, false);
  }
  readUint64() {
    return this.readAnyInt(8, false);
  }
  readString(t) {
    if (this.position + t <= this.buffer.byteLength) {
      let e = "";
      for (let i = 0; i < t; i++) e += String.fromCharCode(this.readUint8());
      return e;
    } else throw new Error("Not enough bytes in buffer");
  }
  readCString() {
    let t = [];
    for (; ; ) {
      let e = this.readUint8();
      if (e !== 0) t.push(e);
      else break;
    }
    return String.fromCharCode.apply(null, t);
  }
  readInt8() {
    return this.readAnyInt(1, true);
  }
  readInt16() {
    return this.readAnyInt(2, true);
  }
  readInt32() {
    return this.readAnyInt(4, true);
  }
  readInt64() {
    return this.readAnyInt(8, false);
  }
  readUint8Array(t) {
    let e = new Uint8Array(t);
    for (let i = 0; i < t; i++) e[i] = this.readUint8();
    return e;
  }
  readInt16Array(t) {
    let e = new Int16Array(t);
    for (let i = 0; i < t; i++) e[i] = this.readInt16();
    return e;
  }
  readUint16Array(t) {
    let e = new Int16Array(t);
    for (let i = 0; i < t; i++) e[i] = this.readUint16();
    return e;
  }
  readUint32Array(t) {
    let e = new Uint32Array(t);
    for (let i = 0; i < t; i++) e[i] = this.readUint32();
    return e;
  }
  readInt32Array(t) {
    let e = new Int32Array(t);
    for (let i = 0; i < t; i++) e[i] = this.readInt32();
    return e;
  }
};
var c = class {
  constructor(t = 0) {
    this.size = t;
  }
  static {
    this.registryId = Symbol.for("BoxIdentifier");
  }
  #e;
  get type() {
    return this.constructor.fourcc ?? this.#e;
  }
  set type(t) {
    this.#e = t;
  }
  addBox(t) {
    return this.boxes || (this.boxes = []), this.boxes.push(t), this[t.type + "s"] ? this[t.type + "s"].push(t) : this[t.type] = t, t;
  }
  set(t, e) {
    return this[t] = e, this;
  }
  addEntry(t, e) {
    let i = e || "entries";
    return this[i] || (this[i] = []), this[i].push(t), this;
  }
  writeHeader(t, e) {
    this.size += 8, this.size > j && (this.size += 8), this.type === "uuid" && (this.size += 16), u.debug("BoxWriter", "Writing box " + this.type + " of size: " + this.size + " at position " + t.getPosition() + (e || "")), this.size > j ? t.writeUint32(1) : (this.sizePosition = t.getPosition(), t.writeUint32(this.size)), t.writeString(this.type, null, 4), this.type === "uuid" && t.writeUint8Array(this.uuid), this.size > j && t.writeUint64(this.size);
  }
  write(t) {
    this.type === "mdat" ? this.data && (this.size = this.data.length, this.writeHeader(t), t.writeUint8Array(this.data)) : (this.size = this.data ? this.data.length : 0, this.writeHeader(t), this.data && t.writeUint8Array(this.data));
  }
  printHeader(t) {
    this.size += 8, this.size > j && (this.size += 8), this.type === "uuid" && (this.size += 16), t.log(t.indent + "size:" + this.size), t.log(t.indent + "type:" + this.type);
  }
  print(t) {
    this.printHeader(t);
  }
  parse(t) {
    this.type !== "mdat" ? this.data = t.readUint8Array(this.size - this.hdr_size) : this.size === 0 ? t.seek(t.getEndPosition()) : t.seek(this.start + this.size);
  }
  parseDataAndRewind(t) {
    this.data = t.readUint8Array(this.size - this.hdr_size), t.seek(this.start + this.hdr_size);
  }
  parseLanguage(t) {
    this.language = t.readUint16();
    let e = [];
    e[0] = this.language >> 10 & 31, e[1] = this.language >> 5 & 31, e[2] = this.language & 31, this.languageString = String.fromCharCode(e[0] + 96, e[1] + 96, e[2] + 96);
  }
  computeSize(t) {
    let e = t || new ue();
    e.endianness = 1, this.write(e);
  }
  isEndOfBox(t) {
    let e = t.getPosition(), i = this.start + this.size;
    return e === i;
  }
};
var f = class extends c {
  constructor() {
    super(...arguments);
    this.flags = 0;
    this.version = 0;
  }
  writeHeader(e) {
    this.size += 4, super.writeHeader(e, " v=" + this.version + " f=" + this.flags), e.writeUint8(this.version), e.writeUint24(this.flags);
  }
  printHeader(e) {
    this.size += 4, super.printHeader(e), e.log(e.indent + "version:" + this.version), e.log(e.indent + "flags:" + this.flags);
  }
  parseDataAndRewind(e) {
    this.parseFullHeader(e), this.data = e.readUint8Array(this.size - this.hdr_size), this.hdr_size -= 4, e.seek(this.start + this.hdr_size);
  }
  parseFullHeader(e) {
    this.version = e.readUint8(), this.flags = e.readUint24(), this.hdr_size += 4;
  }
  parse(e) {
    this.parseFullHeader(e), this.data = e.readUint8Array(this.size - this.hdr_size);
  }
};
var _ = class {
  constructor(t) {
    this.grouping_type = t;
  }
  static {
    this.registryId = Symbol.for("SampleGroupEntryIdentifier");
  }
  write(t) {
    t.writeUint8Array(this.data);
  }
  parse(t) {
    u.warn("BoxParser", `Unknown sample group type: '${this.grouping_type}'`), this.data = t.readUint8Array(this.description_length);
  }
};
var it = class extends f {
  parse(t) {
    this.parseFullHeader(t), this.track_group_id = t.readUint32();
  }
};
var rt = class extends c {
  constructor(e, i, r, n, o) {
    super(i);
    this.box_name = r;
    this.hdr_size = n;
    this.start = o;
    this.type = e;
  }
  parse(e) {
    this.from_item_ID = e.readUint16();
    let i = e.readUint16();
    this.references = [];
    for (let r = 0; r < i; r++) this.references[r] = { to_item_ID: e.readUint16() };
  }
};
var st = class extends c {
  constructor(e, i, r, n, o) {
    super(i);
    this.box_name = r;
    this.hdr_size = n;
    this.start = o;
    this.type = e;
  }
  parse(e) {
    this.from_item_ID = e.readUint32();
    let i = e.readUint16();
    this.references = [];
    for (let r = 0; r < i; r++) this.references[r] = { to_item_ID: e.readUint32() };
  }
};
var nt = class extends c {
  constructor(e, i, r, n) {
    super(i);
    this.hdr_size = r;
    this.start = n;
    this.type = e;
  }
  parse(e) {
    this.track_ids = e.readUint32Array((this.size - this.hdr_size) / 4);
  }
  write(e) {
    this.size = this.track_ids.length * 4, this.writeHeader(e), e.writeUint32Array(this.track_ids);
  }
};
var xt = ["boxes", "entries", "references", "subsamples", "items", "item_infos", "extents", "associations", "subsegments", "ranges", "seekLists", "seekPoints", "esd", "levels"];
var oo = ["compatible_brands", "matrix", "opcolor", "sample_counts", "sample_deltas", "first_chunk", "samples_per_chunk", "sample_sizes", "chunk_offsets", "sample_offsets", "sample_description_index", "sample_duration"];
function ao(s6, t) {
  if (s6 && !t) return false;
  let e;
  for (e in s6) if (!xt.find((i) => i === e)) {
    if (s6[e] instanceof c || t[e] instanceof c) continue;
    if (typeof s6[e] > "u" || typeof t[e] > "u") continue;
    if (typeof s6[e] == "function" || typeof t[e] == "function") continue;
    if ("subBoxNames" in s6 && s6.subBoxNames.indexOf(e.slice(0, 4)) > -1 || "subBoxNames" in t && t.subBoxNames.indexOf(e.slice(0, 4)) > -1) continue;
    if (e === "data" || e === "start" || e === "size" || e === "creation_time" || e === "modification_time") continue;
    if (oo.find((i) => i === e)) continue;
    if (s6[e] !== t[e]) return false;
  }
  return true;
}
function bt(s6, t) {
  if (!ao(s6, t)) return false;
  for (let e = 0; e < xt.length; e++) {
    let i = xt[e];
    if (s6[i] && t[i] && !bt(s6[i], t[i])) return false;
  }
  return true;
}
function yt(s6) {
  let t = s6;
  for (; t; ) {
    if ("registryId" in t) return t.registryId;
    t = Object.getPrototypeOf(t);
  }
}
var fo = (s6) => {
  let t = Symbol.for("SampleGroupEntryIdentifier");
  return yt(s6) === t;
};
var lo = (s6) => {
  let t = Symbol.for("SampleEntryIdentifier");
  return yt(s6) === t;
};
var uo = (s6) => {
  let t = Symbol.for("BoxIdentifier");
  return yt(s6) === t;
};
var v = { uuid: {}, sampleEntry: {}, sampleGroupEntry: {}, box: {} };
function Xn(s6) {
  for (let [t, e] of Object.entries(s6)) {
    if (fo(e)) {
      let i = "grouping_type" in e ? e.grouping_type : void 0;
      if (!i) throw new Error(`SampleGroupEntry class ${t} does not have a valid static grouping_type. Please ensure it is defined correctly.`);
      if (i in v.sampleGroupEntry) throw new Error(`SampleGroupEntry class ${t} has a grouping_type that is already registered. Please ensure it is unique.`);
      v.sampleGroupEntry[i] = e;
      continue;
    }
    if (lo(e)) {
      let i = "fourcc" in e ? e.fourcc : void 0;
      if (!i) throw new Error(`SampleEntry class ${t} does not have a valid static fourcc. Please ensure it is defined correctly.`);
      if (i in v.sampleEntry) throw new Error(`SampleEntry class ${t} has a fourcc that is already registered. Please ensure it is unique.`);
      v.sampleEntry[i] = e;
      continue;
    }
    if (uo(e)) {
      let i = "fourcc" in e ? e.fourcc : null, r = "uuid" in e ? e.uuid : null;
      if (i === "uuid") {
        if (!r) throw new Error(`Box class ${t} has a fourcc of 'uuid' but does not have a valid uuid. Please ensure it is defined correctly.`);
        if (r in v.uuid) throw new Error(`Box class ${t} has a uuid that is already registered. Please ensure it is unique.`);
        v.uuid[r] = e;
        continue;
      }
      v.box[i] = e;
      continue;
    }
    throw new Error(`Box class ${t} does not have a valid static fourcc, uuid, or grouping_type. Please ensure it is defined correctly.`);
  }
  return s6;
}
var ot = {};
function Jn(s6) {
  return Object.entries(s6).forEach(([t, e]) => ot[t] = e), s6;
}
function co(s6) {
  return R(s6);
}
function R(s6) {
  let t = "";
  for (let e = 0; e < 16; e++) {
    let i = s6.readUint8().toString(16);
    t += i.length === 1 ? "0" + i : i;
  }
  return t;
}
function A(s6, t, e) {
  let i, r = s6.getPosition(), n = 0, o;
  if (s6.getEndPosition() - r < 8) return u.debug("BoxParser", "Not enough data in stream to parse the type and size of the box"), { code: G };
  if (e && e < 8) return u.debug("BoxParser", "Not enough bytes left in the parent box to parse a new box"), { code: G };
  let a = s6.readUint32(), l = s6.readString(4), d = l;
  if (u.debug("BoxParser", "Found box of type '" + l + "' and size " + a + " at position " + r), n = 8, l === "uuid") {
    if (s6.getEndPosition() - s6.getPosition() < 16 || e - n < 16) return s6.seek(r), u.debug("BoxParser", "Not enough bytes left in the parent box to parse a UUID box"), { code: G };
    o = co(s6), n += 16, d = o;
  }
  if (a === 1) {
    if (s6.getEndPosition() - s6.getPosition() < 8 || e && e - n < 8) return s6.seek(r), u.warn("BoxParser", 'Not enough data in stream to parse the extended size of the "' + l + '" box'), { code: G };
    a = s6.readUint64(), n += 8;
  } else if (a === 0) {
    if (e) a = e;
    else if (l !== "mdat") return u.error("BoxParser", "Unlimited box size not supported for type: '" + l + "'"), i = new c(a), i.type = l, { code: w, box: i, size: i.size };
  }
  if (a !== 0 && a < n) return u.error("BoxParser", "Box of type " + l + " has an invalid size " + a + " (too small to be a box)"), { code: G, type: l, size: a, hdr_size: n, start: r };
  if (a !== 0 && e && a > e) return u.error("BoxParser", "Box of type '" + l + "' has a size " + a + " greater than its container size " + e), { code: G, type: l, size: a, hdr_size: n, start: r };
  if (a !== 0 && r + a > s6.getEndPosition()) return s6.seek(r), u.info("BoxParser", "Not enough data in stream to parse the entire '" + l + "' box"), { code: G, type: l, size: a, hdr_size: n, start: r };
  if (t) return { code: w, type: l, size: a, hdr_size: n, start: r };
  l in v.box ? i = new v.box[l](a) : l !== "uuid" ? (u.warn("BoxParser", `Unknown box type: '${l}'`), i = new c(a), i.type = l, i.has_unparsed_data = true) : o in v.uuid ? i = new v.uuid[o](a) : (u.warn("BoxParser", `Unknown UUID box type: '${o}'`), i = new c(a), i.type = l, i.uuid = o, i.has_unparsed_data = true), i.hdr_size = n, i.start = r, i.write === c.prototype.write && i.type !== "mdat" && (u.info("BoxParser", "'" + d + "' box writing not yet implemented, keeping unparsed data in memory for later write"), i.parseDataAndRewind(s6)), i.parse(s6);
  let p = s6.getPosition() - (i.start + i.size);
  return p < 0 ? (u.warn("BoxParser", "Parsing of box '" + d + "' did not read the entire indicated box data size (missing " + -p + " bytes), seeking forward"), s6.seek(i.start + i.size)) : p > 0 && i.size !== 0 && (u.error("BoxParser", "Parsing of box '" + d + "' read " + p + " more bytes than the indicated box data size, seeking backwards"), s6.seek(i.start + i.size)), { code: w, box: i, size: i.size };
}
var b = class extends c {
  write(t) {
    if (this.size = 0, this.writeHeader(t), this.boxes) for (let e = 0; e < this.boxes.length; e++) this.boxes[e] && (this.boxes[e].write(t), this.size += this.boxes[e].size);
    u.debug("BoxWriter", "Adjusting box " + this.type + " with new size " + this.size), t.adjustUint32(this.sizePosition, this.size);
  }
  print(t) {
    this.printHeader(t);
    for (let e = 0; e < this.boxes.length; e++) if (this.boxes[e]) {
      let i = t.indent;
      t.indent += " ", this.boxes[e].print(t), t.indent = i;
    }
  }
  parse(t) {
    let e;
    for (; t.getPosition() < this.start + this.size; ) if (e = A(t, false, this.size - (t.getPosition() - this.start)), e.code === w) {
      let i = e.box;
      if (this.boxes || (this.boxes = []), this.boxes.push(i), this.subBoxNames && this.subBoxNames.indexOf(i.type) !== -1) {
        let r = this.subBoxNames[this.subBoxNames.indexOf(i.type)] + "s";
        this[r] || (this[r] = []), this[r].push(i);
      } else {
        let r = i.type !== "uuid" ? i.type : i.uuid;
        this[r] ? u.warn("ContainerBox", `Box of type ${r} already exists in container box ${this.type}.`) : this[r] = i;
      }
    } else return;
  }
};
var N = class extends b {
  constructor(e, i, r) {
    super(e);
    this.hdr_size = i;
    this.start = r;
  }
  static {
    this.registryId = Symbol.for("SampleEntryIdentifier");
  }
  isVideo() {
    return false;
  }
  isAudio() {
    return false;
  }
  isSubtitle() {
    return false;
  }
  isMetadata() {
    return false;
  }
  isHint() {
    return false;
  }
  getCodec() {
    return this.type.replace(".", "");
  }
  getWidth() {
    return "";
  }
  getHeight() {
    return "";
  }
  getChannelCount() {
    return "";
  }
  getSampleRate() {
    return "";
  }
  getSampleSize() {
    return "";
  }
  parseHeader(e) {
    e.readUint8Array(6), this.data_reference_index = e.readUint16(), this.hdr_size += 8;
  }
  parse(e) {
    this.parseHeader(e), this.data = e.readUint8Array(this.size - this.hdr_size);
  }
  parseDataAndRewind(e) {
    this.parseHeader(e), this.data = e.readUint8Array(this.size - this.hdr_size), this.hdr_size -= 8, e.seek(this.start + this.hdr_size);
  }
  parseFooter(e) {
    super.parse(e);
  }
  writeHeader(e) {
    this.size = 8, super.writeHeader(e), e.writeUint8(0), e.writeUint8(0), e.writeUint8(0), e.writeUint8(0), e.writeUint8(0), e.writeUint8(0), e.writeUint16(this.data_reference_index);
  }
  writeFooter(e) {
    if (this.boxes) for (let i = 0; i < this.boxes.length; i++) this.boxes[i].write(e), this.size += this.boxes[i].size;
    u.debug("BoxWriter", "Adjusting box " + this.type + " with new size " + this.size), e.adjustUint32(this.sizePosition, this.size);
  }
  write(e) {
    this.writeHeader(e), e.writeUint8Array(this.data), this.size += this.data.length, u.debug("BoxWriter", "Adjusting box " + this.type + " with new size " + this.size), e.adjustUint32(this.sizePosition, this.size);
  }
};
var ye = class extends N {
};
var D = class extends N {
  isMetadata() {
    return true;
  }
};
var F = class extends N {
  isSubtitle() {
    return true;
  }
};
var at = class extends N {
};
var S = class extends N {
  parse(t) {
    this.parseHeader(t), t.readUint16(), t.readUint16(), t.readUint32Array(3), this.width = t.readUint16(), this.height = t.readUint16(), this.horizresolution = t.readUint32(), this.vertresolution = t.readUint32(), t.readUint32(), this.frame_count = t.readUint16();
    let e = Math.min(31, t.readUint8());
    this.compressorname = t.readString(e), e < 31 && t.readString(31 - e), this.depth = t.readUint16(), t.readUint16(), this.parseFooter(t);
  }
  isVideo() {
    return true;
  }
  getWidth() {
    return this.width;
  }
  getHeight() {
    return this.height;
  }
  write(t) {
    this.writeHeader(t), this.size += 2 * 7 + 6 * 4 + 32, t.writeUint16(0), t.writeUint16(0), t.writeUint32(0), t.writeUint32(0), t.writeUint32(0), t.writeUint16(this.width), t.writeUint16(this.height), t.writeUint32(this.horizresolution), t.writeUint32(this.vertresolution), t.writeUint32(0), t.writeUint16(this.frame_count), t.writeUint8(Math.min(31, this.compressorname.length)), t.writeString(this.compressorname, null, 31), t.writeUint16(this.depth), t.writeInt16(-1), this.writeFooter(t);
  }
};
var I = class extends N {
  parse(t) {
    this.parseHeader(t), t.readUint32Array(2), this.channel_count = t.readUint16(), this.samplesize = t.readUint16(), t.readUint16(), t.readUint16(), this.samplerate = t.readUint32() / 65536, this.parseFooter(t);
  }
  isAudio() {
    return true;
  }
  getChannelCount() {
    return this.channel_count;
  }
  getSampleRate() {
    return this.samplerate;
  }
  getSampleSize() {
    return this.samplesize;
  }
  write(t) {
    this.writeHeader(t), this.size += 2 * 4 + 3 * 4, t.writeUint32(0), t.writeUint32(0), t.writeUint16(this.channel_count), t.writeUint16(this.samplesize), t.writeUint16(0), t.writeUint16(0), t.writeUint32(this.samplerate << 16), this.writeFooter(t);
  }
};
var ee = class extends N {
  parse(t) {
    this.parseHeader(t), this.parseFooter(t);
  }
  write(t) {
    this.writeHeader(t), this.writeFooter(t);
  }
};
var ge = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "AVCConfigurationBox";
  }
  static {
    this.fourcc = "avcC";
  }
  parse(e) {
    this.configurationVersion = e.readUint8(), this.AVCProfileIndication = e.readUint8(), this.profile_compatibility = e.readUint8(), this.AVCLevelIndication = e.readUint8(), this.lengthSizeMinusOne = e.readUint8() & 3, this.nb_SPS_nalus = e.readUint8() & 31;
    let i = this.size - this.hdr_size - 6;
    this.SPS = [];
    for (let r = 0; r < this.nb_SPS_nalus; r++) {
      let n = e.readUint16();
      this.SPS[r] = { length: n, data: e.readUint8Array(n) }, i -= 2 + n;
    }
    this.nb_PPS_nalus = e.readUint8(), i--, this.PPS = [];
    for (let r = 0; r < this.nb_PPS_nalus; r++) {
      let n = e.readUint16();
      this.PPS[r] = { length: n, data: e.readUint8Array(n) }, i -= 2 + n;
    }
    i > 0 && (this.ext = e.readUint8Array(i));
  }
  write(e) {
    this.size = 7;
    for (let i = 0; i < this.SPS.length; i++) this.size += 2 + this.SPS[i].length;
    for (let i = 0; i < this.PPS.length; i++) this.size += 2 + this.PPS[i].length;
    this.ext && (this.size += this.ext.length), this.writeHeader(e), e.writeUint8(this.configurationVersion), e.writeUint8(this.AVCProfileIndication), e.writeUint8(this.profile_compatibility), e.writeUint8(this.AVCLevelIndication), e.writeUint8(this.lengthSizeMinusOne + 252), e.writeUint8(this.SPS.length + 224);
    for (let i = 0; i < this.SPS.length; i++) e.writeUint16(this.SPS[i].length), e.writeUint8Array(this.SPS[i].data);
    e.writeUint8(this.PPS.length);
    for (let i = 0; i < this.PPS.length; i++) e.writeUint16(this.PPS[i].length), e.writeUint8Array(this.PPS[i].data);
    this.ext && e.writeUint8Array(this.ext);
  }
};
var te = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "MediaDataBox";
  }
  static {
    this.fourcc = "mdat";
  }
};
var gt = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "ItemDataBox";
  }
  static {
    this.fourcc = "idat";
  }
};
var St = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "FreeSpaceBox";
  }
  static {
    this.fourcc = "free";
  }
};
var Bt = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "FreeSpaceBox";
  }
  static {
    this.fourcc = "skip";
  }
};
var Se = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "HintMediaHeaderBox";
  }
  static {
    this.fourcc = "hmhd";
  }
};
var ie = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "NullMediaHeaderBox";
  }
  static {
    this.fourcc = "nmhd";
  }
};
var Ut = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "ObjectDescriptorBox";
  }
  static {
    this.fourcc = "iods";
  }
};
var wt = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "XMLBox";
  }
  static {
    this.fourcc = "xml ";
  }
};
var vt = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "BinaryXMLBox";
  }
  static {
    this.fourcc = "bxml";
  }
};
var At = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "ItemProtectionBox";
    this.sinfs = [];
  }
  static {
    this.fourcc = "ipro";
  }
  get protections() {
    return this.sinfs;
  }
};
var ce = class extends b {
  constructor() {
    super(...arguments);
    this.box_name = "MovieBox";
    this.traks = [];
    this.psshs = [];
    this.subBoxNames = ["trak", "pssh"];
  }
  static {
    this.fourcc = "moov";
  }
};
var Be = class extends b {
  constructor() {
    super(...arguments);
    this.box_name = "TrackBox";
  }
  static {
    this.fourcc = "trak";
  }
};
var Mt = class extends b {
  constructor() {
    super(...arguments);
    this.box_name = "EditBox";
  }
  static {
    this.fourcc = "edts";
  }
};
var Ue = class extends b {
  constructor() {
    super(...arguments);
    this.box_name = "MediaBox";
  }
  static {
    this.fourcc = "mdia";
  }
};
var we = class extends b {
  constructor() {
    super(...arguments);
    this.box_name = "MediaInformationBox";
  }
  static {
    this.fourcc = "minf";
  }
};
var ve = class extends b {
  constructor() {
    super(...arguments);
    this.box_name = "DataInformationBox";
  }
  static {
    this.fourcc = "dinf";
  }
};
var Ae = class extends b {
  constructor() {
    super(...arguments);
    this.box_name = "SampleTableBox";
    this.sgpds = [];
    this.sbgps = [];
    this.subBoxNames = ["sgpd", "sbgp"];
  }
  static {
    this.fourcc = "stbl";
  }
};
var pe = class extends b {
  constructor() {
    super(...arguments);
    this.box_name = "MovieExtendsBox";
    this.trexs = [];
    this.subBoxNames = ["trex"];
  }
  static {
    this.fourcc = "mvex";
  }
};
var Me = class extends b {
  constructor() {
    super(...arguments);
    this.box_name = "MovieFragmentBox";
    this.trafs = [];
    this.subBoxNames = ["traf"];
  }
  static {
    this.fourcc = "moof";
  }
};
var Ie = class extends b {
  constructor() {
    super(...arguments);
    this.box_name = "TrackFragmentBox";
    this.truns = [];
    this.sgpds = [];
    this.sbgps = [];
    this.subBoxNames = ["trun", "sgpd", "sbgp"];
  }
  static {
    this.fourcc = "traf";
  }
};
var It = class extends b {
  constructor() {
    super(...arguments);
    this.box_name = "VTTCueBox";
  }
  static {
    this.fourcc = "vttc";
  }
};
var zt = class extends b {
  constructor() {
    super(...arguments);
    this.box_name = "MovieFragmentRandomAccessBox";
    this.tfras = [];
    this.subBoxNames = ["tfra"];
  }
  static {
    this.fourcc = "mfra";
  }
};
var kt = class extends b {
  constructor() {
    super(...arguments);
    this.box_name = "AdditionalMetadataContainerBox";
  }
  static {
    this.fourcc = "meco";
  }
};
var Tt = class extends b {
  constructor() {
    super(...arguments);
    this.box_name = "trackhintinformation";
    this.subBoxNames = ["sdp ", "rtp "];
  }
  static {
    this.fourcc = "hnti";
  }
};
var Et = class extends b {
  constructor() {
    super(...arguments);
    this.box_name = "hintstatisticsbox";
    this.maxrs = [];
    this.subBoxNames = ["maxr"];
  }
  static {
    this.fourcc = "hinf";
  }
};
var Ft = class extends b {
  constructor() {
    super(...arguments);
    this.box_name = "SubTrackBox";
  }
  static {
    this.fourcc = "strk";
  }
};
var Lt = class extends b {
  constructor() {
    super(...arguments);
    this.box_name = "SubTrackDefinitionBox";
  }
  static {
    this.fourcc = "strd";
  }
};
var Dt = class extends b {
  constructor() {
    super(...arguments);
    this.box_name = "ProtectionSchemeInfoBox";
  }
  static {
    this.fourcc = "sinf";
  }
};
var Pt = class extends b {
  constructor() {
    super(...arguments);
    this.box_name = "RestrictedSchemeInfoBox";
  }
  static {
    this.fourcc = "rinf";
  }
};
var Ct = class extends b {
  constructor() {
    super(...arguments);
    this.box_name = "SchemeInformationBox";
  }
  static {
    this.fourcc = "schi";
  }
};
var Nt = class extends b {
  constructor() {
    super(...arguments);
    this.box_name = "TrackGroupBox";
  }
  static {
    this.fourcc = "trgr";
  }
};
var Rt = class extends b {
  constructor() {
    super(...arguments);
    this.box_name = "UserDataBox";
    this.kinds = [];
    this.strks = [];
    this.subBoxNames = ["kind", "strk"];
  }
  static {
    this.fourcc = "udta";
  }
};
var Ot = class extends b {
  constructor() {
    super(...arguments);
    this.box_name = "ItemPropertiesBox";
    this.ipmas = [];
    this.subBoxNames = ["ipma"];
  }
  static {
    this.fourcc = "iprp";
  }
};
var Ht = class extends b {
  constructor() {
    super(...arguments);
    this.box_name = "ItemPropertyContainerBox";
    this.hvcCs = [];
    this.ispes = [];
    this.claps = [];
    this.irots = [];
    this.subBoxNames = ["hvcC", "ispe", "clap", "irot"];
  }
  static {
    this.fourcc = "ipco";
  }
};
var Gt = class extends b {
  constructor() {
    super(...arguments);
    this.box_name = "GroupsListBox";
  }
  static {
    this.fourcc = "grpl";
  }
};
var Vt = class extends b {
  constructor() {
    super(...arguments);
    this.box_name = "J2KHeaderInfoBox";
  }
  static {
    this.fourcc = "j2kH";
  }
};
var jt = class extends b {
  constructor() {
    super(...arguments);
    this.box_name = "ExtendedTypeBox";
    this.tycos = [];
    this.subBoxNames = ["tyco"];
  }
  static {
    this.fourcc = "etyp";
  }
};
var ze = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "DataReferenceBox";
  }
  static {
    this.fourcc = "dref";
  }
  parse(e) {
    this.parseFullHeader(e), this.entries = [];
    let i = e.readUint32();
    for (let r = 0; r < i; r++) {
      let n = A(e, false, this.size - (e.getPosition() - this.start));
      if (n.code === w) {
        let o = n.box;
        this.entries.push(o);
      } else return;
    }
  }
  write(e) {
    this.version = 0, this.flags = 0, this.size = 4, this.writeHeader(e), e.writeUint32(this.entries.length);
    for (let i = 0; i < this.entries.length; i++) this.entries[i].write(e), this.size += this.entries[i].size;
    u.debug("BoxWriter", "Adjusting box " + this.type + " with new size " + this.size), e.adjustUint32(this.sizePosition, this.size);
  }
};
var ke = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "ExtendedLanguageBox";
  }
  static {
    this.fourcc = "elng";
  }
  parse(e) {
    this.parseFullHeader(e), this.extended_language = e.readString(this.size - this.hdr_size);
  }
  write(e) {
    this.version = 0, this.flags = 0, this.size = this.extended_language.length, this.writeHeader(e), e.writeString(this.extended_language);
  }
};
var Te = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "FileTypeBox";
  }
  static {
    this.fourcc = "ftyp";
  }
  parse(e) {
    let i = this.size - this.hdr_size;
    this.major_brand = e.readString(4), this.minor_version = e.readUint32(), i -= 8, this.compatible_brands = [];
    let r = 0;
    for (; i >= 4; ) this.compatible_brands[r] = e.readString(4), i -= 4, r++;
  }
  write(e) {
    this.size = 8 + 4 * this.compatible_brands.length, this.writeHeader(e), e.writeString(this.major_brand, null, 4), e.writeUint32(this.minor_version);
    for (let i = 0; i < this.compatible_brands.length; i++) e.writeString(this.compatible_brands[i], null, 4);
  }
};
var Ee = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "HandlerBox";
  }
  static {
    this.fourcc = "hdlr";
  }
  parse(e) {
    this.version === 0 && (e.readUint32(), this.handler = e.readString(4), e.readUint32Array(3), this.name = e.readString(this.size - this.hdr_size - 20), this.name[this.name.length - 1] === "\0" && (this.name = this.name.slice(0, -1)));
  }
  write(e) {
    this.size = 5 * 4 + this.name.length + 1, this.version = 0, this.flags = 0, this.writeHeader(e), e.writeUint32(0), e.writeString(this.handler, null, 4), e.writeUint32(0), e.writeUint32(0), e.writeUint32(0), e.writeCString(this.name);
  }
};
var Fe = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "HEVCConfigurationBox";
  }
  static {
    this.fourcc = "hvcC";
  }
  parse(e) {
    this.configurationVersion = e.readUint8();
    let i = e.readUint8();
    this.general_profile_space = i >> 6, this.general_tier_flag = (i & 32) >> 5, this.general_profile_idc = i & 31, this.general_profile_compatibility = e.readUint32(), this.general_constraint_indicator = e.readUint8Array(6), this.general_level_idc = e.readUint8(), this.min_spatial_segmentation_idc = e.readUint16() & 4095, this.parallelismType = e.readUint8() & 3, this.chroma_format_idc = e.readUint8() & 3, this.bit_depth_luma_minus8 = e.readUint8() & 7, this.bit_depth_chroma_minus8 = e.readUint8() & 7, this.avgFrameRate = e.readUint16(), i = e.readUint8(), this.constantFrameRate = i >> 6, this.numTemporalLayers = (i & 13) >> 3, this.temporalIdNested = (i & 4) >> 2, this.lengthSizeMinusOne = i & 3, this.nalu_arrays = [];
    let r = e.readUint8();
    for (let n = 0; n < r; n++) {
      let o = [];
      this.nalu_arrays.push(o), i = e.readUint8(), o.completeness = (i & 128) >> 7, o.nalu_type = i & 63;
      let a = e.readUint16();
      for (let l = 0; l < a; l++) {
        let d = e.readUint16();
        o.push({ data: e.readUint8Array(d) });
      }
    }
  }
  write(e) {
    this.size = 23;
    for (let i = 0; i < this.nalu_arrays.length; i++) {
      this.size += 3;
      for (let r = 0; r < this.nalu_arrays[i].length; r++) this.size += 2 + this.nalu_arrays[i][r].data.length;
    }
    this.writeHeader(e), e.writeUint8(this.configurationVersion), e.writeUint8((this.general_profile_space << 6) + (this.general_tier_flag << 5) + this.general_profile_idc), e.writeUint32(this.general_profile_compatibility), e.writeUint8Array(this.general_constraint_indicator), e.writeUint8(this.general_level_idc), e.writeUint16(this.min_spatial_segmentation_idc + (15 << 24)), e.writeUint8(this.parallelismType + 252), e.writeUint8(this.chroma_format_idc + 252), e.writeUint8(this.bit_depth_luma_minus8 + 248), e.writeUint8(this.bit_depth_chroma_minus8 + 248), e.writeUint16(this.avgFrameRate), e.writeUint8((this.constantFrameRate << 6) + (this.numTemporalLayers << 3) + (this.temporalIdNested << 2) + this.lengthSizeMinusOne), e.writeUint8(this.nalu_arrays.length);
    for (let i = 0; i < this.nalu_arrays.length; i++) {
      e.writeUint8((this.nalu_arrays[i].completeness << 7) + this.nalu_arrays[i].nalu_type), e.writeUint16(this.nalu_arrays[i].length);
      for (let r = 0; r < this.nalu_arrays[i].length; r++) e.writeUint16(this.nalu_arrays[i][r].data.length), e.writeUint8Array(this.nalu_arrays[i][r].data);
    }
  }
};
var Le = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "MediaHeaderBox";
  }
  static {
    this.fourcc = "mdhd";
  }
  parse(e) {
    this.parseFullHeader(e), this.version === 1 ? (this.creation_time = e.readUint64(), this.modification_time = e.readUint64(), this.timescale = e.readUint32(), this.duration = e.readUint64()) : (this.creation_time = e.readUint32(), this.modification_time = e.readUint32(), this.timescale = e.readUint32(), this.duration = e.readUint32()), this.parseLanguage(e), e.readUint16();
  }
  write(e) {
    this.size = 4 * 4 + 2 * 2, this.flags = 0, this.version = 0, this.writeHeader(e), e.writeUint32(this.creation_time), e.writeUint32(this.modification_time), e.writeUint32(this.timescale), e.writeUint32(this.duration), e.writeUint16(this.language), e.writeUint16(0);
  }
};
var De = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "MovieExtendsHeaderBox";
  }
  static {
    this.fourcc = "mehd";
  }
  parse(e) {
    this.parseFullHeader(e), this.flags & 1 && (u.warn("BoxParser", "mehd box incorrectly uses flags set to 1, converting version to 1"), this.version = 1), this.version === 1 ? this.fragment_duration = e.readUint64() : this.fragment_duration = e.readUint32();
  }
  write(e) {
    this.version = 0, this.flags = 0, this.size = 4, this.writeHeader(e), e.writeUint32(this.fragment_duration);
  }
};
var Kt = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "ItemInfoEntry";
  }
  static {
    this.fourcc = "infe";
  }
  parse(e) {
    if (this.parseFullHeader(e), (this.version === 0 || this.version === 1) && (this.item_ID = e.readUint16(), this.item_protection_index = e.readUint16(), this.item_name = e.readCString(), this.content_type = e.readCString(), this.isEndOfBox(e) || (this.content_encoding = e.readCString())), this.version === 1) {
      this.extension_type = e.readString(4), u.warn("BoxParser", "Cannot parse extension type"), e.seek(this.start + this.size);
      return;
    }
    this.version >= 2 && (this.version === 2 ? this.item_ID = e.readUint16() : this.version === 3 && (this.item_ID = e.readUint32()), this.item_protection_index = e.readUint16(), this.item_type = e.readString(4), this.item_name = e.readCString(), this.item_type === "mime" ? (this.content_type = e.readCString(), this.content_encoding = e.readCString()) : this.item_type === "uri " && (this.item_uri_type = e.readCString()));
  }
};
var qt = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "ItemInfoBox";
  }
  static {
    this.fourcc = "iinf";
  }
  parse(e) {
    this.parseFullHeader(e), this.version === 0 ? this.entry_count = e.readUint16() : this.entry_count = e.readUint32(), this.item_infos = [];
    for (let i = 0; i < this.entry_count; i++) {
      let r = A(e, false, this.size - (e.getPosition() - this.start));
      if (r.code === w) {
        let n = r.box;
        n.type === "infe" ? this.item_infos[i] = n : u.error("BoxParser", "Expected 'infe' box, got " + r.box.type);
      } else return;
    }
  }
};
var Yt = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "ItemLocationBox";
  }
  static {
    this.fourcc = "iloc";
  }
  parse(e) {
    this.parseFullHeader(e);
    let i;
    i = e.readUint8(), this.offset_size = i >> 4 & 15, this.length_size = i & 15, i = e.readUint8(), this.base_offset_size = i >> 4 & 15, this.version === 1 || this.version === 2 ? this.index_size = i & 15 : this.index_size = 0, this.items = [];
    let r = 0;
    if (this.version < 2) r = e.readUint16();
    else if (this.version === 2) r = e.readUint32();
    else throw new Error("version of iloc box not supported");
    for (let n = 0; n < r; n++) {
      let o = 0, a = 0, l = 0;
      if (this.version < 2) o = e.readUint16();
      else if (this.version === 2) o = e.readUint32();
      else throw new Error("version of iloc box not supported");
      this.version === 1 || this.version === 2 ? a = e.readUint16() & 15 : a = 0;
      let d = e.readUint16();
      switch (this.base_offset_size) {
        case 0:
          l = 0;
          break;
        case 4:
          l = e.readUint32();
          break;
        case 8:
          l = e.readUint64();
          break;
        default:
          throw new Error("Error reading base offset size");
      }
      let p = [], m = e.readUint16();
      for (let h = 0; h < m; h++) {
        let x = 0, B = 0, g = 0;
        if (this.version === 1 || this.version === 2) switch (this.index_size) {
          case 0:
            x = 0;
            break;
          case 4:
            x = e.readUint32();
            break;
          case 8:
            x = e.readUint64();
            break;
          default:
            throw new Error("Error reading extent index");
        }
        switch (this.offset_size) {
          case 0:
            B = 0;
            break;
          case 4:
            B = e.readUint32();
            break;
          case 8:
            B = e.readUint64();
            break;
          default:
            throw new Error("Error reading extent index");
        }
        switch (this.length_size) {
          case 0:
            g = 0;
            break;
          case 4:
            g = e.readUint32();
            break;
          case 8:
            g = e.readUint64();
            break;
          default:
            throw new Error("Error reading extent index");
        }
        p.push({ extent_index: x, extent_length: g, extent_offset: B });
      }
      this.items.push({ base_offset: l, construction_method: a, item_ID: o, data_reference_index: d, extents: p });
    }
  }
};
var po = { auxl: "Auxiliary image item", base: "Pre-derived image item base", cdsc: "Item describes referenced item", dimg: "Derived image item", dpnd: "Item coding dependency", eroi: "Region", evir: "EVC slice", exbl: "Scalable image item", "fdl ": "File delivery", font: "Font item", iloc: "Item data location", mask: "Region mask", mint: "Data integrity", pred: "Predictively coded item", prem: "Pre-multiplied item", tbas: "HEVC tile track base item", thmb: "Thumbnail image item" };
var $t = class s2 extends f {
  constructor() {
    super(...arguments);
    this.box_name = "ItemReferenceBox";
    this.references = [];
  }
  static {
    this.fourcc = "iref";
  }
  static {
    this.allowed_types = ["auxl", "base", "cdsc", "dimg", "dpnd", "eroi", "evir", "exbl", "fdl ", "font", "iloc", "mask", "mint", "pred", "prem", "tbas", "thmb"];
  }
  parse(e) {
    for (this.parseFullHeader(e), this.references = []; e.getPosition() < this.start + this.size; ) {
      let i = A(e, true, this.size - (e.getPosition() - this.start));
      if (i.code === w) {
        let r = "Unknown item reference";
        s2.allowed_types.includes(i.type) ? r = po[i.type] : u.warn("BoxParser", `Unknown item reference type: '${i.type}'`);
        let n = this.version === 0 ? new rt(i.type, i.size, r, i.hdr_size, i.start) : new st(i.type, i.size, r, i.hdr_size, i.start);
        n.write === c.prototype.write && n.type !== "mdat" && (u.warn("BoxParser", n.type + " box writing not yet implemented, keeping unparsed data in memory for later write"), n.parseDataAndRewind(e)), n.parse(e), this.references.push(n);
      } else return;
    }
  }
};
var Wt = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "PrimaryItemBox";
  }
  static {
    this.fourcc = "pitm";
  }
  parse(e) {
    this.parseFullHeader(e), this.version === 0 ? this.item_id = e.readUint16() : this.item_id = e.readUint32();
  }
};
var Zt = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "MetaBox";
  }
  static {
    this.fourcc = "meta";
  }
  parse(e) {
    this.parseFullHeader(e), this.boxes = [], b.prototype.parse.call(this, e);
  }
};
var Pe = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "MovieFragmentHeaderBox";
  }
  static {
    this.fourcc = "mfhd";
  }
  parse(e) {
    this.parseFullHeader(e), this.sequence_number = e.readUint32();
  }
  write(e) {
    this.version = 0, this.flags = 0, this.size = 4, this.writeHeader(e), e.writeUint32(this.sequence_number);
  }
};
var Ce = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "MovieHeaderBox";
  }
  static {
    this.fourcc = "mvhd";
  }
  parse(e) {
    this.parseFullHeader(e), this.version === 1 ? (this.creation_time = e.readUint64(), this.modification_time = e.readUint64(), this.timescale = e.readUint32(), this.duration = e.readUint64()) : (this.creation_time = e.readUint32(), this.modification_time = e.readUint32(), this.timescale = e.readUint32(), this.duration = e.readUint32()), this.rate = e.readUint32(), this.volume = e.readUint16() >> 8, e.readUint16(), e.readUint32Array(2), this.matrix = e.readUint32Array(9), e.readUint32Array(6), this.next_track_id = e.readUint32();
  }
  write(e) {
    this.version = 0, this.flags = 0, this.size = 23 * 4 + 2 * 2, this.writeHeader(e), e.writeUint32(this.creation_time), e.writeUint32(this.modification_time), e.writeUint32(this.timescale), e.writeUint32(this.duration), e.writeUint32(this.rate), e.writeUint16(this.volume << 8), e.writeUint16(0), e.writeUint32(0), e.writeUint32(0), e.writeUint32Array(this.matrix), e.writeUint32(0), e.writeUint32(0), e.writeUint32(0), e.writeUint32(0), e.writeUint32(0), e.writeUint32(0), e.writeUint32(this.next_track_id);
  }
  print(e) {
    super.printHeader(e), e.log(e.indent + "creation_time: " + this.creation_time), e.log(e.indent + "modification_time: " + this.modification_time), e.log(e.indent + "timescale: " + this.timescale), e.log(e.indent + "duration: " + this.duration), e.log(e.indent + "rate: " + this.rate), e.log(e.indent + "volume: " + (this.volume >> 8)), e.log(e.indent + "matrix: " + this.matrix.join(", ")), e.log(e.indent + "next_track_id: " + this.next_track_id);
  }
};
var Xt = class extends D {
  static {
    this.fourcc = "mett";
  }
  parse(t) {
    this.parseHeader(t), this.content_encoding = t.readCString(), this.mime_format = t.readCString(), this.parseFooter(t);
  }
};
var Jt = class extends D {
  static {
    this.fourcc = "metx";
  }
  parse(t) {
    this.parseHeader(t), this.content_encoding = t.readCString(), this.namespace = t.readCString(), this.schema_location = t.readCString(), this.parseFooter(t);
  }
};
var Qt = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "AV1CodecConfigurationBox";
  }
  static {
    this.fourcc = "av1C";
  }
  parse(e) {
    let i = e.readUint8();
    if ((i >> 7 & 1) !== 1) {
      u.error("av1C marker problem");
      return;
    }
    if (this.version = i & 127, this.version !== 1) {
      u.error("av1C version " + this.version + " not supported");
      return;
    }
    if (i = e.readUint8(), this.seq_profile = i >> 5 & 7, this.seq_level_idx_0 = i & 31, i = e.readUint8(), this.seq_tier_0 = i >> 7 & 1, this.high_bitdepth = i >> 6 & 1, this.twelve_bit = i >> 5 & 1, this.monochrome = i >> 4 & 1, this.chroma_subsampling_x = i >> 3 & 1, this.chroma_subsampling_y = i >> 2 & 1, this.chroma_sample_position = i & 3, i = e.readUint8(), this.reserved_1 = i >> 5 & 7, this.reserved_1 !== 0) {
      u.error("av1C reserved_1 parsing problem");
      return;
    }
    if (this.initial_presentation_delay_present = i >> 4 & 1, this.initial_presentation_delay_present === 1) this.initial_presentation_delay_minus_one = i & 15;
    else if (this.reserved_2 = i & 15, this.reserved_2 !== 0) {
      u.error("av1C reserved_2 parsing problem");
      return;
    }
    let r = this.size - this.hdr_size - 4;
    this.configOBUs = e.readUint8Array(r);
  }
};
var ei = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "ElementaryStreamDescriptorBox";
  }
  static {
    this.fourcc = "esds";
  }
  parse(e) {
    this.parseFullHeader(e);
    let i = e.readUint8Array(this.size - this.hdr_size);
    if ("MPEG4DescriptorParser" in ot) {
      let r = new ot.MPEG4DescriptorParser();
      this.esd = r.parseOneDescriptor(new E(i.buffer, 0, 1));
    }
  }
};
var ti = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "VPCodecConfigurationRecord";
  }
  static {
    this.fourcc = "vpcC";
  }
  parse(e) {
    if (this.parseFullHeader(e), this.version === 1) {
      this.profile = e.readUint8(), this.level = e.readUint8();
      let i = e.readUint8();
      this.bitDepth = i >> 4, this.chromaSubsampling = i >> 1 & 7, this.videoFullRangeFlag = i & 1, this.colourPrimaries = e.readUint8(), this.transferCharacteristics = e.readUint8(), this.matrixCoefficients = e.readUint8(), this.codecIntializationDataSize = e.readUint16(), this.codecIntializationData = e.readUint8Array(this.codecIntializationDataSize);
    } else {
      this.profile = e.readUint8(), this.level = e.readUint8();
      let i = e.readUint8();
      this.bitDepth = i >> 4 & 15, this.colorSpace = i & 15, i = e.readUint8(), this.chromaSubsampling = i >> 4 & 15, this.transferFunction = i >> 1 & 7, this.videoFullRangeFlag = i & 1, this.codecIntializationDataSize = e.readUint16(), this.codecIntializationData = e.readUint8Array(this.codecIntializationDataSize);
    }
  }
};
var ii = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "VvcConfigurationBox";
  }
  static {
    this.fourcc = "vvcC";
  }
  parse(e) {
    this.parseFullHeader(e);
    let i = { held_bits: void 0, num_held_bits: 0, stream_read_1_bytes: function(a) {
      this.held_bits = a.readUint8(), this.num_held_bits = 1 * 8;
    }, stream_read_2_bytes: function(a) {
      this.held_bits = a.readUint16(), this.num_held_bits = 2 * 8;
    }, extract_bits: function(a) {
      let l = this.held_bits >> this.num_held_bits - a & (1 << a) - 1;
      return this.num_held_bits -= a, l;
    } };
    if (i.stream_read_1_bytes(e), i.extract_bits(5), this.lengthSizeMinusOne = i.extract_bits(2), this.ptl_present_flag = i.extract_bits(1), this.ptl_present_flag) {
      i.stream_read_2_bytes(e), this.ols_idx = i.extract_bits(9), this.num_sublayers = i.extract_bits(3), this.constant_frame_rate = i.extract_bits(2), this.chroma_format_idc = i.extract_bits(2), i.stream_read_1_bytes(e), this.bit_depth_minus8 = i.extract_bits(3), i.extract_bits(5);
      {
        if (i.stream_read_2_bytes(e), i.extract_bits(2), this.num_bytes_constraint_info = i.extract_bits(6), this.general_profile_idc = i.extract_bits(7), this.general_tier_flag = i.extract_bits(1), this.general_level_idc = e.readUint8(), i.stream_read_1_bytes(e), this.ptl_frame_only_constraint_flag = i.extract_bits(1), this.ptl_multilayer_enabled_flag = i.extract_bits(1), this.general_constraint_info = new Uint8Array(this.num_bytes_constraint_info), this.num_bytes_constraint_info) {
          for (let a = 0; a < this.num_bytes_constraint_info - 1; a++) {
            let l = i.extract_bits(6);
            i.stream_read_1_bytes(e);
            let d = i.extract_bits(2);
            this.general_constraint_info[a] = l << 2 | d;
          }
          this.general_constraint_info[this.num_bytes_constraint_info - 1] = i.extract_bits(6);
        } else i.extract_bits(6);
        if (this.num_sublayers > 1) {
          i.stream_read_1_bytes(e), this.ptl_sublayer_present_mask = 0;
          for (let a = this.num_sublayers - 2; a >= 0; --a) {
            let l = i.extract_bits(1);
            this.ptl_sublayer_present_mask |= l << a;
          }
          for (let a = this.num_sublayers; a <= 8 && this.num_sublayers > 1; ++a) i.extract_bits(1);
          this.sublayer_level_idc = [];
          for (let a = this.num_sublayers - 2; a >= 0; --a) this.ptl_sublayer_present_mask & 1 << a && (this.sublayer_level_idc[a] = e.readUint8());
        }
        if (this.ptl_num_sub_profiles = e.readUint8(), this.general_sub_profile_idc = [], this.ptl_num_sub_profiles) for (let a = 0; a < this.ptl_num_sub_profiles; a++) this.general_sub_profile_idc.push(e.readUint32());
      }
      this.max_picture_width = e.readUint16(), this.max_picture_height = e.readUint16(), this.avg_frame_rate = e.readUint16();
    }
    let r = 12, n = 13;
    this.nalu_arrays = [];
    let o = e.readUint8();
    for (let a = 0; a < o; a++) {
      let l = [];
      this.nalu_arrays.push(l), i.stream_read_1_bytes(e), l.completeness = i.extract_bits(1), i.extract_bits(2), l.nalu_type = i.extract_bits(5);
      let d = 1;
      l.nalu_type !== n && l.nalu_type !== r && (d = e.readUint16());
      for (let p = 0; p < d; p++) {
        let m = e.readUint16();
        l.push({ data: e.readUint8Array(m), length: m });
      }
    }
  }
};
var ri = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "ColourInformationBox";
  }
  static {
    this.fourcc = "colr";
  }
  parse(e) {
    if (this.colour_type = e.readString(4), this.colour_type === "nclx") {
      this.colour_primaries = e.readUint16(), this.transfer_characteristics = e.readUint16(), this.matrix_coefficients = e.readUint16();
      let i = e.readUint8();
      this.full_range_flag = i >> 7;
    } else this.colour_type === "rICC" ? this.ICC_profile = e.readUint8Array(this.size - 4) : this.colour_type === "prof" && (this.ICC_profile = e.readUint8Array(this.size - 4));
  }
};
function me(s6, t) {
  let e = Number(s6).toString(16);
  for (t = typeof t > "u" || t === null ? t = 2 : t; e.length < t; ) e = "0" + e;
  return e;
}
var he = class extends S {
  getCodec() {
    let t = super.getCodec();
    return this.avcC ? `${t}.${me(this.avcC.AVCProfileIndication)}${me(this.avcC.profile_compatibility)}${me(this.avcC.AVCLevelIndication)}` : t;
  }
};
var si = class extends he {
  static {
    this.fourcc = "avc1";
  }
};
var ni = class extends he {
  static {
    this.fourcc = "avc2";
  }
};
var oi = class extends he {
  static {
    this.fourcc = "avc3";
  }
};
var ai = class extends he {
  static {
    this.fourcc = "avc4";
  }
};
var fi = class extends S {
  static {
    this.fourcc = "av01";
  }
  getCodec() {
    let t = super.getCodec(), e = this.av1C.seq_level_idx_0, i = e < 10 ? "0" + e : e, r;
    return this.av1C.seq_profile === 2 && this.av1C.high_bitdepth === 1 ? r = this.av1C.twelve_bit === 1 ? "12" : "10" : this.av1C.seq_profile <= 2 && (r = this.av1C.high_bitdepth === 1 ? "10" : "08"), t + "." + this.av1C.seq_profile + "." + i + (this.av1C.seq_tier_0 ? "H" : "M") + "." + r;
  }
};
var li = class extends S {
  static {
    this.fourcc = "dav1";
  }
};
var _e = class extends S {
  getCodec() {
    let t = super.getCodec();
    if (this.hvcC) {
      switch (t += ".", this.hvcC.general_profile_space) {
        case 0:
          t += "";
          break;
        case 1:
          t += "A";
          break;
        case 2:
          t += "B";
          break;
        case 3:
          t += "C";
          break;
      }
      t += this.hvcC.general_profile_idc, t += ".";
      let e = this.hvcC.general_profile_compatibility, i = 0;
      for (let o = 0; o < 32 && (i |= e & 1, o !== 31); o++) i <<= 1, e >>= 1;
      t += me(i, 0), t += ".", this.hvcC.general_tier_flag === 0 ? t += "L" : t += "H", t += this.hvcC.general_level_idc;
      let r = false, n = "";
      for (let o = 5; o >= 0; o--) (this.hvcC.general_constraint_indicator[o] || r) && (n = "." + me(this.hvcC.general_constraint_indicator[o], 0) + n, r = true);
      t += n;
    }
    return t;
  }
};
var di = class extends _e {
  static {
    this.fourcc = "hvc1";
  }
};
var ui = class extends _e {
  static {
    this.fourcc = "hvc2";
  }
};
var ci = class extends _e {
  constructor() {
    super(...arguments);
    this.colrs = [];
    this.subBoxNames = ["colr"];
  }
  static {
    this.fourcc = "hev1";
  }
};
var pi = class extends _e {
  static {
    this.fourcc = "hev2";
  }
};
var mi = class extends S {
  static {
    this.fourcc = "hvt1";
  }
};
var hi = class extends S {
  static {
    this.fourcc = "lhe1";
  }
};
var _i = class extends S {
  static {
    this.fourcc = "lhv1";
  }
};
var xi = class extends S {
  static {
    this.fourcc = "dvh1";
  }
};
var bi = class extends S {
  static {
    this.fourcc = "dvhe";
  }
};
var ft = class extends S {
  getCodec() {
    let t = super.getCodec();
    if (this.vvcC) {
      t += "." + this.vvcC.general_profile_idc, this.vvcC.general_tier_flag ? t += ".H" : t += ".L", t += this.vvcC.general_level_idc;
      let e = "";
      if (this.vvcC.general_constraint_info) {
        let i = [], r = 0;
        r |= this.vvcC.ptl_frame_only_constraint_flag << 7, r |= this.vvcC.ptl_multilayer_enabled_flag << 6;
        let n;
        for (let o = 0; o < this.vvcC.general_constraint_info.length; ++o) r |= this.vvcC.general_constraint_info[o] >> 2 & 63, i.push(r), r && (n = o), r = this.vvcC.general_constraint_info[o] >> 2 & 3;
        if (n === void 0) e = ".CA";
        else {
          e = ".C";
          let o = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567", a = 0, l = 0;
          for (let d = 0; d <= n; ++d) for (a = a << 8 | i[d], l += 8; l >= 5; ) {
            let p = a >> l - 5 & 31;
            e += o[p], l -= 5, a &= (1 << l) - 1;
          }
          l && (a <<= 5 - l, e += o[a & 31]);
        }
      }
      t += e;
    }
    return t;
  }
};
var yi = class extends ft {
  static {
    this.fourcc = "vvc1";
  }
};
var gi = class extends ft {
  static {
    this.fourcc = "vvi1";
  }
};
var Si = class extends S {
  static {
    this.fourcc = "vvs1";
  }
};
var Bi = class extends S {
  static {
    this.fourcc = "vvcN";
  }
};
var lt = class extends S {
  getCodec() {
    let t = super.getCodec(), e = this.vpcC.level;
    e === 0 && (e = "00");
    let i = this.vpcC.bitDepth;
    return i === 8 && (i = "08"), `${t}.0${this.vpcC.profile}.${e}.${i}`;
  }
};
var Ui = class extends lt {
  static {
    this.fourcc = "vp08";
  }
};
var wi = class extends lt {
  static {
    this.fourcc = "vp09";
  }
};
var vi = class extends S {
  static {
    this.fourcc = "avs3";
  }
};
var Ai = class extends S {
  static {
    this.fourcc = "j2ki";
  }
};
var Mi = class extends S {
  static {
    this.fourcc = "mjp2";
  }
};
var Ii = class extends S {
  static {
    this.fourcc = "mjpg";
  }
};
var zi = class extends S {
  static {
    this.fourcc = "uncv";
  }
};
var ki = class extends S {
  static {
    this.fourcc = "mp4v";
  }
};
var Ti = class extends I {
  static {
    this.fourcc = "mp4a";
  }
  getCodec() {
    let t = super.getCodec();
    if (this.esds && this.esds.esd) {
      let e = this.esds.esd.getOTI(), i = this.esds.esd.getAudioConfig();
      return t + "." + me(e) + (i ? "." + i : "");
    } else return t;
  }
};
var Ei = class extends I {
  static {
    this.fourcc = "m4ae";
  }
};
var Fi = class extends I {
  static {
    this.fourcc = "ac-3";
  }
};
var Li = class extends I {
  static {
    this.fourcc = "ac-4";
  }
};
var Di = class extends I {
  static {
    this.fourcc = "ec-3";
  }
};
var Pi = class extends I {
  static {
    this.fourcc = "Opus";
  }
};
var Ci = class extends I {
  static {
    this.fourcc = "mha1";
  }
};
var Ni = class extends I {
  static {
    this.fourcc = "mha2";
  }
};
var Ri = class extends I {
  static {
    this.fourcc = "mhm1";
  }
};
var Oi = class extends I {
  static {
    this.fourcc = "mhm2";
  }
};
var Hi = class extends I {
  static {
    this.fourcc = "fLaC";
  }
};
var Gi = class extends S {
  static {
    this.fourcc = "encv";
  }
};
var Vi = class extends I {
  static {
    this.fourcc = "enca";
  }
};
var ji = class extends F {
  constructor() {
    super(...arguments);
    this.subBoxNames = ["sinf"];
    this.sinfs = [];
  }
  static {
    this.fourcc = "encu";
  }
};
var Ki = class extends ee {
  constructor() {
    super(...arguments);
    this.subBoxNames = ["sinf"];
    this.sinfs = [];
  }
  static {
    this.fourcc = "encs";
  }
};
var qi = class extends ee {
  static {
    this.fourcc = "mp4s";
  }
};
var Yi = class extends at {
  constructor() {
    super(...arguments);
    this.subBoxNames = ["sinf"];
    this.sinfs = [];
  }
  static {
    this.fourcc = "enct";
  }
};
var $i = class extends D {
  constructor() {
    super(...arguments);
    this.subBoxNames = ["sinf"];
    this.sinfs = [];
  }
  static {
    this.fourcc = "encm";
  }
};
var Wi = class extends S {
  static {
    this.fourcc = "resv";
  }
};
var Zi = class extends F {
  static {
    this.fourcc = "sbtt";
  }
  parse(t) {
    this.parseHeader(t), this.content_encoding = t.readCString(), this.mime_format = t.readCString(), this.parseFooter(t);
  }
};
var Ne = class extends F {
  static {
    this.fourcc = "stpp";
  }
  parse(t) {
    this.parseHeader(t), this.namespace = t.readCString(), this.schema_location = t.readCString(), this.auxiliary_mime_types = t.readCString(), this.parseFooter(t);
  }
  write(t) {
    this.writeHeader(t), this.size += this.namespace.length + 1 + this.schema_location.length + 1 + this.auxiliary_mime_types.length + 1, t.writeCString(this.namespace), t.writeCString(this.schema_location), t.writeCString(this.auxiliary_mime_types), this.writeFooter(t);
  }
};
var Xi = class extends F {
  static {
    this.fourcc = "stxt";
  }
  parse(t) {
    this.parseHeader(t), this.content_encoding = t.readCString(), this.mime_format = t.readCString(), this.parseFooter(t);
  }
  getCodec() {
    let t = super.getCodec();
    return this.mime_format ? t + "." + this.mime_format : t;
  }
};
var Ji = class extends F {
  static {
    this.fourcc = "tx3g";
  }
  parse(t) {
    this.parseHeader(t), this.displayFlags = t.readUint32(), this.horizontal_justification = t.readInt8(), this.vertical_justification = t.readInt8(), this.bg_color_rgba = t.readUint8Array(4), this.box_record = t.readInt16Array(4), this.style_record = t.readUint8Array(12), this.parseFooter(t);
  }
};
var Qi = class extends D {
  static {
    this.fourcc = "wvtt";
  }
  parse(t) {
    this.parseHeader(t), this.parseFooter(t);
  }
};
var er = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "SampleToGroupBox";
  }
  static {
    this.fourcc = "sbgp";
  }
  parse(e) {
    this.parseFullHeader(e), this.grouping_type = e.readString(4), this.version === 1 ? this.grouping_type_parameter = e.readUint32() : this.grouping_type_parameter = 0, this.entries = [];
    let i = e.readUint32();
    for (let r = 0; r < i; r++) this.entries.push({ sample_count: e.readInt32(), group_description_index: e.readInt32() });
  }
  write(e) {
    this.version = 1, this.flags = 0, this.size = 12 + 8 * this.entries.length, this.writeHeader(e), e.writeString(this.grouping_type, null, 4), e.writeUint32(this.grouping_type_parameter), e.writeUint32(this.entries.length);
    for (let i = 0; i < this.entries.length; i++) {
      let r = this.entries[i];
      e.writeInt32(r.sample_count), e.writeInt32(r.group_description_index);
    }
  }
};
var tr = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "SampleDependencyTypeBox";
  }
  static {
    this.fourcc = "sdtp";
  }
  parse(e) {
    this.parseFullHeader(e);
    let i = this.size - this.hdr_size;
    this.is_leading = [], this.sample_depends_on = [], this.sample_is_depended_on = [], this.sample_has_redundancy = [];
    for (let r = 0; r < i; r++) {
      let n = e.readUint8();
      this.is_leading[r] = n >> 6, this.sample_depends_on[r] = n >> 4 & 3, this.sample_is_depended_on[r] = n >> 2 & 3, this.sample_has_redundancy[r] = n & 3;
    }
  }
};
var ir = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "SampleGroupDescriptionBox";
  }
  static {
    this.fourcc = "sgpd";
  }
  parse(e) {
    this.parseFullHeader(e), this.grouping_type = e.readString(4), u.debug("BoxParser", "Found Sample Groups of type " + this.grouping_type), this.version === 1 ? this.default_length = e.readUint32() : this.default_length = 0, this.version >= 2 && (this.default_group_description_index = e.readUint32()), this.entries = [];
    let i = e.readUint32();
    for (let r = 0; r < i; r++) {
      let n;
      this.grouping_type in v.sampleGroupEntry ? n = new v.sampleGroupEntry[this.grouping_type](this.grouping_type) : n = new _(this.grouping_type), this.entries.push(n), this.version === 1 ? this.default_length === 0 ? n.description_length = e.readUint32() : n.description_length = this.default_length : n.description_length = this.default_length, n.write === _.prototype.write && (u.info("BoxParser", "SampleGroup for type " + this.grouping_type + " writing not yet implemented, keeping unparsed data in memory for later write"), n.data = e.readUint8Array(n.description_length), e.seek(e.getPosition() - n.description_length)), n.parse(e);
    }
  }
  write(e) {
    this.flags = 0, this.size = 12;
    for (let i = 0; i < this.entries.length; i++) {
      let r = this.entries[i];
      this.version === 1 && (this.default_length === 0 && (this.size += 4), this.size += r.data.length);
    }
    this.writeHeader(e), e.writeString(this.grouping_type, null, 4), this.version === 1 && e.writeUint32(this.default_length), this.version >= 2 && e.writeUint32(this.default_sample_description_index), e.writeUint32(this.entries.length);
    for (let i = 0; i < this.entries.length; i++) {
      let r = this.entries[i];
      this.version === 1 && this.default_length === 0 && e.writeUint32(r.description_length), r.write(e);
    }
  }
};
var rr = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "CompressedSegmentIndexBox";
  }
  static {
    this.fourcc = "sidx";
  }
  parse(e) {
    this.parseFullHeader(e), this.reference_ID = e.readUint32(), this.timescale = e.readUint32(), this.version === 0 ? (this.earliest_presentation_time = e.readUint32(), this.first_offset = e.readUint32()) : (this.earliest_presentation_time = e.readUint64(), this.first_offset = e.readUint64()), e.readUint16(), this.references = [];
    let i = e.readUint16();
    for (let r = 0; r < i; r++) {
      let n = e.readUint32(), o = e.readUint32(), a = e.readUint32();
      this.references.push({ reference_type: n >> 31 & 1, referenced_size: n & 2147483647, subsegment_duration: o, starts_with_SAP: a >> 31 & 1, SAP_type: a >> 28 & 7, SAP_delta_time: a & 268435455 });
    }
  }
  write(e) {
    this.version = 0, this.flags = 0, this.size = 4 * 4 + 2 + 2 + 12 * this.references.length, this.writeHeader(e), e.writeUint32(this.reference_ID), e.writeUint32(this.timescale), e.writeUint32(this.earliest_presentation_time), e.writeUint32(this.first_offset), e.writeUint16(0), e.writeUint16(this.references.length);
    for (let i = 0; i < this.references.length; i++) {
      let r = this.references[i];
      e.writeUint32(r.reference_type << 31 | r.referenced_size), e.writeUint32(r.subsegment_duration), e.writeUint32(r.starts_with_SAP << 31 | r.SAP_type << 28 | r.SAP_delta_time);
    }
  }
};
var Re = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "SoundMediaHeaderBox";
  }
  static {
    this.fourcc = "smhd";
  }
  parse(e) {
    this.parseFullHeader(e), this.balance = e.readUint16(), e.readUint16();
  }
  write(e) {
    this.version = 0, this.flags = 1, this.size = 4, this.writeHeader(e), e.writeUint16(this.balance), e.writeUint16(0);
  }
};
var Oe = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "ChunkOffsetBox";
  }
  static {
    this.fourcc = "stco";
  }
  parse(e) {
    this.parseFullHeader(e);
    let i = e.readUint32();
    if (this.chunk_offsets = [], this.version === 0) for (let r = 0; r < i; r++) this.chunk_offsets.push(e.readUint32());
  }
  write(e) {
    this.version = 0, this.flags = 0, this.size = 4 + 4 * this.chunk_offsets.length, this.writeHeader(e), e.writeUint32(this.chunk_offsets.length), e.writeUint32Array(this.chunk_offsets);
  }
  unpack(e) {
    for (let i = 0; i < this.chunk_offsets.length; i++) e[i].offset = this.chunk_offsets[i];
  }
};
var He = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "SubtitleMediaHeaderBox";
  }
  static {
    this.fourcc = "sthd";
  }
};
var Ge = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "SampleToChunkBox";
  }
  static {
    this.fourcc = "stsc";
  }
  parse(e) {
    this.parseFullHeader(e);
    let i = e.readUint32();
    if (this.first_chunk = [], this.samples_per_chunk = [], this.sample_description_index = [], this.version === 0) for (let r = 0; r < i; r++) this.first_chunk.push(e.readUint32()), this.samples_per_chunk.push(e.readUint32()), this.sample_description_index.push(e.readUint32());
  }
  write(e) {
    this.version = 0, this.flags = 0, this.size = 4 + 12 * this.first_chunk.length, this.writeHeader(e), e.writeUint32(this.first_chunk.length);
    for (let i = 0; i < this.first_chunk.length; i++) e.writeUint32(this.first_chunk[i]), e.writeUint32(this.samples_per_chunk[i]), e.writeUint32(this.sample_description_index[i]);
  }
  unpack(e) {
    let i = 0, r = 0;
    for (let n = 0; n < this.first_chunk.length; n++) for (let o = 0; o < (n + 1 < this.first_chunk.length ? this.first_chunk[n + 1] : 1 / 0); o++) {
      r++;
      for (let a = 0; a < this.samples_per_chunk[n]; a++) {
        if (e[i]) e[i].description_index = this.sample_description_index[n], e[i].chunk_index = r;
        else return;
        i++;
      }
    }
  }
};
var Ve = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "SampleDescriptionBox";
  }
  static {
    this.fourcc = "stsd";
  }
  parse(e) {
    this.parseFullHeader(e), this.entries = [];
    let i = e.readUint32();
    for (let r = 1; r <= i; r++) {
      let n = A(e, true, this.size - (e.getPosition() - this.start));
      if (n.code === w) {
        let o;
        n.type in v.sampleEntry ? (o = new v.sampleEntry[n.type](n.size), o.hdr_size = n.hdr_size, o.start = n.start) : (u.warn("BoxParser", `Unknown sample entry type: '${n.type}'`), o = new N(n.size, n.hdr_size, n.start), o.type = n.type), o.write === N.prototype.write && (u.info("BoxParser", "SampleEntry " + o.type + " box writing not yet implemented, keeping unparsed data in memory for later write"), o.parseDataAndRewind(e)), o.parse(e), this.entries.push(o);
      } else return;
    }
  }
  write(e) {
    this.version = 0, this.flags = 0, this.size = 0, this.writeHeader(e), e.writeUint32(this.entries.length), this.size += 4;
    for (let i = 0; i < this.entries.length; i++) this.entries[i].write(e), this.size += this.entries[i].size;
    u.debug("BoxWriter", "Adjusting box " + this.type + " with new size " + this.size), e.adjustUint32(this.sizePosition, this.size);
  }
};
var je = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "SampleSizeBox";
  }
  static {
    this.fourcc = "stsz";
  }
  parse(e) {
    if (this.parseFullHeader(e), this.sample_sizes = [], this.version === 0) {
      this.sample_size = e.readUint32(), this.sample_count = e.readUint32();
      for (let i = 0; i < this.sample_count; i++) this.sample_size === 0 ? this.sample_sizes.push(e.readUint32()) : this.sample_sizes[i] = this.sample_size;
    }
  }
  write(e) {
    let i = true;
    if (this.version = 0, this.flags = 0, this.sample_sizes.length > 0) {
      let r = 0;
      for (; r + 1 < this.sample_sizes.length; ) if (this.sample_sizes[r + 1] !== this.sample_sizes[0]) {
        i = false;
        break;
      } else r++;
    } else i = false;
    this.size = 8, i || (this.size += 4 * this.sample_sizes.length), this.writeHeader(e), i ? e.writeUint32(this.sample_sizes[0]) : e.writeUint32(0), e.writeUint32(this.sample_sizes.length), i || e.writeUint32Array(this.sample_sizes);
  }
  unpack(e) {
    for (let i = 0; i < this.sample_sizes.length; i++) e[i].size = this.sample_sizes[i];
  }
};
var Ke = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "TimeToSampleBox";
    this.sample_counts = [];
    this.sample_deltas = [];
  }
  static {
    this.fourcc = "stts";
  }
  parse(e) {
    this.parseFullHeader(e);
    let i = e.readUint32();
    if (this.sample_counts.length = 0, this.sample_deltas.length = 0, this.version === 0) for (let r = 0; r < i; r++) {
      this.sample_counts.push(e.readUint32());
      let n = e.readInt32();
      n < 0 && (u.warn("BoxParser", "File uses negative stts sample delta, using value 1 instead, sync may be lost!"), n = 1), this.sample_deltas.push(n);
    }
  }
  write(e) {
    this.version = 0, this.flags = 0, this.size = 4 + 8 * this.sample_counts.length, this.writeHeader(e), e.writeUint32(this.sample_counts.length);
    for (let i = 0; i < this.sample_counts.length; i++) e.writeUint32(this.sample_counts[i]), e.writeUint32(this.sample_deltas[i]);
  }
  unpack(e) {
    let i = 0;
    for (let r = 0; r < this.sample_counts.length; r++) for (let n = 0; n < this.sample_counts[r]; n++) i === 0 ? e[i].dts = 0 : e[i].dts = e[i - 1].dts + this.sample_deltas[r], i++;
  }
};
var qe = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "TrackFragmentBaseMediaDecodeTimeBox";
  }
  static {
    this.fourcc = "tfdt";
  }
  parse(e) {
    this.parseFullHeader(e), this.version === 1 ? this.baseMediaDecodeTime = e.readUint64() : this.baseMediaDecodeTime = e.readUint32();
  }
  write(e) {
    let i = Math.pow(2, 32) - 1;
    this.version = this.baseMediaDecodeTime > i ? 1 : 0, this.flags = 0, this.size = 4, this.version === 1 && (this.size += 4), this.writeHeader(e), this.version === 1 ? e.writeUint64(this.baseMediaDecodeTime) : e.writeUint32(this.baseMediaDecodeTime);
  }
};
var Ye = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "TrackFragmentHeaderBox";
  }
  static {
    this.fourcc = "tfhd";
  }
  parse(e) {
    this.parseFullHeader(e);
    let i = 0;
    this.track_id = e.readUint32(), this.size - this.hdr_size > i && this.flags & ne ? (this.base_data_offset = e.readUint64(), i += 8) : this.base_data_offset = 0, this.size - this.hdr_size > i && this.flags & oe ? (this.default_sample_description_index = e.readUint32(), i += 4) : this.default_sample_description_index = 0, this.size - this.hdr_size > i && this.flags & ae ? (this.default_sample_duration = e.readUint32(), i += 4) : this.default_sample_duration = 0, this.size - this.hdr_size > i && this.flags & fe ? (this.default_sample_size = e.readUint32(), i += 4) : this.default_sample_size = 0, this.size - this.hdr_size > i && this.flags & le ? (this.default_sample_flags = e.readUint32(), i += 4) : this.default_sample_flags = 0;
  }
  write(e) {
    this.version = 0, this.size = 4, this.flags & ne && (this.size += 8), this.flags & oe && (this.size += 4), this.flags & ae && (this.size += 4), this.flags & fe && (this.size += 4), this.flags & le && (this.size += 4), this.writeHeader(e), e.writeUint32(this.track_id), this.flags & ne && e.writeUint64(this.base_data_offset), this.flags & oe && e.writeUint32(this.default_sample_description_index), this.flags & ae && e.writeUint32(this.default_sample_duration), this.flags & fe && e.writeUint32(this.default_sample_size), this.flags & le && e.writeUint32(this.default_sample_flags);
  }
};
var $e = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "TrackHeaderBox";
  }
  static {
    this.fourcc = "tkhd";
  }
  parse(e) {
    this.parseFullHeader(e), this.version === 1 ? (this.creation_time = e.readUint64(), this.modification_time = e.readUint64(), this.track_id = e.readUint32(), e.readUint32(), this.duration = e.readUint64()) : (this.creation_time = e.readUint32(), this.modification_time = e.readUint32(), this.track_id = e.readUint32(), e.readUint32(), this.duration = e.readUint32()), e.readUint32Array(2), this.layer = e.readInt16(), this.alternate_group = e.readInt16(), this.volume = e.readInt16() >> 8, e.readUint16(), this.matrix = e.readInt32Array(9), this.width = e.readUint32(), this.height = e.readUint32();
  }
  print(e) {
    super.printHeader(e), e.log(e.indent + "creation_time: " + this.creation_time), e.log(e.indent + "modification_time: " + this.modification_time), e.log(e.indent + "track_id: " + this.track_id), e.log(e.indent + "duration: " + this.duration), e.log(e.indent + "volume: " + (this.volume >> 8)), e.log(e.indent + "matrix: " + this.matrix.join(", ")), e.log(e.indent + "layer: " + this.layer), e.log(e.indent + "alternate_group: " + this.alternate_group), e.log(e.indent + "width: " + this.width), e.log(e.indent + "height: " + this.height);
  }
};
var xe = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "TrackExtendsBox";
  }
  static {
    this.fourcc = "trex";
  }
  parse(e) {
    this.parseFullHeader(e), this.track_id = e.readUint32(), this.default_sample_description_index = e.readUint32(), this.default_sample_duration = e.readUint32(), this.default_sample_size = e.readUint32(), this.default_sample_flags = e.readUint32();
  }
  write(e) {
    this.version = 0, this.flags = 0, this.size = 4 * 5, this.writeHeader(e), e.writeUint32(this.track_id), e.writeUint32(this.default_sample_description_index), e.writeUint32(this.default_sample_duration), e.writeUint32(this.default_sample_size), e.writeUint32(this.default_sample_flags);
  }
};
var We = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "TrackRunBox";
  }
  static {
    this.fourcc = "trun";
  }
  parse(e) {
    this.parseFullHeader(e);
    let i = 0;
    if (this.sample_count = e.readUint32(), i += 4, this.size - this.hdr_size > i && this.flags & W ? (this.data_offset = e.readInt32(), i += 4) : this.data_offset = 0, this.size - this.hdr_size > i && this.flags & de ? (this.first_sample_flags = e.readUint32(), i += 4) : this.first_sample_flags = 0, this.sample_duration = [], this.sample_size = [], this.sample_flags = [], this.sample_composition_time_offset = [], this.size - this.hdr_size > i) for (let r = 0; r < this.sample_count; r++) this.flags & Z && (this.sample_duration[r] = e.readUint32()), this.flags & X && (this.sample_size[r] = e.readUint32()), this.flags & J && (this.sample_flags[r] = e.readUint32()), this.flags & Q && (this.version === 0 ? this.sample_composition_time_offset[r] = e.readUint32() : this.sample_composition_time_offset[r] = e.readInt32());
  }
  write(e) {
    this.version = 0, this.size = 4, this.flags & W && (this.size += 4), this.flags & de && (this.size += 4), this.flags & Z && (this.size += 4 * this.sample_duration.length), this.flags & X && (this.size += 4 * this.sample_size.length), this.flags & J && (this.size += 4 * this.sample_flags.length), this.flags & Q && (this.size += 4 * this.sample_composition_time_offset.length), this.writeHeader(e), e.writeUint32(this.sample_count), this.flags & W && (this.data_offset_position = e.getPosition(), e.writeInt32(this.data_offset)), this.flags & de && e.writeUint32(this.first_sample_flags);
    for (let i = 0; i < this.sample_count; i++) this.flags & Z && e.writeUint32(this.sample_duration[i]), this.flags & X && e.writeUint32(this.sample_size[i]), this.flags & J && e.writeUint32(this.sample_flags[i]), this.flags & Q && (this.version === 0 ? e.writeUint32(this.sample_composition_time_offset[i]) : e.writeInt32(this.sample_composition_time_offset[i]));
  }
};
var Ze = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "DataEntryUrlBox";
  }
  static {
    this.fourcc = "url ";
  }
  parse(e) {
    this.parseFullHeader(e), this.flags !== 1 && (this.location = e.readCString());
  }
  write(e) {
    this.version = 0, this.location ? (this.flags = 0, this.size = this.location.length + 1) : (this.flags = 1, this.size = 0), this.writeHeader(e), this.location && e.writeCString(this.location);
  }
};
var Xe = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "VideoMediaHeaderBox";
  }
  static {
    this.fourcc = "vmhd";
  }
  parse(e) {
    this.parseFullHeader(e), this.graphicsmode = e.readUint16(), this.opcolor = e.readUint16Array(3);
  }
  write(e) {
    this.version = 0, this.flags = 1, this.size = 8, this.writeHeader(e), e.writeUint16(this.graphicsmode), e.writeUint16Array(this.opcolor);
  }
};
var Je = class {
  constructor(t, e, i) {
    this.grouping_type = t;
    this.grouping_type_parameter = e;
    this.sbgp = i;
    this.last_sample_in_run = -1;
    this.entry_index = -1;
  }
};
var dt = class s3 {
  constructor(t) {
    this.boxes = [];
    this.mdats = [];
    this.moofs = [];
    this.isProgressive = false;
    this.moovStartFound = false;
    this.onMoovStart = null;
    this.moovStartSent = false;
    this.onReady = null;
    this.readySent = false;
    this.onSegment = null;
    this.onSamples = null;
    this.onError = null;
    this.onItem = null;
    this.sampleListBuilt = false;
    this.fragmentedTracks = [];
    this.extractedTracks = [];
    this.isFragmentationInitialized = false;
    this.sampleProcessingStarted = false;
    this.nextMoofNumber = 0;
    this.itemListBuilt = false;
    this.onSidx = null;
    this.sidxSent = false;
    this.items = [];
    this.entity_groups = [];
    this.itemsDataSize = 0;
    this.lastMoofIndex = 0;
    this.samplesDataSize = 0;
    this.lastBoxStartPosition = 0;
    this.parsingMdat = null;
    this.nextParsePosition = 0;
    this.discardMdatData = false;
    this.stream = t || new ue();
  }
  setSegmentOptions(t, e, { nbSamples: i = 1e3, rapAlignement: r = true } = {}) {
    let n = this.getTrackById(t);
    if (n) {
      let o = { id: t, user: e, trak: n, segmentStream: null, nb_samples: i, rapAlignement: r };
      this.fragmentedTracks.push(o), n.nextSample = 0;
    }
  }
  unsetSegmentOptions(t) {
    let e = -1;
    for (let i = 0; i < this.fragmentedTracks.length; i++) this.fragmentedTracks[i].id === t && (e = i);
    e > -1 && this.fragmentedTracks.splice(e, 1);
  }
  setExtractionOptions(t, e, { nbSamples: i = 1e3 } = {}) {
    let r = this.getTrackById(t);
    r && (this.extractedTracks.push({ id: t, user: e, trak: r, nb_samples: i, samples: [] }), r.nextSample = 0);
  }
  unsetExtractionOptions(t) {
    let e = -1;
    for (let i = 0; i < this.extractedTracks.length; i++) this.extractedTracks[i].id === t && (e = i);
    e > -1 && this.extractedTracks.splice(e, 1);
  }
  parse() {
    if (!(this.restoreParsePosition && !this.restoreParsePosition())) for (; ; ) if (this.hasIncompleteMdat && this.hasIncompleteMdat()) {
      if (this.processIncompleteMdat()) continue;
      return;
    } else {
      this.saveParsePosition && this.saveParsePosition();
      let e = A(this.stream, false);
      if (e.code === G) if (this.processIncompleteBox) {
        if (this.processIncompleteBox(e)) continue;
        return;
      } else return;
      else {
        let i = e.box;
        if (this.boxes.push(i), i.type === "uuid") this[i.uuid] !== void 0 && u.warn("ISOFile", "Duplicate Box of uuid: " + i.uuid + ", overriding previous occurrence"), this[i.uuid] = i;
        else switch (i.type) {
          case "mdat":
            this.mdats.push(i);
            break;
          case "moof":
            this.moofs.push(i);
            break;
          case "free":
          case "skip":
            break;
          case "moov":
            this.moovStartFound = true, this.mdats.length === 0 && (this.isProgressive = true);
          default:
            this[i.type] !== void 0 ? Array.isArray(this[i.type + "s"]) ? (u.info("ISOFile", `Found multiple boxes of type ${i.type} in ISOFile, adding to array`), this[i.type + "s"].push(i)) : (u.warn("ISOFile", `Found multiple boxes of type ${i.type} but no array exists. Creating array dynamically.`), this[i.type + "s"] = [this[i.type], i]) : (this[i.type] = i, Array.isArray(this[i.type + "s"]) && this[i.type + "s"].push(i));
            break;
        }
        this.updateUsedBytes && this.updateUsedBytes(i, e);
      }
    }
  }
  checkBuffer(t) {
    if (t == null) throw new Error("Buffer must be defined and non empty");
    return t.byteLength === 0 ? (u.warn("ISOFile", "Ignoring empty buffer (fileStart: " + t.fileStart + ")"), this.stream.logBufferLevel(), false) : (u.info("ISOFile", "Processing buffer (fileStart: " + t.fileStart + ")"), t.usedBytes = 0, this.stream.insertBuffer(t), this.stream.logBufferLevel(), this.stream.initialized() ? true : (u.warn("ISOFile", "Not ready to start parsing"), false));
  }
  appendBuffer(t, e) {
    let i;
    if (this.checkBuffer(t)) return this.parse(), this.moovStartFound && !this.moovStartSent && (this.moovStartSent = true, this.onMoovStart && this.onMoovStart()), this.moov ? (this.sampleListBuilt || (this.buildSampleLists(), this.sampleListBuilt = true), this.updateSampleLists(), this.onReady && !this.readySent && (this.readySent = true, this.onReady(this.getInfo())), this.processSamples(e), this.nextSeekPosition ? (i = this.nextSeekPosition, this.nextSeekPosition = void 0) : i = this.nextParsePosition, this.stream.getEndFilePositionAfter && (i = this.stream.getEndFilePositionAfter(i))) : this.nextParsePosition ? i = this.nextParsePosition : i = 0, this.sidx && this.onSidx && !this.sidxSent && (this.onSidx(this.sidx), this.sidxSent = true), this.meta && (this.flattenItemInfo && !this.itemListBuilt && (this.flattenItemInfo(), this.itemListBuilt = true), this.processItems && this.processItems(this.onItem)), this.stream.cleanBuffers && (u.info("ISOFile", "Done processing buffer (fileStart: " + t.fileStart + ") - next buffer to fetch should have a fileStart position of " + i), this.stream.logBufferLevel(), this.stream.cleanBuffers(), this.stream.logBufferLevel(true), u.info("ISOFile", "Sample data size in memory: " + this.getAllocatedSampleDataSize())), i;
  }
  getInfo() {
    if (!this.moov) return { hasMoov: false, mime: "" };
    let t = (/* @__PURE__ */ new Date("1904-01-01T00:00:00Z")).getTime(), e = this.moov.mvex?.mehd !== void 0, i = { hasMoov: true, duration: this.moov.mvhd.duration, timescale: this.moov.mvhd.timescale, isFragmented: e, fragment_duration: e ? this.moov.mvex.mehd.fragment_duration : void 0, isProgressive: this.isProgressive, hasIOD: this.moov.iods !== null, brands: [this.ftyp.major_brand].concat(this.ftyp.compatible_brands), created: new Date(t + this.moov.mvhd.creation_time * 1e3), modified: new Date(t + this.moov.mvhd.modification_time * 1e3), tracks: [], audioTracks: [], videoTracks: [], subtitleTracks: [], metadataTracks: [], hintTracks: [], otherTracks: [], mime: "" };
    for (let r = 0; r < this.moov.traks.length; r++) {
      let n = this.moov.traks[r], o = n.mdia.minf.stbl.stsd.entries[0], a = n.samples_size, l = n.mdia.mdhd.timescale, d = n.samples_duration, p = a * 8 * l / d, m = { samples_duration: d, bitrate: p, size: a, timescale: l, alternate_group: n.tkhd.alternate_group, codec: o.getCodec(), created: new Date(t + n.tkhd.creation_time * 1e3), cts_shift: n.mdia.minf.stbl.cslg, duration: n.mdia.mdhd.duration, id: n.tkhd.track_id, kind: n.udta && n.udta.kinds.length ? n.udta.kinds[0] : { schemeURI: "", value: "" }, language: n.mdia.elng ? n.mdia.elng.extended_language : n.mdia.mdhd.languageString, layer: n.tkhd.layer, matrix: n.tkhd.matrix, modified: new Date(t + n.tkhd.modification_time * 1e3), movie_duration: n.tkhd.duration, movie_timescale: i.timescale, name: n.mdia.hdlr.name, nb_samples: n.samples.length, references: [], track_height: n.tkhd.height / 65536, track_width: n.tkhd.width / 65536, volume: n.tkhd.volume };
      if (i.tracks.push(m), n.tref) for (let h = 0; h < n.tref.references.length; h++) m.references.push({ type: n.tref.references[h].type, track_ids: n.tref.references[h].track_ids });
      n.edts && (m.edits = n.edts.elst.entries), o instanceof I ? (m.type = "audio", i.audioTracks.push(m), m.audio = { sample_rate: o.getSampleRate(), channel_count: o.getChannelCount(), sample_size: o.getSampleSize() }) : o instanceof S ? (m.type = "video", i.videoTracks.push(m), m.video = { width: o.getWidth(), height: o.getHeight() }) : o instanceof F ? (m.type = "subtitles", i.subtitleTracks.push(m)) : o instanceof ye ? (m.type = "metadata", i.hintTracks.push(m)) : o instanceof D ? (m.type = "metadata", i.metadataTracks.push(m)) : (m.type = "metadata", i.otherTracks.push(m));
    }
    i.videoTracks && i.videoTracks.length > 0 ? i.mime += 'video/mp4; codecs="' : i.audioTracks && i.audioTracks.length > 0 ? i.mime += 'audio/mp4; codecs="' : i.mime += 'application/mp4; codecs="';
    for (let r = 0; r < i.tracks.length; r++) r !== 0 && (i.mime += ","), i.mime += i.tracks[r].codec;
    return i.mime += '"; profiles="', i.mime += this.ftyp.compatible_brands.join(), i.mime += '"', i;
  }
  setNextSeekPositionFromSample(t) {
    t && (this.nextSeekPosition ? this.nextSeekPosition = Math.min(t.offset + t.alreadyRead, this.nextSeekPosition) : this.nextSeekPosition = t.offset + t.alreadyRead);
  }
  processSamples(t) {
    if (this.sampleProcessingStarted) {
      if (this.isFragmentationInitialized && this.onSegment !== null) for (let e = 0; e < this.fragmentedTracks.length; e++) {
        let i = this.fragmentedTracks[e], r = i.trak;
        for (; r.nextSample < r.samples.length && this.sampleProcessingStarted; ) {
          u.debug("ISOFile", "Creating media fragment on track #" + i.id + " for sample " + r.nextSample);
          let n = this.createFragment(i.id, r.nextSample, i.segmentStream);
          if (n) i.segmentStream = n, r.nextSample++;
          else break;
          if ((r.nextSample % i.nb_samples === 0 || t || r.nextSample >= r.samples.length) && (u.info("ISOFile", "Sending fragmented data on track #" + i.id + " for samples [" + Math.max(0, r.nextSample - i.nb_samples) + "," + (r.nextSample - 1) + "]"), u.info("ISOFile", "Sample data size in memory: " + this.getAllocatedSampleDataSize()), this.onSegment && this.onSegment(i.id, i.user, i.segmentStream.buffer, r.nextSample, t || r.nextSample >= r.samples.length), i.segmentStream = null, i !== this.fragmentedTracks[e])) break;
        }
      }
      if (this.onSamples !== null) for (let e = 0; e < this.extractedTracks.length; e++) {
        let i = this.extractedTracks[e], r = i.trak;
        for (; r.nextSample < r.samples.length && this.sampleProcessingStarted; ) {
          u.debug("ISOFile", "Exporting on track #" + i.id + " sample #" + r.nextSample);
          let n = this.getSample(r, r.nextSample);
          if (n) r.nextSample++, i.samples.push(n);
          else {
            this.setNextSeekPositionFromSample(r.samples[r.nextSample]);
            break;
          }
          if ((r.nextSample % i.nb_samples === 0 || r.nextSample >= r.samples.length) && (u.debug("ISOFile", "Sending samples on track #" + i.id + " for sample " + r.nextSample), this.onSamples && this.onSamples(i.id, i.user, i.samples), i.samples = [], i !== this.extractedTracks[e])) break;
        }
      }
    }
  }
  getBox(t) {
    let e = this.getBoxes(t, true);
    return e.length ? e[0] : null;
  }
  getBoxes(t, e) {
    let i = [], r = (n) => {
      n instanceof c && n.type && n.type === t && i.push(n);
      let o = [];
      n.boxes && o.push(...n.boxes), n.entries && o.push(...n.entries), n.item_infos && o.push(...n.item_infos), n.references && o.push(...n.references);
      for (let a of o) {
        if (i.length && e) return;
        r(a);
      }
    };
    return r(this), i;
  }
  getTrackSamplesInfo(t) {
    let e = this.getTrackById(t);
    if (e) return e.samples;
  }
  getTrackSample(t, e) {
    let i = this.getTrackById(t);
    return this.getSample(i, e);
  }
  releaseUsedSamples(t, e) {
    let i = 0, r = this.getTrackById(t);
    r.lastValidSample || (r.lastValidSample = 0);
    for (let n = r.lastValidSample; n < e; n++) i += this.releaseSample(r, n);
    u.info("ISOFile", "Track #" + t + " released samples up to " + e + " (released size: " + i + ", remaining: " + this.samplesDataSize + ")"), r.lastValidSample = e;
  }
  start() {
    this.sampleProcessingStarted = true, this.processSamples(false);
  }
  stop() {
    this.sampleProcessingStarted = false;
  }
  flush() {
    u.info("ISOFile", "Flushing remaining samples"), this.updateSampleLists(), this.processSamples(true), this.stream.cleanBuffers(), this.stream.logBufferLevel(true);
  }
  seekTrack(t, e, i) {
    let r = 0, n = 0, o = null;
    if (i.samples.length === 0) return u.info("ISOFile", "No sample in track, cannot seek! Using time " + u.getDurationString(0, 1) + " and offset: 0"), { offset: 0, time: 0 };
    for (let l = 0; l < i.samples.length; l++) {
      let d = i.samples[l];
      if (l === 0) n = 0, o = d.timescale;
      else if (d.cts > t * d.timescale) {
        n = l - 1;
        break;
      }
      e && d.is_sync && (r = l);
    }
    for (e && (n = r), t = i.samples[n].cts, i.nextSample = n; i.samples[n].alreadyRead === i.samples[n].size && i.samples[n + 1]; ) n++;
    let a = i.samples[n].offset + i.samples[n].alreadyRead;
    return u.info("ISOFile", "Seeking to " + (e ? "RAP" : "") + " sample #" + i.nextSample + " on track " + i.tkhd.track_id + ", time " + u.getDurationString(t, o) + " and offset: " + a), { offset: a, time: t / o };
  }
  getTrackDuration(t) {
    if (!t.samples) return 1 / 0;
    let e = t.samples[t.samples.length - 1];
    return (e.cts + e.duration) / e.timescale;
  }
  seek(t, e) {
    let i = this.moov, r = { offset: 1 / 0, time: 1 / 0 };
    if (this.moov) {
      for (let n = 0; n < i.traks.length; n++) {
        let o = i.traks[n];
        if (t > this.getTrackDuration(o)) continue;
        let a = this.seekTrack(t, e, o);
        a.offset < r.offset && (r.offset = a.offset), a.time < r.time && (r.time = a.time);
      }
      return u.info("ISOFile", "Seeking at time " + u.getDurationString(r.time, 1) + " needs a buffer with a fileStart position of " + r.offset), r.offset === 1 / 0 ? r = { offset: this.nextParsePosition, time: 0 } : r.offset = this.stream.getEndFilePositionAfter(r.offset), u.info("ISOFile", "Adjusted seek position (after checking data already in buffer): " + r.offset), r;
    } else throw new Error("Cannot seek: moov not received!");
  }
  equal(t) {
    let e = 0;
    for (; e < this.boxes.length && e < t.boxes.length; ) {
      let i = this.boxes[e], r = t.boxes[e];
      if (!bt(i, r)) return false;
      e++;
    }
    return true;
  }
  write(t) {
    for (let e = 0; e < this.boxes.length; e++) this.boxes[e].write(t);
  }
  createFragment(t, e, i) {
    let r = this.getTrackById(t), n = this.getSample(r, e);
    if (n === null) return this.setNextSeekPositionFromSample(r.samples[e]), null;
    let o = i || new E();
    o.endianness = 1;
    let a = this.createSingleSampleMoof(n);
    a.write(o), a.trafs[0].truns[0].data_offset = a.size + 8, u.debug("MP4Box", "Adjusting data_offset with new value " + a.trafs[0].truns[0].data_offset), o.adjustUint32(a.trafs[0].truns[0].data_offset_position, a.trafs[0].truns[0].data_offset);
    let l = new te();
    return l.data = n.data, l.write(o), o;
  }
  static writeInitializationSegment(t, e, i, r) {
    u.debug("ISOFile", "Generating initialization segment");
    let n = new E();
    n.endianness = 1, t.write(n);
    let o = e.addBox(new pe());
    if (i) {
      let a = o.addBox(new De());
      a.fragment_duration = i;
    }
    for (let a = 0; a < e.traks.length; a++) {
      let l = o.addBox(new xe());
      l.track_id = e.traks[a].tkhd.track_id, l.default_sample_description_index = 1, l.default_sample_duration = r, l.default_sample_size = 0, l.default_sample_flags = 65536;
    }
    return e.write(n), n.buffer;
  }
  save(t) {
    let e = new E();
    return e.endianness = 1, this.write(e), e.save(t);
  }
  getBuffer() {
    let t = new E();
    return t.endianness = 1, this.write(t), t.buffer;
  }
  initializeSegmentation() {
    this.onSegment === null && u.warn("MP4Box", "No segmentation callback set!"), this.isFragmentationInitialized || (this.isFragmentationInitialized = true, this.nextMoofNumber = 0, this.resetTables());
    let t = [];
    for (let e = 0; e < this.fragmentedTracks.length; e++) {
      let i = new ce();
      i.mvhd = this.moov.mvhd, i.addBox(i.mvhd);
      let r = this.getTrackById(this.fragmentedTracks[e].id);
      i.addBox(r), i.traks.push(r);
      let n = { id: r.tkhd.track_id, user: this.fragmentedTracks[e].user, buffer: s3.writeInitializationSegment(this.ftyp, i, this.moov.mvex && this.moov.mvex.mehd ? this.moov.mvex.mehd.fragment_duration : void 0, this.moov.traks[e].samples.length > 0 ? this.moov.traks[e].samples[0].duration : 0) };
      t.push(n);
    }
    return t;
  }
  resetTables() {
    this.initial_duration = this.moov.mvhd.duration, this.moov.mvhd.duration = 0;
    for (let t = 0; t < this.moov.traks.length; t++) {
      let e = this.moov.traks[t];
      e.tkhd.duration = 0, e.mdia.mdhd.duration = 0;
      let i = e.mdia.minf.stbl.stco || e.mdia.minf.stbl.co64;
      i.chunk_offsets = [];
      let r = e.mdia.minf.stbl.stsc;
      r.first_chunk = [], r.samples_per_chunk = [], r.sample_description_index = [];
      let n = e.mdia.minf.stbl.stsz || e.mdia.minf.stbl.stz2;
      n.sample_sizes = [];
      let o = e.mdia.minf.stbl.stts;
      o.sample_counts = [], o.sample_deltas = [];
      let a = e.mdia.minf.stbl.ctts;
      a && (a.sample_counts = [], a.sample_offsets = []);
      let l = e.mdia.minf.stbl.stss, d = e.mdia.minf.stbl.boxes.indexOf(l);
      d !== -1 && (e.mdia.minf.stbl.boxes[d] = null);
    }
  }
  static initSampleGroups(t, e, i, r, n) {
    e && (e.sample_groups_info = []), t.sample_groups_info || (t.sample_groups_info = []);
    for (let o = 0; o < i.length; o++) {
      let a = i[o].grouping_type + "/" + i[o].grouping_type_parameter, l = new Je(i[o].grouping_type, i[o].grouping_type_parameter, i[o]);
      e && (e.sample_groups_info[a] = l), t.sample_groups_info[a] || (t.sample_groups_info[a] = l);
      for (let d = 0; d < r.length; d++) r[d].grouping_type === i[o].grouping_type && (l.description = r[d], l.description.used = true);
      if (n) for (let d = 0; d < n.length; d++) n[d].grouping_type === i[o].grouping_type && (l.fragment_description = n[d], l.fragment_description.used = true, l.is_fragment = true);
    }
    if (e) {
      if (n) {
        for (let o = 0; o < n.length; o++) if (!n[o].used && n[o].version >= 2) {
          let a = n[o].grouping_type + "/0", l = new Je(n[o].grouping_type, 0);
          l.is_fragment = true, e.sample_groups_info[a] || (e.sample_groups_info[a] = l);
        }
      }
    } else for (let o = 0; o < r.length; o++) if (!r[o].used && r[o].version >= 2) {
      let a = r[o].grouping_type + "/0", l = new Je(r[o].grouping_type, 0);
      t.sample_groups_info[a] || (t.sample_groups_info[a] = l);
    }
  }
  static setSampleGroupProperties(t, e, i, r) {
    e.sample_groups = [];
    for (let n in r) if (e.sample_groups[n] = { grouping_type: r[n].grouping_type, grouping_type_parameter: r[n].grouping_type_parameter }, i >= r[n].last_sample_in_run && (r[n].last_sample_in_run < 0 && (r[n].last_sample_in_run = 0), r[n].entry_index++, r[n].entry_index <= r[n].sbgp.entries.length - 1 && (r[n].last_sample_in_run += r[n].sbgp.entries[r[n].entry_index].sample_count)), r[n].entry_index <= r[n].sbgp.entries.length - 1 ? e.sample_groups[n].group_description_index = r[n].sbgp.entries[r[n].entry_index].group_description_index : e.sample_groups[n].group_description_index = -1, e.sample_groups[n].group_description_index !== 0) {
      let o;
      if (r[n].fragment_description ? o = r[n].fragment_description : o = r[n].description, e.sample_groups[n].group_description_index > 0) {
        let a;
        e.sample_groups[n].group_description_index > 65535 ? a = (e.sample_groups[n].group_description_index >> 16) - 1 : a = e.sample_groups[n].group_description_index - 1, o && a >= 0 && (e.sample_groups[n].description = o.entries[a]);
      } else o && o.version >= 2 && o.default_group_description_index > 0 && (e.sample_groups[n].description = o.entries[o.default_group_description_index - 1]);
    }
  }
  static process_sdtp(t, e, i) {
    e && (t ? (e.is_leading = t.is_leading[i], e.depends_on = t.sample_depends_on[i], e.is_depended_on = t.sample_is_depended_on[i], e.has_redundancy = t.sample_has_redundancy[i]) : (e.is_leading = 0, e.depends_on = 0, e.is_depended_on = 0, e.has_redundancy = 0));
  }
  buildSampleLists() {
    for (let t = 0; t < this.moov.traks.length; t++) this.buildTrakSampleLists(this.moov.traks[t]);
  }
  buildTrakSampleLists(t) {
    let e, i, r, n, o, a;
    t.samples = [], t.samples_duration = 0, t.samples_size = 0;
    let l = t.mdia.minf.stbl.stco || t.mdia.minf.stbl.co64, d = t.mdia.minf.stbl.stsc, p = t.mdia.minf.stbl.stsz || t.mdia.minf.stbl.stz2, m = t.mdia.minf.stbl.stts, h = t.mdia.minf.stbl.ctts, x = t.mdia.minf.stbl.stss, B = t.mdia.minf.stbl.stsd, g = t.mdia.minf.stbl.subs, z = t.mdia.minf.stbl.stdp, k = t.mdia.minf.stbl.sbgps, P = t.mdia.minf.stbl.sgpds, T = -1, C = -1, U = -1, O = -1, se = 0, L = 0, H = 0;
    if (s3.initSampleGroups(t, null, k, P), !(typeof p > "u")) {
      for (e = 0; e < p.sample_sizes.length; e++) {
        let y = { number: e, track_id: t.tkhd.track_id, timescale: t.mdia.mdhd.timescale, alreadyRead: 0, size: p.sample_sizes[e] };
        t.samples[e] = y, t.samples_size += y.size, e === 0 ? (r = 1, i = 0, y.chunk_index = r, y.chunk_run_index = i, a = d.samples_per_chunk[i], o = 0, i + 1 < d.first_chunk.length ? n = d.first_chunk[i + 1] - 1 : n = 1 / 0) : e < a ? (y.chunk_index = r, y.chunk_run_index = i) : (r++, y.chunk_index = r, o = 0, r <= n || (i++, i + 1 < d.first_chunk.length ? n = d.first_chunk[i + 1] - 1 : n = 1 / 0), y.chunk_run_index = i, a += d.samples_per_chunk[i]), y.description_index = d.sample_description_index[y.chunk_run_index] - 1, y.description = B.entries[y.description_index], y.offset = l.chunk_offsets[y.chunk_index - 1] + o, o += y.size, e > T && (C++, T < 0 && (T = 0), T += m.sample_counts[C]), e > 0 ? (t.samples[e - 1].duration = m.sample_deltas[C], t.samples_duration += t.samples[e - 1].duration, y.dts = t.samples[e - 1].dts + t.samples[e - 1].duration) : y.dts = 0, h ? (e >= U && (O++, U < 0 && (U = 0), U += h.sample_counts[O]), y.cts = t.samples[e].dts + h.sample_offsets[O]) : y.cts = y.dts, x ? (e === x.sample_numbers[se] - 1 ? (y.is_sync = true, se++) : (y.is_sync = false, y.degradation_priority = 0), g && g.entries[L].sample_delta + H === e + 1 && (y.subsamples = g.entries[L].subsamples, H += g.entries[L].sample_delta, L++)) : y.is_sync = true, s3.process_sdtp(t.mdia.minf.stbl.sdtp, y, y.number), z ? y.degradation_priority = z.priority[e] : y.degradation_priority = 0, g && g.entries[L].sample_delta + H === e && (y.subsamples = g.entries[L].subsamples, H += g.entries[L].sample_delta), (k.length > 0 || P.length > 0) && s3.setSampleGroupProperties(t, y, e, t.sample_groups_info);
      }
      e > 0 && (t.samples[e - 1].duration = Math.max(t.mdia.mdhd.duration - t.samples[e - 1].dts, 0), t.samples_duration += t.samples[e - 1].duration);
    }
  }
  updateSampleLists() {
    let t, e, i, r, n;
    if (this.moov !== void 0) for (; this.lastMoofIndex < this.moofs.length; ) {
      let o = this.moofs[this.lastMoofIndex];
      if (this.lastMoofIndex++, o.type === "moof") {
        let a = o;
        for (let l = 0; l < a.trafs.length; l++) {
          let d = a.trafs[l], p = this.getTrackById(d.tfhd.track_id), m = this.getTrexById(d.tfhd.track_id);
          d.tfhd.flags & oe ? t = d.tfhd.default_sample_description_index : t = m ? m.default_sample_description_index : 1, d.tfhd.flags & ae ? e = d.tfhd.default_sample_duration : e = m ? m.default_sample_duration : 0, d.tfhd.flags & fe ? i = d.tfhd.default_sample_size : i = m ? m.default_sample_size : 0, d.tfhd.flags & le ? r = d.tfhd.default_sample_flags : r = m ? m.default_sample_flags : 0, d.sample_number = 0, d.sbgps.length > 0 && s3.initSampleGroups(p, d, d.sbgps, p.mdia.minf.stbl.sgpds, d.sgpds);
          for (let h = 0; h < d.truns.length; h++) {
            let x = d.truns[h];
            for (let B = 0; B < x.sample_count; B++) {
              let g = t - 1, z = r;
              x.flags & J ? z = x.sample_flags[B] : B === 0 && x.flags & de && (z = x.first_sample_flags);
              let k = i;
              x.flags & X && (k = x.sample_size[B]), p.samples_size += k;
              let P = e;
              x.flags & Z && (P = x.sample_duration[B]), p.samples_duration += P;
              let T;
              p.first_traf_merged || B > 0 ? T = p.samples[p.samples.length - 1].dts + p.samples[p.samples.length - 1].duration : (d.tfdt ? T = d.tfdt.baseMediaDecodeTime : T = 0, p.first_traf_merged = true);
              let C = T;
              x.flags & Q && (C = T + x.sample_composition_time_offset[B]);
              let U = !!(d.tfhd.flags & ne), O = !!(d.tfhd.flags & _t), se = !!(x.flags & W), L = 0;
              U ? L = d.tfhd.base_data_offset : O || h === 0 ? L = a.start : L = n;
              let H;
              h === 0 && B === 0 ? se ? H = L + x.data_offset : H = L : H = n, n = H + k;
              let y = d.sample_number;
              d.sample_number++;
              let ht = { cts: C, description_index: g, description: p.mdia.minf.stbl.stsd.entries[g], dts: T, duration: P, moof_number: this.lastMoofIndex, number_in_traf: y, number: p.samples.length, offset: H, size: k, timescale: p.mdia.mdhd.timescale, track_id: p.tkhd.track_id, is_sync: !(z >> 16 & 1), is_leading: z >> 26 & 3, depends_on: z >> 24 & 3, is_depended_on: z >> 22 & 3, has_redundancy: z >> 20 & 3, degradation_priority: z & 65535 };
              d.first_sample_index = p.samples.length, p.samples.push(ht), (d.sbgps.length > 0 || d.sgpds.length > 0 || p.mdia.minf.stbl.sbgps.length > 0 || p.mdia.minf.stbl.sgpds.length > 0) && s3.setSampleGroupProperties(p, ht, ht.number_in_traf, d.sample_groups_info);
            }
          }
          if (d.subs) {
            p.has_fragment_subsamples = true;
            let h = d.first_sample_index;
            for (let x = 0; x < d.subs.entries.length; x++) {
              h += d.subs.entries[x].sample_delta;
              let B = p.samples[h - 1];
              B.subsamples = d.subs.entries[x].subsamples;
            }
          }
        }
      }
    }
  }
  getSample(t, e) {
    let i = t.samples[e];
    if (!this.moov) return null;
    if (!i.data) i.data = new Uint8Array(i.size), i.alreadyRead = 0, this.samplesDataSize += i.size, u.debug("ISOFile", "Allocating sample #" + e + " on track #" + t.tkhd.track_id + " of size " + i.size + " (total: " + this.samplesDataSize + ")");
    else if (i.alreadyRead === i.size) return i;
    for (; ; ) {
      let r = this.stream.findPosition(true, i.offset + i.alreadyRead, false);
      if (r > -1) {
        let n = this.stream.buffers[r], o = n.byteLength - (i.offset + i.alreadyRead - n.fileStart);
        if (i.size - i.alreadyRead <= o) return u.debug("ISOFile", "Getting sample #" + e + " data (alreadyRead: " + i.alreadyRead + " offset: " + (i.offset + i.alreadyRead - n.fileStart) + " read size: " + (i.size - i.alreadyRead) + " full size: " + i.size + ")"), E.memcpy(i.data.buffer, i.alreadyRead, n, i.offset + i.alreadyRead - n.fileStart, i.size - i.alreadyRead), n.usedBytes += i.size - i.alreadyRead, this.stream.logBufferLevel(), i.alreadyRead = i.size, i;
        if (o === 0) return null;
        u.debug("ISOFile", "Getting sample #" + e + " partial data (alreadyRead: " + i.alreadyRead + " offset: " + (i.offset + i.alreadyRead - n.fileStart) + " read size: " + o + " full size: " + i.size + ")"), E.memcpy(i.data.buffer, i.alreadyRead, n, i.offset + i.alreadyRead - n.fileStart, o), i.alreadyRead += o, n.usedBytes += o, this.stream.logBufferLevel();
      } else return null;
    }
  }
  releaseSample(t, e) {
    let i = t.samples[e];
    return i.data ? (this.samplesDataSize -= i.size, i.data = null, i.alreadyRead = 0, i.size) : 0;
  }
  getAllocatedSampleDataSize() {
    return this.samplesDataSize;
  }
  getCodecs() {
    let t = "";
    for (let e = 0; e < this.moov.traks.length; e++) {
      let i = this.moov.traks[e];
      e > 0 && (t += ","), t += i.mdia.minf.stbl.stsd.entries[0].getCodec();
    }
    return t;
  }
  getTrexById(t) {
    if (!this.moov || !this.moov.mvex) return null;
    for (let e = 0; e < this.moov.mvex.trexs.length; e++) {
      let i = this.moov.mvex.trexs[e];
      if (i.track_id === t) return i;
    }
    return null;
  }
  getTrackById(t) {
    if (this.moov === void 0) return null;
    for (let e = 0; e < this.moov.traks.length; e++) {
      let i = this.moov.traks[e];
      if (i.tkhd.track_id === t) return i;
    }
    return null;
  }
  flattenItemInfo() {
    let t = this.items, e = this.entity_groups, i = this.meta;
    if (i != null && i.hdlr !== void 0 && i.iinf !== void 0) {
      for (let r = 0; r < i.iinf.item_infos.length; r++) {
        let n = i.iinf.item_infos[r].item_ID;
        t[n] = { id: n, name: i.iinf.item_infos[r].item_name, ref_to: [], content_type: i.iinf.item_infos[r].content_type, content_encoding: i.iinf.item_infos[r].content_encoding, item_uri_type: i.iinf.item_infos[r].item_uri_type, type: i.iinf.item_infos[r].item_type ? i.iinf.item_infos[r].item_type : "mime", protection: i.iinf.item_infos[r].item_protection_index > 0 ? i.ipro.protections[i.iinf.item_infos[r].item_protection_index - 1] : void 0 };
      }
      if (i.grpl) for (let r = 0; r < i.grpl.boxes.length; r++) {
        let n = i.grpl.boxes[r];
        e[n.group_id] = { id: n.group_id, entity_ids: n.entity_ids, type: n.type };
      }
      if (i.iloc) for (let r = 0; r < i.iloc.items.length; r++) {
        let n = i.iloc.items[r], o = t[n.item_ID];
        n.data_reference_index !== 0 && (u.warn("Item storage with reference to other files: not supported"), o.source = i.dinf.boxes[n.data_reference_index - 1]), o.extents = [], o.size = 0;
        for (let a = 0; a < n.extents.length; a++) o.extents[a] = { offset: n.extents[a].extent_offset + n.base_offset, length: n.extents[a].extent_length, alreadyRead: 0 }, n.construction_method === 1 && (o.extents[a].offset += i.idat.start + i.idat.hdr_size), o.size += o.extents[a].length;
      }
      if (i.pitm && (t[i.pitm.item_id].primary = true), i.iref) for (let r = 0; r < i.iref.references.length; r++) {
        let n = i.iref.references[r];
        for (let o = 0; o < n.references.length; o++) t[n.from_item_ID].ref_to.push({ type: n.type, id: n.references[o] });
      }
      if (i.iprp) for (let r = 0; r < i.iprp.ipmas.length; r++) {
        let n = i.iprp.ipmas[r];
        for (let o = 0; o < n.associations.length; o++) {
          let a = n.associations[o], l = t[a.id] ?? e[a.id];
          if (l) {
            l.properties === void 0 && (l.properties = { boxes: [] });
            for (let d = 0; d < a.props.length; d++) {
              let p = a.props[d];
              if (p.property_index > 0 && p.property_index - 1 < i.iprp.ipco.boxes.length) {
                let m = i.iprp.ipco.boxes[p.property_index - 1];
                l.properties[m.type] = m, l.properties.boxes.push(m);
              }
            }
          }
        }
      }
    }
  }
  getItem(t) {
    if (!this.meta) return null;
    let e = this.items[t];
    if (!e.data && e.size) e.data = new Uint8Array(e.size), e.alreadyRead = 0, this.itemsDataSize += e.size, u.debug("ISOFile", "Allocating item #" + t + " of size " + e.size + " (total: " + this.itemsDataSize + ")");
    else if (e.alreadyRead === e.size) return e;
    for (let i = 0; i < e.extents.length; i++) {
      let r = e.extents[i];
      if (r.alreadyRead !== r.length) {
        let n = this.stream.findPosition(true, r.offset + r.alreadyRead, false);
        if (n > -1) {
          let o = this.stream.buffers[n], a = o.byteLength - (r.offset + r.alreadyRead - o.fileStart);
          if (r.length - r.alreadyRead <= a) u.debug("ISOFile", "Getting item #" + t + " extent #" + i + " data (alreadyRead: " + r.alreadyRead + " offset: " + (r.offset + r.alreadyRead - o.fileStart) + " read size: " + (r.length - r.alreadyRead) + " full extent size: " + r.length + " full item size: " + e.size + ")"), E.memcpy(e.data.buffer, e.alreadyRead, o, r.offset + r.alreadyRead - o.fileStart, r.length - r.alreadyRead), o.usedBytes += r.length - r.alreadyRead, this.stream.logBufferLevel(), e.alreadyRead += r.length - r.alreadyRead, r.alreadyRead = r.length;
          else return u.debug("ISOFile", "Getting item #" + t + " extent #" + i + " partial data (alreadyRead: " + r.alreadyRead + " offset: " + (r.offset + r.alreadyRead - o.fileStart) + " read size: " + a + " full extent size: " + r.length + " full item size: " + e.size + ")"), E.memcpy(e.data.buffer, e.alreadyRead, o, r.offset + r.alreadyRead - o.fileStart, a), r.alreadyRead += a, e.alreadyRead += a, o.usedBytes += a, this.stream.logBufferLevel(), null;
        } else return null;
      }
    }
    return e.alreadyRead === e.size ? e : null;
  }
  releaseItem(t) {
    let e = this.items[t];
    if (e.data) {
      this.itemsDataSize -= e.size, e.data = null, e.alreadyRead = 0;
      for (let i = 0; i < e.extents.length; i++) {
        let r = e.extents[i];
        r.alreadyRead = 0;
      }
      return e.size;
    } else return 0;
  }
  processItems(t) {
    for (let e in this.items) {
      let i = this.items[e];
      this.getItem(i.id), t && !i.sent && (t(i), i.sent = true, i.data = null);
    }
  }
  hasItem(t) {
    for (let e in this.items) {
      let i = this.items[e];
      if (i.name === t) return i.id;
    }
    return -1;
  }
  getMetaHandler() {
    return this.meta ? this.meta.hdlr.handler : null;
  }
  getPrimaryItem() {
    return !this.meta || !this.meta.pitm ? null : this.getItem(this.meta.pitm.item_id);
  }
  itemToFragmentedTrackFile({ itemId: t } = {}) {
    let e = null;
    if (t ? e = this.getItem(t) : e = this.getPrimaryItem(), e === null) return null;
    let i = new s3();
    i.discardMdatData = false;
    let r = { type: e.type, description_boxes: e.properties.boxes };
    e.properties.ispe && (r.width = e.properties.ispe.image_width, r.height = e.properties.ispe.image_height);
    let n = i.addTrack(r);
    return n ? (i.addSample(n, e.data), i) : null;
  }
  processIncompleteBox(t) {
    if (t.type === "mdat") {
      let e = new te(t.size);
      return this.parsingMdat = e, this.boxes.push(e), this.mdats.push(e), e.start = t.start, e.hdr_size = t.hdr_size, this.stream.addUsedBytes(e.hdr_size), this.lastBoxStartPosition = e.start + e.size, this.stream.seek(e.start + e.size, false, this.discardMdatData) ? (this.parsingMdat = null, true) : (this.moovStartFound ? this.nextParsePosition = this.stream.findEndContiguousBuf() : this.nextParsePosition = e.start + e.size, false);
    } else return t.type === "moov" && (this.moovStartFound = true, this.mdats.length === 0 && (this.isProgressive = true)), (this.stream.mergeNextBuffer ? this.stream.mergeNextBuffer() : false) ? (this.nextParsePosition = this.stream.getEndPosition(), true) : (t.type ? this.moovStartFound ? this.nextParsePosition = this.stream.getEndPosition() : this.nextParsePosition = this.stream.getPosition() + t.size : this.nextParsePosition = this.stream.getEndPosition(), false);
  }
  hasIncompleteMdat() {
    return this.parsingMdat !== null;
  }
  processIncompleteMdat() {
    let t = this.parsingMdat;
    return this.stream.seek(t.start + t.size, false, this.discardMdatData) ? (u.debug("ISOFile", "Found 'mdat' end in buffered data"), this.parsingMdat = null, true) : (this.nextParsePosition = this.stream.findEndContiguousBuf(), false);
  }
  restoreParsePosition() {
    return this.stream.seek(this.lastBoxStartPosition, true, this.discardMdatData);
  }
  saveParsePosition() {
    this.lastBoxStartPosition = this.stream.getPosition();
  }
  updateUsedBytes(t, e) {
    this.stream.addUsedBytes && (t.type === "mdat" ? (this.stream.addUsedBytes(t.hdr_size), this.discardMdatData && this.stream.addUsedBytes(t.size - t.hdr_size)) : this.stream.addUsedBytes(t.size));
  }
  addBox(t) {
    return c.prototype.addBox.call(this, t);
  }
  init(t = {}) {
    let e = this.addBox(new Te());
    e.major_brand = t.brands && t.brands[0] || "iso4", e.minor_version = 0, e.compatible_brands = t.brands || ["iso4"];
    let i = this.addBox(new ce());
    i.addBox(new pe());
    let r = i.addBox(new Ce());
    return r.timescale = t.timescale || 600, r.rate = t.rate || 65536, r.creation_time = 0, r.modification_time = 0, r.duration = t.duration || 0, r.volume = t.width ? 0 : 256, r.matrix = [65536, 0, 0, 0, 65536, 0, 0, 0, 1073741824], r.next_track_id = 1, this;
  }
  addTrack(t = {}) {
    this.moov || this.init(t);
    let e = t || {};
    e.width = e.width || 320, e.height = e.height || 320, e.id = e.id || this.moov.mvhd.next_track_id, e.type = e.type || "avc1";
    let i = this.moov.addBox(new Be());
    this.moov.mvhd.next_track_id = e.id + 1;
    let r = i.addBox(new $e());
    r.flags = jn | Kn | qn, r.creation_time = 0, r.modification_time = 0, r.track_id = e.id, r.duration = e.duration || 0, r.layer = e.layer || 0, r.alternate_group = 0, r.volume = 1, r.matrix = [65536, 0, 0, 0, 65536, 0, 0, 0, 1073741824], r.width = e.width << 16, r.height = e.height << 16;
    let n = i.addBox(new Ue()), o = n.addBox(new Le());
    o.creation_time = 0, o.modification_time = 0, o.timescale = e.timescale || 1, o.duration = e.media_duration || 0, o.language = e.language || "und";
    let a = n.addBox(new Ee());
    a.handler = e.hdlr || "vide", a.name = e.name || "Track created with MP4Box.js";
    let l = n.addBox(new ke());
    l.extended_language = e.language || "fr-FR";
    let d = n.addBox(new we()), p = v.sampleEntry[e.type];
    if (!p) return;
    let m = new p();
    if (m.data_reference_index = 1, m instanceof S) {
      let U = m, O = d.addBox(new Xe());
      O.graphicsmode = 0, O.opcolor = [0, 0, 0], U.width = e.width, U.height = e.height, U.horizresolution = 72 << 16, U.vertresolution = 72 << 16, U.frame_count = 1, U.compressorname = e.type + " Compressor", U.depth = 24, e.avcDecoderConfigRecord ? U.addBox(new ge()).parse(new V(e.avcDecoderConfigRecord)) : e.hevcDecoderConfigRecord && U.addBox(new Fe()).parse(new V(e.hevcDecoderConfigRecord));
    } else if (m instanceof I) {
      let U = m, O = d.addBox(new Re());
      O.balance = e.balance || 0, U.channel_count = e.channel_count || 2, U.samplesize = e.samplesize || 16, U.samplerate = e.samplerate || 65536;
    } else m instanceof ye ? d.addBox(new Se()) : m instanceof F ? (d.addBox(new He()), m instanceof Ne && (m.namespace = e.namespace || "nonamespace", m.schema_location = e.schema_location || "", m.auxiliary_mime_types = e.auxiliary_mime_types || "")) : m instanceof D ? d.addBox(new ie()) : m instanceof ee ? d.addBox(new ie()) : d.addBox(new ie());
    e.description && m.addBox.call(m, e.description), e.description_boxes && e.description_boxes.forEach(function(U) {
      m.addBox.call(m, U);
    }), d.addBox(new ve());
    let h = d.addBox(new ze()), x = new Ze();
    x.flags = 1, h.addEntry(x);
    let B = d.addBox(new Ae());
    B.addBox(new Ve()).addEntry(m);
    let z = B.addBox(new Ke());
    z.sample_counts = [], z.sample_deltas = [];
    let k = B.addBox(new Ge());
    k.first_chunk = [], k.samples_per_chunk = [], k.sample_description_index = [];
    let P = B.addBox(new Oe());
    P.chunk_offsets = [];
    let T = B.addBox(new je());
    T.sample_sizes = [];
    let C = this.moov.mvex.addBox(new xe());
    return C.track_id = e.id, C.default_sample_description_index = e.default_sample_description_index || 1, C.default_sample_duration = e.default_sample_duration || 0, C.default_sample_size = e.default_sample_size || 0, C.default_sample_flags = e.default_sample_flags || 0, this.buildTrakSampleLists(i), e.id;
  }
  addSample(t, e, { sample_description_index: i, duration: r = 1, cts: n = 0, dts: o = 0, is_sync: a = false, is_leading: l = 0, depends_on: d = 0, is_depended_on: p = 0, has_redundancy: m = 0, degradation_priority: h = 0, offset: x = 0, subsamples: B } = {}) {
    let g = this.getTrackById(t);
    if (g === null) return;
    let z = i ? i - 1 : 0, k = { number: g.samples.length, track_id: g.tkhd.track_id, timescale: g.mdia.mdhd.timescale, description_index: z, description: g.mdia.minf.stbl.stsd.entries[z], data: e, size: e.byteLength, alreadyRead: e.byteLength, duration: r, cts: n, dts: o, is_sync: a, is_leading: l, depends_on: d, is_depended_on: p, has_redundancy: m, degradation_priority: h, offset: x, subsamples: B };
    g.samples.push(k), g.samples_size += k.size, g.samples_duration += k.duration, g.first_dts === void 0 && (g.first_dts = o), this.processSamples();
    let P = this.addBox(this.createSingleSampleMoof(k));
    P.computeSize(), P.trafs[0].truns[0].data_offset = P.size + 8;
    let T = this.addBox(new te());
    return T.data = new Uint8Array(e), k;
  }
  createSingleSampleMoof(t) {
    let e = 0;
    t.is_sync ? e = 1 << 25 : e = 65536;
    let i = new Me(), r = i.addBox(new Pe());
    r.sequence_number = this.nextMoofNumber, this.nextMoofNumber++;
    let n = i.addBox(new Ie()), o = this.getTrackById(t.track_id), a = n.addBox(new Ye());
    a.track_id = t.track_id, a.flags = _t;
    let l = n.addBox(new qe());
    l.baseMediaDecodeTime = t.dts - (o.first_dts || 0);
    let d = n.addBox(new We());
    return d.flags = W | Z | X | J | Q, d.data_offset = 0, d.first_sample_flags = 0, d.sample_count = 1, d.sample_duration = [t.duration], d.sample_size = [t.size], d.sample_flags = [e], d.sample_composition_time_offset = [t.cts - t.dts], i;
  }
  print(t) {
    t.indent = "";
    for (let e = 0; e < this.boxes.length; e++) this.boxes[e] && this.boxes[e].print(t);
  }
};
function au(s6 = true, t) {
  let e = new dt(t);
  return e.discardMdatData = !s6, e;
}
var lr = {};
Vn(lr, { Descriptor: () => Y, ES_Descriptor: () => pt, MPEG4DescriptorParser: () => ar });
var Qn = 3;
var ct = 4;
var fr = 5;
var eo = 6;
var Y = class s4 {
  constructor(t, e) {
    this.tag = t;
    this.size = e;
    this.descs = [];
  }
  parse(t) {
    this.data = t.readUint8Array(this.size);
  }
  findDescriptor(t) {
    for (let e = 0; e < this.descs.length; e++) if (this.descs[e].tag === t) return this.descs[e];
    return null;
  }
  parseOneDescriptor(t) {
    let e = 0, i = t.readUint8(), r = t.readUint8();
    for (; r & 128; ) e = (e << 7) + (r & 127), r = t.readUint8();
    e = (e << 7) + (r & 127), u.debug("Descriptor", "Found " + (ut[i] || "Descriptor " + i) + ", size " + e + " at position " + t.getPosition());
    let n = ut[i] ? new mo[ut[i]](e) : new s4(e);
    return n.parse(t), n;
  }
  parseRemainingDescriptors(t) {
    let e = t.getPosition();
    for (; t.getPosition() < e + this.size; ) {
      let i = this.parseOneDescriptor?.(t);
      this.descs.push(i);
    }
  }
};
var pt = class extends Y {
  constructor(t) {
    super(Qn, t);
  }
  parse(t) {
    if (this.ES_ID = t.readUint16(), this.flags = t.readUint8(), this.size -= 3, this.flags & 128 ? (this.dependsOn_ES_ID = t.readUint16(), this.size -= 2) : this.dependsOn_ES_ID = 0, this.flags & 64) {
      let e = t.readUint8();
      this.URL = t.readString(e), this.size -= e + 1;
    } else this.URL = "";
    this.flags & 32 ? (this.OCR_ES_ID = t.readUint16(), this.size -= 2) : this.OCR_ES_ID = 0, this.parseRemainingDescriptors(t);
  }
  getOTI() {
    let t = this.findDescriptor(ct);
    return t ? t.oti : 0;
  }
  getAudioConfig() {
    let t = this.findDescriptor(ct);
    if (!t) return null;
    let e = t.findDescriptor(fr);
    if (e && e.data) {
      let i = (e.data[0] & 248) >> 3;
      return i === 31 && e.data.length >= 2 && (i = 32 + ((e.data[0] & 7) << 3) + ((e.data[1] & 224) >> 5)), i;
    } else return null;
  }
};
var sr = class extends Y {
  constructor(t) {
    super(ct, t);
  }
  parse(t) {
    this.oti = t.readUint8(), this.streamType = t.readUint8(), this.upStream = (this.streamType >> 1 & 1) !== 0, this.streamType = this.streamType >>> 2, this.bufferSize = t.readUint24(), this.maxBitrate = t.readUint32(), this.avgBitrate = t.readUint32(), this.size -= 13, this.parseRemainingDescriptors(t);
  }
};
var nr = class extends Y {
  constructor(t) {
    super(fr, t);
  }
};
var or = class extends Y {
  constructor(t) {
    super(eo, t);
  }
};
var mo = { Descriptor: Y, ES_Descriptor: pt, DecoderConfigDescriptor: sr, DecoderSpecificInfo: nr, SLConfigDescriptor: or };
var ut = { [Qn]: "ES_Descriptor", [ct]: "DecoderConfigDescriptor", [fr]: "DecoderSpecificInfo", [eo]: "SLConfigDescriptor" };
var ar = class {
  constructor() {
    this.parseOneDescriptor = Y.prototype.parseOneDescriptor;
  }
  getDescriptorName(t) {
    return ut[t];
  }
};
var Gn = {};
Vn(Gn, { CoLLBox: () => Br, ItemContentIDPropertyBox: () => Hn, OpusSampleEntry: () => Pi, SmDmBox: () => Ns, a1lxBox: () => dr, a1opBox: () => ur, ac_3SampleEntry: () => Fi, ac_4SampleEntry: () => Li, aebrBox: () => Pr, afbrBox: () => Cr, albcBox: () => Nr, alstSampleGroupEntry: () => _n, altrBox: () => Rr, auxCBox: () => cr, av01SampleEntry: () => fi, av1CBox: () => Qt, avc1SampleEntry: () => si, avc2SampleEntry: () => ni, avc3SampleEntry: () => oi, avc4SampleEntry: () => ai, avcCBox: () => ge, avllSampleGroupEntry: () => xn, avs3SampleEntry: () => vi, avssSampleGroupEntry: () => bn, brstBox: () => Or, btrtBox: () => pr, bxmlBox: () => vt, ccstBox: () => mr, cdefBox: () => hr, clapBox: () => _r, clefBox: () => Ms, clliBox: () => xr, cmexBox: () => br, cminBox: () => yr, cmpdBox: () => gr, co64Box: () => Sr, colrBox: () => ri, cprtBox: () => Ur, cslgBox: () => wr, cttsBox: () => vr, dOpsBox: () => Er, dac3Box: () => Ar, dav1SampleEntry: () => li, dec3Box: () => Mr, dfLaBox: () => Ir, dimmBox: () => zr, dinfBox: () => ve, dmax: () => kr, dmedBox: () => Tr, dobrBox: () => Hr, drefBox: () => ze, drepBox: () => Fr, dtrtSampleGroupEntry: () => yn, dvh1SampleEntry: () => xi, dvheSampleEntry: () => bi, ec_3SampleEntry: () => Di, edtsBox: () => Mt, elngBox: () => ke, elstBox: () => Lr, emsgBox: () => Dr, encaSampleEntry: () => Vi, encmSampleEntry: () => $i, encsSampleEntry: () => Ki, enctSampleEntry: () => Yi, encuSampleEntry: () => ji, encvSampleEntry: () => Gi, enofBox: () => Is, eqivBox: () => Gr, esdsBox: () => ei, etypBox: () => jt, fLaCSampleEntry: () => Hi, favcBox: () => Vr, fielBox: () => Qr, fobrBox: () => jr, freeBox: () => St, frmaBox: () => es, ftypBox: () => Te, grplBox: () => Gt, hdlrBox: () => Ee, hev1SampleEntry: () => ci, hev2SampleEntry: () => pi, hinfBox: () => Et, hmhdBox: () => Se, hntiBox: () => Tt, hvc1SampleEntry: () => di, hvc2SampleEntry: () => ui, hvcCBox: () => Fe, hvt1SampleEntry: () => mi, iaugBox: () => Kr, idatBox: () => gt, iinfBox: () => qt, ilocBox: () => Yt, imirBox: () => ts, infeBox: () => Kt, iodsBox: () => Ut, ipcoBox: () => Ht, ipmaBox: () => is, iproBox: () => At, iprpBox: () => Ot, irefBox: () => $t, irotBox: () => rs, ispeBox: () => ss, itaiBox: () => ns, j2kHBox: () => Vt, j2kiSampleEntry: () => Ai, kindBox: () => os, levaBox: () => as, lhe1SampleEntry: () => hi, lhv1SampleEntry: () => _i, lhvCBox: () => fs, lselBox: () => ls, m4aeSampleEntry: () => Ei, maxrBox: () => ds, mdatBox: () => te, mdcvBox: () => us, mdhdBox: () => Le, mdiaBox: () => Ue, mecoBox: () => kt, mehdBox: () => De, metaBox: () => Zt, mettSampleEntry: () => Xt, metxSampleEntry: () => Jt, mfhdBox: () => Pe, mfraBox: () => zt, mfroBox: () => cs, mha1SampleEntry: () => Ci, mha2SampleEntry: () => Ni, mhm1SampleEntry: () => Ri, mhm2SampleEntry: () => Oi, minfBox: () => we, mjp2SampleEntry: () => Mi, mjpgSampleEntry: () => Ii, moofBox: () => Me, moovBox: () => ce, mp4aSampleEntry: () => Ti, mp4sSampleEntry: () => qi, mp4vSampleEntry: () => ki, mskCBox: () => ps, msrcTrackGroupTypeBox: () => sn, mvexBox: () => pe, mvhdBox: () => Ce, mvifSampleGroupEntry: () => gn, nmhdBox: () => ie, npckBox: () => ms, numpBox: () => hs, padbBox: () => xs, panoBox: () => qr, paspBox: () => bs, paylBox: () => ys, paytBox: () => gs, pdinBox: () => Ss, piffLsmBox: () => Dn, piffPsshBox: () => Pn, piffSencBox: () => Cn, piffTencBox: () => Nn, piffTfrfBox: () => Rn, piffTfxdBox: () => On, pitmBox: () => Wt, pixiBox: () => Bs, pmaxBox: () => Us, prdiBox: () => ws, prftBox: () => vs, prgrBox: () => Xr, profBox: () => zs, prolSampleGroupEntry: () => Sn, psshBox: () => As, pymdBox: () => Jr, rapSampleGroupEntry: () => Bn, rashSampleGroupEntry: () => Un, resvSampleEntry: () => Wi, rinfBox: () => Pt, rollSampleGroupEntry: () => wn, rtp_Box: () => Ts, saioBox: () => Es, saizBox: () => Fs, sbgpBox: () => er, sbpmBox: () => Ls, sbttSampleEntry: () => Zi, schiBox: () => Ct, schmBox: () => Ds, scifSampleGroupEntry: () => vn, scnmSampleGroupEntry: () => An, sdp_Box: () => Ps, sdtpBox: () => tr, seigSampleGroupEntry: () => Mn, sencBox: () => Cs, sgpdBox: () => ir, sidxBox: () => rr, sinfBox: () => Dt, skipBox: () => Bt, slidBox: () => Yr, smhdBox: () => Re, ssixBox: () => Rs, stblBox: () => Ae, stcoBox: () => Oe, stdpBox: () => Os, sterBox: () => $r, sthdBox: () => He, stppSampleEntry: () => Ne, strdBox: () => Lt, striBox: () => Hs, strkBox: () => Ft, stsaSampleGroupEntry: () => In, stscBox: () => Ge, stsdBox: () => Ve, stsgBox: () => Gs, stshBox: () => Vs, stssBox: () => js, stszBox: () => je, sttsBox: () => Ke, stviBox: () => Ks, stxtSampleEntry: () => Xi, stypBox: () => qs, stz2Box: () => Ys, subsBox: () => $s, syncSampleGroupEntry: () => zn, taicBox: () => Ws, taptBox: () => ks, teleSampleGroupEntry: () => kn, tencBox: () => Zs, tfdtBox: () => qe, tfhdBox: () => Ye, tfraBox: () => Xs, tkhdBox: () => $e, tmaxBox: () => Js, tminBox: () => Qs, totlBox: () => en, tpayBox: () => tn, tpylBox: () => rn, trafBox: () => Ie, trakBox: () => Be, trefBox: () => nn, trepBox: () => on, trexBox: () => xe, trgrBox: () => Nt, trpyBox: () => an, trunBox: () => We, tsasSampleGroupEntry: () => Tn, tsclSampleGroupEntry: () => En, tselBox: () => fn, tsynBox: () => Wr, tx3gSampleEntry: () => Ji, txtcBox: () => ln, tycoBox: () => dn, udesBox: () => un, udtaBox: () => Rt, uncCBox: () => cn, uncvSampleEntry: () => zi, urlBox: () => Ze, urnBox: () => pn, viprSampleGroupEntry: () => Fn, vmhdBox: () => Xe, vp08SampleEntry: () => Ui, vp09SampleEntry: () => wi, vpcCBox: () => ti, vttCBox: () => mn, vttcBox: () => It, vvc1SampleEntry: () => yi, vvcCBox: () => ii, vvcNSampleEntry: () => Bi, vvi1SampleEntry: () => gi, vvnCBox: () => hn, vvs1SampleEntry: () => Si, wbbrBox: () => Zr, wvttSampleEntry: () => Qi, xmlBox: () => wt });
var dr = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "AV1LayeredImageIndexingProperty";
  }
  static {
    this.fourcc = "a1lx";
  }
  parse(e) {
    let r = ((e.readUint8() & 1 & 1) + 1) * 16;
    this.layer_size = [];
    for (let n = 0; n < 3; n++) r === 16 ? this.layer_size[n] = e.readUint16() : this.layer_size[n] = e.readUint32();
  }
};
var ur = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "OperatingPointSelectorProperty";
  }
  static {
    this.fourcc = "a1op";
  }
  parse(e) {
    this.op_index = e.readUint8();
  }
};
var cr = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "AuxiliaryTypeProperty";
  }
  static {
    this.fourcc = "auxC";
  }
  parse(e) {
    this.parseFullHeader(e), this.aux_type = e.readCString();
    let i = this.size - this.hdr_size - (this.aux_type.length + 1);
    this.aux_subtype = e.readUint8Array(i);
  }
};
var pr = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "BitRateBox";
  }
  static {
    this.fourcc = "btrt";
  }
  parse(e) {
    this.bufferSizeDB = e.readUint32(), this.maxBitrate = e.readUint32(), this.avgBitrate = e.readUint32();
  }
};
var mr = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "CodingConstraintsBox";
  }
  static {
    this.fourcc = "ccst";
  }
  parse(e) {
    this.parseFullHeader(e);
    let i = e.readUint8();
    this.all_ref_pics_intra = (i & 128) === 128, this.intra_pred_used = (i & 64) === 64, this.max_ref_per_pic = (i & 63) >> 2, e.readUint24();
  }
};
var hr = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "ComponentDefinitionBox";
  }
  static {
    this.fourcc = "cdef";
  }
  parse(e) {
    this.channel_count = e.readUint16(), this.channel_indexes = [], this.channel_types = [], this.channel_associations = [];
    for (let i = 0; i < this.channel_count; i++) this.channel_indexes.push(e.readUint16()), this.channel_types.push(e.readUint16()), this.channel_associations.push(e.readUint16());
  }
};
var _r = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "CleanApertureBox";
  }
  static {
    this.fourcc = "clap";
  }
  parse(e) {
    this.cleanApertureWidthN = e.readUint32(), this.cleanApertureWidthD = e.readUint32(), this.cleanApertureHeightN = e.readUint32(), this.cleanApertureHeightD = e.readUint32(), this.horizOffN = e.readUint32(), this.horizOffD = e.readUint32(), this.vertOffN = e.readUint32(), this.vertOffD = e.readUint32();
  }
};
var xr = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "ContentLightLevelBox";
  }
  static {
    this.fourcc = "clli";
  }
  parse(e) {
    this.max_content_light_level = e.readUint16(), this.max_pic_average_light_level = e.readUint16();
  }
};
var br = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "CameraExtrinsicMatrixProperty";
  }
  static {
    this.fourcc = "cmex";
  }
  parse(e) {
    this.flags & 1 && (this.pos_x = e.readInt32()), this.flags & 2 && (this.pos_y = e.readInt32()), this.flags & 4 && (this.pos_z = e.readInt32()), this.flags & 8 && (this.version === 0 ? this.flags & 16 ? (this.quat_x = e.readInt32(), this.quat_y = e.readInt32(), this.quat_z = e.readInt32()) : (this.quat_x = e.readInt16(), this.quat_y = e.readInt16(), this.quat_z = e.readInt16()) : this.version), this.flags & 32 && (this.id = e.readUint32());
  }
};
var yr = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "CameraIntrinsicMatrixProperty";
  }
  static {
    this.fourcc = "cmin";
  }
  parse(e) {
    this.focal_length_x = e.readInt32(), this.principal_point_x = e.readInt32(), this.principal_point_y = e.readInt32(), this.flags & 1 && (this.focal_length_y = e.readInt32(), this.skew_factor = e.readInt32());
  }
};
var gr = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "ComponentDefinitionBox";
  }
  static {
    this.fourcc = "cmpd";
  }
  parse(e) {
    this.component_count = e.readUint32(), this.component_types = [], this.component_type_urls = [];
    for (let i = 0; i < this.component_count; i++) {
      let r = e.readUint16();
      this.component_types.push(r), r >= 32768 && this.component_type_urls.push(e.readCString());
    }
  }
};
var Sr = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "ChunkLargeOffsetBox";
  }
  static {
    this.fourcc = "co64";
  }
  parse(e) {
    this.parseFullHeader(e);
    let i = e.readUint32();
    if (this.chunk_offsets = [], this.version === 0) for (let r = 0; r < i; r++) this.chunk_offsets.push(e.readUint64());
  }
  write(e) {
    this.version = 0, this.flags = 0, this.size = 4 + 8 * this.chunk_offsets.length, this.writeHeader(e), e.writeUint32(this.chunk_offsets.length);
    for (let i = 0; i < this.chunk_offsets.length; i++) e.writeUint64(this.chunk_offsets[i]);
  }
};
var Br = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "ContentLightLevelBox";
  }
  static {
    this.fourcc = "CoLL";
  }
  parse(e) {
    this.parseFullHeader(e), this.maxCLL = e.readUint16(), this.maxFALL = e.readUint16();
  }
};
var Ur = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "CopyrightBox";
  }
  static {
    this.fourcc = "cprt";
  }
  parse(e) {
    this.parseFullHeader(e), this.parseLanguage(e), this.notice = e.readCString();
  }
};
var Qe = 2147483647;
var wr = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "CompositionToDecodeBox";
  }
  static {
    this.fourcc = "cslg";
  }
  parse(e) {
    this.parseFullHeader(e), this.version === 0 ? (this.compositionToDTSShift = e.readInt32(), this.leastDecodeToDisplayDelta = e.readInt32(), this.greatestDecodeToDisplayDelta = e.readInt32(), this.compositionStartTime = e.readInt32(), this.compositionEndTime = e.readInt32()) : this.version === 1 && (this.compositionToDTSShift = e.readInt64(), this.leastDecodeToDisplayDelta = e.readInt64(), this.greatestDecodeToDisplayDelta = e.readInt64(), this.compositionStartTime = e.readInt64(), this.compositionEndTime = e.readInt64());
  }
  write(e) {
    this.version = 0, (this.compositionToDTSShift > Qe || this.leastDecodeToDisplayDelta > Qe || this.greatestDecodeToDisplayDelta > Qe || this.compositionStartTime > Qe || this.compositionEndTime > Qe) && (this.version = 1), this.flags = 0, this.version === 0 ? (this.size = 4 * 5, this.writeHeader(e), e.writeInt32(this.compositionToDTSShift), e.writeInt32(this.leastDecodeToDisplayDelta), e.writeInt32(this.greatestDecodeToDisplayDelta), e.writeInt32(this.compositionStartTime), e.writeInt32(this.compositionEndTime)) : this.version === 1 && (this.size = 8 * 5, this.writeHeader(e), e.writeInt64(this.compositionToDTSShift), e.writeInt64(this.leastDecodeToDisplayDelta), e.writeInt64(this.greatestDecodeToDisplayDelta), e.writeInt64(this.compositionStartTime), e.writeInt64(this.compositionEndTime));
  }
};
var vr = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "CompositionOffsetBox";
  }
  static {
    this.fourcc = "ctts";
  }
  parse(e) {
    this.parseFullHeader(e);
    let i = e.readUint32();
    if (this.sample_counts = [], this.sample_offsets = [], this.version === 0) for (let r = 0; r < i; r++) {
      this.sample_counts.push(e.readUint32());
      let n = e.readInt32();
      n < 0 && u.warn("BoxParser", "ctts box uses negative values without using version 1"), this.sample_offsets.push(n);
    }
    else if (this.version === 1) for (let r = 0; r < i; r++) this.sample_counts.push(e.readUint32()), this.sample_offsets.push(e.readInt32());
  }
  write(e) {
    this.version = 0, this.flags = 0, this.size = 4 + 8 * this.sample_counts.length, this.writeHeader(e), e.writeUint32(this.sample_counts.length);
    for (let i = 0; i < this.sample_counts.length; i++) e.writeUint32(this.sample_counts[i]), this.version === 1 ? e.writeInt32(this.sample_offsets[i]) : e.writeUint32(this.sample_offsets[i]);
  }
  unpack(e) {
    let i = 0;
    for (let r = 0; r < this.sample_counts.length; r++) for (let n = 0; n < this.sample_counts[r]; n++) e[i].pts = e[i].dts + this.sample_offsets[r], i++;
  }
};
var Ar = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "AC3SpecificBox";
  }
  static {
    this.fourcc = "dac3";
  }
  parse(e) {
    let i = e.readUint8(), r = e.readUint8(), n = e.readUint8();
    this.fscod = i >> 6, this.bsid = i >> 1 & 31, this.bsmod = (i & 1) << 2 | r >> 6 & 3, this.acmod = r >> 3 & 7, this.lfeon = r >> 2 & 1, this.bit_rate_code = r & 3 | n >> 5 & 7;
  }
};
var Mr = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "EC3SpecificBox";
  }
  static {
    this.fourcc = "dec3";
  }
  parse(e) {
    let i = e.readUint16();
    this.data_rate = i >> 3, this.num_ind_sub = i & 7, this.ind_subs = [];
    for (let r = 0; r < this.num_ind_sub + 1; r++) {
      let n = e.readUint8(), o = e.readUint8(), a = e.readUint8(), l = { fscod: n >> 6, bsid: n >> 1 & 31, bsmod: (n & 1) << 4 | o >> 4 & 15, acmod: o >> 1 & 7, lfeon: o & 1, num_dep_sub: a >> 1 & 15 };
      this.ind_subs.push(l), l.num_dep_sub > 0 && (l.chan_loc = (a & 1) << 8 | e.readUint8());
    }
  }
};
var Ir = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "FLACSpecificBox";
  }
  static {
    this.fourcc = "dfLa";
  }
  parse(e) {
    this.parseFullHeader(e);
    let i = 127, r = 128, n = [], o = ["STREAMINFO", "PADDING", "APPLICATION", "SEEKTABLE", "VORBIS_COMMENT", "CUESHEET", "PICTURE", "RESERVED"], a;
    do {
      a = e.readUint8();
      let l = Math.min(a & i, o.length - 1);
      l ? e.readUint8Array(e.readUint24()) : (e.readUint8Array(13), this.samplerate = e.readUint32() >> 12, e.readUint8Array(20)), n.push(o[l]);
    } while (a & r);
    this.numMetadataBlocks = n.length + " (" + n.join(", ") + ")";
  }
};
var zr = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "hintimmediateBytesSent";
  }
  static {
    this.fourcc = "dimm";
  }
  parse(e) {
    this.bytessent = e.readUint64();
  }
};
var kr = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "hintlongestpacket";
  }
  static {
    this.fourcc = "dmax";
  }
  parse(e) {
    this.time = e.readUint32();
  }
};
var Tr = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "hintmediaBytesSent";
  }
  static {
    this.fourcc = "dmed";
  }
  parse(e) {
    this.bytessent = e.readUint64();
  }
};
var Er = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "OpusSpecificBox";
  }
  static {
    this.fourcc = "dOps";
  }
  parse(e) {
    if (this.Version = e.readUint8(), this.OutputChannelCount = e.readUint8(), this.PreSkip = e.readUint16(), this.InputSampleRate = e.readUint32(), this.OutputGain = e.readInt16(), this.ChannelMappingFamily = e.readUint8(), this.ChannelMappingFamily !== 0) {
      this.StreamCount = e.readUint8(), this.CoupledCount = e.readUint8(), this.ChannelMapping = [];
      for (let i = 0; i < this.OutputChannelCount; i++) this.ChannelMapping[i] = e.readUint8();
    }
  }
};
var Fr = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "hintrepeatedBytesSent";
  }
  static {
    this.fourcc = "drep";
  }
  parse(e) {
    this.bytessent = e.readUint64();
  }
};
var Lr = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "EditListBox";
  }
  static {
    this.fourcc = "elst";
  }
  parse(e) {
    this.parseFullHeader(e), this.entries = [];
    let i = e.readUint32();
    for (let r = 0; r < i; r++) {
      let n = { segment_duration: this.version === 1 ? e.readUint64() : e.readUint32(), media_time: this.version === 1 ? e.readInt64() : e.readInt32(), media_rate_integer: e.readInt16(), media_rate_fraction: e.readInt16() };
      this.entries.push(n);
    }
  }
  write(e) {
    this.version = 0, this.flags = 0, this.size = 4 + 12 * this.entries.length, this.writeHeader(e), e.writeUint32(this.entries.length);
    for (let i = 0; i < this.entries.length; i++) {
      let r = this.entries[i];
      e.writeUint32(r.segment_duration), e.writeInt32(r.media_time), e.writeInt16(r.media_rate_integer), e.writeInt16(r.media_rate_fraction);
    }
  }
};
var Dr = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "EventMessageBox";
  }
  static {
    this.fourcc = "emsg";
  }
  parse(e) {
    this.parseFullHeader(e), this.version === 1 ? (this.timescale = e.readUint32(), this.presentation_time = e.readUint64(), this.event_duration = e.readUint32(), this.id = e.readUint32(), this.scheme_id_uri = e.readCString(), this.value = e.readCString()) : (this.scheme_id_uri = e.readCString(), this.value = e.readCString(), this.timescale = e.readUint32(), this.presentation_time_delta = e.readUint32(), this.event_duration = e.readUint32(), this.id = e.readUint32());
    let i = this.size - this.hdr_size - (4 * 4 + (this.scheme_id_uri.length + 1) + (this.value.length + 1));
    this.version === 1 && (i -= 4), this.message_data = e.readUint8Array(i);
  }
  write(e) {
    this.version = 0, this.flags = 0, this.size = 4 * 4 + this.message_data.length + (this.scheme_id_uri.length + 1) + (this.value.length + 1), this.writeHeader(e), e.writeCString(this.scheme_id_uri), e.writeCString(this.value), e.writeUint32(this.timescale), e.writeUint32(this.presentation_time_delta), e.writeUint32(this.event_duration), e.writeUint32(this.id), e.writeUint8Array(this.message_data);
  }
};
var M = class extends f {
  parse(t) {
    this.parseFullHeader(t), this.group_id = t.readUint32(), this.num_entities_in_group = t.readUint32(), this.entity_ids = [];
    for (let e = 0; e < this.num_entities_in_group; e++) {
      let i = t.readUint32();
      this.entity_ids.push(i);
    }
  }
};
var Pr = class extends M {
  constructor() {
    super(...arguments);
    this.box_name = "Auto exposure bracketing";
  }
  static {
    this.fourcc = "aebr";
  }
};
var Cr = class extends M {
  constructor() {
    super(...arguments);
    this.box_name = "Flash exposure information";
  }
  static {
    this.fourcc = "afbr";
  }
};
var Nr = class extends M {
  constructor() {
    super(...arguments);
    this.box_name = "Album collection";
  }
  static {
    this.fourcc = "albc";
  }
};
var Rr = class extends M {
  constructor() {
    super(...arguments);
    this.box_name = "Alternative entity";
  }
  static {
    this.fourcc = "altr";
  }
};
var Or = class extends M {
  constructor() {
    super(...arguments);
    this.box_name = "Burst image";
  }
  static {
    this.fourcc = "brst";
  }
};
var Hr = class extends M {
  constructor() {
    super(...arguments);
    this.box_name = "Depth of field bracketing";
  }
  static {
    this.fourcc = "dobr";
  }
};
var Gr = class extends M {
  constructor() {
    super(...arguments);
    this.box_name = "Equivalent entity";
  }
  static {
    this.fourcc = "eqiv";
  }
};
var Vr = class extends M {
  constructor() {
    super(...arguments);
    this.box_name = "Favorites collection";
  }
  static {
    this.fourcc = "favc";
  }
};
var jr = class extends M {
  constructor() {
    super(...arguments);
    this.box_name = "Focus bracketing";
  }
  static {
    this.fourcc = "fobr";
  }
};
var Kr = class extends M {
  constructor() {
    super(...arguments);
    this.box_name = "Image item with an audio track";
  }
  static {
    this.fourcc = "iaug";
  }
};
var qr = class extends M {
  constructor() {
    super(...arguments);
    this.box_name = "Panorama";
  }
  static {
    this.fourcc = "pano";
  }
};
var Yr = class extends M {
  constructor() {
    super(...arguments);
    this.box_name = "Slideshow";
  }
  static {
    this.fourcc = "slid";
  }
};
var $r = class extends M {
  constructor() {
    super(...arguments);
    this.box_name = "Stereo";
  }
  static {
    this.fourcc = "ster";
  }
};
var Wr = class extends M {
  constructor() {
    super(...arguments);
    this.box_name = "Time-synchronized capture";
  }
  static {
    this.fourcc = "tsyn";
  }
};
var Zr = class extends M {
  constructor() {
    super(...arguments);
    this.box_name = "White balance bracketing";
  }
  static {
    this.fourcc = "wbbr";
  }
};
var Xr = class extends M {
  constructor() {
    super(...arguments);
    this.box_name = "Progressive rendering";
  }
  static {
    this.fourcc = "prgr";
  }
};
var Jr = class extends M {
  constructor() {
    super(...arguments);
    this.box_name = "Image pyramid";
  }
  static {
    this.fourcc = "pymd";
  }
  parse(e) {
    this.parseFullHeader(e), this.group_id = e.readUint32(), this.num_entities_in_group = e.readUint32(), this.entity_ids = [];
    for (let i = 0; i < this.num_entities_in_group; i++) {
      let r = e.readUint32();
      this.entity_ids.push(r);
    }
    this.tile_size_x = e.readUint16(), this.tile_size_y = e.readUint16(), this.layer_binning = [], this.tiles_in_layer_column_minus1 = [], this.tiles_in_layer_row_minus1 = [];
    for (let i = 0; i < this.num_entities_in_group; i++) this.layer_binning[i] = e.readUint16(), this.tiles_in_layer_row_minus1[i] = e.readUint16(), this.tiles_in_layer_column_minus1[i] = e.readUint16();
  }
};
var Qr = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "FieldHandlingBox";
  }
  static {
    this.fourcc = "fiel";
  }
  parse(e) {
    this.fieldCount = e.readUint8(), this.fieldOrdering = e.readUint8();
  }
};
var es = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "OriginalFormatBox";
  }
  static {
    this.fourcc = "frma";
  }
  parse(e) {
    this.data_format = e.readString(4);
  }
};
var ts = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "ImageMirror";
  }
  static {
    this.fourcc = "imir";
  }
  parse(e) {
    let i = e.readUint8();
    this.reserved = i >> 7, this.axis = i & 1;
  }
};
var is = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "ItemPropertyAssociationBox";
  }
  static {
    this.fourcc = "ipma";
  }
  parse(e) {
    this.parseFullHeader(e);
    let i = e.readUint32();
    this.associations = [];
    for (let r = 0; r < i; r++) {
      let n = this.version < 1 ? e.readUint16() : e.readUint32(), o = [], a = e.readUint8();
      for (let l = 0; l < a; l++) {
        let d = e.readUint8();
        o.push({ essential: (d & 128) >> 7 === 1, property_index: this.flags & 1 ? (d & 127) << 8 | e.readUint8() : d & 127 });
      }
      this.associations.push({ id: n, props: o });
    }
  }
};
var rs = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "ImageRotation";
  }
  static {
    this.fourcc = "irot";
  }
  parse(e) {
    this.angle = e.readUint8() & 3;
  }
};
var ss = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "ImageSpatialExtentsProperty";
  }
  static {
    this.fourcc = "ispe";
  }
  parse(e) {
    this.parseFullHeader(e), this.image_width = e.readUint32(), this.image_height = e.readUint32();
  }
};
var ns = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "TAITimestampBox";
  }
  static {
    this.fourcc = "itai";
  }
  parse(e) {
    this.TAI_timestamp = e.readUint64();
    let i = e.readUint8();
    this.sychronization_state = i >> 7 & 1, this.timestamp_generation_failure = i >> 6 & 1, this.timestamp_is_modified = i >> 5 & 1;
  }
};
var os = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "KindBox";
  }
  static {
    this.fourcc = "kind";
  }
  parse(e) {
    this.parseFullHeader(e), this.schemeURI = e.readCString(), this.isEndOfBox(e) || (this.value = e.readCString());
  }
  write(e) {
    this.version = 0, this.flags = 0, this.size = this.schemeURI.length + 1 + (this.value.length + 1), this.writeHeader(e), e.writeCString(this.schemeURI), e.writeCString(this.value);
  }
};
var as = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "LevelAssignmentBox";
  }
  static {
    this.fourcc = "leva";
  }
  parse(e) {
    this.parseFullHeader(e);
    let i = e.readUint8();
    this.levels = [];
    for (let r = 0; r < i; r++) {
      let n = {};
      this.levels[r] = n, n.track_ID = e.readUint32();
      let o = e.readUint8();
      switch (n.padding_flag = o >> 7, n.assignment_type = o & 127, n.assignment_type) {
        case 0:
          n.grouping_type = e.readString(4);
          break;
        case 1:
          n.grouping_type = e.readString(4), n.grouping_type_parameter = e.readUint32();
          break;
        case 2:
          break;
        case 3:
          break;
        case 4:
          n.sub_track_id = e.readUint32();
          break;
        default:
          u.warn("BoxParser", `Unknown level assignment type: ${n.assignment_type}`);
      }
    }
  }
};
var fs = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "LHEVCConfigurationBox";
  }
  static {
    this.fourcc = "lhvC";
  }
  parse(e) {
    this.configurationVersion = e.readUint8(), this.min_spatial_segmentation_idc = e.readUint16() & 4095, this.parallelismType = e.readUint8() & 3;
    let i = e.readUint8();
    this.numTemporalLayers = (i & 13) >> 3, this.temporalIdNested = (i & 4) >> 2, this.lengthSizeMinusOne = i & 3, this.nalu_arrays = [];
    let r = e.readUint8();
    for (let n = 0; n < r; n++) {
      let o = [];
      this.nalu_arrays.push(o), i = e.readUint8(), o.completeness = (i & 128) >> 7, o.nalu_type = i & 63;
      let a = e.readUint16();
      for (let l = 0; l < a; l++) {
        let d = e.readUint16();
        o.push({ data: e.readUint8Array(d) });
      }
    }
  }
};
var ls = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "LayerSelectorProperty";
  }
  static {
    this.fourcc = "lsel";
  }
  parse(e) {
    this.layer_id = e.readUint16();
  }
};
var ds = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "hintmaxrate";
  }
  static {
    this.fourcc = "maxr";
  }
  parse(e) {
    this.period = e.readUint32(), this.bytes = e.readUint32();
  }
};
var re = class {
  constructor(t, e) {
    this.x = t;
    this.y = e;
  }
  toString() {
    return "(" + this.x + "," + this.y + ")";
  }
};
var us = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "MasteringDisplayColourVolumeBox";
  }
  static {
    this.fourcc = "mdcv";
  }
  parse(e) {
    this.display_primaries = [], this.display_primaries[0] = new re(e.readUint16(), e.readUint16()), this.display_primaries[1] = new re(e.readUint16(), e.readUint16()), this.display_primaries[2] = new re(e.readUint16(), e.readUint16()), this.white_point = new re(e.readUint16(), e.readUint16()), this.max_display_mastering_luminance = e.readUint32(), this.min_display_mastering_luminance = e.readUint32();
  }
};
var cs = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "MovieFragmentRandomAccessOffsetBox";
  }
  static {
    this.fourcc = "mfro";
  }
  parse(e) {
    this.parseFullHeader(e), this._size = e.readUint32();
  }
};
var ps = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "MaskConfigurationProperty";
  }
  static {
    this.fourcc = "mskC";
  }
  parse(e) {
    this.parseFullHeader(e), this.bits_per_pixel = e.readUint8();
  }
};
var ms = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "hintPacketsSent";
  }
  static {
    this.fourcc = "npck";
  }
  parse(e) {
    this.packetssent = e.readUint32();
  }
};
var hs = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "hintPacketsSent";
  }
  static {
    this.fourcc = "nump";
  }
  parse(e) {
    this.packetssent = e.readUint64();
  }
};
var _s = class {
  constructor(t, e) {
    this.pad1 = t;
    this.pad2 = e;
  }
};
var xs = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "PaddingBitsBox";
  }
  static {
    this.fourcc = "padb";
  }
  parse(e) {
    this.parseFullHeader(e);
    let i = e.readUint32();
    this.padbits = [];
    for (let r = 0; r < Math.floor((i + 1) / 2); r++) {
      let n = e.readUint8(), o = (n & 112) >> 4, a = n & 7;
      this.padbits.push(new _s(o, a));
    }
  }
};
var bs = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "PixelAspectRatioBox";
  }
  static {
    this.fourcc = "pasp";
  }
  parse(e) {
    this.hSpacing = e.readUint32(), this.vSpacing = e.readUint32();
  }
};
var ys = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "CuePayloadBox";
  }
  static {
    this.fourcc = "payl";
  }
  parse(e) {
    this.text = e.readString(this.size - this.hdr_size);
  }
};
var gs = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "hintpayloadID";
  }
  static {
    this.fourcc = "payt";
  }
  parse(e) {
    this.payloadID = e.readUint32();
    let i = e.readUint8();
    this.rtpmap_string = e.readString(i);
  }
};
var Ss = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "ProgressiveDownloadInfoBox";
    this.rate = [];
    this.initial_delay = [];
  }
  static {
    this.fourcc = "pdin";
  }
  parse(e) {
    this.parseFullHeader(e);
    let i = (this.size - this.hdr_size) / 8;
    for (let r = 0; r < i; r++) this.rate[r] = e.readUint32(), this.initial_delay[r] = e.readUint32();
  }
};
var Bs = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "PixelInformationProperty";
  }
  static {
    this.fourcc = "pixi";
  }
  parse(e) {
    this.parseFullHeader(e), this.num_channels = e.readUint8(), this.bits_per_channels = [];
    for (let i = 0; i < this.num_channels; i++) this.bits_per_channels[i] = e.readUint8();
  }
};
var Us = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "hintlargestpacket";
  }
  static {
    this.fourcc = "pmax";
  }
  parse(e) {
    this.bytes = e.readUint32();
  }
};
var ws = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "ProgressiveDerivedImageItemInformationProperty";
  }
  static {
    this.fourcc = "prdi";
  }
  parse(e) {
    if (this.parseFullHeader(e), this.step_count = e.readUint16(), this.item_count = [], this.flags & 2) for (let i = 0; i < this.step_count; i++) this.item_count[i] = e.readUint16();
  }
};
var vs = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "ProducerReferenceTimeBox";
  }
  static {
    this.fourcc = "prft";
  }
  parse(e) {
    this.parseFullHeader(e), this.ref_track_id = e.readUint32(), this.ntp_timestamp = e.readUint64(), this.version === 0 ? this.media_time = e.readUint32() : this.media_time = e.readUint64();
  }
};
var As = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "ProtectionSystemSpecificHeaderBox";
  }
  static {
    this.fourcc = "pssh";
  }
  parse(e) {
    if (this.parseFullHeader(e), this.system_id = R(e), this.version > 0) {
      let r = e.readUint32();
      this.kid = [];
      for (let n = 0; n < r; n++) this.kid[n] = R(e);
    }
    let i = e.readUint32();
    i > 0 && (this.data = e.readUint8Array(i));
  }
};
var Ms = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "TrackCleanApertureDimensionsBox";
  }
  static {
    this.fourcc = "clef";
  }
  parse(e) {
    this.parseFullHeader(e), this.width = e.readUint32(), this.height = e.readUint32();
  }
};
var Is = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "TrackEncodedPixelsDimensionsBox";
  }
  static {
    this.fourcc = "enof";
  }
  parse(e) {
    this.parseFullHeader(e), this.width = e.readUint32(), this.height = e.readUint32();
  }
};
var zs = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "TrackProductionApertureDimensionsBox";
  }
  static {
    this.fourcc = "prof";
  }
  parse(e) {
    this.parseFullHeader(e), this.width = e.readUint32(), this.height = e.readUint32();
  }
};
var ks = class extends b {
  constructor() {
    super(...arguments);
    this.box_name = "TrackApertureModeDimensionsBox";
    this.clefs = [];
    this.profs = [];
    this.enofs = [];
    this.subBoxNames = ["clef", "prof", "enof"];
  }
  static {
    this.fourcc = "tapt";
  }
};
var Ts = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "rtpmoviehintinformation";
  }
  static {
    this.fourcc = "rtp ";
  }
  parse(e) {
    this.descriptionformat = e.readString(4), this.sdptext = e.readString(this.size - this.hdr_size - 4);
  }
};
var Es = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "SampleAuxiliaryInformationOffsetsBox";
  }
  static {
    this.fourcc = "saio";
  }
  parse(e) {
    this.parseFullHeader(e), this.flags & 1 && (this.aux_info_type = e.readString(4), this.aux_info_type_parameter = e.readUint32());
    let i = e.readUint32();
    this.offset = [];
    for (let r = 0; r < i; r++) this.version === 0 ? this.offset[r] = e.readUint32() : this.offset[r] = e.readUint64();
  }
};
var Fs = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "SampleAuxiliaryInformationSizesBox";
  }
  static {
    this.fourcc = "saiz";
  }
  parse(e) {
    if (this.parseFullHeader(e), this.flags & 1 && (this.aux_info_type = e.readString(4), this.aux_info_type_parameter = e.readUint32()), this.default_sample_info_size = e.readUint8(), this.sample_count = e.readUint32(), this.sample_info_size = [], this.default_sample_info_size === 0) for (let i = 0; i < this.sample_count; i++) this.sample_info_size[i] = e.readUint8();
  }
};
var mt = class {
  constructor(t, e) {
    this.bad_pixel_row = t;
    this.bad_pixel_column = e;
  }
  toString() {
    return "[row: " + this.bad_pixel_row + ", column: " + this.bad_pixel_column + "]";
  }
};
var Ls = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "SensorBadPixelsMapBox";
  }
  static {
    this.fourcc = "sbpm";
  }
  parse(e) {
    this.parseFullHeader(e), this.component_count = e.readUint16(), this.component_index = [];
    for (let r = 0; r < this.component_count; r++) this.component_index.push(e.readUint16());
    let i = e.readUint8();
    this.correction_applied = (i & 128) === 128, this.num_bad_rows = e.readUint32(), this.num_bad_cols = e.readUint32(), this.num_bad_pixels = e.readUint32(), this.bad_rows = [], this.bad_columns = [], this.bad_pixels = [];
    for (let r = 0; r < this.num_bad_rows; r++) this.bad_rows.push(e.readUint32());
    for (let r = 0; r < this.num_bad_cols; r++) this.bad_columns.push(e.readUint32());
    for (let r = 0; r < this.num_bad_pixels; r++) {
      let n = e.readUint32(), o = e.readUint32();
      this.bad_pixels.push(new mt(n, o));
    }
  }
};
var Ds = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "SchemeTypeBox";
  }
  static {
    this.fourcc = "schm";
  }
  parse(e) {
    this.parseFullHeader(e), this.scheme_type = e.readString(4), this.scheme_version = e.readUint32(), this.flags & 1 && (this.scheme_uri = e.readString(this.size - this.hdr_size - 8));
  }
};
var Ps = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "rtptracksdphintinformation";
  }
  static {
    this.fourcc = "sdp ";
  }
  parse(e) {
    this.sdptext = e.readString(this.size - this.hdr_size);
  }
};
var Cs = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "SampleEncryptionBox";
  }
  static {
    this.fourcc = "senc";
  }
};
var Ns = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "SMPTE2086MasteringDisplayMetadataBox";
  }
  static {
    this.fourcc = "SmDm";
  }
  parse(e) {
    this.parseFullHeader(e), this.primaryRChromaticity_x = e.readUint16(), this.primaryRChromaticity_y = e.readUint16(), this.primaryGChromaticity_x = e.readUint16(), this.primaryGChromaticity_y = e.readUint16(), this.primaryBChromaticity_x = e.readUint16(), this.primaryBChromaticity_y = e.readUint16(), this.whitePointChromaticity_x = e.readUint16(), this.whitePointChromaticity_y = e.readUint16(), this.luminanceMax = e.readUint32(), this.luminanceMin = e.readUint32();
  }
};
var Rs = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "CompressedSubsegmentIndexBox";
  }
  static {
    this.fourcc = "ssix";
  }
  parse(e) {
    this.parseFullHeader(e), this.subsegments = [];
    let i = e.readUint32();
    for (let r = 0; r < i; r++) {
      let n = {};
      this.subsegments.push(n), n.ranges = [];
      let o = e.readUint32();
      for (let a = 0; a < o; a++) {
        let l = {};
        n.ranges.push(l), l.level = e.readUint8(), l.range_size = e.readUint24();
      }
    }
  }
};
var Os = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "DegradationPriorityBox";
  }
  static {
    this.fourcc = "stpd";
  }
  parse(e) {
    this.parseFullHeader(e);
    let i = (this.size - this.hdr_size) / 2;
    this.priority = [];
    for (let r = 0; r < i; r++) this.priority[r] = e.readUint16();
  }
};
var Hs = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "SubTrackInformationBox";
  }
  static {
    this.fourcc = "stri";
  }
  parse(e) {
    this.parseFullHeader(e), this.switch_group = e.readUint16(), this.alternate_group = e.readUint16(), this.sub_track_id = e.readUint32();
    let i = (this.size - this.hdr_size - 8) / 4;
    this.attribute_list = [];
    for (let r = 0; r < i; r++) this.attribute_list[r] = e.readUint32();
  }
};
var Gs = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "SubTrackSampleGroupBox";
  }
  static {
    this.fourcc = "stsg";
  }
  parse(e) {
    this.parseFullHeader(e), this.grouping_type = e.readUint32();
    let i = e.readUint16();
    this.group_description_index = [];
    for (let r = 0; r < i; r++) this.group_description_index[r] = e.readUint32();
  }
};
var Vs = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "ShadowSyncSampleBox";
  }
  static {
    this.fourcc = "stsh";
  }
  parse(e) {
    this.parseFullHeader(e);
    let i = e.readUint32();
    if (this.shadowed_sample_numbers = [], this.sync_sample_numbers = [], this.version === 0) for (let r = 0; r < i; r++) this.shadowed_sample_numbers.push(e.readUint32()), this.sync_sample_numbers.push(e.readUint32());
  }
  write(e) {
    this.version = 0, this.flags = 0, this.size = 4 + 8 * this.shadowed_sample_numbers.length, this.writeHeader(e), e.writeUint32(this.shadowed_sample_numbers.length);
    for (let i = 0; i < this.shadowed_sample_numbers.length; i++) e.writeUint32(this.shadowed_sample_numbers[i]), e.writeUint32(this.sync_sample_numbers[i]);
  }
};
var js = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "SyncSampleBox";
  }
  static {
    this.fourcc = "stss";
  }
  parse(e) {
    this.parseFullHeader(e);
    let i = e.readUint32();
    if (this.version === 0) {
      this.sample_numbers = [];
      for (let r = 0; r < i; r++) this.sample_numbers.push(e.readUint32());
    }
  }
  write(e) {
    this.version = 0, this.flags = 0, this.size = 4 + 4 * this.sample_numbers.length, this.writeHeader(e), e.writeUint32(this.sample_numbers.length), e.writeUint32Array(this.sample_numbers);
  }
};
var Ks = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "StereoVideoBox";
  }
  static {
    this.fourcc = "stvi";
  }
  parse(e) {
    this.parseFullHeader(e);
    let i = e.readUint32();
    this.single_view_allowed = i & 3, this.stereo_scheme = e.readUint32();
    let r = e.readUint32();
    for (this.stereo_indication_type = e.readString(r), this.boxes = []; e.getPosition() < this.start + this.size; ) {
      let n = A(e, false, this.size - (e.getPosition() - this.start));
      if (n.code === w) {
        let o = n.box;
        this.boxes.push(o), this[o.type] = o;
      } else return;
    }
  }
};
var qs = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "SegmentTypeBox";
  }
  static {
    this.fourcc = "styp";
  }
  parse(e) {
    let i = this.size - this.hdr_size;
    this.major_brand = e.readString(4), this.minor_version = e.readUint32(), i -= 8, this.compatible_brands = [];
    let r = 0;
    for (; i >= 4; ) this.compatible_brands[r] = e.readString(4), i -= 4, r++;
  }
  write(e) {
    this.size = 8 + 4 * this.compatible_brands.length, this.writeHeader(e), e.writeString(this.major_brand, null, 4), e.writeUint32(this.minor_version);
    for (let i = 0; i < this.compatible_brands.length; i++) e.writeString(this.compatible_brands[i], null, 4);
  }
};
var Ys = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "CompactSampleSizeBox";
  }
  static {
    this.fourcc = "stz2";
  }
  parse(e) {
    if (this.parseFullHeader(e), this.sample_sizes = [], this.version === 0) {
      this.reserved = e.readUint24(), this.field_size = e.readUint8();
      let i = e.readUint32();
      if (this.field_size === 4) for (let r = 0; r < i; r += 2) {
        let n = e.readUint8();
        this.sample_sizes[r] = n >> 4 & 15, this.sample_sizes[r + 1] = n & 15;
      }
      else if (this.field_size === 8) for (let r = 0; r < i; r++) this.sample_sizes[r] = e.readUint8();
      else if (this.field_size === 16) for (let r = 0; r < i; r++) this.sample_sizes[r] = e.readUint16();
      else u.error("BoxParser", "Error in length field in stz2 box");
    }
  }
};
var $s = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "SubSampleInformationBox";
  }
  static {
    this.fourcc = "subs";
  }
  parse(e) {
    this.parseFullHeader(e);
    let i = e.readUint32();
    this.entries = [];
    let r;
    for (let n = 0; n < i; n++) {
      let o = {};
      if (this.entries[n] = o, o.sample_delta = e.readUint32(), o.subsamples = [], r = e.readUint16(), r > 0) for (let a = 0; a < r; a++) {
        let l = {};
        o.subsamples.push(l), this.version === 1 ? l.size = e.readUint32() : l.size = e.readUint16(), l.priority = e.readUint8(), l.discardable = e.readUint8(), l.codec_specific_parameters = e.readUint32();
      }
    }
  }
};
var Ws = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "TAIClockInfoBox";
  }
  static {
    this.fourcc = "taic";
  }
  parse(e) {
    this.time_uncertainty = e.readUint64(), this.clock_resolution = e.readUint32(), this.clock_drift_rate = e.readInt32();
    let i = e.readUint8();
    this.clock_type = (i & 192) >> 6;
  }
};
var Zs = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "TrackEncryptionBox";
  }
  static {
    this.fourcc = "tenc";
  }
  parse(e) {
    if (this.parseFullHeader(e), e.readUint8(), this.version === 0) e.readUint8();
    else {
      let i = e.readUint8();
      this.default_crypt_byte_block = i >> 4 & 15, this.default_skip_byte_block = i & 15;
    }
    this.default_isProtected = e.readUint8(), this.default_Per_Sample_IV_Size = e.readUint8(), this.default_KID = R(e), this.default_isProtected === 1 && this.default_Per_Sample_IV_Size === 0 && (this.default_constant_IV_size = e.readUint8(), this.default_constant_IV = e.readUint8Array(this.default_constant_IV_size));
  }
};
var Xs = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "TrackFragmentRandomAccessBox";
  }
  static {
    this.fourcc = "tfra";
  }
  parse(e) {
    this.parseFullHeader(e), this.track_ID = e.readUint32(), e.readUint24();
    let i = e.readUint8();
    this.length_size_of_traf_num = i >> 4 & 3, this.length_size_of_trun_num = i >> 2 & 3, this.length_size_of_sample_num = i & 3, this.entries = [];
    let r = e.readUint32();
    for (let n = 0; n < r; n++) this.version === 1 ? (this.time = e.readUint64(), this.moof_offset = e.readUint64()) : (this.time = e.readUint32(), this.moof_offset = e.readUint32()), this.traf_number = e["readUint" + 8 * (this.length_size_of_traf_num + 1)](), this.trun_number = e["readUint" + 8 * (this.length_size_of_trun_num + 1)](), this.sample_number = e["readUint" + 8 * (this.length_size_of_sample_num + 1)]();
  }
};
var Js = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "hintmaxrelativetime";
  }
  static {
    this.fourcc = "tmax";
  }
  parse(e) {
    this.time = e.readUint32();
  }
};
var Qs = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "hintminrelativetime";
  }
  static {
    this.fourcc = "tmin";
  }
  parse(e) {
    this.time = e.readUint32();
  }
};
var en = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "hintBytesSent";
  }
  static {
    this.fourcc = "totl";
  }
  parse(e) {
    this.bytessent = e.readUint32();
  }
};
var tn = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "hintBytesSent";
  }
  static {
    this.fourcc = "tpay";
  }
  parse(e) {
    this.bytessent = e.readUint32();
  }
};
var rn = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "hintBytesSent";
  }
  static {
    this.fourcc = "tpyl";
  }
  parse(e) {
    this.bytessent = e.readUint64();
  }
};
var sn = class extends it {
  static {
    this.fourcc = "msrc";
  }
};
var nn = class s5 extends c {
  constructor() {
    super(...arguments);
    this.box_name = "TrackReferenceBox";
    this.references = [];
  }
  static {
    this.fourcc = "tref";
  }
  static {
    this.allowed_types = ["hint", "cdsc", "font", "hind", "vdep", "vplx", "subt", "thmb", "auxl", "cdtg", "shsc", "aest"];
  }
  parse(e) {
    for (; e.getPosition() < this.start + this.size; ) {
      let i = A(e, true, this.size - (e.getPosition() - this.start));
      if (i.code === w) {
        s5.allowed_types.includes(i.type) || u.warn("BoxParser", `Unknown track reference type: '${i.type}'`);
        let r = new nt(i.type, i.size, i.hdr_size, i.start);
        r.write === c.prototype.write && r.type !== "mdat" && (u.info("BoxParser", "TrackReference " + r.type + " box writing not yet implemented, keeping unparsed data in memory for later write"), r.parseDataAndRewind(e)), r.parse(e), this.references.push(r);
      } else return;
    }
  }
};
var on = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "TrackExtensionPropertiesBox";
  }
  static {
    this.fourcc = "trep";
  }
  parse(e) {
    for (this.parseFullHeader(e), this.track_ID = e.readUint32(), this.boxes = []; e.getPosition() < this.start + this.size; ) {
      let i = A(e, false, this.size - (e.getPosition() - this.start));
      if (i.code === w) {
        let r = i.box;
        this.boxes.push(r);
      } else return;
    }
  }
};
var an = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "hintBytesSent";
  }
  static {
    this.fourcc = "trpy";
  }
  parse(e) {
    this.bytessent = e.readUint64();
  }
};
var fn = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "TrackSelectionBox";
  }
  static {
    this.fourcc = "tsel";
  }
  parse(e) {
    this.parseFullHeader(e), this.switch_group = e.readUint32();
    let i = (this.size - this.hdr_size - 4) / 4;
    this.attribute_list = [];
    for (let r = 0; r < i; r++) this.attribute_list[r] = e.readUint32();
  }
};
var ln = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "TextConfigBox";
  }
  static {
    this.fourcc = "txtc";
  }
  parse(e) {
    this.parseFullHeader(e), this.config = e.readCString();
  }
};
var dn = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "TypeCombinationBox";
  }
  static {
    this.fourcc = "tyco";
  }
  parse(e) {
    let i = (this.size - this.hdr_size) / 4;
    this.compatible_brands = [];
    for (let r = 0; r < i; r++) this.compatible_brands[r] = e.readString(4);
  }
};
var un = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "UserDescriptionProperty";
  }
  static {
    this.fourcc = "udes";
  }
  parse(e) {
    this.parseFullHeader(e), this.lang = e.readCString(), this.name = e.readCString(), this.description = e.readCString(), this.tags = e.readCString();
  }
};
var cn = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "UncompressedFrameConfigBox";
  }
  static {
    this.fourcc = "uncC";
  }
  parse(e) {
    if (this.parseFullHeader(e), this.profile = e.readString(4), this.version !== 1) {
      if (this.version === 0) {
        this.component_count = e.readUint32(), this.component_index = [], this.component_bit_depth_minus_one = [], this.component_format = [], this.component_align_size = [];
        for (let r = 0; r < this.component_count; r++) this.component_index.push(e.readUint16()), this.component_bit_depth_minus_one.push(e.readUint8()), this.component_format.push(e.readUint8()), this.component_align_size.push(e.readUint8());
        this.sampling_type = e.readUint8(), this.interleave_type = e.readUint8(), this.block_size = e.readUint8();
        let i = e.readUint8();
        this.component_little_endian = i >> 7 & 1, this.block_pad_lsb = i >> 6 & 1, this.block_little_endian = i >> 5 & 1, this.block_reversed = i >> 4 & 1, this.pad_unknown = i >> 3 & 1, this.pixel_size = e.readUint32(), this.row_align_size = e.readUint32(), this.tile_align_size = e.readUint32(), this.num_tile_cols_minus_one = e.readUint32(), this.num_tile_rows_minus_one = e.readUint32();
      }
    }
  }
};
var pn = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "DataEntryUrnBox";
  }
  static {
    this.fourcc = "urn ";
  }
  parse(e) {
    this.parseFullHeader(e), this.name = e.readCString(), this.size - this.hdr_size - this.name.length - 1 > 0 && (this.location = e.readCString());
  }
  write(e) {
    this.version = 0, this.flags = 0, this.size = this.name.length + 1 + (this.location ? this.location.length + 1 : 0), this.writeHeader(e), e.writeCString(this.name), this.location && e.writeCString(this.location);
  }
};
var mn = class extends c {
  constructor() {
    super(...arguments);
    this.box_name = "WebVTTConfigurationBox";
  }
  static {
    this.fourcc = "vttC";
  }
  parse(e) {
    this.text = e.readString(this.size - this.hdr_size);
  }
};
var hn = class extends f {
  constructor() {
    super(...arguments);
    this.box_name = "VvcNALUConfigBox";
  }
  static {
    this.fourcc = "vvnC";
  }
  parse(e) {
    this.parseFullHeader(e);
    let i = e.readUint8();
    this.lengthSizeMinusOne = i & 3;
  }
};
var _n = class extends _ {
  static {
    this.grouping_type = "alst";
  }
  parse(t) {
    let e = t.readUint16();
    this.first_output_sample = t.readUint16(), this.sample_offset = [];
    for (let r = 0; r < e; r++) this.sample_offset[r] = t.readUint32();
    let i = this.description_length - 4 - 4 * e;
    this.num_output_samples = [], this.num_total_samples = [];
    for (let r = 0; r < i / 4; r++) this.num_output_samples[r] = t.readUint16(), this.num_total_samples[r] = t.readUint16();
  }
};
var xn = class extends _ {
  static {
    this.grouping_type = "avll";
  }
  parse(t) {
    this.layerNumber = t.readUint8(), this.accurateStatisticsFlag = t.readUint8(), this.avgBitRate = t.readUint16(), this.avgFrameRate = t.readUint16();
  }
};
var bn = class extends _ {
  static {
    this.grouping_type = "avss";
  }
  parse(t) {
    this.subSequenceIdentifier = t.readUint16(), this.layerNumber = t.readUint8();
    let e = t.readUint8();
    this.durationFlag = e >> 7, this.avgRateFlag = e >> 6 & 1, this.durationFlag && (this.duration = t.readUint32()), this.avgRateFlag && (this.accurateStatisticsFlag = t.readUint8(), this.avgBitRate = t.readUint16(), this.avgFrameRate = t.readUint16()), this.dependency = [];
    let i = t.readUint8();
    for (let r = 0; r < i; r++) this.dependency.push({ subSeqDirectionFlag: t.readUint8(), layerNumber: t.readUint8(), subSequenceIdentifier: t.readUint16() });
  }
};
var yn = class extends _ {
  static {
    this.grouping_type = "dtrt";
  }
  parse(t) {
    u.warn("BoxParser", "Sample Group type: " + this.grouping_type + " not fully parsed");
  }
};
var gn = class extends _ {
  static {
    this.grouping_type = "mvif";
  }
  parse(t) {
    u.warn("BoxParser", "Sample Group type: " + this.grouping_type + " not fully parsed");
  }
};
var Sn = class extends _ {
  static {
    this.grouping_type = "prol";
  }
  parse(t) {
    this.roll_distance = t.readInt16();
  }
};
var Bn = class extends _ {
  static {
    this.grouping_type = "rap ";
  }
  parse(t) {
    let e = t.readUint8();
    this.num_leading_samples_known = e >> 7, this.num_leading_samples = e & 127;
  }
};
var Un = class extends _ {
  static {
    this.grouping_type = "rash";
  }
  parse(t) {
    if (this.operation_point_count = t.readUint16(), this.description_length !== 2 + (this.operation_point_count === 1 ? 2 : this.operation_point_count * 6) + 9) u.warn("BoxParser", "Mismatch in " + this.grouping_type + " sample group length"), this.data = t.readUint8Array(this.description_length - 2);
    else {
      if (this.operation_point_count === 1) this.target_rate_share = t.readUint16();
      else {
        this.target_rate_share = [], this.available_bitrate = [];
        for (let e = 0; e < this.operation_point_count; e++) this.available_bitrate[e] = t.readUint32(), this.target_rate_share[e] = t.readUint16();
      }
      this.maximum_bitrate = t.readUint32(), this.minimum_bitrate = t.readUint32(), this.discard_priority = t.readUint8();
    }
  }
};
var wn = class extends _ {
  static {
    this.grouping_type = "roll";
  }
  parse(t) {
    this.roll_distance = t.readInt16();
  }
};
var vn = class extends _ {
  static {
    this.grouping_type = "scif";
  }
  parse(t) {
    u.warn("BoxParser", "Sample Group type: " + this.grouping_type + " not fully parsed");
  }
};
var An = class extends _ {
  static {
    this.grouping_type = "scnm";
  }
  parse(t) {
    u.warn("BoxParser", "Sample Group type: " + this.grouping_type + " not fully parsed");
  }
};
var Mn = class extends _ {
  static {
    this.grouping_type = "seig";
  }
  parse(t) {
    this.reserved = t.readUint8();
    let e = t.readUint8();
    this.crypt_byte_block = e >> 4, this.skip_byte_block = e & 15, this.isProtected = t.readUint8(), this.Per_Sample_IV_Size = t.readUint8(), this.KID = R(t), this.constant_IV_size = 0, this.constant_IV = 0, this.isProtected === 1 && this.Per_Sample_IV_Size === 0 && (this.constant_IV_size = t.readUint8(), this.constant_IV = t.readUint8Array(this.constant_IV_size));
  }
};
var In = class extends _ {
  static {
    this.grouping_type = "stsa";
  }
  parse(t) {
    u.warn("BoxParser", "Sample Group type: " + this.grouping_type + " not fully parsed");
  }
};
var zn = class extends _ {
  static {
    this.grouping_type = "sync";
  }
  parse(t) {
    let e = t.readUint8();
    this.NAL_unit_type = e & 63;
  }
};
var kn = class extends _ {
  static {
    this.grouping_type = "tele";
  }
  parse(t) {
    let e = t.readUint8();
    this.level_independently_decodable = e >> 7;
  }
};
var Tn = class extends _ {
  static {
    this.grouping_type = "tsas";
  }
  parse(t) {
    u.warn("BoxParser", "Sample Group type: " + this.grouping_type + " not fully parsed");
  }
};
var En = class extends _ {
  static {
    this.grouping_type = "tscl";
  }
  parse(t) {
    u.warn("BoxParser", "Sample Group type: " + this.grouping_type + " not fully parsed");
  }
};
var Fn = class extends _ {
  static {
    this.grouping_type = "vipr";
  }
  parse(t) {
    u.warn("BoxParser", "Sample Group type: " + this.grouping_type + " not fully parsed");
  }
};
var Ln = class extends c {
  static {
    this.fourcc = "uuid";
  }
};
var $ = class extends f {
  static {
    this.fourcc = "uuid";
  }
};
var Dn = class extends $ {
  constructor() {
    super(...arguments);
    this.box_name = "LiveServerManifestBox";
  }
  static {
    this.uuid = "a5d40b30e81411ddba2f0800200c9a66";
  }
  parse(e) {
    this.parseFullHeader(e), this.LiveServerManifest = e.readString(this.size - this.hdr_size).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }
};
var Pn = class extends $ {
  constructor() {
    super(...arguments);
    this.box_name = "PiffProtectionSystemSpecificHeaderBox";
  }
  static {
    this.uuid = "d08a4f1810f34a82b6c832d8aba183d3";
  }
  parse(e) {
    this.parseFullHeader(e), this.system_id = R(e);
    let i = e.readUint32();
    i > 0 && (this.data = e.readUint8Array(i));
  }
};
var Cn = class extends $ {
  constructor() {
    super(...arguments);
    this.box_name = "PiffSampleEncryptionBox";
  }
  static {
    this.uuid = "a2394f525a9b4f14a2446c427c648df4";
  }
};
var Nn = class extends $ {
  constructor() {
    super(...arguments);
    this.box_name = "PiffTrackEncryptionBox";
  }
  static {
    this.uuid = "8974dbce7be74c5184f97148f9882554";
  }
  parse(e) {
    this.parseFullHeader(e), this.default_AlgorithmID = e.readUint24(), this.default_IV_size = e.readUint8(), this.default_KID = R(e);
  }
};
var Rn = class extends $ {
  constructor() {
    super(...arguments);
    this.box_name = "TfrfBox";
  }
  static {
    this.uuid = "d4807ef2ca3946958e5426cb9e46a79f";
  }
  parse(e) {
    this.parseFullHeader(e), this.fragment_count = e.readUint8(), this.entries = [];
    for (let i = 0; i < this.fragment_count; i++) {
      let r = 0, n = 0;
      this.version === 1 ? (r = e.readUint64(), n = e.readUint64()) : (r = e.readUint32(), n = e.readUint32()), this.entries.push({ absolute_time: r, absolute_duration: n });
    }
  }
};
var On = class extends $ {
  constructor() {
    super(...arguments);
    this.box_name = "TfxdBox";
  }
  static {
    this.uuid = "6d1d9b0542d544e680e2141daff757b2";
  }
  parse(e) {
    this.parseFullHeader(e), this.version === 1 ? (this.absolute_time = e.readUint64(), this.duration = e.readUint64()) : (this.absolute_time = e.readUint32(), this.duration = e.readUint32());
  }
};
var Hn = class extends Ln {
  constructor() {
    super(...arguments);
    this.box_name = "ItemContentIDProperty";
  }
  static {
    this.uuid = "261ef3741d975bbaacbd9d2c8ea73522";
  }
  parse(e) {
    this.content_id = e.readCString();
  }
};
var dy = Xn(Gn);
Jn(lr);

// plugins/GifCaptioner/src/gif.worker.txt
var gif_worker_default = `// gif.worker.js 0.2.0-wasm - https://github.com/jnordberg/gif.js\r
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){"use strict";exports.byteLength=byteLength;exports.toByteArray=toByteArray;exports.fromByteArray=fromByteArray;var lookup=[];var revLookup=[];var Arr=typeof Uint8Array!=="undefined"?Uint8Array:Array;var code="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";for(var i=0,len=code.length;i<len;++i){lookup[i]=code[i];revLookup[code.charCodeAt(i)]=i}revLookup["-".charCodeAt(0)]=62;revLookup["_".charCodeAt(0)]=63;function placeHoldersCount(b64){var len=b64.length;if(len%4>0){throw new Error("Invalid string. Length must be a multiple of 4")}return b64[len-2]==="="?2:b64[len-1]==="="?1:0}function byteLength(b64){return b64.length*3/4-placeHoldersCount(b64)}function toByteArray(b64){var i,j,l,tmp,placeHolders,arr;var len=b64.length;placeHolders=placeHoldersCount(b64);arr=new Arr(len*3/4-placeHolders);l=placeHolders>0?len-4:len;var L=0;for(i=0,j=0;i<l;i+=4,j+=3){tmp=revLookup[b64.charCodeAt(i)]<<18|revLookup[b64.charCodeAt(i+1)]<<12|revLookup[b64.charCodeAt(i+2)]<<6|revLookup[b64.charCodeAt(i+3)];arr[L++]=tmp>>16&255;arr[L++]=tmp>>8&255;arr[L++]=tmp&255}if(placeHolders===2){tmp=revLookup[b64.charCodeAt(i)]<<2|revLookup[b64.charCodeAt(i+1)]>>4;arr[L++]=tmp&255}else if(placeHolders===1){tmp=revLookup[b64.charCodeAt(i)]<<10|revLookup[b64.charCodeAt(i+1)]<<4|revLookup[b64.charCodeAt(i+2)]>>2;arr[L++]=tmp>>8&255;arr[L++]=tmp&255}return arr}function tripletToBase64(num){return lookup[num>>18&63]+lookup[num>>12&63]+lookup[num>>6&63]+lookup[num&63]}function encodeChunk(uint8,start,end){var tmp;var output=[];for(var i=start;i<end;i+=3){tmp=(uint8[i]<<16)+(uint8[i+1]<<8)+uint8[i+2];output.push(tripletToBase64(tmp))}return output.join("")}function fromByteArray(uint8){var tmp;var len=uint8.length;var extraBytes=len%3;var output="";var parts=[];var maxChunkLength=16383;for(var i=0,len2=len-extraBytes;i<len2;i+=maxChunkLength){parts.push(encodeChunk(uint8,i,i+maxChunkLength>len2?len2:i+maxChunkLength))}if(extraBytes===1){tmp=uint8[len-1];output+=lookup[tmp>>2];output+=lookup[tmp<<4&63];output+="=="}else if(extraBytes===2){tmp=(uint8[len-2]<<8)+uint8[len-1];output+=lookup[tmp>>10];output+=lookup[tmp>>4&63];output+=lookup[tmp<<2&63];output+="="}parts.push(output);return parts.join("")}},{}],2:[function(require,module,exports){"use strict";var base64=require("base64-js");var ieee754=require("ieee754");exports.Buffer=Buffer;exports.SlowBuffer=SlowBuffer;exports.INSPECT_MAX_BYTES=50;var K_MAX_LENGTH=2147483647;exports.kMaxLength=K_MAX_LENGTH;Buffer.TYPED_ARRAY_SUPPORT=typedArraySupport();if(!Buffer.TYPED_ARRAY_SUPPORT&&typeof console!=="undefined"&&typeof console.error==="function"){console.error("This browser lacks typed array (Uint8Array) support which is required by "+"\`buffer\` v5.x. Use \`buffer\` v4.x if you require old browser support.")}function typedArraySupport(){try{var arr=new Uint8Array(1);arr.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}};return arr.foo()===42}catch(e){return false}}function createBuffer(length){if(length>K_MAX_LENGTH){throw new RangeError("Invalid typed array length")}var buf=new Uint8Array(length);buf.__proto__=Buffer.prototype;return buf}function Buffer(arg,encodingOrOffset,length){if(typeof arg==="number"){if(typeof encodingOrOffset==="string"){throw new Error("If encoding is specified then the first argument must be a string")}return allocUnsafe(arg)}return from(arg,encodingOrOffset,length)}if(typeof Symbol!=="undefined"&&Symbol.species&&Buffer[Symbol.species]===Buffer){Object.defineProperty(Buffer,Symbol.species,{value:null,configurable:true,enumerable:false,writable:false})}Buffer.poolSize=8192;function from(value,encodingOrOffset,length){if(typeof value==="number"){throw new TypeError('"value" argument must not be a number')}if(value instanceof ArrayBuffer){return fromArrayBuffer(value,encodingOrOffset,length)}if(typeof value==="string"){return fromString(value,encodingOrOffset)}return fromObject(value)}Buffer.from=function(value,encodingOrOffset,length){return from(value,encodingOrOffset,length)};Buffer.prototype.__proto__=Uint8Array.prototype;Buffer.__proto__=Uint8Array;function assertSize(size){if(typeof size!=="number"){throw new TypeError('"size" argument must be a number')}else if(size<0){throw new RangeError('"size" argument must not be negative')}}function alloc(size,fill,encoding){assertSize(size);if(size<=0){return createBuffer(size)}if(fill!==undefined){return typeof encoding==="string"?createBuffer(size).fill(fill,encoding):createBuffer(size).fill(fill)}return createBuffer(size)}Buffer.alloc=function(size,fill,encoding){return alloc(size,fill,encoding)};function allocUnsafe(size){assertSize(size);return createBuffer(size<0?0:checked(size)|0)}Buffer.allocUnsafe=function(size){return allocUnsafe(size)};Buffer.allocUnsafeSlow=function(size){return allocUnsafe(size)};function fromString(string,encoding){if(typeof encoding!=="string"||encoding===""){encoding="utf8"}if(!Buffer.isEncoding(encoding)){throw new TypeError('"encoding" must be a valid string encoding')}var length=byteLength(string,encoding)|0;var buf=createBuffer(length);var actual=buf.write(string,encoding);if(actual!==length){buf=buf.slice(0,actual)}return buf}function fromArrayLike(array){var length=array.length<0?0:checked(array.length)|0;var buf=createBuffer(length);for(var i=0;i<length;i+=1){buf[i]=array[i]&255}return buf}function fromArrayBuffer(array,byteOffset,length){if(byteOffset<0||array.byteLength<byteOffset){throw new RangeError("'offset' is out of bounds")}if(array.byteLength<byteOffset+(length||0)){throw new RangeError("'length' is out of bounds")}var buf;if(byteOffset===undefined&&length===undefined){buf=new Uint8Array(array)}else if(length===undefined){buf=new Uint8Array(array,byteOffset)}else{buf=new Uint8Array(array,byteOffset,length)}buf.__proto__=Buffer.prototype;return buf}function fromObject(obj){if(Buffer.isBuffer(obj)){var len=checked(obj.length)|0;var buf=createBuffer(len);if(buf.length===0){return buf}obj.copy(buf,0,0,len);return buf}if(obj){if(isArrayBufferView(obj)||"length"in obj){if(typeof obj.length!=="number"||numberIsNaN(obj.length)){return createBuffer(0)}return fromArrayLike(obj)}if(obj.type==="Buffer"&&Array.isArray(obj.data)){return fromArrayLike(obj.data)}}throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}function checked(length){if(length>=K_MAX_LENGTH){throw new RangeError("Attempt to allocate Buffer larger than maximum "+"size: 0x"+K_MAX_LENGTH.toString(16)+" bytes")}return length|0}function SlowBuffer(length){if(+length!=length){length=0}return Buffer.alloc(+length)}Buffer.isBuffer=function isBuffer(b){return b!=null&&b._isBuffer===true};Buffer.compare=function compare(a,b){if(!Buffer.isBuffer(a)||!Buffer.isBuffer(b)){throw new TypeError("Arguments must be Buffers")}if(a===b)return 0;var x=a.length;var y=b.length;for(var i=0,len=Math.min(x,y);i<len;++i){if(a[i]!==b[i]){x=a[i];y=b[i];break}}if(x<y)return-1;if(y<x)return 1;return 0};Buffer.isEncoding=function isEncoding(encoding){switch(String(encoding).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return true;default:return false}};Buffer.concat=function concat(list,length){if(!Array.isArray(list)){throw new TypeError('"list" argument must be an Array of Buffers')}if(list.length===0){return Buffer.alloc(0)}var i;if(length===undefined){length=0;for(i=0;i<list.length;++i){length+=list[i].length}}var buffer=Buffer.allocUnsafe(length);var pos=0;for(i=0;i<list.length;++i){var buf=list[i];if(!Buffer.isBuffer(buf)){throw new TypeError('"list" argument must be an Array of Buffers')}buf.copy(buffer,pos);pos+=buf.length}return buffer};function byteLength(string,encoding){if(Buffer.isBuffer(string)){return string.length}if(isArrayBufferView(string)||string instanceof ArrayBuffer){return string.byteLength}if(typeof string!=="string"){string=""+string}var len=string.length;if(len===0)return 0;var loweredCase=false;for(;;){switch(encoding){case"ascii":case"latin1":case"binary":return len;case"utf8":case"utf-8":case undefined:return utf8ToBytes(string).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return len*2;case"hex":return len>>>1;case"base64":return base64ToBytes(string).length;default:if(loweredCase)return utf8ToBytes(string).length;encoding=(""+encoding).toLowerCase();loweredCase=true}}}Buffer.byteLength=byteLength;function slowToString(encoding,start,end){var loweredCase=false;if(start===undefined||start<0){start=0}if(start>this.length){return""}if(end===undefined||end>this.length){end=this.length}if(end<=0){return""}end>>>=0;start>>>=0;if(end<=start){return""}if(!encoding)encoding="utf8";while(true){switch(encoding){case"hex":return hexSlice(this,start,end);case"utf8":case"utf-8":return utf8Slice(this,start,end);case"ascii":return asciiSlice(this,start,end);case"latin1":case"binary":return latin1Slice(this,start,end);case"base64":return base64Slice(this,start,end);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return utf16leSlice(this,start,end);default:if(loweredCase)throw new TypeError("Unknown encoding: "+encoding);encoding=(encoding+"").toLowerCase();loweredCase=true}}}Buffer.prototype._isBuffer=true;function swap(b,n,m){var i=b[n];b[n]=b[m];b[m]=i}Buffer.prototype.swap16=function swap16(){var len=this.length;if(len%2!==0){throw new RangeError("Buffer size must be a multiple of 16-bits")}for(var i=0;i<len;i+=2){swap(this,i,i+1)}return this};Buffer.prototype.swap32=function swap32(){var len=this.length;if(len%4!==0){throw new RangeError("Buffer size must be a multiple of 32-bits")}for(var i=0;i<len;i+=4){swap(this,i,i+3);swap(this,i+1,i+2)}return this};Buffer.prototype.swap64=function swap64(){var len=this.length;if(len%8!==0){throw new RangeError("Buffer size must be a multiple of 64-bits")}for(var i=0;i<len;i+=8){swap(this,i,i+7);swap(this,i+1,i+6);swap(this,i+2,i+5);swap(this,i+3,i+4)}return this};Buffer.prototype.toString=function toString(){var length=this.length;if(length===0)return"";if(arguments.length===0)return utf8Slice(this,0,length);return slowToString.apply(this,arguments)};Buffer.prototype.equals=function equals(b){if(!Buffer.isBuffer(b))throw new TypeError("Argument must be a Buffer");if(this===b)return true;return Buffer.compare(this,b)===0};Buffer.prototype.inspect=function inspect(){var str="";var max=exports.INSPECT_MAX_BYTES;if(this.length>0){str=this.toString("hex",0,max).match(/.{2}/g).join(" ");if(this.length>max)str+=" ... "}return"<Buffer "+str+">"};Buffer.prototype.compare=function compare(target,start,end,thisStart,thisEnd){if(!Buffer.isBuffer(target)){throw new TypeError("Argument must be a Buffer")}if(start===undefined){start=0}if(end===undefined){end=target?target.length:0}if(thisStart===undefined){thisStart=0}if(thisEnd===undefined){thisEnd=this.length}if(start<0||end>target.length||thisStart<0||thisEnd>this.length){throw new RangeError("out of range index")}if(thisStart>=thisEnd&&start>=end){return 0}if(thisStart>=thisEnd){return-1}if(start>=end){return 1}start>>>=0;end>>>=0;thisStart>>>=0;thisEnd>>>=0;if(this===target)return 0;var x=thisEnd-thisStart;var y=end-start;var len=Math.min(x,y);var thisCopy=this.slice(thisStart,thisEnd);var targetCopy=target.slice(start,end);for(var i=0;i<len;++i){if(thisCopy[i]!==targetCopy[i]){x=thisCopy[i];y=targetCopy[i];break}}if(x<y)return-1;if(y<x)return 1;return 0};function bidirectionalIndexOf(buffer,val,byteOffset,encoding,dir){if(buffer.length===0)return-1;if(typeof byteOffset==="string"){encoding=byteOffset;byteOffset=0}else if(byteOffset>2147483647){byteOffset=2147483647}else if(byteOffset<-2147483648){byteOffset=-2147483648}byteOffset=+byteOffset;if(numberIsNaN(byteOffset)){byteOffset=dir?0:buffer.length-1}if(byteOffset<0)byteOffset=buffer.length+byteOffset;if(byteOffset>=buffer.length){if(dir)return-1;else byteOffset=buffer.length-1}else if(byteOffset<0){if(dir)byteOffset=0;else return-1}if(typeof val==="string"){val=Buffer.from(val,encoding)}if(Buffer.isBuffer(val)){if(val.length===0){return-1}return arrayIndexOf(buffer,val,byteOffset,encoding,dir)}else if(typeof val==="number"){val=val&255;if(typeof Uint8Array.prototype.indexOf==="function"){if(dir){return Uint8Array.prototype.indexOf.call(buffer,val,byteOffset)}else{return Uint8Array.prototype.lastIndexOf.call(buffer,val,byteOffset)}}return arrayIndexOf(buffer,[val],byteOffset,encoding,dir)}throw new TypeError("val must be string, number or Buffer")}function arrayIndexOf(arr,val,byteOffset,encoding,dir){var indexSize=1;var arrLength=arr.length;var valLength=val.length;if(encoding!==undefined){encoding=String(encoding).toLowerCase();if(encoding==="ucs2"||encoding==="ucs-2"||encoding==="utf16le"||encoding==="utf-16le"){if(arr.length<2||val.length<2){return-1}indexSize=2;arrLength/=2;valLength/=2;byteOffset/=2}}function read(buf,i){if(indexSize===1){return buf[i]}else{return buf.readUInt16BE(i*indexSize)}}var i;if(dir){var foundIndex=-1;for(i=byteOffset;i<arrLength;i++){if(read(arr,i)===read(val,foundIndex===-1?0:i-foundIndex)){if(foundIndex===-1)foundIndex=i;if(i-foundIndex+1===valLength)return foundIndex*indexSize}else{if(foundIndex!==-1)i-=i-foundIndex;foundIndex=-1}}}else{if(byteOffset+valLength>arrLength)byteOffset=arrLength-valLength;for(i=byteOffset;i>=0;i--){var found=true;for(var j=0;j<valLength;j++){if(read(arr,i+j)!==read(val,j)){found=false;break}}if(found)return i}}return-1}Buffer.prototype.includes=function includes(val,byteOffset,encoding){return this.indexOf(val,byteOffset,encoding)!==-1};Buffer.prototype.indexOf=function indexOf(val,byteOffset,encoding){return bidirectionalIndexOf(this,val,byteOffset,encoding,true)};Buffer.prototype.lastIndexOf=function lastIndexOf(val,byteOffset,encoding){return bidirectionalIndexOf(this,val,byteOffset,encoding,false)};function hexWrite(buf,string,offset,length){offset=Number(offset)||0;var remaining=buf.length-offset;if(!length){length=remaining}else{length=Number(length);if(length>remaining){length=remaining}}var strLen=string.length;if(strLen%2!==0)throw new TypeError("Invalid hex string");if(length>strLen/2){length=strLen/2}for(var i=0;i<length;++i){var parsed=parseInt(string.substr(i*2,2),16);if(numberIsNaN(parsed))return i;buf[offset+i]=parsed}return i}function utf8Write(buf,string,offset,length){return blitBuffer(utf8ToBytes(string,buf.length-offset),buf,offset,length)}function asciiWrite(buf,string,offset,length){return blitBuffer(asciiToBytes(string),buf,offset,length)}function latin1Write(buf,string,offset,length){return asciiWrite(buf,string,offset,length)}function base64Write(buf,string,offset,length){return blitBuffer(base64ToBytes(string),buf,offset,length)}function ucs2Write(buf,string,offset,length){return blitBuffer(utf16leToBytes(string,buf.length-offset),buf,offset,length)}Buffer.prototype.write=function write(string,offset,length,encoding){if(offset===undefined){encoding="utf8";length=this.length;offset=0}else if(length===undefined&&typeof offset==="string"){encoding=offset;length=this.length;offset=0}else if(isFinite(offset)){offset=offset>>>0;if(isFinite(length)){length=length>>>0;if(encoding===undefined)encoding="utf8"}else{encoding=length;length=undefined}}else{throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported")}var remaining=this.length-offset;if(length===undefined||length>remaining)length=remaining;if(string.length>0&&(length<0||offset<0)||offset>this.length){throw new RangeError("Attempt to write outside buffer bounds")}if(!encoding)encoding="utf8";var loweredCase=false;for(;;){switch(encoding){case"hex":return hexWrite(this,string,offset,length);case"utf8":case"utf-8":return utf8Write(this,string,offset,length);case"ascii":return asciiWrite(this,string,offset,length);case"latin1":case"binary":return latin1Write(this,string,offset,length);case"base64":return base64Write(this,string,offset,length);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return ucs2Write(this,string,offset,length);default:if(loweredCase)throw new TypeError("Unknown encoding: "+encoding);encoding=(""+encoding).toLowerCase();loweredCase=true}}};Buffer.prototype.toJSON=function toJSON(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};function base64Slice(buf,start,end){if(start===0&&end===buf.length){return base64.fromByteArray(buf)}else{return base64.fromByteArray(buf.slice(start,end))}}function utf8Slice(buf,start,end){end=Math.min(buf.length,end);var res=[];var i=start;while(i<end){var firstByte=buf[i];var codePoint=null;var bytesPerSequence=firstByte>239?4:firstByte>223?3:firstByte>191?2:1;if(i+bytesPerSequence<=end){var secondByte,thirdByte,fourthByte,tempCodePoint;switch(bytesPerSequence){case 1:if(firstByte<128){codePoint=firstByte}break;case 2:secondByte=buf[i+1];if((secondByte&192)===128){tempCodePoint=(firstByte&31)<<6|secondByte&63;if(tempCodePoint>127){codePoint=tempCodePoint}}break;case 3:secondByte=buf[i+1];thirdByte=buf[i+2];if((secondByte&192)===128&&(thirdByte&192)===128){tempCodePoint=(firstByte&15)<<12|(secondByte&63)<<6|thirdByte&63;if(tempCodePoint>2047&&(tempCodePoint<55296||tempCodePoint>57343)){codePoint=tempCodePoint}}break;case 4:secondByte=buf[i+1];thirdByte=buf[i+2];fourthByte=buf[i+3];if((secondByte&192)===128&&(thirdByte&192)===128&&(fourthByte&192)===128){tempCodePoint=(firstByte&15)<<18|(secondByte&63)<<12|(thirdByte&63)<<6|fourthByte&63;if(tempCodePoint>65535&&tempCodePoint<1114112){codePoint=tempCodePoint}}}}if(codePoint===null){codePoint=65533;bytesPerSequence=1}else if(codePoint>65535){codePoint-=65536;res.push(codePoint>>>10&1023|55296);codePoint=56320|codePoint&1023}res.push(codePoint);i+=bytesPerSequence}return decodeCodePointsArray(res)}var MAX_ARGUMENTS_LENGTH=4096;function decodeCodePointsArray(codePoints){var len=codePoints.length;if(len<=MAX_ARGUMENTS_LENGTH){return String.fromCharCode.apply(String,codePoints)}var res="";var i=0;while(i<len){res+=String.fromCharCode.apply(String,codePoints.slice(i,i+=MAX_ARGUMENTS_LENGTH))}return res}function asciiSlice(buf,start,end){var ret="";end=Math.min(buf.length,end);for(var i=start;i<end;++i){ret+=String.fromCharCode(buf[i]&127)}return ret}function latin1Slice(buf,start,end){var ret="";end=Math.min(buf.length,end);for(var i=start;i<end;++i){ret+=String.fromCharCode(buf[i])}return ret}function hexSlice(buf,start,end){var len=buf.length;if(!start||start<0)start=0;if(!end||end<0||end>len)end=len;var out="";for(var i=start;i<end;++i){out+=toHex(buf[i])}return out}function utf16leSlice(buf,start,end){var bytes=buf.slice(start,end);var res="";for(var i=0;i<bytes.length;i+=2){res+=String.fromCharCode(bytes[i]+bytes[i+1]*256)}return res}Buffer.prototype.slice=function slice(start,end){var len=this.length;start=~~start;end=end===undefined?len:~~end;if(start<0){start+=len;if(start<0)start=0}else if(start>len){start=len}if(end<0){end+=len;if(end<0)end=0}else if(end>len){end=len}if(end<start)end=start;var newBuf=this.subarray(start,end);newBuf.__proto__=Buffer.prototype;return newBuf};function checkOffset(offset,ext,length){if(offset%1!==0||offset<0)throw new RangeError("offset is not uint");if(offset+ext>length)throw new RangeError("Trying to access beyond buffer length")}Buffer.prototype.readUIntLE=function readUIntLE(offset,byteLength,noAssert){offset=offset>>>0;byteLength=byteLength>>>0;if(!noAssert)checkOffset(offset,byteLength,this.length);var val=this[offset];var mul=1;var i=0;while(++i<byteLength&&(mul*=256)){val+=this[offset+i]*mul}return val};Buffer.prototype.readUIntBE=function readUIntBE(offset,byteLength,noAssert){offset=offset>>>0;byteLength=byteLength>>>0;if(!noAssert){checkOffset(offset,byteLength,this.length)}var val=this[offset+--byteLength];var mul=1;while(byteLength>0&&(mul*=256)){val+=this[offset+--byteLength]*mul}return val};Buffer.prototype.readUInt8=function readUInt8(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,1,this.length);return this[offset]};Buffer.prototype.readUInt16LE=function readUInt16LE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,2,this.length);return this[offset]|this[offset+1]<<8};Buffer.prototype.readUInt16BE=function readUInt16BE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,2,this.length);return this[offset]<<8|this[offset+1]};Buffer.prototype.readUInt32LE=function readUInt32LE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,4,this.length);return(this[offset]|this[offset+1]<<8|this[offset+2]<<16)+this[offset+3]*16777216};Buffer.prototype.readUInt32BE=function readUInt32BE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,4,this.length);return this[offset]*16777216+(this[offset+1]<<16|this[offset+2]<<8|this[offset+3])};Buffer.prototype.readIntLE=function readIntLE(offset,byteLength,noAssert){offset=offset>>>0;byteLength=byteLength>>>0;if(!noAssert)checkOffset(offset,byteLength,this.length);var val=this[offset];var mul=1;var i=0;while(++i<byteLength&&(mul*=256)){val+=this[offset+i]*mul}mul*=128;if(val>=mul)val-=Math.pow(2,8*byteLength);return val};Buffer.prototype.readIntBE=function readIntBE(offset,byteLength,noAssert){offset=offset>>>0;byteLength=byteLength>>>0;if(!noAssert)checkOffset(offset,byteLength,this.length);var i=byteLength;var mul=1;var val=this[offset+--i];while(i>0&&(mul*=256)){val+=this[offset+--i]*mul}mul*=128;if(val>=mul)val-=Math.pow(2,8*byteLength);return val};Buffer.prototype.readInt8=function readInt8(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,1,this.length);if(!(this[offset]&128))return this[offset];return(255-this[offset]+1)*-1};Buffer.prototype.readInt16LE=function readInt16LE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,2,this.length);var val=this[offset]|this[offset+1]<<8;return val&32768?val|4294901760:val};Buffer.prototype.readInt16BE=function readInt16BE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,2,this.length);var val=this[offset+1]|this[offset]<<8;return val&32768?val|4294901760:val};Buffer.prototype.readInt32LE=function readInt32LE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,4,this.length);return this[offset]|this[offset+1]<<8|this[offset+2]<<16|this[offset+3]<<24};Buffer.prototype.readInt32BE=function readInt32BE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,4,this.length);return this[offset]<<24|this[offset+1]<<16|this[offset+2]<<8|this[offset+3]};Buffer.prototype.readFloatLE=function readFloatLE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,4,this.length);return ieee754.read(this,offset,true,23,4)};Buffer.prototype.readFloatBE=function readFloatBE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,4,this.length);return ieee754.read(this,offset,false,23,4)};Buffer.prototype.readDoubleLE=function readDoubleLE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,8,this.length);return ieee754.read(this,offset,true,52,8)};Buffer.prototype.readDoubleBE=function readDoubleBE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,8,this.length);return ieee754.read(this,offset,false,52,8)};function checkInt(buf,value,offset,ext,max,min){if(!Buffer.isBuffer(buf))throw new TypeError('"buffer" argument must be a Buffer instance');if(value>max||value<min)throw new RangeError('"value" argument is out of bounds');if(offset+ext>buf.length)throw new RangeError("Index out of range")}Buffer.prototype.writeUIntLE=function writeUIntLE(value,offset,byteLength,noAssert){value=+value;offset=offset>>>0;byteLength=byteLength>>>0;if(!noAssert){var maxBytes=Math.pow(2,8*byteLength)-1;checkInt(this,value,offset,byteLength,maxBytes,0)}var mul=1;var i=0;this[offset]=value&255;while(++i<byteLength&&(mul*=256)){this[offset+i]=value/mul&255}return offset+byteLength};Buffer.prototype.writeUIntBE=function writeUIntBE(value,offset,byteLength,noAssert){value=+value;offset=offset>>>0;byteLength=byteLength>>>0;if(!noAssert){var maxBytes=Math.pow(2,8*byteLength)-1;checkInt(this,value,offset,byteLength,maxBytes,0)}var i=byteLength-1;var mul=1;this[offset+i]=value&255;while(--i>=0&&(mul*=256)){this[offset+i]=value/mul&255}return offset+byteLength};Buffer.prototype.writeUInt8=function writeUInt8(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,1,255,0);this[offset]=value&255;return offset+1};Buffer.prototype.writeUInt16LE=function writeUInt16LE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,2,65535,0);this[offset]=value&255;this[offset+1]=value>>>8;return offset+2};Buffer.prototype.writeUInt16BE=function writeUInt16BE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,2,65535,0);this[offset]=value>>>8;this[offset+1]=value&255;return offset+2};Buffer.prototype.writeUInt32LE=function writeUInt32LE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,4,4294967295,0);this[offset+3]=value>>>24;this[offset+2]=value>>>16;this[offset+1]=value>>>8;this[offset]=value&255;return offset+4};Buffer.prototype.writeUInt32BE=function writeUInt32BE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,4,4294967295,0);this[offset]=value>>>24;this[offset+1]=value>>>16;this[offset+2]=value>>>8;this[offset+3]=value&255;return offset+4};Buffer.prototype.writeIntLE=function writeIntLE(value,offset,byteLength,noAssert){value=+value;offset=offset>>>0;if(!noAssert){var limit=Math.pow(2,8*byteLength-1);checkInt(this,value,offset,byteLength,limit-1,-limit)}var i=0;var mul=1;var sub=0;this[offset]=value&255;while(++i<byteLength&&(mul*=256)){if(value<0&&sub===0&&this[offset+i-1]!==0){sub=1}this[offset+i]=(value/mul>>0)-sub&255}return offset+byteLength};Buffer.prototype.writeIntBE=function writeIntBE(value,offset,byteLength,noAssert){value=+value;offset=offset>>>0;if(!noAssert){var limit=Math.pow(2,8*byteLength-1);checkInt(this,value,offset,byteLength,limit-1,-limit)}var i=byteLength-1;var mul=1;var sub=0;this[offset+i]=value&255;while(--i>=0&&(mul*=256)){if(value<0&&sub===0&&this[offset+i+1]!==0){sub=1}this[offset+i]=(value/mul>>0)-sub&255}return offset+byteLength};Buffer.prototype.writeInt8=function writeInt8(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,1,127,-128);if(value<0)value=255+value+1;this[offset]=value&255;return offset+1};Buffer.prototype.writeInt16LE=function writeInt16LE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,2,32767,-32768);this[offset]=value&255;this[offset+1]=value>>>8;return offset+2};Buffer.prototype.writeInt16BE=function writeInt16BE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,2,32767,-32768);this[offset]=value>>>8;this[offset+1]=value&255;return offset+2};Buffer.prototype.writeInt32LE=function writeInt32LE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,4,2147483647,-2147483648);this[offset]=value&255;this[offset+1]=value>>>8;this[offset+2]=value>>>16;this[offset+3]=value>>>24;return offset+4};Buffer.prototype.writeInt32BE=function writeInt32BE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,4,2147483647,-2147483648);if(value<0)value=4294967295+value+1;this[offset]=value>>>24;this[offset+1]=value>>>16;this[offset+2]=value>>>8;this[offset+3]=value&255;return offset+4};function checkIEEE754(buf,value,offset,ext,max,min){if(offset+ext>buf.length)throw new RangeError("Index out of range");if(offset<0)throw new RangeError("Index out of range")}function writeFloat(buf,value,offset,littleEndian,noAssert){value=+value;offset=offset>>>0;if(!noAssert){checkIEEE754(buf,value,offset,4,3.4028234663852886e38,-3.4028234663852886e38)}ieee754.write(buf,value,offset,littleEndian,23,4);return offset+4}Buffer.prototype.writeFloatLE=function writeFloatLE(value,offset,noAssert){return writeFloat(this,value,offset,true,noAssert)};Buffer.prototype.writeFloatBE=function writeFloatBE(value,offset,noAssert){return writeFloat(this,value,offset,false,noAssert)};function writeDouble(buf,value,offset,littleEndian,noAssert){value=+value;offset=offset>>>0;if(!noAssert){checkIEEE754(buf,value,offset,8,1.7976931348623157e308,-1.7976931348623157e308)}ieee754.write(buf,value,offset,littleEndian,52,8);return offset+8}Buffer.prototype.writeDoubleLE=function writeDoubleLE(value,offset,noAssert){return writeDouble(this,value,offset,true,noAssert)};Buffer.prototype.writeDoubleBE=function writeDoubleBE(value,offset,noAssert){return writeDouble(this,value,offset,false,noAssert)};Buffer.prototype.copy=function copy(target,targetStart,start,end){if(!start)start=0;if(!end&&end!==0)end=this.length;if(targetStart>=target.length)targetStart=target.length;if(!targetStart)targetStart=0;if(end>0&&end<start)end=start;if(end===start)return 0;if(target.length===0||this.length===0)return 0;if(targetStart<0){throw new RangeError("targetStart out of bounds")}if(start<0||start>=this.length)throw new RangeError("sourceStart out of bounds");if(end<0)throw new RangeError("sourceEnd out of bounds");if(end>this.length)end=this.length;if(target.length-targetStart<end-start){end=target.length-targetStart+start}var len=end-start;var i;if(this===target&&start<targetStart&&targetStart<end){for(i=len-1;i>=0;--i){target[i+targetStart]=this[i+start]}}else if(len<1e3){for(i=0;i<len;++i){target[i+targetStart]=this[i+start]}}else{Uint8Array.prototype.set.call(target,this.subarray(start,start+len),targetStart)}return len};Buffer.prototype.fill=function fill(val,start,end,encoding){if(typeof val==="string"){if(typeof start==="string"){encoding=start;start=0;end=this.length}else if(typeof end==="string"){encoding=end;end=this.length}if(val.length===1){var code=val.charCodeAt(0);if(code<256){val=code}}if(encoding!==undefined&&typeof encoding!=="string"){throw new TypeError("encoding must be a string")}if(typeof encoding==="string"&&!Buffer.isEncoding(encoding)){throw new TypeError("Unknown encoding: "+encoding)}}else if(typeof val==="number"){val=val&255}if(start<0||this.length<start||this.length<end){throw new RangeError("Out of range index")}if(end<=start){return this}start=start>>>0;end=end===undefined?this.length:end>>>0;if(!val)val=0;var i;if(typeof val==="number"){for(i=start;i<end;++i){this[i]=val}}else{var bytes=Buffer.isBuffer(val)?val:new Buffer(val,encoding);var len=bytes.length;for(i=0;i<end-start;++i){this[i+start]=bytes[i%len]}}return this};var INVALID_BASE64_RE=/[^+\\/0-9A-Za-z-_]/g;function base64clean(str){str=str.trim().replace(INVALID_BASE64_RE,"");if(str.length<2)return"";while(str.length%4!==0){str=str+"="}return str}function toHex(n){if(n<16)return"0"+n.toString(16);return n.toString(16)}function utf8ToBytes(string,units){units=units||Infinity;var codePoint;var length=string.length;var leadSurrogate=null;var bytes=[];for(var i=0;i<length;++i){codePoint=string.charCodeAt(i);if(codePoint>55295&&codePoint<57344){if(!leadSurrogate){if(codePoint>56319){if((units-=3)>-1)bytes.push(239,191,189);continue}else if(i+1===length){if((units-=3)>-1)bytes.push(239,191,189);continue}leadSurrogate=codePoint;continue}if(codePoint<56320){if((units-=3)>-1)bytes.push(239,191,189);leadSurrogate=codePoint;continue}codePoint=(leadSurrogate-55296<<10|codePoint-56320)+65536}else if(leadSurrogate){if((units-=3)>-1)bytes.push(239,191,189)}leadSurrogate=null\r
;if(codePoint<128){if((units-=1)<0)break;bytes.push(codePoint)}else if(codePoint<2048){if((units-=2)<0)break;bytes.push(codePoint>>6|192,codePoint&63|128)}else if(codePoint<65536){if((units-=3)<0)break;bytes.push(codePoint>>12|224,codePoint>>6&63|128,codePoint&63|128)}else if(codePoint<1114112){if((units-=4)<0)break;bytes.push(codePoint>>18|240,codePoint>>12&63|128,codePoint>>6&63|128,codePoint&63|128)}else{throw new Error("Invalid code point")}}return bytes}function asciiToBytes(str){var byteArray=[];for(var i=0;i<str.length;++i){byteArray.push(str.charCodeAt(i)&255)}return byteArray}function utf16leToBytes(str,units){var c,hi,lo;var byteArray=[];for(var i=0;i<str.length;++i){if((units-=2)<0)break;c=str.charCodeAt(i);hi=c>>8;lo=c%256;byteArray.push(lo);byteArray.push(hi)}return byteArray}function base64ToBytes(str){return base64.toByteArray(base64clean(str))}function blitBuffer(src,dst,offset,length){for(var i=0;i<length;++i){if(i+offset>=dst.length||i>=src.length)break;dst[i+offset]=src[i]}return i}function isArrayBufferView(obj){return typeof ArrayBuffer.isView==="function"&&ArrayBuffer.isView(obj)}function numberIsNaN(obj){return obj!==obj}},{"base64-js":1,ieee754:3}],3:[function(require,module,exports){exports.read=function(buffer,offset,isLE,mLen,nBytes){var e,m;var eLen=nBytes*8-mLen-1;var eMax=(1<<eLen)-1;var eBias=eMax>>1;var nBits=-7;var i=isLE?nBytes-1:0;var d=isLE?-1:1;var s=buffer[offset+i];i+=d;e=s&(1<<-nBits)-1;s>>=-nBits;nBits+=eLen;for(;nBits>0;e=e*256+buffer[offset+i],i+=d,nBits-=8){}m=e&(1<<-nBits)-1;e>>=-nBits;nBits+=mLen;for(;nBits>0;m=m*256+buffer[offset+i],i+=d,nBits-=8){}if(e===0){e=1-eBias}else if(e===eMax){return m?NaN:(s?-1:1)*Infinity}else{m=m+Math.pow(2,mLen);e=e-eBias}return(s?-1:1)*m*Math.pow(2,e-mLen)};exports.write=function(buffer,value,offset,isLE,mLen,nBytes){var e,m,c;var eLen=nBytes*8-mLen-1;var eMax=(1<<eLen)-1;var eBias=eMax>>1;var rt=mLen===23?Math.pow(2,-24)-Math.pow(2,-77):0;var i=isLE?0:nBytes-1;var d=isLE?1:-1;var s=value<0||value===0&&1/value<0?1:0;value=Math.abs(value);if(isNaN(value)||value===Infinity){m=isNaN(value)?1:0;e=eMax}else{e=Math.floor(Math.log(value)/Math.LN2);if(value*(c=Math.pow(2,-e))<1){e--;c*=2}if(e+eBias>=1){value+=rt/c}else{value+=rt*Math.pow(2,1-eBias)}if(value*c>=2){e++;c/=2}if(e+eBias>=eMax){m=0;e=eMax}else if(e+eBias>=1){m=(value*c-1)*Math.pow(2,mLen);e=e+eBias}else{m=value*Math.pow(2,eBias-1)*Math.pow(2,mLen);e=0}}for(;mLen>=8;buffer[offset+i]=m&255,i+=d,m/=256,mLen-=8){}e=e<<mLen|m;eLen+=mLen;for(;eLen>0;buffer[offset+i]=e&255,i+=d,e/=256,eLen-=8){}buffer[offset+i-d]|=s*128}},{}],4:[function(require,module,exports){var NeuQuant=require("./WasmNeuQuant.js");var LZWEncoder=require("./LZWEncoder.js");function ByteArray(){this.page=-1;this.pages=[];this.newPage()}ByteArray.pageSize=4096;ByteArray.charMap={};for(var i=0;i<256;i++)ByteArray.charMap[i]=String.fromCharCode(i);ByteArray.prototype.newPage=function(){this.pages[++this.page]=new Uint8Array(ByteArray.pageSize);this.cursor=0};ByteArray.prototype.getData=function(){var rv="";for(var p=0;p<this.pages.length;p++){for(var i=0;i<ByteArray.pageSize;i++){rv+=ByteArray.charMap[this.pages[p][i]]}}return rv};ByteArray.prototype.writeByte=function(val){if(this.cursor>=ByteArray.pageSize)this.newPage();this.pages[this.page][this.cursor++]=val};ByteArray.prototype.writeUTFBytes=function(string){for(var l=string.length,i=0;i<l;i++)this.writeByte(string.charCodeAt(i))};ByteArray.prototype.writeBytes=function(array,offset,length){for(var l=length||array.length,i=offset||0;i<l;i++)this.writeByte(array[i])};function GIFEncoder(width,height){this.width=~~width;this.height=~~height;this.transparent=null;this.transIndex=0;this.repeat=-1;this.delay=0;this.image=null;this.pixels=null;this.indexedPixels=null;this.colorDepth=null;this.colorTab=null;this.neuQuant=null;this.usedEntry=new Array;this.palSize=7;this.dispose=-1;this.firstFrame=true;this.sample=10;this.dither=false;this.globalPalette=false;this.out=new ByteArray}GIFEncoder.prototype.setDelay=function(milliseconds){this.delay=Math.round(milliseconds/10)};GIFEncoder.prototype.setFrameRate=function(fps){this.delay=Math.round(100/fps)};GIFEncoder.prototype.setDispose=function(disposalCode){if(disposalCode>=0)this.dispose=disposalCode};GIFEncoder.prototype.setRepeat=function(repeat){this.repeat=repeat};GIFEncoder.prototype.setTransparent=function(color){this.transparent=color};GIFEncoder.prototype.addFrame=function(imageData){this.image=imageData;this.colorTab=this.globalPalette&&this.globalPalette.slice?this.globalPalette:null;this.getImagePixels();this.analyzePixels();if(this.globalPalette===true)this.globalPalette=this.colorTab;if(this.firstFrame){this.writeLSD();this.writePalette();if(this.repeat>=0){this.writeNetscapeExt()}}this.writeGraphicCtrlExt();this.writeImageDesc();if(!this.firstFrame&&!this.globalPalette)this.writePalette();this.writePixels();this.firstFrame=false};GIFEncoder.prototype.finish=function(){this.out.writeByte(59)};GIFEncoder.prototype.setQuality=function(quality){if(quality<1)quality=1;this.sample=quality};GIFEncoder.prototype.setDither=function(dither){if(dither===true)dither="FloydSteinberg";this.dither=dither};GIFEncoder.prototype.setGlobalPalette=function(palette){this.globalPalette=palette};GIFEncoder.prototype.getGlobalPalette=function(){return this.globalPalette&&this.globalPalette.slice&&this.globalPalette.slice(0)||this.globalPalette};GIFEncoder.prototype.writeHeader=function(){this.out.writeUTFBytes("GIF89a")};GIFEncoder.prototype.analyzePixels=function(){if(!this.colorTab){this.neuQuant=new NeuQuant(this.pixels,this.sample);this.neuQuant.buildColormap();this.colorTab=this.neuQuant.getColormap()}if(this.dither){this.ditherPixels(this.dither.replace("-serpentine",""),this.dither.match(/-serpentine/)!==null)}else{this.indexPixels()}this.pixels=null;this.colorDepth=8;this.palSize=7;if(this.transparent!==null){this.transIndex=this.findClosest(this.transparent,true)}};GIFEncoder.prototype.indexPixels=function(imgq){var nPix=this.pixels.length/3;this.indexedPixels=new Uint8Array(nPix);var k=0;for(var j=0;j<nPix;j++){var index=this.findClosestRGB(this.pixels[k++]&255,this.pixels[k++]&255,this.pixels[k++]&255);this.usedEntry[index]=true;this.indexedPixels[j]=index}};GIFEncoder.prototype.ditherPixels=function(kernel,serpentine){var kernels={FalseFloydSteinberg:[[3/8,1,0],[3/8,0,1],[2/8,1,1]],FloydSteinberg:[[7/16,1,0],[3/16,-1,1],[5/16,0,1],[1/16,1,1]],Stucki:[[8/42,1,0],[4/42,2,0],[2/42,-2,1],[4/42,-1,1],[8/42,0,1],[4/42,1,1],[2/42,2,1],[1/42,-2,2],[2/42,-1,2],[4/42,0,2],[2/42,1,2],[1/42,2,2]],Atkinson:[[1/8,1,0],[1/8,2,0],[1/8,-1,1],[1/8,0,1],[1/8,1,1],[1/8,0,2]]};if(!kernel||!kernels[kernel]){throw"Unknown dithering kernel: "+kernel}var ds=kernels[kernel];var index=0,height=this.height,width=this.width,data=this.pixels;var direction=serpentine?-1:1;this.indexedPixels=new Uint8Array(this.pixels.length/3);for(var y=0;y<height;y++){if(serpentine)direction=direction*-1;for(var x=direction==1?0:width-1,xend=direction==1?width:0;x!==xend;x+=direction){index=y*width+x;var idx=index*3;var r1=data[idx];var g1=data[idx+1];var b1=data[idx+2];idx=this.findClosestRGB(r1,g1,b1);this.usedEntry[idx]=true;this.indexedPixels[index]=idx;idx*=3;var r2=this.colorTab[idx];var g2=this.colorTab[idx+1];var b2=this.colorTab[idx+2];var er=r1-r2;var eg=g1-g2;var eb=b1-b2;for(var i=direction==1?0:ds.length-1,end=direction==1?ds.length:0;i!==end;i+=direction){var x1=ds[i][1];var y1=ds[i][2];if(x1+x>=0&&x1+x<width&&y1+y>=0&&y1+y<height){var d=ds[i][0];idx=index+x1+y1*width;idx*=3;data[idx]=Math.max(0,Math.min(255,data[idx]+er*d));data[idx+1]=Math.max(0,Math.min(255,data[idx+1]+eg*d));data[idx+2]=Math.max(0,Math.min(255,data[idx+2]+eb*d))}}}}};GIFEncoder.prototype.findClosest=function(c,used){return this.findClosestRGB((c&16711680)>>16,(c&65280)>>8,c&255,used)};GIFEncoder.prototype.findClosestRGB=function(r,g,b,used){if(this.colorTab===null)return-1;if(this.neuQuant&&!used){return this.neuQuant.lookupRGB(r,g,b)}var c=b|g<<8|r<<16;var minpos=0;var dmin=256*256*256;var len=this.colorTab.length;for(var i=0,index=0;i<len;index++){var dr=r-(this.colorTab[i++]&255);var dg=g-(this.colorTab[i++]&255);var db=b-(this.colorTab[i++]&255);var d=dr*dr+dg*dg+db*db;if((!used||this.usedEntry[index])&&d<dmin){dmin=d;minpos=index}}return minpos};GIFEncoder.prototype.getImagePixels=function(){var w=this.width;var h=this.height;this.pixels=new Uint8Array(w*h*3);var data=this.image;var srcPos=0;var count=0;for(var i=0;i<h;i++){for(var j=0;j<w;j++){this.pixels[count++]=data[srcPos++];this.pixels[count++]=data[srcPos++];this.pixels[count++]=data[srcPos++];srcPos++}}};GIFEncoder.prototype.writeGraphicCtrlExt=function(){this.out.writeByte(33);this.out.writeByte(249);this.out.writeByte(4);var transp,disp;if(this.transparent===null){transp=0;disp=0}else{transp=1;disp=2}if(this.dispose>=0){disp=this.dispose&7}disp<<=2;this.out.writeByte(0|disp|0|transp);this.writeShort(this.delay);this.out.writeByte(this.transIndex);this.out.writeByte(0)};GIFEncoder.prototype.writeImageDesc=function(){this.out.writeByte(44);this.writeShort(0);this.writeShort(0);this.writeShort(this.width);this.writeShort(this.height);if(this.firstFrame||this.globalPalette){this.out.writeByte(0)}else{this.out.writeByte(128|0|0|0|this.palSize)}};GIFEncoder.prototype.writeLSD=function(){this.writeShort(this.width);this.writeShort(this.height);this.out.writeByte(128|112|0|this.palSize);this.out.writeByte(0);this.out.writeByte(0)};GIFEncoder.prototype.writeNetscapeExt=function(){this.out.writeByte(33);this.out.writeByte(255);this.out.writeByte(11);this.out.writeUTFBytes("NETSCAPE2.0");this.out.writeByte(3);this.out.writeByte(1);this.writeShort(this.repeat);this.out.writeByte(0)};GIFEncoder.prototype.writePalette=function(){this.out.writeBytes(this.colorTab);var n=3*256-this.colorTab.length;for(var i=0;i<n;i++)this.out.writeByte(0)};GIFEncoder.prototype.writeShort=function(pValue){this.out.writeByte(pValue&255);this.out.writeByte(pValue>>8&255)};GIFEncoder.prototype.writePixels=function(){var enc=new LZWEncoder(this.width,this.height,this.indexedPixels,this.colorDepth);enc.encode(this.out)};GIFEncoder.prototype.stream=function(){return this.out};module.exports=GIFEncoder},{"./LZWEncoder.js":5,"./WasmNeuQuant.js":6}],5:[function(require,module,exports){var EOF=-1;var BITS=12;var HSIZE=5003;var masks=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535];function LZWEncoder(width,height,pixels,colorDepth){var initCodeSize=Math.max(2,colorDepth);var accum=new Uint8Array(256);var htab=new Int32Array(HSIZE);var codetab=new Int32Array(HSIZE);var cur_accum,cur_bits=0;var a_count;var free_ent=0;var maxcode;var clear_flg=false;var g_init_bits,ClearCode,EOFCode;function char_out(c,outs){accum[a_count++]=c;if(a_count>=254)flush_char(outs)}function cl_block(outs){cl_hash(HSIZE);free_ent=ClearCode+2;clear_flg=true;output(ClearCode,outs)}function cl_hash(hsize){for(var i=0;i<hsize;++i)htab[i]=-1}function compress(init_bits,outs){var fcode,c,i,ent,disp,hsize_reg,hshift;g_init_bits=init_bits;clear_flg=false;n_bits=g_init_bits;maxcode=MAXCODE(n_bits);ClearCode=1<<init_bits-1;EOFCode=ClearCode+1;free_ent=ClearCode+2;a_count=0;ent=nextPixel();hshift=0;for(fcode=HSIZE;fcode<65536;fcode*=2)++hshift;hshift=8-hshift;hsize_reg=HSIZE;cl_hash(hsize_reg);output(ClearCode,outs);outer_loop:while((c=nextPixel())!=EOF){fcode=(c<<BITS)+ent;i=c<<hshift^ent;if(htab[i]===fcode){ent=codetab[i];continue}else if(htab[i]>=0){disp=hsize_reg-i;if(i===0)disp=1;do{if((i-=disp)<0)i+=hsize_reg;if(htab[i]===fcode){ent=codetab[i];continue outer_loop}}while(htab[i]>=0)}output(ent,outs);ent=c;if(free_ent<1<<BITS){codetab[i]=free_ent++;htab[i]=fcode}else{cl_block(outs)}}output(ent,outs);output(EOFCode,outs)}function encode(outs){outs.writeByte(initCodeSize);remaining=width*height;curPixel=0;compress(initCodeSize+1,outs);outs.writeByte(0)}function flush_char(outs){if(a_count>0){outs.writeByte(a_count);outs.writeBytes(accum,0,a_count);a_count=0}}function MAXCODE(n_bits){return(1<<n_bits)-1}function nextPixel(){if(remaining===0)return EOF;--remaining;var pix=pixels[curPixel++];return pix&255}function output(code,outs){cur_accum&=masks[cur_bits];if(cur_bits>0)cur_accum|=code<<cur_bits;else cur_accum=code;cur_bits+=n_bits;while(cur_bits>=8){char_out(cur_accum&255,outs);cur_accum>>=8;cur_bits-=8}if(free_ent>maxcode||clear_flg){if(clear_flg){maxcode=MAXCODE(n_bits=g_init_bits);clear_flg=false}else{++n_bits;if(n_bits==BITS)maxcode=1<<BITS;else maxcode=MAXCODE(n_bits)}}if(code==EOFCode){while(cur_bits>0){char_out(cur_accum&255,outs);cur_accum>>=8;cur_bits-=8}flush_char(outs)}}this.encode=encode}module.exports=LZWEncoder},{}],6:[function(require,module,exports){(function(Buffer){var src=Buffer("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","base64");var wamodule=new WebAssembly.Module(src);var instance;var memarray;function NeuQuant(pixels,samplefac){if(!instance){var table=new WebAssembly.Table({initial:0,element:"anyfunc"});var memory=new WebAssembly.Memory({initial:1});memarray=new Uint8Array(memory.buffer);var env={};env.memoryBase=0;env.memory=memory;env.tableBase=0;env.table=table;env.memset=function(){};env._grow=function(){memarray=new Uint8Array(memory.buffer)};env._abort=function(){throw new Error("Abort")};env._exit=function(){throw new Error("Exit")};instance=new WebAssembly.Instance(wamodule,{env:env})}var pixelPtr=instance.exports.malloc(pixels.byteLength);memarray.set(pixels,pixelPtr);instance.exports.init(pixelPtr,pixels.length,samplefac);this.buildColormap=function(){instance.exports.learn();instance.exports.unbiasnet();instance.exports.inxbuild();instance.exports.free(pixelPtr)};this.getColormap=function(){var map=new Uint8Array(256*3);var mapPtr=instance.exports.getColormap();map.set(memarray.subarray(mapPtr,mapPtr+map.byteLength));return map};this.lookupRGB=instance.exports.inxsearch}module.exports=NeuQuant}).call(this,require("buffer").Buffer)},{buffer:2}],7:[function(require,module,exports){\r
var GIFEncoder,renderFrame;GIFEncoder=require("./GIFEncoder.js");renderFrame=function(frame){var encoder,page,stream,transfer;encoder=new GIFEncoder(frame.width,frame.height);if(frame.index===0){encoder.writeHeader()}else{encoder.firstFrame=false}encoder.setTransparent(frame.transparent);encoder.setDispose(frame.dispose);encoder.setRepeat(frame.repeat);encoder.setDelay(frame.delay);encoder.setQuality(frame.quality);encoder.setDither(frame.dither);encoder.setGlobalPalette(frame.globalPalette);encoder.addFrame(frame.data);if(frame.last){encoder.finish()}if(frame.globalPalette===true){frame.globalPalette=encoder.getGlobalPalette()}stream=encoder.stream();frame.data=stream.pages;frame.cursor=stream.cursor;frame.pageSize=stream.constructor.pageSize;if(frame.canTransfer){transfer=function(){var i,len,ref,results;ref=frame.data;results=[];for(i=0,len=ref.length;i<len;i++){page=ref[i];results.push(page.buffer)}return results}();return self.postMessage(frame,transfer)}else{return self.postMessage(frame)}};self.onmessage=function(event){return renderFrame(event.data)}},{"./GIFEncoder.js":4}]},{},[7]);\r
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
var channelStore = BdApi.Webpack.getStore("SelectedChannelStore");

// shared/util/upload.ts
var onSubmit = null;
before(chatbox?.type, "render", ({ args }) => onSubmit = args[0].onSubmit);
async function uploadFile(file) {
  const channelId = channelStore.getCurrentlySelectedChannelId();
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
  const dy2 = point[1] - from[1];
  const length = Math.sqrt(dx ** 2 + dy2 ** 2);
  const scale = distance / length;
  return [point[0] + dx * scale, point[1] + dy2 * scale];
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

// plugins/GifCaptioner/src/render/gifRenderer.ts
var worker = getUrl(gif_worker_default);
var GifRenderer = class {
  canvas = document.createElement("canvas");
  ctx = this.canvas.getContext("2d");
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
      error("Attempted to encode gif while plugin is disabled");
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
    const maxSize = premiumPermissions.getUserMaxFileSize();
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
  addVideoFrame(source, delay) {
    this.ctx.drawImage(source, 0, this.topOffset, this.width, this.height);
    this.addFrameToGif(delay);
    source.close();
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

// plugins/GifCaptioner/src/ui/progress.tsx
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
  return /* @__PURE__ */ BdApi.React.createElement("div", { className: "gc-progress" }, /* @__PURE__ */ BdApi.React.createElement("h2", { className: "gc-status" }, status), /* @__PURE__ */ BdApi.React.createElement("progress", { value: progress, max: 1 }));
}

// plugins/GifCaptioner/src/ui/createProgress.tsx
var ProgressDisplay = class {
  updater;
  modalId;
  constructor(status) {
    this.modalId = ModalSystem.open((props) => {
      return /* @__PURE__ */ BdApi.React.createElement(Modal.Root, { size: "dynamic", ...props }, /* @__PURE__ */ BdApi.React.createElement(Modal.Content, null, /* @__PURE__ */ BdApi.React.createElement(Progress, { status, onUpdater: (updater) => this.updater = updater })));
    }, {
      onCloseRequest: () => false
    });
  }
  update(status, progress) {
    if (!this.updater) return;
    this.updater(status, progress);
  }
  close() {
    ModalSystem.close(this.modalId);
  }
};

// plugins/GifCaptioner/src/render/mp4.ts
async function captionMp4(url, width, height, transform) {
  const progress = new ProgressDisplay("Fetching");
  let res = await fetch(url).catch(() => {
    progress.close();
    error("Failed to fetch gif");
  });
  if (!res) return;
  let arrayBuffer = await res.arrayBuffer();
  const onError = () => {
    progress.close();
    error("Failed to parse gif");
  };
  progress.update("Preparing");
  let frames = 0;
  await parseMp4({
    buffer: arrayBuffer,
    onError,
    onFrame: (frame) => {
      frame.source.close();
      frames++;
    }
  });
  progress.update("Rendering", 0);
  const renderer = new GifRenderer({ progress, frames, width, height, transform });
  let i = 0;
  await parseMp4({
    buffer: arrayBuffer,
    onError,
    onFrame: (frame) => {
      progress.update("Rendering", i / frames);
      renderer.addVideoFrame(frame.source, frame.delay);
      i++;
    }
  });
  renderer.render();
}
var minFrameLength = 1e3 / 50;
function parseMp4({ buffer, onFrame, onError }) {
  return new Promise((res) => {
    let mp4Buffer = buffer;
    mp4Buffer.fileStart = 0;
    let time = 0;
    let lastFrameTime = 0;
    const decoder = new VideoDecoder({
      output(frame) {
        if (!frame.duration) return frame.close();
        let duration = frame.duration / 1e3;
        time += duration;
        let delay = time - lastFrameTime;
        if (delay >= minFrameLength) {
          lastFrameTime = time;
          onFrame({ source: frame, delay });
        } else {
          frame.close();
        }
      },
      error() {
        onError?.();
      }
    });
    let file = au();
    file.onError = () => onError?.();
    file.onReady = (info) => {
      const track = info.videoTracks[0];
      if (!track.video) return;
      try {
        decoder.configure({
          codec: track.codec.startsWith("vp08") ? "vp8" : track.codec,
          codedHeight: track.video.height,
          codedWidth: track.video.width,
          description: getDescription(file, track.id)
        });
        file.setExtractionOptions(track.id);
        file.start();
      } catch {
        onError?.();
      }
    };
    file.onSamples = (id, ref, samples) => {
      for (let sample of samples) {
        if (!sample.data) continue;
        const chunk = new EncodedVideoChunk({
          type: sample.is_sync ? "key" : "delta",
          timestamp: 1e6 * sample.cts / sample.timescale,
          duration: 1e6 * sample.duration / sample.timescale,
          data: sample.data
        });
        decoder.decode(chunk);
      }
      decoder.flush().then(res);
    };
    file.appendBuffer(mp4Buffer);
  });
}
function getDescription(file, id) {
  const trak = file.getTrackById(id);
  for (const entry of trak.mdia.minf.stbl.stsd.entries) {
    const box = entry.avcC || entry.hvcC || entry.vpcC || entry.av1C;
    if (box) {
      const stream = new E(void 0, 0, 1);
      box.write(stream);
      return new Uint8Array(stream.buffer, 8);
    }
  }
  throw new Error("avcC, hvcC, vpcC, or av1C box not found");
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

.gc-progress {
  color: white;
  width: 300px;
}

.gc-status {
  font-size: 30px;
  font-weight: bold;
  white-space: nowrap;
}

.gc-progress progress {
  width: 100%;
  margin: 10px 0;
  height: 20px;
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
  let res = await fetch(url);
  let buffer = await res.arrayBuffer();
  let parsed = (0, import_gifuct_js.parseGIF)(buffer);
  let frames = (0, import_gifuct_js.decompressFrames)(parsed, true);
  let numFrames = frames.length;
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
}
function parseGif(buffer) {
  let parsed = (0, import_gifuct_js.parseGIF)(buffer);
  let frames = (0, import_gifuct_js.decompressFrames)(parsed, true);
  return { parsed, frames };
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

// plugins/GifCaptioner/src/index.ts
addFont(Futura_Condensed_Extra_Bold_default, "futuraBoldCondensed");
after(gifDisplay.prototype, "render", ({ thisVal, returnVal }) => {
  const button = BdApi.React.createElement("button", {
    dangerouslySetInnerHTML: { __html: page_layout_header_default },
    className: "gc-trigger",
    onClick: (e) => {
      e.stopPropagation();
      let isGif = thisVal.props.format === 1;
      let url = thisVal.props.src;
      if (!isGif) {
        let typeIndex = url.lastIndexOf("/") - 1;
        url = url.slice(0, typeIndex) + "o" + url.slice(typeIndex + 1);
      }
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
  });
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
expose("parseMp4", parseMp4);
expose("parseGif", parseGif);
  }
}
