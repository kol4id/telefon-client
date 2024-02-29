import axios from "axios";

const RefreshUser = async(): Promise<number> =>{
    const response = await axios.get<void>('http://localhost:4200/api/auth/refresh', {withCredentials: true});
    
    if (response.status !== 200) {
        console.log(response.status)
    }
    return response.status
}

export default RefreshUser;