import axios from "axios";
import { IUser } from "../global/types/User.dto";


export const FetchUser = async (): Promise<IUser> =>{
    const response = await axios.get<IUser>('http://localhost:4200/api/user/self', {withCredentials: true});
    if (response.status !== 200) {
        console.log(response.status)
    }
    return response.data
}

export const updateUserAPI = async (user: IUser): Promise<IUser>=>{
    const response = await axios.put<IUser>('http://localhost:4200/api/user/update', user, {
        withCredentials: true        
    })
    
    if (response.status !== 200) {
        console.log(response.status)
    }
    return response.data
}