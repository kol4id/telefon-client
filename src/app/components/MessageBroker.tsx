import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import { useEffect } from "react";

import { socketSendRead } from "../../store/states/socket";
import { useDebounce } from "../utils/hooks/useDebounce";


interface IProps {
    children: React.ReactNode;
}
  
const MessageBroker: React.FC<IProps> = ({ children }) => {
    const dispatch = useAppDispatch();
    
    const debounceRead = useDebounce(() => {
        dispatch(socketSendRead())
    }, 200)

    const lastReadsQueue = useSelector((state: RootState) => state.messages.lastReadsQueue);

    useEffect(()=>{
        if(lastReadsQueue.length) debounceRead();
        
    }, [lastReadsQueue])

    return (
        <>
            {children}
        </>
    );
};

export default MessageBroker;