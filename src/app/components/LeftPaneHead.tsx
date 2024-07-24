import ChannelSearch from './ChannelSearch'

import styles from '../styles/LeftPaneHead.module.css'
import React from 'react'
import AppMenu from './AppMenu'



const LeftPaneHead = React.memo(() =>{
    console.log("LeftPaneHead rerender")

    return(
        <div className = {styles.header}>
            <AppMenu/>
            <ChannelSearch/>
        </div>
    )
})
export default LeftPaneHead