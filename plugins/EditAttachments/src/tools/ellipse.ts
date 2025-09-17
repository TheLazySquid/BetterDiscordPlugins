import type { ShapeUse } from "../types";
import ShapeTool from "./shape";

export default class EllipseTool extends ShapeTool {
    type: ShapeUse["type"] = "ellipse";

    applyUse(use: ShapeUse) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.strokeStyle = use.color;
        this.ctx.lineWidth = use.thickness;
        this.ctx.beginPath();
        this.ctx.ellipse(
            (use.start.x + use.end.x) / 2,
            (use.start.y + use.end.y) / 2,
            Math.abs(use.end.x - use.start.x) / 2,
            Math.abs(use.end.y - use.start.y) / 2,
            0,
            0,
            2 * Math.PI
        );
        this.ctx.stroke();
    }
}