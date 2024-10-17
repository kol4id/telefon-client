import { AnyAction, Dispatch, MiddlewareAPI } from "redux";
import { Socket, io } from "socket.io-client";
import { messageClearLastReadQueue, messageShiftMessage, messageUpdateLastMessage, messageUpdateMessage } from "../../../store/states/messages";
import { IMessage, IMessageCreateDto } from "../../global/types/Message.dto";
import { channelPushNew, chatPushNew, UpdateChannels } from "../../../store/states/channels";
// import { RootState, store } from "../../../store/store";
import { IChannel } from "../../global/types/Channel.dto";
import { userSet } from "../../../store/states/user";
import { IUser } from "app/global/types/User.dto";
import { IChat } from "app/global/types/Chat.dto";
import { socketEndpoint } from "state";

let socketConnection: SocketConnection | undefined;

export enum SocketEvent {
    MessageUpdate = 'messageUpdate',
    MessageCreate = 'messageCreate',
    MessagesRead = 'messagesRead',
    ChannelSubscribe = 'channelSubscribe',
    UpdateUser = 'updateUser'
}

/*
    you should use this class as default interface
    but init only using factory 
*/
export class SocketConnection {
    constructor(){
        this.socket = io(this.socketEndpoint, {
            transports: ['websocket'],
            withCredentials: true
        })
    }

    public socket: Socket;

    public startListeningRedux(store: MiddlewareAPI<Dispatch<AnyAction>, any>): void {
        this.socket.on(SocketEvent.MessageUpdate, (data: IMessage) => {
            store.dispatch(messageUpdateMessage(data));
        })

        this.socket.on(SocketEvent.MessageCreate, (data: {message: IMessage, chat: IChat}) => {
            console.log('messageCreate')
            store.dispatch(chatPushNew(data.chat));
            store.dispatch(UpdateChannels(data.chat));
            store.dispatch(messageShiftMessage(data.message));
            store.dispatch(messageUpdateLastMessage(data.message));
        })

        this.socket.on(SocketEvent.MessagesRead, (data: IMessage[]) => {
            store.dispatch(messageUpdateMessage(data));
            store.dispatch(messageClearLastReadQueue(data));
        })

        this.socket.on(SocketEvent.UpdateUser, (data: IUser)=>{
            store.dispatch(userSet(data));
            console.log('UpdateUser');
            console.log(data);
        })

        this.socket.on(SocketEvent.ChannelSubscribe, (data: IChannel)=>{
            console.log('channelSubscrbe');
            store.dispatch(channelPushNew(data));
        })
    }

    public sendReadMessages(messages: IMessage[]): void {
        console.log("message-read")
        this.socket.emit(SocketEvent.MessagesRead, messages);
    }

    public messageCreate(messageData: IMessageCreateDto): void{
        this.socket.emit(SocketEvent.MessageCreate, messageData);
    }

    public async subscribeToChannel(channelId: string): Promise<IChannel[]>{
        return await this.socket.emitWithAck(SocketEvent.ChannelSubscribe, channelId)
        
    }

    // private state: RootState = store.getState();
    private socketEndpoint = socketEndpoint;
}

class SocketFactory{
    public static create(): SocketConnection {
        if (socketConnection) return socketConnection;
        socketConnection = new SocketConnection();
        return socketConnection;
    }
}

export default SocketFactory;