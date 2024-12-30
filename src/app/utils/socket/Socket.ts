import { AnyAction, Dispatch, MiddlewareAPI } from "redux";
import { Socket, io } from "socket.io-client";
import { messageClearLastReadQueue, messageDeleteMessage, messagesDecUnreadCount, messagesDeleteByChat, messageShiftMessages, messagesIncUnreadCount, messageUpdateLastMessage, messageUpdateMessages } from "../../../store/states/messages";
import { IMessage, IMessageCreateDto } from "../../global/types/Message.dto";
import { channelPushNew, channelRemoveOne, channelSetOnlineStatus, channelSetOwner, chatPushNew, chatRemoveOne, UpdateChannels } from "../../../store/states/channels";
// import { RootState, store } from "../../../store/store";
import { IChannel} from "../../global/types/Channel.dto";
import { userSet } from "../../../store/states/user";
import { IUser } from "app/global/types/User.dto";
import { IChat } from "app/global/types/Chat.dto";
import { RootState, store } from "store/store";
import { messageRecived } from "../customEvents";
import { ICreateChannel } from "store/states/socket";
import { baseAppUrl } from "../../../state";
// import { socketEndpoint } from "../../../state";


export type SocketConnectionMethods = Pick<
    SocketConnection,
    "sendReadMessages" 
    | "messageCreate" 
    | "messageDelete" 
    | "setOnlineStatus" 
    | "channelCreate" 
    | "channelLeave"
>;

let socketConnection: SocketConnection | undefined;

export enum SocketEvent {
    MessageUpdate = 'messageUpdate',
    MessageCreate = 'messageCreate',
    MessagesRead = 'messagesRead',
    MessageDelete = 'messageDelete',
    ChannelSubscribe = 'channelSubscribe',
    ChannelCreate = 'channelCreate',
    ChannelLeave = 'channelLeave',
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
            console.log('messageCreate');

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

            this.updateStore()
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

        this.socket.on(SocketEvent.ChannelSubscribe, (data: {channel: IChannel, chat: IChat})=>{
            console.log('channelSubscrbe');
            store.dispatch(channelPushNew(data.channel));
            store.dispatch(chatPushNew(data.chat));
        })

        this.socket.on(SocketEvent.ChannelLeave, (data: {channel: IChannel, chat: IChat})=>{
            console.log('channelLeave');

            this.updateStore()
            store.dispatch(channelRemoveOne(data.channel));
            store.dispatch(chatRemoveOne(data.chat));
            
            store.dispatch(messagesDeleteByChat(data.chat.id));
            const currentChannel = this.state.channelsList.currentChannelSelected;
            if (currentChannel == data.channel.id){
                window.location.replace(baseAppUrl);
            }
            currentChannel
        })

        this.socket.on(SocketEvent.UserOnlineStatus, (data: {channelId: string, status: boolean}) => {
            console.log('UserOnlineStatus');
            store.dispatch(channelSetOnlineStatus([data]));
            store.dispatch(channelSetOwner({channelId: data.channelId, user: {lastLogin: new Date()}}))
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

    public channelCreate(channelData: ICreateChannel): void{
        this.socket.emit(SocketEvent.ChannelCreate, channelData);
    }

    public channelLeave(channelId: string): void{
        this.socket.emit(SocketEvent.ChannelLeave, channelId);
    }

    private updateStore(){
        this.state = store.getState();
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