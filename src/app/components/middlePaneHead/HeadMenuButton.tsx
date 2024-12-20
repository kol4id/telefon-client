import menu from '../../../assets/menu.png'
import styles from '../../styles/MiddlePaneHead.module.css';
new Image().src = menu;

const HeadMenuButton = () => {
    return(
        <section className={styles.button_container}>
            <button className={styles.channel_list_button}>
                <img src={menu} style={{width: '25px', height: '25px'}}/>
            </button>
        </section>
    )
}

export default HeadMenuButton