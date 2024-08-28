import styles from '../styles/MiddlePaneBody.module.css';
import InputContainer from './InputContainer';
import ResizeBar from './ResizeBar';
import MessagesManager from './MessagesManager';

const MiddlePaneBody = () =>{
    console.log("MiddlePaneBody rerender")
    return(
        <article id='middle_body' className={styles.body}>
            <section className={styles.re_bar}>
                <ResizeBar/>
            </section>
            <div className={styles.transition}>
                <section id='middle_transition' className={styles.messages_transition}>
                    <MessagesManager/>
                </section>
                <section className={styles.input}>
                    <InputContainer/>
                </section>
            </div>
        </article>
    )
}
export default MiddlePaneBody