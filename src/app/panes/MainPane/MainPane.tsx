import { FC, useEffect } from 'react';
import LeftPane from '../LeftPane';
import { RootState, useAppDispatch } from '../../../store/store';
import image from '../../../assets/chat-bg-pattern-dark.png';
new Image().src = image;

import { socketInit } from '../../../store/states/socket';
import CursorManager from './CursorManager';

import styles from '../../styles/MainPane.module.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EventManager from './EventManager';

const MainPane: FC = () =>{
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user.userData)

    useEffect(()=>{
        if (!user.firstName || !user.userName){
            navigate('/register/data')
        }
        dispatch(socketInit());
    }, [])

    return(
        <EventManager>
        <CursorManager>
            <article className = {styles.main}
                style={{backgroundImage: `url(${image})`}}
                id='main_pane'
            >
                <LeftPane/>
                <Outlet/>
            </article>        
        </CursorManager>
        </EventManager>
    )
}
export default MainPane;
