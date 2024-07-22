
// import { IChannel } from "../interfaces/IChannelState";
import { IChannel } from "../global/types/Channel.dto";
import axios from "axios";

const FetchChannelsData = async(): Promise<IChannel[]> =>{
    const response = await axios.get<IChannel[]>('http://localhost:4200/api/channels/all', {
        withCredentials: true,
    });
    return response.data || [];
}

export default FetchChannelsData;