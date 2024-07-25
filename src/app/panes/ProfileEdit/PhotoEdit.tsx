
import { useSelector } from "react-redux";
import styles from "../../styles/ProfileEdit.module.css";
import { RootState } from "../../../store/store";
import Spinner from "../../components/Spinner";

const PhotoEdit = () => {
    const user = useSelector((state: RootState) => state.user);

    return(
        <section className={styles.photo}>
            <section className={styles.photo_container}>
                {
                    user.isUserDataLoading
                    ?
                        <>
                            <section style={{position: 'absolute', alignSelf: 'center', left: '5px'}}>
                                <Spinner size={{w: 125, h: 125}}/>
                            </section>
                            {user.userData.photoUrl && <img src={user.userData.photoUrl}/>}
                        </>
                        
                    :
                        <label htmlFor="file-upload" style={{display:'flex'}}>
                            {user.userData.photoUrl && <img src={user.userData.photoUrl}/>}
                            <section className={styles.photo_select}>
                                <section className={styles.text_block}>
                                    edit photo
                                </section>   
                            </section>
                        </label>    
                }
            </section>    
        </section>
    )
}   

export default PhotoEdit