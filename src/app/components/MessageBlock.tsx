import { IMessage } from 'app/global/types/Message.dto';
import styles from '../styles/Message.module.css';
import { FC } from 'react';
import MessageMedia from './MessageMedia';
import MessageContent from './message/MessageContent';



interface IProps{
    message: IMessage,
    self: boolean,
}

const MessageBlock: FC<IProps> = (props) =>{
    return(
        <>
            <div className = {styles.message_block}>
                <MessageMedia messageMedia={props.message.mediaUrls!} hasMedia={props.message.hasMedia}/>
                <MessageContent message={props.message} self={props.self}/>
            </div>
        </>
    )
}
export default MessageBlock;