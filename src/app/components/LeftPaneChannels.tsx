import LeftPaneBody from "./LeftPaneBody"
import LeftPaneHead from "./LeftPaneHead"

import styles from '../styles/LeftPane.module.css'
import ChannelCreate from "./ChannelCreate";
import { useState } from "react";

const LeftPaneChannels = () => {

    const [hover, setHover] = useState(false);
    return(
        <nav className={styles.channels}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <LeftPaneHead/>
            <LeftPaneBody/>
            <ChannelCreate visible={hover}/>
        </nav>
    )
}

export default LeftPaneChannels