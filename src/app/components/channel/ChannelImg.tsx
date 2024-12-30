import { IChannel } from "app/global/types/Channel.dto"
import { FC } from "react"

import styles from '../../styles/Channel.module.css'
interface IProps {
    channel: IChannel
    isOnline: boolean
}

const ChannelImg: FC<IProps> = ({channel, isOnline}) =>{
    return(
        <>
            <div className = {styles.channelImg}>
                {
                    isOnline && <div className={styles.online_icon}/>
                }
                <img src = {channel.imgUrl}/>    
            </div>
        </>
    )
}
export default ChannelImg