import { useSelector } from 'react-redux'
import MiddlePaneBody from '../components/MiddlePaneBody'
import MiddlePaneHead from '../components/MiddlePaneHead'

import styles from '../styles/MiddlePane.module.css'
import { RootState, useAppDispatch } from '../../store/store'
import React, { useEffect, useState } from 'react'
import { fetchMessages } from '../../store/states/messages'

const MiddlePane = React.memo(() =>{

    console.log("MiddlePane rerender")

    const dispatch = useAppDispatch();

    const [isFirstOpen, setIsFirstOpen] = useState<boolean>(true);

    const currentSelected = useSelector((state: RootState) => state.channelsList.currentChannelSelected);

    useEffect(()=>{
        if(currentSelected){
            dispatch(fetchMessages({channelId: currentSelected, chunkNumber: 1}))
            setIsFirstOpen(false);
        }
    }, [currentSelected])

    return(
        <React.Fragment>
            {
                isFirstOpen
                ?   <div/>
                :   <div className={styles.middlePane}>
                        <MiddlePaneHead/>
                        <MiddlePaneBody/>
                    </div>
            }  
        </React.Fragment>
    )
})
export default MiddlePane