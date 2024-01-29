import { createSlice } from "@reduxjs/toolkit";
import { IChannelState } from "../../app/utils/interfaces/IChannelState";

interface IChannelsLoading{
    isDataLoading: boolean;
}

const initialState: IChannelsLoading & IChannelState = {
    isDataLoading: true,
    currentChannelSelected: '',
    channels: [],
}

const channelSlice = createSlice({
    name: 'channelsList',
    initialState,
    reducers: {
        SetChannels(state, action){
            state.channels = action.payload;
        },
        SetChannelSelected(state, action){
            state.currentChannelSelected = action.payload;
        },
        SetDataLoading(state, action){
            state.isDataLoading = action.payload;
        },
    }
})

export const {SetChannels, SetChannelSelected, SetDataLoading} = channelSlice.actions;
export default channelSlice.reducer;
