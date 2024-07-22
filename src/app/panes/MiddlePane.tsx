import MiddlePaneHead from '../components/MiddlePaneHead'

import styles from '../styles/MiddlePane.module.css'
import React, { useEffect } from 'react'
import MiddlePaneBody from '../components/MiddlePaneBody'
import { RootState, useAppDispatch } from '../../store/store'
import { fetchLastMessages } from '../../store/states/messages'
import { fetchChannel } from '../../store/states/channels'
import { useSelector } from 'react-redux'


const MiddlePane = React.memo(() =>{
    console.log("MiddlePane rerender")

    const dispatch = useAppDispatch();
    const selectedChannel = useSelector((state: RootState) => state.channelsList.currentChannelSelected);

    useEffect(()=>{
        if (selectedChannel){
            dispatch(fetchChannel(selectedChannel));
        }
        dispatch(fetchLastMessages());
    }, [selectedChannel])

    return(
        <React.Fragment>
            <div className={styles.middlePane}>
                <MiddlePaneHead/>
                <MiddlePaneBody/>
            </div>
        </React.Fragment>
    )
})
export default MiddlePane