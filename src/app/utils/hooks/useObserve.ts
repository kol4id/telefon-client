import { IMessage } from "app/global/types/Message.dto";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { messagePushToLastReadsQueue, messagesDecUnreadCount } from "store/states/messages";
import { SetUserLastRead, updateUser } from "store/states/user";
import { RootState, useAppDispatch } from "store/store";


export interface IObserveParams{
    message: IMessage,
    self: boolean,
}

const useObserveMessage = (message: IMessage, self: boolean, ref: React.MutableRefObject<HTMLDivElement>) =>{
    const dispatch = useAppDispatch();
    const userLastRead = useSelector((state: RootState) => state.user.userData.lastReads);

    const handleObserve = () => {
        console.log(`message ${message.id} has been read`)
        dispatch(SetUserLastRead({chatId: message.chatId, date: message.createdAt}));
        dispatch(messagesDecUnreadCount(message.chatId));
        dispatch(updateUser({}));
        if(self) return
        dispatch(messagePushToLastReadsQueue(message));
    }

    const observer: IntersectionObserver = new IntersectionObserver(entries =>{
        if(entries[0].isIntersecting){
            handleObserve();
            observer.unobserve(ref.current);
        }
    });

    const startObserving = () =>{
        if(userLastRead?.[message.chatId] >= message.createdAt) return
        observer.observe(ref.current);
    }

    useEffect(()=>{
        startObserving();
        return () => observer.disconnect();
    }, [])
}
export default useObserveMessage