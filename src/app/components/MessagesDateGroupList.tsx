import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store/store";
import InfiniteScroll from "./InfiniteScroll";
import { FC, memo, useCallback, useRef } from "react";
import { fetchMessages } from "store/states/messages";
import MessagesList from "./MessagesList";

import styles from '../styles/MessageList.module.css'

interface IProps{
    callback: (p1: any, p2: any, p3: any, p4: any)=>void,
    selected: string
}

const getFormattedDate = (date: Date): string => {
    const optionsThisYear: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    const optionsOtherYear: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  
    return date.getFullYear() === new Date().getFullYear()
      ? date.toLocaleDateString(undefined, optionsThisYear)
      : date.toLocaleDateString(undefined, optionsOtherYear);
};

const MessagesDateGroupList: FC<IProps> = memo(({callback, selected}) =>{
    const dispatch = useAppDispatch();
    const messageRecords = useSelector((state: RootState) => state.messages.messageRecords);
    const currentChatSelected = useSelector((state: RootState) => state.channelsList.currentChat);

    const messageRecordsRef = useRef(messageRecords);
    const currentChatSelectedRef = useRef(currentChatSelected!);
    const messageListRef = useRef(messageRecordsRef.current[currentChatSelectedRef.current.id]);

    messageRecordsRef.current = messageRecords;
    currentChatSelectedRef.current = currentChatSelected!;
    messageListRef.current = messageRecordsRef.current[currentChatSelectedRef.current.id];

    const fetchMessagesIScroll = async(startD?: Date, endD?: Date) =>{
        const startDate = startD ? new Date(new Date(startD).getTime() + 1) : undefined;
        const endDate = endD ? new Date(new Date(endD).getTime() - 1) : undefined;
        await dispatch(fetchMessages({
            chatId: currentChatSelectedRef.current ? currentChatSelectedRef.current.id : '',
            limit: 25,
            startDate,
            endDate 
        }))
    }

    const SelectGroup = (groupIndex: number): (p1: any, p2: any, p3: any) =>void  =>{
        const gIndex = groupIndex;
        const selectMessage = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string, index: number) =>{
            callback(event, id, index, gIndex);
        }
        return selectMessage
    }

    const handleFetchMessagesBottom = useCallback(() => {
        fetchMessagesIScroll(messageListRef.current[0].messages[0].createdAt);
    }, [currentChatSelectedRef.current]);

    const handleFetchMessagesTop = useCallback(() => {
        const length = messageListRef.current.length - 1;
        const messagesLength = messageListRef.current[length].messages.length - 1;
        fetchMessagesIScroll(undefined, messageListRef.current?.[length].messages[messagesLength].createdAt);
    }, [currentChatSelectedRef.current]);

    return(
        <>
        <section id="message_list_main" className={styles.message_list_main}>
            <InfiniteScroll direction="bottom" callback={handleFetchMessagesBottom}/> 
            {
                messageListRef.current.map((group, index) =>
                    <section className={styles.message_list_main}>
                        <MessagesList messages={group.messages} selected={selected} callback={SelectGroup(index)}/>
                        <div className={styles.date_string}>
                            <div className={styles.date_box}>{getFormattedDate(group.date)}</div>
                        </div>
                    </section>
                )
            }
            <InfiniteScroll direction="top" callback={handleFetchMessagesTop}/>
        </section>
        </>
    )
})
export default MessagesDateGroupList;