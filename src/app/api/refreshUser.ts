import axios from "axios";

const RefreshUser = async(): Promise<number> =>{
    const response = await axios.get<any>('http://localhost:4200/api/auth/refresh', {withCredentials: true});
    
    if (response.status !== 200) {
        console.log(response.status)
    }
    console.log(response.data)
    return response.data
}

export default RefreshUser;