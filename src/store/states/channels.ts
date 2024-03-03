import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IChannel, IChannelState } from "../../app/utils/interfaces/Channel.dto";
import FetchChannelsData from "../../app/api/fetchChannelsData";
import { HandleFetching } from "../../app/utils/fetch/HandleFetching";

interface IChannelsLoading{
    isDataLoading: boolean;
}

const initialState: IChannelsLoading & IChannelState = {
    isDataLoading: true,
    currentChannelSelected: '',
    channels: [],
}

const [FetchChannelsCall, , channelsError] = HandleFetching(async(): Promise<any>=>{
    return(FetchChannelsData());
});

export const fetchChannels = createAsyncThunk(
    'channels/fetch',
    async function(_, {rejectWithValue}){
        
        const data = await FetchChannelsCall();
        if(channelsError.isObtained){
            return rejectWithValue(channelsError.message);
        }
        return data;
    }
)

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
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChannels.pending, (state) => {
                state.isDataLoading = true;
            })
            .addCase(fetchChannels.fulfilled, (state, action) => {
                state.channels = action.payload;
                state.isDataLoading = false;
            })
            .addCase(fetchChannels.rejected, (state) => {
                state.isDataLoading = false;
            })
    }
})

export const {SetChannels, SetChannelSelected, SetDataLoading} = channelSlice.actions;
export default channelSlice.reducer;
