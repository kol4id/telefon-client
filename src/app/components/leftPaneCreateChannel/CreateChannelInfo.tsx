import { IChannel } from 'app/global/types/Channel.dto';
import { FC, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

import styles from '../../styles/LeftPaneCreateChannel.module.css';

import formatDate from '../../../app/utils/general/formatDate';

interface IProps{
    channel: IChannel
}

const CreateChannelInfo: FC<IProps> = ({channel}) => {
    
    const channelOwner = useSelector((state: RootState) => state.channelsList.channelsOwner[channel.id]);
    const channelOnlineStatus = useSelector((state: RootState) => state.channelsList.channelsOnlineStatus[channel.id]);

    const [lastSeen, setLastSeen] = useState(formatDate(new Date(channelOwner?.lastLogin!)));

    useLayoutEffect(()=>{
        const interval = setInterval(() => {
            setLastSeen(formatDate(new Date(channelOwner?.lastLogin!)))
        }, 30000);

        return ()=> {clearInterval(interval)}
    }, [])

    return(
        <>
            <section className={styles.channel_info}>
                <p className={styles.channel_info_title}>{channel.title}</p>
                <p className={styles.channel_info_status}>{
                    channelOnlineStatus 
                    ? <p className={styles.channel_info_online}>online</p>
                    : lastSeen
                }</p>
            </section>
        </>
    )
}
export default CreateChannelInfo