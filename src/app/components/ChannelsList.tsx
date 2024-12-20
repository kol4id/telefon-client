import { FC, memo, useState } from "react"
import { IChannel } from "../global/types/Channel.dto"
import Channel from "./channel/Channel"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { IPosition } from "app/global/types/MousePos"
import ChannelListContextGroup from "./ChannelListContextGroup"

interface IProps{
    channels: IChannel[]
}

const ChannelsList: FC<IProps> = memo((props) => {

    const selected = useSelector((state: RootState) => state.channelsList.currentChannelSelected)

    const [isOpen, setIsOpen] = useState(false);
    const [mousePos, setMousePos] = useState<{x: number, y: number}>();
    const [channelContextSelected, setChannelContextSelected] = useState('');

    const handleContext = (position: IPosition, channelId: string) => {
        setMousePos(position);
        setIsOpen(true);
        setChannelContextSelected(channelId);
    }

    return(
        <>
            {
                props.channels.map((channel)=>
                    <Channel channel={channel} selected={selected === channel.id} key={channel.id} handleContext={handleContext}/> 
                )
            }
            <ChannelListContextGroup 
                isOpen={isOpen} 
                mousePos={mousePos} 
                channelId={channelContextSelected} 
                onClose={()=>setIsOpen(false)} 
            />
        </>
    )
})

export default ChannelsList