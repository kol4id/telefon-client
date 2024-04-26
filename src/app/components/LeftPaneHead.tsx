import ChannelSearch from './ChannelSearch'

import styles from '../styles/LeftPaneHead.module.css'
import React from 'react'

import menuImage from '../../assets/menu.png'

const LeftPaneHead = React.memo(() =>{
    console.log("LeftPaneHead rerender")

    return(
        <div className = {styles.header}>
            <div className={styles.header_menu_button}>
                <img src={menuImage} style={{width: '18px', height: '16px'}}></img>
            </div>
            <ChannelSearch/>
        </div>
    )
})
export default LeftPaneHead