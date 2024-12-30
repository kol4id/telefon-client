import { FC } from 'react'
import styles from '../styles/ChannelLeaveModal.module.css'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from 'store/store'
import { socketLeaveChannel } from 'store/states/socket'

interface IProps {
    channelId: string,
    onClose: () => void
}

const ChannelLeaveModal: FC<IProps> = ({channelId, onClose}) =>{

    const dispatch = useAppDispatch();
    const channel = useSelector((state: RootState) => state.channelsList.userChannels.find(channel => channel.id == channelId));

    const handleDelete = () =>{
        dispatch(socketLeaveChannel(channel?.id!));
        onClose();
    }

    return(
        <>
            <main className={styles.main}>
                <section className={styles.header}>
                    <img src={channel?.imgUrl} className={styles.header_img}/>
                    <h1 className={styles.header_h1}>Leave chat</h1>
                </section>
                <section className={styles.body}>
                    <p className={styles.body_p}>Permanently leave the chat with {channel?.title}?</p>
                    <section className={styles.body_buttons}>
                        <button className={styles.body_button_delete} onClick={handleDelete}>LEAVE THE CHAT</button>
                        <button className={styles.body_button} onClick={onClose}>CANCEL</button>
                    </section>
                </section>
                
            </main>
        </>
    )
}
export default ChannelLeaveModal