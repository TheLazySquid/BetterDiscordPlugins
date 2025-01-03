import { EventEmitter } from 'events';
import GIFEncoder from './GIFEncoder.js';

var GIF,
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf;

GIF = (function() {
  var defaults, frameDefaults, renderFrame;

  renderFrame = function(frame) {
    var encoder, page, stream, transfer;
    encoder = new GIFEncoder(frame.width, frame.height);
    if (frame.index === 0) {
      encoder.writeHeader();
    } else {
      encoder.firstFrame = false;
    }
    encoder.setTransparent(frame.transparent);
    encoder.setDispose(frame.dispose);
    encoder.setRepeat(frame.repeat);
    encoder.setDelay(frame.delay);
    encoder.setQuality(frame.quality);
    encoder.setDither(frame.dither);
    encoder.setGlobalPalette(frame.globalPalette);
    encoder.addFrame(frame.data);
    if (frame.last) {
      encoder.finish();
    }
    if (frame.globalPalette === true) {
      frame.globalPalette = encoder.getGlobalPalette();
    }
    stream = encoder.stream();
    frame.data = stream.pages;
    frame.cursor = stream.cursor;
    frame.pageSize = stream.constructor.pageSize;
    return frame;
  };

  class GIF extends EventEmitter {
    constructor(options) {
      var base, key, value;
      super();
      this.running = false;
      this.options = {};
      this.frames = [];
      this.setOptions(options);
      for (key in defaults) {
        value = defaults[key];
        if ((base = this.options)[key] == null) {
          base[key] = value;
        }
      }
    }

    setOption(key, value) {
      this.options[key] = value;
      if ((this._canvas != null) && (key === 'width' || key === 'height')) {
        return this._canvas[key] = value;
      }
    }

    setOptions(options) {
      var key, results, value;
      results = [];
      for (key in options) {
        if (!hasProp.call(options, key)) continue;
        value = options[key];
        results.push(this.setOption(key, value));
      }
      return results;
    }

    addFrame(image, options = {}) {
      var frame, key;
      frame = {};
      frame.transparent = this.options.transparent;
      for (key in frameDefaults) {
        frame[key] = options[key] || frameDefaults[key];
      }
      if (this.options.width == null) {
        // use the images width and height for options unless already set
        this.setOption('width', image.width);
      }
      if (this.options.height == null) {
        this.setOption('height', image.height);
      }
      if ((typeof ImageData !== "undefined" && ImageData !== null) && image instanceof ImageData) {
        frame.data = image.data;
      } else if (((typeof CanvasRenderingContext2D !== "undefined" && CanvasRenderingContext2D !== null) && image instanceof CanvasRenderingContext2D) || ((typeof WebGLRenderingContext !== "undefined" && WebGLRenderingContext !== null) && image instanceof WebGLRenderingContext)) {
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
        throw new Error('Invalid image');
      }
      return this.frames.push(frame);
    }

    render() {
      let i;
      if (this.running) {
        throw new Error('Already running');
      }
      if ((this.options.width == null) || (this.options.height == null)) {
        throw new Error('Width and height must be set prior to rendering');
      }
      this.running = true;
      this.nextFrame = 0;
      this.finishedFrames = 0;
      this.imageParts = (function() {
        var j, ref, results;
        results = [];
        for (i = j = 0, ref = this.frames.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
          results.push(null);
        }
        return results;
      }).call(this);
      // we need to wait for the palette
      this.renderNextFrame();
      this.emit('start');
      return this.emit('progress', 0);
    }

    abort() {
      this.running = false;
      return this.emit('abort');
    }

    frameFinished(frame) {
      var i, j, ref;
      this.log(`frame ${frame.index} finished`);
      this.finishedFrames++;
      this.emit('progress', this.finishedFrames / this.frames.length);
      this.imageParts[frame.index] = frame;
      // remember calculated palette, spawn the rest of the workers
      if (this.options.globalPalette === true) {
        this.options.globalPalette = frame.globalPalette;
        this.log('global palette analyzed');
        if (this.frames.length > 2) {
          this.renderNextFrame();
        }
      }
      if (indexOf.call(this.imageParts, null) >= 0) {
        return this.renderNextFrame();
      } else {
        return this.finishRendering();
      }
    }

    finishRendering() {
      var data, frame, i, image, j, k, l, len, len1, len2, len3, offset, page, ref, ref1, ref2;
      len = 0;
      ref = this.imageParts;
      for (j = 0, len1 = ref.length; j < len1; j++) {
        frame = ref[j];
        len += (frame.data.length - 1) * frame.pageSize + frame.cursor;
      }
      len += frame.pageSize - frame.cursor;
      this.log(`rendering finished - filesize ${Math.round(len / 1000)}kb`);
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
      image = new Blob([data], {
        type: 'image/gif'
      });
      return this.emit('finished', image, data);
    }

    async renderNextFrame() {
      var frame, task;
      if (this.nextFrame >= this.frames.length) { // no new frame to render
        return;
      }
      frame = this.frames[this.nextFrame++];
      task = this.getTask(frame);
      this.log(`starting frame ${task.index + 1} of ${this.frames.length}`);
      let event = renderFrame(task); //, [task.data.buffer]
      
      // wait a tick to allow the event loop to process
      await new Promise(resolve => setTimeout(resolve, 0));
      this.frameFinished(event);
    }

    getContextData(ctx) {
      return ctx.getImageData(0, 0, this.options.width, this.options.height).data;
    }

    getImageData(image) {
      var ctx;
      if (this._canvas == null) {
        this._canvas = document.createElement('canvas');
        this._canvas.width = this.options.width;
        this._canvas.height = this.options.height;
      }
      ctx = this._canvas.getContext('2d');
      ctx.fillStyle = this.options.background;
      ctx.fillRect(0, 0, this.options.width, this.options.height);
      ctx.drawImage(image, 0, 0);
      return this.getContextData(ctx);
    }

    getTask(frame) {
      var index, task;
      index = this.frames.indexOf(frame);
      task = {
        index: index,
        last: index === (this.frames.length - 1),
        delay: frame.delay,
        dispose: frame.dispose,
        transparent: frame.transparent,
        width: this.options.width,
        height: this.options.height,
        quality: this.options.quality,
        dither: this.options.dither,
        globalPalette: this.options.globalPalette,
        repeat: this.options.repeat
      };
      if (frame.data != null) {
        task.data = frame.data;
      } else if (frame.context != null) {
        task.data = this.getContextData(frame.context);
      } else if (frame.image != null) {
        task.data = this.getImageData(frame.image);
      } else {
        throw new Error('Invalid frame');
      }
      return task;
    }

    log(...args) {
      if (!this.options.debug) {
        return;
      }
      return console.log(...args);
    }

  };

  defaults = {
    repeat: 0, // repeat forever, -1 = repeat once
    background: '#fff',
    quality: 10, // pixel sample interval, lower is better
    width: null, // size derermined from first frame if possible
    height: null,
    transparent: null,
    debug: false,
    dither: false // see GIFEncoder.js for dithering options
  };

  frameDefaults = {
    delay: 500, // ms
    copy: false,
    dispose: -1
  };

  return GIF;

}).call(this);

export default GIF;