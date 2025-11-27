import type { CropUse } from "../types";
import Tool from "./tool";

export default class CropTool extends Tool<CropUse> {
    type = "crop";

    applyUse(use: CropUse, renderCanvas = this.renderCanvas, renderCtx = this.renderCtx) {
        const topLeftX = Math.min(use.start.x, use.end.x);
        const topLeftY = Math.min(use.start.y, use.end.y);
        const width = Math.abs(use.end.x - use.start.x);
        const height = Math.abs(use.end.y - use.start.y);

        const data = renderCtx.getImageData(topLeftX, topLeftY, width, height);
        renderCanvas.width = width;
        renderCanvas.height = height;
        renderCtx.putImageData(data, 0, 0);
    }

    onStart(x: number, y: number) {
        this.currentUse = {
            type: "crop",
            start: { x, y },
            end: { x, y }
        }
    }

    onMove(x: number, y: number) {
        const renderStart = this.currentUse.start;
        const renderEnd = { x, y };
        this.currentUse.end = renderEnd;
        
        // Draw a dashed rectangle to show the crop area
        this.overlayCtx.clearRect(0, 0, this.overlayCanvas.width, this.overlayCanvas.height);
        const start = this.editor.getOverlayCoords(renderStart);
        const end = this.editor.getOverlayCoords(renderEnd);

        this.overlayCtx.lineWidth = 5;
        this.overlayCtx.setLineDash([]);
        this.overlayCtx.strokeStyle = "black";
        this.overlayCtx.strokeRect(start.x, start.y, end.x - start.x, end.y - start.y);

        this.overlayCtx.setLineDash([15, 15]);
        this.overlayCtx.strokeStyle = "gray";
        this.overlayCtx.strokeRect(start.x, start.y, end.x - start.x, end.y - start.y);
    }
}