import React, {useState} from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import Message from "./Message"
import ModalWrapper from "./ModalWrapper"
import useModal from "../utils/hooks/useModal"
import MessageListModalContent from "./MessageListModalContent"

const MessagesList = () =>{

    console.log("MessageList rerender")

    const messageRecords = useSelector((state: RootState) => state.messages.messagesRecords);
    const currentChannelSelected = useSelector((state: RootState) => state.channelsList.currentChannelSelected);
    
    const [selected, setSelected] = useState<string>('');
    const [isModalOpen, modalPosition, modalContent, openModal, closeModal] = useModal();

    const selectMessage = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string, index: number): void  =>{   
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

    return(
        <React.Fragment>
        {
            messageRecords[currentChannelSelected]
            ?   messageRecords[currentChannelSelected].map((message, index) => 
                    <div onContextMenu={(event) => selectMessage(event, message.id, index)}>
                        <Message message={message} selected={selected === message.id} key={message.id}/>
                    </div>  
                )
            :   <div></div>
        }
        {
            <ModalWrapper isModalOpen={isModalOpen} modalPosition={modalPosition} modalContent={modalContent}/>   
        }
        </React.Fragment>
    )
}
export default MessagesList