import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { FC, memo } from "react";
import Message from "./Message";
import styles from '../styles/MessageList.module.css';
import { IMessage } from "app/global/types/Message.dto";

interface IProps{
    callback: (p1: any, p2: any, p3: any)=>void;
    messages: IMessage[],
    selected: string
}

const MessagesList: FC<IProps> = memo((props) => {   
    const user = useSelector((state: RootState) => state.user.userData);

  
    //NOTE(@kol4id): inf scroll reversed because list is reversed
    return(
        <section id="message_list_main" className={styles.message_list_main}>
            <>
            {
                props.messages.map((message, index)=>
                    <div onContextMenu={(event) => props.callback(event, message.id, index)} key={message.id}>
                        <Message message={message} self={message.creatorId === user.id} selected={props.selected === message.id} />
                    </div>                               
                )
            }
            </>
        </section>
    )
})
export default MessagesList