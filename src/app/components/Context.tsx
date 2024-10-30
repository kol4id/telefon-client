import { FC, useState } from "react";
import ReactDOM from "react-dom";

import styles from '../styles/Context.module.css'

interface IProps{
    isOpen: boolean,
    onClose?: () =>void,
    position?: {x: number, y: number},
    children: React.ReactNode,
    overlay?: boolean,
    ancor?: HTMLElement
}

const Context: FC<IProps> = ({isOpen, onClose, position, children, overlay, ancor}) => {
    const [portalElement] = useState<HTMLElement | null>(document.getElementById('portal'))
    
    const contextStyle = {
        top: position?.y ?? '',
        left: position?.x ?? '',
        // transform: position !== undefined || position.y !== undefined ? 'translate(0, 0)' : 'translate(-50%, -50%)',
    };

    const handleContext = (event: React.MouseEvent) =>{
        event.preventDefault();
        onClose?.()
    }

    return (
        <>
        {isOpen && ReactDOM.createPortal(
            <>
                <div className={styles.context_overlay} onClick={onClose} onContextMenu={e => handleContext(e)} style={{display: overlay ? undefined : "none"}}/>
                <div className={styles.context_content} style={contextStyle} onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>
            </>
            ,
            ancor ?? (portalElement || document.body)
        )}
        </>
    );
}

export default Context