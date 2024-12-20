import { createContext, useState } from "react";
import LeftPaneChannels from "./LeftPaneChannels";
import LeftPaneCreateChannel from "./leftPaneCreateChannel/LeftPaneCreateChannel";
import AppMenuProfileEdit from "./AppMenuProfileEdit";

export type LeftPaneType = |'channels'|'settings'|'channel-create';

import { AnimatePresence, motion } from "framer-motion";

interface LeftPaneContextType {
    paneType: LeftPaneType;
    setPaneType: (value: LeftPaneType) => void;
}

export const LeftPaneTypeContext = createContext<LeftPaneContextType>({
    paneType: 'channels', 
    setPaneType: () => {}, 
});

const LeftPaneManager = () =>{
    const [paneType, setType] = useState<LeftPaneType>('channels');

    const setPaneType = (value: LeftPaneType) => setType(value);

    const renderPane = () => {
        switch (paneType) {
            case 'channels': return <LeftPaneChannels />;
            case 'channel-create': return <LeftPaneCreateChannel />;
            case 'settings': return <AppMenuProfileEdit />;
            default: return null;
        }
    };

    return(
        <LeftPaneTypeContext.Provider value={{paneType, setPaneType}}>
            <AnimatePresence mode="wait">
            <motion.div
                key={paneType}
                initial={{ x: 300, opacity: 0 }} 
                animate={{ x: 0, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ duration: 0.12, ease: 'easeIn'}}
            >
                {renderPane()}
            </motion.div>
            </AnimatePresence>
        </LeftPaneTypeContext.Provider>
    )
}

export default LeftPaneManager