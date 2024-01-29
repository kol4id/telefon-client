import { useState } from 'react';
import styles from '../styles/MiddlePaneBody.module.css'
import InputContainer from './InputContainer'
import MessagesList from './MessagesList'

const MiddlePaneBody = () =>{

    console.log("MiddlePaneBody rerender")

    const [sendMessageMargin] = useState<number>(0);

    return(
        <div className={styles.body}>
            <div className={styles.bodyMain}>
                <MessagesList/>
            </div>
            <InputContainer sendMessageMargin={sendMessageMargin}/>
        </div>
    )
}
export default MiddlePaneBody