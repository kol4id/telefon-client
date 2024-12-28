import { FC, useEffect, useState } from "react";
import Context from "../Context";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store/store";
import MessageListModalContent from "../MessageListModalContent";
import { messageSetSelectedMessage } from "store/states/messages";
import usePointerContext from "../../utils/hooks/usePointerContext";

interface IProps {
    children: React.ReactNode;
}

const MessagesContextWraper: FC<IProps> = ({children}) =>{
    const dispatch = useAppDispatch();

    const [isOpen, setIsOpen] = useState(false);
    const selectedMessageId = useSelector((state: RootState) => state.messages.selectedMessageId);
    const position = usePointerContext(true);
    
    useEffect(()=>{
        setIsOpen(selectedMessageId == "" ? false : true);
    },[selectedMessageId])

    return(
        <>
            {children}
            <Context
                isOpen={isOpen}
                onClose={()=>{
                    setIsOpen(false);
                    dispatch(messageSetSelectedMessage(''))
                }}
                position={position}
                overlay={true}
            >
                <MessageListModalContent close={()=>{setIsOpen(false)}}/>
            </Context>
        </>
    )
}
export default MessagesContextWraper