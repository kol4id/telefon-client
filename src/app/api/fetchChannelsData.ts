
// import { IChannel } from "../interfaces/IChannelState";
import { IChannel } from "../global/types/Channel.dto";
import axios from "axios";
import { baseUrl } from "state";
const FetchChannelsData = async(): Promise<IChannel[]> =>{
    const response = await axios.get<IChannel[]>(`${baseUrl}/channels/all`, {
        withCredentials: true,
    });
    return response.data || [];
}

export default FetchChannelsData;