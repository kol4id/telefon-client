import { FC } from "react"

import styles from '../../styles/Message.module.css'
import send from '../../../assets/send.png';
import read from '../../../assets/read.png'
new Image().src = send;
new Image().src = read;

interface IProps{
    self: boolean
    isRead: boolean
}

const MessageReadStatus: FC<IProps> = ({self, isRead}) =>{
    return(
        <>
            {
                self && <img className={styles.read_status} src={isRead ? read : send}></img>
            }
        </>
    )
}
export default MessageReadStatus
