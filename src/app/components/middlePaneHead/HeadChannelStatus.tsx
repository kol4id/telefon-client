import { FC, useMemo } from 'react';
import styles from '../../styles/MiddlePaneHead.module.css';
import { IChannel } from 'app/global/types/Channel.dto';
import HeadChannelSubs from './HeadChannelSubs';
import HeadChannelOnline from './HeadChannelOnline';

interface IProps{
    channel: IChannel;
}

const HeadChannelStatus: FC<IProps> = ({channel}) =>{
    const status = useMemo(()=>{
        if(channel.channelType == 'user'){
            return(<HeadChannelOnline channelId={channel.id}/>);
        } 
        return (<HeadChannelSubs subscribers={channel.subscribers}/>);
    }, [channel.id])

    return(
        <section className={styles.channel_status}>
            {status}
        </section>
    )
}
export default HeadChannelStatus