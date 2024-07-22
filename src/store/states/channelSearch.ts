import { createSlice } from "@reduxjs/toolkit";
import { IChannelSearch } from "../../app/global/types/Channel.dto";

const initialState: IChannelSearch = {
    value: '',
}

const searchSlice = createSlice({
    name: 'channelSearch',
    initialState,
    reducers: {
        SetSearchValue: (state, action) =>{
            state.value = action.payload;
        }
    }
})

export const {SetSearchValue} = searchSlice.actions;
export default searchSlice.reducer;