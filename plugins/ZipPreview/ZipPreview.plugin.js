/**
 * @name ZipPreview
 * @version 0.4.0
 * @description Lets you see inside zip files, and download individual files, without ever downloading/extracting the zip
 * @author TheLazySquid
 * @authorId 619261917352951815
 * @website https://github.com/TheLazySquid/DiscordZipPreview
 * @source https://github.com/TheLazySquid/DiscordZipPreview/blob/main/src/build/ZipPreview.plugin.js
 */
module.exports = class {
  constructor() {
'use strict';

const createCallbackHandler = (callbackName) => {
  const fullName = callbackName + "Callbacks";
  this[fullName] = [];
  this[callbackName] = () => {
      for (let i = 0; i < this[fullName].length; i++) {
          this[fullName][i].callback();
      }
  };
  return (callback, once, id) => {
      let object = { callback };
      const delCallback = () => {
          this[fullName].splice(this[fullName].indexOf(object), 1);
      };
      // if once is true delete it after use
      if (once === true) {
          object.callback = () => {
              callback();
              delCallback();
          };
      }
      if (id) {
          object.id = id;
          for (let i = 0; i < this[fullName].length; i++) {
              if (this[fullName][i].id === id) {
                  this[fullName][i] = object;
                  return delCallback;
              }
          }
      }
      this[fullName].push(object);
      return delCallback;
  };
};
/**
* Takes a callback and fires it when the plugin is started
* @param callback - The callback to be fired
* @param once - If true, the callback will be deleted after use
* @param id - The id of the callback - if it already exists, it will be replaced
* @returns A function to delete the callback
*/
const onStart = createCallbackHandler("start");
/**
* Takes a callback and fires it when the plugin is stopped
* @param callback - The callback to be fired
* @param once - If true, the callback will be deleted after use
* @param id - The id of the callback - if it already exists, it will be replaced
* @returns A function to delete the callback
*/
const onStop = createCallbackHandler("stop");
/**
* Takes a callback and fires it when the user navigates
* @param callback - The callback to be fired
* @param once - If true, the callback will be deleted after use
* @param id - The id of the callback - if it already exists, it will be replaced
* @returns A function to delete the callback
*/
createCallbackHandler("onSwitch");

/**
* Recursively patches a module, running a callback after the innermost patch is called.
* Automatically disposes of the patch when the plugin is stopped.
* @param module The module to patch
* @param callback The callback to run to modify the return value of the innermost patched
* @param path A list of lists of properties to patch, in order
* @returns A function to dispose of the patch
*/
function chainPatch(module, callback, ...path) {
  let patchedFns = [];
  let disposeFns = [];
  patch(module, 0);
  function patch(object, depth) {
      // the variable names here are a mess
      let pathPart = path[depth];
      let toPatchArray = [];
      let patchProp;
      if (pathPart.path) {
          patchProp = pathPart.path[pathPart.path.length - 1];
          let toPatch = object;
          for (let i = 0; i < pathPart.path.length - 1; i++) {
              let prop = pathPart.path[i];
              toPatch = toPatch[prop];
          }
          toPatchArray.push(toPatch);
      }
      else if (pathPart.customPath) {
          patchProp = pathPart.customPath.finalProp;
          let customPath = pathPart.customPath.run(object);
          if (Array.isArray(customPath)) {
              toPatchArray.push(...customPath);
          }
          else {
              toPatchArray.push(customPath);
          }
      }
      if (toPatchArray.length === 0)
          return;
      // patch the function
      if (!patchedFns[depth]) {
          let nativeFn = toPatchArray[0][patchProp];
          patchedFns[depth] = function (...args) {
              let returnVal = nativeFn.call(this, ...args);
              if (pathPart.validate && !pathPart.validate(this, args, returnVal)) {
                  return returnVal;
              }
              if (path.length > depth + 1) {
                  patch(returnVal, depth + 1);
              }
              else {
                  callback(this, args, returnVal);
              }
              return returnVal;
          };
          // add a dispose function
          disposeFns[depth] = () => {
              for (let item of toPatchArray) {
                  item[patchProp] = nativeFn;
              }
          };
      }
      // apply patches
      for (let item of toPatchArray) {
          item[patchProp] = patchedFns[depth];
      }
  }
  const dispose = () => {
      for (let dispose of disposeFns) {
          dispose();
      }
  };
  onStop(dispose);
  return dispose;
}

var css = ".zp-wrap {\r\n    display: flex;\r\n    flex-direction: column;\r\n    width: 100%;\r\n}\r\n\r\n.zp-zip {\r\n    padding: 0px !important;\r\n}\r\n\r\n.zp-content {\r\n    padding: 16px;\r\n    padding-bottom: 10px;\r\n    display: flex;\r\n    align-items: center;\r\n}\r\n\r\n.zp-dropdown-expander {\r\n    width: 100%;\r\n    display: flex;\r\n    height: 16px;\r\n    align-items: center;\r\n    justify-content: center;\r\n    border-top: 2px solid var(--border-subtle);\r\n    cursor: pointer;\r\n}\r\n\r\n.zp-dropdown-expander svg {\r\n    width: 16px;\r\n    height: 16px;\r\n    fill: var(--text-link);   \r\n}\r\n\r\n.zp-zip-preview {\r\n    max-height: 0px;\r\n    overflow: hidden;\r\n    transition: max-height 0.3s ease;\r\n    color: var(--text-normal);\r\n    padding-left: 16px;\r\n}\r\n\r\n.zp-zip-preview.expanded {\r\n    max-height: 500px;\r\n    overflow-y: auto;\r\n    padding-bottom: 10px;\r\n}\r\n\r\n.zp-entry {\r\n    color: var(--text-link);\r\n    text-decoration: underline;\r\n    padding-bottom: 2px;\r\n    cursor: pointer;\r\n}\r\n\r\n.zp-filesize {\r\n    color: var(--text-normal);\r\n    text-decoration: none;\r\n    font-size: small;\r\n    padding-left: 5px;\r\n}\r\n\r\n.zp-path {\r\n    color: var(--text-normal);\r\n    padding-bottom: 2px;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 8px;\r\n}\r\n\r\n.zp-folderReturn {\r\n    cursor: pointer;\r\n}\r\n\r\n.zp-folderReturn svg {\r\n    fill: var(--text-normal);\r\n    width: 20px;\r\n    height: 20px;\r\n}\r\n\r\n.zp-preview-bg {\r\n    background-color: rgba(0, 0, 0, 0.5);\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n    width: 100vw;\r\n    height: 100vh;\r\n    z-index: 3500;\r\n}\r\n\r\n.zp-preview {\r\n    position: absolute;\r\n    background: var(--background-secondary);\r\n    color: var(--text-normal);\r\n    top: 50%;\r\n    left: 50%;\r\n    transform: translate(-50%, -50%);\r\n    max-width: 90%;\r\n    min-width: 30%;\r\n    max-height: 90%;\r\n    min-height: 20%;\r\n    border-radius: 15px;\r\n    overflow: hidden;\r\n    display: flex;\r\n    flex-direction: column;\r\n    user-select: text;\r\n}\r\n\r\n.zp-preview-header {\r\n    height: 45px;\r\n    background: var(--background-primary);\r\n    flex-shrink: 0;\r\n    display: flex;\r\n    align-items: center;\r\n    font-size: 28px;\r\n    padding-left: 20px;\r\n    padding-right: 20px;\r\n    font-weight: 700;\r\n    border-bottom: 1px solid #bbbbbb;\r\n}\r\n\r\n.zp-preview-title {\r\n    flex-grow: 1;\r\n    min-width: 0;\r\n    overflow: hidden;\r\n    text-wrap: nowrap;\r\n    text-overflow: ellipsis;\r\n    height: 100%;\r\n    display: flex;\r\n    align-items: center;\r\n}\r\n\r\n.zp-preview-close {\r\n    height: 35px;\r\n    width: 35px;\r\n    fill: var(--text-normal);\r\n    cursor: pointer;\r\n}\r\n\r\n.zp-preview-content-wrap {\r\n    margin: 20px;\r\n    margin-bottom: 0;\r\n    padding: 20px;\r\n    border: 1px solid #bbbbbb;\r\n    border-radius: 10px;\r\n    min-height: 0;\r\n    overflow: hidden;\r\n    display: flex;\r\n    position: relative;\r\n    align-self: stretch;\r\n    flex-grow: 1;\r\n}\r\n\r\n.zp-preview-copy {\r\n    position: absolute;\r\n    top: 10px;\r\n    right: 10px;\r\n    width: 20px;\r\n    height: 20px;\r\n    fill: var(--text-normal);\r\n    cursor: pointer;\r\n}\r\n\r\n.zp-preview-content {\r\n    min-height: 0;\r\n    overflow: auto;\r\n    width: 100%;\r\n    scrollbar-color: var(--background-primary) var(--background-secondary);\r\n    /* prevents a scrollbar from randomly appearing for some reason */\r\n    padding-top: 3px;\r\n    padding-bottom: 3px;\r\n}\r\n\r\n.zp-preview audio {\r\n    width: 100%;\r\n}\r\n\r\n.zp-preview img {\r\n    \r\n}\r\n\r\n.zp-preview img, .zp-preview video {\r\n    width: 100%;\r\n    height: auto;\r\n}\r\n\r\n.zp-preview-override {\r\n    margin: 10px;\r\n    padding: 3px;\r\n    padding-left: 10px;\r\n    padding-right: 10px;\r\n    border-radius: 5px;\r\n    background-color: red;\r\n    color: white;\r\n    font-weight: bold;\r\n    text-align: center;\r\n}\r\n\r\n.zp-preview-footer {\r\n    height: 55px;\r\n    flex-shrink: 0;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: flex-end;\r\n    padding-right: 20px;\r\n    align-self: stretch;\r\n}\r\n\r\n.zp-preview-footer .icon {\r\n    height: 35px;\r\n    width: 35px;\r\n    border: none;\r\n    background-color: transparent;\r\n    fill: var(--text-normal);\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n}";

/* unzipit@1.4.3, license MIT */
/* global SharedArrayBuffer, process */

function readBlobAsArrayBuffer(blob) {
if (blob.arrayBuffer) {
  return blob.arrayBuffer();
}
return new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.addEventListener('loadend', () => {
    resolve(reader.result);
  });
  reader.addEventListener('error', reject);
  reader.readAsArrayBuffer(blob);
});
}

