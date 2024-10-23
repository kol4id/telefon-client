import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchChannels, fetchChats } from '../../store/states/channels';
import { RootState, useAppDispatch } from '../../store/store';

import styles from '../styles/LeftPaneBody.module.css';
import { fetchLastOneMessages, fetchUnreadMessagesCount } from '../../store/states/messages';
import ChannelsManager from './ChannelsManager';

const LeftPaneBody = () =>{
    console.log("LeftPaneBody rerender")

    const dispatch = useAppDispatch();
    const channels = useSelector((state: RootState) => state.channelsList);

    useEffect(()=>{
        if (!channels.userChannels.length){
            (async () =>{
                await dispatch(fetchChats());
                await dispatch(fetchChannels());
                dispatch(fetchLastOneMessages());
                dispatch(fetchUnreadMessagesCount());
            })()
        }        
    },[])

    useEffect(()=>{
        console.log(channels.isDataLoading)
    },[channels.isDataLoading])

    return(
        <div className = {styles.body}>
            <div className = {styles.bodyMain}>
                {
                    channels.isDataLoading
                    ? <div></div>
                    : <ChannelsManager/>
                }        
            </div>
        </div>
    )
}

export default LeftPaneBody;