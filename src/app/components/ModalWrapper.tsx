import React, { useState } from "react"
import { IPosition } from "../global/types/MousePos"
import ReactDOM from "react-dom"

import styles from '../styles/ModalWrapper.module.css'

interface IProps{
    isModalOpen: boolean,
    modalPosition: IPosition,
    modalContent: React.ReactNode
}

const ModalWrapper = (props: IProps) =>{

    const [portalElement] = useState(document.getElementById('portal'))

    const style: React.CSSProperties = {
        top: props.modalPosition.y + 5,
        left: props.modalPosition.x + 5,
    }

    return(
        <React.Fragment>
        {    
            (props.isModalOpen && portalElement) &&
                ReactDOM.createPortal(
                    <div className={styles.modal_wrapper} style={style} onContextMenu={(e) => e.preventDefault()}>
                        {props.modalContent}
                    </div>, portalElement)        
        }
        </React.Fragment>
    )
}

export default ModalWrapper