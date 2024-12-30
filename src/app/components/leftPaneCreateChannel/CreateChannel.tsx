import { IChannel } from "app/global/types/Channel.dto";
import { FC, useContext } from "react";

import styles from '../../styles/LeftPaneCreateChannel.module.css';
import CreateChannelInfo from "./CreateChannelInfo";
import { CreateChannelContext } from "./LeftPaneCreateChannel";

interface IProps{
    channel: IChannel,
}

const CreateChannel: FC<IProps> = ({channel}) =>{
    const createChannel = useContext(CreateChannelContext);

    const handleChecked = (isChecked: boolean) => {
        createChannel.channelsSelectedAction(channel.creatorId, isChecked);
    }

    return(
        <>
            <section id="channel_container" className={styles.channel_container}>
                <div className={styles.channel_img_container}>
                    <img className={styles.profile_img} src={channel.imgUrl}></img>  
                </div>
                <CreateChannelInfo channel={channel}/>
                <label className={styles.checkbox_container}>
                    <input type="checkbox"
                        checked={createChannel.selectedChannels.has(channel.creatorId)}
                        onChange={e => handleChecked(e.target.checked)}
                    />
                    <span className={styles.custom_checkbox} />
                </label>
            </section>
        </>
    )
}
export default CreateChannel