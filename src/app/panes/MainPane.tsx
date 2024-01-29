import {FC, useEffect} from 'react'
import AuthUser from '../api/authUser';

import styles from '../styles/MainPane.module.css'
import LeftPane from './LeftPane';
import { useFethcing } from '../utils/hooks/useFetching';
import MiddlePane from './MiddlePane';
import React from 'react';
import useLeftPaneResize from '../utils/hooks/useLeftPaneResize';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { SetCursorStyle } from '../../store/states/cursorStyle';

const MainPane: FC = () =>{
    
    // console.log("MainPane rerender")

    const dispatch = useDispatch();
    const cursorStyle = useSelector((state: RootState) => state.cursorStyle.value)

    const {inResizePosition, currentlyResizing} = useLeftPaneResize();
    const {fetching, isLoading} = useFethcing(async()=>{
        await AuthUser();
    })

    useEffect(()=>{
        fetching()
    }, [])

    useEffect(()=>{
        if(inResizePosition || currentlyResizing){
            dispatch(SetCursorStyle(true))
        } else { dispatch(SetCursorStyle(false)) }
    },[inResizePosition, currentlyResizing])

    return(
        <div className = {styles.main}
            style={{cursor: cursorStyle}}
        >
           {
                isLoading
                ?   <div></div>  
                :   <React.Fragment>
                        <LeftPane/>            
                        <MiddlePane/>
                    </React.Fragment> 
           }
        </div>
    )
}
export default MainPane;