async function readBlobAsUint8Array(blob) {
const arrayBuffer = await readBlobAsArrayBuffer(blob);
return new Uint8Array(arrayBuffer);
}

function isBlob(v) {
return typeof Blob !== 'undefined' && v instanceof Blob;
}

function isSharedArrayBuffer(b) {
return typeof SharedArrayBuffer !== 'undefined' && b instanceof SharedArrayBuffer;
}

const isNode =
  (typeof process !== 'undefined') &&
  process.versions &&
  (typeof process.versions.node !== 'undefined') &&
  (typeof process.versions.electron === 'undefined');

function isTypedArraySameAsArrayBuffer(typedArray) {
return typedArray.byteOffset === 0 && typedArray.byteLength === typedArray.buffer.byteLength;
}

class ArrayBufferReader {
constructor(arrayBufferOrView) {
  this.typedArray = (arrayBufferOrView instanceof ArrayBuffer || isSharedArrayBuffer(arrayBufferOrView))
     ? new Uint8Array(arrayBufferOrView)
     : new Uint8Array(arrayBufferOrView.buffer, arrayBufferOrView.byteOffset, arrayBufferOrView.byteLength);
}
async getLength() {
  return this.typedArray.byteLength;
}
async read(offset, length) {
  return new Uint8Array(this.typedArray.buffer, this.typedArray.byteOffset + offset, length);
}
}

class BlobReader {
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
async sliceAsBlob(offset, length, type = '') {
  return this.blob.slice(offset, offset + length, type);
}
}

function inflate(data, buf) {
var u8=Uint8Array;
if(data[0]==3 && data[1]==0) return (buf ? buf : new u8(0));
var bitsF = _bitsF, bitsE = _bitsE, decodeTiny = _decodeTiny, get17 = _get17;

var noBuf = (buf==null);
if(noBuf) buf = new u8((data.length>>>2)<<3);

var BFINAL=0, BTYPE=0, HLIT=0, HDIST=0, HCLEN=0, ML=0, MD=0; 	
var off = 0, pos = 0;
var lmap, dmap;

while(BFINAL==0) {		
  BFINAL = bitsF(data, pos  , 1);
  BTYPE  = bitsF(data, pos+1, 2);  pos+=3;
  //console.log(BFINAL, BTYPE);
  
  if(BTYPE==0) {
    if((pos&7)!=0) pos+=8-(pos&7);
    var p8 = (pos>>>3)+4, len = data[p8-4]|(data[p8-3]<<8);  //console.log(len);//bitsF(data, pos, 16), 
    if(noBuf) buf=_check(buf, off+len);
    buf.set(new u8(data.buffer, data.byteOffset+p8, len), off);
    //for(var i=0; i<len; i++) buf[off+i] = data[p8+i];
    //for(var i=0; i<len; i++) if(buf[off+i] != data[p8+i]) throw "e";
    pos = ((p8+len)<<3);  off+=len;  continue;
  }
  if(noBuf) buf=_check(buf, off+(1<<17));  // really not enough in many cases (but PNG and ZIP provide buffer in advance)
  if(BTYPE==1) {  lmap = U.flmap;  dmap = U.fdmap;  ML = (1<<9)-1;  MD = (1<<5)-1;   }
  if(BTYPE==2) {
    HLIT  = bitsE(data, pos   , 5)+257;  
    HDIST = bitsE(data, pos+ 5, 5)+  1;  
    HCLEN = bitsE(data, pos+10, 4)+  4;  pos+=14;
    for(var i=0; i<38; i+=2) {  U.itree[i]=0;  U.itree[i+1]=0;  }
    var tl = 1;
    for(var i=0; i<HCLEN; i++) {  var l=bitsE(data, pos+i*3, 3);  U.itree[(U.ordr[i]<<1)+1] = l;  if(l>tl)tl=l;  }     pos+=3*HCLEN;  //console.log(itree);
    makeCodes(U.itree, tl);
    codes2map(U.itree, tl, U.imap);
    
    lmap = U.lmap;  dmap = U.dmap;
    
    pos = decodeTiny(U.imap, (1<<tl)-1, HLIT+HDIST, data, pos, U.ttree);
    var mx0 = _copyOut(U.ttree,    0, HLIT , U.ltree);  ML = (1<<mx0)-1;
    var mx1 = _copyOut(U.ttree, HLIT, HDIST, U.dtree);  MD = (1<<mx1)-1;
    
    //var ml = decodeTiny(U.imap, (1<<tl)-1, HLIT , data, pos, U.ltree); ML = (1<<(ml>>>24))-1;  pos+=(ml&0xffffff);
    makeCodes(U.ltree, mx0);
    codes2map(U.ltree, mx0, lmap);
    
    //var md = decodeTiny(U.imap, (1<<tl)-1, HDIST, data, pos, U.dtree); MD = (1<<(md>>>24))-1;  pos+=(md&0xffffff);
    makeCodes(U.dtree, mx1);
    codes2map(U.dtree, mx1, dmap);
  }
  //var ooff=off, opos=pos;
  while(true) {
    var code = lmap[get17(data, pos) & ML];  pos += code&15;
    var lit = code>>>4;  //U.lhst[lit]++;  
    if((lit>>>8)==0) {  buf[off++] = lit;  }
    else if(lit==256) {  break;  }
    else {
      var end = off+lit-254;
      if(lit>264) { var ebs = U.ldef[lit-257];  end = off + (ebs>>>3) + bitsE(data, pos, ebs&7);  pos += ebs&7;  }
      //dst[end-off]++;
      
      var dcode = dmap[get17(data, pos) & MD];  pos += dcode&15;
      var dlit = dcode>>>4;
      var dbs = U.ddef[dlit], dst = (dbs>>>4) + bitsF(data, pos, dbs&15);  pos += dbs&15;
      
      //var o0 = off-dst, stp = Math.min(end-off, dst);
      //if(stp>20) while(off<end) {  buf.copyWithin(off, o0, o0+stp);  off+=stp;  }  else
      //if(end-dst<=off) buf.copyWithin(off, off-dst, end-dst);  else
      //if(dst==1) buf.fill(buf[off-1], off, end);  else
      if(noBuf) buf=_check(buf, off+(1<<17));
      while(off<end) {  buf[off]=buf[off++-dst];    buf[off]=buf[off++-dst];  buf[off]=buf[off++-dst];  buf[off]=buf[off++-dst];  }   
      off=end;
      //while(off!=end) {  buf[off]=buf[off++-dst];  }
    }
  }
  //console.log(off-ooff, (pos-opos)>>>3);
}
//console.log(dst);
//console.log(tlen, dlen, off-tlen+tcnt);
return buf.length==off ? buf : buf.slice(0,off);
}
function _check(buf, len) {
var bl=buf.length;  if(len<=bl) return buf;
var nbuf = new Uint8Array(Math.max(bl<<1,len));  nbuf.set(buf,0);
//for(var i=0; i<bl; i+=4) {  nbuf[i]=buf[i];  nbuf[i+1]=buf[i+1];  nbuf[i+2]=buf[i+2];  nbuf[i+3]=buf[i+3];  }
return nbuf;
}

