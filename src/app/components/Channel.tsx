import { IChannel } from "../utils/interfaces/Channel.dto"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import React from "react"

import styles from '../styles/Channel.module.css'

interface Props{
    channel: IChannel,
    selected: boolean,
}
// select: (id: string) => void,

const Channel = React.memo((props: Props) =>{

    console.log(`channel ${props.channel.id} rerender`)

    const width = useSelector((state: RootState) => state.width.channelWidth)
    const wordWrapWidth = useSelector((state: RootState) => state.width.channelWrapWidth)
    
    return(
        <div className = {props.selected ? styles.channelSelected : styles.channel}
            style={{width: width}}
        >
            <div className = {styles.channelImg}>
                <img src = {props.channel.imgUrl}/>
            </div>

            <div className = {styles.channelContent}>
                <div className = {styles.channelHeader}>
                    {props.channel.title}
                </div>
                <div className = {styles.channelBody}
                    style={{maxWidth: wordWrapWidth}}
                >
                </div>
            </div>
        </div>
    )
})

export default Channel

