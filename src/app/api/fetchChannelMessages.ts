import axios from "axios";
import { IMessage } from "../utils/interfaces/IMessage";

const FetchChannelMessages = async(channelId: string, chunkNumber: number): Promise<IMessage[]> =>{
    const response = await axios.get<IMessage[]>('http://localhost:4200/api/messages', {
        params:{
            channelId,
            chunkNumber
        },
        withCredentials: true,
    });
    
    if (response.status === 200) {
        return response.data;
    } else {
        console.log(response.status)
    }
    return [];
}

export default FetchChannelMessages;