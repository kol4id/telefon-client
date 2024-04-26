import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IMessage } from "../../app/utils/interfaces/Message.dto";
import FetchChannelMessages from "../../app/api/fetchChannelMessages";
import { HandleFetching } from "../../app/utils/fetch/HandleFetching";
import FetchLastMessages from "../../app/api/fetchLastMessages";
import FetchOneLastMessageEach from "../../app/api/fetchOneLastMessageEach";



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
    isLastLoading: boolean,
    messageSelected: string,
    messagesRecords: Record<string, IMessage[]>,
    lastMessages: Record<string, IMessage>,
    lastReadsQueue: IMessage[];
}

const initialState: IMessageState = {
    isLoading: false,
    isLastLoading: false, 
    messageSelected: '',
    messagesRecords: {},
    lastMessages: {},
    lastReadsQueue: [],
}

// const [FetchChannelsCall, , channelsError] = HandleFetching(async(): Promise<any>=>{
//     return(await FetchChannelMessages());
// });
const [FetchOneLastMessagesCall, , lastOneMessagesError] = HandleFetching(async(): Promise<any>=>{
    return(FetchOneLastMessageEach());
});

const [FetchLastMessagesCall, , lastMessagesError] = HandleFetching(async(): Promise<any> => {
    return(await FetchLastMessages());
})

const HandleMessageFetch = (channelId: string, chunkNumber: number) =>{
    const [FetchMessagesCall, , messagesError] = HandleFetching(async(): Promise<any> => {
        return (await FetchChannelMessages(channelId, chunkNumber));
    });
    return {FetchMessagesCall, messagesError}
} 

// const HandleMessageFetch = (channelId: string, chunkNumber: number) =>{
//     const [FetchMessagesCall, , messagesError] = HandleFetching(async(): Promise<any> => {
//         return (await FetchChannelMessages(channelId, chunkNumber));
//     });
//     return {FetchMessagesCall, messagesError}
// }


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

export const fetchOneLastMessage = createAsyncThunk(
    'channels/fetch/lastOne',
    async function(_, {rejectWithValue}){
        
        const data = await FetchOneLastMessagesCall();
        if(lastOneMessagesError.isObtained){
            return rejectWithValue(lastOneMessagesError.message);
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
            state.messagesRecords[action.payload.channelId].push(action.payload.message);
        },
        PushMessages(state, action: {payload: ISetMessagesDTO}){
            if(!state.messagesRecords[action.payload.channelId]){
                state.messagesRecords[action.payload.channelId] = [];
            }
            state.messagesRecords[action.payload.channelId].push(...action.payload.messages);
        },
        ShiftMessage(state, action: {payload: IPushMessageDTO}){
            if(!state.messagesRecords[action.payload.channelId]){
                state.messagesRecords[action.payload.channelId] = [];
            }
            state.messagesRecords[action.payload.channelId] = [action.payload.message, ...state.messagesRecords[action.payload.channelId]];
        },
        ShiftMessages(state, action: {payload: ISetMessagesDTO}){
            if(!state.messagesRecords[action.payload.channelId]){
                state.messagesRecords[action.payload.channelId] = [];
            }
            state.messagesRecords[action.payload.channelId] = [...action.payload.messages, ...state.messagesRecords[action.payload.channelId]];
        },
        UpdateLastMessage(state, action: {payload: IMessage}){
            if(action.payload.content){
                state.lastMessages[action.payload.channelId] = action.payload;
            }
        },
        DeleteMessage(state, action: {payload: IDeleteMessageDTO}){
            const elementIndx = state.messagesRecords[action.payload.channelId].
                                findIndex(message => message.id === action.payload.messageId)
            state.messagesRecords[action.payload.channelId].splice(elementIndx, 1);
        },
        LastReadsQueuePush(state, action){
            state.lastReadsQueue.push(action.payload);
        },
        ClearLastReadQueue(state){
            state.lastReadsQueue = [];
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
                        const reversedMessages = messages.reverse();
                        state.messagesRecords[messages[0].channelId] = reversedMessages;
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
            .addCase(fetchOneLastMessage.pending, (state) => {
                state.isLastLoading = true;
            })
            .addCase(fetchOneLastMessage.fulfilled, (state, action) => {
                const messagesArray = action.payload as IMessage[][]
                console.log(messagesArray)
                messagesArray.forEach(messages => {
                    if(messages.length){
                        state.lastMessages[messages[0].channelId] = messages[0];
                    }
                });
                state.isLastLoading = false;
            })
            .addCase(fetchOneLastMessage.rejected, (state) => {
                state.isLastLoading = false;
            })
            
    }
})

export const {
    SetMessages, SetMessageSelected, SetDataLoading, PushMessages, PushMessage, 
    ShiftMessages, ShiftMessage, UpdateLastMessage, DeleteMessage, LastReadsQueuePush,
    ClearLastReadQueue} = messageSlice.actions;
export default messageSlice.reducer;