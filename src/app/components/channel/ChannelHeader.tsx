import { IChannel } from 'app/global/types/Channel.dto';
import styles from '../../styles/Channel.module.css';
import { IMessage } from 'app/global/types/Message.dto';
import { FC, useEffect, useState } from 'react';

interface IProps{
    channel: IChannel,
    message: IMessage | undefined;
}

const ChannelHeader: FC<IProps> = ({channel, message}) => {
    const [hours, setHours] = useState(String(new Date(message?.createdAt!).getHours()).padStart(2, '0'));
    const [minutes, setMinutes] = useState(String(new Date(message?.createdAt!).getMinutes()).padStart(2, '0'));

    useEffect(()=>{
        setHours(String(new Date(message?.createdAt!).getHours()).padStart(2, '0'));
        setMinutes(String(new Date(message?.createdAt!).getMinutes()).padStart(2, '0'));
    }, [message])

    return(
        <div className = {styles.channelHeader}>
            <div className={styles.channel_name}>
                {channel.title}
            </div>
            <div className={styles.channel_message_date}>
                { message?.createdAt && `${hours}:${minutes}`}
            </div>
        </div>
    )
}

export default ChannelHeader;