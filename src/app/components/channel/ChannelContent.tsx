import { FC } from "react"
import ChannelBody from "./ChannelBody"
import ChannelHeader from "./ChannelHeader"
import { IChannel } from "app/global/types/Channel.dto"
import { IChat } from "app/global/types/Chat.dto"
import { IMessage } from "app/global/types/Message.dto"

import styles from '../../styles/Channel.module.css'
interface IProps {
    isLastLoading: boolean,
    channel: IChannel,
    channelChat: IChat | undefined,
    lastMessage: IMessage | undefined
}

const ChannelContent: FC<IProps> = (props) =>{
    return(
        <>
            <div className = {styles.channelContent}>
                {
                    props.isLastLoading || 
                        <>
                            <ChannelHeader channel={props.channel} message={props.lastMessage}/>          
                            <ChannelBody message={props.lastMessage} chat={props.channelChat}/>
                        </>
                }
            </div>
        </>
    )
}

export default ChannelContent