import TextareaAutosize from 'react-textarea-autosize'
import styles from '../../styles/MessageDropModal.module.css'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from 'store/store'
import { SetMessageInput } from 'store/states/messageInput'
import { socketCreateMessage } from 'store/states/socket'
import { FC } from 'react'
import { convertFilesToArrayBuffer } from '../../utils/fileToBuffer'

interface IProps{
    files: File[],
    sent: () => void
}

const MessageDropModalBottom: FC<IProps> = ({files, sent}) =>{
    const dispatch = useAppDispatch();
    const inputValue = useSelector((state:RootState) => state.messageInput.value)
    const currentChannelSelected = useSelector((state:RootState) => state.channelsList.currentChannelSelected);

    const preventEnter = (event: any) =>{
        if (event.key === 'Enter' && !event.ctrlKey && !event.altKey && !event.shiftKey){
            event.preventDefault()
        }
    }

    const sendMessage = async() =>{
        if (!inputValue) return;
    
        dispatch(socketCreateMessage({
            channelId: currentChannelSelected, 
            content: inputValue, 
            hasMedia: files.length ? true : false,
            media: await convertFilesToArrayBuffer(files)
        }))
        dispatch(SetMessageInput(''))
        sent()
    }

    return(
        <section className={styles.modal_bottom}>
            <div className={styles.textzone}>
                <TextareaAutosize 
                onKeyDown = {(event) => {preventEnter(event)}}
                onChange={(e) => dispatch(SetMessageInput(e.target.value))}
                value={inputValue}
                minRows = {1}
                maxRows = {6}
                maxLength={3000}
                placeholder='Add caption ...'
                className={styles.textarea}/>
            </div>
            <button onClick={sendMessage}>SEND</button>
        </section>
    )
}

export default MessageDropModalBottom;