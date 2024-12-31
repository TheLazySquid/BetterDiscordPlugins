import futura from '$assets/Futura Condensed Extra Bold.otf'
import { sendFile } from '../uploader'
import { onStart, onStop } from '../../../../util/bdFuncs';

const React = BdApi.React;
let font: FontFace = new FontFace('futuraBoldCondensed', futura);

onStart(async () => {
    document.fonts.add(font);
})

onStop(() => {
    document.fonts.delete(font);
})

// https://stackoverflow.com/questions/2936112/text-wrap-in-a-canvas-element
export function getLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
    var words = text.split(" ");
    var lines: string[] = [];
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

export default function AddCaption({ name, src, onSubmit }:
    { name: string, src: string, onSubmit: (fn: () => void) => void}) {
    const canvas = React.useRef<HTMLCanvasElement>(null);

    const [caption, setCaption] = React.useState<string>('');
    const [fontSize, setFontSize] = React.useState<number>(70);

    let baseImage = new Image();
    baseImage.src = src;
    baseImage.decode().then(render);

    const padding = 10;

    onSubmit(async () => {
        render();
        if(!canvas.current) return;
        let parts = name.split(".")
        parts.pop();
        let newName = `${parts.join(".")}-captioned.png`

        const blob: Blob = await new Promise(resolve => canvas.current!.toBlob((blob) => resolve(blob!)))
        const file = new File([blob], newName, { type: 'image/png' })

        sendFile(file)
    })

    function render() {
        if(!canvas.current) return;
        let ctx = canvas.current.getContext('2d')!;
        
        canvas.current.width = baseImage.width;
        ctx.font = `${fontSize}px futuraBoldCondensed`;
        let lines = getLines(ctx, caption, baseImage.width);
        canvas.current.height = baseImage.height + lines.length * fontSize + padding * 2;

        ctx.font = `${fontSize}px futuraBoldCondensed`;
        ctx.fillStyle="white";
        ctx.fillRect(0, 0, canvas.current.width, canvas.current.height);

        ctx.fillStyle="black";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";

        for(let i = 0; i < lines.length; i++) {
            ctx.fillText(lines[i], baseImage.width / 2, i * fontSize + padding);
        }

        // draw the image
        ctx.drawImage(baseImage, 0, lines.length * fontSize + padding * 2, baseImage.width, baseImage.height);
    }

    React.useEffect(render, [caption, fontSize]);

    return (
        <div className='if-caption-creator'>
            <div className="if-caption-settings">
                <input type="text" placeholder='Caption' className="if-caption"
                    onChange={(e) => setCaption(e.target.value)} />
                <label htmlFor="if-font-size">Font Size</label>
                <input
                    id="if-font-size" 
                    type="range" 
                    min="5" 
                    max="400" 
                    defaultValue="70"
                    onChange={(e) => setFontSize(parseFloat(e.target.value))}
                />
            </div>
            <canvas ref={canvas}></canvas>
        </div>
    )
}