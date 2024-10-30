import { IChat } from "./Chat.dto";
import { IUser } from "./User.dto";

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
    currentChat: IChat | undefined;
    channelsOwner: Record<string, IUser>;
    channelsOnlineStatus: Record<string, boolean>
    userChannels: IChannel[];
    filteredChannels: IChannel[],
    chats: IChat[],
}

export interface IChannelSearch {
    value: string;
}
