import { useEffect, useRef, useState } from 'react';
import styles from '../styles/MiddlePaneBody.module.css'
import InputContainer from './InputContainer'
import MessagesList from './MessagesList'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const MiddlePaneBody = () =>{

    console.log("MiddlePaneBody rerender")

    const DEFAULT_BOTTOM_MARGIN: number = 100;

    const messageInputHeight = useSelector((state:RootState) => state.messageInput.height)
    const [bodyBottomMargin, setBodyBottomMargin] = useState<number>(DEFAULT_BOTTOM_MARGIN);
    const bodyMain = useRef<HTMLDivElement>(null);

    useEffect(() =>{
        setBodyBottomMargin(DEFAULT_BOTTOM_MARGIN + messageInputHeight);
    }, [messageInputHeight])

    return(
        <div className={styles.body}>
            <div className={styles.bodyMain}
                ref={bodyMain}
                style={{marginBottom: bodyBottomMargin}}
            >
                <MessagesList/>               
            </div>
            <InputContainer/>
        </div>
    )
}
export default MiddlePaneBody