import { ISocketData } from "../utils/interfaces/Socket.dto";
import { DeleteMessage, ShiftMessage, UpdateLastMessage } from "../../store/states/messages";
import { IMessageCreateEventDto, IMessageDeleteEventDto } from "../utils/interfaces/Message.dto";
import { UpdateChannels } from "../../store/states/channels";

const HandleSocketEvent = (data: ISocketData, handleDispatch: (action: any)=> void) =>{
    console.log('aboba1')
    switch(data.eventType){
        case 'onMessageCreate':
            MessageCreateEvent(data.data as IMessageCreateEventDto, handleDispatch)
            break;
        case 'onMessageDelete':
            DeleteMessageEvent(data.data as IMessageDeleteEventDto, handleDispatch)
            break;
        case 'onMessageUpdate':
            break;
    }
}

const MessageCreateEvent = (data: IMessageCreateEventDto, handleDispatch: (action: any)=> void) =>{
    handleDispatch(ShiftMessage({channelId: data.channelId, message: data}))
    handleDispatch(UpdateChannels(data.channelId))
    handleDispatch(UpdateLastMessage(data))
}

const DeleteMessageEvent = (data: IMessageDeleteEventDto, handleDispatch: (action: any)=> void) =>{
    handleDispatch(DeleteMessage({channelId: data.messageChannelId, messageId: data.messageId}))
}

export default HandleSocketEvent