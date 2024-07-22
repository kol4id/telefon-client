import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { FC, memo } from "react";
import Message from "./Message";
import EmptyMessageList from "./EmptyMessageList";
import styles from '../styles/MessageList.module.css'
interface IProps{
    callback: (p1: any, p2: any, p3: any)=>void;
    selected: string
}

const MessagesList: FC<IProps> = memo((props) => {
    const messageRecords = useSelector((state: RootState) => state.messages.messagesRecords);
    const currentChannelSelected = useSelector((state: RootState) => state.channelsList.currentChannelSelected);
    const user = useSelector((state: RootState) => state.user.userData);

    return(
        <section className={styles.message_list_main}>
        {
            messageRecords[currentChannelSelected]?.map((message, index)=>
                <div onContextMenu={(event) => props.callback(event, message.id, index)} key={message.id}>
                    <Message message={message} self={message.creatorId === user.id} selected={props.selected === message.id} />
                </div>                               
            )
        }
        </section>
    )
})

export default MessagesList