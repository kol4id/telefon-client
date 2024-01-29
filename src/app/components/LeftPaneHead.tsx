import ChannelSearch from './ChannelSearch'

import styles from '../styles/LeftPaneHead.module.css'
import React from 'react'

const LeftPaneHead = React.memo(() =>{
    console.log("LeftPaneHead rerender")

    return(
        <div className = {styles.header}>
            <div className = {styles.headerTop}>
                <div className = {styles.headerTopMenu}/>
                    <ChannelSearch/>
            </div>
        </div>
    )
})
export default LeftPaneHead