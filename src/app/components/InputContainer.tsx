import { useDispatch, useSelector } from 'react-redux';
import MessageInput from './MessageInput';
import { SetMessageInput } from '../../store/states/messageInput';
import { RootState, useAppDispatch } from '../../store/store';
import { PostMessage } from '../api/messageAPI';

import styles from '../styles/InputContainer.module.css'
import { socketCreateMessage } from '../../store/states/socket';
import { IChannel } from '../global/types/Channel.dto';
import { subscribeToChannel } from '../../store/states/channels';

const InputContainer = () =>{

    console.log("InputContainer rerender")

    const dispatch = useAppDispatch();
    const messageInputValue = useSelector((state:RootState) => state.messageInput.value);
    const sendMessageMargin = useSelector((state:RootState) => state.messageInput.height);
    const currentChannelSelected = useSelector((state:RootState) => state.channelsList.currentChannelSelected);
    const userChannels = useSelector((state: RootState) => state.channelsList.userChannels);

    const isSubscribed = (channels: IChannel[]): Boolean => {
        const indx = channels.findIndex(channel => channel.id == currentChannelSelected);
        if (indx < 0) return false
        return true
    }

    const sendMessage = async() =>{
        if (!isSubscribed(userChannels)){
            await dispatch(subscribeToChannel(currentChannelSelected))
        }

        dispatch(socketCreateMessage({
            channelId: currentChannelSelected, 
            content: messageInputValue, 
            hasMadia: false
        }))
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