import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/InputContainer.module.css'
import MessageInput from './MessageInput';
import { SetMessageInput } from '../../store/states/messageInput';
import { RootState } from '../../store/store';
import postMessage from '../api/postMessage';

const InputContainer = () =>{

    console.log("InputContainer rerender")

    const dispatch = useDispatch();
    const messageInputValue = useSelector((state:RootState) => state.messageInput.value);
    const sendMessageMargin = useSelector((state:RootState) => state.messageInput.height);
    const currentChannelSelected = useSelector((state:RootState) => state.channelsList.currentChannelSelected);

    const sendMessage = async() =>{
        postMessage(currentChannelSelected, messageInputValue, false)
        // await FetchChannelMessages(currentChannelSelected, 1);
        dispatch(SetMessageInput(''))
    }

    return(
        <div className = {styles.inputContainer}>
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