import {FC, useEffect, useState } from 'react'

import styles from '../styles/MainPane.module.css'
import LeftPane from './LeftPane';
import MiddlePane from './MiddlePane';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/store';
import { Socket, io } from 'socket.io-client';
import AuthPane from './AuthPane';
import {fetchUser, fetchUserRefresh } from '../../store/states/user';

import image from '../../assets/chat-bg-pattern-dark.png';
import HandleSocketEvent from '../api/handleSocketEvent';
import { ISocketData } from '../utils/interfaces/Socket.dto';
import { fetchLastMessages, fetchOneLastMessage } from '../../store/states/messages';
import { socketInit } from '../../store/states/socket';


const MainPane: FC = () =>{
    
    // console.log("MainPane rerender")
    const dispatch = useAppDispatch();
    const cursorStyle = useSelector((state: RootState) => state.cursorStyle.value)
    const user = useSelector((state: RootState) => state.user)

    const handleAfterAuth = () =>{
        if (!user.isAuthorized) return

        dispatch(socketInit());
        dispatch(fetchLastMessages());
        dispatch(fetchOneLastMessage());
        dispatch(fetchUser());
    }


    useEffect(()=>{
        dispatch(fetchUserRefresh());
    }, [])

    useEffect(()=>{
        handleAfterAuth();
    }, [user.isAuthorized])

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
                            <div style={{display: 'none'}}>i'm here</div>
                        </React.Fragment>
                    :   <AuthPane/>  
            }
        </div>
    )
}
export default MainPane;
