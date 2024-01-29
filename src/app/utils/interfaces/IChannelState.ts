import { IChannel } from "./Channel.dto"

export interface IChannelState extends IChannelSelected{
    channels: IChannel[];
}

interface IChannelSelected{
    currentChannelSelected: string,
}