import { attachFiles } from "$shared/modules";
import { before } from "$shared/api/patching";
import { addFile } from "./showPopup";
import './styles.css';
import { getMaxFileSize } from "$shared/util/permissions";
import { defaultImageValues, defaultVideoValues } from "./consts";

const attach = attachFiles[0][attachFiles[1]];
before(...attachFiles, ({ args }) => {
    const maxSize = getMaxFileSize();
    const files: File[] = [...args[0]];
    
    // Get any files that will not fit and that we can parse
    // (https://mediabunny.dev/guide/input-formats)
    const videoFormats = ["mp4", "mov", "mkv", "webm"];
    const imageFormats = ["png", "jpg", "jpeg", "webp", "avif"];

    for(let i = 0; i < files.length; i++) {
        if(files[i].size < maxSize) continue;

        const parts = files[i].name.split('.');
        if(parts.length === 1) continue;

        const ext = parts[parts.length - 1];
        const attachFile = (file: File) => attach([ file ], args[1], args[2], args[3]);

        if(videoFormats.includes(ext)) {
            addFile({
                file: files[i],
                type: "video",
                attach: attachFile,
                fullSize: files[i].size,
                maxSize,
                values: defaultVideoValues
            });
    
            files.splice(i, 1);
            i--;
        } else if(imageFormats.includes(ext)) {
            addFile({
                file: files[i],
                type: "image",
                attach: attachFile,
                fullSize: files[i].size,
                maxSize,
                values: defaultImageValues
            });

            files.splice(i, 1);
            i--;
        }
    }

    args[0] = files;
});