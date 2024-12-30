import reply_img from '../../assets/reply.png'
import copy_text from '../../assets/duplicate.png'
import push_pin from '../../assets/push-pin.png'
import forward_img from '../../assets/forward.png'
import select_message from '../../assets/select.png'
import trash_box_img from '../../assets/trash.png'
new Image().src = reply_img;
new Image().src = copy_text;
new Image().src = push_pin;
new Image().src = forward_img;
new Image().src = select_message;
new Image().src = trash_box_img;

import ModalMenuButton from "./ModalMenuButton"
import { IMessage } from "../global/types/Message.dto"
import { useDispatch, useSelector } from "react-redux"
import { useMemo, useRef } from 'react'
import { socketDeleteMessage } from 'store/states/socket'
import ModalMenuSeparator from './ModalMenuSeparator'
import { RootState } from 'store/store'

interface IProps{
    close: () => void,
}

const MessageListModalContent = (props: IProps) =>{

    const dispatch = useDispatch();
    const ref = useRef(null);

    const records = useSelector((state: RootState) => state.messages.messageRecords);
    const selectedMessageId = useSelector((state: RootState) => state.messages.selectedMessageId);
    const currentChat = useSelector((state: RootState) => state.channelsList.currentChat);

    const message = useMemo(()=>{
        const messages = records[currentChat?.id!].flat().flatMap((group) => group.messages);
        const messagesMap = new Map(messages.map(message => [message.id, message]));
        return messagesMap.get(selectedMessageId);
    }, [selectedMessageId])    
    
    const HandleMessageDelete = async(message: IMessage) => {
        console.log(message)
        dispatch(socketDeleteMessage(message.id));
        props.close();
    }

    return(
        <section style={{padding: '5px 3px', boxSizing: 'border-box'}} ref={ref}>
            <ModalMenuButton text={'Reply'} img_url={reply_img} callback={()=>{}}/>
            <ModalMenuButton text={'Copy Text'} img_url={copy_text} callback={()=>{}}/>
            <ModalMenuButton text={'Pin'} img_url={push_pin} callback={()=>{}}/>
            <ModalMenuButton text={'Forward'} img_url={forward_img} callback={()=>{}}/> 
            <ModalMenuButton text={'Select'} img_url={select_message} callback={()=>{}}/>
            <ModalMenuSeparator/>
            <ModalMenuButton text={'Delete'} img_url={trash_box_img} style={{color: 'rgb(255, 50, 50)'}} callback={()=>{HandleMessageDelete(message!)}}/>
        </section>
    )
}

export default MessageListModalContent