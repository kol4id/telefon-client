import styles from '../styles/MiddlePaneBody.module.css';
import InputContainer from './InputContainer';
import ResizeBar from './ResizeBar';
import MessagesManager from './MessagesManager';
import MessageDropZone from './MessageDropZone';

const MiddlePaneBody = () =>{
    console.log("MiddlePaneBody rerender")
    return(
        <article id='middle_body' className={styles.body}>
            <MessageDropZone/>
            <section className={styles.re_bar}>
                <ResizeBar/>
            </section>
            <div className={styles.transition}>
                <section className={styles.messages_transition}>
                    <MessagesManager/>
                </section>
                    <InputContainer/>
            </div>
        </article>
    )
}
export default MiddlePaneBody