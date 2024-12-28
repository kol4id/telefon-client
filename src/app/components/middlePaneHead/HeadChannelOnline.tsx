import formatDate from "../../../app/utils/general/formatDate";
import { FC, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import styles from '../../styles/MiddlePaneHead.module.css';

interface IProps{
    channelId: string
}
const HeadChannelOnline: FC<IProps> = ({channelId}) => {

    const undefinedDate = 'last seen recently';
    const channelOwner = useSelector((state: RootState) => state.channelsList.channelsOwner[channelId]);
    const channelOnlineStatus = useSelector((state: RootState) => state.channelsList.channelsOnlineStatus[channelId]);

    const date = channelOwner?.lastLogin ?? '';
    const [lastSeen, setLastSeen] = useState(undefinedDate);

    useLayoutEffect(()=>{
        setLastSeen(date ? formatDate(new Date(date)) : undefinedDate)
        const interval = setInterval(() => {
            if (date) setLastSeen(formatDate(new Date(date)))
        }, 30000);

        return ()=> {clearInterval(interval)}
    }, [channelOwner])
    
    return(
        <>
            {
                channelOnlineStatus 
                ? <h2 className={styles.channel_online}>online</h2>
                : <h2 className={styles.channel_last_seen}>{lastSeen ?? undefinedDate}</h2>
            }
        </>
    )
}
export default HeadChannelOnline