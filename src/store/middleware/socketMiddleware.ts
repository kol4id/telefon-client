import { Middleware } from "redux";
import SocketFactory, { SocketConnection } from "../../app/utils/socket/Socket";
import { socketCreateMessage, socketDeleteMessage, socketSetOnlineStatus, socketInit, socketSendRead, socketCreateChannel, socketLeaveChannel } from "../states/socket";

const socketMiddleware: Middleware = (store) => {
    let socket: SocketConnection;
    return (next) => (action) =>{
        if (socketInit.match(action)){
            if (!socket && window !== undefined){
                socket = SocketFactory.create();
                socket.startListeningRedux(store);
                console.log('socket created')
            }
        }

        if (socket) {
            switch (action.type) {
                case socketSendRead.type:
                    socket.sendReadMessages(action.payload); // IMessage[]
                    break;
                case socketCreateMessage.type:
                    socket.messageCreate(action.payload); // IMessageCreateDto
                    break;
                case socketDeleteMessage.type:
                    socket.messageDelete(action.payload); // string
                    break;
                case socketSetOnlineStatus.type:
                    socket.setOnlineStatus(action.payload); // boolean
                    break;
                case socketCreateChannel.type:
                    socket.channelCreate(action.payload); // ICreateChannel
                    break;
                case socketLeaveChannel.type:
                    socket.channelLeave(action.payload); // string
                    break;
                default:
                    break;
            }
        }

        next(action);
    }
}

export default socketMiddleware;