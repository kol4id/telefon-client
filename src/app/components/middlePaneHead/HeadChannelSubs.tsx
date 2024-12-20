import { FC } from "react"
import styles from '../../styles/MiddlePaneHead.module.css';

interface IProps{
    subscribers: number
}
const HeadChannelSubs: FC<IProps> = ({subscribers}) =>{
    return(
        <>
            <div className = {styles.channel_subscribers}>
                {`${subscribers} subscribers`}
            </div>  
        </>
    )
}
export default HeadChannelSubs