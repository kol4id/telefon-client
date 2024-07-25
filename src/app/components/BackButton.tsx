import { FC, useContext } from "react";
import { LeftPaneType, LeftPaneTypeContext } from "./LeftPaneManager";

import leftArrow from '../../assets/left-arrow.png'
import styles from '../styles/BackButton.module.css'
interface IProps{
    callback?: ()=>any,
    type: LeftPaneType,
    size?: {w: number, h: number}
}


const BackButton: FC<IProps> = ({type, callback, size = {w: 40, h: 40}}) => {

    const paneType = useContext(LeftPaneTypeContext);

    const handleClick = async() =>{
        if (callback) callback()
        paneType.setPaneType(type)
    }

    return(
        <button className={styles.back_button} style={{height: `${size.h}px`, width: `${size.w}px`}}
            onClick={handleClick}
        >
            <img style={{height: `${size.h - 25}px`, width: `${size.w - 25}px`}} src={leftArrow}></img>
        </button>
    )
}

export default BackButton