import type { ShapeUse } from "../types";
import ShapeTool from "./shape";

export default class RectangleTool extends ShapeTool {
    type: ShapeUse["type"] = "rectangle";

    applyUse(use: ShapeUse) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.strokeStyle = use.color;
        this.ctx.lineWidth = use.thickness;
        this.ctx.strokeRect(use.start.x, use.start.y, use.end.x - use.start.x, use.end.y - use.start.y);
    }
}