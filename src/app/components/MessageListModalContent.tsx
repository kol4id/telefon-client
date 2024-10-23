import reply_img from '../../assets/reply.png'
import copy_text from '../../assets/duplicate.png'
import push_pin from '../../assets/push-pin.png'
import forward_img from '../../assets/forward.png'
import select_message from '../../assets/select.png'
import trash_box_img from '../../assets/trash.png'

import ModalMenuButton from "./ModalMenuButton"
import { IMessage } from "../global/types/Message.dto"

import { DeleteMessageApi } from '../api/messageAPI'
import { useDispatch } from "react-redux"
import { messageDeleteMessage } from "../../store/states/messages"
import { useRef } from 'react'
import { socketDeleteMessage } from 'store/states/socket'

interface IProps{
    message: IMessage,
    close: () => void,
}

const MessageListModalContent = (props: IProps) =>{

    const dispatch = useDispatch();
    const ref = useRef(null);

    const HandleMessageDelete = async(message: IMessage) => {
        console.log(message)
        dispatch(socketDeleteMessage(message.id));
        props.close();
    }

    return(
        <section style={{padding: '5px', boxSizing: 'border-box'}} ref={ref}>
            <ModalMenuButton text={'Reply'} img_url={reply_img} callback={()=>{}}/>
            <ModalMenuButton text={'Copy Text'} img_url={copy_text} callback={()=>{}}/>
            <ModalMenuButton text={'Pin'} img_url={push_pin} callback={()=>{}}/>
            <ModalMenuButton text={'Forward'} img_url={forward_img} callback={()=>{}}/> 
            <ModalMenuButton text={'Select'} img_url={select_message} callback={()=>{}}/>
            <ModalMenuButton text={'Delete'} img_url={trash_box_img} style={{color: 'rgb(255, 50, 50)'}} callback={()=>{HandleMessageDelete(props.message)}}/>
        </section>
    )
}

export default MessageListModalContent