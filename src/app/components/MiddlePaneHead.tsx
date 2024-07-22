import { useSelector } from 'react-redux';

import styles from '../styles/MiddlePaneHead.module.css'
import { RootState } from '../../store/store';
import { useEffect, useState } from 'react';
import { IChannel } from '../global/types/Channel.dto';

const MiddlePaneHead = () =>{

    console.log("MiddlePaneHead rerender")

    const currentChannel = useSelector((state:RootState) => state.channelsList.currentChannel);
    const [loading, setLoading] = useState(true);
    const [footer, setFooter] = useState('');

    useEffect(() => {
        setLoading(true)
        if (Boolean(Object.keys(currentChannel).length)){
            setLoading(false)
            // if (currentChannel.)
        }
    },[currentChannel])

    return(
        <header className = {styles.head}>
            {
                !loading && 
                <section className = {styles.channel_info}>
                    <img className = {styles.img} src={currentChannel?.imgUrl} />
                    <div>
                        <div className = {styles.channel_title}>
                            {currentChannel?.title}
                        </div>
                        <div className = {styles.channel_subscribers}>
                            {`${currentChannel?.subscribers} subscribers`}
                        </div>
                    </div>
                </section>   
            }
             
        </header>
    )
}
export default MiddlePaneHead;