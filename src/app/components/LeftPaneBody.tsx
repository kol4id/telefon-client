import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchChannels } from '../../store/states/channels';
import { RootState, useAppDispatch } from '../../store/store';

import styles from '../styles/LeftPaneBody.module.css';
import { fetchLastOneMessages } from '../../store/states/messages';
import ChannelsManager from './ChannelsManager';

const LeftPaneBody = () =>{
    console.log("LeftPaneBody rerender")

    const dispatch = useAppDispatch();
    const channels = useSelector((state: RootState) => state.channelsList);

    useEffect(()=>{
        dispatch(fetchChannels());
        dispatch(fetchLastOneMessages());
    },[])

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