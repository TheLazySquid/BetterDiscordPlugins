import type { OnSubmit } from "../render/gifRenderer";
import { renderSpeechbubble } from "../render/speechbubble";

export default function SpeechBubbler({ width, height, element, onSubmit }:
	{ width: number, height: number, element: HTMLElement, onSubmit: OnSubmit }) {
	const React = BdApi.React;
	const [tipX, setTipX] = React.useState(width / 3);
	const [tipY, setTipY] = React.useState(height / 3);
	const [tipBase, setTipBase] = React.useState(10);
	const wrapper = React.useRef<HTMLDivElement | null>(null);
    const canvas = React.useRef<HTMLCanvasElement | null>(null);
	const ctx = React.useRef<CanvasRenderingContext2D | null>(null);

	onSubmit(() => ({
		type: "speechbubble",
		tipX, tipY,
		tipBase: tipBase / 100,
	}));

	const render = () => {
		if(!ctx.current) return;
		ctx.current.clearRect(0, 0, width, height);
		renderSpeechbubble(ctx.current, width, height, tipX, tipY, tipBase / 100);
	}

	const moveTip = (e: React.MouseEvent<HTMLCanvasElement>) => {
		if(!canvas.current) return;
		const rect = canvas.current.getBoundingClientRect();
		const x = (e.clientX - rect.left) / rect.width * width;
		const y = (e.clientY - rect.top) / rect.height * height;
		setTipX(x);
		setTipY(y);
	}

    React.useEffect(render, [tipX, tipY, tipBase]);

	React.useEffect(() => {
        if(!wrapper.current || !canvas.current) return;

        wrapper.current.insertBefore(element, canvas.current);
        ctx.current = canvas.current.getContext("2d");
        render();
    }, []);

	return (
		<div className="gc-editor">
            <div className="gc-range">
                <div>Tip Base Position</div>
                <input type="range" min={0} max={80} value={tipBase}
                    onChange={(e) => setTipBase(parseFloat(e.target.value))} />
            </div>
			<div className="gc-speechbubbler" ref={wrapper}>
				<canvas width={width} height={height} onClick={moveTip} ref={canvas} />
			</div>
		</div>
	)
}