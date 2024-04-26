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
    const [selected, setSelected] = useState<string>('');

    useEffect(()=>{
        setFilteredChannels(channelState.channels)
    },[])

    useEffect(useMemo(()=>{
        const timeout = setTimeout(()=>{
            const filteredChannels = channelState.channels.filter(
                channel => channel.title.toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilteredChannels(filteredChannels)
        }, 100)

        return () =>{
            clearTimeout(timeout)
        }
    }, [searchValue, channelState]), [searchValue, channelState])


    const selectChannel = (id: string): void =>{
        dispatch(SetChannelSelected(id));
        setSelected(id);
    }

    return(
        <div className={styles.channelList}>
            {
                useMemo(()=>
                    filteredChannels.map((channel)=>
                        <div onClick={()=>selectChannel(channel.id)}>
                            <Channel channel={channel} selected={selected === channel.id} key={channel.id}/> 
                        </div>
                    )
                , [filteredChannels, channelState, selected])  
            }
        </div>
    )
})

export default ChannelsList;