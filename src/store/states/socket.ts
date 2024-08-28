import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMessageCreateDto } from "../../app/global/types/Message.dto";

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
        socketSendRead(){
            return
        },
        socketSendLastRead(){
            return
        },
        socketCreateMessage(_, action: PayloadAction<IMessageCreateDto>){
            return;
        },
    }

})

export const {socketInit, socketSendRead, socketSendLastRead,  socketCreateMessage} = socketSlice.actions;
export default socketSlice.reducer;