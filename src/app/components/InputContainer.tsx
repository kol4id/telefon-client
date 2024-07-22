import { useDispatch, useSelector } from 'react-redux';
import MessageInput from './MessageInput';
import { SetMessageInput } from '../../store/states/messageInput';
import { RootState } from '../../store/store';
import { PostMessage } from '../api/messageAPI';

import styles from '../styles/InputContainer.module.css'

const InputContainer = () =>{

    console.log("InputContainer rerender")

    const dispatch = useDispatch();
    const messageInputValue = useSelector((state:RootState) => state.messageInput.value);
    const sendMessageMargin = useSelector((state:RootState) => state.messageInput.height);
    const currentChannelSelected = useSelector((state:RootState) => state.channelsList.currentChannelSelected);

    const sendMessage = async() =>{
        PostMessage(currentChannelSelected, messageInputValue, false)
        dispatch(SetMessageInput(''))
    }

    const sendMessageOnEnter = async(event: any) => {
        if (!messageInputValue) return;
        if (event.key === "Enter" && !event.ctrlKey && !event.altKey && !event.shiftKey){
            sendMessage();
        }
    }

    return(
        <div className = {styles.inputContainer}
            onKeyDown={(event) => sendMessageOnEnter(event)}
        >
            <div className = {styles.inputBox}>
                <MessageInput/>
            </div>

            <div className = {styles.sendMessageButton}
                onClick={() => sendMessage()}
                style={{marginTop: sendMessageMargin - 20}}  
            >
            </div>
        </div>
    )
}
export default InputContainer;