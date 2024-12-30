import {FC, useEffect, useState } from "react"
import { useAppDispatch } from "../../store/store";
import useResize, { ResizeParams } from "../utils/hooks/useResize";
import { Resize } from "../../store/states/width";
import React from "react";
import { SetCursorStyle } from "../../store/states/cursorStyle";

import styles from "../styles/ResizeBar.module.css"
import useWindowSize from "../utils/hooks/useWindowSize";

const ResizeBar: FC = React.memo(() => {
    // console.log('ResizeBar rerender')
    
    const dispatch = useAppDispatch();
    const [isEntered, setIsEntered] = useState(false);
    const windowSize = useWindowSize();

    const resizeParams: ResizeParams = {
        defaultWindowWidth: 300,
        minWindowWidth: 230,
        maxWindowWidth: 3.3,
    }

    const isActive = windowSize.width > 768;

    const {windowWidth, currentlyResizing} = useResize(isActive && isEntered, resizeParams, true);

    useEffect(() => {
        dispatch(Resize(windowWidth));
    }, [windowWidth])

    useEffect(() => {
        dispatch(SetCursorStyle(currentlyResizing ? 'ew-resize' : ''))
    }, [currentlyResizing])

    return(
        <>
        {
            isActive && 
            <div className={styles.resize_bar}
                onMouseEnter={() => setIsEntered(true)}
                onMouseLeave={() => setIsEntered(false)}
            >
            </div>
        }
        </>
    )
})

export default ResizeBar;