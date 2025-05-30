import { Api } from '$shared/bd';
import { getInput } from '$shared/ui/input';
import { uploadFile } from '$shared/util/upload';
import type { DirContents, Folder, Media } from './types';

const fs: typeof import('fs') = require("fs");
const path: typeof import('path') = require("path");
const { shell } = require("electron");

// Unsupported: mkv, flv
export const types: Record<string, [Media["type"], string]> = {
    "jpg": ["image", "image/jpeg"],
    "jpeg": ["image", "image/jpeg"],
    "png": ["image", "image/png"],
    "webp": ["image", "image/webp"],
    "avif": ["image", "image/avif"],
    "gif": ["image", "image/gif"],
    "wav": ["audio", "audio/wav"],
    "mp3": ["audio", "audio/mpeg"],
    "ogg": ["audio", "audio/ogg"],
    "m4a": ["audio", "audio/flac"],
    "flac": ["audio", "audio/flac"],
    "mp4": ["video", "video/mp4"],
    "webm": ["video", "video/webm"],
    "mov": ["video", "video/quicktime"]
}

export default class Manager {
    static base = path.join(__dirname, "imageFolder");
    static dir = Api.Data.load("dir") ?? "";
    static saveDir = Api.Data.load("saveDir") ?? this.base;
    static contents?: DirContents;
    static update?: (contents: DirContents) => void;

    static showFolder() {
        shell.openPath(path.join(this.base, this.dir));
    }

    static read(dir: string, update: (contents: DirContents) => void) {
        this.update = update;

        // Do an immediate update with the previous contents
        if(this.dir === dir && this.contents) update(this.contents);

        let folders: Folder[] = [];
        let media: Media[] = [];

        const fullPath = path.join(this.base, dir);
        if(!fs.existsSync(fullPath)) {
            fs.mkdir(fullPath, { recursive: true }, (err) => {
                if(err) return;

                Api.Data.save("dir", dir);
                this.dir = dir;
                this.contents = { folders, media };
                update(this.contents);
            });

            return;
        }

        fs.readdir(fullPath, { withFileTypes: true }, (err, files) => {
            if(err) {
                Api.Logger.error(err);
                BdApi.UI.showToast(`ImageFolder: Failed to load ./${dir}`, { type: "error" });
                return;
            }

            Api.Data.save("dir", dir);
            this.dir = dir;

            // The BD polyfill is weird, .isDirectory just doesn't exist
            if(files.length === 0) {
                this.contents = { folders, media };
                update(this.contents);
                return;
            }
            let typeSymbol = Object.getOwnPropertySymbols(files[0])[0];

            for(let file of files) {
                if((file as any)[typeSymbol] === 2) {
                    folders.push({ name: file.name });
                    continue;
                }

                // Determine what type the file is
                const info = this.getInfo(file.name);
                if(!info) continue;
                const [type, mime] = info;

                const stat = fs.statSync(path.join(fullPath, file.name));

                let lastUsed: number = Api.Data.load(`used-${path.join(this.dir, file.name)}`) ?? 0;
                media.push({
                    name: file.name,
                    size: stat.size,
                    type, mime,
                    lastUsed
                });
            }

            media.sort((a, b) => b.lastUsed - a.lastUsed);

            this.contents = { folders, media };
            update(this.contents);
        });
    }

    static getInfo(name: string): [Media["type"], string] | undefined {
        const ext = name.split(".").pop();
        if(!ext) return;
        return types[ext];
    }

    static deleteMedia(media: Media) {
        const fullPath = path.join(this.base, this.dir, media.name);

        fs.unlink(fullPath, (err) => {
            if(err) {
                Api.Logger.error(err);
                BdApi.UI.showToast(`ImageFolder: Error deleting ${media.name}`, { type: "error" });
                return;
            }
        });
        
        if(!this.contents) return;
        Api.Data.delete(`used-${path.join(this.dir, media.name)}`);
        this.contents.media = this.contents.media.filter((m) => m !== media);
        this.update?.({ ...this.contents });
    }

    static readWhole(media: Media) {
        const fullPath = path.join(this.base, this.dir, media.name);

        return new Promise<Blob | null>((res) => {
            fs.readFile(fullPath, "binary", (err, data) => {
                if(err) {
                    Api.Logger.error(err);
                    return res(null);
                }

                const arr = Uint8Array.from(data, c => c.charCodeAt(0));
                const blob = new Blob([ arr ], { type: media.mime });

                res(blob);
            });
        });
    }

    static async send(media: Media) {
        const blob = await this.readWhole(media);
        if(!blob) return BdApi.UI.showToast(`ImageFolder: Failed to read ${media.name}`, { type: "error" });

        media.lastUsed = Date.now();
        Api.Data.save(`used-${path.join(this.dir, media.name)}`, media.lastUsed);
        this.contents?.media.sort((a, b) => b.lastUsed - a.lastUsed);

        const file = new File([ blob ], media.name);
        await uploadFile(file);
    }

