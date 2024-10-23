import { IMessage } from 'app/global/types/Message.dto';
import styles from '../../styles/Channel.module.css'
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { IChat } from 'app/global/types/Chat.dto';

interface IProps{
    message: IMessage | undefined;
    chat: IChat | undefined;
}

const ChannelBody: FC<IProps> = ({message, chat}) => {
    const isUnreadCountPending = useSelector((state: RootState) => state.messages.isUnreadCountPending);
    const unreadMessagesCount = useSelector((state: RootState) => state.messages.totalUnreadMessages);

    return(
        <div className = {styles.channelBody}>
            <div className={styles.channel_body_content}>
                {message?.content ?? ''}
            </div>
            {
                (!isUnreadCountPending && Boolean(unreadMessagesCount?.[chat?.id!])) &&
                <div className={styles.channel_body_unread_count}>
                    {unreadMessagesCount?.[chat?.id!]}
                </div>
            }
        </div>
    )
}

export default ChannelBody