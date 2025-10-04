import { attachFiles, premiumPermissions } from "$shared/modules";
import { before } from "$shared/api/patching";
import { addFile } from "./compressVideo";
import './styles.css';

console.log(attachFiles);
const attach = attachFiles[0][attachFiles[1]];
before(...attachFiles, ({ args }) => {
    const maxSize = premiumPermissions.getUserMaxFileSize();
    const files: File[] = [...args[0]];
    
    // Get any video files that will not fit and that we can parse
    // (https://mediabunny.dev/guide/input-formats)
    const formats = ["mp4", "mov", "mkv", "webm"];

    for(let i = 0; i < files.length; i++) {
        if(files[i].size < maxSize) continue;

        const parts = files[i].name.split('.');
        if(parts.length === 1) continue;

        const ext = parts[parts.length - 1];
        if(!formats.includes(ext)) continue;

        addFile(files[i], maxSize, (file) => {
            attach([ file ], args[1], args[2], args[3]);
        });

        files.splice(i, 1);
        i--;
    }

    args[0] = files;
});