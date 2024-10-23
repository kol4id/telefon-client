export interface IMessageCreateDto{
    channelId: string,
    content: string,
    hasMedia: boolean,
    media?: ArrayBuffer[]
};

export interface IMessageDeleteDto{
    messageId: string,
    messageChannelId: string,
};

export interface IUnreadMessageCount{
    chatId: string,
    unreadCount: number
}

export interface IMessage{
    id: string;
    chatId: string;
    creatorId: string;
    content: string;
    isRead: string;
    readTime: Date;
    edited: boolean;
    createdAt: Date;
    hasMedia: boolean;
    mediaLenght: number;
    mediaUrls?: string[];
};

export interface IMessageCreateEventDto extends IMessage{}
export interface IMessageDeleteEventDto extends IMessageDeleteDto{}


