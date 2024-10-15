
export interface IUser{
    id: string;
    firstName?: string;
    lastName?: string;
    userName?: string;
    email: string;
    photoUrl: string;
    subscriptions: string[];
    favorite: string[];
    blacklist: string[];
    lastReads: Record<string, Date>;
    // dmChats: Record<string, string>;
    personalChannel: string;
}