import { FC, useState } from "react";
import ReactDOM from "react-dom";

import styles from '../styles/Context.module.css'

interface IProps{
    isOpen: boolean,
    onClose?: () =>void,
    position?: {x: number, y: number},
    children: React.ReactNode;
}

const Context: FC<IProps> = ({isOpen, onClose, position, children}) => {
    const [portalElement] = useState<HTMLElement | null>(document.getElementById('portal'))
    
    const contextStyle = {
        top: position?.y ?? '',
        left: position?.x ?? '',
        // transform: position !== undefined || position.y !== undefined ? 'translate(0, 0)' : 'translate(-50%, -50%)',
    };

    return (
        <>
        {isOpen && ReactDOM.createPortal(
            <div className={styles.context_content} style={contextStyle} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>,
            portalElement || document.body
        )}
        </>
    );
}

export default Context