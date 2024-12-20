import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChannel, IChannelState } from "../../app/global/types/Channel.dto";
import { fetchWrapper } from "../../app/utils/fetch/fetchWrapper";
import { ChannelApi, ChatApi, UserApi } from "../../app/api/api";
import { IChat } from "app/global/types/Chat.dto";
import { IUser, IUserExternal } from "app/global/types/User.dto";

interface IChannelsLoading{
    isDataLoading: boolean;
    isParticipantsLoading: boolean;
}

const initialState: IChannelsLoading & IChannelState = {
    currentChannelGroupParticipants: new Map(),
    isParticipantsLoading: false,
    isDataLoading: true,
    currentChannelSelected: '',
    userChannels: [],
    channelsOwner: {},
    channelsOnlineStatus: {},
    currentChat: {} as IChat,
    filteredChannels: [],
    currentChannel: {} as IChannel,
    chats: []
}

const users = new UserApi();
const channels = new ChannelApi();
const chats = new ChatApi();

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

export const fetchChannelsOwners = createAsyncThunk(
    'channels/channelsOwners',
    async (_, {rejectWithValue}) => {
        return fetchWrapper(() => users.getForUser(), rejectWithValue);
    }
)

export const fetchChats = createAsyncThunk(
    'channels/chats',
    async (_, {rejectWithValue}) =>{
        return fetchWrapper(() => chats.getAll(), rejectWithValue);
    }
)

export const fetchChat = createAsyncThunk(
    'channels/chat',
    async (channelId: string, {rejectWithValue}) =>{
        return fetchWrapper(() => chats.getByChannel(channelId), rejectWithValue);
    }
)

