import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMessage, IMessageCreateDto } from "../../app/global/types/Message.dto";
import { IChannelCreateData } from "app/components/leftPaneCreateChannel/CreateChannelNameBody";
import { creationType } from "./appEvents";

export interface ISocketState {
    isConnected: boolean;
};

export interface ICreateChannel extends IChannelCreateData{
    channelType: creationType
    imageBuffer: ArrayBuffer | null;
    usersToAdd: string[];
}

const initialState: ISocketState = {
    isConnected: false
};

const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        socketInit(){
            return
        },
        socketSendRead(_, action: PayloadAction<IMessage[]>){
            console.log(action.payload);
            return
        },
        socketSendLastRead(){
            return
        },
        socketCreateMessage(_, action: PayloadAction<IMessageCreateDto>){
            console.log(action.payload);
            return;
        },
        socketDeleteMessage(_, action: PayloadAction<string>){
            console.log(action.payload);
            return;
        },
        socketSetOnlineStatus(_, action: PayloadAction<boolean>){
            console.log(action.payload);
            return;
        },
        socketCreateChannel(_, action: PayloadAction<ICreateChannel>){
            console.log(action.payload);
            return;
        },
        socketLeaveChannel(_, action: PayloadAction<string>){
            console.log(action)
            return;
        }
    }

})

export const {socketInit, socketSendRead, socketSendLastRead, socketCreateMessage, socketDeleteMessage, socketSetOnlineStatus, socketCreateChannel, socketLeaveChannel} = socketSlice.actions;
export default socketSlice.reducer;