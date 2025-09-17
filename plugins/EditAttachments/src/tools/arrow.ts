import type { ShapeUse } from "../types";
import ShapeTool from "./shape";

export default class ArrowTool extends ShapeTool {
    type: ShapeUse["type"] = "arrow";

    applyUse(use: ShapeUse) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.strokeStyle = use.color;
        this.ctx.fillStyle = use.color;
        this.ctx.lineWidth = use.thickness;
        
        // Draw the line of the arrow, slightly shorter to account for the tip
        const angle = Math.atan2(use.end.y - use.start.y, use.end.x - use.start.x);
        const length = Math.hypot(use.end.x - use.start.x, use.end.y - use.start.y) - 15;
        this.ctx.beginPath();
        this.ctx.moveTo(use.start.x, use.start.y);
        this.ctx.lineTo(
            use.start.x + length * Math.cos(angle),
            use.start.y + length * Math.sin(angle)
        );
        this.ctx.stroke();

        // Draw the triangle tip
        const tipLength = 25 + use.thickness;
        const tipAngle = Math.PI / 6;
        this.ctx.beginPath();
        this.ctx.moveTo(use.end.x, use.end.y);
        this.ctx.lineTo(
            use.end.x - tipLength * Math.cos(angle - tipAngle),
            use.end.y - tipLength * Math.sin(angle - tipAngle)
        );
        this.ctx.lineTo(
            use.end.x - tipLength * Math.cos(angle + tipAngle),
            use.end.y - tipLength * Math.sin(angle + tipAngle)
        );
        this.ctx.closePath();
        this.ctx.fill();
    }
}