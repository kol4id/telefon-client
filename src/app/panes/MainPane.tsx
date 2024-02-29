import {FC, useEffect } from 'react'
// import AuthUser from '../api/authUser';

import styles from '../styles/MainPane.module.css'
import LeftPane from './LeftPane';
import MiddlePane from './MiddlePane';
import React from 'react';
import useLeftPaneResize from '../utils/hooks/useLeftPaneResize';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { SetCursorStyle } from '../../store/states/cursorStyle';
import { io } from 'socket.io-client';
import AuthPane from './AuthPane';
import RefreshUser from '../api/refreshUser';
import { SetUserAuthorized, SetUserLoading } from '../../store/states/user';

import image from '../../assets/chat-bg-pattern-dark.png';
import HandleSocketEvent from '../api/handleSocketEvent';
import { ISocketData } from '../utils/interfaces/Socket.dto';
import { useFetching } from '../utils/hooks/useFetching';


const MainPane: FC = () =>{
    
    // console.log("MainPane rerender")
    let socket = undefined;
    const dispatch = useDispatch();
    const cursorStyle = useSelector((state: RootState) => state.cursorStyle.value)
    const user = useSelector((state: RootState) => state.user)

    const handleDispatch = (action: any) =>{
        dispatch(action)
    }

    const {inResizePosition, currentlyResizing} = useLeftPaneResize();

    const [UserRefresh] = useFetching(async()=>{
        await RefreshUser();
        //if ^ code failed code below v will not be executed
        dispatch(SetUserAuthorized(true));    
    });

    const UserRefreshExecutor = async() => {
        await UserRefresh();
        dispatch(SetUserLoading(false));
    }

    useEffect(()=>{
        UserRefreshExecutor()
    }, [])

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
