import type { ShapeUse, Use } from "../types";
import Tool from "./tool";

export default abstract class ShapeTool extends Tool<ShapeUse> {
    abstract type: ShapeUse["type"];
    
    onStart(x: number, y: number, color: string, thickness: number) {
        this.currentUse = {
            type: this.type,
            start: { x, y },
            end: { x, y },
            color: color,
            thickness: thickness
        }

        this.applyUse(this.currentUse);
    }

    onMove(x: number, y: number, shiftPressed: boolean) {
        if(shiftPressed) {
            let dx = x - this.currentUse.start.x;
            let dy = y - this.currentUse.start.y;
            let distance = Math.max(Math.abs(dx), Math.abs(dy));
            this.currentUse.end = {
                x: this.currentUse.start.x + Math.sign(dx) * distance,
                y: this.currentUse.start.y + Math.sign(dy) * distance
            }
        } else {
            this.currentUse.end = { x, y };
        }
        
        this.applyUse(this.currentUse);
    }
}