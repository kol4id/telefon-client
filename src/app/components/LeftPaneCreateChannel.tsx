import { useContext } from "react";
import { LeftPaneTypeContext } from "./LeftPaneManager";

import leftArrow from '../../assets/left-arrow.png'
new Image().src = leftArrow;

import styles from '../styles/LeftPaneCreateChannel.module.css'
import { useAppDispatch } from "store/store";
import { setChannelCreationType } from "store/states/appEvents";

const LeftPaneCreateChannel = () => {

    const dispatch = useAppDispatch();
    const paneType = useContext(LeftPaneTypeContext);

    const handleBack = () => {
        paneType.setPaneType('channels');
        dispatch(setChannelCreationType('none'));
    }

    return(
        <>
            <article className={styles.main}>
                <section className={styles.header}>
                    <div className={styles.header_top}>
                        <button className={styles.back_button} onClick={handleBack}>
                            <img className={styles.back_button_img} src={leftArrow}></img>
                        </button>
                        <h1 className={styles.h1_header}>Add Members</h1>
                    </div>
                </section>
                <section className={styles.body}>
                </section>
            </article>
        </>
    )
}
export default LeftPaneCreateChannel