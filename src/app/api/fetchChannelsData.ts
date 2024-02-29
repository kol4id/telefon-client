
// import { IChannel } from "../interfaces/IChannelState";
import { IChannel } from "../utils/interfaces/Channel.dto";
import axios from "axios";

const FetchChannelsData = async(): Promise<IChannel[]> =>{
    const response = await axios.get<IChannel[]>('http://localhost:4200/api/channels/all', {
        withCredentials: true,
    });
    
    if (response.status === 200) {
        return response.data;
    } else {
        console.log(response.status)
    }
    return [];
}

export default FetchChannelsData;