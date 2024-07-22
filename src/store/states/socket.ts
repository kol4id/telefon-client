import { createSlice } from "@reduxjs/toolkit";


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
        }
    }

})

export const {socketInit, socketSendRead, socketSendLastRead} = socketSlice.actions;
export default socketSlice.reducer;