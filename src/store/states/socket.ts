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
        socketCreateMessage(state, action: PayloadAction<IMessageCreateDto>){
            return;
        },
        socketSendRead(){
            return
        },
        socketSendLastRead(){
            return
        }
    }

})

export const {socketInit, socketCreateMessage, socketSendRead, socketSendLastRead} = socketSlice.actions;
export default socketSlice.reducer;