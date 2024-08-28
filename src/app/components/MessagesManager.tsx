import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import ModalWrapper from "./ModalWrapper"
import useModal from "../utils/hooks/useModal"
import MessageListModalContent from "./MessageListModalContent"

import MessageBroker from "./MessageBroker"
import MessagesList from "./MessagesList"
import EmptyMessageList from "./EmptyMessageList"


const MessagesManager = React.memo(() =>{
    console.log("MessageList rerender")
    const messageRecords = useSelector((state: RootState) => state.messages.messagesRecords);
    const currentChannelSelected = useSelector((state: RootState) => state.channelsList.currentChannelSelected);
    
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

    useEffect(()=>{
        closeModal()
    }, [currentChannelSelected])

    return(
        <div id="message_transition" style={{display: "flex"}}>
            {
                messageRecords?.[currentChannelSelected]
                ?   <>
                        <MessageBroker>
                            <MessagesList selected={selected} callback={SelectMessage}/>
                        </MessageBroker>
                
                    </>

                :   <EmptyMessageList/>
            }
            <ModalWrapper isModalOpen={isModalOpen} modalPosition={modalPosition} modalContent={modalContent}/>   
        </div>
    )
})
export default MessagesManager


