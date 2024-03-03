import { useSelector } from 'react-redux';

import styles from '../styles/MiddlePaneHead.module.css'
import { RootState } from '../../store/store';
import { useEffect, useState } from 'react';
import { IChannel } from '../utils/interfaces/Channel.dto';

const MiddlePaneHead = () =>{

    console.log("MiddlePaneHead rerender")

    const channels = useSelector((state:RootState) => state.channelsList.channels);
    const currentChannelId = useSelector((state:RootState) => state.channelsList.currentChannelSelected);

    const [currentChannel, setCurrentChannel] = useState<IChannel>();
    
    useEffect(()=>{
        channels.filter((channel)=> {
            if (channel.id === currentChannelId){
                setCurrentChannel(channel);
            }
        })
    }, [currentChannelId])

    return(
        <div className = {styles.head}>
            <img className = {styles.img} src={currentChannel?.imgUrl} />
            <div className = {styles.channel_info}>
                <div className = {styles.channel_title}>
                    {currentChannel?.title}
                </div>
                <div className = {styles.channel_subscribers}>
                    {`${currentChannel?.subscribers} subscribers`}
                </div>
            </div>
            
            
        </div>
    )
}
export default MiddlePaneHead;