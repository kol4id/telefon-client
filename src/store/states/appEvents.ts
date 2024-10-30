import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type creationType = | 'channel' | 'group' | 'none';

interface IAppEvents {
    channelCreationType: creationType
}

const initialState : IAppEvents ={
    channelCreationType: 'none'
}

const appEventSlice = createSlice({
    name: 'appEvents',
    initialState,
    reducers: {
        setChannelCreationType(state, action: PayloadAction<creationType>){
            state.channelCreationType = action.payload;
        }
    }
})

export const {setChannelCreationType} = appEventSlice.actions;
export default appEventSlice.reducer;