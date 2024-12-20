import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { FC, memo } from "react";
import Message from "./Message";
import styles from '../styles/MessageList.module.css';
import { IMessage } from "app/global/types/Message.dto";

interface IProps{
    messages: IMessage[],
}

const MessagesList: FC<IProps> = memo((props) => {   
    const user = useSelector((state: RootState) => state.user.userData);
    const selectedMessageId = useSelector((state: RootState)=> state.messages.selectedMessageId);

    return(
        <section id="message_list_main" className={styles.message_list_main}>
            <>
            {
                props.messages.map((message, index)=>
                    <div onContextMenu={(event) => event.preventDefault()} key={message.id}>
                        <Message message={message} self={message.creatorId === user.id} selected={selectedMessageId === message.id} />
                    </div>                               
                )
            }
            </>
        </section>
    )
})
export default MessagesList