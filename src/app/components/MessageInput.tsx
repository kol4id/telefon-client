import TextareaAutosize from 'react-textarea-autosize'

import styles from '../styles/MessageInput.module.css'
const MessageInput = () =>{

    console.log("MessageInput rerender")

    // const value = useSelector((state:RootState) => state.messageInput.value)
    // const dispatch = useDispatch();

    return(
        <TextareaAutosize className={styles.textarea}
            minRows = {1}
            maxRows = {15}
        />
            // value = {value}
            // onChange = {(e) => dispatch(setInputValue(e.target.value))}
            // minRows = {1}
            // maxRows = {15}
            // onHeightChange = {(height) => dispatch(setHeightValue(height))}
    )
}
export default MessageInput;