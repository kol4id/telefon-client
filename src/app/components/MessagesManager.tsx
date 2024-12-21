import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"

import MessageBroker from "./MessageBroker"
import EmptyMessageList from "./emptyMessage/EmptyMessageList"
import MessagesDateGroupList from "./MessagesDateGroupList"
import MessagesContextWraper from "./messages/MessagesContextWraper"

const MessagesManager = React.memo(() =>{
    console.log("MessageList rerender")
    const messageRecords = useSelector((state: RootState) => state.messages.messageRecords);
    const currentChat = useSelector((state: RootState) => state.channelsList.currentChat);
    const isLoading = useSelector((state: RootState) => state.messages.isLoading)  

    return(
        <div id="message_transition" style={{display: "flex"}}>
            {
                currentChat && messageRecords?.[currentChat.id]
                ?   <>
                        <MessageBroker>
                            <MessagesContextWraper>
                                <MessagesDateGroupList/>
                            </MessagesContextWraper>
                        </MessageBroker>
                        
                    </>

                :  (!isLoading || !currentChat) && <EmptyMessageList/> 
            }
        </div>
    )
})
export default MessagesManager


