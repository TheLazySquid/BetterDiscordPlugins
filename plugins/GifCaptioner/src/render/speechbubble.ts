type Point = [number, number];

// https://stackoverflow.com/a/5634528
function bezierPoint(t: number, start: Point, control: Point, end: Point): Point {
	let x = (1 - t) * (1 - t) * start[0] + 2 * (1 - t) * t * control[0] + t * t * end[0];
	let y = (1 - t) * (1 - t) * start[1] + 2 * (1 - t) * t * control[1] + t * t * end[1];

	// Adjust for stroke width
	return [x, y - 1];
}

export function renderSpeechbubble(ctx: CanvasRenderingContext2D, width: number, height: number,
	tipX: number, tipY: number, tipBase: number) {
	const start: Point = [0, height * 0.1];
	const control: Point = [width * 0.5, height * 0.2];
	const end: Point = [width, height * 0.1];
	
	// Fill the top (gentle arc left to right 10% of the height down)
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(...start);
	ctx.quadraticCurveTo(...control, ...end);
	ctx.lineTo(width, 0);
	ctx.lineTo(0, 0);
	ctx.fillStyle = "white";
	ctx.fill();

	// Add the bottom stroke
	ctx.beginPath();
	ctx.moveTo(...start);
	ctx.quadraticCurveTo(...control, ...end);
	ctx.strokeStyle = "black";
	ctx.lineWidth = 2;
	ctx.stroke();

	// Draw the tip
	const tipWidth = 0.2;
	const base1 = bezierPoint(tipBase, start, control, end);
	const base2 = bezierPoint(tipBase + tipWidth, start, control, end);
	ctx.beginPath();
	ctx.moveTo(...base1);
	ctx.lineTo(tipX, tipY);
	ctx.lineTo(...base2);
	ctx.fillStyle = "white";
	ctx.fill();
	ctx.strokeStyle = "black";
	ctx.lineWidth = 2;
	ctx.stroke();
}