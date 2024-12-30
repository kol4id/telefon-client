import styles from '../../styles/EmptyMessageList.module.css'

const EmptyMessageHead = () =>{
    return(
        <section className={styles.header}>
            <h2 className={styles.header_h2}>No messages here yet...</h2>
            <p className={styles.header_p}>Send a message to start new dialog</p>
        </section>
    )
} 
export default EmptyMessageHead