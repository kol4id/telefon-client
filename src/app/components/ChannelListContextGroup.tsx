import { FC, useState } from "react"
import Context from "./Context"
import { IPosition } from "app/global/types/MousePos"
import ChannelContext from "./ChannelContext"
import Modal from "./Modal"
import ChannelLeaveModal from "./ChannelLeaveModal"

interface IProps{
    isOpen: boolean,
    mousePos: IPosition | undefined,
    channelId: string,
    onClose: () => void
}

const ChannelListContextGroup: FC<IProps> = (props) =>{
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = (value: boolean) =>{
        setIsModalOpen(value);
    }

    return(
        <>
            <Context
                isOpen={props.isOpen}
                onClose={props.onClose} 
                position={props.mousePos}
                overlay={true}
                children={<ChannelContext channelId={props.channelId} onClose={props.onClose} handleModalOpen={handleModalOpen}/>}
            />
            <Modal
                isOpen={isModalOpen}
                onClose={()=>setIsModalOpen(false)}
                overlayClickClose={true}
                children={<ChannelLeaveModal channelId={props.channelId} onClose={() => setIsModalOpen(false)}/>}
            />
        </>
    )
}
export default ChannelListContextGroup