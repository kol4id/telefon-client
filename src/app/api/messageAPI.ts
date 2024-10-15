import axios from "axios";
import { IMessage } from "../global/types/Message.dto";

export const DeleteMessageApi = async(messageId: string, channelId: string): Promise<number> =>{
    const response = await axios.delete('http://localhost:4200/api/messages/delete', {
        params: {
            messageId,
            channelId,
        },
        withCredentials: true
    });
    return response.status;
}

export const PostMessage = async(channelIdArg: string, messageArg: string, hasMediaArg: boolean): Promise<void> =>{
    const requestData = {
        channelId: channelIdArg,
        content: messageArg,
        hasMedia: hasMediaArg
    }

    await axios.post('http://localhost:4200/api/messages/create', requestData, {
        withCredentials: true,
    }); 
}

export const FetchLastMessages = async(limit: number) => {
    const response = await axios.get<IMessage[][]>('http://localhost:4200/api/messages/lastreads', {
        params:{
            limit,
        },
        withCredentials: true,
    });
    return response.data;
}

export const FetchOneLastMessageEach = async() => {
    const response = await axios.get<IMessage[][]>('http://localhost:4200/api/messages/last/one', {
        withCredentials: true,
    });
    return response.data;
}