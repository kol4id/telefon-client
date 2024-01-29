import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Channel from "./Channel";
import { SetChannelSelected } from "../../store/states/channels";

import styles from '../styles/ChannelsList.module.css'
import { memo, useEffect, useMemo, useState } from "react";
import { IChannel } from "../utils/interfaces/Channel.dto";
const ChannelsList = memo(() =>{

    console.log("ChannelsList rerender")

    const dispatch = useDispatch();
    const channelState = useSelector((state: RootState) => state.channelsList)
    const searchValue = useSelector((state: RootState) => state.channelSearch.value)
    const [filteredChannels, setFilteredChannels] = useState<IChannel[]>([])

    useEffect(()=>{
        setFilteredChannels(channelState.channels)
    },[])

    useEffect(()=>{
        const timeout = setTimeout(()=>{
            const filteredChannels = channelState.channels.filter(
                channel => channel.title.toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilteredChannels(filteredChannels)
        }, 50)

        return () =>{
            clearTimeout(timeout)
        }
    }, [searchValue])

    const selectChannel = (id: string): void =>{
        dispatch(SetChannelSelected(id));
    }

    return(
        <div className={styles.channelList}>
            {
                useMemo(()=>
                filteredChannels.map((channel, index)=>
                    channelState.currentChannelSelected === channel.id
                    ? <Channel channel={channel} selected={true} select={selectChannel} key={index}/> 
                    : <Channel channel={channel} selected={false} select={selectChannel} key={index}/> 
                )
                , [filteredChannels, channelState])  
            }
        </div>
    )
})

export default ChannelsList;