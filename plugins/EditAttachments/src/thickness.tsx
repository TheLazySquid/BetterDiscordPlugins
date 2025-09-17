import React from "react";

interface ThicknessSliderProps {
    thickness: number;
    setThickness: (thickness: number) => void;
}

const max = 120;

export default function ThicknessSlider({ thickness, setThickness }: ThicknessSliderProps) {
    const dragging = React.useRef(false);
    const svg = React.useRef<SVGSVGElement>(null);
    const rect = React.useRef<DOMRect | null>(null);

    const onMouseDown = () => {
        if(!svg.current) return;
        dragging.current = true;
        rect.current = svg.current.getBoundingClientRect();
    }

    const onMouseMove = (e: MouseEvent) => {
        if(!dragging.current || !rect.current) return;
        const x = e.clientX - rect.current.left;
        const percent = x / rect.current.width;
        setThickness(Math.max(1, Math.min(max, Math.round(percent * max))));
    }

    const onMouseUp = () => {
        dragging.current = false;
    }

    React.useEffect(() => {
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        }
    }, []);

    return (
        <div className="ea-thickness">
            <svg width="120" height="24" xmlns="http://www.w3.org/2000/svg" overflow="visible" ref={svg}>
                <path d="M0 12 L120 4 L120 20 Z" fill="#999999" />
                <circle
                    r="10" cx={thickness} cy={12} fill="#cccccc"
                    stroke="white" strokeWidth="2" cursor="ew-resize"
                    onMouseDown={onMouseDown}
                />
            </svg>
            {/* <input type="number" value={thickness} onChange={(e) => setThickness(Math.max(1, parseFloat(e.target.value)))} /> */}
        </div>
    )
}