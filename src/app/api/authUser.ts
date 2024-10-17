// import { IChannel } from "../interfaces/IChannelState";
import axios from "axios";
import { baseUrl } from "state";
const AuthUser = async(emailParam: string, passwordParam: string): Promise<number> =>{
    const response = await axios.get<void>(`${baseUrl}/auth/login`, {
        params:{
            email: emailParam,
            password: passwordParam,
        },
        withCredentials: true,
    });
    
    if (response.status !== 200) {
        console.log(response.status)
    }
    return response.status;
}

export default AuthUser;