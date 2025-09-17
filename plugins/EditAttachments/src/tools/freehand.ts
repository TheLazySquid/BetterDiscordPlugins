import type { FreehandUse } from "../types";
import Tool from "./tool";

export default abstract class FreehandTool extends Tool<FreehandUse> {
    abstract type: FreehandUse["type"];

    onStart(x: number, y: number, color: string, thickness: number) {
        this.currentUse = {
            type: this.type,
            points: [x, y],
            color,
            thickness
        }

        this.applyUse(this.currentUse);
    }

    onMove(x: number, y: number) {
        this.currentUse.points.push(x, y);
        this.applyUse(this.currentUse);
    }
}