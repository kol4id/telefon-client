import { FC, useState } from "react";
import ReactDOM from "react-dom";

import styles from '../styles/ModalProvider.module.css'

interface IProps{
    isOpen: boolean,
    onClose?: () =>void,
    position?: {x: number, y: number},
    children: React.ReactNode;
}

const Modal: FC<IProps> = ({isOpen, onClose, position, children}) => {
    const [portalElement] = useState<HTMLElement | null>(document.getElementById('portal'))
    
    const modalStyle = {
        top: position?.y ?? '',
        left: position?.x ?? '',
        // transform: position !== undefined || position.y !== undefined ? 'translate(0, 0)' : 'translate(-50%, -50%)',
    };

    return (
        <>
        {isOpen && ReactDOM.createPortal(
            <div className={styles.modal_overlay} onClick={onClose}>
                <div className={styles.modal_content} style={modalStyle} onClick={(e) => e.stopPropagation()}>
                {/* <button className="modal-close" onClick={closeModal}>×</button> */}
                {children}
                </div>
            </div>,
            portalElement || document.body
        )}
        </>
    );
}

export default Modal