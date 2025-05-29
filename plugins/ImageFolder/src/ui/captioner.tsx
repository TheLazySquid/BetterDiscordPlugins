import { getLines } from "$shared/util/canvas";
import Manager from "../manager";
import type { Media } from "../types";

export default function Captioner({ media, onCanvas }:
    { media: Media, onCanvas: (canvas: HTMLCanvasElement) => void }) {
    const React = BdApi.React;
    const img = React.useRef<HTMLImageElement | null>(null);
    const [text, setText] = React.useState("");
    const [size, setSize] = React.useState(30);
    const canvas = React.useRef<HTMLCanvasElement | null>(null);
    const ctx = React.useRef<CanvasRenderingContext2D | null>(null);

    const render = () => {
        if(!canvas.current || !ctx.current || !img.current) return;
        let lines = getLines(ctx.current, text || "Enter caption...", img.current.width);
        let captionHeight = lines.length * size + 5; // 5px on top
        
        // Add the image
        canvas.current.height = img.current.height + captionHeight;
        ctx.current.fillStyle = "white";
        ctx.current.fillRect(0, 0, img.current.width, captionHeight);
        ctx.current.drawImage(img.current, 0, captionHeight);

        // Draw the caption
        ctx.current.textAlign = "center";
        ctx.current.textBaseline = "top";
        ctx.current.font = `${size}px futuraBoldCondensed`;
        ctx.current.fillStyle = "black";
        for(let i = 0; i < lines.length; i++) {
            ctx.current.fillText(lines[i], img.current.width / 2, size * i + 5);
        }
    }

    React.useEffect(render, [text, size]);

    React.useEffect(() => {
        if(!canvas.current) return;
        onCanvas(canvas.current);
        ctx.current = canvas.current.getContext("2d");

        let url: string | undefined;

        Manager.readWhole(media).then((blob) => {
            if(!blob) return;
            url = URL.createObjectURL(blob);

            let image = new Image();
            image.src = url;
            image.onload = () => {
                if(!canvas.current) return;
                canvas.current.width = image.width;
                img.current = image;
                setSize(image.width / 10);
                render();
            }
        });

        return () => {
            if(url) URL.revokeObjectURL(url);
        }
    }, []);
    
    return (<div className="if-captioner">
        <input onChange={(e) => setText(e.target.value)} className="if-caption" placeholder="Enter caption..." />
        <div className="if-fontsize">
            <div>
                Font size
            </div>
            <input type="range" min={5} max={200} value={size}
                onChange={(e) => setSize(parseFloat(e.target.value))} />
        </div>
        <canvas ref={canvas} />
    </div>)
}