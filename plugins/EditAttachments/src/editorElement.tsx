import React from "react";
import Editor from "./editor";
import { HexColorPicker } from "react-colorful";
import ThicknessSlider from "./thickness";
import { Pipette } from "lucide-react";

interface ToolProps extends React.HTMLAttributes<HTMLDivElement> {
    selected: boolean;
    children: React.ReactNode;
}

function Tool({ selected, children, ...rest }: ToolProps) {
    return (
        <div className={`ea-tool ${selected ? "selected" : ""}`} {...rest}>
            { children }
        </div>
    )
}

interface EditorProps {
    url: string;
    onCancel: () => void;
    onConfirm: (blob: Blob | null) => void;
}

export default function EditorElement({ url, onCancel, onConfirm }: EditorProps) {
    const [color, setColor] = React.useState("#aaaaaa");
    const [activeTool, setActiveTool] = React.useState(Editor.tools[0].id);
    const [thicknessSlider, setThicknessSlider] = React.useState(80);
    const [thickness, setThickness] = React.useState(5);
    const [colors, setColors] = React.useState<string[]>([color]);
    const colorUsed = React.useRef(false);
    const canvas = React.useRef<HTMLCanvasElement>(null);

    React.useEffect(() => {
        if(!canvas.current) return;

        Editor.createView(canvas.current, url);
    }, []);

    React.useEffect(() => {
        // Exponential scale for thickness
        const scaled = thicknessSlider / 5 * Math.pow(1.02, thicknessSlider);
        setThickness(Math.floor(scaled));
    }, [thicknessSlider]);

    const onColorUpdate = (hex: string) => {
        if(colorUsed.current) {
            colorUsed.current = false;
            setColors((colors) => [hex, ...colors].slice(0, 4));
        } else {
            setColors((colors) => colors.map((c, i) => i === 0 ? hex : c));
        }
        setColor(hex);
    }

    const panning = React.useRef(false);
    const using = React.useRef(false);
    const picking = React.useRef(false);
    
    const onMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        
        if(e.button === 0) {
            if(picking.current) {
                let hex = Editor.getPixelColor(e.clientX, e.clientY);
                if(hex) onColorUpdate(hex);
                picking.current = false;
                if(canvas.current) canvas.current.style.cursor = "";
            } else if(!using.current) {
                // Start using the tool
                Editor.startUse(e.clientX, e.clientY, color, thickness);
                colorUsed.current = true;
                using.current = true;
            } else if(Editor.tool.useType === "confirm") {
                // Stop using the tool
                Editor.endUse();
                using.current = false;
            }
        } else if(e.button === 1) {
            // Pan with middle mouse button
            e.preventDefault();
            panning.current = true;
        }
    }

    const onMouseDownGlobal = (e: MouseEvent) => {
        if(e.button === 0 && using.current && Editor.tool.useType === "confirm") {
            Editor.endUse();
            using.current = false;
        }
    }

    const onMouseUp = (e: MouseEvent) => {
        panning.current = false;

        if(using.current && Editor.tool.useType === "drag") {
            using.current = false;
            Editor.moveUse(e.clientX, e.clientY, e.shiftKey);
            Editor.endUse();
        }
    }

    const onMouseMove = (e: MouseEvent) => {
        if(picking.current) {
            let hex = Editor.getPixelColor(e.clientX, e.clientY);
            if(hex) onColorUpdate(hex);
        } else if(panning.current) {
            Editor.pan(e.movementX, e.movementY);
        } else if(using.current) {
            Editor.moveUse(e.clientX, e.clientY, e.shiftKey);
        }
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if(using.current) {
            Editor.onKeyPress(e);
        }

        if(e.code === "KeyZ" && e.ctrlKey) Editor.undo();
        else if(e.code === "KeyY" && e.ctrlKey) Editor.redo();
        else if(e.code === "Escape" && picking.current) {
            picking.current = false;
            if(canvas.current) canvas.current.style.cursor = "";
        } else if(e.key === "Shift" && using.current) {
            Editor.changeShiftPressed(true);
        }
    }

    const onKeyUp = (e: KeyboardEvent) => {
        if(e.key === "Shift" && using.current) {
            Editor.changeShiftPressed(false);
        }
    }

    React.useEffect(() => {
        window.addEventListener("mousedown", onMouseDownGlobal);
        window.addEventListener("mouseup", onMouseUp);
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("keyup", onKeyUp);

        return () => {
            window.removeEventListener("mousedown", onMouseDownGlobal);
            window.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("keyup", onKeyUp);
        }
    }, []);

    // Zooming
    const onWheel = (e: React.WheelEvent) => {
        Editor.zoom(e.clientX, e.clientY, e.deltaY);
        if(using.current) Editor.moveUse(e.clientX, e.clientY, e.shiftKey);
    }

    return (
        <div className="ea-editor">
            <div className="ea-interactive">
                <div>
                    <div className="ea-controls">
                        <HexColorPicker color={color} onChange={onColorUpdate} />
                        <div className="ea-colors">
                            <div className="ea-pipette" onClick={() => {
                                if(canvas.current) canvas.current.style.cursor = "crosshair";
                                picking.current = true;
                            }}>
                                <Pipette color="white" size={20} />
                            </div>
                            {colors.map((c, i) => (
                                <div className="ea-color" style={{ backgroundColor: c }}
                                onClick={() => {
                                    colors.splice(i, 1);
                                    setColors([c, ...colors]);
                                    setColor(c);
                                    colorUsed.current = true;
                                }}></div>
                            ))}
                        </div>
                        <ThicknessSlider thickness={thicknessSlider} setThickness={setThicknessSlider} />
                    </div>
                    <div className="ea-tools">
                        {Editor.tools.map((tool) => (
                            <Tool selected={tool.id === activeTool} key={tool.id}
                                onClick={() => {
                                    Editor.setTool(tool.tool);
                                    setActiveTool(tool.id);
                                }}>
                                <tool.icon color="white" />
                            </Tool>
                        ))}
                    </div>
                </div>
                <canvas
                    className="ea-canvas"
                    ref={canvas}
                    onMouseDown={onMouseDown}
                    onWheel={onWheel}
                    width={1920}
                    height={1080}
                />
            </div>
            <div className="ea-footer">
                <button className="bd-button bd-button-link bd-button-color-primary bd-button-medium ea-cancel"
                    onClick={onCancel}>Cancel</button>
                <button className="bd-button bd-button-filled bd-button-color-brand bd-button-medium"
                    onClick={() => Editor.export(onConfirm)}>Confirm</button>
            </div>
        </div>
    )
}