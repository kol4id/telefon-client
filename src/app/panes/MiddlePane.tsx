import { useDispatch, useSelector } from 'react-redux'
import MiddlePaneBody from '../components/MiddlePaneBody'
import MiddlePaneHead from '../components/MiddlePaneHead'

import styles from '../styles/MiddlePane.module.css'
import { RootState } from '../../store/store'
import React, { useEffect, useState } from 'react'
import { useFetching } from '../utils/hooks/useFetching'
import FetchChannelMessages from '../api/fetchChannelMessages'
import MiddlePaneLoadPlug from '../components/MiddlePaneLoadPlug'
import { SetDataLoading, SetMessages } from '../../store/states/messages'

const MiddlePane = React.memo(() =>{

    console.log("MiddlePane rerender")

    const dispatch = useDispatch();

    const [isFirstOpen, setIsFirstOpen] = useState(true);

    const [GetMessages, messagesIsPending] = useFetching(async()=>{
        const messages = await FetchChannelMessages(currentSelected, 1);
        //if ^ code failed code below v will not be executed
        dispatch(SetMessages({channelId: messages[0].channelId, messages: messages}));
    });

    const GetChannelsExecutor = async() => {
        dispatch(SetDataLoading(true));
        await GetMessages();
        dispatch(SetDataLoading(false));
    }

    const currentSelected = useSelector((state: RootState) => state.channelsList.currentChannelSelected);

    useEffect(()=>{
        if(currentSelected){
            GetChannelsExecutor();
            setIsFirstOpen(false);
        }
    }, [currentSelected])

    return(
        <div className={styles.middlePane}>
            {
                isFirstOpen
                ?   <div/>
                :   messagesIsPending 
                    ?   <MiddlePaneLoadPlug/>
                    :   <React.Fragment>
                            <MiddlePaneHead/>
                            <MiddlePaneBody/>
                        </React.Fragment>
            }  
        </div>
    )
})
export default MiddlePane