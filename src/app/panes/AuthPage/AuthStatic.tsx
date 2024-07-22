import styles from '../../styles/AuthPane.module.css'

const AuthStatic = () => {
    return(
        <section className={styles.static_text_container}>
                <div className={styles.app_name_static}>
                    <header>
                        <h1>Telefon</h1>
                    </header>
                    <p>
                        Please enter your email and password.
                    </p>
                </div>
            </section>
    )
}
export default AuthStatic