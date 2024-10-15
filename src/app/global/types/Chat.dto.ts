export interface IChat{
    id: string,
    owner: string[],
    totalMessages: number,
    participants: string[],
    updatedAt: Date,
    lastMessage: string,
}