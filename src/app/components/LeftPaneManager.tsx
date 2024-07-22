import { createContext, useEffect, useState } from "react";
import LeftPaneChannels from "./LeftPaneChannels";
import LeftPaneCreateChannel from "./LeftPaneCreateChannel";

export type LeftPaneType = |'channels'|'setings'|'channel-create';

enum LeftPaneT {
    channels = 'channels',
    setings = 'setings',
    channelCreate = 'channel-create'
}

export const LeftPaneTypeContext = createContext({
    paneType: "",
    setPaneType: (value: LeftPaneType) => {}
});

const LeftPaneManager = () =>{
    const [paneType, setType] = useState<LeftPaneType>('channels');
    const [component, setComponent] = useState<React.ReactNode>(<LeftPaneChannels/>);

    const setPaneType = (value: LeftPaneType) => setType(value);

    useEffect(()=>{
        switch(paneType){
            case LeftPaneT.channels: setComponent(<LeftPaneChannels/>); break 
            case LeftPaneT.channelCreate: setComponent(<LeftPaneCreateChannel/>); break 
        }
    },[paneType])

    return(
        <LeftPaneTypeContext.Provider value={{paneType, setPaneType}}>
            {component}
        </LeftPaneTypeContext.Provider>
    )
}

export default LeftPaneManager