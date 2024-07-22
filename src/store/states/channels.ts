import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IChannel, IChannelState } from "../../app/global/types/Channel.dto";
import { fetchWrapper } from "../../app/utils/fetch/fetchWrapper";
import FetchChannelsData from "../../app/api/fetchChannelsData";
import { ChannelApi } from "../../app/api/api";

interface IChannelsLoading{
    isDataLoading: boolean;
}

const initialState: IChannelsLoading & IChannelState = {
    isDataLoading: true,
    currentChannelSelected: '',
    channels: [],
    currentChannel: {} as IChannel
}

const channels = new ChannelApi();

export const fetchChannels = createAsyncThunk(
    'channels/fetch',
    async (_, {rejectWithValue}) => {
        return fetchWrapper(() => channels.getForUser(), rejectWithValue);
    }
)

export const fetchChannel = createAsyncThunk(
    'channel/fetch',
    async (channelId: string, {rejectWithValue}) => {
        return fetchWrapper(() => channels.get(channelId), rejectWithValue);
    }
)

export const searchChannels = createAsyncThunk(
    'channels/search',
    async (subString: string, {rejectWithValue}) => {
        return fetchWrapper(() => channels.search(subString), rejectWithValue);
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
            const id = action.payload;
            state.currentChannelSelected = id;
            if (state.channels.includes(id)){
                state.currentChannel = state.channels[id];
            }
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
                if (!state.channels) state.channels = [];
                state.channels = channelsSorted;
                state.isDataLoading = false;
            })
            .addCase(fetchChannels.rejected, (state) => {
                state.isDataLoading = false;
            }) 
            .addCase(fetchChannel.pending, (state) => {
                // state.isDataLoading = true;
            })
            .addCase(fetchChannel.fulfilled, (state, action) => {
                const channel = action.payload as IChannel;
                if (!state.channels) state.channels = [];
                state.currentChannel = channel;
                state.isDataLoading = false;
            })
            .addCase(fetchChannel.rejected, (state) => {
                state.isDataLoading = false;
            }) 
    }
})

export const {SetChannels, SetChannelSelected, SetDataLoading, UpdateChannels} = channelSlice.actions;
export default channelSlice.reducer;
