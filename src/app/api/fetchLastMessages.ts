import axios from "axios"
import { IMessage } from "../utils/interfaces/Message.dto"

const FetchLastMessages = async() => {
    const responce = await axios.get<IMessage[][]>('http://localhost:4200/api/messages/last', {
        withCredentials: true,
    });

    if (responce.status !== 200){
        console.log(responce.status);
    }

    return responce.data;
}

export default FetchLastMessages;