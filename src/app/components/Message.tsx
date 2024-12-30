import { memo, useRef, useState } from 'react';
import styles from '../styles/Message.module.css';
import { IMessage } from '../global/types/Message.dto';

import MessageBlock from './MessageBlock';
import useObserveMessage from '../utils/hooks/useObserve';
import { useAppDispatch } from 'store/store';
import { messageSetSelectedMessage } from 'store/states/messages';

interface IProps{
    message: IMessage,
    self: boolean,
    selected: boolean,
};

const Message = memo((props: IProps) =>{
    console.log(`message ${props.message.id} rerender`) 
    const messageRef = useRef<HTMLDivElement>(null!);

    const dispatch = useAppDispatch();
    useObserveMessage(props.message, props.self, messageRef); 

    const handleContext = (e: React.MouseEvent) => {
        e.preventDefault();
        dispatch(messageSetSelectedMessage(props.selected ? '' : props.message.id));
    }

    const [messageStyle] = useState(
        props.self
        ?   {default: styles.message_string_self, selected: styles.message_string_self_selected}
        :   {default: styles.message_string, selected: styles.message_string_selected}
    );
     
    return(
        <div className = {props.selected ? messageStyle.selected : messageStyle.default }
            onContextMenu={e => handleContext(e)}
            ref={messageRef}
        >
            <MessageBlock message={props.message} self={props.self}/>
        </div>
    )
});
export default Message;