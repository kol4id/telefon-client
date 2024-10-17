import axios from "axios";
import { baseUrl } from "state";

const RefreshUser = async(): Promise<number> =>{
    const response = await axios.get<any>(`${baseUrl}/auth/refresh`, {withCredentials: true});
    
    if (response.status !== 200) {
        console.log(response.status)
    }
    return response.data
}

export default RefreshUser;