import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { SetChannelSelected } from '../../store/states/channels'
import Channel from './Channel'


const ChannelsList = () => {
    const dispatch = useDispatch();
    const channels = useSelector((state:RootState) => state.channelsList);

    const SelectChannel = (id: string): void =>{
        dispatch(SetChannelSelected(id));
    }

    return(
        <React.Component>
            {
                channels.channels.map((channel) =>
                    channels.currentChannelSelected === channel.id
                    ? <Channel channel={channel} selected={true} select={SelectChannel}/>
                    : <Channel channel={channel} selected={false} select={SelectChannel}/>
                )
            }
        </React.Component>
    )
}

export default ChannelsList