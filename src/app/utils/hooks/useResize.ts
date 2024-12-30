import { useEffect, useState } from "react";
import useWindowWidth from "./useWindowSize";
import useMouseDown from "./useMouseDown";
import useMousePosition from "./useMousePosition";

export interface ResizeParams{
    defaultWindowWidth: number,
    minWindowWidth: number,
    maxWindowWidth: number,
}

const useResize = (enabled: boolean, params: ResizeParams, activeResize: boolean = false) => {
    const windowInnerWidth: number = useWindowWidth().width;
    const [currentlyResizing, setCurrentlyResizing] = useState<boolean>(false);
    const [windowWidth, setWindowWidth] = useState<number>(params.defaultWindowWidth);
    const [maxWindowWidth, setMaxWindowWidth] = useState<number>(Math.ceil(windowInnerWidth / params.maxWindowWidth));
    const position = useMousePosition(currentlyResizing);
    const {isMouseDown} = useMouseDown(enabled);
    
    const CorrectPosition = (): number =>{
        if(position.x > maxWindowWidth) return maxWindowWidth;
        if(position.x < params.minWindowWidth) return params.minWindowWidth;

        return position.x;
    }

    const ResizeHandle = () => {
        if (!currentlyResizing) return  

        const width = CorrectPosition();
        setWindowWidth(width);       
    }

    useEffect(()=>{
        setCurrentlyResizing(enabled && isMouseDown)
    }, [isMouseDown])

    useEffect(() => {
        ResizeHandle();
    }, [position, enabled])

    const _activeResize = () =>{
        if (!activeResize) return;

        let newWidth = Math.ceil(windowInnerWidth / params.maxWindowWidth);
        
        if (newWidth < params.minWindowWidth){
            newWidth = params.minWindowWidth;    
        }
        if (windowWidth > newWidth){
            setWindowWidth(newWidth);
        }

        setMaxWindowWidth(newWidth);
    }

    useEffect(() =>{
        _activeResize()
    }, [windowInnerWidth])

    return {windowWidth, currentlyResizing} 
}

export default useResize