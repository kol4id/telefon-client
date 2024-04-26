import TextareaAutosize from 'react-textarea-autosize'
import styles from '../styles/MessageInput.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { SetMessageInput, SetMessageInputHeight } from '../../store/states/messageInput'
import useWindowSize from '../utils/hooks/useWindowSize'
import { useEffect, useState } from 'react'

const MessageInput = () =>{

    console.log("MessageInput rerender")

    const dispatch = useDispatch();
    
    const ROW_SIZE = 20;

    const innerWindowHeight = useWindowSize().height;
    const inputValue = useSelector((state:RootState) => state.messageInput.value)
    const [maxHeight, setMaxHeight] = useState(innerWindowHeight * 0.25);
    const [maxRows, setMaxRows] = useState<number>(maxHeight / ROW_SIZE);
  
    const preventEnter = (event: any) =>{
        if (event.key === 'Enter' && !event.ctrlKey && !event.altKey && !event.shiftKey){
            event.preventDefault()
        }
    }

    useEffect(()=>{
        setMaxHeight(innerWindowHeight * 0.25);
        setMaxRows(maxHeight / ROW_SIZE)
    }, [innerWindowHeight])

    return(
        <TextareaAutosize className={styles.textarea}
            onKeyDown = {(event) => {preventEnter(event)}}
            onChange={(e) => dispatch(SetMessageInput(e.target.value))}
            onHeightChange = {(height) => dispatch(SetMessageInputHeight(height))}
            value={inputValue}
            minRows = {1}
            maxRows = {maxRows}
        />
    )
}
export default MessageInput;