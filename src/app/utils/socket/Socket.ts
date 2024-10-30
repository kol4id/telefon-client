import { AnyAction, Dispatch, MiddlewareAPI } from "redux";
import { Socket, io } from "socket.io-client";
import { messageClearLastReadQueue, messageDeleteMessage, messagesDecUnreadCount, messageShiftMessages, messagesIncUnreadCount, messageUpdateLastMessage, messageUpdateMessages } from "../../../store/states/messages";
import { IMessage, IMessageCreateDto } from "../../global/types/Message.dto";
import { channelPushNew, channelSetOnlineStatus, chatPushNew, UpdateChannels } from "../../../store/states/channels";
// import { RootState, store } from "../../../store/store";
import { IChannel } from "../../global/types/Channel.dto";
import { userSet } from "../../../store/states/user";
import { IUser } from "app/global/types/User.dto";
import { IChat } from "app/global/types/Chat.dto";
import { RootState, store } from "store/store";
import { messageRecived } from "../customEvents";
// import { socketEndpoint } from "../../../state";



let socketConnection: SocketConnection | undefined;

export enum SocketEvent {
    MessageUpdate = 'messageUpdate',
    MessageCreate = 'messageCreate',
    MessagesRead = 'messagesRead',
    MessageDelete = 'messageDelete',
    ChannelSubscribe = 'channelSubscribe',
    UpdateUser = 'updateUser',
    UserOnlineStatus = 'userOnlineStatus',
    SubsOnlineStatus = 'subsOnlineStatus'
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
            store.dispatch(messageUpdateMessages([data]));
        })

        this.socket.on(SocketEvent.MessageCreate, (data: {message: IMessage, chat: IChat}) => {
            store.dispatch(chatPushNew(data.chat));
            store.dispatch(UpdateChannels(data.chat));
            const userId = this.state.user.userData.id;
            if (data.message.creatorId != userId) {
                store.dispatch(messagesIncUnreadCount(data.chat.id));
                document.dispatchEvent(messageRecived);
            }
            store.dispatch(messageShiftMessages([data.message]));
            store.dispatch(messageUpdateLastMessage(data.message));
        })

        this.socket.on(SocketEvent.MessagesRead, (data: IMessage[]) => {
            store.dispatch(messageUpdateMessages(data));
            store.dispatch(messageClearLastReadQueue(data));
        })

        this.socket.on(SocketEvent.MessageDelete, (data: IMessage | boolean) =>{
            if (!data || typeof data != 'object'){
                console.log('deletion failed');
                return;
            }

            store.dispatch(messageDeleteMessage({chatId: data.chatId, messageId: data.id}));

            const userData = this.state.user.userData;
            if (data.creatorId == userData.id) return;
            if (new Date(data.createdAt).getTime() <= new Date(userData.lastReads[data.chatId]).getTime()) return;
            store.dispatch(messagesDecUnreadCount(data.chatId));
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

        this.socket.on(SocketEvent.UserOnlineStatus, (data: {channelId: string, status: boolean}) => {
            console.log('UserOnlineStatus');
            store.dispatch(channelSetOnlineStatus([data]));
        })

        this.socket.on(SocketEvent.SubsOnlineStatus, (data: {channelId: string, status: boolean}[]) => {
            console.log('SubsOnlineStatus');
            store.dispatch(channelSetOnlineStatus(data));
        })
    }

    public sendReadMessages(messages: IMessage[]): void {
        console.log("message-read")
        this.socket.emit(SocketEvent.MessagesRead, messages);
    }

    public messageCreate(messageData: IMessageCreateDto): void{
        this.socket.emit(SocketEvent.MessageCreate, messageData);
    }

    public messageDelete(messageId: string): void{
        this.socket.emit(SocketEvent.MessageDelete, messageId);
    }

    public async subscribeToChannel(channelId: string): Promise<IChannel[]>{
        return await this.socket.emitWithAck(SocketEvent.ChannelSubscribe, channelId)
        
    }

    public setOnlineStatus(status: boolean): void{
        this.socket.emit(SocketEvent.UserOnlineStatus, status);
    }

    private state: RootState = store.getState();
    //private socketEndpoint = `https://server-telefon.duckdns.org`;
    private socketEndpoint = `http://localhost:4200`;

}

class SocketFactory{
    public static create(): SocketConnection {
        if (socketConnection) return socketConnection;
        socketConnection = new SocketConnection();
        return socketConnection;
    }
}

export default SocketFactory;