function _decodeTiny(lmap, LL, len, data, pos, tree) {
var bitsE = _bitsE, get17 = _get17;
var i = 0;
while(i<len) {
  var code = lmap[get17(data, pos)&LL];  pos+=code&15;
  var lit = code>>>4; 
  if(lit<=15) {  tree[i]=lit;  i++;  }
  else {
    var ll = 0, n = 0;
    if(lit==16) {
      n = (3  + bitsE(data, pos, 2));  pos += 2;  ll = tree[i-1];
    }
    else if(lit==17) {
      n = (3  + bitsE(data, pos, 3));  pos += 3;
    }
    else if(lit==18) {
      n = (11 + bitsE(data, pos, 7));  pos += 7;
    }
    var ni = i+n;
    while(i<ni) {  tree[i]=ll;  i++; }
  }
}
return pos;
}
function _copyOut(src, off, len, tree) {
var mx=0, i=0, tl=tree.length>>>1;
while(i<len) {  var v=src[i+off];  tree[(i<<1)]=0;  tree[(i<<1)+1]=v;  if(v>mx)mx=v;  i++;  }
while(i<tl ) {  tree[(i<<1)]=0;  tree[(i<<1)+1]=0;  i++;  }
return mx;
}

function makeCodes(tree, MAX_BITS) {  // code, length
var max_code = tree.length;
var code, bits, n, i, len;

var bl_count = U.bl_count;  for(var i=0; i<=MAX_BITS; i++) bl_count[i]=0;
for(i=1; i<max_code; i+=2) bl_count[tree[i]]++;

var next_code = U.next_code;	// smallest code for each length

code = 0;
bl_count[0] = 0;
for (bits = 1; bits <= MAX_BITS; bits++) {
  code = (code + bl_count[bits-1]) << 1;
  next_code[bits] = code;
}

for (n = 0; n < max_code; n+=2) {
  len = tree[n+1];
  if (len != 0) {
    tree[n] = next_code[len];
    next_code[len]++;
  }
}
}
function codes2map(tree, MAX_BITS, map) {
var max_code = tree.length;
var r15 = U.rev15;
for(var i=0; i<max_code; i+=2) if(tree[i+1]!=0)  {
  var lit = i>>1;
  var cl = tree[i+1], val = (lit<<4)|cl; // :  (0x8000 | (U.of0[lit-257]<<7) | (U.exb[lit-257]<<4) | cl);
  var rest = (MAX_BITS-cl), i0 = tree[i]<<rest, i1 = i0 + (1<<rest);
  //tree[i]=r15[i0]>>>(15-MAX_BITS);
  while(i0!=i1) {
    var p0 = r15[i0]>>>(15-MAX_BITS);
    map[p0]=val;  i0++;
  }
}
}
function revCodes(tree, MAX_BITS) {
var r15 = U.rev15, imb = 15-MAX_BITS;
for(var i=0; i<tree.length; i+=2) {  var i0 = (tree[i]<<(MAX_BITS-tree[i+1]));  tree[i] = r15[i0]>>>imb;  }
}

function _bitsE(dt, pos, length) {  return ((dt[pos>>>3] | (dt[(pos>>>3)+1]<<8)                        )>>>(pos&7))&((1<<length)-1);  }
function _bitsF(dt, pos, length) {  return ((dt[pos>>>3] | (dt[(pos>>>3)+1]<<8) | (dt[(pos>>>3)+2]<<16))>>>(pos&7))&((1<<length)-1);  }
/*
function _get9(dt, pos) {
return ((dt[pos>>>3] | (dt[(pos>>>3)+1]<<8))>>>(pos&7))&511;
} */
function _get17(dt, pos) {	// return at least 17 meaningful bytes
return (dt[pos>>>3] | (dt[(pos>>>3)+1]<<8) | (dt[(pos>>>3)+2]<<16) )>>>(pos&7);
}
const U = function(){
var u16=Uint16Array, u32=Uint32Array;
return {
  next_code : new u16(16),
  bl_count  : new u16(16),
  ordr : [ 16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15 ],
  of0  : [3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,999,999,999],
  exb  : [0,0,0,0,0,0,0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4,  4,  5,  5,  5,  5,  0,  0,  0,  0],
  ldef : new u16(32),
  df0  : [1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577, 65535, 65535],
  dxb  : [0,0,0,0,1,1,2, 2, 3, 3, 4, 4, 5, 5,  6,  6,  7,  7,  8,  8,   9,   9,  10,  10,  11,  11,  12,   12,   13,   13,     0,     0],
  ddef : new u32(32),
  flmap: new u16(  512),  fltree: [],
  fdmap: new u16(   32),  fdtree: [],
  lmap : new u16(32768),  ltree : [],  ttree:[],
  dmap : new u16(32768),  dtree : [],
  imap : new u16(  512),  itree : [],
  //rev9 : new u16(  512)
  rev15: new u16(1<<15),
  lhst : new u32(286), dhst : new u32( 30), ihst : new u32(19),
  lits : new u32(15000),
  strt : new u16(1<<16),
  prev : new u16(1<<15)
};  
} ();

