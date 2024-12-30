import { FC } from "react";
import styles from '../../../styles/AvatarModal.module.css'

interface IProps{
    img: string;
    imgScale: number;
}

const AvatarModalBody: FC<IProps> = ({img, imgScale}) =>{
    return(
        <>
            <section className={styles.body}>
                <img src={img} className={styles.avatar} style={{transform: `scale(${imgScale})`, zIndex: 2, transition: '.15s ease'}}/>
            </section>
        </>
    )
}
export default AvatarModalBody