import { FC, useEffect, useRef, useState } from "react";
import notification_sound from "../../../assets/notification.mp3"
import { useAppDispatch } from "store/store";
import { socketSetOnlineStatus } from "store/states/socket";

interface IProps{
    children: React.ReactNode
}
const EventManager: FC<IProps> = ({children}) => {

    const dispatch = useAppDispatch();

    const [originalTitle] = useState('telefon');
    const notification = useRef<HTMLAudioElement>(new Audio(notification_sound))

    const playNotificationSound = async() => {
        notification.current.play().catch((error) => {
            console.error('Ошибка воспроизведения звука:', error);
        });
    }

    const showNotification = () => {
        document.title = originalTitle + ' 🔴'; 
    }

    const handleMessageRecived = () =>{
        if(!document.hidden) return;
        playNotificationSound();
        showNotification();
    }

    const handleVisibilityChange = () => {
        if(!document.hidden) resetNotification();
        dispatch(socketSetOnlineStatus(!document.hidden));
    };

    const resetNotification = () => {
        document.title = originalTitle;
    };

    useEffect(()=>{
        document.addEventListener('messageRecived', handleMessageRecived)
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('messageReceived', handleMessageRecived);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [])

    return(
        <>
            {children}
        </>
    )
}

export default EventManager;