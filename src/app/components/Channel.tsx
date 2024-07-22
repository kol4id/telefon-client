import { IChannel } from "../global/types/Channel.dto"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import React from "react"

import styles from '../styles/Channel.module.css'
import { useNavigate } from "react-router-dom"

interface Props{
    channel: IChannel,
    selected: boolean,
}

const Channel = React.memo((props: Props) =>{
    console.log(`channel ${props.channel.id} rerender`) 
    const navigate = useNavigate();
    const isLastLoading = useSelector((state: RootState) => state.messages.isLastLoading);
    // const lastMessage = useSelector((state: RootState) => state.messages.lastMessages[props.channel.id]);

    return(
        <div className = {props.selected ? styles.channelSelected : styles.channel}
            onClick={() => navigate(`${props.channel.id}`)}
        >
            <div className = {styles.channelImg}>
                <img src = {props.channel.imgUrl}/>
            </div>

            <div className = {styles.channelContent}>
                {
                    isLastLoading || 
                        <>
                            <ChannelHeader title={props.channel.title} messageTime={undefined}/>          
                            {/* <ChannelBody lastMessage={lastMessage}/> */}
                        </>
                }
                
            </div>
            {/* <Navigate to={`a/:${props.channel.id}`}/> */}
        </div>
    )
})

export default Channel



const ChannelHeader = ({...props}) => {
    return(
        <div className = {styles.channelHeader}>
            <div className={styles.channel_name}>
                {props.title}
            </div>
            <div className={styles.channel_message_date}>
                { props.messageTime && `${String(new Date(props.messageTime).getHours()).padStart(2, '0')}:${String(new Date(props.messageTime).getMinutes()).padStart(2, '0')}`}
            </div>
        </div>
    )
}

// const ChannelBody = ({...props}) => {
//     return(
//         <div className = {styles.channelBody}>
//             <div className={styles.channel_body_content}>
//                 {props.lastMessage.content}
//             </div>
//             <div className={styles.channel_body_unread_count}>
//                 1
//             </div>
//         </div>
//     )
// }

