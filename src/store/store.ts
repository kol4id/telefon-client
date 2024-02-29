import { configureStore } from "@reduxjs/toolkit";
import channelSearch from "./states/channelSearch";
import channels from "./states/channels";
import width from "./states/width";
import cursorStyle from "./states/cursorStyle";
import messages from "./states/messages";
import messageInput from "./states/messageInput";
import user from "./states/user";
import portalKey from "./states/portalKey";

export const store = configureStore({
    reducer:{
        channelSearch: channelSearch,
        channelsList: channels,
        width: width,
        cursorStyle: cursorStyle,
        messages: messages,
        messageInput: messageInput,
        user: user,
        portalKey: portalKey,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;