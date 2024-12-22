import { FC, useEffect, useState } from "react";
import Context from "../Context";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store/store";
import MessageListModalContent from "../MessageListModalContent";
import useRightMouseDown from "../../utils/hooks/useRightMouseDown";
import { messageSetSelectedMessage } from "store/states/messages";

interface IProps {
    children: React.ReactNode;
}

const MessagesContextWraper: FC<IProps> = ({children}) =>{
    const dispatch = useAppDispatch();

    const [isOpen, setIsOpen] = useState(false);
    const [modalPos, setModalPos] = useState<{x: number, y: number}>();
    const selectedMessageId = useSelector((state: RootState) => state.messages.selectedMessageId);
    const position = useRightMouseDown(true);
    
    useEffect(()=>{
        setModalPos({x: position.mouseDownPosition.x, y: position.mouseDownPosition.y});
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
                position={modalPos}
                overlay={true}
            >
                <MessageListModalContent close={()=>{setIsOpen(false)}}/>
            </Context>
        </>
    )
}
export default MessagesContextWraper