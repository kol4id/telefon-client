
import { FC } from 'react';
import styles from '../../styles/AuthPane.module.css';

interface IProps{
    message: string
}

const ErrorBlock: FC<IProps> = (props) =>{
    return(
        <div className={styles.error_box}>
            {props.message}
        </div>
    )
}
export default ErrorBlock