import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IMessage } from "../../app/global/types/Message.dto";

import { fetchWrapper } from "../../app/utils/fetch/fetchWrapper";
import { IFetchMessages, MessageApi } from "../../app/api/api";

interface IDeleteMessageDTO{
    chatId: string,
    messageId: string,
};

interface IMessageDateGroup{
    date: Date,
    messages: IMessage[]
}

interface IMessageState{
    isLoading: boolean,
    isLastLoading: boolean,
    messageSelected: string,
    messagesRecords: Record<string, IMessageDateGroup[]>,
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
        messageSetMessages(){
            // const messages = action.payload;
            // const dateMap: Map<Date, IMessage[]> = new Map();

            // messages.forEach(message => {
            //     if(!dateMap.has(message.createdAt)){
            //         dateMap.set(message.createdAt, [])
            //     }
            //     dateMap.get(message.createdAt)?.push(message);
            // })

            // console.log(Array.from(dateMap));
            // state.messagesRecords[messages[0]?.chatId] = messages;
        },
        messageSetMessageSelected(state, action){
            state.messageSelected = action.payload
        },
        messageSetDataLoading(state, action){
            state.isLoading = action.payload
        },
        messagePushMessage(state, action: {payload: IMessage | IMessage[]}){
            const messages = Array.isArray(action.payload) ? action.payload : [action.payload];
            const groupedMessages = generateGroupObj(messages);
            const chatId = messages[0].chatId;

            groupedMessages.forEach((group)=>{
                const recordLength = state.messagesRecords[chatId].length;
                if (group.date.getTime() ==  state.messagesRecords[chatId][recordLength - 1].date.getTime()){
                    state.messagesRecords[chatId][recordLength - 1].messages.push(...group.messages);
                } else {
                    state.messagesRecords[chatId].push(group);
                }
            })
        },
        messageShiftMessage(state, action: {payload: IMessage | IMessage[]}){
            const messages = Array.isArray(action.payload) ? action.payload : [action.payload];
            const groupedMessages = generateGroupObj(messages);
            const chatId = messages[0].chatId;

            groupedMessages.forEach(group =>{
                if(!state.messagesRecords[chatId]){
                    state.messagesRecords[chatId] = [];
                    state.messagesRecords[chatId].push(group);
                } else {
                    if (group.date.getTime() == state.messagesRecords[chatId][0].date.getTime()){
                        state.messagesRecords[chatId][0].messages.unshift(...group.messages);
                    } else {
                        state.messagesRecords[chatId].unshift(group);
                    }
                }
            })
        },
        messageUpdateLastMessage(state, action: {payload: IMessage}){
            if(action.payload.content){
                state.lastMessages[action.payload.chatId] = action.payload;
            }
        },
        messageDeleteMessage(state, action: {payload: IDeleteMessageDTO}){
            const message = action.payload;
            const chatId = message.chatId; 
            state.messagesRecords[chatId].forEach((group, index) => {
                const elementIndx = group.messages.findIndex(msg => msg.id === message.messageId);
                if(elementIndx == -1) return;

                state.messagesRecords[message.chatId][index].messages.splice(elementIndx!, 1);
            })
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
            const groupedMessages = generateGroupObj(messages);
            const chatId = messages[0].chatId; 

            groupedMessages.forEach(group =>{
                const indx = state.messagesRecords[chatId].findIndex(record => record.date.getTime() == group.date.getTime());
                if(indx == -1) return;

                group.messages.forEach(updateMessage => {
                    const messageIndx = state.messagesRecords[chatId][indx].messages.findIndex(message => message.id == updateMessage.id);
                    state.messagesRecords[chatId][indx].messages[messageIndx] = updateMessage;
                })
            })
        },
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLastMessages.pending, (state) =>{
                state.isLoading = true;
            })
            .addCase(fetchLastMessages.fulfilled, (state, action) =>{
                const messagesArray = action.payload as IMessage[][];
                
                messagesArray.forEach(messages => {
                    const groupedMessages = generateGroupObj(messages)

                    groupedMessages.forEach(obj =>{
                        state.messagesRecords[messages[0].chatId] ??= [];
                        if (state.messagesRecords[messages[0].chatId].find(group => group.date.getTime() == obj.date.getTime())){
                            return
                        }
                        state.messagesRecords[messages[0].chatId].push(obj);
                    })
                })
                
                state.isLoading = false;
            })
            .addCase(fetchLastMessages.rejected, (state) =>{
                state.isLoading = false;
            })
            .addCase(fetchMessages.pending, (state) =>{
                state.isLoading = true;
            })
            .addCase(fetchMessages.fulfilled, (state, action) =>{
                /*  NOTE (@kol4id): messages records stored in reversed order
                    from new to old ones
                    -example-
                    15.02.2024 - old
                    16.02.2024 - new 
                    -example-
                    messagesRecods[chatId][0] - newest record 
                    messagesRecods[chatId][messagesRecords[chatId].lenght - 1] - oldest record 
                    <TEMP>21.08.2024<TEMP> 
                    messages from server come exactly same 
                */
                const messages = action.payload as IMessage[]
                if(!messages?.length) return;

                const groupedMessages = generateGroupObj(messages);
                const chatId = messages[0].chatId;

                if (!state.messagesRecords[chatId]) {
                    state.messagesRecords[chatId] = groupedMessages;
                    return;
                }

                const recordLength = state.messagesRecords[chatId].length;
                const messagesLength = state.messagesRecords[chatId][recordLength - 1].messages.length;
                const gropuedMessagesLength = groupedMessages[groupedMessages.length - 1].messages.length;

                const groupOldestMessage = groupedMessages[groupedMessages.length - 1].messages[gropuedMessagesLength - 1];
                const groupNewestMessage = groupedMessages[0].messages[0];
                const currentNewestMessage = state.messagesRecords[chatId][0].messages[0];
                const currentOldestMessage = state.messagesRecords[chatId][recordLength - 1].messages[messagesLength - 1];

                if(groupOldestMessage.createdAt > currentNewestMessage.createdAt){
                    if (state.messagesRecords[chatId][0].date.getTime() == groupedMessages[groupedMessages.length - 1].date.getTime()){
                        const last = groupedMessages.pop()!;
                        state.messagesRecords[chatId][0].messages.unshift(...last.messages);
                        groupedMessages && state.messagesRecords[chatId].unshift(...groupedMessages);
                    } else {
                        state.messagesRecords[chatId].unshift(...groupedMessages);
                    }
                    if (state.messagesRecords[chatId].length > 10)
                        state.messagesRecords[chatId].splice(-2);
                }

                if(groupNewestMessage.createdAt < currentOldestMessage.createdAt){
                    if(state.messagesRecords[chatId][recordLength - 1].date.getTime() == groupedMessages[0].date.getTime()){
                        const first = groupedMessages.shift()!;
                        state.messagesRecords[chatId][recordLength - 1].messages.push(...first.messages);
                        groupedMessages && state.messagesRecords[chatId].push(...groupedMessages);
                    } else {
                        state.messagesRecords[chatId].push(...groupedMessages);
                    }
                    if (state.messagesRecords[chatId].length > 10)
                        state.messagesRecords[chatId].splice(0, 2);
                }

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
                        state.lastMessages[messages[0].chatId] = messages[0];
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

const generateGroupObj = (messages: IMessage[]) =>{
    const dateMap: Map<number, IMessage[]> = new Map();
    messages.forEach(message => {
        const date = new Date(message.createdAt);
        date.setHours(0,0,0,0)
        const dateKey = date.getTime();
        
        if(!dateMap.has(dateKey)){
            dateMap.set(dateKey, [])
        }
        dateMap.get(dateKey)?.push(message);
    })
    const obj: IMessageDateGroup[] = [];
    for (const [date, messages] of dateMap){
        obj.push({
            date: new Date(date),
            messages: messages
        })
    }
    return obj
}