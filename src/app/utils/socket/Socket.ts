import { AnyAction, Dispatch, MiddlewareAPI } from "redux";
import { Socket, io } from "socket.io-client";
import { messageClearLastReadQueue, messageShiftMessage, messageUpdateLastMessage, messageUpdateMessage } from "../../../store/states/messages";
import { IMessage, IMessageCreateDto } from "../../global/types/Message.dto";
import { UpdateChannels } from "../../../store/states/channels";
import { RootState, store } from "../../../store/store";
import { IChannel } from "../../global/types/Channel.dto";

let socketConnection: SocketConnection | undefined;

export enum SocketEvent {
    MessageUpdate = 'messageUpdate',
    MessageCreate = 'messageCreate',
    MessagesRead = 'messagesRead',
    ChannelSubscribe = 'channelSubscribe'
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

        this.socket.on(SocketEvent.MessageCreate, (data: IMessage) => {
            console.log('messageCreate')
            console.log(data)
            store.dispatch(messageShiftMessage(data));
            store.dispatch(UpdateChannels(data.channelId));
            store.dispatch(messageUpdateLastMessage(data));
        })

        this.socket.on(SocketEvent.MessagesRead, (data: IMessage[]) => {
            store.dispatch(messageUpdateMessage(data));
            store.dispatch(messageClearLastReadQueue(data));
        })
    }

    public sendReadMessages(): void {
        console.log("message-read")
        this.socket.emit(SocketEvent.MessagesRead, this.state.messages.lastReadsQueue);
    }

    public messageCreate(messageData: IMessageCreateDto): void{
        this.socket.emit(SocketEvent.MessageCreate, messageData);
    }

    public async subscribeToChannel(channelId: string): Promise<IChannel[]>{
        return await this.socket.emitWithAck(SocketEvent.ChannelSubscribe, channelId)
        
    }

    private state: RootState = store.getState();
    private socketEndpoint = 'http://localhost:4200';
}

class SocketFactory{
    public static create(): SocketConnection {
        if (socketConnection) return socketConnection;
        socketConnection = new SocketConnection();
        return socketConnection;
    }
}

export default SocketFactory;