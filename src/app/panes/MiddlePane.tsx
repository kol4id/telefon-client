import { useSelector } from 'react-redux'
import MiddlePaneBody from '../components/MiddlePaneBody'
import MiddlePaneHead from '../components/MiddlePaneHead'

import styles from '../styles/MiddlePane.module.css'
import { RootState, useAppDispatch } from '../../store/store'
import React, { useEffect, useState } from 'react'
import { useFetching } from '../utils/hooks/useFetching'
import FetchChannelMessages from '../api/fetchChannelMessages'
import MiddlePaneLoadPlug from '../components/MiddlePaneLoadPlug'
import { SetDataLoading, SetMessages, fetchMessages } from '../../store/states/messages'

const MiddlePane = React.memo(() =>{

    console.log("MiddlePane rerender")

    const dispatch = useAppDispatch();

    const [isFirstOpen, setIsFirstOpen] = useState<boolean>(true);

    const currentSelected = useSelector((state: RootState) => state.channelsList.currentChannelSelected);
    // const messagesIsLoading = useSelector((state: RootState) => state.messages.isLoading);

    useEffect(()=>{
        if(currentSelected){
            dispatch(fetchMessages({channelId: currentSelected, chunkNumber: 1}))
            setIsFirstOpen(false);
        }
    }, [currentSelected])

    return(
        <div className={styles.middlePane}>
            {
                isFirstOpen
                ?   <div/>
                // :   messagesIsLoading 
                //     ?   <MiddlePaneLoadPlug/>
                //     :   <React.Fragment>
                //             <MiddlePaneHead/>
                //             <MiddlePaneBody/>
                //         </React.Fragment>
                :   <React.Fragment>
                            <MiddlePaneHead/>
                            <MiddlePaneBody/>
                    </React.Fragment>
            }  
        </div>
    )
})
export default MiddlePane