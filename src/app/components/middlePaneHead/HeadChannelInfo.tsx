import { FC } from "react"
import styles from '../../styles/MiddlePaneHead.module.css';
import { IChannel } from "app/global/types/Channel.dto";
import HeadChannelStatus from "./HeadChannelStatus";

interface IProps{
    isLoading: boolean,
    channel: IChannel | undefined
}

const HeadChannelInfo: FC<IProps> = ({isLoading, channel}) => {
    return(
        !isLoading && 
        <section className = {styles.channel_info}>
            <img className = {styles.img} src={channel?.imgUrl} />
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