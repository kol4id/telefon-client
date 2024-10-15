import { IMessage } from 'app/global/types/Message.dto';
import styles from '../../styles/Channel.module.css'
import { FC } from 'react';

interface IProps{
    message: IMessage | undefined;
}

const ChannelBody: FC<IProps> = ({message}) => {
    return(
        <div className = {styles.channelBody}>
            <div className={styles.channel_body_content}>
                {message?.content ?? ''}
            </div>
            <div className={styles.channel_body_unread_count}>
                1
            </div>
        </div>
    )
}

export default ChannelBody