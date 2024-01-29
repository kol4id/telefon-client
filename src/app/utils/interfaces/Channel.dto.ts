
export interface IChannel {
    id: string,
    title: string,
    imgUrl?: string,
    subscribers: number,
    moderatorsId: string[],
    lastMessageId?: string,
    updatedAt: string,
    creatorId: string,
}

export interface ICreateChannel{
    title: string,
}

