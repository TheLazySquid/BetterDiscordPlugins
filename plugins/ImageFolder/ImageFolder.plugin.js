/**
 * @name ImageFolder
 * @version 0.4.4
 * @description A BetterDiscord plugin that allows you to save and send images from a folder for easy access
 * @author TheLazySquid
 * @authorId 619261917352951815
 * @website https://github.com/TheLazySquid/DiscordImageFolder
 * @source https://github.com/TheLazySquid/DiscordImageFolder/blob/main/build/ImageFolder.plugin.js
 */
module.exports = class {
    constructor() {
'use strict';

var imagePlusOutline = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M13 19C13 19.7 13.13 20.37 13.35 21H5C3.9 21 3 20.11 3 19V5C3 3.9 3.9 3 5 3H19C20.11 3 21 3.9 21 5V13.35C20.37 13.13 19.7 13 19 13V5H5V19H13M13.96 12.29L11.21 15.83L9.25 13.47L6.5 17H13.35C13.75 15.88 14.47 14.91 15.4 14.21L13.96 12.29M20 18V15H18V18H15V20H18V23H20V20H23V18H20Z\" /></svg>";

var styles = ".imgFolderBtn {\r\n    aspect-ratio: 1 / 1;\r\n    padding: 7px;\r\n    cursor: pointer;\r\n}\r\n\r\n.imgFolderBtn path {\r\n    fill: var(--interactive-normal);\r\n}\r\n\r\n.imgFolderBtn:hover path {\r\n    fill: var(--interactive-hover);\r\n}\r\n\r\n.imageTab {\r\n    width: 100%;\r\n    height: 100%;\r\n    display: flex;\r\n    flex-direction: column;\r\n}\r\n\r\n.imageTab .icon {\r\n    cursor: pointer;\r\n    width: 35px;\r\n    height: 35px;\r\n}\r\n\r\n.imageTab .icon path {\r\n    fill: hsl(190, 80%, 42%);\r\n}\r\n\r\n.imageTab {\r\n    color: var(--text-normal);\r\n}\r\n\r\n.pathContainer {\r\n    display: flex;\r\n    align-items: center;\r\n    width: 100%;\r\n}\r\n\r\n.pathContainer > :first-child {\r\n    margin-left: 10px;\r\n}\r\n\r\n.pathContainer > :last-child {\r\n    margin-right: 15px;\r\n}\r\n\r\n.pathContainer .path {\r\n    flex-grow: 1;\r\n    padding-left: 5px;\r\n    padding-right: 5px;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n    direction: rtl;\r\n    text-align: left;\r\n}\r\n\r\n.imageTab .content {\r\n    flex-grow: 1;\r\n    overflow-y: auto;\r\n    /* hardcoding this because I'm lazy */\r\n    height: 366px;\r\n}\r\n\r\n.imageTab .images {\r\n    display: grid;\r\n    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));\r\n    padding: 7px;\r\n    gap: 7px;\r\n}\r\n\r\n.imageTab img {\r\n    width: 100%;\r\n    height: 100%;\r\n    object-fit: cover;\r\n    cursor: pointer;\r\n}\r\n\r\n.imageTab .folderReturn {\r\n    float: right;\r\n}\r\n\r\n.imageTab .folder {\r\n    display: flex;\r\n    border-radius: 12px;\r\n    background-color: var(--primary-500);\r\n    padding: 6px;\r\n    margin: 7px;\r\n    cursor: pointer;\r\n    transition: background-color 0.2s ease-in-out;\r\n    align-items: center;\r\n    gap: 5px;\r\n}\r\n\r\n.imageTab .folder:hover {\r\n    background-color: var(--primary-430);\r\n}\r\n\r\n.folder .folderName {\r\n    flex-grow: 1;\r\n}\r\n\r\n.if-nameWrap {\r\n    width: 100%;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n}\r\n\r\n.if-nameInput {\r\n    width: 90%;\r\n    border-radius: 12px;\r\n    padding: 8px;\r\n}\r\n\r\n.imageTab .image {\r\n    position: relative;\r\n}\r\n\r\n.imageTab .image .icon {\r\n    position: absolute;\r\n    top: 5px;\r\n    right: 5px;\r\n    cursor: pointer;\r\n    opacity: 0;\r\n    transition: opacity 0.2s ease-in-out;\r\n}\r\n\r\n.imageTab .image:hover .icon {\r\n    opacity: 1;\r\n}\r\n\r\n.if-caption-creator {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    gap: 5px;\r\n}\r\n\r\n.if-caption-creator canvas {\r\n    width: 100%;\r\n}\r\n\r\n.if-caption-settings {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 5px;\r\n    color: var(--text-normal);\r\n}\r\n\r\n.if-caption-settings .if-caption {\r\n    flex-grow: 1;\r\n}";

var FolderPlusOutline = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M13 19C13 19.34 13.04 19.67 13.09 20H4C2.9 20 2 19.11 2 18V6C2 4.89 2.89 4 4 4H10L12 6H20C21.1 6 22 6.89 22 8V13.81C21.39 13.46 20.72 13.22 20 13.09V8H4V18H13.09C13.04 18.33 13 18.66 13 19M20 18V15H18V18H15V20H18V23H20V20H23V18H20Z\" /></svg>";

var TrashCanOutline = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z\" /></svg>";

var FolderOpenOutline = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M6.1,10L4,18V8H21A2,2 0 0,0 19,6H12L10,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H19C19.9,20 20.7,19.4 20.9,18.5L23.2,10H6.1M19,18H6L7.6,12H20.6L19,18Z\" /></svg>";

var FolderArrowLeftOuline = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M22 8V13.81C21.39 13.46 20.72 13.22 20 13.09V8H4V18H13.09C13.04 18.33 13 18.66 13 19C13 19.34 13.04 19.67 13.09 20H4C2.9 20 2 19.11 2 18V6C2 4.89 2.89 4 4 4H10L12 6H20C21.1 6 22 6.89 22 8M18 16L15 19L18 22V20H22V18H18V16Z\" /></svg>";

var Pencil = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z\" /></svg>";

const expressionModule = BdApi.Webpack.getModule((m) => m.type?.toString?.().includes("onSelectGIF"));
const buttonsModule = BdApi.Webpack.getModule((m) => m.type?.toString?.().includes(".isSubmitButtonEnabled", ".getActiveCommand"));
const pickerModule = BdApi.Webpack.getModule((module) => Object.values(module).some(v => {
    if (typeof v !== "function")
        return false;
    return v.toString().includes("lastActiveView");
}));
const toggleExpressionPicker = Object.values(pickerModule).find(v => v.toString().includes("activeView==="));
const closeExpressionPicker = Object.values(pickerModule).find(v => v.toString().includes("activeView:null"));
const pickerStore = Object.values(pickerModule).find(v => v.getState);
const imgAdder = Object.values(BdApi.Webpack.getModule(module => Object.values(module)?.[0]?.addFile))[0];
const chatKeyHandlers = BdApi.Webpack.getModule((exports) => Object.values(exports)?.[0]?.
    toString?.().includes("selectNextCommandOption"));
const mimeTypes = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'webp': 'image/webp',
    'avif': 'image/avif',
    'gif': 'image/gif',
};

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
 * Sets the settings panel to an HTML or React element
 * @param el - The element to be rendered in the settings panel
 */
const setSettingsPanel = (el) => {
    if (typeof el === "function")
        this.getSettingsPanel = el;
    this.getSettingsPanel = () => el;
};

let lastUsed = {};
onStart(() => {
    if (Object.keys(lastUsed).length === 0) {
        // Load lastUsed from file
        let found = BdApi.Data.load("ImageFolder", "lastUsed");
        if (found)
            lastUsed = JSON.parse(found);
    }
});
function setLastUsed(imgPath) {
    lastUsed[imgPath] = Date.now();
    BdApi.Data.save("ImageFolder", "lastUsed", JSON.stringify(lastUsed));
}
function getLastUsed(imgPath) {
    return lastUsed[imgPath] ?? 0; // just say they sent it fifty years ago lol
}

const fs$4 = require('fs');
const { join: join$4, basename } = require('path');
const imgFolderPath = join$4(__dirname, 'imageFolder');
async function chunkedBase64Encode(str) {
    return new Promise(async (resolve) => {
        let output = '';
        let i = 0;
        const chunkSize = 65535; // chosen randomly
        while (i < str.length) {
            output += btoa(str.slice(i, i += chunkSize));
            // allow event loop to run
            await new Promise(r => setTimeout(r, 0));
        }
        resolve(output);
    });
}
async function pathToSrc(path) {
    return new Promise((resolve, reject) => {
        fs$4.readFile(join$4(imgFolderPath, path), 'latin1', async (err, contents) => {
            if (err) {
                reject(err);
                return;
            }
            let ext = path.split('.').at(-1);
            const mime = mimeTypes[ext];
            resolve(`data:${mime};base64,${await chunkedBase64Encode(contents)}`);
        });
    });
}
async function loadFolder(path) {
    path = path.replace(/\\/g, '/');
    if (!fs$4.existsSync(join$4(imgFolderPath))) {
        fs$4.mkdirSync(join$4(imgFolderPath));
    }
    return new Promise((resolve, reject) => {
        const folderPath = join$4(imgFolderPath, path);
        if (!fs$4.existsSync(folderPath)) {
            return reject("Folder does not exist");
        }
        fs$4.readdir(folderPath, {}, (err, files) => {
            if (err) {
                reject(err);
                return;
            }
            let images = [];
            let folders = [];
            let pending = files.length;
            if (!pending) {
                resolve({
                    path: path,
                    folders: folders,
                    images: images
                });
            }
            // read all the files
            for (const file of files) {
                const filePath = join$4(folderPath, file);
                fs$4.stat(filePath, {}, async (err, stat) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    if (stat.isDirectory()) {
                        folders.push(file);
                    }
                    else {
                        const ext = file.split('.').at(-1);
                        if (mimeTypes[ext])
                            images.push({
                                name: file,
                                lastModified: stat.mtimeMs,
                                lastSent: getLastUsed(join$4(path, file))
                            });
                    }
                    if (!--pending) {
                        resolve({
                            path: path,
                            folders: folders,
                            images: images
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
    // @ts-expect-error
    if (!result || result.canceled)
        return;
    // @ts-expect-error
    for (let file of result.filePaths) {
        let fileName = basename(file);
        let newPath = join$4(imgFolderPath, folderPath, fileName);
        // read the file, and write it to the new path
        fs$4.readFile(file, {}, (err, contents) => {
            if (err) {
                BdApi.UI.showToast(`Error reading file ${fileName}`, { type: "error" });
                return;
            }
            fs$4.writeFile(newPath, contents, {}, (err) => {
                if (err) {
                    BdApi.UI.showToast(`Error writing file ${fileName}`, { type: "error" });
                    return;
                }
                BdApi.UI.showToast(`Image uploaded ${fileName}`, { type: "success" });
            });
        });
    }
}

const fs$3 = require('fs');
const { join: join$3 } = require('path');
const Buffer$1 = require('buffer');
let submitMessage;
onStart(() => {
    BdApi.Patcher.before("ImageFolder", chatKeyHandlers, Object.keys(chatKeyHandlers)[0], (_, args) => {
        submitMessage = args[0].submit;
    });
});
function sendRawImage(name, path) {
    const contents = fs$3.readFileSync(join$3(__dirname, 'imageFolder', path, name), {
        encoding: 'binary'
    });
    // you would not believe how long it took me to figure this out
    const buff = Buffer$1.from(contents, 'binary');
    const file = new File([buff], name, { type: 'image/png' });
    sendFile(file);
}
async function sendProcessedImage(name, src) {
    if (!name || !src)
        return;
    const img = new Image();
    img.src = src;
    await img.decode();
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    let parts = name.split(".");
    parts.pop();
    let fileName = parts.join(".") + ".png";
    const blob = await new Promise(resolve => canvas.toBlob((blob) => resolve(blob)));
    const file = new File([blob], fileName, { type: 'image/png' });
    sendFile(file);
}
async function sendFile(file) {
    const channelId = location.href.split('/').pop();
    if (!channelId)
        return;
    closeExpressionPicker();
    // add the image to the message
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
    // send the message
    submitMessage();
}

function base64ToBuffer(base64) {
    const binary = window.atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; ++i) { bytes[i] = binary.charCodeAt(i); }
    return bytes.buffer;
}
var futura = base64ToBuffer("T1RUTwAKAIAAAwAgQ0ZGICyG+KgAAACsAABPs0dQT1PoqPSMAABUHAAAAnJPUy8yFFwoIQAAXlQAAABgY21hcFyiS6oAAFBgAAADumhlYWToAyBnAABWkAAAADZoaGVhCBkEJwAAVsgAAAAkaG10eI5qF6QAAFbwAAADlG1heHAA5VAAAABaiAAAAAZuYW1ldrfjNQAAWpAAAAPAcG9zdP9tAEsAAF64AAAAIAEABAQAAQEBFUZ1dHVyYS1Db25kZW5zZWRCb2xkAAECAAEAOvgPAPgbAfgcAvgdA/gUBPsqDAPWDAQcLr0N+yD7mRwEq/qLBRwA9w8cAAAQHALAERwAIR0AAE+SEgADAgABAHMAiACOQ29weXJpZ2h0IChjKSAxOTg3IEFkb2JlIFN5c3RlbXMgSW5jb3Jwb3JhdGVkLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5GdXR1cmEgaXMgYSByZWdpc3RlcmVkIHRyYWRlbWFyayBvZiBOZXVmdmlsbGUuRnV0dXJhIENvbmRlbnNlZCBCb2xkRnV0dXJhAAAAAAEAAgADAAQABQAGAAcACAAJAAoACwAMAA0ADgAPABAAEQASABMAFAAVABYAFwAYABkAGgAbABwAHQAeAB8AIAAhACIAIwAkACUAJgAnACgAKQAqACsALAAtAC4ALwAwADEAMgAzADQANQA2ADcAOAA5ADoAOwA8AD0APgA/AEAAQQBCAEMARABFAEYARwBIAEkASgBLAEwATQBOAE8AUABRAFIAUwBUAFUAVgBXAFgAWQBaAFsAXABdAF4AXwBgAGEAYgBjAGQAZQBmAGcAaABpAGoAawBsAG0AbgBvAHAAcQByAHMAdAB1AHYAdwB4AHkAegB7AHwAfQB+AH8AgACBAIIAgwCEAIUAhgCHAIgAiQCKAIsAjACNAI4AjwCQAJEAkgCTAJQAlQCrAKwArQCuAK8AsACxALIAswC0ALUAmgC2ALcAuAC5ALoAuwC8AL0AvgC/AMAAnQDBAMIAwwDEAMUAxgDHAMgAyQDKAMsAzADNAKAAzgCqAKEAnwDPANAA0QDSAKcA0wDUANUA1gCXAKYAmACoANcA2ADZANoA2wCbAJ4AlgDcAJwApQDdAKIAowCpAJkApADeAN8A4ADhAOIA4wDkAOUDAAABAAAEAAAHAABEAAB9AADkAAFmAAIQAAK1AALVAAMRAANOAAOXAAPIAAPjAAP8AAQgAAQ9AASOAASuAAUCAAWIAAXKAAYcAAaBAAakAAc6AAefAAfeAAgRAAg2AAhbAAh+AAj4AAm8AAn/AApwAArEAAsGAAs9AAttAAvPAAwJAAwjAAxZAAyTAAyzAA0AAA1KAA2eAA3jAA5SAA6iAA8IAA8vAA9uAA+nABAPABBrABClABDQABD1ABETABE5ABFhABF3ABGXABHxABJMABKZABL0ABNXABOjABQwABR1ABSxABTuABUpABVDABW6ABX9ABZKABapABcIABc9ABeYABfHABgDABg2ABiGABjFABj3ABkiABl7ABmTABnrABotABpsABrMABthABuAABvlABxiAB0sAB2zAB3XAB4MAB5SAB50AB6WAB8SAB92AB+NAB/CACASACA3ACBxACCVACCxACDkACEZACFcACG1ACKmACMiACM9ACNZACN7ACPFACPcACQKACQvACRuACSrACTGACTwACUrACVNACVlACXKACYrACZjACb1ACd8ACfHACiVACivACjdAClIACn9ACqFACrjACtGACvIACwlACyjAC0sAC2bAC3tAC5FAC68AC8NAC9nAC+cAC/WADAuADBiADDxADFaADHNADJeADLKADNjADPpADQ0ADSMADTpADVmADW9ADYSADaJADbUADdIADfBADhbADjOADljADoEADoqADqRADs0ADt2ADuuADwqADyrAD1RAD3MAD5OAD6DAD69AD8VAD9JAD9oAD9/AD/GAEACAECNAED0AEFgAEHtAEJTAELGAEMjAENAAEPUAEQWAETDAEVFAEWkAEZoAEbnAEdEAEeRAEfnAEhEAEjAAEkVAEliAEnTAEoe+1MO+1MO+1J/91K7+KR3nxKn91L7PPcnFxPo91n5hhX7Jwb8pAf3JwYTkEFbFVdgYFcfV7Zgvx6/tra/H79gtlceDj/4Y/e3d58Snvcf+xf3EL73H/sX9xAXE9z32vhjFZr3twX7Hwaa+7cFE6BBFpr3twX7Hwaa+7cFDveC7+nvAfcW39TfA/hM9+YVQAaW6QXjBu8HPwam93IFNwZx+3IFQAal93IFOAZw+3IFLAYnB98GgC0FKQYnB+AGb/uCBd8GqPeCBdUGb/uCBd4GqPeCBeEG+yf3VhV/LQVCBpbpBQ5/9wz4qPcMAZ73IrvUu/ciA/dl+YwV+wh4QUKL+w0Ii/sf9wFc9wJZCLl1uXSLTwhTZWFWHkyLYbFgtAhF+wMFvlbMctOBCDUH1AbhB/cJodTui/cJCIv3KvsGvPsKuwhhnGafi74IwK2lvh67i690qmgI3eUFYsBUpEqVCNIHQgYO+DqE9wb3YvcGJ/cG92L3BhKx9wzV9wz3LfcM1fcMFxPf+L75hhX7+f2GBfYG9/n5hgUTPPxmkhX7EWv7BSMfI6v7BfcRHvcRq/cF8x/za/cF+xEeEzz7BgSujTp1H3WJOmgeaIndoB+ijNuvHhPD+Gf7cBX7EWv7BSMfI6v7BfcRHvcRq/cF8x/za/cF+xEeE8P7BgSujTp1H3WJOmgeaIndoB+ijNuvHg73LoH3G/sRoPjp9wcSpfclMvcV3/ccFxP894f4hRV9o3mii6gIpp+dpR6jmXh1H4todW5tewjK+/MVE5R6fH6FdYsIW2i3wR+LpZqroJsIE2z3V/u9FfcyBjz3DAWRkAWnoaWjoqcIPPYFdW1vcnJwCCf3LwXIv8fNi+EI7DfAMh4pPUsmH4tUpVWmXAgTkEhYYU6LNAj7CuEi9w8evIu/obCrCA77GvhU98Z3nxKl944XE+D3EvmGFSf7xgXvBvcq98YFDvsc+X6fAbX3IAP3LfmSFUH7HWb7Oov7LAiL+zCx+yrU+yEI9xWoBUz3GGb3H4v3JAiL9yiu9yfM9xsIDvsc+X6fAfcK9yAD9yf7HBXV9x2w9zqL9ywIi/cwZfcqQvchCPsVbgXK+xiw+x+L+yQIi/soaPsnSvsbCA5P+C737HefEqL33vtXyxcT8Pcy+YYV+wsHJMoFa1MF81EFI1AFq1IF8swF+w8Hywb3DwfuSgWrxAUixgX0xQVrwwUoTAX3CwcO9133AgH3UvcCA/dS98sV+z0G+wIH9z0G+1YH9wIG91YH9z4G9wIH+z4G91AH+wIGDvtT+yT3xgFq948Dzvc2FSf7xgXvBvcr98YFDvsK95z3GQGt944DrfghFfsZB/eOBvcZBw77U3/3UgGm91ID9w73RhVWYWBXH1e1YMAewLW2vx+/YbZWHg73A/mnnwGq+I8D+Dz5uxX8Hf5hBfcGBvgd+mEFDn/3HPiO9xwBrPcl9xr3JQP3ifmSFftJbPuU+xkf+xmq+5T3SR73Sar3lPcZH/cZbPeU+0ke+xwE1YT7YFofWpL7YEEeQZL3YLwfvIT3YNUeDoug+O/3FgH3SvclA/cC+YYV+xYH0wb9BAf3JQb5hgcOi/cW+Kj0Ab33HvcM9yID91L4gBWJuwW0jtzEHruXVWQfizhRJWRDCPs++8wF+CAG9xYH+0MG9xL3gwWuzqbIi9gI9xY9yvsRHvsxYy37IB+NYgUOf/cW+xb3ZvcY9xb3RPcWEq33H5OY7/c1+zT3HRcT3vdC91oV+yAGE4qF+xLYN/cTiwj3HuDf9x4fi9xr2DegCI0HEzXUqJ/Yi9MI9wtG2fsOHvsfi2AlkfsNCPcVBpoHrJK4th63kmBpHzhqezoe+xYHE6rfjqhzizcIXodNTh5je62kHw6LoPc19wb4Sp8B94v3JQP3ePmGFftc/GAF+wQH928G+0oH9yUG90oHyAb3BgdOBvheB/sl/F4V+wYG9wT3sgWNBg5/9xb4jvcWAfev9zMD1fgTFZ2On46eiwjjy2MtH0RlSTweaYtrmXGgCHL7FwW6dLiAwIsI9zvc8/c1H4v3KEPo+y2TCJ/3DgX3TAb3Fgf7tAYOf/cT95D3GPd/nwGw9yX3E/clA/di+YYVTfsUBVL7DVn7B4v7HQj7GMP7GfcqHvcywPci9xsf5mX3I/sGHmOLcXtvcgiJjQX3JPe6BSb8FxW+lDpmH2WEK1IeWX7hrx+xlufDHg6LoPjv9xYBtPhLA9T5hhX7Fgf3Xwb7f/0EBfcvBvew+YYFDn/3Fvds9yr3OfcJEqj3LfsR9yXi9yX7EfctFxPs94f4eBVmh8SoH6aQv68etJBWcB9vi1JdHhPSjPsqFbybQ2YfZn5FWB5XgM+yH7KW0b4e4tQVE2zQpK3Li9II9wNB4/sGHvsHQTP7Ax+LRK5Kz3QIiQcT0i1sZkOLKgj7EOYt9xIe9xLl6fcQH4vqZtYtqQgT0o0HDoug9373GPeO9xUBsPcl9xP3JQP3sRbJ9xUFxPcMvfcIi/ccCPcZVPcY+yse+zJW+yH7Gx8xsfsl9wYes4ulnKekCI2JBfsk+7sF9PkRFb6MlzeLZwhlgS5SHliC3a8fsZLpxB4O+1N/91L3J/dSAab3UgP3DvdGFVZhYFcfV7VgwB7Atba/H79htlYe9+UEVmFgVx9XtWDAHsC1tr8fv2G2Vh4O+1P32fdSAaf3UgPO9zYVJ/vGBe8G9yr3xgUt9/UVVmFgVx9XtWDAHsC1tr8fv2G2Vh4Oevi7AZ/4VgP3IPeUFffe9zsF9wMH/Fb7dwUoB/hW+3UF9wMHDvL3AuD3AgGg+FUD+Gr4LBX8VQb7Agf4VQY2BPxVBvsCB/hVBg56+LsBoPhVA6DpFfsDB/hV93UF7gf8Vfd3BfsDB/fd+zsFDp1/91LF90v3bfcWEvcd91L7P/cpZvczFxPo9zr4yBWql7SwHhNkuZJJax9VeEpHHhNIg4uDjIKNCPtOB/cpBu0HE2Tjoq3xi90I9xQ+7PsZHhMo+xqLTC6Q+xMI9yEGE5Bu/GMVV7Zgvh7Atra/H79gtlYeWGBgVx8O+CF/1OriOOf3fuf3B9QSsdne9wL4LNkXE7/4jPgJFYZTXz9AlghhkWqwj8wIj8u6xMmQCMqQo1GGTwit9yUVbbZfnFaLCPsVOPsH+w0fJso69R60i7KftrMIjYkFE92DZaRzpIsIvvdlx/eCH/dM+y/3FPthHvvDLfuE+yUf+333MPs094se9xSL9srV8QgrBlJXRmM8iwj7Wfsc9wv3XR/3SPcX9xj3TR73PYv3DSWG+zkIiPsh+xo3mcsIwPfGBSkGDueLoPX3Cvh9nwGT+JUD90v5hhX7Q/2GBfcoBqb3EwX3Kwan+xMF9zMG+0n5hgVv/JEVIgar910Fm/cGBY0GnPsGBQ62i/cR+Iz3ERLA9ynk9yH7G/cnFxPo9733eRWLTGhfT44I92AHxo2vYItQCCj7eRX3HPcCyvcpH4vMbNtNqQgT8MOxpL6LzgiLynDOWbMIW7JZjVGLCPsmBv2GB/eC+LAVUmplUx73TAfEjqtmi1QIDpuD9yP4efcjAaX3MwP4QfmBFXKUcpBxiwj7X/sQ+1T7Tx/7WvcL+1b3ax6ji6KPoZQI9yEHeIV4hniLCPsWUvce9wQf9wjE9wv3Fx6ei52InoYIDumL9xr4evcaAcD3Kfct9ykD904W93/e9zD3ax/4OfvMZXEe+wUG/YYH9yn3GhX4egf3D6n7LCsfiy1q+yr7DJEIDl+L9yD3Pvcg9zj3IAHA9ykDwPmGFf2GB/fCBvcgB/stBvc+B/cZBvcgB/sZBvc4B/crBvcgBw5hi6D3uPcg9zX3IAHA9ykDwPmGFf2GB/cpBvfNB/cdBvcgB/sdBvc1B/csBvcgBw73E3/3Hvcu9yD3ZPceAaX3M/df9ykD97n4OBX7IAfqBld/JT8e+wKG90HZH4vSlfdO8IUIxIuXUJJlCPclwwVr9kDT+weLCPtpU/tv+0If+zvN+273Xx73X7L3afc0H8YHDvcLi6D3vvcg96efAcD3Kfcr9ykDwPmGFf2GB/cpBvfTB/crBvvTB/cpBvmGB/spBvu7B/srBve7Bw77SYug+V2fAcD3KQPA+YYV/YYH9ykG+YYHDjd/9xb4/J8B9y/3KQP3xPmGFfspBvySB1mQP0UebItunXmjCPspB6t6toWwiwj3T4T3VskfDtiLoPldnwHA9ykDwPmGFf2GB/cpBvgUB40G9x38FAX3MQb7MfgqBfcf9/AF+ywG+xD75QWJBvflBw5Mi/cg+OafAcD3KQPA+YYV/YYH98UG9yAH+zAG+PoHDveyi6D5XZ8Bovk4A+T5hhVJ/YYF9zQGofizBY0GfQek+zwF1Pv9BfcHBsv3+QWj904FjQav/LMF9y0GPPmGBftcBk/8UQWJBkL4UQUO9x2LoPesoPgwnwHA9yn3PvcpA8D5hhX9hgf3KQb37geKqgWE1wWNjQX3TPxbBfchBvmGB/spBvvnB4tkjmSUZwiJiQX7TvhbBQ73Jn/3HviK9x4Bpfcz92j3MwP3t/mSFfsZ+xgh+68f+6/3GCH3GR73GfcY9fevH/ev+xj1+xkeIfwZFc6S90zuHu6S+0xIH0+E+1MoHiiE91PHHw6+i6D3tPcP91v3DwHA9yn3BfcpA/deFvfLB6yJBfce5tz3IR/3h/t0d2se+y8G/YYH9yn5CxWnBsugX1Ufiz5icEOOCA73Jn/3HviK9x4Bpfcz92j3MwP3z/fHFT5ABeQuBX+CgYd9iwgohPdTxx/OkvdM7h7ukvtMSB+LUolef2AI9wn7DRW41pbxi+QI96/7GPX7GR77GfsYIfuvH/uv9xgh9xkewIu4mrOqCMVMBdnVBQ7pi6D49vcPAcD3KfcN9yUD914W9/AHjQb3F/vwBfcxBvsX9+sF1bSs0oveCPdi+z6VLB77Kgb9hgf3KfkLFZ8G1o+lX4tVCE1wXUcecYwFDo9/9yD4jPcaAa33Jtz3JgP3//ltFWKjYJhbiwj7FEYk+wsfi/sCwFPhUQi1bbl1i1EIWWVrWx5fi2mbaKMI+yIHrXK/frWLCPcg2PD3Gh+L92D7d5KL9xAIuainuR60i7B1qXEIDnWLoPjl9yAB9xj3KQOa+YYV+yAH9wkG/PoH9ykG+PoH9woG9yAHDvcAf/cb+PefAbz3Kfco9ykDvPmGFfzEB/sh3kr3Hx73a5T3HNsf+LoH+ykG/JwHilOLVEKLCDqS4cQf+HwHDvcVi6D5XZ8Bk/i5A5P5hhX3bv2GBfcOBvdl+YYF+zAGMPv8BX9fiGCDXwiJBoK2hrZ+tggx9/4FDvf5i6D5XZ8Bk/mdA5P5hhX3LP2GBfcWBuH4IgWWuZC5k7kIjQaSXZRdkF0I2PwiBfcVBvcw+YYF+zAGUPv+BYJWileGVgiJBiv4nAX7CgZA+/wFgFaHVYRWCIkGhsCJwYLACEv3/AUO9wGLoPldnwGh+IkDofmGFfc0/AEF+zT8GQX3PAa39wwFmLGUsJaxCI0GlWWUZpllCLv7DAX3QQb7QfgZBfc1+AEF+zUGXiIFfWV/ZYNkCIkGg7J8sn6wCGD0BQ7Zi6D4a5/3cp8B9033KQOP+YYV90n8HQX7/Qf3KQb3/Qf3RPgdBfs7Bkj7TgV6UwWJBoCwBT33YQUO04v3IPhu9yABnfhvA735hhX7IAf3bwb7j/z6BfhaBvcgB/uBBveW+PoFDvsI+xDt+T7tAcD3FgPA+YYV/gIH95EG7Qf7Dwb5Pgf3DQbtBw77Toug+ZKfASH4YgMh+bsV9/D9uwX3Bgb78Pm7BQ77CPsQ7fk+7QH3HfcWA5v5hhUpB/cNBv0+B/sPBikH95EG+gIHDvlynwGg+FUD9w333hX3EPe3BfcR+7cF77oF+zn4DQX7DAb7OPwNBQ7L+0/WAYv4iAP4iPtPFdYH/IgGQAcO+xr4VPfGd58SpfeOFxPg90T4VBXv98YFJwb7KvvGBQ6Ii/cL96P3BwGl9yHm9yED92/3CxVZifOrH6iO9boeu44gbx9wh/sBXh6y+wsV9yEG+I0H+yEGTQeJBnu0a6pciwj7Cnr7QzQfOqL7SvcGHriLqKiesQiNBg6Ii/cL96P3EfeknwGu9yHl9yEDrhb3IQbEB40GnWWobrmLCPcHoPdK3B/ie/dD+wseXYtrbHtiCIkG+AAH+yEG90j9RBVdiPcBph+njfa7HrmPIW4fa4gjWx4O+w2B9xj3ovcPAaX3IQP3uPcdFX6CfYV7iwhEgNzBH7+a3tAenIuWh5h/CPcQB3SVdZByiwj7Jln7H/sTH/sHu/sk9x0eqIulkaWXCA6Ii/cL96P3EfeknwGl9yHm9yED95YW9yEG+bsH+yEG/AAHiQZ7tGuqXIsI+wp6+0M0Hzqi+0r3Bh64i6ionrEIjQZkyRVZifOrH6iO9boeu44gbx9wh/sBXh4OdYH3Ovs69wD3CeL09wASpfcc8/cOFxO89573whUkBpoHq5TFth63kk9qH/cOYhWT9zM13i6LCPsnX/ss+w0f+xG++xP3Ix7yi7jUl+gI+wwGE2xtgm9nHlWLjduKsAj3cwYO+x2LoPgE9wj3QPcgAdL3IQOe+I0V+wgHvwb8GQf3IQb4GQfMBvcIB0oG5Qeqhr64HpWLkYiUhgj3HAd3kneQdosI+xJ4QCwf+yIHDoz7j/cE+wT3TMT3Ffej9wcSpfch6fchFxO893D3CxVYifOrH6iO9bseu40gbx9wiPsBXh4TSPtR+04VE7yS+wfCRvcMiwj3D83G9ygf+LkH+yEGTgeJBnuzaapciwj7DHv7SjMfi1OTSqRZCKFgrmK/iwi8i6KvnrAIjQZLB2CULEweE0hji4KziasIDn+LoPf09yL3pJ8Brvch1PchA675uxX9uwf3IQb3zwekkayrHriBRXEf+6kH9yEG99oH1JT3CCMeVItgY3hbCIkG+BAHDvt3i6D4ZJ/H90gSmvdH+zT3IRcTyK34jRX8jQf3IQb4jQcTMETHFby0tLsfu2W2Wh5YYmVYH1mzYrweDvt3+42g+V2fx/dIEpr3R/s09yEXE8it+I0V/YYH9yEG+YYHEzBExxW8tLS7H7tltloeWGJlWB9Zs2K8Hg6Pi6D4ZJ/3rp8BrvchA675uxX9uwf3IQb3fgeNBu/7fgX3Lwb7H/e/BfcG92IF+y0GPvtFBYkG+HMHDvt2i6D5kp8BrvchA675uxX9uwf3IQb5uwcO91+LoPfz9xn7F/chEq73IdT3IdT3IRcUHBPc90T4jRX7IQb8jQf3IQb3rweqB6WQq64es4RLch/7rwf3IQb30QeikK2sHrWEQXEf+6YH9yEG9/EHFBwTPMyL8DAeVYtfYnReCIkGhLlvs1eLCE+LY2FzWgiJBg5/i6D39PcYAa73IdT3IQP3RPiNFfshBvyNB/chBvfPB6SRrKseuIFFcR/7qQf3IQb32gfUlPcIIx5Ui2BjeFsIiQYOi4H3Evek9xMBpfch8fchA/du+JcV+yti+xr7FR/7FbT7GfcrHvcrtPcZ9xUf9xVi9xr7Kx77EwS8jSBuH26JIFoeWon2qB+ojfa8Hg6I+42g9273Ffej9wcBrvch5fchA/dr9wsVXYj3AaYfp432ux65jyFuH2uKI1keZPgWFfshBv2GB/chBvfGB40GnWWobrmLCPcHoPdK3B/ie/dD+wseXYtrbHtiCIkGDoj7jaD3bvcV96P3BwGl9yHm9yED+CP4jRX7IQZNB4kGe7RrqlyLCPsKevtDNB86ovtK9wYeuIuoqJ6xCI0G+8YH9yEG+0j4BBVZifOrH6iO9boeu44gbx9wh/sBXh4O+w2LoPgE9wgBrvchA674jRX8jQf3IQb3kAfWjMnpHpOLkoqSigj3HQdUhmlscV8IiQbIBw5PgfcR97P3BQG19yGf9yED9+74bBViqWCYWIsIMjtXKx+L+zT3N5yJSAhxeHt1Hm+Ldpp2nQhNJwW1aMN0wYsI88XY7x+L9yv7M3+JxgihmJqkHqiLnnyfeQgO+xSLoPgE9wgB2vchA9r5GRX7IAdaBvsIB7wG/BkH9yEG+BkHxQb3CAdRBvcgBw5+gfcY9/+fAa73IdL3IQOu+I0V+8MHL5j7DPc0HvcRwtf3CR/31gf7IAaK+8gFco5ZZR5cltmnH/epBw6bi6D4ZJ8Bmvg6A5r4jRX3JfyNBfcXBvcm+I0F+yYGWftoBYZ2BYBXBYkGipMFSPepBQ73loug+GSfAZr5LAOa+I0V9yP8jQX3Cgaz9zAFqPc1BY0GqfsmBbn7PwX3CAb3IPiNBfsaBk/7hgWBVQWJBkv3vAX7DQZJ+7wFiQZH97wFDsCLoPhknwGi+E8DtfiNFfcS+30F+yX7pAX3JQbW9x8F1fsfBfcpBvsp96QF9xX3fQX7JgZS+wAFfKoFY9gFDpv7jaD5XZ8Bmvg6A5r4jRX3J/yDBTr7lwX3Hwb3bfmGBfsiBkn7tAWJBnrfBVb3YAUOaIv3Cfej9wkBovf3A7L4jRX7CQf3JAb7NPwYBffmBvcJB/sfBvcw+BgFDvsc+xDX99fX99vXAej3FgP3w/sQFdcHSH66wB/3CweLzYDLRJcIjQfPm5m1i9QI9xgHxZi1zh7XBzQGMGtfMB/7NgdWelZRHj8HxZxeTh/7HgcjpFj3DB4O+06LoPmSnwHR9wID0Rb3Agb5uwf7AgYO+xz7ENf319f329cB2PcWA8n7EBX3DKS+8x/3HgfInLjFHtcHUXrAwB/3Ngfma7cwHjQGPwfOmGFRH/sYB4tCmWHPewiJB0R/gEuLSQj7CwdWflxIHj8HDvct92L7UvcIEqD4VRcT4Pgy9/sVeG16X2aLCGGLO81KiwhKi2NIb1IIxEEFna2du7SLCKuL6UnHiwjNi6vKqsEIDvtS+42gdvikvPdSEqf3Uvs99ycXE8j3WPuNFfikB/snBvykBxMw1fmTFVdgYFcfV7Zgvx6/tra/H79gtlceDr75IRLW9yaEzBcToPdqvhXMBskHn4+fkJ6UCPcTBxNAfYN/hnuLCE1+2bofvJrrzB4TIJmLl4SWgwj3Ewd4k3ePd40IygdKBkYHE0D7BWZx+xuLIwgTIIsorfsE9GsIDoD3BiSgiPT3Mdj3rPcPEtT3Jvca9xMXE963FhMisJeqkbOLCBOE24vWbtyLCKmLqpGlmgj3CgdqemWDZYsIEz5Wi1qfV4sIdooFp7uawo/CCPcWBtgH+xMGicl3yIvJCLaev8QeupZbZR+KewX3FAaN9xhY6Psliwj7Gjww+xcfi02eUZBOCDUGPgfoBo1NeU9fXggO+6KLoPldnwH7IPhSA/dw+YYV+/z9hgXiBvf7+YYFDoug93vN3833np8B90D3KwP4B/hoFfcT97IF+zsGSPt2BXpTBYkGgLAFPfeJBfs4BvcX+7IFQAZJB/QGnmIFYAf7EAZJB/cQBvuQB/crBveQB/cPBs0H+w8GtgedtAX0Bs0HQAYO+032+Hbq9zH2AZT4dwP4gPl/FYmMiIuJjAhyknCScYsI+weLXzR4KAh7PQX7EgYsB/cDBkr8DgWGb4ZvfnMIe2tgj3KeCHr7AgWohKeGqYsIvIvAo6O5CKzKm+WX0gi797sF9xAG6gf7AwaQqgWUwYnT04sImouZhpiECA7C+0r2+XL2Eqn3FfsC9xf7Ffcd9wf3IPsg9xki9xUXE+H3mfdnFVunVaWLygiLq5uiqJwIon4FtnLIc4tQCItnc3BofwgTjDf7VhX7HQZ4B/sJ6VP3AR7w48P3AR+Lx3PGWK0IE1HJrqzCiM8IiPcBRao2uAhZpk+jf84Ir5yltB4TUrybZmEfdAf3GQagB/cPQMz7DR4nizJWifsTCItXolmwbwgTpFVmclaLVAiO+wPgZeBYCL5svHSLSghnfWxpHhOIV3yptR8OyvcK95T3CgGW9wr3f/cKA4/3HRXXPAW1tgWxcrd+uIsIt4u0mrGiCLZgBdPaBWK3BaSwlrqLuAiLu3+zc7MItLUFQ9sFYGAFZaNemV+LCGKLXXtndQhhtgU/OwW1YQVzYoBki1oIi1iXaaJgCPdd95QVzr1NSh9KWUtIHklXy8wfzL/JzR4O+074Y/e3d58Sw/cf+xf3EBcT8PdI+GMVmve3BfsfBpr7twUOwvhU98Z3nxKl+Ev8S/eOTveOFxPo+AH4VBXv98YFJwb7KvvGBROQZBbv98YFJwb7KvvGBQ6I7fhmEqX4EPwQ92Np92MXE9D4KvihFT6yBfsW+34F9xb7fAXYtgUk91EFE6BF91cVP7IF+xf7fgX3F/t8Bde2BSX3UQUO+0Tt+GYBpfdjA6X34BX3Fvt+BdiyBST3VwXy91EFPrYFDvtE7fhmAab3YwPz+MgVPmAF8vtRBST7VwXYZAX3Fvd+BQ7ui6D4BPcIx/dIR/cgEtL3IfcC90f7NPchFxPanviNFfsIB78G/BkH9yEG+BkHzAb3CAdKBuUHqoa+uB6Vi5GIlIYI9xwHd5J3kHaLCPsSeEAsH/siB/eiFvyNB/chBviNBxMkRMcVvLS0ux+7ZbZaHlhiZVgfWbNivB4O7oug+AT3CPdA9yBtnxLS9yH3FfchFxPc9+n5uxX9uwf3IQb5uwf8Y/vCFfsIB78G/BkH9yEG+BkHzAb3CAdKBhNo5Qeqhr64HpWLkYiUhgj3HAd3kneQdosI+xJ4QCwf+yIHDsv3nPcZAYv4iAP4IQT7GQf4iAb3GQcOwvgV9xT3cZ8B90X3HQP3RfmGFfuFB/sTBvsUB/cTBvy5B/cdBvi5B/cUBvcUB/sUBveFBw73AvcU90D3FPdYnwH3RPcdA/dE+YYV+2wH+xIG+xQH9xIG+0AH+xIG+xQH9xIG+6YH9x0G96YH9xMG9xQH+xMG90AH9xMG9xQH+xMG92wHDvtT9zX3UgGm91ID9w738xVWYWBXH1e1YMAewLW2vx+/YbZWHg73OPkQ9woB9033Cs/3CgP4B/sEFfcKBvmAB7UG9woH+8MG+xFAYPsbHyfARPMe/JkH9woG+YAHzwYOe/dK+A0BoPgNA/dl+MMVIjg3JB8i3jb0HvPg4PQf8jbfIx4O+xn7JPfGAaX3jwP3Evc2FSf7xgXvBvcr98YFDsL7JPfGEqX4S/xL945O944XE+D3Evc2FSf7xgXvBvcq98YFE5CyFif7xgXvBvcq98YFDsL4VPfGd58SpfhL/Ev3jk73jhcT8PcS+YYVJ/vGBe8G9yr3xgUTiLIWJ/vGBe8G9yr3xgUOiO34ZhKm+BD8EPdjafdjFxPg8vjIFT9kBfH7VwUl+1EF12AF9xf3fAUTkLX3fhU/ZAXx+1cFJftRBddgBfcX93wFDvjIf/dSAdP3Uvcj91L3I/dSA/c7fxXAtba/H79htlYeVmFgVx9XtWDAHvfhFsC1tr8fv2G2Vh5WYWBXH1e1YMAe9+EWwLW2vx+/YbZWHlZhYFcfV7VgwB4O+bKE9wb3YvcGJ/cG92L3BhKx9wzV9wz3LfcM1fcMyfcM1fcMFxPfwPfEFvf5+YYFIAb7+f2GBRM8AIn5jRX7EWv7BSMfI6v7BfcRHvcRq/cF8x/za/cF+xEeEzwA+wYEro06dR91iTpoHmiJ3aAfoozbrx4TwwD4Z/0iFfcRq/cF8x/za/cF+xEe+xFr+wUjHyOr+wX3ER4TwwD3BgRoid2gH6KM268ero06dR91iTpoHhPAwPgM+wYV9xGr9wXzH/Nr9wX7ER77EWv7BSMfI6v7BfcRHhPAwPcGBGiJ3aAfoozbrx6ujTp1H3WJOmgeDp37mfcW9233S8b3UhKl9zNS91L7PvcpgfchFxPk9yj3oRUpBxPSM3RpJYs5CPsU2Cr3GR73GovK6Ib3EwgThPshBnkHbH9iZh4T0F2EzasfwZ7Mzx4TRJOLk4qUiQj3TgcTKED3jRVYYGBXH1e2YL4ewLa2vx+/YLZWHg77HPlynwG+91oD9y35hhUlXQX3FfseBdCzBQ77HPlynwG+91oD9yf5hhUr+yQF0GMF9xX3HgUO+xz4yfdLAZH3tQP3KfmAFfsj+wUFwkUF49EF4EUFyMkFDvsc+O73G/sb9x4Sf/fZFxPg94L5eBWJdYN5cYsIZottsVaLCECLfkKFTwjUBo6dlJmfiwibi5eEmYUIpIClgKaLCNaLmtSVxwgO+xz5LtUBdPfuA/fX+S4V1Qf77gZBBw77HPkP1gF5zAP3kfmgFYRbbXVEiwhWi2OhhrsISgaJN8lO9wCLCOmLyb6X6QgO+xz43vcpAdf3KQP3dfknFbRrrmIeYGppYR9jrWqzHrStrLMfDvsc+N73KQFv9ynG9ykD9w35JxW0a65iHmBqaWEfY61qsx60rayzH/dkFrRrrmIeYGppYR9jrWqzHrStrLMfDvsc+LnN4M0Btc3fzQP3K/i5Fca7vMUfxl2+Tx5OWlxOH068W8cezQRzeJ2jH6SenaMeop13cx91eHh1Hg77HPtu9z4Bzfc8A/ckWxU9+x4FymsF9PcaBQ77HPlynwFh+BQDwfmGFSv7JAXQYwX3FfceBd+5FSv7JAXQYwX3FfceBQ77HPth3vcMoAHA4wP3hyMVeoV2f3mLCHJ2nqQfi6arrKqbCI0HRwZnclxqi1sIR8JsyB6qi6qUl5EIDvsc+Mn3SwGR97UD9yz4yRX3I/cFBVTRBTNFBTbRBU5NBQ74yPec9xkBi/p8A/ghBPsZB/p8BvcZBw73gov3IH33CtX3IPcw9yASk/kmFxP498v3iBUgBrz3zwWNBqT7QAUTsN/8FxX3wgZo9yAF+yUGYfdGBfcnBmn3IAX7KQZk9zAF9ykGa/cgBfvHBvs//YYF9ygGE0Ci9xIF9zEGDvsc9+69yNH3N9EBp+fN4AP3LPlGFauNTHofe4hIbh5qisueH5yNyqke9wv7fRX3wwcuBmYHiQaMBoGjd55siwg+gCJXH1WcI9MeqYudnJaiCI0GaQf7Ik4VWQf3fwa9Bw5Mi/cg+OafAcD3KQPA+YYV++4HVmMF+wwHwLMF+7QH98UG9yAH+zAG95AH28UF9wIHO1MF944HDvcmf/ce+xmg+Pr3HnGfEqX3M/do9zMXE6z3TfgSFcyQ90nxHrOLom2aagj7Rfu2BYkGhfYF92h2FUuA+z8vHmiLcKV8qgj3Q/exBY0GExTy97gVE2xjTQVhtVClT4sI+2hR+2n7Qh+LL5UovDsIWT0FxWYFE5ywxQW4ZsRxx4sI8fc20/fOH4vigfNe1wjA4AUO98l/9xr7Dvcg90T3IPcy9yD7DvcaEqX3M/dn9ykXE3b4IRb3ygb3IAf7Ngb3RAf3JAb3IAf7JAb3Mgf3NQb3IAf7yQYTjmEHiQZvr1ydXIsI+2Bg+4D7Mx/7Lbb7evdXHsGLu6WotgiNBor31RVGiftPJh4ng/dQzx/QkvdN8B7xjPtNRh8O+xz37r3C1/c31wGk583nA6v4IBVZB/d/Br0H+wn4BhUpcDs9Hz+mOu0e7abc1x/ZcNspHj8Eq4xLeR98iUlsHmyJzZofnYzLqx4O92CB8yP3Ovs69wDy8TPi7PcI+wD3ABKl9xXs9x37FPcT8/cOFxOL4PgZ98IVmgerlMW2HreST2offwf3CzQVjsUFk/czNd4uiwhXi2FycloIE5WAb8RYnE+LCGOLZYNmfgj7DQermquWrosI2IuSWYpLCHeabI5ziwgyTUszHyfNTu4ewouxoq+yCBNAgKhit3bAiwjyi7jUl+gIE0BA+wwGEyhAbYJvZx5Vi43birAIE5FA+0n7DRVsdqaoH6ekoqcep6Rzbh9tc3NtHg77d4ug+GSfAa33IQOt+I0V/I0H9yEG+I0HDvt2i6D5kp8BrvchA64W9yEG+EgHy8AF7AdLVwX3pQf7IQb8CAdKWAUoB8y+BQ6LgfcT96P3EwGl9yHx9yED9zv3kxWmjvW5Hr2OIWwfcYf7AF4eWYj2qh/3Mfd3FW6jYZRniwj7Jl77IvsIH4tPl0aoVwhnTwW/aQWmtwWtcq2AtosI9yW39x/3Dx+LyYDKasYIr8UFWKsFDvdtgfc6+zr3APsA9xDw4uT3EPsA9wASpfch7/ca8/cOFxOXgPgm98IVmgerlMW2HreST2offwdd+8wV8ou41JfoCPsMBhNVgG2Cb2ceVYuN24qwCPdzBo7FBZP3MzXeLosIT4tse2hpCBMrAG+rZJ1Tiwj7GVv7HvsRH/sRu/sd9xkeuIu0naawCBOXgK1ounfFiwgTKwD7VPedFXCI+wZdHlqJ9wGoH6iN9wK8HrqN+wBvHw61i/cS95j3E/sQ9wj3TfcTEtL3Idf3KPsd9y0XE7rS+I0VVwb7CAe/BvwZB/chBvjhB6eC1LgeE1Szi0ZxH4tojmFchggTgvsTB8GJjDGLZQiLZI8uUI0I+xMHmoiZiJqLCPckn/cg9wYfi9p64D+0CBMczaWW0IvLCPVg7/seHvtfnvtNQB8O54ug9fcK+H2f93mfEpP4lfv491oXE+j3S/mGFftD/YYF9ygGpvcTBfcrBqf7EwX3Mwb7SfmGBW/8kRUiBqv3XQWb9wYFjQac+wYFExR++MEVK/skBdBjBfcV9x4FDueLoPX3Cvh9n8f3SxKT+JX8Jfe1FxPo90v5hhX7Q/2GBfcoBqb3EwX3Kwan+xMF9zMG+0n5hgVv/JEVIgar910Fm/cGBY0GnPsGBRMUgPi7Ffsj+wUFwkUF49EF4EUFyMkFDueLoPX3Cvh9n9z3KRKT+JX8R/cpxvcpFxPo90v5hhX7Q/2GBfcoBqb3EwX3Kwan+xMF9zMG+0n5hgVv/JEVIgar910Fm/cGBY0GnPsGBRMWZPhiFbRrrmIeYGppYR9jrWqzHrStrLMfExL3ZBa0a65iHmBqaWEfY61qsx60rayzHw7ni6D19wr4fZ/3eZ8Sk/iV+/j3WhcT6PdL+YYV+0P9hgX3KAam9xMF9ysGp/sTBfczBvtJ+YYFb/yRFSIGq/ddBZv3BgWNBpz7BgUTFIT4wRUlXQX3FfseBdCzBQ7ni6D19wr4fZ+3zeDNEpP4lfwTzd/NFxPk90v5hhX7Q/2GBfcoBqb3EwX3Kwan+xMF9zMG+0n5hgVv/JEVIgar910Fm/cGBY0GnPsGBRMbcPf0Fca7vMUfxl2+Tx5OWlxOH068W8cezQRzeJ2jH6SenaMeop13cx91eHh1Hg7ni6D19wr4fZ/s9xv7G/ceEpP4lfw399kXE+T3S/mGFftD/YYF9ygGpvcTBfcrBqf7EwX3Mwb7SfmGBW/8kRUiBqv3XQWb9wYFjQac+wYFExrZ+LMViXWDeXGLCGaLbbFWiwhAi35ChU8I1AaOnZSZn4sIm4uXhJmFCKSApYCmiwjWi5rUlccIDpv7bvc+s/cj+Hn3IxKl9zNg9zwXE3D4QfmBFXKUcpBxiwj7X/sQ+1T7Tx/7WvcL+1b3ax6ji6KPoZQI9yEHeIV4hniLCPsWUvce9wQf9wjE9wv3Fx6ei52InoYIE4j7Zf0oFT37HgXKawX09xoFDl+L9yD3Pvcg9zj3IPd5nxLA9yki91oXE+jA+YYV/YYH98IG9yAH+y0G9z4H9xkG9yAH+xkG9zgH9ysG9yAHExT7NPeNFSv7JAXQYwX3FfceBQ5fi/cg9z73IPc49yDH90sSv/e1+7T3KRcT5MD5hhX9hgf3wgb3IAf7LQb3Pgf3GQb3IAf7GQb3OAf3Kwb3IAcTGPsy94cV+yP7BQXCRQXj0QXgRQXIyQUOX4v3IPc+9yD3OPcg3PcpEp33KfsG9ymj9ykXE+TA+YYV/YYH98IG9yAH+y0G9z4H9xkG9yAH+xkG9zgH9ysG9yAHExr7TvcuFbRrrmIeYGppYR9jrWqzHrStrLMfExL3ZBa0a65iHmBqaWEfY61qsx60rayzHw5fi/cg9z73IPc49yD3eZ8SwPcpIvdaFxPowPmGFf2GB/fCBvcgB/stBvc+B/cZBvcgB/sZBvc4B/crBvcgBxMU+y73jRUlXQX3FfseBdCzBQ7pi/ca90T3H/c/9xoBwPcp9y33KQP3Thb3f973MPdrH/g5+8xlcR77BQb7xQdWBvsfB8AG+8oH98L4CBWLLWr7KvsMkQj3RAfABvcgB1YG9z4H9w+p+ywrHw77SYug+V2f93mfEqj3WvtC9ykXE8jA+YYV/YYH9ykG+YYHEzA+940VK/skBdBjBfcV9x4FDvtJi6D5XZ/H90sSe/e1+3D3KRcTyMD5hhX9hgf3KQb5hgcTMED3hxX7I/sFBcJFBePRBeBFBcjJBQ77SYug+V2f3PcpEln3KV33KV/3KRcTyMD5hhX9hgf3KQb5hgcTNCT3LhW0a65iHmBqaWEfY61qsx60rayzHxMk92QWtGuuYh5gamlhH2OtarMetK2ssx8O+0mLoPldn/d5nxKo91r7QvcpFxPIwPmGFf2GB/cpBvmGBxMwRPeNFSVdBfcV+x4F0LMFDvcdi6D3rKD4MJ/s9xv7G/ceEsD3KT732T33KRcT5cD5hhX9hgf3KQb37geKqgWE1wWNjQX3TPxbBfchBvmGB/spBvvnB4tkjmSUZwiJiQX7TvhbBRMa90f3fxWJdYN5cYsIZottsVaLCECLfkKFTwjUBo6dlJmfiwibi5eEmYUIpIClgKaLCNaLmtSVxwgO9yZ/9x74ivce922fAaX3M5L3WpL3MwP3t/mSFfsZ+xgh+68f+6/3GCH3GR73GfcY9fevH/ev+xj1+xkeIfwZFc6S90zuHu6S+0xIH0+E+1MoHiiE91PHH/L5BhUr+yQF0GMF9xX3HgUO9yZ/9x74ivceu/dLEqX3M233tVz3MxcT1Pe3+ZIV+xn7GCH7rx/7r/cYIfcZHvcZ9xj1968f96/7GPX7GR4h/BkVzpL3TO4e7pL7TEgfT4T7UygeKIT3U8cfEyj3BfkAFfsj+wUFwkUF49EF4EUFyMkFDvcmf/ce+Ir3HtD3KRKl9zND9ynG9ylC9zMXE9L3t/mSFfsZ+xgh+68f+6/3GCH3GR73GfcY9fevH/ev+xj1+xkeIfwZFc6S90zuHu6S+0xIH0+E+1MoHiiE91PHHxMs2PinFbRrrmIeYGppYR9jrWqzHrStrLMfEyT3ZBa0a65iHmBqaWEfY61qsx60rayzHw73Jn/3HviK9x73bZ8SpfczhvdanvczFxPU97f5khX7GfsYIfuvH/uv9xgh9xke9xn3GPX3rx/3r/sY9fsZHiH8GRXOkvdM7h7ukvtMSB9PhPtTKB4ohPdTxx8TKOz5BhUlXQX3FfseBdCzBQ73Jn/3HviK9x7g9xv7G/ceEqX3M1P32VL3MxcTyve3+ZIV+xn7GCH7rx/7r/cYIfcZHvcZ9xj1968f96/7GPX7GR4h/BkVzpL3TO4e7pL7TEgfT4T7UygeKIT3U8cfEzT3Vvj4FYl1g3lxiwhmi22xVosIQIt+QoVPCNQGjp2UmZ+LCJuLl4SZhQikgKWAposI1oua1JXHCA6Pf/cg+Iz3Grv3SxKt9yYj97Uj9yYXE9T3//ltFWKjYJhbiwj7FEYk+wsfi/sCwFPhUQi1bbl1i1EIWWVrWx5fi2mbaKMI+yIHrXK/frWLCPcg2PD3Gh+L92D7d5KL9xAIuainuR60i7B1qXEIEyj7Ifd6Ffcj9wUFVNEFM0UFNtEFTk0FDr6LoPco9w/3W/cP9wyfAcD3KfcF9ykD914W9z8HrIkF9x7m3PchH/eH+3R3ZR73IAf7KQb9hgf3Kfh/FacGy6BfVR+LPmJwQ44IDvcAf/cb+Pef93mfErz3KX73Wmb3KRcT1Lz5hhX8xAf7Id5K9x8e92uU9xzbH/i6B/spBvycB4pTi1RCiwg6kuHEH/h8BxMo3veNFSv7JAXQYwX3FfceBQ73AH/3G/j3n8f3SxK89ylF97VE9ykXE9S8+YYV/MQH+yHeSvcfHvdrlPcc2x/4ugf7KQb8nAeKU4tUQosIOpLhxB/4fAcTKNT3hxX7I/sFBcJFBePRBeBFBcjJBQ73AH/3G/j3n9z3KRK89ykv9ynG9yn7CfcpFxPSvPmGFfzEB/sh3kr3Hx73a5T3HNsf+LoH+ykG/JwHilOLVEKLCDqS4cQf+HwHEyzE9y4VtGuuYh5gamlhH2OtarMetK2ssx8TJPdkFrRrrmIeYGppYR9jrWqzHrStrLMfDvcAf/cb+Pef93mfErz3KWb3Wn73KRcT1Lz5hhX8xAf7Id5K9x8e92uU9xzbH/i6B/spBvycB4pTi1RCiwg6kuHEH/h8BxMozPeNFSVdBfcV+x4F0LMFDtmLoPhrn/dyn/d5nxL3Pvda+0v3KRcT5I/5hhX3SfwdBfv9B/cpBvf9B/dE+B0F+zsGSPtOBXpTBYkGgLAFPfdhBRMY7feNFSv7JAXQYwX3FfceBQ7Zi6D4a5/3cp/c9ykS2vcpYPcpXPcpFxPkj/mGFfdJ/B0F+/0H9ykG9/0H90T4HQX7OwZI+04FelMFiQaAsAU992EFExrH9y4VtGuuYh5gamlhH2OtarMetK2ssx8TEvdkFrRrrmIeYGppYR9jrWqzHrStrLMfDtOL9yD4bvcgx/dLEp34b/wH97UXE9C9+YYV+yAH928G+4/8+gX4Wgb3IAf7gQb3lvj6BRMo+3XHFfcj9wUFVNEFM0UFNtEFTk0FDoiL9wv3o/cH93mfEqX3IVr3WlH3IRcT1Pdv9wsVWYnzqx+ojvW6HruOIG8fcIf7AV4esvsLFfchBviNB/shBk0HiQZ7tGuqXIsI+wp6+0M0Hzqi+0r3Bh64i6ionrEIjQYTKF/5TRUr+yQF0GMF9xX3HgUOiIv3C/ej9wfH90sSpfchLfe1I/chFxPU92/3CxVZifOrH6iO9boeu44gbx9wh/sBXh6y+wsV9yEG+I0H+yEGTQeJBnu0a6pciwj7Cnr7QzQfOqL7SvcGHriLqKiesQiNBhMoYflHFfsj+wUFwkUF49EF4EUFyMkFDoiL9wv3o/cH3PcpEqX3IfsU9ynG9yn7HvchFxPS92/3CxVZifOrH6iO9boeu44gbx9wh/sBXh6y+wsV9yEG+I0H+yEGTQeJBnu0a6pciwj7Cnr7QzQfOqL7SvcGHriLqKiesQiNBhMsRfjuFbRrrmIeYGppYR9jrWqzHrStrLMfEyT3ZBa0a65iHmBqaWEfY61qsx60rayzHw6Ii/cL96P3B/d5nxKl9yFa91pR9yEXE9T3b/cLFVmJ86sfqI71uh67jiBvH3CH+wFeHrL7CxX3IQb4jQf7IQZNB4kGe7RrqlyLCPsKevtDNB86ovtK9wYeuIuoqJ6xCI0GEyhl+U0VJV0F9xX7HgXQswUOiIv3C/ej9we3zeDNEqX3IVHN3vch+yDNFxPK92/3CxVZifOrH6iO9boeu44gbx9wh/sBXh6y+wsV9yEG+I0H+yEGTQeJBnu0a6pciwj7Cnr7QzQfOqL7SvcGHriLqKiesQiNBhM1Y/iAFca7vMUfxl2+Tx5OWlxOH068W8cezQRzeJ2jH6SenaMeop13cx91eHh1Hg6Ii/cL96P3B+z3G/sb9x4Spfch+wT32fsO9yEXE8r3b/cLFVmJ86sfqI71uh67jiBvH3CH+wFeHrL7CxX3IQb4jQf7IQZNB4kGe7RrqlyLCPsKevtDNB86ovtK9wYeuIuoqJ6xCI0GEzS6+T8ViXWDeXGLCGaLbbFWiwhAi35ChU8I1AaOnZSZn4sIm4uXhJmFCKSApYCmiwjWi5rUlccIDvtOi6D5kp8B0fcCA9EW9wIG990H+wIG9wL4chX7Agb73Af3AgYO+w37bvc+sfcY96L3DxKl9yEu9zwXE3D3uPcdFX6CfYV7iwhEgNzBH7+a3tAenIuWh5h/CPcQB3SVdZByiwj7Jln7H/sTH/sHu/sk9x0eqIulkaWXCBOI+yBTFT37HgXKawX09xoFDvgef9Tr0/fF0+LUAaHZ9wfj+D/ZA/g0fxX3bfdD90L3bR/3a/tD90D7bR77bvtE+0D7ax/7bfdE+0L3bh7UBPtFjPsf9yKL90MI90H3H/ch90Ue90L3IPsh+0Efi/tD+yD7IvtCigj3A/eMFYhbX2tbiwg5XNzVH9i11N8evYuycJRaCOQGeuhBwiyLCPsZOSz7FR/7EuEo9xce54vcxZbpCA5n+Gba9yLaAb3a9yLaA/dc+ZIVOItHR4w5CDjOSN4e3c/O3h/dR885HjwEs6prZB9jbGxkHmNrqrMfirKsq7KLCA6Y9wfU9wLU9wcB90n3EwOg910V+FUG9wIH/FUG97PUFfcHB/sTBvsHB/cT/AcV9wcH+xMG+wcHDnWB9zr7OvcA9wni9PcA92+fEqX3HFX3WmP3DhcTtfee98IVJAaaB6uUxbYet5JPah/3DmIVk/czNd4uiwj7J1/7LPsNH/sRvvsT9yMe8ou41JfoCPsMBhNlbYJvZx5Vi43birAI93MGEwr7SfivFSv7JAXQYwX3FfceBQ51gfc6+zr3APcJ4vT3AL33SxKl9xwo97U19w4XE7X3nvfCFSQGmgerlMW2HreST2of9w5iFZP3MzXeLosI+ydf+yz7DR/7Eb77E/cjHvKLuNSX6Aj7DAYTZW2Cb2ceVYuN24qwCPdzBhMK+0f4qRX7I/sFBcJFBePRBeBFBcjJBQ51gfc6+zr3APcJ4vT3ANL3KRKl9xz7Gfcpxvcp+wz3DhcTtID3nvfCFSQGmgerlMW2HreST2of9w5iFZP3MzXeLosI+ydf+yz7DR/7Eb77E/cjHvKLuNSX6Aj7DAYTZIBtgm9nHlWLjduKsAj3cwYTCwD7Y/hQFbRrrmIeYGppYR9jrWqzHrStrLMfEwkA92QWtGuuYh5gamlhH2OtarMetK2ssx8OdYH3Ovs69wD3CeL09wD3b58SpfccVfdaY/cOFxO19573whUkBpoHq5TFth63kk9qH/cOYhWT9zM13i6LCPsnX/ss+w0f+xG++xP3Ix7yi7jUl+gI+wwGE2Vtgm9nHlWLjduKsAj3cwYTCvtD+K8VJV0F9xX7HgXQswUOi4D3E/ek9wz3t58Bpfch8fchA/c795AVqI32vB68jSBuH26JIFoeWon2qB+++5sV9yuLrPcjk/cMCIv3MVD3JD33EQjjtwVoxQU0XwV1q3+ecasI+wNXBaBxn2+hZgg7YQWrUQXctwWoYptnoGgI+zeSYvsai/sVCPsVtPsa9yseDvt3i6D4ZJ/3eZ8Skfda+z73IRcTyK34jRX8jQf3IQb4jQcTMEL3jRUr+yQF0GMF9xX3HgUO+3eLoPhkn8f3SxJk97X7bPchFxPIrfiNFfyNB/chBviNBxMwRPeHFfsj+wUFwkUF49EF4EUFyMkFDvt3i6D4ZJ/c9ykSQvcpYfchY/cpFxPIrfiNFfyNB/chBviNBxM0KPcuFbRrrmIeYGppYR9jrWqzHrStrLMfEyT3ZBa0a65iHmBqaWEfY61qsx60rayzHw77d4ug+GSf93mfEpH3Wvs+9yEXE8it+I0V/I0H9yEG+I0HEzBI940VJV0F9xX7HgXQswUO9773AgH3/PcCA/f89wQV9wIG97wH/FUG+wIH9+cGDvdd9wIBoPhVA6D3XRX4VQb3Agf8VQYOfvuNoPdu9yL39Z8Brfch1PchA/eM+I0V+6kHcZVFXh5rhaykH/fPB/shBv2GB/chBvfbB40Gnlu2Y8KLCPOC9wjUH/faBw6o+FoBoPhVA/gcqBXZ2QX7KfcpBfcp9ykFPdkF+yn7KQX7JPckBT09Bfck+yQF+yT7JAXZPQX3JPckBQ5/i6D39PcY7Pcb+xv3HhKu9yH7EvfZ+xL3IRcTyvdE+I0V+yEG/I0H9yEG988HpJGsqx64gUVxH/upB/chBvfaB9SU9wgjHlSLYGN4WwiJBhM09xD3zRWJdYN5cYsIZottsVaLCECLfkKFTwjUBo6dlJmfiwibi5eEmYUIpIClgKaLCNaLmtSVxwgOi4H3Evek9xP3b58SpfchW/daW/chFxPU9274lxX7K2L7GvsVH/sVtPsZ9yse9yu09xn3FR/3FWL3GvsrHvsTBLyNIG4fbokgWh5aifaoH6iN9rweEyiI+AIVK/skBdBjBfcV9x4FDouB9xL3pPcTvfdLEqX3IS73tS33IRcT1Pdu+JcV+yti+xr7FR/7FbT7GfcrHvcrtPcZ9xUf9xVi9xr7Kx77EwS8jSBuH26JIFoeWon2qB+ojfa8HhMoivf8Ffsj+wUFwkUF49EF4EUFyMkFDouB9xL3pPcT0vcpEqX3IfsT9ynG9yn7FPchFxPS9274lxX7K2L7GvsVH/sVtPsZ9yse9yu09xn3FR/3FWL3GvsrHvsTBLyNIG4fbokgWh5aifaoH6iN9rweEyxu96MVtGuuYh5gamlhH2OtarMetK2ssx8TJPdkFrRrrmIeYGppYR9jrWqzHrStrLMfDouB9xL3pPcT92+fEqX3IVv3Wlv3IRcT1Pdu+JcV+yti+xr7FR/7FbT7GfcrHvcrtPcZ9xUf9xVi9xr7Kx77EwS8jSBuH26JIFoeWon2qB+ojfa8HhMojvgCFSVdBfcV+x4F0LMFDve/i933dKDIzvdx2QHy8fdp69PtA/hi+YYV+/z9hgXiBvf7+YYF/IAWPQe6BvwGB/EG+FQH+Gv9hhXdB/sJBuD3GgWitJyvi7kI2VyxNB4hcU87H41yBeoGiqgFpI23rR6nk29zH4taZU1yYAj7AvtKBQ73v4ug4Nv3DKD38dkB7/H37/EDwPmGFT0Hugb8BgfxBvhUB/fv/YYV8Qb1B7EG2wdlBveaB/sJBvsW+6QFRQf3JQbbBEMG0fc4BY0GT/goFfv8/YYF4gb3+/mGBQ77IvfGoPfx2QHz8QPE+YYVPQe6BvwGB/EG+FQHDouB9xL3pPcT4vcb+xv3HhKl9yH7A/fZ+wT3IRcTyvdu+JcV+yti+xr7FR/7FbT7GfcrHvcrtPcZ9xUf9xVi9xr7Kx77EwS8jSBuH26JIFoeWon2qB+ojfa8HhM04/f0FYl1g3lxiwhmi22xVosIQIt+QoVPCNQGjp2UmZ+LCJuLl4SZhQikgKWAposI1oua1JXHCA6L9wL3QvcCAfdS9wID91L4HhX7PQb7Agf3PQb7Ggf3Agb3Ggf3Pgb3Agf7Pgb3Ggf7Agb7PfykFfhVBvcCB/xVBg74Hn/U97LK9wvK8NQBodn3Lt73YN712QP4NH8V9233Q/dC920f92v7Q/dA+20e+277RPtA+2sf+233RPtC924e1AT7RYz7H/cii/dDCPdB9x/3IfdFHvdC9yD7IftBH4v7Q/sg+yL7QooI5/eyFdaQtKuL2AiLt3+0ZaQIa59cjGeLCPthBvw9B94G90gH3gbp+0gF7Ab7pveHFfcLB/IGtMeLVB+LVWqAXIwIDk+B9xH3s/cFvfdLErX3Ifsf97X7FvchFxPE9+74bBViqWCYWIsIE1AyO1crHxOEi/s09zeciUgIcXh7dR5vi3aadp0ITScFtWjDdMGLCPPF2O8fE1CL9yv7M3+JxgihmJqkHqiLnnyfeQgTKCj3WBX3I/cFBVTRBTNFBTbRBU5NBQ6I+42g9273Ffej9xEBrvch5fchA/dE+VcV+yEG/lAH9yEG98YHjQadZahuuYsI9weg90rcH+J790P7Cx5di2tse2IIiQay+9gVXYj3AaYfp432ux65jyFuH2uKI1keDve/i6Dg2fcH0UX3EtjXvPcaQNZwnxKo7I2WxvcD+wLq96XxFxPkaPkxFvUHsQbbB2UG95oH+wkG+xb7pAVFB/clBiEH90wEQwbR9zYFjQYTkYBo+CwV+/z9hgXiBvf7+YYF/ID73RUqBhMgoIc/vVnhiwjowr3eH4u5drlVlwiNBxMEULqcmLmLtQjSXro5HjOLa1SNPAjlBpQHEwpQn5CppB6kkG53H1p2gVkePwcTKKC+jZ58i1sIcIleZh50gaGgHw77Ive/0UX3EtjXvPcaQNYSkeyNlsb3A/sC6hcT9wDy+D0VKgYThQCHP71Z4YsI6MK93h+LuXa5VZcIjQcTEoC6nJi5i7UI0l66OR4zi2tUjTwI5QaUBxMqgJ+QqaQepJBudx9adoFZHj8HE6UAvo2efItbCHCJXmYedIGhoB8O+AD38vc59zXZAfcH2/cy2/eZ2wP5mvmGFfsVBjv7gwWJBjr3gwX7FQb8KAfbBvfaB40G9PvaBboG9PfaBY0G+9oH2wb8ZPgoFfvJBj0H9wYG+9oH2wb32gf3BwYO+yL3xt33xs4BoevT7QP3C/joFYqoBaSNt60ep5Nvcx+LWmVNcmAI+wL7SgX3mwbdB/sJBuD3GgWitJyvi7kI2VyxNB4hcU87H41yBQ5+gfcY9/+f93mfEq73IUz3Wkv3IRcT1K74jRX7wwcvmPsM9zQe9xHC1/cJH/fWB/sgBor7yAVyjlllHlyW2acf96kHEyis940VK/skBdBjBfcV9x4FDn6B9xj3/5/H90sSrvch+wD3tfsC9yEXE9Su+I0V+8MHL5j7DPc0HvcRwtf3CR/31gf7IAaK+8gFco5ZZR5cltmnH/epBxMorveHFfsj+wUFwkUF49EF4EUFyMkFDn6B9xj3/5/c9ykSrfcp+yj3Ic33Kfsk9yEXE8qu+I0V+8MHL5j7DPc0HvcRwtf3CR/31gf7IAaK+8gFco5ZZR5cltmnH/epBxM0kvcuFbRrrmIeYGppYR9jrWqzHrStrLMfEyT3ZBa0a65iHmBqaWEfY61qsx60rayzHw5+gfcY9/+f93mfEq73IUz3Wkv3IRcT1K74jRX7wwcvmPsM9zQe9xHC1/cJH/fWB/sgBor7yAVyjlllHlyW2acf96kHEyiy940VJV0F9xX7HgXQswUOm/uNoPldn/d5nxKa+Dr7yvdaFxPQmviNFfcn/IMFOvuXBfcfBvdt+YYF+yIGSfu0BYkGet8FVvdgBRMozfeNFSv7JAXQYwX3FfceBQ6b+42g+V2f3PcpEpr4OvwZ9ynG9ykXE9Ca+I0V9yf8gwU6+5cF9x8G9235hgX7IgZJ+7QFiQZ63wVW92AFEyyz9y4VtGuuYh5gamlhH2OtarMetK2ssx8TJPdkFrRrrmIeYGppYR9jrWqzHrStrLMfDmiL9wn3o/cJx/dLEqL39/vV97UXE9Cy+I0V+wkH9yQG+zT8GAX35gb3CQf7Hwb3MPgYBRMo+0PHFfcj9wUFVNEFM0UFNtEFTk0FDn+X+YaX+5mV97iXBve/kvzLlwceCgR5WP8MCfh+FPhIFQAAAAADAAAAAwAAASIAAQAAAAAAHAADAAEAAAEiAAABBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAgMEBQYHCAkKCwwNDg8QERITFBUWFxgZGhscHR4fICEiIyQlJicoKSorLC0uLzAxMjM0NTY3ODk6Ozw9Pj9AQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVpbXF1eXwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgYWJjZGVmZ2hpamtsbW4Ab3BxcgBzdHV2d3h5egB7AHx9fn+AgYKDAISFAIaHiIkAAAAAAAAAAAAAAAAAAAAAigCLAAAAAIyNjo8AAAAAAJAAAACRAACSk5SVAAAAAAAEApgAAAAwACAABAAQAH4ArAD/ATEBQgFTAWEBeAF+AZICxwLdIBQgGiAeICIgJiAwIDogRCEiIhL7Av//AAAAIAChAK4BMQFBAVIBYAF4AX0BkgLGAtggEyAYIBwgICAmIDAgOSBEISIiEvsB//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAMADsAQIBpAGkAaYBqAGqAaoBrAGsAa4BuAG6Ab4BwgHGAcYBxgHIAcgByAHIAAAAAQACAAMABAAFAAYABwBoAAkACgALAAwADQAOAA8AEAARABIAEwAUABUAFgAXABgAGQAaABsAHAAdAB4AHwAgACEAIgAjACQAJQAmACcAKAApACoAKwAsAC0ALgAvADAAMQAyADMANAA1ADYANwA4ADkAOgA7ADwAPQA+AD8AQAB8AEIAQwBEAEUARgBHAEgASQBKAEsATABNAE4ATwBQAFEAUgBTAFQAVQBWAFcAWABZAFoAWwBcAF0AXgBfAGAAYQBiAGcAZAC7AGYAgwC9AIsAagDJANcAgAC+ANYA3QDbAH0AywBzAHIAhQDUAI8AeADTANIA2gB7AJkAlgCXAJsAmACaAIoAnACgAJ0AngCfAKUAogCjAKQAoQCmAKoApwCoAKsAqQDMAI0AsQCuAK8AsACyAK0AlQC4ALUAtgC6ALcAuQCQALwAwwDAAMEAwgDIAMUAxgDHAMQAzQDRAM4AzwDVANAAvwCTAOEA3gDfAOAA4gDZAOMAkQCMAJIAjgCUAKwA2ACzALQA5ABlAH4AiACBAIIAhACHAH8AhgBvAIkAQQAIAHUAaQB3AHYAcABxAHQAeQB6AGsAbABjANwAygBtAG4AAAABAAAACgAeACwAAWxhdG4ACAAEAAAAAP//AAEAAAABa2VybgAIAAAAAQAAAAEABAACAAAAAQAIAAEAKgAEAAAAEABOAFwAfgCMAKYAtADKAQwBQgF4AbIBuAHCAhwCJgIwAAEAEAAIACIAJwAtADEAMwA1ADcAOAA6AEEARwBTAFcAWABaAAMACP/uAFT/tgBVAAAACAAI/8kANf/JADf/yQA4/8kAOv/JAFf/2wBY/9sAWv/bAAMADf+wAA//sAAi/9sABgAI/6QANf/JADf/tgA4/8kAOv+2AFr/2wADAA3/fwAP/38AIv/bAAUANf/mADf/2wA4/9sAOv/bAFr/7gAQAA3/wgAO/8kAD//CABv/1gAc/9YAIv/JAEL/tgBE/7YARv+2AEr/7gBQ/7YAU/+2AFT/tgBW/7YAWP+2AFr/tgANAA3/pAAO/+4AD/+kABv/7gAc/+4AIv/JAEL/4gBG/+IASgAAAFD/4gBT/+4AVv/uAFr/7gANAA3/tgAO/+4AD/+2ABsAAAAcAAAAIv/JAEL/4gBG/+IASgAAAFD/4gBT/+4AVv+yAFr/7gAOAA3/kQAO/7YAD/+RABv/2wAc/9sAIv/JAEL/tgBG/7YASv/uAFD/tgBR/8kAUv+2AFb/yQBX/9sAAQBB/+4AAgAIABIARwAAABYACAAAAA3/yQAOAAAAD//JAEQAAABFAAAARgAAAEcAAABIAAAASQAAAE4AAABPAAAAUAAAAFIAAABTAAAAVQAAAFYAAABXABIAWAASAFkAFABaABIAWwAUAAIADf/JAA//yQACAA3/2wAP/9sAAgAN/8kAD//JAAAAAQAAAAEAAKgJhSdfDzz1AAMD6AAAAADCZe5JAAAAAMJl7kn/dP77BKsD9wABAAYAAgAAAAAAAAABAAAD9/77AAAE0v90/3QEqwABAAAAAAAAAAAAAAAAAAAA5QAAAAAA9QAAAPUAAAD2ABwBaAATAeoAGgHqABMDWgAmAk4AGgEuABoBLAAqASwAEgF4ABcB6gAVAPX/3wE+ACIA9QAbAiMAHwHqACEB6gBuAeoAKQHqACIB6gAcAeoAMQHqACUB6gApAeoAHQHqACUA9QAbAPX/3wHqABQB6gAVAeoAFQHGABkDQQAmAhAACAHfADUBxAAaAhIANQGIADUBigA1AjMAGgIrADUA/wA1AWAADAIBADUBdQA1AtIAFwI9ADUCRgAaAecANQJGABoCEgA1AbgAIgGeAA8CIAAxAjUACAMZAAgCIQAWAgIABAH8ABIBQAA1APr/lgFAAA4B6gAVAfQAAAEuABoBsQAaAbEAIwE7ABoBsQAaAZ4AGgErABMBtQAaAagAIwDRAA8A0QAPAbgAIwDSACMCfwAjAagAIwG0ABoBsQAjAbEAGgE7ACMBeAAeATQAHgGnACMBxAAPArYADwHpABcBxAAPAZEAFwEsABIA+gBGASz//QHqABUA9gAcAeoASwHqAAsApv90Aer/+AHqAAkB6wAeAeoABAD6ADgB6wAaAbEAGgEEABoBBAAbAhcAEwIXABMB9AAAAesAMgHqADIA9QAbAlgAHAGkABUBLwAaAesAGgHrABoBsQAbA+gASATSACYBxgAaASwAMwEsADMBLAAGASz/9AEs/+kBLP/uASwATAEs/+QBLAAqASwAQgEs/9YBLAA1ASwABgPoAAACogAIASwAHAF1AAACRgAaAukAGgEsABkCgAAaANEAIgDS/+IBtAAaAo0AGgHeABMCEAAIAhAACAIQAAgCEAAIAhAACAIQAAgBxAAaAYgANQGIADUBiAA1AYgANQISAAAA/wA1AP8ANQD/ADUA/wA1Aj0ANQJGABoCRgAaAkYAGgJGABoCRgAaAbgAIgHnADUCIAAxAiAAMQIgADECIAAxAgIABAICAAQB/AASAbEAGgGxABoBsQAaAbEAGgGxABoBsQAaAPoARgE7ABoDPgAWAZAAMgHqABUBngAaAZ4AGgGeABoBngAaAbQAGgDRACIA0QAiANEAIgDRACIB6gAVAeoAFQGnACIB6gAVAagAIwG0ABoBtAAaAbQAGgG0ABoC3wA4At8ANQEmADkBtAAaAeoAFQM+ABYBeAAeAbEAIwLfAB0BJgAGAyAAAQEmABEBpwAjAacAIwGnACMBpwAjAcQADwHEAA8BkQAXAAAAAAAAUAAA5QAAAAAAFQECAAAAAAAAAAAA5ADqAAAAAAAAAAEADAHOAAAAAAAAAAIAHAHaAAAAAAAAAAMAQAH2AAAAAAAAAAQAKgI2AAAAAAAAAAUADgJgAAAAAAAAAAYAKAJuAAEAAAAAAAAAcgAAAAEAAAAAAAEABgByAAEAAAAAAAIADgB4AAEAAAAAAAMAIACGAAEAAAAAAAQAFQCmAAEAAAAAAAUABwC7AAEAAAAAAAYAFADCAAMAAQQJAAAA5ADqAAMAAQQJAAEAIAKWAAMAAQQJAAIACAK2AAMAAQQJAAMAQAH2AAMAAQQJAAQAKAJuAAMAAQQJAAUADgJgAAMAAQQJAAYAKAJuQ29weXJpZ2h0IChjKSAxOTg3IEFkb2JlIFN5c3RlbXMgSW5jb3Jwb3JhdGVkLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5GdXR1cmEgaXMgYSByZWdpc3RlcmVkIHRyYWRlbWFyayBvZiBOZXVmdmlsbGUuRnV0dXJhQ29uZGVuc2VkIEJvbGRGdXR1cmEgQ29uZGVuc2VkIEJvbGQ6MTE3ODYzMzI0MUZ1dHVyYSBDb25kZW5zZWQgQm9sZDAwMS4wMDBGdXR1cmEtQ29uZGVuc2VkQm9sZEZ1dHVyYSBDb25kZW5zZWRCb2xkAEMAbwBwAHkAcgBpAGcAaAB0ACAAKABjACkAIAAxADkAOAA3ACAAQQBkAG8AYgBlACAAUwB5AHMAdABlAG0AcwAgAEkAbgBjAG8AcgBwAG8AcgBhAHQAZQBkAC4AIAAgAEEAbABsACAAUgBpAGcAaAB0AHMAIABSAGUAcwBlAHIAdgBlAGQALgBGAHUAdAB1AHIAYQAgAGkAcwAgAGEAIAByAGUAZwBpAHMAdABlAHIAZQBkACAAdAByAGEAZABlAG0AYQByAGsAIABvAGYAIABOAGUAdQBmAHYAaQBsAGwAZQAuAEYAdQB0AHUAcgBhAEMAbwBuAGQAZQBuAHMAZQBkACAAQgBvAGwAZABGAHUAdAB1AHIAYQAgAEMAbwBuAGQAZQBuAHMAZQBkACAAQgBvAGwAZAA6ADEAMQA3ADgANgAzADMAMgA0ADEARgB1AHQAdQByAGEAIABDAG8AbgBkAGUAbgBzAGUAZAAgAEIAbwBsAGQAMAAwADEALgAwADAAMABGAHUAdAB1AHIAYQAtAEMAbwBuAGQAZQBuAHMAZQBkAEIAbwBsAGQARgB1AHQAdQByAGEAIABDAG8AbgBkAGUAbgBzAGUAZABCAG8AbABkAAAAAAACAb0CvAADAAACigKKAAAAlgKKAooAAAH0ADIA4QAAAAAAAAAAAAAAAIAAAC9AAABIAAAAAAAAAAAAAAAAACAAIPsCAyf/BwA2A/cBBSAAARFBAAAAAfkC8gAAACAAAgAAAAAAAwAAAAAAAP9qAEsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");

// @ts-ignore
const React$2 = BdApi.React;
let font = new FontFace('futuraBoldCondensed', futura);
onStart(async () => {
    document.fonts.add(font);
});
onStop(() => {
    document.fonts.delete(font);
});
// https://stackoverflow.com/questions/2936112/text-wrap-in-a-canvas-element
function getLines(ctx, text, maxWidth) {
    var words = text.split(" ");
    var lines = [];
    var currentLine = words[0];
    for (var i = 1; i < words.length; i++) {
        var word = words[i];
        var width = ctx.measureText(currentLine + " " + word).width;
        if (width < maxWidth) {
            currentLine += " " + word;
        }
        else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}
function AddCaption({ name, src, onSubmit }) {
    const canvas = React$2.useRef(null);
    const [caption, setCaption] = React$2.useState('');
    const [fontSize, setFontSize] = React$2.useState(70);
    let baseImage = new Image();
    baseImage.src = src;
    baseImage.decode().then(render);
    const padding = 10;
    onSubmit(async () => {
        render();
        if (!canvas.current)
            return;
        let parts = name.split(".");
        parts.pop();
        let newName = `${parts.join(".")}-captioned.png`;
        const blob = await new Promise(resolve => canvas.current.toBlob((blob) => resolve(blob)));
        const file = new File([blob], newName, { type: 'image/png' });
        sendFile(file);
    });
    function render() {
        if (!canvas.current)
            return;
        let ctx = canvas.current.getContext('2d');
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
        // draw the image
        ctx.drawImage(baseImage, 0, lines.length * fontSize + padding * 2, baseImage.width, baseImage.height);
    }
    React$2.useEffect(render, [caption, fontSize]);
    return (React$2.createElement("div", { className: 'if-caption-creator' },
        React$2.createElement("div", { className: "if-caption-settings" },
            React$2.createElement("input", { type: "text", placeholder: 'Caption', className: "if-caption", onChange: (e) => setCaption(e.target.value) }),
            React$2.createElement("label", { htmlFor: "if-font-size" }, "Font Size"),
            React$2.createElement("input", { id: "if-font-size", type: "range", min: "5", max: "400", defaultValue: "70", onChange: (e) => setFontSize(parseFloat(e.target.value)) })),
        React$2.createElement("canvas", { ref: canvas })));
}

const settings = {
    rerender: BdApi.Data.load("ImageFolder", "rerender") ?? true,
    sortBy: BdApi.Data.load("ImageFolder", "sorting") ?? "lastSent",
    showButton: BdApi.Data.load("ImageFolder", "showButton") ?? true
};
function setup() {
    // @ts-ignore (types haven't been updated yet)
    setSettingsPanel(() => BdApi.UI.buildSettingsPanel({
        settings: [
            {
                type: "dropdown", id: "sortBy", value: settings.sortBy,
                name: "Image Sorting",
                options: [
                    { label: "Sort by last sent", value: "lastSent" },
                    { label: "Sort alphabetically", value: "name" },
                    { label: "Sort by last modified", value: "lastModified" }
                ]
            },
            {
                type: "switch", id: "rerender", value: settings.rerender,
                name: "Re-render images as PNG before sending?",
                note: "This will allow you to send AVIFs and sequenced WebPs (albeit without animation) and have them properly embed"
            },
            {
                type: "switch", id: "showButton", value: settings.showButton,
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

const React$1 = BdApi.React;
const fs$2 = require('fs');
const { join: join$2 } = require('path');
function imageComponent({ name, path, updateFolder }) {
    const imgRef = React$1.useRef(null);
    const [src, setSrc] = React$1.useState('');
    let observer = new IntersectionObserver((entries) => {
        if (src != "")
            return;
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // get the base64 src
                pathToSrc(join$2(path, name)).then((src) => {
                    setSrc(src);
                });
            }
        });
    });
    // when the image is loaded, add it to the observer
    React$1.useEffect(() => {
        if (imgRef.current)
            observer.observe(imgRef.current);
        return () => {
            if (imgRef.current)
                observer.unobserve(imgRef.current);
        };
    }, [imgRef.current]);
    function sendImage() {
        if (!src)
            return;
        setLastUsed(join$2(path, name));
        // don't rerender gifs
        if (settings.rerender && !name.endsWith('.gif')) {
            sendProcessedImage(name, src);
        }
        else {
            sendRawImage(name, path);
        }
    }
    function renameImage() {
        let fileName = '';
        let parts = name.split('.');
        let ext = parts.pop();
        let startName = parts.join('.');
        BdApi.UI.showConfirmationModal(`Rename ${startName}`, (React$1.createElement("div", { className: 'if-nameWrap' },
            React$1.createElement("input", { className: 'if-nameInput', onChange: (e) => fileName = e.target.value, spellCheck: false, placeholder: 'Folder Name' }))), {
            confirmText: 'Rename',
            onConfirm: () => {
                fs$2.rename(join$2(__dirname, 'imageFolder', path, name), join$2(__dirname, 'imageFolder', path, fileName + '.' + ext), {}, (err) => {
                    if (err) {
                        BdApi.UI.showToast('Failed to rename image', { type: 'error' });
                        return;
                    }
                    BdApi.UI.showToast('Successfully renamed image', { type: 'success' });
                    // Reload folder
                    updateFolder();
                });
            }
        });
    }
    function deleteImage(e) {
        e.stopPropagation();
        BdApi.UI.showConfirmationModal('Delete Image', `Are you sure you want to delete ${name}?`, {
            danger: true,
            confirmText: 'Delete',
            onConfirm: () => {
                fs$2.unlinkSync(join$2(__dirname, 'imageFolder', path, name));
                BdApi.UI.showToast('Successfully deleted image', { type: 'success' });
                // Reload folder
                updateFolder();
            }
        });
    }
    function openContextMenu(e) {
        if (!src)
            return;
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
    return (React$1.createElement("div", { className: 'image' },
        React$1.createElement("div", { className: "icon", onClick: (e) => deleteImage(e), dangerouslySetInnerHTML: { __html: TrashCanOutline } }),
        React$1.createElement("img", { onClick: sendImage, ref: imgRef, src: src, onContextMenu: openContextMenu, style: { height: src ? '' : '50%' } })));
}

// @ts-ignore
const React = BdApi.React;
const fs$1 = require('fs');
const { join: join$1 } = require('path');
function ImageTab() {
    const [folderPath, setFolderPath] = React.useState('/');
    const [selectedFolder, setSelectedFolder] = React.useState({
        path: '/',
        folders: [],
        images: []
    });
    function updateFolder() {
        loadFolder(folderPath).then((folder) => {
            // Sort the images
            folder.images.sort((a, b) => {
                if (settings.sortBy === 'lastSent')
                    return b.lastSent - a.lastSent;
                if (settings.sortBy === 'lastModified')
                    return b.lastModified - a.lastModified;
                return a.name.localeCompare(b.name);
            });
            setSelectedFolder(folder);
        });
    }
    React.useEffect(updateFolder, [folderPath]);
    function intoFolder(folder) {
        setFolderPath(folderPath + folder + '/');
    }
    function backFolder() {
        const path = folderPath.split('/');
        path.pop();
        path.pop();
        setFolderPath(path.join('/') + '/');
    }
    function deleteFolder(e, folder) {
        e.stopPropagation();
        BdApi.UI.showConfirmationModal('Delete Folder', `Are you sure you want to delete ${folder}?`, {
            danger: true,
            confirmText: 'Delete',
            onConfirm: () => {
                fs$1.rmdir(join$1(__dirname, 'imageFolder', folderPath, folder), { recursive: true }, (err) => {
                    if (err) {
                        BdApi.UI.showToast('Failed to delete folder', { type: 'error' });
                        return;
                    }
                    BdApi.UI.showToast('Successfully deleted folder', { type: 'success' });
                    // Reload folder
                    updateFolder();
                });
            }
        });
    }
    function createFolder() {
        let folderName = '';
        BdApi.UI.showConfirmationModal('Create Folder', (React.createElement("div", { className: 'folderNameWrap' },
            React.createElement("input", { className: 'createFolderInput', onChange: (e) => folderName = e.target.value, spellCheck: false, placeholder: 'Folder Name' }))), {
            confirmText: 'Create',
            onConfirm: () => {
                fs$1.mkdir(join$1(__dirname, 'imageFolder', folderPath, folderName), {}, (err) => {
                    if (err) {
                        BdApi.UI.showToast('Failed to create folder', { type: 'error' });
                        return;
                    }
                    BdApi.UI.showToast('Successfully created folder', { type: 'success' });
                    // Reload folder
                    updateFolder();
                });
            }
        });
    }
    function renameFolder(e, folder) {
        e.stopPropagation();
        let folderName = '';
        BdApi.UI.showConfirmationModal(`Rename ${folder}`, (React.createElement("div", { className: 'if-nameWrap' },
            React.createElement("input", { className: 'if-nameInput', onChange: (e) => folderName = e.target.value, spellCheck: false, placeholder: 'Folder Name' }))), {
            confirmText: 'Rename',
            onConfirm: () => {
                fs$1.rename(join$1(__dirname, 'imageFolder', folderPath, folder), join$1(__dirname, 'imageFolder', folderPath, folderName), {}, (err) => {
                    if (err) {
                        BdApi.UI.showToast('Failed to rename folder', { type: 'error' });
                        return;
                    }
                    BdApi.UI.showToast('Successfully renamed folder', { type: 'success' });
                    // Reload folder
                    updateFolder();
                });
            }
        });
    }
    function createImage() {
        uploadImage(folderPath)
            .then(updateFolder);
    }
    return (React.createElement("div", { className: "imageTab" },
        React.createElement("div", { className: 'pathContainer' },
            React.createElement("div", { className: "icon folderReturn", onClick: backFolder, dangerouslySetInnerHTML: { __html: FolderArrowLeftOuline } }),
            React.createElement("div", { className: 'path' }, selectedFolder.path),
            React.createElement("div", { className: "icon", onClick: createFolder, dangerouslySetInnerHTML: { __html: FolderPlusOutline } }),
            React.createElement("div", { className: "icon", onClick: createImage, dangerouslySetInnerHTML: { __html: imagePlusOutline } })),
        React.createElement("div", { className: "content" },
            selectedFolder.folders.map((folder) => {
                return (React.createElement("div", { className: "folder", key: `${folderPath}${folder}`, onClick: () => intoFolder(folder) },
                    React.createElement("div", { className: "icon", dangerouslySetInnerHTML: { __html: FolderOpenOutline } }),
                    React.createElement("div", { className: "folderName" }, folder),
                    React.createElement("div", { className: "controls" },
                        React.createElement("div", { className: "icon", onClick: (e) => renameFolder(e, folder), dangerouslySetInnerHTML: { __html: Pencil } })),
                    React.createElement("div", { className: "controls" },
                        React.createElement("div", { className: "icon", onClick: (e) => deleteFolder(e, folder), dangerouslySetInnerHTML: { __html: TrashCanOutline } }))));
            }),
            React.createElement("div", { className: "images" }, selectedFolder.images.map((image) => {
                return (React.createElement(imageComponent, { name: image.name, path: folderPath, updateFolder: updateFolder, key: `${folderPath}${image.name}` }));
            })))));
}

// @ts-ignore
setup();
const fs = require('fs');
const { join } = require('path');
const Buffer = require('buffer');
function patchMenu(returnVal, props) {
    if (!returnVal || !props?.attachment)
        return returnVal;
    if (!Object.values(mimeTypes).includes(props.attachment.content_type))
        return returnVal;
    // get valid extensions
    let exts = [];
    for (let ext in mimeTypes) {
        if (mimeTypes[ext] == props.attachment.content_type)
            exts.push(ext);
    }
    // add our context menu item
    returnVal.props.children.push(BdApi.ContextMenu.buildItem({
        type: "separator"
    }), BdApi.ContextMenu.buildItem({
        type: "text",
        label: "Add Image to Folder",
        onClick: async () => {
            let res = await BdApi.UI.openDialog({
                mode: "save",
                defaultPath: join(__dirname, 'imageFolder', props.attachment.filename),
                filters: [
                    {
                        name: "Image",
                        extensions: exts
                    }
                ],
                title: "Save Image",
                message: "Select a folder to save the image to"
            });
            // @ts-expect-error
            if (!res || res.canceled)
                return;
            // save the image
            fetch(props.attachment.url).then(res => res.arrayBuffer()).then(array => {
                let buff = Buffer.from(array);
                // @ts-expect-error
                fs.writeFile(res.filePath, buff, (err) => {
                    if (err)
                        BdApi.UI.showToast('Failed to save image', { type: 'error' });
                    else
                        BdApi.UI.showToast('Image saved', { type: 'success' });
                });
            });
        }
    }));
    return returnVal;
}
onStart(() => {
    BdApi.DOM.addStyle("imgFolderStyles", styles);
    BdApi.Patcher.after("ImageFolder", buttonsModule, "type", (_, __, returnVal) => {
        if (!returnVal || !settings.showButton)
            return returnVal;
        let gifIndex = returnVal.props.children.findIndex((child) => child.key == 'gif');
        if (gifIndex === -1)
            return;
        let type = returnVal.props.children[gifIndex].props.type;
        let div = BdApi.React.createElement('div', {
            className: 'imgFolderBtn',
            onClick: () => {
                // for some reason the expression picker will always close itself before this runs, but that's above my paygrade
                toggleExpressionPicker('if-image', type);
            },
            dangerouslySetInnerHTML: { __html: imagePlusOutline }
        });
        returnVal.props.children.splice(gifIndex, 0, div);
        return returnVal;
    });
    let unpatch;
    BdApi.Patcher.after("ImageFolder", expressionModule, "type", (_, __, returnVal) => {
        if (!returnVal)
            return returnVal;
        // if we've already patched, unpatch
        if (unpatch)
            unpatch();
        unpatch = BdApi.Patcher.after("ImageFolder", returnVal.props.children.props, "children", (_, __, returnVal2) => {
            if (!returnVal2)
                return returnVal2;
            let sections = returnVal2?.props?.children?.props?.children?.[1]?.props?.children;
            let categories = sections?.[0]?.props?.children?.props?.children; // react moment
            if (!categories)
                return;
            let activeView = pickerStore.getState().activeView;
            // take the react element that categories[0] is based on and make a new one with the props id: 'image-folder-tab'
            let newCategory = BdApi.React.createElement(categories[0].type, {
                id: 'image-folder-tab',
                "aria-controls": "image-folder-tab-panel",
                "aria-selected": activeView === 'if-image',
                isActive: activeView === 'if-image',
                viewType: "if-image",
                children: 'Images'
            });
            categories.splice(0, 0, newCategory);
            if (activeView === 'if-image') {
                // display our content
                const el = BdApi.React.createElement(ImageTab, {});
                sections.push(el);
            }
            return returnVal2;
        });
        return returnVal;
    });
    // context menu patches
    BdApi.ContextMenu.patch("message", patchMenu);
});
onStop(() => {
    BdApi.Patcher.unpatchAll("ImageFolder");
    BdApi.DOM.removeStyle("imgFolderStyles");
    BdApi.ContextMenu.unpatch("message", patchMenu);
});
    }
}
