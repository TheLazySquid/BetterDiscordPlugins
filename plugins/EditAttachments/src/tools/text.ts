import type { TextUse, UseMode } from "../types";
import Tool from "./tool";

export default class TextTool extends Tool<TextUse> {
    useType: UseMode = "confirm";

    applyUse(use: TextUse) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.font = `${use.size}px sans-serif`;
        this.ctx.fillStyle = use.color;
        this.ctx.textBaseline = "top";
        this.ctx.fillText(use.text, use.position.x, use.position.y);
    }

    drawOutline(use: TextUse) {
        this.overlayCtx.clearRect(0, 0, this.overlayCanvas.width, this.overlayCanvas.height);
        this.overlayCtx.font = `${use.size}px sans-serif`;
        
        const size = this.overlayCtx.measureText(use.text);
        this.overlayCtx.strokeStyle = use.color;
        this.overlayCtx.lineWidth = 0.1 / this.editor.scale * use.size;

        const padding = 0.25 / this.editor.scale * use.size;
        this.overlayCtx.strokeRect(use.position.x - padding, use.position.y - padding, size.width + padding * 2, use.size + padding * 2);
    }

    onStart(x: number, y: number, color: string, thickness: number) {
        this.currentUse = {
            type: "text",
            position: { x, y },
            text: "",
            color,
            size: thickness
        }

        this.drawOutline(this.currentUse);
    }

    onKeyPress(e: KeyboardEvent) {
        if(e.key === "Backspace") {
            this.currentUse.text = this.currentUse.text.slice(0, -1);
        } else if(e.key.length === 1) {
            this.currentUse.text += e.key;
        }

        this.drawOutline(this.currentUse);
        this.applyUse(this.currentUse);
    }
}