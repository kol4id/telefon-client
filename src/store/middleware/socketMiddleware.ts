import { Middleware } from "redux";
import SocketFactory, {SocketConnection } from "../../app/utils/socket/Socket";
import { socketInit, socketSendRead } from "../states/socket";

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

        if (socketSendRead.match(action) && socket){
            socket.sendReadMessages(store)
        }

        next(action);
    }
}

export default socketMiddleware;