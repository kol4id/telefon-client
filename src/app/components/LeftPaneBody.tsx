import { useEffect } from 'react';
import { useSelector} from 'react-redux';
import { fetchChannels } from '../../store/states/channels';
import { RootState, useAppDispatch } from '../../store/store';
import ChannelsList from './ChannelsList';

import styles from '../styles/LeftPaneBody.module.css'

const LeftPaneBody = () =>{
    console.log("LeftPaneBody rerender")

    const dispatch = useAppDispatch();
    const channels = useSelector((state: RootState) => state.channelsList);

    useEffect(()=>{
        dispatch(fetchChannels())
    },[dispatch])

    return(
        <div className = {styles.body}>
            <div className = {styles.bodyMain}>
                {
                    channels.isDataLoading
                    ? <div></div>
                    : <ChannelsList/>
                }        
            </div>
        </div>
    )
}

export default LeftPaneBody;