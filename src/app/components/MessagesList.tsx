import React, { useCallback, useEffect, useRef, useState} from "react"
import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "../../store/store"
import Message from "./Message"
import ModalWrapper from "./ModalWrapper"
import useModal from "../utils/hooks/useModal"
import MessageListModalContent from "./MessageListModalContent"
import InfiniteScroll from "./InfiniteScroll"

import styles from '../styles/MessageList.module.css'
import { ClearLastReadQueue } from "../../store/states/messages"
import { IMessage } from "../utils/interfaces/Message.dto"

const MessagesList = React.memo(() =>{

    console.log("MessageList rerender")

    const dispatch = useAppDispatch();

    const messageRecords = useSelector((state: RootState) => state.messages.messagesRecords);
    const currentChannelSelected = useSelector((state: RootState) => state.channelsList.currentChannelSelected);
    const userId = useSelector((state: RootState) => state.user.userData.id);
    // const lastReadsQueue = useSelector((state: RootState) => state.messages.lastReadsQueue);

    // const [lastReadQ, setLastReadQ] = useState<IMessage[]>([]);
    
    const [selected, setSelected] = useState<string>('');
    const [isModalOpen, modalPosition, modalContent, openModal, closeModal] = useModal();

    // const handleObserve = useCallback((message: IMessage) =>{
    //     console.log(`message ${message.id} has been read`)
    //     setLastReadQ([...lastReadQ, message]);
    // }, [])

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

    const firstElement = () => {
        console.log('first')
    }

    const lastElement = () => {
        console.log('last')
    }

    useEffect(()=>{
        closeModal()
    }, [currentChannelSelected])

    // useEffect(()=>{
    //     let intervalId: number;
    //     if(lastReadsQueue.length){
    //         intervalId = setInterval(()=>{
    //             console.log('asdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd')
    //             setLastReadQ([]);
    //             // dispatch(ClearLastReadQueue());
    //         }, 500)
    //     }
    //     return () => clearInterval(intervalId);
    // }, [lastReadsQueue])

    return(
        <div id="transition" className={styles.message_list_main}>
            <InfiniteScroll callback={lastElement}/>
            {
                messageRecords[currentChannelSelected].map((message, index)=>
                    <div onContextMenu={(event) => SelectMessage(event, message.id, index)}>
                        <Message message={message} self={message.creatorId === userId} selected={selected === message.id} key={message.id}/>
                    </div>                               
                )
            } 
            <InfiniteScroll callback={firstElement}/>
        {
            <ModalWrapper isModalOpen={isModalOpen} modalPosition={modalPosition} modalContent={modalContent}/>   
        }
        </div>
    )
})
export default MessagesList


