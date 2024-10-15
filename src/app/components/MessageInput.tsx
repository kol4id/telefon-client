import TextareaAutosize from 'react-textarea-autosize'
import styles from '../styles/MessageInput.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { SetMessageInput, SetMessageInputHeight } from '../../store/states/messageInput'

const MessageInput = () =>{
    const dispatch = useDispatch();
    const inputValue = useSelector((state:RootState) => state.messageInput.value)
  
    const preventEnter = (event: any) =>{
        if (event.key === 'Enter' && !event.ctrlKey && !event.altKey && !event.shiftKey){
            event.preventDefault()
        }
    }

    return(
        <TextareaAutosize className={styles.textarea}
            onKeyDown = {(event) => {preventEnter(event)}}
            onChange={(e) => dispatch(SetMessageInput(e.target.value))}
            onHeightChange = {(height) => dispatch(SetMessageInputHeight(height))}
            value={inputValue}
            minRows = {1}   
            maxLength={3000}
        />
    )
}
export default MessageInput;