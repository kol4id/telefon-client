
// interface IMessageCreateDto{
//     messageId: string,
//     messageContent: string,
//     messageHasMedia: boolean,
// };

// interface IMessageUpdateDto{
//     messageId: string,
//     messageContent: string,
// }

export interface IMessageDeleteDto{
    messageId: string,
    messageChannelId: string,
};




export interface IMessage{
    id: string;
    channelId: string;
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


