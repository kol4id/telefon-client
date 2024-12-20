
import { useContext } from 'react';
import left_arrow from '../../../assets/left-arrow.png';
new Image().src = left_arrow;

import styles from '../../styles/LeftPaneCreateChannelName.module.css';
import { CreateChannelContext } from './LeftPaneCreateChannel';

const CreateChannelNameHead = () =>{

    const creteChannel = useContext(CreateChannelContext);
    const handleClick = () => {
        creteChannel.setPhase('selectUsers')
    }

    return(
        <>
            <header className={styles.head}>
                <button className={styles.head_back_button} onClick={handleClick}>
                    <img className={styles.back_button_img} src={left_arrow}></img>
                </button>
                <h2 className={styles.head_title}>New Channel</h2>
            </header>
        </>
    )
}
export default CreateChannelNameHead;