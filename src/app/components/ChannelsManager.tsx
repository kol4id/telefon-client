import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { channelSetFiltered, SetChannelSelected } from "../../store/states/channels";
import styles from '../styles/ChannelsList.module.css';
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { IChannel } from "../global/types/Channel.dto";
import { useParams } from "react-router-dom";
import ChannelsList from "./ChannelsList";
import { ChannelApi } from "../api/api";
import useDebounce from "../utils/general/debounce";

const channels = new ChannelApi();

const ChannelsManager = memo(() =>{
    let { channelId } = useParams<string>();
    console.log("ChannelsList rerender")

    const dispatch = useDispatch();
    const channelState = useSelector((state: RootState) => state.channelsList)
    const searchValue = useSelector((state: RootState) => state.channelSearch.value)
    const [filteredChannels, setFilteredChannels] = useState<IChannel[]>(channelState.filteredChannels.length ? channelState.filteredChannels : channelState.userChannels)

    useEffect(()=>{
        dispatch(SetChannelSelected(channelId));
    }, [channelId])

    const debouncedSearch = useCallback(async (value: string)=>{      
        const searched = await channels.search(value);
        dispatch(channelSetFiltered(searched));
        setFilteredChannels(searched);
    }, [])

    const [debouncedFetchData, cancelDebounce] = useDebounce(debouncedSearch, 400);

    const debounceSearch = () => {
        cancelDebounce()
        if (!searchValue) {
            setFilteredChannels(channelState.userChannels)
            return
        }

        const filteredChannels = channelState.userChannels.filter(
            channel => 
                (channel.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                channel.channelName?.toLowerCase().includes(searchValue.toLowerCase()))
        );

        if (filteredChannels[0]) return;

        setFilteredChannels(channelState.filteredChannels);
        debouncedFetchData(searchValue);
    }

    useEffect(useMemo(()=>{
        debounceSearch()
        return () =>{}
    }, [searchValue, debouncedFetchData]), [searchValue,  debouncedFetchData])

    return(
        <div className={styles.channelList}>
            <ChannelsList channels={filteredChannels}/>
        </div>
    )
})

export default ChannelsManager;