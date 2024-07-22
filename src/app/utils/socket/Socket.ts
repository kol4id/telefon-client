import { AnyAction, Dispatch, MiddlewareAPI } from "redux";
import { Socket, io } from "socket.io-client";
import { messageClearLastReadQueue, messageShiftMessage, messageUpdateLastMessage, messageUpdateMessage } from "../../../store/states/messages";
import { IMessage } from "../../global/types/Message.dto";
import { UpdateChannels } from "../../../store/states/channels";
import { RootState, store } from "../../../store/store";

let socketConnection: SocketConnection | undefined;

export enum SocketEvent {
    MessageUpdate = 'messageUpdate',
    MessageCreate = 'messageCreate',
    MessagesRead = 'messagesRead',
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

    private state: RootState = store.getState();
    private socketEndpoint = 'http://localhost:4200';
}

class SocketFactory{
    public static create(): SocketConnection {
        if (socketConnection) return socketConnection;
        return new SocketConnection();
    }
}

export default SocketFactory;