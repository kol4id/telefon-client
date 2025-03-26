import styles from '../../styles/EmptyMessageList.module.css';
import EmptyMessageBody from './EmptyMessageBody';
import EmptyMessageHead from './EmptyMessageHead';

const EmptyMessageList = () =>{
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