import { createSlice } from "@reduxjs/toolkit";
import { IMessage } from "../../app/utils/interfaces/Message.dto";
import { inPlaceSort } from "fast-sort";


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
    }
})

export const {SetMessages, SetMessageSelected, SetDataLoading, PushMessage, DeleteMessage} = messageSlice.actions;
export default messageSlice.reducer;