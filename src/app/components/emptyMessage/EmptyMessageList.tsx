import { useSelector } from 'react-redux';
import styles from '../../styles/EmptyMessageList.module.css';
import EmptyMessageBody from './EmptyMessageBody';
import EmptyMessageHead from './EmptyMessageHead';
import { RootState } from 'store/store';

const EmptyMessageList = () =>{
    const currentChannel = useSelector((state: RootState) => state.channelsList.currentChannel);
    
    return(
        <section className={styles.main_box} key={Date.now()}>
            <section className={styles.box}>
                <EmptyMessageHead/>
                <EmptyMessageBody/>
            </section>
        </section>
    )
}

export default EmptyMessageList