import { IMessage, IMessageDeleteEventDto } from "./Message.dto";

type eventType = 
   | "onMessageCreate"
   | "onMessageDelete"
   | "onMessageUpdate";

export interface ISocketData{
    eventType: eventType,
    data: IMessageDeleteEventDto | IMessage,
}
