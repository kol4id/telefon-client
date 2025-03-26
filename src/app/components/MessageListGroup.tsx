import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import { FC, memo, useMemo } from "react";
import styles from '../styles/MessageList.module.css';
import { IMessage } from "app/global/types/Message.dto";
import MessageGroup from "./MessageGroup";
import { fetchExternalUsers } from "store/states/externalUsers";

interface IProps{
    messages: IMessage[],
}

const MessagesListGroup: FC<IProps> = memo((props) => {   
    const user = useSelector((state: RootState) => state.user.userData);
    const currentChat = useSelector((state: RootState) => state.channelsList.currentChat);
    const users = useSelector((state: RootState) => state.externalUsers.users);
    const dispatch = useAppDispatch();

    const selecteMessageId = useSelector((state: RootState) => state.messages.selectedMessageId);

    const grouped = useMemo(()=>{
        const groupedMessages = new Map<number, IMessage[]>();
        let startIndx = 0;
        let prevUser = props.messages?.[startIndx].creatorId;
        let prevData = new Date(props.messages?.[startIndx].createdAt).getTime();

        props.messages.forEach((message, indx) =>{
            //adding 10 mins, to check if messages longer then 10m between each other
            const date = new Date(message.createdAt).getTime() + 600_000;
            if (indx === props.messages.length - 1 || message.creatorId !== prevUser || date - prevData <= 0) {
                groupedMessages.set(startIndx, props.messages.slice(startIndx, indx));
                prevUser = message.creatorId;
                prevData = new Date(message.createdAt).getTime();
                startIndx = indx;
            }
        })

        return groupedMessages;
    }, [props.messages]);

    useMemo(()=>{
        if (currentChat?.id){
            const uniqueUsers = new Set(props.messages.map(message => message.creatorId));
            dispatch(fetchExternalUsers(Array.from(uniqueUsers)))
        }
    },[props.messages])

    return(
        <section id="message_list_main" className={styles.message_list_main}>
            <>
            {
                Array.from(grouped.entries()).map(([_, messages]) => 
                    messages.map((message, index) => (
                        <div
                            onContextMenu={(event) => 
                                event.preventDefault()
                            }
                            key={message.id}
                        >
                            <MessageGroup
                                message={message}
                                self={message.creatorId === user.id}
                                selected={selecteMessageId === message.id}
                                index={index}
                                lastIndex={messages.length - 1}
                                user={users?.find(user => user.id == message.creatorId)}
                            />
                        </div>
                    ))
                )
            }
            </>
        </section>
    )
})
export default MessagesListGroup;