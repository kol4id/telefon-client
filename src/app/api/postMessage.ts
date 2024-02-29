import axios from "axios";

const postMessage = async(channelIdArg: string, messageArg: string, hasMediaArg: boolean): Promise<void> =>{

    const requestData = {
        channelId: channelIdArg,
        content: messageArg,
        hasMedia: hasMediaArg
    }

    const response = await axios.post('http://localhost:4200/api/messages/create', requestData, {
        withCredentials: true,
    });
    
    if (response.status === 200) {
        console.log(response.status)
    } else {
        console.log(response.status)
    }
}

export default postMessage;