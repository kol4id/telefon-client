import {useRef} from 'react';
import styles from '../styles/MiddlePaneBody.module.css'
import InputContainer from './InputContainer'
import MessagesList from './MessagesList'
import ResizeBar from './ResizeBar';

const MiddlePaneBody = () =>{

    console.log("MiddlePaneBody rerender")
    const bodyMain = useRef<HTMLDivElement>(null);

    return(
        <div className={styles.body}>
            <ResizeBar/>
            <div className={styles.body_transition}> 
                <div className={styles.bodyMain}
                    id='bodyTransition'
                    ref={bodyMain}
                >
                    <MessagesList/>
                </div>
                <InputContainer/>            
            </div>            
        </div>
    )
}
export default MiddlePaneBody