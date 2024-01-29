import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import Message from "./Message"


const MessagesList = () =>{

    console.log("MessageList rerender")

    const messageState = useSelector((state: RootState)=> state.messages)

    return(
        <React.Fragment>
        {
            messageState.messages.length
            ?   messageState.messages.map((message, index) => 
                    <Message message={message} key={index}/>
                )
            : <div/>
            
        }
        </React.Fragment>
    )
}
export default MessagesList