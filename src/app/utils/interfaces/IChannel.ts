
export interface IChannel {
    id: string,
    title: string,
    creatorId: string,
    moderatorsId: string[],
    lastMessageId: string,
    createdAt: Date,
}