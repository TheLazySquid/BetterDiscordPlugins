import type { LucideProps } from "lucide-react";
import type Tool from "./tools/tool";

export interface Point {
    x: number;
    y: number;
}

export interface ToolInfo {
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    id: string;
    tool: Tool<any>;
}

export interface ShapeUse {
    type: "rectangle" | "ellipse" | "arrow";
    start: Point;
    end: Point;
    color: string;
    thickness: number;
}

export interface FreehandUse {
    // [x, y, x2, y2, etc] to save memory
    type: "pen" | "eraser";
    points: number[];
    color: string;
    thickness: number;
}

export interface CropUse {
    type: "crop";
    start: Point;
    end: Point;
}

export interface TextUse {
    type: "text";
    position: Point;
    text: string;
    color: string;
    size: number;
}

export type Use = ShapeUse | FreehandUse | CropUse | TextUse;

export type UseMode = "drag" | "confirm";