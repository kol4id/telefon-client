import { FC } from "react";
import { RootState} from "../../../store/store";
import { useSelector } from "react-redux";

interface IProps{
    children: React.ReactNode
}

const CursorManager: FC<IProps> = ({children}) =>{
    const cursorStyle = useSelector((state: RootState) => state.cursorStyle.value)

    return(
        <div style={{cursor: cursorStyle}}>
            {children}
        </div>
    )
}

export default CursorManager;