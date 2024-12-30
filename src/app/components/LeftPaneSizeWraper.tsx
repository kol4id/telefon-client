import { RootState, useAppDispatch } from "store/store";
import useWindowSize from "../utils/hooks/useWindowSize";
import { FC } from "react";
import { setIsNarrow, setLeftDisplayed } from "store/states/width";
import { useSelector } from "react-redux";

interface IProps{
    children: React.ReactNode;
}

const LeftPaneSizeWraper: FC<IProps> = ({children}) =>{
    const dispatch = useAppDispatch();
    const windowSize = useWindowSize();
    const isNarrow = useSelector((state: RootState) => state.width.isNarrow);
    const currentChannel = useSelector((state: RootState) => state.channelsList.currentChannelSelected);

    if (windowSize.width <= 600){
        if (!isNarrow){
            dispatch(setIsNarrow(true));
            if (currentChannel) dispatch(setLeftDisplayed(false));
        }
    } else { isNarrow && dispatch(setIsNarrow(false)) }

    return(
        <>
            {children}
        </>
    )
}

export default LeftPaneSizeWraper