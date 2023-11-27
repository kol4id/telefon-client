import { createSlice } from "@reduxjs/toolkit";

interface ChannelSearch {
    value: string;
}

const initialState: ChannelSearch = {
    value: '',
}

const searchSlice = createSlice({
    name: 'channelSearch',
    initialState,
    reducers: {
        setSearchValue: (state, action) =>{
            state.value = action.payload;
        }
    }
})

export const {setSearchValue} = searchSlice.actions;
export default searchSlice.reducer;