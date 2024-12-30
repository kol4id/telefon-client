import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { FC, useMemo } from "react";

import styles from '../../styles/LeftPaneCreateChannel.module.css';
import CreateChannel from "./CreateChannel";

interface IProps{
    searchValue: string,
}

const CreateChannelBody: FC<IProps> = ({searchValue}) =>{
    const userChannels = useSelector((state: RootState) => state.channelsList.userChannels);

    const filteredChannels = useMemo(() =>{
        return userChannels.filter(channel => {
            if (channel.channelType != 'user') return false;

            return(channel.channelName.toLowerCase().includes(searchValue.toLowerCase()) ||
            channel.title.toLowerCase().includes(searchValue.toLowerCase()))
        });
    }, [userChannels, searchValue])

    return(
        <>
            <section className={styles.body}>
                <ul className={styles.channel_list}>
                {
                    filteredChannels?.map(channel => 
                        <section className={styles.channel} key={channel.id}>
                            <CreateChannel channel={channel}/>
                        </section>
                    )
                }
                </ul>
            </section>
        </>
    )
}
export default CreateChannelBody