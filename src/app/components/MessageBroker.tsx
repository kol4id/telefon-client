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
    const lastReadsQueue = useSelector((state: RootState) => state.messages.lastReadsQueue);

    const debounceRead = useDebounce(() => {
        dispatch(socketSendRead(lastReadsQueue))
    }, 200)

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