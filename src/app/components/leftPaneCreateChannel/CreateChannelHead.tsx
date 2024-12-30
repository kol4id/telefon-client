import { useAppDispatch } from 'store/store';
import { FC, useContext } from 'react';
import { LeftPaneTypeContext } from '../LeftPaneManager';
import { setChannelCreationType } from 'store/states/appEvents';

import leftArrow from '../../../assets/left-arrow.png';
new Image().src = leftArrow;

import styles from '../../styles/LeftPaneCreateChannel.module.css';
import CreateChannelFocusInput from './CreateChannelFocusInput';

interface IProps{
    setChannelSearch: (a: string) => void;
    searchValue: string
}

const CreateChannelHead: FC<IProps> = ({setChannelSearch, searchValue}) =>{
    const dispatch = useAppDispatch();
    const paneType = useContext(LeftPaneTypeContext);

    const handleBack = () => {
        paneType.setPaneType('channels');
        dispatch(setChannelCreationType('none'));
    }

    return(
        <>
            <section className={styles.header}>
                    <div className={styles.header_top}>
                        <button className={styles.back_button} onClick={handleBack}>
                            <img className={styles.back_button_img} src={leftArrow}></img>
                        </button>
                        <h1 className={styles.h1_header}>Add Members</h1>
                    </div>
                    <CreateChannelFocusInput setChannelSearch={setChannelSearch} searchValue={searchValue}/>
            </section>
        </>
    )
}
export default CreateChannelHead