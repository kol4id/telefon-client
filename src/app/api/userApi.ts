import axios from "axios";
import { IUser } from "../global/types/User.dto";
import { baseUrl } from "state";

export const FetchUser = async (): Promise<IUser> =>{
    const response = await axios.get<IUser>(`${baseUrl}/user/self`, {withCredentials: true});
    if (response.status !== 200) {
        console.log(response.status)
    }
    return response.data
}

export const updateUserAPI = async (user: IUser): Promise<IUser>=>{
    const response = await axios.put<IUser>(`${baseUrl}/user/update`, user, {
        withCredentials: true        
    })
    
    if (response.status !== 200) {
        console.log(response.status)
    }
    return response.data
}