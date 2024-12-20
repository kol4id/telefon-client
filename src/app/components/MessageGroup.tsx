import { memo, useRef, useState } from 'react';
import styles from '../styles/Message.module.css';
import { IMessage } from '../global/types/Message.dto';
import useObserveMessage from '../utils/hooks/useObserve';
import { IUserExternal } from 'app/global/types/User.dto';
import MessageGroupBlock from './message/MessageGroupBlock';
import MessageAvatar from './message/MessageAvatar';
import { useAppDispatch } from 'store/store';
import { messageSetSelectedMessage } from 'store/states/messages';

interface IProps{
    message: IMessage,
    self: boolean,
    selected: boolean,
    user: IUserExternal | undefined,
    index: number
    lastIndex: number
};

const MessageGroup = memo((props: IProps) =>{
    console.log(`message ${props.message.id} rerender`) 
    const messageRef = useRef<HTMLDivElement>(null!);
    const dispatch = useAppDispatch();

    useObserveMessage(props.message, props.self, messageRef); 

    const handleContext = (e: React.MouseEvent) =>{
        e.preventDefault()
        dispatch(messageSetSelectedMessage(props.selected ? '' : props.message.id));
    }

    const [messageStyle] = useState(
        props.self
        ? {default: styles.message_string_group_self, selected: styles.message_string_group_self_selected}
        : {default: styles.message_string_group, selected: styles.message_string_group_selected}
    );
     
    const isLast = (props.index == 0);

    return(
        <div className = {props.selected ? messageStyle.selected : messageStyle.default }
            onContextMenu={(e) => handleContext(e)}
            style={{marginBottom: props.index == 0 ? '8px' : ''}}
            ref={messageRef}
        >
            {isLast && !props.self && <MessageAvatar photoUrl={props.user?.photoUrl} className={styles.user_img}/>}
            <MessageGroupBlock message={props.message} self={props.self} user={props.user} showName={props.index == props.lastIndex}/>
            {isLast && props.self && <MessageAvatar photoUrl={props.user?.photoUrl} className={styles.user_img_self}/>}
        </div>
    )
});
export default MessageGroup;