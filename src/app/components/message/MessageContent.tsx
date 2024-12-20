import { IMessage } from "app/global/types/Message.dto"
import styles from '../../styles/Message.module.css'
import MessageSendTime from "./MessageSendTime"
import { FC } from "react"

interface IProps{
    message: IMessage,
    self: boolean,
}

const MessageContent:FC<IProps> = ({message, self}) => {

    return(
        <>
            <div className = {styles.message_content}>
                {message.content}
                <MessageSendTime createdAt={message.createdAt} self={self} isRead={message.isRead}/>
            </div>
        </>
    )
}
export default MessageContent