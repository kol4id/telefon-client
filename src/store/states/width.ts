import { createSlice } from "@reduxjs/toolkit";

const SEARCH_RESIZE_OFFSET: number = 110;
const CHANNEL_RESIZE_OFFSET: number = 27;
const WORDWRAP_RESIZE_OFFSET: number = 100;

interface Width {
    leftPaneWidth: number;
    searchWidth: number;
    channelWidth: number;
    channelWrapWidth: number;
    isNarrow: boolean;
    middleDisplayed: boolean;
    leftDisplayed: boolean;
};

const initialState: Width = {
    leftPaneWidth: 300,
    searchWidth: 190,
    channelWidth: 273,
    channelWrapWidth: 200,
    isNarrow: false,
    middleDisplayed: true,
    leftDisplayed: true,
}

const widthSlice = createSlice({
    name: 'width',
    initialState,
    reducers: {
        setWidth(state, action){
            state.leftPaneWidth = action.payload;
        },
        setIsNarrow(state, action){
           state.isNarrow = action.payload;
        },
        setLeftDisplayed(state, action){
            state.leftDisplayed = action.payload;
        },
        setMiddleDisplayed(state, action){
            state.middleDisplayed = action.payload;
        },
        Resize(state, action){
            state.leftPaneWidth = action.payload;
            state.searchWidth = action.payload - SEARCH_RESIZE_OFFSET;
            state.channelWidth = action.payload - CHANNEL_RESIZE_OFFSET;
            state.channelWrapWidth = action.payload - WORDWRAP_RESIZE_OFFSET;
        }
    }
})

export const {Resize, setWidth, setIsNarrow, setLeftDisplayed, setMiddleDisplayed} = widthSlice.actions;
export default widthSlice.reducer;