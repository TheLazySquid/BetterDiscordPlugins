import type Tool from "./tools/tool";
import type { Point, ToolInfo, Use } from "./types";
import RectangleTool from "./tools/rectangle";
import { RectangleHorizontal, Circle, MoveUpRight, Pen, Crop, Type, Eraser } from "lucide-react"
import EraserTool from "./tools/eraser";
import EllipseTool from "./tools/ellipse";
import ArrowTool from "./tools/arrow";
import PenTool from "./tools/pen";
import CropTool from "./tools/crop";
import TextTool from "./tools/text";

export default class Editor {
    static tools: ToolInfo[] = [];
    static tool: Tool<any>;

    // What is displayed on the screen
    static viewCanvas: HTMLCanvasElement;
    static viewCtx: CanvasRenderingContext2D;
    // What the next tool usage is drawn ontol
    static changeCanvas: HTMLCanvasElement;
    static changeCtx: CanvasRenderingContext2D;
    // The image being edited
    static renderCanvas: HTMLCanvasElement;
    static renderCtx: CanvasRenderingContext2D;
    // The base image before the past 50 edits, used for undo
    static baseCanvas: HTMLCanvasElement;
    static baseCtx: CanvasRenderingContext2D;
    // Overlays drawn on top of the view canvas, eg text cursor
    static overlayCanvas: HTMLCanvasElement;
    static overlayCtx: CanvasRenderingContext2D;

    static panX = 0;
    static panY = 0;
    static scale = 1;
    
    static maxUndos = 50;
    static undoStack: Use[] = [];
    static redoStack: Use[] = [];

    static export(callback: (blob: Blob | null) => void) {
        this.renderCanvas.toBlob(callback);
    }

    static init() {
        this.renderCanvas = document.createElement("canvas");
        this.renderCtx = this.renderCanvas.getContext("2d")!;
        
        this.baseCanvas = document.createElement("canvas");
        this.baseCtx = this.baseCanvas.getContext("2d")!;

        this.changeCanvas = document.createElement("canvas");
        this.changeCtx = this.changeCanvas.getContext("2d")!;

        this.overlayCanvas = document.createElement("canvas");
        this.overlayCtx = this.overlayCanvas.getContext("2d")!;

        this.tools = [
            { icon: Pen, id: "pen", tool: new PenTool(this) },
            { icon: RectangleHorizontal, id: "rectangle", tool: new RectangleTool(this) },
            { icon: Circle, id: "ellipse", tool: new EllipseTool(this) },
            { icon: MoveUpRight, id: "arrow", tool: new ArrowTool(this) },
            { icon: Type, id: "text", tool: new TextTool(this) },
            { icon: Eraser, id: "eraser", tool: new EraserTool(this) },
            { icon: Crop, id: "crop", tool: new CropTool(this) }
        ];
        this.tool = this.tools[0].tool;
    }

    static async createView(viewCanvas: HTMLCanvasElement, url: string) {
        this.viewCanvas = viewCanvas;
        this.viewCtx = viewCanvas.getContext("2d")!;

        this.overlayCanvas.width = this.viewCanvas.width;
        this.overlayCanvas.height = this.viewCanvas.height;

        const img = new Image();
        img.onload = () => {
            URL.revokeObjectURL(url);
            this.renderCanvas.width = img.width;
            this.renderCanvas.height = img.height;
            this.baseCanvas.width = img.width;
            this.baseCanvas.height = img.height;
            this.changeCanvas.width = img.width;
            this.changeCanvas.height = img.height;

            this.baseCtx.drawImage(img, 0, 0);
            this.renderCtx.drawImage(img, 0, 0);
            this.drawView();
        }
        img.onerror = () => URL.revokeObjectURL(url);
        img.src = url;
    }

    static setTool(tool: Tool<any>) {
        this.tool = tool;
    }

    static pan(dx: number, dy: number) {
        const factor = this.viewCanvas.width / this.viewCanvas.clientWidth;
        
        this.panX += dx * factor;
        this.panY += dy * factor;

        this.tool.onCameraMove?.();
        this.drawView();
    }

    /* Converts window coordinates coordinates relative to the view canvas */
    static getViewCoords(x: number, y: number) {
        const factor = this.viewCanvas.width / this.viewCanvas.clientWidth;
        const rect = this.viewCanvas.getBoundingClientRect();
        const viewX = (x - rect.left) * factor;
        const viewY = (y - rect.top) * factor;
        
        return { x: viewX, y: viewY };
    }

    /* Converts window coordinates coordinates relative to the render canvas */
    static getRenderCoords(x: number, y: number) {
        const viewCoords = this.getViewCoords(x, y);
        const renderX = (viewCoords.x - this.panX) / this.scale;
        const renderY = (viewCoords.y - this.panY) / this.scale;

        return { x: renderX, y: renderY };
    }

    /* Converts coordinates relative to the render canvas into coordinates relative to the overlay */
    static getOverlayCoords(coords: Point) {
        const overlayX = coords.x * this.scale + this.panX;
        const overlayY = coords.y * this.scale + this.panY;

        return { x: overlayX, y: overlayY };
    }

    static zoom(x: number, y: number, dy: number) {
        const viewCoords = this.getViewCoords(x, y);
        const renderX = (viewCoords.x - this.panX) / this.scale;
        const renderY = (viewCoords.y - this.panY) / this.scale;
        
        const scaleMultiplier = dy < 0 ? 1.1 : 1 / 1.1;
        this.scale *= scaleMultiplier;

        // Keep the point under the cursor stationary
        this.panX = viewCoords.x - renderX * this.scale;
        this.panY = viewCoords.y - renderY * this.scale;
        
        this.tool.onCameraMove?.();
        this.drawView(); 
    }

