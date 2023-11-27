import { configureStore } from "@reduxjs/toolkit";
import channelSearch from "./states/channelSearch";

export const store = configureStore({
    reducer:{
        channelSearch: channelSearch,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;