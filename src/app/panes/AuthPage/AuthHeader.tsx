import styles from '../../styles/AuthPane.module.css'
import image from '../../../assets/logo.svg'

const AuthHeader = () => {
    return(
        <section className={styles.img_container}>
                <img src={image}/>
        </section>
    )
}

export default AuthHeader