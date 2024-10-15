import { Middleware } from "redux";
import SocketFactory, { SocketConnection } from "../../app/utils/socket/Socket";
import { socketCreateMessage, socketInit, socketSendRead } from "../states/socket";

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

        if (socket){
            if (socketSendRead.match(action)) socket.sendReadMessages(action.payload);
            if (socketCreateMessage.match(action)) socket.messageCreate(action.payload);
            // if (socketSubscribeToChannel.match(action)) socket.subscribeToChannel(action.payload);
        }

        next(action);
    }
}

export default socketMiddleware;