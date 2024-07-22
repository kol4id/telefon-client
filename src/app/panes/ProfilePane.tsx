import ProfileEdit from "./ProfileEdit/ProfileEdit"

import styles from '../styles/ProfileEdit.module.css'

const ProfilePane = () => {
    return(
        <main className={styles.global}>
            <article className={styles.wraper}>
                <ProfileEdit/>
            </article>
        </main>
    )
}

export default ProfilePane