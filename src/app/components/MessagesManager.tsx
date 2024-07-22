import React, { useCallback, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { RootState, useAppDispatch, } from "../../store/store"
import Message from "./Message"
import ModalWrapper from "./ModalWrapper"
import useModal from "../utils/hooks/useModal"
import MessageListModalContent from "./MessageListModalContent"
import InfiniteScroll from "./InfiniteScroll"

import styles from '../styles/MessageList.module.css'
import MessageBroker from "./MessageBroker"
import { messagePushMessage, messageShiftMessage } from "../../store/states/messages"
import { IMessage } from "../global/types/Message.dto"
import { IFetchMessages } from "../api/api"
import MessagesList from "./MessagesList"
import EmptyMessageList from "./EmptyMessageList"

// const api = new API(baseUrl)

const MessagesManager = React.memo(() =>{

    console.log("MessageList rerender")
    
    const dispatch = useAppDispatch();

    const messageRecords = useSelector((state: RootState) => state.messages.messagesRecords);
    const currentChannelSelected = useSelector((state: RootState) => state.channelsList.currentChannelSelected);
    const user = useSelector((state: RootState) => state.user.userData);
    const currentMessageRecordsRef = useRef(messageRecords[currentChannelSelected]);
    
    const [selected, setSelected] = useState<string>('');
    const [isModalOpen, modalPosition, modalContent, openModal, closeModal] = useModal();

    const SelectMessage = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string, index: number): void  =>{   
        event.preventDefault();
        if(selected === id){
            setSelected('');
            closeModal();
        } else {
            setSelected(id);
            openModal(
                <MessageListModalContent message={messageRecords[currentChannelSelected][index]} close={closeModal}/>,
                {x: event.clientX, y: event.clientY}
            );
        }     
    }

    // const fetchMessages = async(args: IFetchMessages, dispatch: any): Promise<void>=>{
    //     // const messages = await api.fetchMessages(args);
    //     // dispatch(messages);
    // }

    const firstElement = useCallback(() => {
        console.log('first')
        const lastMessageIndx = currentMessageRecordsRef.current.length - 1;
                    // fetchMessages({
                    //     channelId: currentChannelSelected,
                    //     limit: 25, 
                    //     endDate: currentMessageRecordsRef.current[lastMessageIndx].createdAt
                    // }, (msg: IMessage[])=>{dispatch(messagePushMessage(msg))})
        // dispatch(fetchMessages({
        //     channelId: currentChannelSelected,
        //     limit: 25, 
        //     endDate: messageRecords[currentChannelSelected][0].createdAt
        // }));
    }, [currentChannelSelected, messageRecords[currentChannelSelected]])

    const lastElement = useCallback(() => {
        console.log(`last`)
        const messageDate = currentMessageRecordsRef.current[0].createdAt;
        // const lastMessageIndx = messageRecords[currentChannelSelected].length - 1;
        // dispatch(fetchMessages({
        //     channelId: currentChannelSelected,
        //     limit: 25, 
        //     startDate: messageRecords[currentChannelSelected][lastMessageIndx].createdAt
        // }));
                    // fetchMessages({
                    //     channelId: currentChannelSelected,
                    //     limit: 25, 
                    //     startDate: messageDate
                    // }, (msg: IMessage[])=>{dispatch(messageShiftMessage(msg))})
    }, [currentMessageRecordsRef.current, messageRecords[currentChannelSelected], currentChannelSelected])

    useEffect(()=>{
        closeModal()
    }, [currentChannelSelected])

    return(
        <div id="transition" style={{display: "flex"}}>
            {
                messageRecords?.[currentChannelSelected]
                ?   <>
                        <InfiniteScroll callback={lastElement}/>
                            <MessageBroker>
                                <MessagesList selected={selected} callback={SelectMessage}/>
                            </MessageBroker>
                        <InfiniteScroll callback={firstElement}/>
                    </>

                :   <EmptyMessageList/>
            }
            <ModalWrapper isModalOpen={isModalOpen} modalPosition={modalPosition} modalContent={modalContent}/>   
        </div>
    )
})
export default MessagesManager


