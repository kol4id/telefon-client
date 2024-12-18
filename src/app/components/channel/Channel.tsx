import { IChannel } from "app/global/types/Channel.dto"
import { useSelector } from "react-redux"
import { RootState } from "store/store"
import React, { FC, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from '../../styles/Channel.module.css'
import { IMessage } from "app/global/types/Message.dto"
import ChannelHeader from "./ChannelHeader"
import ChannelBody from "./ChannelBody"
import { IChat } from "app/global/types/Chat.dto"

interface IProps{
    channel: IChannel,
    selected: boolean,
}

const Channel: FC<IProps> = React.memo(({channel, selected}) =>{
    console.log(`channel ${channel.id} rerender`) 
    const navigate = useNavigate();

    const isLastLoading = useSelector((state: RootState) => state.messages.isLastLoading);
    const chats = useSelector((state: RootState) => state.channelsList.chats);
    const channelOnlineStatus = useSelector((state: RootState) => state.channelsList.channelsOnlineStatus);
    const lastMessages = useSelector((state: RootState) => state.messages.lastMessages);

    const [channelChat, setChannelChat] = useState<IChat>();
    const [lastMessage, setLastMessage] = useState<IMessage>();
    const [isOnline, setIsOnline] = useState(false);
    

    useEffect(()=>{ 
        const chat = chats.find(chat => chat.owner.includes(channel.id));
        setChannelChat(chat);
        setLastMessage(lastMessages[chat?.id!])
    },[lastMessages, chats])

    useEffect(()=>{
        setIsOnline(channelOnlineStatus[channel.id] ?? false)  
    },[channelOnlineStatus])

    return(
        <div className = {selected ? styles.channelSelected : styles.channel}
            onClick={() => navigate(`${channel.id}`)}
        >
            <div className = {styles.channelImg}>
                {
                    isOnline && <div className={styles.online_icon}/>
                }
                <img src = {channel.imgUrl}/>    
            </div>

            <div className = {styles.channelContent}>
            {
                isLastLoading || 
                    <>
                        <ChannelHeader channel={channel} message={lastMessage}/>          
                        <ChannelBody message={lastMessage} chat={channelChat}/>
                    </>
            }
            </div>
        </div>
    )
})

export default Channel

