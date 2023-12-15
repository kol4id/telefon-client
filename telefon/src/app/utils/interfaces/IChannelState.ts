import { IChannel } from "./IChannel"

export interface IChannelState extends IChannelSelected{
    channels: IChannel[];
    lastMesseges: string[];
}

interface IChannelSelected{
    currentChannelSelected: string,
}