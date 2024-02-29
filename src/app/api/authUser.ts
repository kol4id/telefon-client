// import { IChannel } from "../interfaces/IChannelState";
import axios from "axios";

const AuthUser = async(emailParam: string, passwordParam: string): Promise<number> =>{
    const response = await axios.get<void>('http://localhost:4200/api/auth/login', {
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