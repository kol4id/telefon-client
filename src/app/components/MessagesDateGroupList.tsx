import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store/store";
import InfiniteScroll from "./InfiniteScroll";
import { FC, useCallback, useRef, useEffect } from "react";
import { fetchMessages, IMessageDateGroup } from "store/states/messages";
import MessagesList from "./MessagesList";

import styles from '../styles/MessageList.module.css';
import MessagesListGroup from "./MessageListGroup";
import { IChannel } from "app/global/types/Channel.dto";
import { getFormattedDate } from "../utils/general/getFormatedDate";

const MessagesDateGroupList: FC = () => {
    const dispatch = useAppDispatch();

    const messageRecords = useSelector((state: RootState) => state.messages.messageRecords);
    const currentChatSelected = useSelector((state: RootState) => state.channelsList.currentChat);
    const currentChannel = useSelector((state: RootState) => state.channelsList.currentChannel);

    const messageRecordsRef = useRef(messageRecords);
    const currentChatSelectedRef = useRef(currentChatSelected);

    useEffect(() => {
        messageRecordsRef.current = messageRecords;
        currentChatSelectedRef.current = currentChatSelected;
    }, [messageRecords, currentChatSelected]);

    const getProperMessageList = (channel: IChannel, group: IMessageDateGroup) =>{
        switch(channel.channelType){
            case 'user': return <MessagesList messages={group.messages}  />
            case 'group': return <MessagesListGroup messages={group.messages}/>
        }
    }

    const fetchMessagesIScroll = useCallback(async (startD?: Date, endD?: Date) => {
        const startDate = startD ? new Date(new Date(startD).getTime() + 1) : undefined;
        const endDate = endD ? new Date(new Date(endD).getTime() - 1) : undefined;
        const chatId = currentChatSelectedRef.current?.id || "";

        await dispatch(fetchMessages({chatId, limit: 25, startDate, endDate}));
    }, []);

    const handleFetchMessage = useCallback ((position: | 'top' | 'bottom')=>{
        const message = messageRecordsRef.current[currentChatSelectedRef.current?.id || ""];
        position == 'top'
        ?   fetchMessagesIScroll(undefined, message.at(-1)?.messages.at(-1)?.createdAt)
        :   fetchMessagesIScroll(message[0].messages[0].createdAt)
    }, []) 

    return (
        <section id="message_list_main" className={styles.message_list_main}>
            <InfiniteScroll direction="bottom" callback={() => handleFetchMessage('bottom')} />
            {/*NOTE(@kol4id): inf scroll reversed because list is reversed */}   
            {
                messageRecords[currentChatSelected?.id || ""].map((group) =>
                    <section className={styles.message_list_main} key={group.date.toISOString()}>
                        {getProperMessageList(currentChannel, group)}
                        <div className={styles.date_string}>
                            <div className={styles.date_box}>{getFormattedDate(group.date)}</div>
                        </div>
                    </section>
                )
            }
            <InfiniteScroll direction="top" callback={() =>handleFetchMessage('top')} />
        </section>
    );
};

export default MessagesDateGroupList;
