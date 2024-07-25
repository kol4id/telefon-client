
import styles from '../styles/LeftPaneHead.module.css'
import menuImage from '../../assets/menu.png'
import Context from './Context'
import { useRef, useState } from 'react'
import AppMenuContext from './AppMenuContext'
const AppMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuButton = useRef<HTMLButtonElement>(null);

    const handleClick = () => {
        setIsOpen(!isOpen)
    }

    return(
        <>
            <button className={styles.header_menu_button} aria-label='hamburger menu'
                onClick={handleClick}
                ref={menuButton}
            >
                <img src={menuImage} style={{width: '18px', height: '16px'}}></img>
            </button>
            <Context
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                children={<AppMenuContext close={()=>setIsOpen(false)}/>}
                position={{
                    x: menuButton.current?.getBoundingClientRect().x! + 0,
                    y: menuButton.current?.getBoundingClientRect().y! + 45
                }}
                overlay={true}
            />
        </>
    )
}
export default AppMenu