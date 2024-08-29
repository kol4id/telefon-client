import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import { FC, memo, useCallback, useMemo, useRef } from "react";
import Message from "./Message";
import styles from '../styles/MessageList.module.css';
import InfiniteScroll from "./InfiniteScroll";
import { fetchMessages } from "../../store/states/messages";
import { IFetchMessages } from "../api/api";

interface IProps{
    callback: (p1: any, p2: any, p3: any)=>void;
    selected: string
}

const MessagesList: FC<IProps> = memo((props) => {
    const dispatch = useAppDispatch();
    const messageRecords = useSelector((state: RootState) => state.messages.messagesRecords);
    const currentChannelSelected = useSelector((state: RootState) => state.channelsList.currentChannelSelected);
    const user = useSelector((state: RootState) => state.user.userData);

    // const [messageList] = useState<IMessage[]>(messageRecords[currentChannelSelected]);
    // const messageList = useMemo(() => messageRecords[currentChannelSelected], [messageRecords, currentChannelSelected]);
    const messageRecordsRef = useRef(messageRecords);
    const currentChannelSelectedRef = useRef(currentChannelSelected);
    const messageListRef = useRef(messageRecordsRef.current[currentChannelSelectedRef.current]);

    messageRecordsRef.current = messageRecords;
    currentChannelSelectedRef.current = currentChannelSelected;
    messageListRef.current = messageRecordsRef.current[currentChannelSelectedRef.current];

    //NOTE(@kol4id): automaticly add 1ms to start date and remove 1ms to end date
    const fetchMessagesIScroll = async(startD?: Date, endD?: Date) =>{
        const startDate = startD ? new Date(new Date(startD).getTime() + 1) : undefined;
        const endDate = endD ? new Date(new Date(endD).getTime() - 1) : undefined;
        await dispatch(fetchMessages({
            channelId: currentChannelSelectedRef.current,
            limit: 25,
            startDate,
            endDate 
        }))
    }

    const handleFetchMessagesBottom = useCallback(() => {
        fetchMessagesIScroll(messageListRef.current?.[0]?.createdAt);
    }, [currentChannelSelectedRef.current]);

    const handleFetchMessagesTop = useCallback(() => {
        fetchMessagesIScroll(undefined, messageListRef.current?.[messageListRef.current.length - 1]?.createdAt);
    }, [currentChannelSelectedRef.current]);

    //NOTE(@kol4id): inf scroll reversed because list is reversed
    return(
        <section id="message_list_main" className={styles.message_list_main}>
            <InfiniteScroll direction="bottom" callback={handleFetchMessagesBottom}/> 
            {
                messageListRef.current?.map((message, index)=>
                    <div onContextMenu={(event) => props.callback(event, message.id, index)} key={message.id}>
                        <Message message={message} self={message.creatorId === user.id} selected={props.selected === message.id} />
                    </div>                               
                )
            }
            <InfiniteScroll direction="top" callback={handleFetchMessagesTop}/>
        </section>
    )
})
export default MessagesList