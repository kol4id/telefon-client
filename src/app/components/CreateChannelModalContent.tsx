import { FC, useContext } from "react"
import ModalMenuButton from "./ModalMenuButton"
import { LeftPaneTypeContext } from "./LeftPaneManager";

interface IProps{
    close: ()=>void
}

const CreateChannelModalContent: FC<IProps> = ({close}) => {
    const paneType = useContext(LeftPaneTypeContext);
    
    const createGroup = () => {
        paneType.setPaneType('channel-create')
        close();
    }

    const createChannel = () => {
        close();
    }

    return(
        <section style={{margin: '4px', boxSizing: 'border-box'}}>
            <ModalMenuButton text="create group" callback={()=>createGroup()}/>
            <ModalMenuButton text="create channel" callback={()=>createChannel()}/>
        </section>
    )
}

export default CreateChannelModalContent