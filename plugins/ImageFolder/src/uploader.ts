import { onStart } from "../../../util/bdFuncs";
import { imgAdder, chatKeyHandlers, closeExpressionPicker } from "./constants";

const fs = require('fs')
const { join } = require('path')
const Buffer = require('buffer')

let submitMessage: Function;

onStart(() => {
    BdApi.Patcher.before("ImageFolder", chatKeyHandlers, Object.keys(chatKeyHandlers)[0], (_, args: any) => {
        submitMessage = args[0].submit;
    })
})

export function sendRawImage(name: string, path: string) {
    const contents = fs.readFileSync(join(__dirname, 'imageFolder', path, name), {
        encoding: 'binary'
    }) as string;

    // you would not believe how long it took me to figure this out
    const buff = Buffer.from(contents, 'binary')
    const file = new File([buff], name, { type: 'image/png' })

    sendFile(file)
}

export async function sendProcessedImage(name: string, src: string) {
    if(!name || !src) return

    const img = new Image()
    img.src = src
    await img.decode();

    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    const ctx = canvas.getContext('2d')!
    ctx.drawImage(img, 0, 0)
    
    let parts = name.split(".")
    parts.pop()
    let fileName = parts.join(".") + ".png"

    const blob: Blob = await new Promise(resolve => canvas.toBlob((blob) => resolve(blob!)))
    const file = new File([blob], fileName, { type: 'image/png' })

    sendFile(file)
}

export async function sendFile(file: File) {
    const channelId = location.href.split('/').pop()
    if (!channelId) return
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
    })

    // send the message
    submitMessage()
}