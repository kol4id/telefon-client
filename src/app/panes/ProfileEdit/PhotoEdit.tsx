
import styles from "../../styles/ProfileEdit.module.css";
import Spinner from "../../components/Spinner";
import { FC } from "react";

interface IProps {
    photoUrl: string | undefined
    isLoading?: boolean
}

const PhotoEdit: FC<IProps> = ({photoUrl, isLoading = false}) => {
    return(
        <section className={styles.photo}>
            <section className={styles.photo_container}>
                {isLoading && (
                    <section style={{position: 'absolute', alignSelf: 'center', left: '5px'}}>
                        <Spinner size={{w: 125, h: 125}} />
                    </section>
                )}

                {photoUrl && <img src={photoUrl} />}

                {!isLoading && (
                    <label htmlFor="file-upload" style={{display: 'flex'}}>
                        <section className={styles.photo_select}>
                            <section className={styles.text_block}>
                                edit photo
                            </section>   
                        </section>
                    </label>
                )}
            </section>    
        </section>
    )
}   

export default PhotoEdit