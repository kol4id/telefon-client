import { useState } from "react";
import CreateChannelHead from "./CreateChannelHead";
import CreateChannelBody from "./CreateChannelBody";
import CreateChannelButton from "./CreateChannelButton";

import styles from '../../styles/LeftPaneCreateChannel.module.css'

const CreateChannelSelectUsers = () =>{
    const [channelSearch, setChannelSearch] = useState('');
    const _setChannelSearch = (value: string) => {setChannelSearch(value)};
    
    return(
        <>
            <article className={styles.main}>
                <CreateChannelHead setChannelSearch={_setChannelSearch} searchValue={channelSearch}/>
                <CreateChannelBody searchValue={channelSearch}/>
                <CreateChannelButton/>                    
            </article>
 
        </>
    )
}
export default CreateChannelSelectUsers