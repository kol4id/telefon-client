import styles from '../styles/InputContainer.module.css'
import MessageInput from './MessageInput';

interface IProps{
    sendMessageMargin: number;
}

const InputContainer = (props: IProps) =>{

    console.log("InputContainer rerender")

    return(
        <div className = {styles.inputContainer}>
            <div className = {styles.inputBox}>
                <MessageInput/>
            </div>
            <div className = {styles.sendMessageButton}
                style={{marginTop: props.sendMessageMargin}}
            >
            </div>
        </div>
    )
}
export default InputContainer;