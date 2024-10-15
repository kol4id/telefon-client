import { useSelector } from 'react-redux';
import MessageInput from './MessageInput';
import { SetMessageInput } from '../../store/states/messageInput';
import { RootState, useAppDispatch } from '../../store/store';

import styles from '../styles/InputContainer.module.css';
import { socketCreateMessage } from '../../store/states/socket';


const InputContainer = () =>{
    console.log("InputContainer rerender")

    const dispatch = useAppDispatch();
    const messageInputValue = useSelector((state:RootState) => state.messageInput.value);
    const currentChannelSelected = useSelector((state:RootState) => state.channelsList.currentChannelSelected);

    const sendMessageOnEnter = async(event: any) => {
        if (event.key === "Enter" && !event.ctrlKey && !event.altKey && !event.shiftKey){
            sendMessage();
        }
    }

    const sendMessage = async() =>{
        if (!messageInputValue) return;

        dispatch(socketCreateMessage({
            channelId: currentChannelSelected, 
            content: messageInputValue, 
            hasMedia: false
        }))
        dispatch(SetMessageInput(''))
    }

    return(
        <footer className = {styles.input_area}
            onKeyDown={(event) => sendMessageOnEnter(event)}
        >
            <section className = {styles.input_container}>
                <div className = {styles.input_box}>
                    <MessageInput/>
                </div>
                <button className = {styles.send_message_button}
                    onClick={() => sendMessage()}
                >
                </button>
            </section>
        </footer>
    )
}
export default InputContainer;