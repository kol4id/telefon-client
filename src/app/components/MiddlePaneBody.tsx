import {useRef} from 'react';
import styles from '../styles/MiddlePaneBody.module.css'
import InputContainer from './InputContainer'
import MessagesList from './MessagesManager'
import ResizeBar from './ResizeBar';
import MessagesManager from './MessagesManager';

const MiddlePaneBody = () =>{

    console.log("MiddlePaneBody rerender")
    const bodyMain = useRef<HTMLDivElement>(null);

    return(
        // <article className={styles.body}>
        //     <ResizeBar/>
        //     <div className={styles.body_transition}> 
        //         <div className={styles.bodyMain}
        //             id='bodyTransition'
        //             ref={bodyMain}
        //         >
        //             <MessagesManager/>
        //         </div>
        //         <InputContainer/>            
        //     </div>            
        // </article>
        <article className={styles.body}>
            <section className={styles.re_bar}>
                <ResizeBar/>
            </section>
            <div className={styles.transition}>
                <section className={styles.messages_transition}>
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