import React, { useState } from 'react';
import styles from '../styles/Message.module.css';
import { IMessage } from '../utils/interfaces/Message.dto';
interface IProps{
    message: IMessage,
    self: boolean,
    selected: boolean,
};

const Message = React.memo((props: IProps) =>{

    console.log(`message ${props.message.id} rerender`) 
    const [messageStyle] = useState(
        props.self
        ? {default: styles.message_string_self, selected: styles.message_string_self_selected}
        : {default: styles.message_string, selected: styles.message_string_selected}
    );

    return(
        <div className = {props.selected ? messageStyle.selected : messageStyle.default }
            onContextMenu={(e) => {e.preventDefault()}}
        >
            <div className = {styles.message_block}>
                <div className = {styles.message_content}>
                    {props.message.content}
                    <div className={styles.send_time}>
                        {`${String(new Date(props.message.createdAt).getHours()).padStart(2, '0')}.${String(new Date(props.message.createdAt).getMinutes()).padStart(2, '0')}`}
                    </div>
                </div>
            </div>
        </div>
    )
});
export default Message;