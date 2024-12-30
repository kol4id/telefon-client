import { createContext, useState } from "react";
import CreateChannelSelectUsers from "./CreateChannelSelectUsers";
import CreateChannelNameChannel from "./CreateChannelNameChannel";
import { AnimatePresence, motion } from "framer-motion";

interface CreateChannelContextType{
    selectedChannels: Set<string>,
    channelsSelectedAction: (value: string, isAdd: boolean) => void,
    setPhase: (phase: currentPhase) => void
}

type currentPhase = | 'selectUsers' | 'nameChannel';

export const CreateChannelContext = createContext<CreateChannelContextType>({
    selectedChannels: new Set(),
    channelsSelectedAction: () => {},
    setPhase: () => {}
})

const LeftPaneCreateChannel = () => {
    const [currentPhase, setCurrentPhase] = useState<currentPhase>('selectUsers');
    const [selectedChannels, setSelectedChannels] = useState<Set<string>>(new Set());

    const setPhase = (phase: currentPhase) => {setCurrentPhase(phase)};
    const channelsSelectedAction = (value: string, isAdd: boolean) => {
        setSelectedChannels((prev) => {
            const newSet = new Set(prev);
            if (isAdd) newSet.add(value);
            else newSet.delete(value);
            return newSet;  
        });
    }

    const renderPane = () =>{
        switch(currentPhase){
            case 'selectUsers': return <CreateChannelSelectUsers/>;
            case 'nameChannel': return <CreateChannelNameChannel/>
        }
    }

    return(
        <>
            <CreateChannelContext.Provider value={{selectedChannels, channelsSelectedAction, setPhase}}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentPhase}
                        initial={{ x: 300, opacity: 0 }} 
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ scale: 0.85, opacity: 0 }}
                        transition={{ duration: 0.12, ease: 'easeIn'}}
                    >
                        {renderPane()}
                    </motion.div>
                </AnimatePresence>
            </CreateChannelContext.Provider>
        </>
    )
}
export default LeftPaneCreateChannel