import { configureStore } from "@reduxjs/toolkit";
import channelSearch from "./states/channelSearch";
import channels from "./states/channels";
import width from "./states/width";
import cursorStyle from "./states/cursorStyle";
import messages from "./states/messages";
import messageInput from "./states/messageInput";
import user from "./states/user";
import { useDispatch } from "react-redux";
import socket from "./states/socket";
import socketMiddleware from "./middleware/socketMiddleware";
import appEvents from "./states/appEvents";
import externalUsers from './states/externalUsers'

export const store = configureStore({
    reducer:{
        channelSearch: channelSearch,
        channelsList: channels,
        width: width,
        cursorStyle: cursorStyle,
        messages: messages,
        messageInput: messageInput,
        user: user,
        socket: socket,
        appEvents: appEvents, 
        externalUsers: externalUsers,
    },
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware().concat([socketMiddleware]);
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;