import { FC, useContext } from "react"
import ModalMenuButton from "./ModalMenuButton"
import { LeftPaneTypeContext } from "./LeftPaneManager";
import { useAppDispatch } from "store/store";
import { setChannelCreationType } from "store/states/appEvents";

interface IProps{
    close: ()=>void
}

const CreateChannelModalContent: FC<IProps> = ({close}) => {
    const dispatch = useAppDispatch();
    const paneType = useContext(LeftPaneTypeContext);
    
    const defaultAction = () =>{
        paneType.setPaneType('channel-create')
        close();
    }

    return(
        <section style={{margin: '4px', boxSizing: 'border-box'}}
            onClick={defaultAction}
        >
            <ModalMenuButton text="create group" callback={()=>{
                dispatch(setChannelCreationType('group'))
            }}/>
            <ModalMenuButton text="create channel" callback={()=>{
                dispatch(setChannelCreationType('channel'))
            }}/>
        </section>
    )
}

export default CreateChannelModalContent