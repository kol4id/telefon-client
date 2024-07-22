import {useState, useEffect} from 'react';
import { IPosition } from '../../global/types/MousePos';


const useMouseDown = (enabled: boolean = false) =>{
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
    const [mouseDownPosition, setMouseDownPosition] = useState<IPosition>({x: 0, y:0});
    
    const HandleMouseClick = (event: MouseEvent): void =>{
        setIsMouseDown(true);
        setMouseDownPosition({x: event.clientX, y: event.clientY});
    }

    useEffect(() =>{
        if (enabled){
            window.addEventListener('mousedown', HandleMouseClick);
            window.addEventListener('mouseup', () => setIsMouseDown(false));
        } else {
            window.removeEventListener('mousedown', HandleMouseClick);
            window.removeEventListener('mouseup', () => setIsMouseDown(false));
        }

        return () => {
            window.removeEventListener('mousedown', HandleMouseClick);
            window.removeEventListener('mouseup', () => setIsMouseDown(false));
        }
    }, [enabled])

    return {isMouseDown, mouseDownPosition};
}

export default useMouseDown;