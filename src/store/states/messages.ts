import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IMessage } from "../../app/utils/interfaces/Message.dto";
import FetchChannelMessages from "../../app/api/fetchChannelMessages";
import { HandleFetching } from "../../app/utils/fetch/HandleFetching";
import FetchLastMessages from "../../app/api/fetchLastMessages";
import FetchOneLastMessageEach from "../../app/api/fetchOneLastMessageEach";



// interface ISetMessagesDTO{
//     channelId: string,
//     messages: IMessage[],
// };

// interface IPushMessageDTO{
//     channelId: string,
//     message: IMessage,
// };

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
        messageSetMessages(state, action: {payload: IMessage[]}){
            const messages = action.payload;
            state.messagesRecords[messages[0]?.channelId] = messages;
        },
        messageSetMessageSelected(state, action){
            state.messageSelected = action.payload
        },
        messageSetDataLoading(state, action){
            state.isLoading = action.payload
        },
        messagePushMessage(state, action: {payload: IMessage | IMessage[]}){
            const messages = Array.isArray(action.payload) ? action.payload : [action.payload];
        
            messages.forEach((message)=>{
                if(!state.messagesRecords[message.channelId]){
                    state.messagesRecords[message.channelId] = [];
                }
                state.messagesRecords[message.channelId].push(message);
            })
        },
        messageShiftMessage(state, action: {payload: IMessage}){
            const messages = Array.isArray(action.payload) ? action.payload : [action.payload];
            
            messages.forEach((message)=>{
                if(!state.messagesRecords[message.channelId]){
                    state.messagesRecords[message.channelId] = [];
                }
                state.messagesRecords[message.channelId] = [message, ...state.messagesRecords[message.channelId]];
            })  
        },
        messageUpdateLastMessage(state, action: {payload: IMessage}){
            if(action.payload.content){
                state.lastMessages[action.payload.channelId] = action.payload;
            }
        },
        messageDeleteMessage(state, action: {payload: IDeleteMessageDTO}){
            const message = action.payload;
            const elementIndx = state.messagesRecords[message.channelId].
                                findIndex(msg => msg.id === message.messageId)
            state.messagesRecords[message.channelId].splice(elementIndx, 1);
        },
        messageLastReadsQueuePush(state, action){
            state.lastReadsQueue.push(action.payload);
        },
        messageClearLastReadQueue(state, action: {payload: IMessage | IMessage[]}){
            const messages = Array.isArray(action.payload) ? action.payload : [action.payload];
            const messagesToRemoveIds = new Set(messages.map(message => message.id));
            
            const newLastReadQueue = state.lastReadsQueue.filter(message => !messagesToRemoveIds.has(message.id));
            state.lastReadsQueue = newLastReadQueue;
        },
        messageUpdateMessage(state, action: {payload: IMessage | IMessage[]}){
            const messages = Array.isArray(action.payload) ? action.payload : [action.payload];

            messages.forEach((message)=>{
                const messageIndex = state.messagesRecords[message.channelId].findIndex((msg) => msg.id === message.id)
                state.messagesRecords[message.channelId][messageIndex] = message;
            })
        },
        
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
    messageSetMessages, messageSetMessageSelected, messageSetDataLoading, messagePushMessage, 
    messageShiftMessage, messageUpdateLastMessage, messageDeleteMessage, messageLastReadsQueuePush,
    messageClearLastReadQueue, messageUpdateMessage} = messageSlice.actions;
export default messageSlice.reducer;