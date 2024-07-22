import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { SetChannelSelected } from "../../store/states/channels";
import styles from '../styles/ChannelsList.module.css';
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { IChannel } from "../global/types/Channel.dto";
import { useParams } from "react-router-dom";
import ChannelsList from "./ChannelsList";
import { ChannelApi } from "../api/api";
import useDebounce from "../utils/general/debounce";
import ChannelCreate from "./ChannelCreate";

const channels = new ChannelApi();

const ChannelsManager = memo(() =>{
    let { channelId } = useParams<string>();
    console.log("ChannelsList rerender")

    const dispatch = useDispatch();
    const channelState = useSelector((state: RootState) => state.channelsList)
    const searchValue = useSelector((state: RootState) => state.channelSearch.value)
    const [filteredChannels, setFilteredChannels] = useState<IChannel[]>([])
    
  
    useEffect(()=>{
        setFilteredChannels(channelState.channels)
    },[])

    useEffect(()=>{
        dispatch(SetChannelSelected(channelId));
    }, [channelId])

    const debouncedSearch = useCallback(async (value: string)=>{      
        const searched = await channels.search(value);
        setFilteredChannels(searched);
    }, [])

    const [debouncedFetchData, cancelDebounce] = useDebounce(debouncedSearch, 400);

    const debounceSearch = () => {
        cancelDebounce()
        const filteredChannels = channelState.channels.filter(
            channel => 
                (channel.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                channel.channelName?.toLowerCase().includes(searchValue.toLowerCase()))
        );

        setFilteredChannels(filteredChannels)
        if (filteredChannels[0]) return;
        debouncedFetchData(searchValue);
    }

    useEffect(useMemo(()=>{
        debounceSearch()
        return () =>{}
    }, [searchValue, channelState, debouncedFetchData]), [searchValue, channelState, debouncedFetchData])

    return(
        <div className={styles.channelList}>
            <ChannelsList channels={filteredChannels}/>
        </div>
    )
})

export default ChannelsManager;