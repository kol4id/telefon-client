import axios from "axios"
import { IMessage, IUnreadMessageCount } from "../global/types/Message.dto";
import { IUser, IUserExternal } from "../global/types/User.dto";
import { baseUrl } from "../../state";
import { IChannel } from "../global/types/Channel.dto";
import { IChat } from "app/global/types/Chat.dto";

export interface IFetchMessages {
    chatId: string,
    limit: number, 
    startDate?: Date, 
    endDate?: Date
};

export class MessageApi{
    // constructor(private baseUrl: string){}

    async fetchMessages(data: IFetchMessages){
        const response = await axios.get<IMessage[]>(`${baseUrl}/messages`, {
            params: {...data},
            withCredentials: true,
        });
        return response.data || [];
    }

    async deleteMessage(messageId: string, chatId: string): Promise<number>{
        const response = await axios.delete(`${baseUrl}/messages/delete`, {
            params: {
                messageId,
                chatId,
            },
            withCredentials: true
        });
        return response.status;
    }

    async fetchLastReadMessages(limit: number): Promise<IMessage[][]>{
        const response = await axios.get<IMessage[][]>(`${baseUrl}/messages/lastreads`, {
            params: {
                limit
            },
            withCredentials: true,
        });
        return response.data;
    }

    async fetchLastOneMessages(): Promise<IMessage[][]>{
        const response = await axios.get<IMessage[][]>(`${baseUrl}/messages/last`, {
            withCredentials: true,
        });
        return response.data;
    }

    async fetchUnreadMessagesCount(): Promise<IUnreadMessageCount[]>{
        const response = await axios.get<IUnreadMessageCount[]>(`${baseUrl}/messages/unreadCount`, {
            withCredentials: true,
        });
        return response.data;
    }
}

export class UserApi{
    // constructor(private baseUrl: string){}

    async authUser(email: string, password: string): Promise<IUser>{
        const response = await axios.get<IUser>(`${baseUrl}/auth/login`, {
            params:{
                email,
                password,
            },
            withCredentials: true,
        });
        return response.data;
    }

    async registerUser(email: string, password: string): Promise<IUser>{
        const requestData = {
            email,
            password,
        }
        const response = await axios.post<IUser>(`${baseUrl}/auth/signup`, requestData, {withCredentials: true})
        return response.data;
    }

    async refreshUser(): Promise<IUser>{ 
        const response = await axios.get<any>(`${baseUrl}/auth/refresh`, {withCredentials: true});
        return response.data;
    }

    async get(): Promise<IUser>{
        const response = await axios.get<IUser>(`${baseUrl}/user/self`, {withCredentials: true});
        return response.data;
    }

    async getForUser():Promise<IUser[]>{
        const response = await axios.get<IUser[]>(`${baseUrl}/user/all`, {withCredentials: true});
        return response.data || [];
    }

    async getMany(users: string[]): Promise<IUserExternal[]>{
        const response = await axios.get<IUserExternal[]>(`${baseUrl}/user/many`, {
            params: {
                users: JSON.stringify(users)
            },
            withCredentials: true
        });
        return response.data || [];
    }

    async updatePhoto(img: File): Promise<IUser>{
        const formData = new FormData();
        formData.append('file', img);

        const response = await axios.put<IUser>(`${baseUrl}/user/photo`, formData, {withCredentials: true});
        return response.data;
    }

    async isUsernameExist(username: string): Promise<boolean>{
        const response = await axios.get<boolean>(`${baseUrl}/user/username`, {
            params: {
                username
            },
            withCredentials: true
        })
        return response.data;
    }

    async logout(): Promise<IUser>{
        const response = await axios.get<IUser>(`${baseUrl}/auth/logout`,{withCredentials: true});
        return response.data || undefined;
    }
}

export class ChannelApi{
    async get(channelId: string):Promise<IChannel>{
        const response = await axios.get<IChannel>(`${baseUrl}/channels/${channelId}`, {withCredentials: true});
        return response.data || undefined;
    }

    async getForUser():Promise<IChannel[]>{
        const response = await axios.get<IChannel[]>(`${baseUrl}/channels/all`, {withCredentials: true});
        return response.data || [];
    }

    async getParticipants(channelId: string):Promise<IUserExternal[]>{
        const response = await axios.get<IUserExternal[]>(`${baseUrl}/channels/participants`, {
            params: {
                channelId
            },
            withCredentials: true
        });
        return response.data || [];
    }

    async search(subString: string):Promise<IChannel[]>{
        const response = await axios.get<IChannel[]>(`${baseUrl}/channels/search`, {
            params: {
                subString
            },
            withCredentials: true
        });
        return response.data || [];
    }
}

export class ChatApi{
    async get(chatId: string):Promise<IChat[]>{
        const response = await axios.get<IChat[]>(`${baseUrl}/chats/${chatId}`, {withCredentials: true});
        return response.data || undefined;
    }

    async getAll():Promise<IChat[]>{
        const response = await axios.get<IChat[]>(`${baseUrl}/chats/user`, {withCredentials: true});
        return response.data || [];
    }

    async getByChannel(channelId: string):Promise<IChat>{
        const response = await axios.get<IChat>(`${baseUrl}/chats/channel/${channelId}`, {withCredentials: true});
        return response.data || undefined;
    }
}