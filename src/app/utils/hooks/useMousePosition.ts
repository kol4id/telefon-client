import { useState, useEffect } from "react";
import { IPosition } from "../interfaces/MousePos";

const useMousePosition = () =>{
    const [position, setPosition] = useState<IPosition>({x: 0, y: 0});

    const HandleMouseMove = (event: MouseEvent): void =>{
        setPosition({x: event.clientX, y: event.clientY});
    }

    useEffect(() => {
        window.addEventListener('mousemove', HandleMouseMove);

        return () => {
            window.removeEventListener('mousemove', HandleMouseMove);
        };
    }, []);

    return position;
};

export default useMousePosition;