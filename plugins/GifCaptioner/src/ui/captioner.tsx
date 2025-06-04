import { getLines } from "$shared/util/canvas";

type OnSubmit = (callback: () => [text: string, size: number]) => void;

export default function Captioner({ width, element, onSubmit }:
    { width: number, element: HTMLElement, onSubmit: OnSubmit }) {
    const React = BdApi.React;
    const [text, setText] = React.useState("");
    const [size, setSize] = React.useState(width / 10);
    const input = React.useRef<HTMLInputElement | null>(null);
    const wrapper = React.useRef<HTMLDivElement | null>(null);
    const canvas = React.useRef<HTMLCanvasElement | null>(null);
    const ctx = React.useRef<CanvasRenderingContext2D | null>(null);

    onSubmit(() => {
        const res: [string, number] = [text || "Enter caption...", size];
        return res;
    });

    const render = () => {
        if(!canvas.current || !ctx.current) return;
        let lines = getLines(ctx.current, text || "Enter caption...", width);
        let captionHeight = lines.length * size + 10; // 5px on top and bottom
        
        // Add the image
        canvas.current.height = captionHeight;
        ctx.current.fillStyle = "white";
        ctx.current.fillRect(0, 0, width, captionHeight);

        // Draw the caption
        ctx.current.textAlign = "center";
        ctx.current.textBaseline = "top";
        ctx.current.font = `${size}px futuraBoldCondensed`;
        ctx.current.fillStyle = "black";
        for(let i = 0; i < lines.length; i++) {
            ctx.current.fillText(lines[i], width / 2, size * i + 5);
        }
    }

    React.useEffect(render, [text, size]);

    React.useEffect(() => {
        setTimeout(() => input.current?.focus(), 100);
        if(!wrapper.current || !canvas.current) return;

        wrapper.current.appendChild(element);
        ctx.current = canvas.current.getContext("2d");
        render();
    }, []);

    return (<div className="gc-captioner" ref={wrapper}>
        <input onChange={(e) => setText(e.target.value)} ref={input}
        className="gc-caption" placeholder="Enter caption..." />
        <div className="gc-fontsize">
            <div>Font size</div>
            <input type="range" min={5} max={200} value={size}
                onChange={(e) => setSize(parseFloat(e.target.value))} />
        </div>
        <canvas width={width} ref={canvas} />
    </div>)
}