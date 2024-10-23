import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMessage, IUnreadMessageCount } from "../../app/global/types/Message.dto";

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
    isUnreadCountPending: boolean,
    totalUnreadMessages: Record<string, number>, 
    isLoading: boolean,
    isLastLoading: boolean,
    selectedMessageId: string,
    messageRecords: Record<string, IMessageDateGroup[]>,
    lastMessages: Record<string, IMessage>,
    lastReadsQueue: IMessage[];
};

const initialState: IMessageState = {
    isUnreadCountPending: false,
    totalUnreadMessages: {},
    isLoading: false,
    isLastLoading: false, 
    selectedMessageId: '',
    messageRecords: {},
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

export const fetchUnreadMessagesCount = createAsyncThunk(
    'messages/fetchUnreadCount',
    async (_, {rejectWithValue}) => {
        return fetchWrapper(()=> api.fetchUnreadMessagesCount(), rejectWithValue);
    }
)

const messageSlice = createSlice({
    name: 'messagesList',
    initialState,
    reducers: {
        messageSetSelectedMessage(state, action: PayloadAction<string>) {
            state.selectedMessageId = action.payload;
        },
        messageSetIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        messagePushMessages(state, action: PayloadAction<IMessage[]>) {
            const groupedMessages = groupMessagesByDate(action.payload);
            const chatId = action.payload[0].chatId;
            state.messageRecords[chatId] ??= [];
            groupedMessages.forEach(group =>{
                if (group.date.getTime() == state.messageRecords[chatId].at(-1)?.date.getTime()){
                    state.messageRecords[chatId].at(-1)?.messages.push(...group.messages);
                    return;
                }
                state.messageRecords[chatId].push(group);
            })
        },
        messageShiftMessages(state, action: PayloadAction<IMessage[]>) {
            const groupedMessages = groupMessagesByDate(action.payload);
            const chatId = action.payload[0].chatId;
            state.messageRecords[chatId] ??= [];
            groupedMessages.forEach(group =>{
                if (group.date.getTime() == state.messageRecords[chatId][0].date.getTime()){
                    state.messageRecords[chatId][0].messages.unshift(...group.messages);
                    return;
                } 
                state.messageRecords[chatId].unshift(group);
            })
        },
        messageUpdateLastMessage(state, action: PayloadAction<IMessage>) {
            const { chatId, content } = action.payload;
            if (content) {
                state.lastMessages[chatId] = action.payload;
            }
        },
        messageDeleteMessage(state, action: PayloadAction<IDeleteMessageDTO>) {
            const { chatId, messageId } = action.payload;
            state.messageRecords[chatId] = state.messageRecords[chatId].map((group) => ({
                ...group,
                messages: group.messages.filter((msg) => msg.id !== messageId),
            }));
        },
        messagePushToLastReadsQueue(state, action: PayloadAction<IMessage>) {
            state.lastReadsQueue.push(action.payload);
        },
        messageClearLastReadQueue(state, action: PayloadAction<IMessage[]>) {
            const messageIdsToRemove = new Set(action.payload.map((msg) => msg.id));
            state.lastReadsQueue = state.lastReadsQueue.filter(
                (msg) => !messageIdsToRemove.has(msg.id)
            );
        },
        messageUpdateMessages(state, action: PayloadAction<IMessage[]>) {
            const groupedMessages = groupMessagesByDate(action.payload);
            const chatId = action.payload[0].chatId;

            groupedMessages.forEach((group) => {
                const existingGroup = state.messageRecords[chatId].find(
                    (record) => record.date.getTime() === group.date.getTime()
                );

                if (existingGroup) {
                    existingGroup.messages = existingGroup.messages.map((msg) =>
                        group.messages.find((updatedMsg) => updatedMsg.id === msg.id) || msg
                    );
                }
            });
        },
        messagesIncUnreadCount(state, action: PayloadAction<string>){
            state.totalUnreadMessages[action.payload] ??= 0;
            state.totalUnreadMessages[action.payload]++;
        },
        messagesDecUnreadCount(state, action: PayloadAction<string>){
            if(state.totalUnreadMessages[action.payload] - 1 <= 0) {
                state.totalUnreadMessages[action.payload] = 0;
                return;
            }
            state.totalUnreadMessages[action.payload]--;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLastMessages.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchLastMessages.fulfilled, (state, action) => {
                const messagesArray = action.payload as IMessage[][];
                
                messagesArray.forEach(messages => {
                    const groupedMessages = groupMessagesByDate(messages);
                    const chatId = messages[0].chatId;
                    groupedMessages.forEach(obj =>{
                        state.messageRecords[chatId] ??= [];
                        if (state.messageRecords[chatId].find(group => group.date.getTime() == obj.date.getTime())){
                            return;
                        }
                        state.messageRecords[chatId].push(obj);
                    })
                })
                
                state.isLoading = false;
            })
            .addCase(fetchLastMessages.rejected, (state) => {
                state.isLoading = false;
                console.error('Failed to fetch last messages');
            })
            .addCase(fetchMessages.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                const messages = action.payload as IMessage[]
                if(!messages?.length) return;

                const groupedMessages = groupMessagesByDate(messages);
                const chatId = messages[0].chatId;

                if (!state.messageRecords[chatId]) {
                    state.messageRecords[chatId] = groupedMessages;
                    return;
                }

                const groupOldestMessage = groupedMessages.at(-1)?.messages.at(-1)!;
                const groupNewestMessage = groupedMessages[0].messages[0];
                const currentNewestMessage = state.messageRecords[chatId][0].messages[0];
                const currentOldestMessage = state.messageRecords[chatId].at(-1)?.messages.at(-1)!;

                if(groupOldestMessage.createdAt > currentNewestMessage.createdAt){
                    if (state.messageRecords[chatId][0].date.getTime() == groupedMessages[groupedMessages.length - 1].date.getTime()){
                        const last = groupedMessages.pop()!;
                        state.messageRecords[chatId][0].messages.unshift(...last.messages);
                        groupedMessages && state.messageRecords[chatId].unshift(...groupedMessages);
                    } else {
                        state.messageRecords[chatId].unshift(...groupedMessages);
                    }

                    if (state.messageRecords[chatId].length > 10) state.messageRecords[chatId].splice(-2);
                }

                if(groupNewestMessage.createdAt < currentOldestMessage.createdAt){
                    if(state.messageRecords[chatId].at(-1)?.date.getTime() == groupedMessages[0].date.getTime()){
                        const first = groupedMessages.shift()!;
                        state.messageRecords[chatId].at(-1)?.messages.push(...first.messages);
                        groupedMessages && state.messageRecords[chatId].push(...groupedMessages);
                    } else {
                        state.messageRecords[chatId].push(...groupedMessages);
                    }

                    if (state.messageRecords[chatId].length > 10) state.messageRecords[chatId].splice(0, 2);
                }

                state.isLoading = false;
            })
            .addCase(fetchMessages.rejected, (state) => {
                state.isLoading = false;
                console.error('Failed to fetch messages');
            })
            .addCase(fetchLastOneMessages.pending, (state) => {
                state.isLastLoading = true;
            })
            .addCase(fetchLastOneMessages.fulfilled, (state, action) => {
                const messagesArray = action.payload as IMessage[][];
                messagesArray.forEach((messages) => {
                    if (messages.length) {
                        state.lastMessages[messages[0].chatId] = messages[0];
                    }
                });
                state.isLastLoading = false;
            })
            .addCase(fetchLastOneMessages.rejected, (state) => {
                state.isLastLoading = false;
                console.error('Failed to fetch last one message');
            })
            .addCase(fetchUnreadMessagesCount.pending, (state) => {
                state.isUnreadCountPending = true;
            })
            .addCase(fetchUnreadMessagesCount.fulfilled, (state, action: PayloadAction<IUnreadMessageCount[]>) => {
                const unreadMessagesCount = action.payload;
                if (unreadMessagesCount == null) return;
                
                unreadMessagesCount.forEach(unreadCount => state.totalUnreadMessages[unreadCount.chatId] = unreadCount.unreadCount);
                state.isUnreadCountPending = false;
            })
            .addCase(fetchUnreadMessagesCount.rejected, (state) => {
                state.isUnreadCountPending = false;
                console.error('Failed to fetch unread messages count');
            })
    }
})

export const {
    messageSetSelectedMessage, messageSetIsLoading, messagePushMessages, 
    messageShiftMessages, messageUpdateLastMessage, messageDeleteMessage, messagePushToLastReadsQueue,
    messageClearLastReadQueue, messageUpdateMessages, messagesIncUnreadCount, messagesDecUnreadCount} = messageSlice.actions;
export default messageSlice.reducer;

const groupMessagesByDate = (messages: IMessage[]): IMessageDateGroup[] => {
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
};