import { FC, useContext } from "react"
import ModalMenuButton from "./ModalMenuButton"
import { LeftPaneTypeContext } from "./LeftPaneManager";

interface IProps{
    close: ()=>void
}

const AppMenuContext:FC<IProps> = ({close}) => {
    const paneType = useContext(LeftPaneTypeContext);

    const openSettings = () =>{
        paneType.setPaneType('settings')
        close()
    }

    return(
        <section style={{margin: '4px', boxSizing: 'border-box'}}>
            <ModalMenuButton text="settings" callback={()=>openSettings()}/>
        </section>
    )
}

export default AppMenuContext