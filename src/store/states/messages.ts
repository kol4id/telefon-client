import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IMessage } from "../../app/utils/interfaces/Message.dto";
import FetchChannelMessages from "../../app/api/fetchChannelMessages";
import { HandleFetching } from "../../app/utils/fetch/HandleFetching";
import FetchLastMessages from "../../app/api/fetchLastMessages";



interface ISetMessagesDTO{
    channelId: string,
    messages: IMessage[],
};

interface IPushMessageDTO{
    channelId: string,
    message: IMessage,
};

interface IDeleteMessageDTO
{
    channelId: string,
    messageId: string,
};

interface IMessageState{
    isLoading: boolean,
    messageSelected: string,
    messagesRecords: Record<string, IMessage[]>,
}

const initialState: IMessageState = {
    isLoading: false, 
    messageSelected: '',
    messagesRecords: {},
}

// const [FetchChannelsCall, , channelsError] = HandleFetching(async(): Promise<any>=>{
//     return(await FetchChannelMessages());
// });

const [FetchLastMessagesCall, , lastMessagesError] = HandleFetching(async(): Promise<any> => {
    return(await FetchLastMessages());
})

const HandleMessageFetch = (channelId: string, chunkNumber: number) =>{
    const [FetchMessagesCall, , messagesError] = HandleFetching(async(): Promise<any> => {
        return (await FetchChannelMessages(channelId, chunkNumber));
    });
    return {FetchMessagesCall, messagesError}
} 

export const fetchLastMessages = createAsyncThunk(
    'messages/fetchLast',
    async function(_, {rejectWithValue}){
        const data = await FetchLastMessagesCall();
        if(lastMessagesError.isObtained){
            return rejectWithValue(lastMessagesError.message);
        }
        return data;
    }
)

export const fetchMessages = createAsyncThunk(
    'messages/fetch',
    async function(args: {channelId: string, chunkNumber: number}, {rejectWithValue}){
        const {FetchMessagesCall, messagesError} = HandleMessageFetch(args.channelId, args.chunkNumber);
        const data = await FetchMessagesCall();
        if(messagesError.isObtained){
            return rejectWithValue(messagesError.message);
        }
        return data;
    }
)

const messageSlice = createSlice({
    name: 'messagesList',
    initialState,
    reducers: {
        SetMessages(state, action: {payload: ISetMessagesDTO}){
            state.messagesRecords[action.payload.channelId] = action.payload.messages;
        },
        SetMessageSelected(state, action){
            state.messageSelected = action.payload
        },
        SetDataLoading(state, action){
            state.isLoading = action.payload
        },
        PushMessage(state, action: {payload: IPushMessageDTO}){
            if(!state.messagesRecords[action.payload.channelId]){
                state.messagesRecords[action.payload.channelId] = [];
            }
            state.messagesRecords[action.payload.channelId].unshift(action.payload.message);
            // state.messagesRecords[action.payload.channelId] = [action.payload.message, ...state.messagesRecords[action.payload.channelId]]
            // state.messagesRecords[action.payload.channelId].push(action.payload.message);
        },
        DeleteMessage(state, action: {payload: IDeleteMessageDTO}){
            const elementIndx = state.messagesRecords[action.payload.channelId].
                                findIndex(message => message.id === action.payload.messageId)
            state.messagesRecords[action.payload.channelId].splice(elementIndx, 1);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLastMessages.pending, (state) =>{
                state.isLoading = true;
            })
            .addCase(fetchLastMessages.fulfilled, (state, action) =>{
                const messagesArray = action.payload as IMessage[][]
                messagesArray.forEach(messages => {
                    if(messages.length){
                        state.messagesRecords[messages[0].channelId] = messages;
                    }
                });
                state.isLoading = false;
            })
            .addCase(fetchLastMessages.rejected, (state) =>{
                state.isLoading = false;
            })
            .addCase(fetchMessages.pending, (state) =>{
                state.isLoading = true;
            })
            .addCase(fetchMessages.fulfilled, (state, action) =>{
                const messages = action.payload as IMessage[]
                if(messages.length){
                    state.messagesRecords[messages[0].channelId] = messages;    
                }
                state.isLoading = false;
            })
            .addCase(fetchMessages.rejected, (state) =>{
                state.isLoading = false;
            })
            
    }
})

export const {SetMessages, SetMessageSelected, SetDataLoading, PushMessage, DeleteMessage} = messageSlice.actions;
export default messageSlice.reducer;