(function(){	
var len = 1<<15;
for(var i=0; i<len; i++) {
  var x = i;
  x = (((x & 0xaaaaaaaa) >>> 1) | ((x & 0x55555555) << 1));
  x = (((x & 0xcccccccc) >>> 2) | ((x & 0x33333333) << 2));
  x = (((x & 0xf0f0f0f0) >>> 4) | ((x & 0x0f0f0f0f) << 4));
  x = (((x & 0xff00ff00) >>> 8) | ((x & 0x00ff00ff) << 8));
  U.rev15[i] = (((x >>> 16) | (x << 16)))>>>17;
}

function pushV(tgt, n, sv) {  while(n--!=0) tgt.push(0,sv);  }

for(var i=0; i<32; i++) {  U.ldef[i]=(U.of0[i]<<3)|U.exb[i];  U.ddef[i]=(U.df0[i]<<4)|U.dxb[i];  }

pushV(U.fltree, 144, 8);  pushV(U.fltree, 255-143, 9);  pushV(U.fltree, 279-255, 7);  pushV(U.fltree,287-279,8);
/*
var i = 0;
for(; i<=143; i++) U.fltree.push(0,8);
for(; i<=255; i++) U.fltree.push(0,9);
for(; i<=279; i++) U.fltree.push(0,7);
for(; i<=287; i++) U.fltree.push(0,8);
*/
makeCodes(U.fltree, 9);
codes2map(U.fltree, 9, U.flmap);
revCodes (U.fltree, 9);

pushV(U.fdtree,32,5);
//for(i=0;i<32; i++) U.fdtree.push(0,5);
makeCodes(U.fdtree, 5);
codes2map(U.fdtree, 5, U.fdmap);
revCodes (U.fdtree, 5);

pushV(U.itree,19,0);  pushV(U.ltree,286,0);  pushV(U.dtree,30,0);  pushV(U.ttree,320,0);
/*
for(var i=0; i< 19; i++) U.itree.push(0,0);
for(var i=0; i<286; i++) U.ltree.push(0,0);
for(var i=0; i< 30; i++) U.dtree.push(0,0);
for(var i=0; i<320; i++) U.ttree.push(0,0);
*/
})();

const crc = {
table : ( function() {
   var tab = new Uint32Array(256);
   for (var n=0; n<256; n++) {
    var c = n;
    for (var k=0; k<8; k++) {
      if (c & 1)  c = 0xedb88320 ^ (c >>> 1);
      else        c = c >>> 1;
    }
    tab[n] = c;  }    
  return tab;  })(),
update : function(c, buf, off, len) {
  for (var i=0; i<len; i++)  c = crc.table[(c ^ buf[off+i]) & 0xff] ^ (c >>> 8);
  return c;
},
crc : function(b,o,l)  {  return crc.update(0xffffffff,b,o,l) ^ 0xffffffff;  }
};

function inflateRaw(file, buf) {  return inflate(file, buf);  }

/* global module */

const config = {
numWorkers: 1,
workerURL: '',
useWorkers: false,
};

let nextId = 0;
const waitingForWorkerQueue = [];

