
import styles from '../../styles/LeftPaneCreateChannelName.module.css'
import CreateChannelNameBody from './CreateChannelNameBody';
import CreateChannelNameHead from './CreateChannelNameHead';

const CreateChannelNameChannel = () =>{
    return(
        <>
            <article className={styles.main}>
                <CreateChannelNameHead/>
                <CreateChannelNameBody/>
            </article>
        </>
    )
}
export default CreateChannelNameChannel;