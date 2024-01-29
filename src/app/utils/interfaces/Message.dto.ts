
export interface IMessage{
    id: string;
    channelId: string;
    creatorId: string;
    content: string;
    edited: boolean;
    createdAt: Date;
    hasMedia: boolean;
    mediaUrls?: string[];
}