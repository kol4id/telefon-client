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

const sortDates = (date1: any, date2: any) =>{
    const newDate1 = new Date(date1).getTime();
    const newDate2 = new Date(date2).getTime();
    return newDate2 - newDate1;
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
        UpdateChannels(state, action){
            const elementIndx = state.channels.
                                findIndex((channel) => channel.id === action.payload)
            const channel = state.channels.splice(elementIndx, 1);
            state.channels.unshift(channel[0]);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChannels.pending, (state) => {
                state.isDataLoading = true;
            })
            .addCase(fetchChannels.fulfilled, (state, action) => {
                const channels = action.payload as IChannel[];
                const channelsSorted = channels.sort((a, b) => sortDates(a.updatedAt, b.updatedAt));
                state.channels = channelsSorted;
                state.isDataLoading = false;
            })
            .addCase(fetchChannels.rejected, (state) => {
                state.isDataLoading = false;
            }) 
    }
})

export const {SetChannels, SetChannelSelected, SetDataLoading, UpdateChannels} = channelSlice.actions;
export default channelSlice.reducer;
