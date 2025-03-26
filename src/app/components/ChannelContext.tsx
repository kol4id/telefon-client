import ModalMenuButton from "./ModalMenuButton";

import trash_box_img from '../../assets/trash.png';
import new_tab from '../../assets/new-tab.png';
import ModalMenuSeparator from "./ModalMenuSeparator";
import { FC } from "react";
import { baseAppUrl } from "../../state";
new Image().src = trash_box_img;
new Image().src = new_tab;

const url = baseAppUrl //'http://localhost:5173/a/'

interface IProps{
    channelId: string
    onClose: ()=> void
    handleModalOpen: (a: boolean) => void
}

const ChannelContext: FC<IProps> = ({channelId, onClose, handleModalOpen}) =>{

    const handleLeave = () =>{
        handleModalOpen(true);
        onClose();
    }

    return(
        <>
            <section style={{padding: '5px 3px', boxSizing: 'border-box'}}>
                <ModalMenuButton text="Open in new tab" img_url={new_tab} callback={()=>{window.open(`${url + channelId}`, "_blank")}}/>  
                <ModalMenuSeparator/>
                <ModalMenuButton text="Leave" style={{color: 'rgb(255, 50, 50)'}} img_url={trash_box_img} callback={handleLeave}/>  
            </section>
            
        </>
    )
}
export default ChannelContext