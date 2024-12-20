import { FC } from "react"
import styles from '../../styles/Message.module.css'
import MessageReadStatus from "./MessageReadStatus";

interface IProps{
    createdAt: Date,
    self: boolean,
    isRead: boolean
}

const MessageSendTime: FC<IProps> = ({createdAt, self, isRead}) =>{

    const hours = String(new Date(createdAt).getHours()).padStart(2, '0');
    const minutes = String(new Date(createdAt).getMinutes()).padStart(2, '0');

    return(
        <>
            <div className={styles.send_time}>
                {`${hours}:${minutes}`}
                <MessageReadStatus isRead={isRead} self={self}/>
            </div>
        </>
    )
}
export default MessageSendTime