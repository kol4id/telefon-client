import axios from "axios";
import { IUser } from "../utils/interfaces/User.dto";


export const FetchUser = async (): Promise<IUser> =>{
    const response = await axios.get<IUser>('http://localhost:4200/api/user/self', {withCredentials: true});

    if (response.status !== 200) {
        console.log(response.status)
    }
    return response.data
}