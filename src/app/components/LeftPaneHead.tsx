import ChannelSearch from './ChannelSearch'

import styles from '../styles/LeftPaneHead.module.css'

const LeftPaneHead = () =>{
    return(
        <div className = {styles.header}>
            <div className = {styles.headerTop}>
                <div className = {styles.headerTopMenu}/>
                    <ChannelSearch/>
            </div>
        </div>
    )
}
export default LeftPaneHead