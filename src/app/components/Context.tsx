import { FC, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

import styles from '../styles/Context.module.css';

interface IProps{
    isOpen: boolean,
    onClose?: () =>void,
    position?: {x: number, y: number},
    children: React.ReactNode,
    overlay?: boolean,
    ancor?: HTMLElement | null
}

const Context: FC<IProps> = ({isOpen, onClose, position = {x:0, y:0}, children, overlay, ancor}) => {
    const [portalElement] = useState<HTMLElement | null>(document.getElementById('portal'))
    const contextRef = useRef<HTMLDivElement | null>(null);
    const [contextStyle, setContextStyle] = useState<{ top: number; left: number }>({
        top: position.x,
        left: position.y,
    });

    const handleClose = () => {
        onClose?.();
    };

    const handleContext = (event: React.MouseEvent) =>{
        event.preventDefault();
        handleClose()
    }

    useEffect(() => {
        if (!isOpen || !contextRef.current) return;
        
        const bodyRect = document.body.getBoundingClientRect();
        const contextRect = contextRef.current.getBoundingClientRect();

        const contextRightBorderPos = position.x + contextRect.width;
        const contextBottomBorderPos = position.y + contextRect.height;

        const newXPos = contextRightBorderPos >= bodyRect.width
          ? position.x - (contextRightBorderPos - (bodyRect.width - 10))
          : position.x;
    
        const newYPos = contextBottomBorderPos >= (bodyRect.height - 50)
          ? position.y - (contextBottomBorderPos - (bodyRect.height - 70))
          : position.y;

        setContextStyle({top: newYPos, left: newXPos});
    }, [isOpen, position]);

    if (!isOpen) return null;

    const content = (
    <>
        <div className={styles.context_overlay} onClick={handleClose} onContextMenu={e => handleContext(e)} style={{ display: overlay ? "block" : "none" }}/>
        <div className={styles.context_content} style={contextStyle} onClick={(e) => e.stopPropagation()} ref={contextRef}>
            {children}
        </div>
    </>
    );

    return ReactDOM.createPortal(content, ancor ?? (portalElement || document.body));
}

export default Context