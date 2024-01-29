import { createSlice } from "@reduxjs/toolkit";

interface ICursorStyle{
    value: string,
}

const initialState: ICursorStyle = {
    value: 'default',
}

const styleSlice = createSlice({
    name: 'cursorStyle',
    initialState,
    reducers:{
        SetCursorStyle(state, action){
            if (action.payload){
                state.value = 'ew-resize';
            } else state.value = 'default';
        }
    }
})

export const {SetCursorStyle} = styleSlice.actions;
export default styleSlice.reducer;