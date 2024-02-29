import React, { useEffect, useState } from 'react';
import styles from '../styles/Message.module.css';
import { IMessage } from '../utils/interfaces/Message.dto';

interface IProps{
    message: IMessage,
    selected: boolean,
};

const Message = React.memo((props: IProps) =>{

    console.log(`message ${props.message.id} rerender`)

    const [hours, setHours] = useState<string>('');
    const [minutes, setMinutes] = useState<string>('');

    useEffect(()=>{
        const date = new Date(props.message.createdAt);
        setHours(String(date.getHours()).padStart(2, '0'));
        setMinutes(String(date.getMinutes()).padStart(2, '0'));
    }, [props.message.createdAt])

    return(
        <div className = {props.selected ? styles.message_string_selected : styles.message_string }
            onContextMenu={(e) => {e.preventDefault()}}
        >
            <div className = {styles.message_block}>
                <div className = {styles.message_content}>
                    {props.message.content}
                    <div className={styles.send_time}>
                        {`${hours}.${minutes}`}
                    </div>
                </div>
            </div>
        </div>
    )
});
export default Message;