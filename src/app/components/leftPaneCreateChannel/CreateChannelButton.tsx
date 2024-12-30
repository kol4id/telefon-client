import { useContext } from 'react';
import right_arrow from '../../../assets/right-arrow.png';
new Image().src = right_arrow;

import styles from '../../styles/LeftPaneCreateChannel.module.css';
import { CreateChannelContext } from './LeftPaneCreateChannel';

const CreateChannelButton = () =>{
    const createChannel = useContext(CreateChannelContext);
    const handleClick = () =>{
        createChannel.setPhase('nameChannel');
    }

    return(
        <>
            <button className={styles.create_button} onClick={handleClick}>
                <img className={styles.create_button_img} src={right_arrow}/>
            </button>   
        </>
    )
}
export default CreateChannelButton;