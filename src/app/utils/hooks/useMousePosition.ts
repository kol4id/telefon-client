import { useState, useEffect } from "react";
import { IPosition } from "../interfaces/MousePos";

const useMousePosition = (enabled: boolean = false) =>{
    const [position, setPosition] = useState<IPosition>({x: 0, y: 0});

    const HandleMouseMove = (event: MouseEvent): void =>{
        setPosition({x: event.clientX, y: event.clientY});
    }

    useEffect(() => {
        if (enabled){
            window.addEventListener('mousemove', HandleMouseMove);
        } else {
            window.removeEventListener('mousemove', HandleMouseMove);
        }

        return () => {
            window.removeEventListener('mousemove', HandleMouseMove);
        };
    }, [enabled]);

    return position;
};

export default useMousePosition;