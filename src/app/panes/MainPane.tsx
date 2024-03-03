import {FC, useEffect } from 'react'
// import AuthUser from '../api/authUser';

import styles from '../styles/MainPane.module.css'
import LeftPane from './LeftPane';
import MiddlePane from './MiddlePane';
import React from 'react';
import useLeftPaneResize from '../utils/hooks/useLeftPaneResize';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/store';
import { SetCursorStyle } from '../../store/states/cursorStyle';
import { io } from 'socket.io-client';
import AuthPane from './AuthPane';
import RefreshUser from '../api/refreshUser';
import { SetUserAuthorized, SetUserLoading, fetchUserRefresh } from '../../store/states/user';

import image from '../../assets/chat-bg-pattern-dark.png';
import HandleSocketEvent from '../api/handleSocketEvent';
import { ISocketData } from '../utils/interfaces/Socket.dto';
import { useFetching } from '../utils/hooks/useFetching';
import { fetchLastMessages } from '../../store/states/messages';


const MainPane: FC = () =>{
    
    // console.log("MainPane rerender")
    let socket = undefined;
    const dispatch = useAppDispatch();
    const cursorStyle = useSelector((state: RootState) => state.cursorStyle.value)
    const user = useSelector((state: RootState) => state.user)

    const handleDispatch = (action: any) =>{
        dispatch(action)
    }

    const {inResizePosition, currentlyResizing} = useLeftPaneResize();

    useEffect(()=>{
        dispatch(fetchUserRefresh());
    }, [])

    useEffect(()=>{
        if(user.isAuthorized){
            dispatch(fetchLastMessages());
        }
    }, [user.isAuthorized])

    useEffect(()=>{
        if(user.isAuthorized){
            socket = io('http://localhost:4200', {
                transports: ['websocket'],
                withCredentials: true
            })  
            socket.on('personalMessage', (data: ISocketData) => {
                console.log(data)
                HandleSocketEvent(data, handleDispatch)
            });
        }
    }, [user.isAuthorized])

    useEffect(()=>{
        if(inResizePosition || currentlyResizing){
            dispatch(SetCursorStyle(true))
        } else { dispatch(SetCursorStyle(false)) }
    },[inResizePosition, currentlyResizing])

    return(
        <div className = {styles.main}
            style={{
                cursor: cursorStyle,
                backgroundImage: `url(${image})` ,
            }}
        >             
            {
                user.isLoading
                ?   <div></div>
                :   user.isAuthorized
                    ?   <React.Fragment>
                            <LeftPane/>            
                            <MiddlePane/>
                        </React.Fragment>
                    :   <AuthPane/>  
            }
        </div>
    )
}
export default MainPane;
