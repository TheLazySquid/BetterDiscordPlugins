import type Editor from "../editor";
import type { Use, UseMode } from "../types";

export default abstract class Tool<UseType extends Use> {
    compositeOperation: GlobalCompositeOperation = "source-over";
    useType: UseMode = "drag";
    
    editor: typeof Editor;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    overlayCanvas: HTMLCanvasElement;
    overlayCtx: CanvasRenderingContext2D;
    renderCanvas: HTMLCanvasElement;
    renderCtx: CanvasRenderingContext2D;

    constructor(editor: typeof Editor) {
        this.editor = editor;
        this.canvas = editor.changeCanvas;
        this.ctx = editor.changeCtx;
        this.overlayCanvas = editor.overlayCanvas;
        this.overlayCtx = editor.overlayCtx;
        this.renderCanvas = editor.renderCanvas;
        this.renderCtx = editor.renderCtx;
    }

    currentUse!: UseType;
    abstract applyUse(use: UseType, renderCanvas?: HTMLCanvasElement, renderCtx?: CanvasRenderingContext2D): void;
    abstract onStart(x: number, y: number, color: string, thickness: number): void;
    onMove?(x: number, y: number, shiftPressed: boolean): void;
    onKeyPress?(e: KeyboardEvent): void;
}