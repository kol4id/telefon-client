import { IChannel } from "app/global/types/Channel.dto"
import { useSelector } from "react-redux"
import { RootState } from "store/store"
import React, { FC, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from '../../styles/Channel.module.css'
import { IMessage } from "app/global/types/Message.dto"
import { IChat } from "app/global/types/Chat.dto"
import ChannelImg from "./ChannelImg"
import ChannelContent from "./ChannelContent"
import { IPosition } from "app/global/types/MousePos"

interface IProps{
    channel: IChannel,
    selected: boolean,
    handleContext: (a: IPosition, b: string) => void
}

const Channel: FC<IProps> = React.memo(({channel, selected, handleContext}) =>{
    console.log(`channel ${channel.id} rerender`) 
    const navigate = useNavigate();

    const isLastLoading = useSelector((state: RootState) => state.messages.isLastLoading);
    const chats = useSelector((state: RootState) => state.channelsList.chats);
    const channelOnlineStatus = useSelector((state: RootState) => state.channelsList.channelsOnlineStatus);
    const lastMessages = useSelector((state: RootState) => state.messages.lastMessages);

    const [channelChat, setChannelChat] = useState<IChat>();
    const [lastMessage, setLastMessage] = useState<IMessage>();
    const [isOnline, setIsOnline] = useState(false);
    
    const _handleContext = (event: React.MouseEvent) =>{
        event.preventDefault();
        handleContext({x: event.clientX, y: event.clientY}, channel.id);
    }

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
            onContextMenu={_handleContext}
        >
            <ChannelImg channel={channel} isOnline={isOnline}/>
            <ChannelContent isLastLoading={isLastLoading} channel={channel} channelChat={channelChat} lastMessage={lastMessage}/>
        </div>
    )
})

export default Channel

