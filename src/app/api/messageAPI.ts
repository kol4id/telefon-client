import axios from "axios"

const DeleteMessageApi = async(messageId: string, channelId: string): Promise<number> =>{

    const response = await axios.delete('http://localhost:4200/api/messages/delete', {
        params: {
            messageId,
            channelId,
        },
        withCredentials: true
    });

    if (response.status !== 200){
        console.log(`${response.statusText} error: ${response.status}`)
    }
    return response.status;
}

export default DeleteMessageApi;