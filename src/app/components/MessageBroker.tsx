import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import { useEffect } from "react";

import { socketSendRead } from "../../store/states/socket";

interface IProps {
    children: React.ReactNode;
}
  
const MessageBroker: React.FC<IProps> = ({ children }) => {
    const dispatch = useAppDispatch();
    const lastReadsQueue = useSelector((state: RootState) => state.messages.lastReadsQueue);

    useEffect(()=>{
        let intervalId: number;
        if(lastReadsQueue.length){
            intervalId = setInterval(()=>{
                dispatch(socketSendRead());
            }, 200)
        }
        return () => clearInterval(intervalId);
    }, [lastReadsQueue])

    return (
        <>
            {children}
        </>
    );
};

export default MessageBroker;