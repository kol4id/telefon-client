import { createSlice } from "@reduxjs/toolkit";


interface IMessageInputState{
    value: string
    height: number
}

const initialState: IMessageInputState = {
    value: '',
    height: 0
}

const messageInputSlice = createSlice({
    name: "messageInput",
    initialState,
    reducers: {
        SetMessageInput(state, action){
            state.value = action.payload
        },
        SetMessageInputHeight(state, action){
            state.height = action.payload
        }
    }
})

export const {SetMessageInput, SetMessageInputHeight} = messageInputSlice.actions;
export default messageInputSlice.reducer;