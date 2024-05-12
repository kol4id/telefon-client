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
        socketInit(state){
            return
        },
        socketSendRead(state){
            return
        }
    }

})

export const {socketInit, socketSendRead} = socketSlice.actions;
export default socketSlice.reducer;