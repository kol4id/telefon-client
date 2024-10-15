import { FC, useState } from "react";
import styles from '../../styles/MessageDropModal.module.css'

import trash from '../../../assets/trash.png'
interface IProps{
    file: File,
    handleDelete?: () => void,
    style: any,
}

const MessageDropImg: FC<IProps> = ({file, style, handleDelete}) =>{
    const [src] = useState(URL.createObjectURL(file));

    return(
        <section className={style}>
            <img src={src} alt={`Image`} className={styles.img_custom}/>
            <button onClick={handleDelete} className={styles.delete_img}>
                <img src={trash}></img>
            </button>
        </section>
    )
}
export default MessageDropImg

// solo ? styles.image_solo_item : styles.image_item