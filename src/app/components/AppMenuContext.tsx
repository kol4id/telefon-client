import { FC, useContext } from "react";
import ModalMenuButton from "./ModalMenuButton";
import { LeftPaneTypeContext } from "./LeftPaneManager";

import logout from '../../assets/logout.png';
import settings from '../../assets/settings.png';
new Image().src = logout;
new Image().src = settings;


import { useAppDispatch } from '../../store/store';
import { logoutUser } from "../../store/states/user";

interface IProps{
    close: ()=>void
}

const AppMenuContext:FC<IProps> = ({close}) => {
    const paneType = useContext(LeftPaneTypeContext);
    const dispatch = useAppDispatch();

    const openSettings = () =>{
        paneType.setPaneType('settings')
        close()
    }

    const _logoutUser = () =>{
        dispatch(logoutUser());
    }

    return(
        <section style={{margin: '4px', boxSizing: 'border-box'}}>
            <ModalMenuButton text="settings" callback={()=>openSettings()} img_url={settings}/>
            <ModalMenuButton text="logout" callback={()=>_logoutUser()} style={{color: 'red'}} img_url={logout}/>
        </section>
    )
}

export default AppMenuContext