import { FC } from 'react';
import styles from '../styles/Spinner.module.css'

interface IProps{
    size: {w: number, h:number}
}

const Spinner: FC<IProps> = ({size}) =>{
    return(
        <div className={styles.spinner} style={{width: `${size.w}px`, height: `${size.h}px`}}></div>
    )
}

export default Spinner;