    static drawView() {        
        // draw a gray background where the render canvas is not
        this.viewCtx.fillStyle = "#444";
        this.viewCtx.fillRect(0, 0, this.viewCanvas.width, this.viewCanvas.height);
        this.viewCtx.save();
        this.viewCtx.setTransform(this.scale, 0, 0, this.scale, this.panX, this.panY);
        this.viewCtx.clearRect(0, 0, this.renderCanvas.width, this.renderCanvas.height);

        // Draw the render canvas
        this.viewCtx.globalCompositeOperation = "source-over";
        this.viewCtx.drawImage(this.renderCanvas, 0, 0);

        // Draw what the change will be
        this.viewCtx.globalCompositeOperation = this.tool.compositeOperation;
        this.viewCtx.drawImage(this.changeCanvas, 0, 0);
        this.viewCtx.restore();
        
        // Draw any overlays
        this.viewCtx.globalCompositeOperation = "source-over";
        this.viewCtx.drawImage(this.overlayCanvas, 0, 0);
    }

    static lastCoords: Point = { x: 0, y: 0 };
    static startUse(x: number, y: number, color: string, thickness: number) {
        if(!this.tool) return;

        this.redoStack = [];
        
        const renderCoords = this.getRenderCoords(x, y);
        this.lastCoords = renderCoords;
        this.tool.onStart(renderCoords.x, renderCoords.y, color, thickness);
        this.drawView();
    }

    static moveUse(x: number, y: number, shiftPressed: boolean) {
        if(!this.tool || this.tool.useType !== "drag") return;

        const renderCoords = this.getRenderCoords(x, y);
        this.lastCoords = renderCoords;
        this.tool.onMove?.(renderCoords.x, renderCoords.y, shiftPressed);
        this.drawView();
    }

    static changeShiftPressed(shiftPressed: boolean) {
        if(!this.tool) return;
        this.tool.onMove?.(this.lastCoords.x, this.lastCoords.y, shiftPressed);
        this.drawView();
    }

    static endUse() {
        if(!this.tool) return;
        
        // Re-draw the use so that there's no surprises when undoing/redoing
        const use = this.tool.currentUse;
        this.tool.applyUse(use);

        this.renderCtx.globalCompositeOperation = this.tool.compositeOperation;
        this.renderCtx.drawImage(this.changeCanvas, 0, 0);
        this.changeCtx.clearRect(0, 0, this.changeCanvas.width, this.changeCanvas.height);
        this.overlayCtx.clearRect(0, 0, this.overlayCanvas.width, this.overlayCanvas.height);
        
        // Cap undo stack at 50
        this.undoStack.push(use);
        if(this.undoStack.length > this.maxUndos) {
            let use = this.undoStack.shift()!;
            let compositeOperation = this.useTool(use, this.baseCanvas, this.baseCtx);
            this.baseCtx.globalCompositeOperation = compositeOperation;
            this.baseCtx.drawImage(this.changeCanvas, 0, 0);
            this.changeCtx.clearRect(0, 0, this.changeCanvas.width, this.changeCanvas.height);
        }

        this.drawView();
    }

    static undo() {
        let use = this.undoStack.pop();
        if(!use) return;
        this.redoStack.push(use);

        // Render out everything again from the base
        if(this.renderCanvas.width !== this.baseCanvas.width || this.renderCanvas.height !== this.baseCanvas.height) {
            this.renderCanvas.width = this.baseCanvas.width;
            this.renderCanvas.height = this.baseCanvas.height;
        } else {
            this.renderCtx.clearRect(0, 0, this.renderCanvas.width, this.renderCanvas.height);
        }

        this.renderCtx.globalCompositeOperation = "source-over";
        this.renderCtx.drawImage(this.baseCanvas, 0, 0);
        for(const use of this.undoStack) {
            let compositeOperation = this.useTool(use);
            this.renderCtx.globalCompositeOperation = compositeOperation;
            this.renderCtx.drawImage(this.changeCanvas, 0, 0);
        }
        
        this.changeCtx.clearRect(0, 0, this.changeCanvas.width, this.changeCanvas.height);
        this.drawView();
    }

    static redo() {
        let use = this.redoStack.pop();
        if(!use) return;
        this.undoStack.push(use);

        let compositeOperation = this.useTool(use);
        this.renderCtx.globalCompositeOperation = compositeOperation;
        this.renderCtx.drawImage(this.changeCanvas, 0, 0);
        this.changeCtx.clearRect(0, 0, this.changeCanvas.width, this.changeCanvas.height);
        this.drawView();
    }

    static useTool(use: Use, renderCanvas?: HTMLCanvasElement, renderCtx?: CanvasRenderingContext2D): GlobalCompositeOperation {
        const tool = this.tools.find(t => t.id === use.type)?.tool;
        if(!tool) return "source-over";

        tool.applyUse(use, renderCanvas, renderCtx);
        return tool.compositeOperation;
    }

    static getPixelColor(x: number, y: number) {
        const renderCoords = this.getRenderCoords(x, y);
        if(renderCoords.x < 0 || renderCoords.x >= this.renderCanvas.width || 
            renderCoords.y < 0 || renderCoords.y >= this.renderCanvas.height) return null;
        
        const data = this.renderCtx.getImageData(renderCoords.x, renderCoords.y, 1, 1).data;
        return `#${(data[0] << 16 | data[1] << 8 | data[2]).toString(16).padStart(6, '0')}`;
    }

    static onKeyPress(e: KeyboardEvent) {
        this.tool.onKeyPress?.(e);
        this.drawView();
    }
}