import type { IImg, IImgFolder } from './types';
import type { Stats } from 'node:fs';
import { mimeTypes } from './constants';
import { getLastUsed } from './saveInfo';

const fs = require('fs');
const { join, basename } = require('path');

const imgFolderPath = join(__dirname, 'imageFolder')

export async function chunkedBase64Encode(str: string) {
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
    })
}

export async function pathToSrc(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
        fs.readFile(join(imgFolderPath, path), 'latin1', async (err: Error, contents: string) => {
            if (err) {
                reject(err);
                return;
            }

            let ext = path.split('.').at(-1)!;
            const mime = mimeTypes[ext];
            resolve(`data:${mime};base64,${await chunkedBase64Encode(contents)}`);
        });
    });
}

export async function loadFolder(path: string): Promise<IImgFolder> {
    path = path.replace(/\\/g, '/');

    if(!fs.existsSync(join(imgFolderPath))) {
        fs.mkdirSync(join(imgFolderPath));
    }

    return new Promise((resolve, reject) => {
        const folderPath = join(imgFolderPath, path);

        if(!fs.existsSync(folderPath)) {
            return reject("Folder does not exist");
        }

        fs.readdir(folderPath, {}, (err: Error, files: string[]) => {
            if (err) {
                reject(err);
                return;
            } 

            let images: IImg[] = [];
            let folders: string[] = [];
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
                const filePath = join(folderPath, file);
                fs.stat(filePath, {}, async (err: Error, stat: Stats) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    if (stat.isDirectory()) {
                        folders.push(file);
                    } else {
                        const ext = file.split('.').at(-1);
                        if (ext && mimeTypes[ext]) images.push({
                            name: file,
                            lastModified: stat.mtimeMs,
                            lastSent: getLastUsed(join(path, file))
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

export async function uploadImage(folderPath: string) {
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
    })

    if (!result || result.canceled) return;

    for(let file of result.filePaths) {
        let fileName = basename(file);
        let newPath = join(imgFolderPath, folderPath, fileName);
        
        // read the file, and write it to the new path
        fs.readFile(file, {}, (err: Error, contents: string) => {
            if (err) {
                BdApi.UI.showToast(`Error reading file ${fileName}`, {type: "error"});
                return;
            }
    
            fs.writeFile(newPath, contents, {}, (err: Error) => {
                if (err) {
                    BdApi.UI.showToast(`Error writing file ${fileName}`, {type: "error"});
                    return;
                }
                BdApi.UI.showToast(`Image uploaded ${fileName}`, {type: "success"});
            });
        });
    }
}