import React, { FC, useEffect, useState } from "react"
import { IChannel } from "../utils/interfaces/IChannelState"

import img from 'src/assets/pig.jpeg'
import styles from '../styles/Channel.module.css'

interface Props{
    channel: IChannel,
    selected: boolean,
    select: (id: string) => void,
}

const Channel: FC<Props> = React.memo((props) =>{

    const [channelStyle, setChannelStyle] = useState<string>(styles.channel)

    useEffect(()=>{
        props.selected 
        ? setChannelStyle(styles.channelSelected)
        : setChannelStyle(styles.channel)
    }, [props.selected])

    return(
        <div className = {channelStyle}
            onClick = {() => {props.select(props.channel.id)}}
        >
            <div className = {styles.channelImg}>
                <img src = {img}/>
            </div>

            <div className = {styles.channelContent}>
                <div className = {styles.channelHeader}>
                    {props.channel.title}
                </div>
                <div className = {styles.channelBody}>
                    {props.channel.lastMessage}
                </div>
            </div>
        </div>
    )
})

export default Channel

