import { FC, useState } from "react";
import AvatarModalHead from "./AvatarModalHead";
import styles from '../../../styles/AvatarModal.module.css'
import AvatarModalBody from "./AvatarModalBody";

interface IProps{
    img: string;
    onClose: () => void;
}

const AvatarModal: FC<IProps> = ({img, onClose}) =>{

    const [avatarScale, setAvatarScale] = useState(1);

    const handleAvatarScale = (value: number) =>{
        if (value && avatarScale >= 3) return;
        if (!value && avatarScale <= 1) return;
        setAvatarScale(scale => scale += value ? 0.5 : -0.5);
    }

    console.log(avatarScale)

    return(
        <>
            <main className={styles.main}>
                <section className={styles.overlay} onClick={onClose} onContextMenu={onClose}/>
                <AvatarModalHead handleClose={onClose} handleAvatarScale={handleAvatarScale}/>
                <AvatarModalBody img={img} imgScale={avatarScale}/>
            </main>
        </>
    )
}
export default AvatarModal