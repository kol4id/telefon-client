import styles from '../styles/Message.module.css';
import { IMessage } from '../utils/interfaces/Message.dto';

interface IProps{
    message: IMessage,
};

const Message = (props: IProps) =>{

    return(
        <div
            className = {
                styles.messageStringFrom
        }>
            <div className = {styles.messageBlock}>
                <div className = {styles.messageContent}>
                    {props.message.content}
                </div>
            </div>
        </div>
    )
}
export default Message;