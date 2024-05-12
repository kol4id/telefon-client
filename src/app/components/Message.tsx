import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/Message.module.css';
import { IMessage } from '../utils/interfaces/Message.dto';

import send from '../../assets/send.png';
import read from '../../assets/read.png';
import { useAppDispatch } from '../../store/store';
import { messageLastReadsQueuePush } from '../../store/states/messages';

interface IProps{
    message: IMessage,
    self: boolean,
    selected: boolean,
};

const Message = React.memo((props: IProps) =>{

    console.log(`message ${props.message.id} rerender`) 
    const messageRef = useRef<HTMLDivElement>(null!);

    const dispatch = useAppDispatch();

    const [messageStyle] = useState(
        props.self
        ? {default: styles.message_string_self, selected: styles.message_string_self_selected}
        : {default: styles.message_string, selected: styles.message_string_selected}
    );

    const handleObserve = () => {
        console.log(`message ${props.message.id} has been read`)
        dispatch(messageLastReadsQueuePush(props.message));
    }

    const observer: IntersectionObserver = new IntersectionObserver(entries =>{
        if(entries[0].isIntersecting){
            handleObserve();
            observer.unobserve(messageRef.current);
        }
    });

    const startObserving = () =>{
        if(props.self) return
        if(props.message.isRead) return
        observer.observe(messageRef.current);
    }

    useEffect(()=>{
        startObserving();
        return () => observer.disconnect();
    }, [])
     

    return(
        <div className = {props.selected ? messageStyle.selected : messageStyle.default }
            onContextMenu={(e) => {e.preventDefault()}}
            ref={messageRef}
        >
            <div className = {styles.message_block}>
                <div className = {styles.message_content}>
                    {props.message.content}
                    <div className={styles.send_time}>
                        {`${String(new Date(props.message.createdAt).getHours()).padStart(2, '0')}.${String(new Date(props.message.createdAt).getMinutes()).padStart(2, '0')}`}
                        {
                            props.self && <img className={styles.read_status} src={props.message.isRead ? read : send}></img>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
});
export default Message;