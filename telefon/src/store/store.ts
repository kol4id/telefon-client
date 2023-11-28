import { configureStore } from "@reduxjs/toolkit";
import channelSearch from "./states/channelSearch";
import channels from "./states/channels";

export const store = configureStore({
    reducer:{
        channelSearch: channelSearch,
        channelsList: channels,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;