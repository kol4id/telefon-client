
export interface IUser{
    id: string;
    name: string;
    email: string;
    photoUrl: string;
    subscriptions: string[];
    favorite: string[];
    blacklist: string[];
    lastReads: Record<string, Date>;
}