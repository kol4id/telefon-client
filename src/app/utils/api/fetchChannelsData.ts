// import { IChannel } from "../interfaces/IChannelState";
import { IChannel } from "../interfaces/IChannelState";
import axios from "axios";

const FetchChannelsData = async(): Promise<IChannel[]> =>{
    const response = await axios.get<IChannel[]>('http://localhost:4200/api/channels/all');
    let data: IChannel[];
    
    if (response.status === 200) {
        data = response.data;
        return data;
    } else {
        console.log(response.status)
    }
    return [];
}

export default FetchChannelsData;