import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IMessage } from "../../app/global/types/Message.dto";

import { fetchWrapper } from "../../app/utils/fetch/fetchWrapper";
import { IFetchMessages, MessageApi } from "../../app/api/api";

interface IDeleteMessageDTO{
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
};

const initialState: IMessageState = {
    isLoading: false,
    isLastLoading: false, 
    messageSelected: '',
    messagesRecords: {},
    lastMessages: {},
    lastReadsQueue: [],
};

const api = new MessageApi();

export const fetchLastMessages = createAsyncThunk(
    'messages/fetchLast',
    async (_, {rejectWithValue}) => {
        return fetchWrapper(() => api.fetchLastReadMessages(25), rejectWithValue);
    }
);

export const fetchMessages = createAsyncThunk(
    'messages/fetch',
    async (args: IFetchMessages, {rejectWithValue}) => {
        return fetchWrapper(() => api.fetchMessages(args), rejectWithValue);
    }
)

export const fetchLastOneMessages = createAsyncThunk(
    'channels/fetch/lastOne',
    async (_, {rejectWithValue}) => {
        return fetchWrapper(() => api.fetchLastOneMessages(), rejectWithValue);
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
        messageShiftMessage(state, action: {payload: IMessage | IMessage[]}){
            const messages = Array.isArray(action.payload) ? action.payload : [action.payload];
            
            messages.forEach((message)=>{
                if(!state.messagesRecords[message.channelId]){
                    state.messagesRecords[message.channelId] = [];
                }
                state.messagesRecords[message.channelId].unshift(message);
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
                        // const reversedMessages = messages.reverse();
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
                if(!messages?.length) return;

                const messagesLength = state.messagesRecords[messages[0].channelId].length - 1;
                if (messages[messages.length - 1].createdAt < state.messagesRecords[messages[0].channelId][0].createdAt){
                    state.messagesRecords[messages[0].channelId].unshift(...messages);
                } else if (messages[0].createdAt > state.messagesRecords[messages[0].channelId][messagesLength].createdAt){
                    state.messagesRecords[messages[0].channelId].push(...messages);
                }
                else state.messagesRecords[messages[0].channelId] = messages;
                
                state.isLoading = false;
            })
            .addCase(fetchMessages.rejected, (state) =>{
                state.isLoading = false;
            })
            .addCase(fetchLastOneMessages.pending, (state) => {
                state.isLastLoading = true;
            })
            .addCase(fetchLastOneMessages.fulfilled, (state, action) => {
                const messagesArray = action.payload as IMessage[][]
                console.log(messagesArray)
                messagesArray.forEach(messages => {
                    if(messages.length){
                        state.lastMessages[messages[0].channelId] = messages[0];
                    }
                });
                state.isLastLoading = false;
            })
            .addCase(fetchLastOneMessages.rejected, (state) => {
                state.isLastLoading = false;
            })
            
    }
})

export const {
    messageSetMessages, messageSetMessageSelected, messageSetDataLoading, messagePushMessage, 
    messageShiftMessage, messageUpdateLastMessage, messageDeleteMessage, messageLastReadsQueuePush,
    messageClearLastReadQueue, messageUpdateMessage} = messageSlice.actions;
export default messageSlice.reducer;