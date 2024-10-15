import MiddlePaneHead from '../components/MiddlePaneHead'

import styles from '../styles/MiddlePane.module.css'
import React, { useEffect } from 'react'
import MiddlePaneBody from '../components/MiddlePaneBody'
import { RootState, useAppDispatch } from '../../store/store'
import { fetchLastMessages, fetchMessages } from '../../store/states/messages'
import { fetchChannel, fetchChat } from '../../store/states/channels'
import { useSelector } from 'react-redux'


const MiddlePane = React.memo(() =>{
    console.log("MiddlePane rerender")

    const dispatch = useAppDispatch();
    const selectedChannel = useSelector((state: RootState) => state.channelsList.currentChannelSelected);
    const selectedChat = useSelector((state: RootState) => state.channelsList.currentChat);

    useEffect(()=>{
        if (selectedChannel){
            dispatch(fetchChannel(selectedChannel));
            dispatch(fetchChat(selectedChannel));
            dispatch(fetchMessages({chatId: selectedChat?.id!, limit: 25}))
        }
    }, [selectedChannel])

    useEffect(()=>{
        dispatch(fetchLastMessages());
    },[])

    return(
        <React.Fragment>
            <div className={styles.middlePane}>
                <div id="middle-portal"></div>
                <MiddlePaneHead/>
                <MiddlePaneBody/>
            </div>
        </React.Fragment>
    )
})
export default MiddlePane