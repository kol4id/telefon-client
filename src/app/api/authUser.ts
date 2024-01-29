// import { IChannel } from "../interfaces/IChannelState";
import axios from "axios";

const AuthUser = async(): Promise<void> =>{
    const response = await axios.get<void>('http://localhost:4200/api/auth/login', {
        params:{
            email: 'mic4h@gmail.com',
            password: 'nyacawai'
        },
        withCredentials: true,
    });
    
    if (response.status === 200) {
        return response.data;
    } else {
        console.log(response.status)
    }
}

export default AuthUser;