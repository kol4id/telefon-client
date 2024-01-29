import { useDispatch, useSelector } from 'react-redux'
import MiddlePaneBody from '../components/MiddlePaneBody'
import MiddlePaneHead from '../components/MiddlePaneHead'

import styles from '../styles/MiddlePane.module.css'
import { RootState } from '../../store/store'
import React, { useEffect, useState } from 'react'
import { useFethcing } from '../utils/hooks/useFetching'
import FetchChannelMessages from '../api/fetchChannelMessages'
import MiddlePaneLoadPlug from '../components/MiddlePaneLoadPlug'
import { SetMessages } from '../../store/states/messages'

const MiddlePane = React.memo(() =>{

    console.log("MiddlePane rerender")

    const dispatch = useDispatch();

    const [isFirstOpen, setIsFirstOpen] = useState(true);

    const {fetching, isLoading} = useFethcing(async()=>{
        const messages = await FetchChannelMessages(currentSelected, 1);
        dispatch(SetMessages(messages));
    })    

    const currentSelected = useSelector((state: RootState) => state.channelsList.currentChannelSelected);

    useEffect(()=>{
        if(currentSelected){
            fetching();
            setIsFirstOpen(false);
        }
    }, [currentSelected])

    return(
        <div className={styles.middlePane}>
            {
                isFirstOpen
                ?   <div/>
                :   isLoading 
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