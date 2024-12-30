import ImageButton from '../../buttons/ImageButton'
import styles from '../../../styles/AvatarModal.module.css'

import close from '../../../../assets/close.png'
import glass_minus from '../../../../assets/glass_minus.png'
import glass_plus from '../../../../assets/glass_plus.png'
import { FC } from 'react';

interface IProps{
    handleClose: ()=>void;
    handleAvatarScale: (value: number)=>void
}

const AvatarModalHead: FC<IProps> = ({handleClose, handleAvatarScale}) =>{
    const _handleClose = (e: any) =>{
        handleClose();
        e.stopPropagation();
    }

    const glassImgOptCss = {width: '20px', height: '20px'};
    
    return(
        <>
            <header className={styles.header}>
                <section className={styles.func_buttons}>
                    <ImageButton img={glass_minus} imgStylesOpt={glassImgOptCss} callback={()=>{handleAvatarScale(0)}}/>
                    <ImageButton img={glass_plus} imgStylesOpt={glassImgOptCss} callback={()=>{handleAvatarScale(1)}}/>
                    <ImageButton img={close} callback={_handleClose}/>
                </section>
            </header>
        </>
    )
}
export default AvatarModalHead