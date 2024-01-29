import React, { useEffect, useState } from "react"
import { IChannel } from "../utils/interfaces/Channel.dto"

import styles from '../styles/Channel.module.css'
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"

interface Props{
    channel: IChannel,
    selected: boolean,
    select: CallableFunction,
}

const Channel = React.memo((props: Props) =>{

    console.log(`channel ${props.channel.id} rerender`)

    const width = useSelector((state: RootState) => state.width.channelWidth)
    const wordWrapWidth = useSelector((state: RootState) => state.width.channelWrapWidth)

    const [channelStyle, setChannelStyle] = useState<string>(styles.channel)

    useEffect(()=>{
        props.selected 
        ? setChannelStyle(styles.channelSelected)
        : setChannelStyle(styles.channel)
    }, [props.selected])
    
    return(
        <div className = {channelStyle}
            onClick = {() => props.select(props.channel.id)}
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

