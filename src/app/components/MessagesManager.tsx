import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import MessageListModalContent from "./MessageListModalContent"

import MessageBroker from "./MessageBroker"
import EmptyMessageList from "./EmptyMessageList"
import Context from "./Context"
import MessagesDateGroupList from "./MessagesDateGroupList"


const MessagesManager = React.memo(() =>{
    console.log("MessageList rerender")
    const messageRecords = useSelector((state: RootState) => state.messages.messageRecords);
    const currentChannelSelected = useSelector((state: RootState) => state.channelsList.currentChannelSelected);
    const currentChat = useSelector((state: RootState) => state.channelsList.currentChat);
    
    const [selected, setSelected] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);
    const [modalPos, setModalPos] = useState<{x: number, y: number}>();
    const [selectedMsgIndx, setSelectedMsgIndx] = useState<number>(0);
    const [selectedGroupIndx, setSelectedGroupIndx] = useState<number>(0);

    const SelectMessage = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string, index: number, groupIndex: number): void  =>{   
        event.preventDefault();
        setModalPos({x: event.clientX, y: event.clientY});
        setSelectedMsgIndx(index);
        setSelectedGroupIndx(groupIndex);
        
        if(selected === id){
            setSelected('');
            setIsOpen(false);
        } else {
            setSelected(id);
            setIsOpen(true);
        }     
    }

    useEffect(()=>{
        setIsOpen(false)
    }, [currentChannelSelected])

    return(
        <div id="message_transition" style={{display: "flex"}}>
            {
                currentChat && messageRecords?.[currentChat.id]
                ?   <>
                        <MessageBroker>
                            <MessagesDateGroupList selected={selected} callback={SelectMessage}/>
                        </MessageBroker>
                        <Context
                            isOpen={isOpen}
                            onClose={()=>{
                                setSelected('');
                                setIsOpen(false);
                            }}
                            position={modalPos}
                            overlay={true}
                        >
                            <MessageListModalContent message={messageRecords[currentChat.id][selectedGroupIndx].messages[selectedMsgIndx]} close={()=>{setIsOpen(false)}}/>
                        </Context>
                    </>

                :   <EmptyMessageList/>
            }
        </div>
    )
})
export default MessagesManager


