
export interface IChannel{
    id: string,
    title: string,
    lastMessage: string,
}

export interface IChannelState extends IChannelSelected{
    channels: IChannel[]
}

interface IChannelSelected{
    currentChannelSelected: string,
}