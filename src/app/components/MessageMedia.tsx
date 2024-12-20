import { FC, memo } from "react";

import styles from '../styles/MessageMedia.module.css';
interface IProps{
    hasMedia: boolean
    messageMedia: string[];
}

const MessageMedia: FC<IProps> = memo(({hasMedia, messageMedia}) =>{
    return(
        <>
        {
            hasMedia &&
            <section className={styles.media_base}>
                <div className={styles.image_grid}>
                    {messageMedia?.length == 1 
                    ?   <section className={styles.image_solo_item}>
                            <img className={styles.img_custom_solo} src={messageMedia[0]}/>
                        </section>
                    :   messageMedia.map(media =>
                        <section className={styles.image_grid_item} key={media}>
                            <img className={styles.img_custom} src={media}/>
                        </section>
                    )}
                </div>
            </section>
        }
        </>
    )
})

export default MessageMedia