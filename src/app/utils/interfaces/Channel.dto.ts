interface IChannelSelected{
    currentChannelSelected: string,
}

export interface IChannel {
    id: string,
    title: string,
    imgUrl?: string,
    subscribers: number,
    totalMessages: number,
    moderatorsId: string[],
    lastMessageId?: string,
    updatedAt: Date,
    creatorId: string,
}

export interface ICreateChannel{
    title: string,
}

export interface IChannelState extends IChannelSelected{
    channels: IChannel[];
}

export interface IChannelSearch {
    value: string;
}
