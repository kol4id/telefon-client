import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMessage, IMessageCreateDto } from "../../app/global/types/Message.dto";

export interface ISocketState {
    isConnected: boolean;
};

const initialState: ISocketState = {
    isConnected: false
};

const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        socketInit(){
            return
        },
        socketSendRead(_, action: PayloadAction<IMessage[]>){
            console.log(action.payload);
            return
        },
        socketSendLastRead(){
            return
        },
        socketCreateMessage(_, action: PayloadAction<IMessageCreateDto>){
            console.log(action.payload);
            return;
        },
        socketDeleteMessage(_, action: PayloadAction<string>){
            console.log(action.payload);
            return;
        },
        socketSetOnlineStatus(_, action: PayloadAction<boolean>){
            console.log(action.payload);
            return
        }
    }

})

export const {socketInit, socketSendRead, socketSendLastRead, socketCreateMessage, socketDeleteMessage, socketSetOnlineStatus} = socketSlice.actions;
export default socketSlice.reducer;