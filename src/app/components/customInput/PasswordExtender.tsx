import styles from '../../styles/CustomInput.module.css'

import eye_open from '../../../assets/eye_open.png'
import eye_closed from '../../../assets/eye_closed.png'
import { FC } from 'react'

interface IProps{
    handleClick: ()=>void,
    enabled: boolean,
    clicked: boolean
}

const PasswordExtender: FC<IProps> = (props) =>{
    return(
        <section style={{position: 'relative', display: 'flex', width: '100%', height: '100%'}}>
            <button className={styles.show_pass} onClick={props.handleClick} 
                    aria-label='show/hide password'
                    style={{display: props.enabled ? undefined : 'none'}}
            >
                <img className={styles.img_pass}
                    src={props.clicked ? eye_open : eye_closed}
                />
            </button>
        </section>
    )
}

export default PasswordExtender;