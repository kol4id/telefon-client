import { FC, memo } from "react"
import { IChannel } from "../global/types/Channel.dto"
import Channel from "./Channel"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"

interface IProps{
    channels: IChannel[]
}

const ChannelsList: FC<IProps> = memo((props) => {

    const selected = useSelector((state: RootState) => state.channelsList.currentChannelSelected)

    return(
        <>
            {
                props.channels.map((channel)=>
                    <Channel channel={channel} selected={selected === channel.id} key={channel.id}/> 
                )
            }
        </>
    )
})

export default ChannelsList