import axios from "axios"
import { IMessage } from "../utils/interfaces/Message.dto"

const FetchOneLastMessageEach = async() => {
    const responce = await axios.get<IMessage[][]>('http://localhost:4200/api/messages/last/one', {
        withCredentials: true,
    });

    if (responce.status !== 200){
        console.log(responce.status);
    }

    return responce.data;
}

export default FetchOneLastMessageEach;