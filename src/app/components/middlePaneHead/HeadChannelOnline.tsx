import formatDate from "../../../app/utils/general/formatDate";
import { FC, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import styles from '../../styles/MiddlePaneHead.module.css';

interface IProps{
    channelId: string
}
const HeadChannelOnline: FC<IProps> = ({channelId}) => {

    const channelOwner = useSelector((state: RootState) => state.channelsList.channelsOwner[channelId]);
    const channelOnlineStatus = useSelector((state: RootState) => state.channelsList.channelsOnlineStatus[channelId]);

    const date = channelOwner?.lastLogin ?? Date.now();
    const [lastSeen, setLastSeen] = useState(formatDate(new Date(date)));

    useLayoutEffect(()=>{
        setLastSeen(formatDate(new Date(date)))
        const interval = setInterval(() => {
            setLastSeen(formatDate(new Date(date)))
        }, 30000);

        return ()=> {clearInterval(interval)}
    }, [channelOwner])
    
    return(
        <>
            {
                channelOnlineStatus 
                ? <h2 className={styles.channel_online}>online</h2>
                : <h2 className={styles.channel_last_seen}>{lastSeen}</h2>
            }
        </>
    )
}
export default HeadChannelOnline