export const fetchParticipants = createAsyncThunk(
    'channels/Participants',
    async (channelId: string, {rejectWithValue}) =>{
        return fetchWrapper(() => channels.getParticipants(channelId), rejectWithValue);
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
            state.userChannels = action.payload;
        },
        channelSetFiltered(state, action){
            state.filteredChannels = action.payload
        },
        channelPushNew(state, action: PayloadAction<IChannel>){
            if (!state.userChannels.find(channel => channel.id == action.payload.id)){
                state.userChannels.push(action.payload);
            }
        },
        channelRemoveOne(state, action: PayloadAction<IChannel>){
            const channel = action.payload;
            state.userChannels = state.userChannels.filter(oldChannel => oldChannel.id != channel.id);
        },
        chatPushNew(state, action : PayloadAction<IChat>){
            if (!state.chats.find(chat => chat.id == action.payload.id)){
                state.chats.push(action.payload);
            }
        },
        chatRemoveOne(state, action: PayloadAction<IChat>){
            const chat = action.payload;
            state.chats = state.chats.filter(oldChat => oldChat.id != chat.id);
        },
        SetChannelSelected(state, action: PayloadAction<{id: string, personalChannel: string}>){
            const id = action.payload.id;
            state.currentChannelSelected = id;
            if (state.userChannels.some(channel => channel.id == id)){
                state.currentChannel = state.userChannels.find(channel => channel.id == id)!;
            }
    
            const valuesToFind = [action.payload.personalChannel, id]
            let chat = undefined;
            switch(state.currentChannel.channelType){
                case 'user': 
                    chat = state.chats.filter(chat => {
                        if (chat.owner.length < 2) return false;
                        return valuesToFind.every(value => chat.owner.includes(value))
                    })[0]
                    break;
                default: 
                    chat = state.chats.find(chat => {
                        if (chat.owner.length != 1) return false;
                        if (chat.owner[0] == id) return true;
                    });
            }
            
            if (chat) state.currentChat = chat as any as IChat
            // const chats = state.chats.filter(chat => chat.)
        },
        SetDataLoading(state, action){
            state.isDataLoading = action.payload;
        },
        SetChatSelected(state, action: PayloadAction<IChat>){
            state.currentChat = action.payload;
        },
        UpdateChannels(state, action: PayloadAction<IChat>){
            const chat = action.payload;
            const channelIndx = state.userChannels.
                                findIndex((channel) => chat.owner.includes(channel.id));
            const filteredIndx = state.filteredChannels.
                                findIndex((channel) => chat.owner.includes(channel.id))

            let channel;
            let filterChannel;
            if (channelIndx >= 0) {
                channel = state.userChannels.splice(channelIndx, 1);
                state.userChannels.unshift(channel[0]);
            }
            if (filteredIndx >= 0) {
                filterChannel = state.filteredChannels.splice(filteredIndx, 1);
                state.filteredChannels.unshift(filterChannel[0]);
            }

            if (state.currentChannel.id == channel?.[0].id || state.currentChannel.id == filterChannel?.[0].id){
                state.currentChat = chat;
            }
        },
        channelSetOnlineStatus(state, action: PayloadAction<{channelId: string, status: boolean}[]>){
            action.payload.forEach(status => {
                state.channelsOnlineStatus[status.channelId] = status.status ?? false;
            })
        },
        channelSetOwner(state, action: PayloadAction<{channelId: string, user: Partial<IUser>}>){
            const channelId = action.payload.channelId!;
            const oldData = state.channelsOwner?.[channelId];
            state.channelsOwner[channelId] = {...oldData, ...action.payload.user}
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
                if (!state.userChannels) state.userChannels = [];
                state.userChannels = channelsSorted;
                state.isDataLoading = false;
            })
            .addCase(fetchChannels.rejected, (state) => {
                state.isDataLoading = false;
            }) 
            .addCase(fetchChannel.fulfilled, (state, action) => {
                const channel = action.payload as IChannel;
                if (!state.userChannels) state.userChannels = [];
                state.currentChannel = channel;
                state.isDataLoading = false;
            })
            .addCase(fetchChannel.rejected, (state) => {
                state.isDataLoading = false;
            })
            .addCase(fetchChats.pending, () => {
                // state.isDataLoading = true;
            })
            .addCase(fetchChats.fulfilled, (state, action) => {
                const chats = action.payload as IChat[];
                state.chats = chats;
                // state.isDataLoading = false;
            })
            .addCase(fetchChats.rejected, () => {
                // state.isDataLoading = false;
            })
            .addCase(fetchChat.pending, () => {
                // state.isDataLoading = true;
            })
            .addCase(fetchChat.fulfilled, (state, action) => {
                if (action.payload == undefined || action.payload == null){
                    state.currentChat = undefined;
                    return;
                }
                if (!state.chats.find(chat => chat.id == action.payload.id)){
                    state.chats.push(action.payload);
                }
                state.currentChat = action.payload;
                // state.isDataLoading = false;
            })
            .addCase(fetchChat.rejected, () => {
                // state.isDataLoading = false;
            })
            .addCase(fetchChannelsOwners.pending, () => {
                // state.isDataLoading = true;
            })
            .addCase(fetchChannelsOwners.fulfilled, (state, action: PayloadAction<IUser[]>) => {
                action.payload.forEach(user => {
                    state.channelsOwner[user.personalChannel] = user;
                })
                // state.isDataLoading = false;
            })
            .addCase(fetchChannelsOwners.rejected, () => {
                // state.isDataLoading = false;
            })
            .addCase(fetchParticipants.pending, (state) => {
                state.isParticipantsLoading = true;
            })
            .addCase(fetchParticipants.fulfilled, (state, action: PayloadAction<IUserExternal[]>) => {
                const participants = action.payload;
                state.currentChannelGroupParticipants = new Map(participants.map(part => [part.id, part]));
                console.log(state.currentChannelGroupParticipants);
                state.isParticipantsLoading = false;
            })
            .addCase(fetchParticipants.rejected, (state) => {
                state.isParticipantsLoading = false;
            })
            
            
    }
})

export const {SetChannels, SetChannelSelected, SetDataLoading, SetChatSelected, UpdateChannels, channelSetFiltered, channelPushNew, chatPushNew, channelSetOnlineStatus, channelSetOwner, channelRemoveOne, chatRemoveOne} = channelSlice.actions;
export default channelSlice.reducer;
