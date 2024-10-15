import { createContext, useEffect, useState } from "react";
import LeftPaneChannels from "./LeftPaneChannels";
import LeftPaneCreateChannel from "./LeftPaneCreateChannel";
import AppMenuProfileEdit from "./AppMenuProfileEdit";

export type LeftPaneType = |'channels'|'settings'|'channel-create';

enum LeftPaneT {
    channels = 'channels',
    settings = 'settings',
    channelCreate = 'channel-create'
}

export const LeftPaneTypeContext = createContext<{
    paneType: LeftPaneType;
    setPaneType: (value: LeftPaneType) => void;
}>({
    paneType: 'channels', // Укажите значение по умолчанию
    setPaneType: () => {}, // Пустая реализация для инициализации контекста
});

const LeftPaneManager = () =>{
    const [paneType, setType] = useState<LeftPaneType>('channels');
    const [component, setComponent] = useState<React.ReactNode>(<LeftPaneChannels/>);

    const setPaneType = (value: LeftPaneType) => setType(value);

    useEffect(()=>{
        switch(paneType){
            case LeftPaneT.channels: setComponent(<LeftPaneChannels/>); break 
            case LeftPaneT.channelCreate: setComponent(<LeftPaneCreateChannel/>); break 
            case LeftPaneT.settings: setComponent(<AppMenuProfileEdit/>); break
        }
    },[paneType])

    return(
        <LeftPaneTypeContext.Provider value={{paneType, setPaneType}}>
            {component}
        </LeftPaneTypeContext.Provider>
    )
}

export default LeftPaneManager