// Because Firefox uses non-standard onerror to signal an error.
function startWorker(url) {
return new Promise((resolve, reject) => {
  const worker = new Worker(url);
  worker.onmessage = (e) => {
    if (e.data === 'start') {
      worker.onerror = undefined;
      worker.onmessage = undefined;
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

((function() {
if (isNode) {
  // We need to use `dynamicRequire` because `require` on it's own will be optimized by webpack.
  const {Worker} = dynamicRequire(module, 'worker_threads');
  return {
    async createWorker(url) {
      return new Worker(url);
    },
    addEventListener(worker, fn) {
      worker.on('message', (data) => {
        fn({target: worker, data});
      });
    },
    async terminate(worker) {
      await worker.terminate();
    },
  };
} else {
  return {
    async createWorker(url) {
      // I don't understand this security issue
      // Apparently there is some iframe setting or http header
      // that prevents cross domain workers. But, I can manually
      // download the text and do it. I reported this to Chrome
      // and they said it was fine so ¯\_(ツ)_/¯
      try {
        const worker = await startWorker(url);
        return worker;
      } catch (e) {
        console.warn('could not load worker:', url);
      }

      let text;
      try {
        const req = await fetch(url, {mode: 'cors'});
        if (!req.ok) {
          throw new Error(`could not load: ${url}`);
        }
        text = await req.text();
        url = URL.createObjectURL(new Blob([text], {type: 'application/javascript'}));
        const worker = await startWorker(url);
        config.workerURL = url;  // this is a hack. What's a better way to structure this code?
        return worker;
      } catch (e) {
        console.warn('could not load worker via fetch:', url);
      }

      if (text !== undefined) {
        try {
          url = `data:application/javascript;base64,${btoa(text)}`;
          const worker = await startWorker(url);
          config.workerURL = url;
          return worker;
        } catch (e) {
          console.warn('could not load worker via dataURI');
        }
      }

      console.warn('workers will not be used');
      throw new Error('can not start workers');
    },
    addEventListener(worker, fn) {
      worker.addEventListener('message', fn);
    },
    async terminate(worker) {
      worker.terminate();
    },
  };
}
})());

// @param {Uint8Array} src
// @param {number} uncompressedSize
// @param {string} [type] mime-type
// @returns {ArrayBuffer|Blob} ArrayBuffer if type is falsy or Blob otherwise.
function inflateRawLocal(src, uncompressedSize, type, resolve) {
const dst = new Uint8Array(uncompressedSize);
inflateRaw(src, dst);
resolve(type
   ? new Blob([dst], {type})
   : dst.buffer);
}

async function processWaitingForWorkerQueue() {
if (waitingForWorkerQueue.length === 0) {
  return;
}

// inflate locally
// We loop here because what happens if many requests happen at once
// the first N requests will try to async make a worker. Other requests
// will then be on the queue. But if we fail to make workers then there
// are pending requests.
while (waitingForWorkerQueue.length) {
  const {src, uncompressedSize, type, resolve} = waitingForWorkerQueue.shift();
  let data = src;
  if (isBlob(src)) {
    data = await readBlobAsUint8Array(src);
  }
  inflateRawLocal(data, uncompressedSize, type, resolve);
}
}

// It has to take non-zero time to put a large typed array in a Blob since the very
// next instruction you could change the contents of the array. So, if you're reading
// the zip file for images/video/audio then all you want is a Blob on which to get a URL.
// so that operation of putting the data in a Blob should happen in the worker.
//
// Conversely if you want the data itself then you want an ArrayBuffer immediately
// since the worker can transfer its ArrayBuffer zero copy.
//
// @param {Uint8Array|Blob} src
// @param {number} uncompressedSize
// @param {string} [type] falsy or mimeType string (eg: 'image/png')
// @returns {ArrayBuffer|Blob} ArrayBuffer if type is falsy or Blob otherwise.
function inflateRawAsync(src, uncompressedSize, type) {
return new Promise((resolve, reject) => {
  // note: there is potential an expensive copy here. In order for the data
  // to make it into the worker we need to copy the data to the worker unless
  // it's a Blob or a SharedArrayBuffer.
  //
  // Solutions:
  //
  // 1. A minor enhancement, if `uncompressedSize` is small don't call the worker.
  //
  //    might be a win period as their is overhead calling the worker
  //
  // 2. Move the entire library to the worker
  //
  //    Good, Maybe faster if you pass a URL, Blob, or SharedArrayBuffer? Not sure about that
  //    as those are also easy to transfer. Still slow if you pass an ArrayBuffer
  //    as the ArrayBuffer has to be copied to the worker.
  //
  // I guess benchmarking is really the only thing to try.
  waitingForWorkerQueue.push({src, uncompressedSize, type, resolve, reject, id: nextId++});
  processWaitingForWorkerQueue();
});
}

/*
class Zip {
constructor(reader) {
  comment,  // the comment for this entry
  commentBytes, // the raw comment for this entry
}
}
*/

function dosDateTimeToDate(date, time) {
const day = date & 0x1f; // 1-31
const month = (date >> 5 & 0xf) - 1; // 1-12, 0-11
const year = (date >> 9 & 0x7f) + 1980; // 0-128, 1980-2108

const millisecond = 0;
const second = (time & 0x1f) * 2; // 0-29, 0-58 (even numbers)
const minute = time >> 5 & 0x3f; // 0-59
const hour = time >> 11 & 0x1f; // 0-23

return new Date(year, month, day, hour, minute, second, millisecond);
}

class ZipEntry {
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
  this.isDirectory = rawEntry.uncompressedSize === 0 && rawEntry.name.endsWith('/');
  this.encrypted = !!(rawEntry.generalPurposeBitFlag & 0x1);
  this.externalFileAttributes = rawEntry.externalFileAttributes;
  this.versionMadeBy = rawEntry.versionMadeBy;
}
// returns a promise that returns a Blob for this entry
async blob(type = 'application/octet-stream') {
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
}

const EOCDR_WITHOUT_COMMENT_SIZE = 22;
const MAX_COMMENT_SIZE = 0xffff; // 2-byte size
const EOCDR_SIGNATURE = 0x06054b50;
const ZIP64_EOCDR_SIGNATURE = 0x06064b50;

async function readAs(reader, offset, length) {
return await reader.read(offset, length);
}

// The point of this function is we want to be able to pass the data
// to a worker as fast as possible so when decompressing if the data
// is already a blob and we can get a blob then get a blob.
//
// I'm not sure what a better way to refactor this is. We've got examples
// of multiple readers. Ideally, for every type of reader we could ask
// it, "give me a type that is zero copy both locally and when sent to a worker".
//
// The problem is the worker would also have to know the how to handle this
// opaque type. I suppose the correct solution is to register different
// reader handlers in the worker so BlobReader would register some
// `handleZeroCopyType<BlobReader>`. At the moment I don't feel like
// refactoring. As it is you just pass in an instance of the reader
// but instead you'd have to register the reader and some how get the
// source for the `handleZeroCopyType` handler function into the worker.
// That sounds like a huge PITA, requiring you to put the implementation
// in a separate file so the worker can load it or some other workaround
// hack.
//
// For now this hack works even if it's not generic.
async function readAsBlobOrTypedArray(reader, offset, length, type) {
if (reader.sliceAsBlob) {
  return await reader.sliceAsBlob(offset, length, type);
}
return await reader.read(offset, length);
}

const crc$1 = {
unsigned() {
  return 0;
},
};

function getUint16LE(uint8View, offset) {
return uint8View[offset    ] +
       uint8View[offset + 1] * 0x100;
}

function getUint32LE(uint8View, offset) {
return uint8View[offset    ] +
       uint8View[offset + 1] * 0x100 +
       uint8View[offset + 2] * 0x10000 +
       uint8View[offset + 3] * 0x1000000;
}

function getUint64LE(uint8View, offset) {
return getUint32LE(uint8View, offset) +
       getUint32LE(uint8View, offset + 4) * 0x100000000;
}

/* eslint-disable no-irregular-whitespace */
// const decodeCP437 = (function() {
//   const cp437 = '\u0000☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼ !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~⌂ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ';
//
//   return function(uint8view) {
//     return Array.from(uint8view).map(v => cp437[v]).join('');
//   };
// }());
/* eslint-enable no-irregular-whitespace */

const utf8Decoder = new TextDecoder();
function decodeBuffer(uint8View, isUTF8) {  /* eslint-disable-line no-unused-vars */ /* lgtm [js/superfluous-trailing-arguments] */
if (isSharedArrayBuffer(uint8View.buffer)) {
  uint8View = new Uint8Array(uint8View);
}
return utf8Decoder.decode(uint8View);
/*
AFAICT the UTF8 flat is not set so it's 100% up to the user
to self decode if their file is not utf8 filenames
return isUTF8
    ? utf8Decoder.decode(uint8View)
    : decodeCP437(uint8View);
*/
}

async function findEndOfCentralDirector(reader, totalLength) {
const size = Math.min(EOCDR_WITHOUT_COMMENT_SIZE + MAX_COMMENT_SIZE, totalLength);
const readStart = totalLength - size;
const data = await readAs(reader, readStart, size);
for (let i = size - EOCDR_WITHOUT_COMMENT_SIZE; i >= 0; --i) {
  if (getUint32LE(data, i) !== EOCDR_SIGNATURE) {
    continue;
  }

  // 0 - End of central directory signature
  const eocdr = new Uint8Array(data.buffer, data.byteOffset + i, data.byteLength - i);
  // 4 - Number of this disk
  const diskNumber = getUint16LE(eocdr, 4);
  if (diskNumber !== 0) {
    throw new Error(`multi-volume zip files are not supported. This is volume: ${diskNumber}`);
  }

  // 6 - Disk where central directory starts
  // 8 - Number of central directory records on this disk
  // 10 - Total number of central directory records
  const entryCount = getUint16LE(eocdr, 10);
  // 12 - Size of central directory (bytes)
  const centralDirectorySize = getUint32LE(eocdr, 12);
  // 16 - Offset of start of central directory, relative to start of archive
  const centralDirectoryOffset = getUint32LE(eocdr, 16);
  // 20 - Comment length
  const commentLength = getUint16LE(eocdr, 20);
  const expectedCommentLength = eocdr.length - EOCDR_WITHOUT_COMMENT_SIZE;
  if (commentLength !== expectedCommentLength) {
    throw new Error(`invalid comment length. expected: ${expectedCommentLength}, actual: ${commentLength}`);
  }

  // 22 - Comment
  // the encoding is always cp437.
  const commentBytes = new Uint8Array(eocdr.buffer, eocdr.byteOffset + 22, commentLength);
  const comment = decodeBuffer(commentBytes);

  if (entryCount === 0xffff || centralDirectoryOffset === 0xffffffff) {
    return await readZip64CentralDirectory(reader, readStart + i, comment, commentBytes);
  } else {
    return await readEntries(reader, centralDirectoryOffset, centralDirectorySize, entryCount, comment, commentBytes);
  }
}

throw new Error('could not find end of central directory. maybe not zip file');
}

const END_OF_CENTRAL_DIRECTORY_LOCATOR_SIGNATURE = 0x07064b50;

async function readZip64CentralDirectory(reader, offset, comment, commentBytes) {
// ZIP64 Zip64 end of central directory locator
const zip64EocdlOffset = offset - 20;
const eocdl = await readAs(reader, zip64EocdlOffset, 20);

// 0 - zip64 end of central dir locator signature
if (getUint32LE(eocdl, 0) !== END_OF_CENTRAL_DIRECTORY_LOCATOR_SIGNATURE) {
  throw new Error('invalid zip64 end of central directory locator signature');
}

// 4 - number of the disk with the start of the zip64 end of central directory
// 8 - relative offset of the zip64 end of central directory record
const zip64EocdrOffset = getUint64LE(eocdl, 8);
// 16 - total number of disks

// ZIP64 end of central directory record
const zip64Eocdr = await readAs(reader, zip64EocdrOffset, 56);

// 0 - zip64 end of central dir signature                           4 bytes  (0x06064b50)
if (getUint32LE(zip64Eocdr, 0) !== ZIP64_EOCDR_SIGNATURE) {
  throw new Error('invalid zip64 end of central directory record signature');
}
// 4 - size of zip64 end of central directory record                8 bytes
// 12 - version made by                                             2 bytes
// 14 - version needed to extract                                   2 bytes
// 16 - number of this disk                                         4 bytes
// 20 - number of the disk with the start of the central directory  4 bytes
// 24 - total number of entries in the central directory on this disk         8 bytes
// 32 - total number of entries in the central directory            8 bytes
const entryCount = getUint64LE(zip64Eocdr, 32);
// 40 - size of the central directory                               8 bytes
const centralDirectorySize = getUint64LE(zip64Eocdr, 40);
// 48 - offset of start of central directory with respect to the starting disk number     8 bytes
const centralDirectoryOffset = getUint64LE(zip64Eocdr, 48);
// 56 - zip64 extensible data sector                                (variable size)
return readEntries(reader, centralDirectoryOffset, centralDirectorySize, entryCount, comment, commentBytes);
}

const CENTRAL_DIRECTORY_FILE_HEADER_SIGNATURE = 0x02014b50;

async function readEntries(reader, centralDirectoryOffset, centralDirectorySize, rawEntryCount, comment, commentBytes) {
let readEntryCursor = 0;
const allEntriesBuffer = await readAs(reader, centralDirectoryOffset, centralDirectorySize);
const rawEntries = [];

for (let e = 0; e < rawEntryCount; ++e) {
  const buffer = allEntriesBuffer.subarray(readEntryCursor, readEntryCursor + 46);
  // 0 - Central directory file header signature
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
    relativeOffsetOfLocalHeader: getUint32LE(buffer, 42),
  };

  if (rawEntry.generalPurposeBitFlag & 0x40) {
    throw new Error('strong encryption is not supported');
  }

  readEntryCursor += 46;

  const data = allEntriesBuffer.subarray(readEntryCursor, readEntryCursor + rawEntry.fileNameLength + rawEntry.extraFieldLength + rawEntry.fileCommentLength);
  rawEntry.nameBytes = data.slice(0, rawEntry.fileNameLength);
  rawEntry.name = decodeBuffer(rawEntry.nameBytes);

  // 46+n - Extra field
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
      throw new Error('extra field length exceeds extra field buffer size');
    }
    rawEntry.extraFields.push({
      id: headerId,
      data: extraFieldBuffer.slice(dataStart, dataEnd),
    });
    i = dataEnd;
  }

  // 46+n+m - File comment
  rawEntry.commentBytes = data.slice(fileCommentStart, fileCommentStart + rawEntry.fileCommentLength);
  rawEntry.comment = decodeBuffer(rawEntry.commentBytes);

  readEntryCursor += data.length;

  if (rawEntry.uncompressedSize            === 0xffffffff ||
      rawEntry.compressedSize              === 0xffffffff ||
      rawEntry.relativeOffsetOfLocalHeader === 0xffffffff) {
    // ZIP64 format
    // find the Zip64 Extended Information Extra Field
    const zip64ExtraField = rawEntry.extraFields.find(e => e.id === 0x0001);
    if (!zip64ExtraField) {
      throw new Error('expected zip64 extended information extra field');
    }
    const zip64EiefBuffer = zip64ExtraField.data;
    let index = 0;
    // 0 - Original Size          8 bytes
    if (rawEntry.uncompressedSize === 0xffffffff) {
      if (index + 8 > zip64EiefBuffer.length) {
        throw new Error('zip64 extended information extra field does not include uncompressed size');
      }
      rawEntry.uncompressedSize = getUint64LE(zip64EiefBuffer, index);
      index += 8;
    }
    // 8 - Compressed Size        8 bytes
    if (rawEntry.compressedSize === 0xffffffff) {
      if (index + 8 > zip64EiefBuffer.length) {
        throw new Error('zip64 extended information extra field does not include compressed size');
      }
      rawEntry.compressedSize = getUint64LE(zip64EiefBuffer, index);
      index += 8;
    }
    // 16 - Relative Header Offset 8 bytes
    if (rawEntry.relativeOffsetOfLocalHeader === 0xffffffff) {
      if (index + 8 > zip64EiefBuffer.length) {
        throw new Error('zip64 extended information extra field does not include relative header offset');
      }
      rawEntry.relativeOffsetOfLocalHeader = getUint64LE(zip64EiefBuffer, index);
      index += 8;
    }
    // 24 - Disk Start Number      4 bytes
  }

  // check for Info-ZIP Unicode Path Extra Field (0x7075)
  // see https://github.com/thejoshwolfe/yauzl/issues/33
  const nameField = rawEntry.extraFields.find(e =>
      e.id === 0x7075 &&
      e.data.length >= 6 && // too short to be meaningful
      e.data[0] === 1 &&    // Version       1 byte      version of this extra field, currently 1
      getUint32LE(e.data, 1), crc$1.unsigned(rawEntry.nameBytes)); // NameCRC32     4 bytes     File Name Field CRC32 Checksum
                                                                 // > If the CRC check fails, this UTF-8 Path Extra Field should be
                                                                 // > ignored and the File Name field in the header should be used instead.
  if (nameField) {
      // UnicodeName Variable UTF-8 version of the entry File Name
      rawEntry.fileName = decodeBuffer(nameField.data.slice(5));
  }

  // validate file size
  if (rawEntry.compressionMethod === 0) {
    let expectedCompressedSize = rawEntry.uncompressedSize;
    if ((rawEntry.generalPurposeBitFlag & 0x1) !== 0) {
      // traditional encryption prefixes the file data with a header
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
  commentBytes,
};
return {
  zip,
  entries: rawEntries.map(e => new ZipEntry(reader, e)),
};
}

async function readEntryDataHeader(reader, rawEntry) {
if (rawEntry.generalPurposeBitFlag & 0x1) {
  throw new Error('encrypted entries not supported');
}
const buffer = await readAs(reader, rawEntry.relativeOffsetOfLocalHeader, 30);
// note: maybe this should be passed in or cached on entry
// as it's async so there will be at least one tick (not sure about that)
const totalLength = await reader.getLength();

// 0 - Local file header signature = 0x04034b50
const signature = getUint32LE(buffer, 0);
if (signature !== 0x04034b50) {
  throw new Error(`invalid local file header signature: 0x${signature.toString(16)}`);
}

// all this should be redundant
// 4 - Version needed to extract (minimum)
// 6 - General purpose bit flag
// 8 - Compression method
// 10 - File last modification time
// 12 - File last modification date
// 14 - CRC-32
// 18 - Compressed size
// 22 - Uncompressed size
// 26 - File name length (n)
const fileNameLength = getUint16LE(buffer, 26);
// 28 - Extra field length (m)
const extraFieldLength = getUint16LE(buffer, 28);
// 30 - File name
// 30+n - Extra field
const localFileHeaderEnd = rawEntry.relativeOffsetOfLocalHeader + buffer.length + fileNameLength + extraFieldLength;
let decompress;
if (rawEntry.compressionMethod === 0) {
  // 0 - The file is stored (no compression)
  decompress = false;
} else if (rawEntry.compressionMethod === 8) {
  // 8 - The file is Deflated
  decompress = true;
} else {
  throw new Error(`unsupported compression method: ${rawEntry.compressionMethod}`);
}
const fileDataStart = localFileHeaderEnd;
const fileDataEnd = fileDataStart + rawEntry.compressedSize;
if (rawEntry.compressedSize !== 0) {
  // bounds check now, because the read streams will probably not complain loud enough.
  // since we're dealing with an unsigned offset plus an unsigned size,
  // we only have 1 thing to check for.
  if (fileDataEnd > totalLength) {
    throw new Error(`file data overflows file bounds: ${fileDataStart} +  ${rawEntry.compressedSize}  > ${totalLength}`);
  }
}
return {
  decompress,
  fileDataStart,
};
}

async function readEntryDataAsArrayBuffer(reader, rawEntry) {
const {decompress, fileDataStart} = await readEntryDataHeader(reader, rawEntry);
if (!decompress) {
  const dataView = await readAs(reader, fileDataStart, rawEntry.compressedSize);
  // make copy?
  //
  // 1. The source is a Blob/file. In this case we'll get back TypedArray we can just hand to the user
  // 2. The source is a TypedArray. In this case we'll get back TypedArray that is a view into a larger buffer
  //    but because ultimately this is used to return an ArrayBuffer to `someEntry.arrayBuffer()`
  //    we need to return copy since we need the `ArrayBuffer`, not the TypedArray to exactly match the data.
  //    Note: We could add another API function `bytes()` or something that returned a `Uint8Array`
  //    instead of an `ArrayBuffer`. This would let us skip a copy here. But this case only happens for uncompressed
  //    data. That seems like a rare enough case that adding a new API is not worth it? Or is it? A zip of jpegs or mp3s
  //    might not be compressed. For now that's a TBD.
  return isTypedArraySameAsArrayBuffer(dataView) ? dataView.buffer : dataView.slice().buffer;
}
// see comment in readEntryDateAsBlob
const typedArrayOrBlob = await readAsBlobOrTypedArray(reader, fileDataStart, rawEntry.compressedSize);
const result = await inflateRawAsync(typedArrayOrBlob, rawEntry.uncompressedSize);
return result;
}

async function readEntryDataAsBlob(reader, rawEntry, type) {
const {decompress, fileDataStart} = await readEntryDataHeader(reader, rawEntry);
if (!decompress) {
  const typedArrayOrBlob = await readAsBlobOrTypedArray(reader, fileDataStart, rawEntry.compressedSize, type);
  if (isBlob(typedArrayOrBlob)) {
    return typedArrayOrBlob;
  }
  return new Blob([isSharedArrayBuffer(typedArrayOrBlob.buffer) ? new Uint8Array(typedArrayOrBlob) : typedArrayOrBlob], {type});
}
// Here's the issue with this mess (should refactor?)
// if the source is a blob then we really want to pass a blob to inflateRawAsync to avoid a large
// copy if we're going to a worker.
const typedArrayOrBlob = await readAsBlobOrTypedArray(reader, fileDataStart, rawEntry.compressedSize);
const result = await inflateRawAsync(typedArrayOrBlob, rawEntry.uncompressedSize, type);
return result;
}

async function unzipRaw(source) {
let reader;
if (typeof Blob !== 'undefined' && source instanceof Blob) {
  reader = new BlobReader(source);
} else if (source instanceof ArrayBuffer || (source && source.buffer && source.buffer instanceof ArrayBuffer)) {
  reader = new ArrayBufferReader(source);
} else if (isSharedArrayBuffer(source) || isSharedArrayBuffer(source.buffer)) {
  reader = new ArrayBufferReader(source);
} else if (typeof source === 'string') {
  const req = await fetch(source);
  if (!req.ok) {
    throw new Error(`failed http request ${source}, status: ${req.status}: ${req.statusText}`);
  }
  const blob = await req.blob();
  reader = new BlobReader(blob);
} else if (typeof source.getLength === 'function' && typeof source.read === 'function') {
  reader = source;
} else {
  throw new Error('unsupported source type');
}

const totalLength = await reader.getLength();

if (totalLength > Number.MAX_SAFE_INTEGER) {
  throw new Error(`file too large. size: ${totalLength}. Only file sizes up 4503599627370496 bytes are supported`);
}

return await findEndOfCentralDirector(reader, totalLength);
}

// If the names are not utf8 you should use unzipitRaw
async function unzip(source) {
const {zip, entries} = await unzipRaw(source);
return {
  zip,
  entries: Object.fromEntries(entries.map(v => [v.name, v])),
};
}

// src/index.ts
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

var ExpandDown = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M22,4V2H2V4H11V18.17L5.5,12.67L4.08,14.08L12,22L19.92,14.08L18.5,12.67L13,18.17V4H22Z\" /></svg>";

var ExpandUp = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M2,20V22H22V20H13V5.83L18.5,11.33L19.92,9.92L12,2L4.08,9.92L5.5,11.33L11,5.83V20H2Z\" /></svg>";

var FolderReturn = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M22 8V13.81C21.39 13.46 20.72 13.22 20 13.09V8H4V18H13.09C13.04 18.33 13 18.66 13 19C13 19.34 13.04 19.67 13.09 20H4C2.9 20 2 19.11 2 18V6C2 4.89 2.89 4 4 4H10L12 6H20C21.1 6 22 6.89 22 8M18 16L15 19L18 22V20H22V18H18V16Z\" /></svg>";

var Download = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z\" /></svg>";

var Close = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z\" /></svg>";

var Copy = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z\" /></svg>";

// @ts-ignore
const highlightModule = BdApi.Webpack.getModule((exports) => exports?.default?.highlight && exports?.default?.hasLanguage).default;
const React$1 = BdApi.React;
function FilePreview({ name, type: startType, blob, buff, onClose }) {
  const [type, setType] = React$1.useState(startType);
  const url = URL.createObjectURL(blob);
  function close() {
      URL.revokeObjectURL(url);
      onClose();
  }
  function downloadFile() {
      // create a link and click it
      let a = document.createElement("a");
      document.body.appendChild(a);
      a.href = url;
      a.download = name;
      a.click();
      document.body.removeChild(a);
  }
  function copyFile() {
      if (type == "text") {
          // @ts-ignore not documented
          DiscordNative.clipboard.copy(new TextDecoder().decode(buff));
      }
      else {
          // @ts-ignore
          DiscordNative.clipboard.copyImage(new Uint8Array(buff), name);
      }
      BdApi.UI.showToast("Copied!", {
          type: "success"
      });
  }
  const ext = name.split(".").at(-1);
  const hasCode = highlightModule.hasLanguage(ext);
  return (React$1.createElement("div", { className: "zp-preview-bg", onClick: close },
      React$1.createElement("div", { className: "zp-preview", onClick: (e) => e.stopPropagation() },
          React$1.createElement("div", { className: "zp-preview-header" },
              React$1.createElement("div", { className: "zp-preview-title" }, name),
              React$1.createElement("div", { className: "zp-preview-close", onClick: close, dangerouslySetInnerHTML: { __html: Close } })),
          React$1.createElement("div", { className: "zp-preview-content-wrap" },
              type == "text" || type == "image" ? React$1.createElement("div", { className: "zp-preview-copy", onClick: copyFile, dangerouslySetInnerHTML: { __html: Copy } }) : null,
              React$1.createElement("div", { className: "zp-preview-content" },
                  type == "image" ? React$1.createElement("img", { src: url }) : null,
                  type == "video" ? React$1.createElement("video", { autoPlay: true, controls: true, src: url }) : null,
                  type == "audio" ? React$1.createElement("audio", { autoPlay: true, controls: true, src: url }) : null,
                  type == "text" ? hasCode ?
                      React$1.createElement("pre", { dangerouslySetInnerHTML: {
                              __html: highlightModule.highlight(ext, new TextDecoder().decode(buff), true).value
                          } })
                      : React$1.createElement("pre", null, new TextDecoder().decode(buff))
                      : null,
                  type == "binary" ? React$1.createElement("div", null,
                      "Can't preview this file :(",
                      React$1.createElement("button", { className: "zp-preview-override", onClick: () => setType('text') }, "Do it anyways")) : null)),
          React$1.createElement("div", { className: "zp-preview-footer" },
              type == "text" || type == "image" ? React$1.createElement("button", { className: "icon", onClick: copyFile, dangerouslySetInnerHTML: { __html: Copy } }) : null,
              React$1.createElement("button", { className: "icon", onClick: downloadFile, dangerouslySetInnerHTML: { __html: Download } }),
              React$1.createElement("button", { onClick: close, className: "bd-button bd-button-filled bd-button-color-brand bd-button-medium" }, "Close")))));
}

const React = BdApi.React;
function ZipPreview({ url }) {
  const [expanded, setExpanded] = React.useState(false);
  const [folderContents, setFolderContents] = React.useState(null);
  let zipInfo = null;
  function toggleExpanded() {
      setExpanded(!expanded);
      if (!(!expanded && zipInfo == null))
          return;
      // need to do this because CORS
      BdApi.Net.fetch(url)
          .then(res => res.blob())
          .then(blob => unzip(blob))
          .then(info => {
          let contents = { folders: {}, files: {}, path: "/" };
          // parse the folder structure
          for (let filename in info.entries) {
              let file = info.entries[filename];
              if (file.isDirectory)
                  continue;
              // it's theoretically possible to have slashes in the filename, but I don't care
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
      // probably not comprehensive, but it's good enough
      const images = ["png", "jpg", "jpeg", "webp", "avif"];
      const videos = ["mp4", "webm", "mov", "avi", "mkv"];
      const audio = ["mp3", "wav", "ogg", "opus"];
      let type = "text";
      if (ext) {
          if (images.includes(ext))
              type = "image";
          else if (videos.includes(ext))
              type = "video";
          else if (audio.includes(ext))
              type = "audio";
      }
      if (type == "text") {
          // @ts-ignore Buffer and ArrayBuffer are close enough and a type conversion would be slow
          if (isBinaryFile(buff))
              type = "binary";
      }
      let el = document.createElement("div");
      document.body.appendChild(el);
      // @ts-ignore type missing for some reason
      BdApi.ReactDOM.createRoot(el).render(React.createElement(FilePreview, { name: name, type: type, blob: blob, buff: buff, onClose: () => document.body.removeChild(el) }));
  }
  function formatSize(size) {
      if (size < 1024)
          return size + " B";
      if (size < 1024 * 1024)
          return (size / 1024).toFixed(2) + " KB";
      if (size < 1024 * 1024 * 1024)
          return (size / 1024 / 1024).toFixed(2) + " MB";
      return (size / 1024 / 1024 / 1024).toFixed(2) + " GB";
  }
  return (React.createElement("div", null,
      React.createElement("div", { className: "zp-zip-preview " + (expanded ? "expanded" : "") }, folderContents ? [
          React.createElement("div", { className: "zp-path" },
              React.createElement("div", { dangerouslySetInnerHTML: { __html: FolderReturn }, className: "zp-folderReturn", onClick: () => {
                      if (folderContents.parent) {
                          setFolderContents(folderContents.parent);
                      }
                  } }),
              React.createElement("div", null, folderContents.path)),
          Object.keys(folderContents.folders).map(name => {
              return (React.createElement("div", { key: name, className: "zp-entry", onClick: () => {
                      setFolderContents(folderContents.folders[name]);
                  } },
                  name,
                  "/"));
          }),
          Object.entries(folderContents.files).map(parts => {
              return (React.createElement("div", { key: parts[0], onClick: () => openFile(parts[0], parts[1]) },
                  React.createElement("span", { className: "zp-entry" }, parts[0]),
                  React.createElement("span", { className: "zp-filesize" },
                      "(",
                      formatSize(parts[1].size),
                      ")")));
          })
      ] : "Loading..."),
      React.createElement("div", { className: "zp-dropdown-expander", dangerouslySetInnerHTML: { __html: expanded ? ExpandUp : ExpandDown }, onClick: toggleExpanded })));
}
var ZipPreview$1 = React.memo(ZipPreview);

const fileModule = BdApi.Webpack.getModule((exports) => Object.values(exports).some(val => {
  if (typeof val !== "function")
      return false;
  return val.toString().includes('obscureVideoSpacing]:"VIDEO');
}));
let previews = new Map();
let unChainPatch;
onStart(() => {
  BdApi.DOM.addStyle("ZipPreview", css);
  let key = Object.entries(fileModule).find(([_, val]) => {
      if (typeof val !== "function")
          return false;
      return val.toString().includes("getObscureReason");
  })[0];
  let preview;
  unChainPatch = chainPatch(fileModule, (_, __, returnVal) => {
      // wrap the div in the preview
      const content = BdApi.React.createElement("div", {
          className: "zp-content"
      }, returnVal.props.children[0].props.children);
      const wrapDiv = BdApi.React.createElement("div", {
          className: "zp-wrap"
      }, [content, preview]);
      returnVal.props.children[0].props.style = { padding: 0 };
      returnVal.props.children[0].props.children = wrapDiv;
  }, { path: [key], validate(_, args, returnVal) {
          if (args[0].item.contentType !== "application/zip")
              return false;
          // this is a bit of a hack, but also grab the preview inside of the validator
          let props = returnVal.props.children.props.children[0].props;
          let url = args[0].item.downloadUrl;
          props.className += " zp-zip";
          // if the preview doesn't exist, create it
          if (!previews.has(url)) {
              const newPreview = BdApi.React.createElement(ZipPreview$1, {
                  url
              });
              previews.set(url, newPreview);
          }
          preview = previews.get(url);
          return true;
      }, }, { path: ["props", "children", "props", "children", 0, "type"] }, { path: ["type"] }, { path: ["type"] });
});
onStop(() => {
  BdApi.DOM.removeStyle("ZipPreview");
  BdApi.Patcher.unpatchAll("ZipPreview");
  if (unChainPatch)
      unChainPatch();
});
  }
}