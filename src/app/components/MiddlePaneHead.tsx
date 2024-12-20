import { useSelector } from 'react-redux';

import styles from '../styles/MiddlePaneHead.module.css';
import { RootState } from '../../store/store';
import { useEffect, useState } from 'react';
import HeadMenuButton from './middlePaneHead/HeadMenuButton';
import HeadChannelInfo from './middlePaneHead/HeadChannelInfo';

const MiddlePaneHead = () =>{

    console.log("MiddlePaneHead rerender")

    const currentChannel = useSelector((state:RootState) => state.channelsList.currentChannel);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        if (Boolean(Object.keys(currentChannel).length)){
            setLoading(false)
        }
    },[currentChannel])

    return(
        <header className = {styles.head}>            
            <HeadMenuButton/>
            <HeadChannelInfo isLoading={loading} channel={currentChannel}/>
        </header>
    )
}
export default MiddlePaneHead;