    static createFolder() {
        getInput("Enter folder name", (name) => {
            // create the folder
            if(!this.contents) return;

            try {
                if(this.contents.folders.some(f => f.name === name)) {
                    BdApi.UI.showToast(`ImageFolder: A folder named ${name} already exists`, { type: "error" });
                    return;
                }

                fs.mkdirSync(path.join(this.base, this.dir, name));
                this.contents.folders.push({ name });
                this.update?.({ ...this.contents });
            } catch(e) {
                Api.Logger.error(e);
                BdApi.UI.showToast("ImageFolder: Failed to create folder", { type: "error" });
            }
        });
    }

    static renameFolder(folder: Folder) {
        getInput("Enter new folder name", (name) => {
            if(!this.contents) return;
 
            try {
                fs.renameSync(path.join(this.base, this.dir, folder.name), path.join(this.base, this.dir, name));

                if(!this.contents) return;
                folder.name = name;
                this.update?.({ ...this.contents });
            } catch(e) {
                Api.Logger.error(e);
                BdApi.UI.showToast(`ImageFolder: Failed to rename folder ${folder.name} to ${name}`, { type: "error" });
                return;
            }
        });
    }

    static deleteFolder(folder: Folder) {
        const fullPath = path.join(this.base, this.dir, folder.name);

        fs.rmdir(fullPath, { recursive: true }, (err) => {
            if(err) {
                Api.Logger.error(err);
                BdApi.UI.showToast(`ImageFolder: Error deleting ${folder.name}`, { type: "error" });
                return;
            }

            if(!this.contents) return;
            this.contents.folders = this.contents.folders.filter((f) => f !== folder);
            this.update?.({ ...this.contents });
        });
    }

    static async uploadMedia() {
        let input = document.createElement("input");
        input.type = "file";
        input.multiple = true;
        input.accept = Array.from(Object.keys(types)).map(e => "." + e).join(",");
        input.click();

        input.addEventListener("change", async () => {
            if(!input.files) return;
            
            this.addFileList(input.files);
        });
    }

    static async addFileList(files: FileList, subdir?: string) {
        await Promise.allSettled(Array.from(files).map(async (file) => {
            const info = this.getInfo(file.name);
            if(!info) return;
            const [type, mime] = info;

            await this.copyFile(file, subdir);
            if(subdir) return;

            // No need to sort, automatically goes to the top
            this.contents?.media.unshift({
                name: file.name,
                size: file.size,
                type,
                mime,
                lastUsed: Date.now()
            });
        }));

        if(!this.contents) return;
        this.update?.({ ...this.contents });
    }

    static async copyFile(file: File, subdir?: string) {
        // make sure that the file has a name that isn't taken
        let parts = file.name.split(".");
        let base = parts.slice(0, -1).join(".");
        let ext = parts.pop();

        const files = await new Promise<string[] | null>((res) => {
            fs.readdir(path.join(this.base, this.dir, subdir ?? ""), {}, (err, contents) => {
                if(err) {
                    Api.Logger.error(err);
                    res(null);
                    return;
                }

                res(contents as string[]);
            });
        });
        if(!files) {
            Api.UI.showToast("ImageFolder: Failed to copy image since its containing directory could not be read", { type: "error" });
            return;
        }

        let name = file.name;
        let index = 2;
        while(files.includes(name)) name = `${base} (${index++}).${ext}`;

        if(name !== file.name) {
            file = new File([ file ], name, { type: file.type });
        }

        const filePath = path.join(this.base, this.dir, subdir ?? "", file.name);
        const reader = file.stream().getReader();

        await this.readToFile(filePath, reader);

        BdApi.UI.showToast(`Copied ${file.name}`, { type: "success" });
    }

    static async saveImage(url: string) {
        const name = url.split("/").pop()?.split("?").shift() ?? "";
        const mediaPath = path.join(this.saveDir, name);

        let dialog = await BdApi.UI.openDialog({
            mode: "save",
            defaultPath: mediaPath,
            filters: [
                {
                    name: "Media",
                    extensions: Object.keys(types).map(k => "." + k)
                }
            ],
            title: "Save media"
        });

        if(dialog.canceled) return;

        let res = await fetch(url);
        if(!res.body) return;
        let reader = res.body.getReader();
        await this.readToFile(dialog.filePath, reader);

        const dirname = path.dirname(dialog.filePath);
        const basename = path.basename(dialog.filePath);

        this.saveDir = dirname;
        Api.Data.save("saveDir", dirname);
        
        BdApi.UI.showToast(`Downloaded ${basename}`, { type: "success" });
    }

    static async readToFile(path: string, reader: ReadableStreamDefaultReader<Uint8Array>) {
        const writeStream = fs.createWriteStream(path);
        await new Promise((res) => writeStream.once("ready", res));
        
        while(true) {
            const { done, value } = await reader.read();
            if(done) break;

            writeStream.write(value);
        }

        writeStream.close();
    }
}