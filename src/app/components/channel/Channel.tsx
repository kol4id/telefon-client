import { IChannel } from "app/global/types/Channel.dto"
import { useSelector } from "react-redux"
import { RootState } from "store/store"
import React, { FC, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from '../../styles/Channel.module.css'
import { IMessage } from "app/global/types/Message.dto"
import ChannelHeader from "./ChannelHeader"
import ChannelBody from "./ChannelBody"

interface IProps{
    channel: IChannel,
    selected: boolean,
}

const Channel: FC<IProps> = React.memo(({channel, selected}) =>{
    console.log(`channel ${channel.id} rerender`) 
    const navigate = useNavigate();
    const isLastLoading = useSelector((state: RootState) => state.messages.isLastLoading);
    const chats = useSelector((state: RootState) => state.channelsList.chats);
    const lastMessages = useSelector((state: RootState) => state.messages.lastMessages);
    const [lastMessage, setLastMessage] = useState<IMessage>();

    useEffect(()=>{ 
        const chat = chats.find(chat => chat.owner.includes(channel.id));
        setLastMessage(lastMessages[chat?.id!])
    },[lastMessages, chats])

    return(
        <div className = {selected ? styles.channelSelected : styles.channel}
            onClick={() => navigate(`${channel.id}`)}
        >
            <div className = {styles.channelImg}>
                <img src = {channel.imgUrl}/>
            </div>

            <div className = {styles.channelContent}>
                {
                    isLastLoading || 
                        <>
                            <ChannelHeader channel={channel} message={lastMessage}/>          
                            <ChannelBody message={lastMessage}/>
                        </>
                }
                
            </div>
        </div>
    )
})

export default Channel

