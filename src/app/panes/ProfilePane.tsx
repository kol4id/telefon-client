import ProfileEdit from "./ProfileEdit/ProfileEdit";

import styles from '../styles/ProfileEdit.module.css';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const ProfilePane = () => {
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user.userData)
    
    useEffect(()=>{
        if (user.firstName && user.userName){
            navigate('/a')
        }
    },[user.firstName, user.userName])

    return(
        <main className={styles.global}>
            <article className={styles.wraper}>
                <h1 className={styles.h1_custom}>Edit profile</h1>
                <ProfileEdit/>
            </article>
        </main>
    )
}

export default ProfilePane