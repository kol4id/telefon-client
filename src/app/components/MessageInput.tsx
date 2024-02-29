import TextareaAutosize from 'react-textarea-autosize'
import styles from '../styles/MessageInput.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { SetMessageInput, SetMessageInputHeight } from '../../store/states/messageInput'

const MessageInput = () =>{

    console.log("MessageInput rerender")

    const dispatch = useDispatch();
    const inputValue = useSelector((state:RootState) => state.messageInput.value)

    return(
        <TextareaAutosize className={styles.textarea}
            onChange={(e) => dispatch(SetMessageInput(e.target.value))}
            onHeightChange = {(height) => dispatch(SetMessageInputHeight(height))}
            value={inputValue}
            minRows = {1}
            maxRows = {15}
        />
    )
}
export default MessageInput;