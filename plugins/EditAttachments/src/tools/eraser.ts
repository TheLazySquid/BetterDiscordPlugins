import type { FreehandUse } from "../types";
import FreehandTool from "./freehand";

export default class EraserTool extends FreehandTool {
    compositeOperation: GlobalCompositeOperation = "destination-out";
    type: FreehandTool["type"] = "eraser";

    applyUse(use: FreehandUse) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.lineCap = "round";
        this.ctx.lineJoin = "round";
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = use.thickness;

        // Even with thousands of points this takes <1ms to draw, crazy stuff
        this.ctx.beginPath();
        this.ctx.moveTo(use.points[0], use.points[1]);
        for(let i = 0; i < use.points.length; i += 2) {
            this.ctx.lineTo(use.points[i], use.points[i + 1]);
        }
        this.ctx.stroke();
    }
}