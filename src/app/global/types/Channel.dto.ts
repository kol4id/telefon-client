interface IChannelSelected{
    currentChannelSelected: string,
}

export interface IChannel {
    id: string,
    channelName: string,
    title: string,
    imgUrl?: string,
    subscribers: number,
    totalMessages: number,
    moderatorsId: string[],
    lastMessageId?: string,
    updatedAt: Date,
    creatorId: string,
    description: string,
    isPrivate: boolean,
    channelType: string,
}

export interface ICreateChannel{
    title: string,
}

export interface IChannelState extends IChannelSelected{
    currentChannel: IChannel;
    userChannels: IChannel[];
    filteredChannels: IChannel[],
}

export interface IChannelSearch {
    value: string;
}
