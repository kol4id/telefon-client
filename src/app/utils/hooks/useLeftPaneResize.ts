import { useState, useEffect} from "react";
import useMousePosition from "./useMousePosition";
import useMouseDown from "./useMouseDown";
import useWindowWidth from "./useWindowWidth";
import { Resize } from "../../../store/states/width";
import { useDispatch } from "react-redux";
import { IPosition } from "../interfaces/MousePos";



// return {bool, bool}
const useLeftPaneResize = () =>{

    const dispatch = useDispatch();
    const width: number = useWindowWidth();
    const {isMouseDown, mouseDownPosition} = useMouseDown();
    const mousePos: IPosition = useMousePosition();

    // pixel unit offset {see @@Resize}
    const RESIZEOFFSET: number = 2;
    // minimum width of left pane
    // narrow than this will provide too 
    // little information about the channels
    const MINWINDOWWIDTH: number = 200;

    // default left pane width = 300px, u can get this info
    // from store/width, but it make horrible performance 
    const [windowWidth, setWindowWidth] = useState<number>(300);
    const [currentlyResizing, setCurrentlyResizing] = useState<boolean>(false);

    // maximum width of left pane ~ 33% of whole BROWSER window space 
    const [maxWindowWidth, setMaxWindowWidth] = useState<number>(Math.ceil(width / 3.3))
    const [inResizePosition, setInResizePosition] = useState<boolean>(false);
    
    // checking for exceeding the limits of 
    // the maximum and minimum window width without offset
    const CorrectPosition = (): number =>{
        if (mousePos.x < MINWINDOWWIDTH){
            return MINWINDOWWIDTH;
        } else if ( mousePos.x > maxWindowWidth){
            return maxWindowWidth;
        } else {
            return mousePos.x;
        }
    }

    // resize state lock/unlock && resize logic implementation
    // lock resize state when clicked inside resize area
    // unlock resize state when user stop holding mouseButton
    useEffect(()=>{
        let isCurrentlyResizing: boolean = currentlyResizing;
        if (!isMouseDown){ 
            isCurrentlyResizing = false;
        }
        //@@Resize 
        //check current pointer position, if it close enouth
        //to vertical resize bar between left and middle panel
        //+- offset to make it easier to get into the resizeArea
        //if all ok, lock resize state on user click & hold 
        if (mousePos.x > windowWidth - RESIZEOFFSET &&
            mousePos.x < windowWidth + RESIZEOFFSET){
            setInResizePosition(true);
            if (isMouseDown){
                isCurrentlyResizing = true;
            }
        } else {
            setInResizePosition(false);
        }
        
        if (isCurrentlyResizing){ 
            const width = CorrectPosition();
            setWindowWidth(width);
            dispatch(Resize(width));
        }
        setCurrentlyResizing(isCurrentlyResizing);
    }, [mousePos, mouseDownPosition])


    // resize on page zoom+-
    useEffect(() =>{
        let newWidth = Math.ceil(width / 3.3);
        if (newWidth < MINWINDOWWIDTH){
            newWidth = MINWINDOWWIDTH;    
        }

        setMaxWindowWidth(newWidth);
        if (windowWidth > newWidth){
            setWindowWidth(newWidth);
            dispatch(Resize(newWidth));
        }
    }, [width])

    return {inResizePosition, currentlyResizing};
}

export default useLeftPaneResize;