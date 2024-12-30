import { FC } from "react"
import styles from '../../styles/MiddlePaneHead.module.css';
import { IChannel } from "app/global/types/Channel.dto";
import HeadChannelStatus from "./HeadChannelStatus";
import AvatarImage from "../image/AvatarImage";

interface IProps{
    isLoading: boolean,
    channel: IChannel | undefined
}

const HeadChannelInfo: FC<IProps> = ({isLoading, channel}) => {
    return(
        !isLoading && 
        <section className = {styles.channel_info}>
            <AvatarImage img={channel?.imgUrl}/>
            <div>
                <div className = {styles.channel_title}>
                    {channel?.title}
                </div>
                {channel && <HeadChannelStatus channel={channel}/>}
            </div>
        </section>   
    )
}

export default HeadChannelInfo