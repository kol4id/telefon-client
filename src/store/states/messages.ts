import { createSlice } from "@reduxjs/toolkit";
import { IMessage } from "../../app/utils/interfaces/Message.dto";


interface IMessageState{
    messageSelected: string,
    messages: IMessage[],
}

const initialState: IMessageState = {
    messageSelected: '',
    messages: []
}

const messageSlice = createSlice({
    name: 'messagesList',
    initialState,
    reducers: {
        SetMessages(state, action){
            state.messages = action.payload
        },
        SetMessageSelected(state, action){
            state.messageSelected = action.payload
        }
    }
})

export const {SetMessages, SetMessageSelected} = messageSlice.actions;
export default messageSlice.reducer;