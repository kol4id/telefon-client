import axios from "axios"
import { IMessage } from "../utils/interfaces/Message.dto";

export const DeleteMessageApi = async(messageId: string, channelId: string): Promise<number> =>{
    const response = await axios.delete('http://localhost:4200/api/messages/delete', {
        params: {
            messageId,
            channelId,
        },
        withCredentials: true
    });

    if (response.status !== 200){
        console.log(`${response.statusText} error: ${response.status}`)
    }
    return response.status;
}

export const PostMessage = async(channelIdArg: string, messageArg: string, hasMediaArg: boolean): Promise<void> =>{
    const requestData = {
        channelId: channelIdArg,
        content: messageArg,
        hasMedia: hasMediaArg
    }

    const response = await axios.post('http://localhost:4200/api/messages/create', requestData, {
        withCredentials: true,
    });
    
    if (response.status !== 200){
        console.log(`${response.statusText} error: ${response.status}`)
    }
}

export interface IFetchMessages {
    channelId: string,
    limit: number, 
    startDate?: Date, 
    endDate?: Date
};

export const FetchMessagesForChannel = async(args: IFetchMessages): Promise<IMessage[]> =>{
    const response = await axios.get<IMessage[]>('http://localhost:4200/api/messages', {
        params:{
            channelId: args.channelId,
            startDate: args.startDate, 
            endDate: args.endDate,
            limit: args.limit, 
        },
        withCredentials: true,
    });
    
    if (response.status !== 200){
        console.log(`${response.statusText} error: ${response.status}`)
    }
    return response.data || [];
}

export const FetchLastMessages = async(limit: number) => {
    const response = await axios.get<IMessage[][]>('http://localhost:4200/api/messages/lastreads', {
        params:{
            limit,
        },
        withCredentials: true,
    });

    if (response.status !== 200){
        console.log(`${response.statusText} error: ${response.status}`)
    }
    return response.data;
}

export const FetchOneLastMessageEach = async() => {
    const response = await axios.get<IMessage[][]>('http://localhost:4200/api/messages/last/one', {
        withCredentials: true,
    });

    if (response.status !== 200){
        console.log(`${response.statusText} error: ${response.status}`)
    }
    return response.data;
}