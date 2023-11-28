import { createSlice } from "@reduxjs/toolkit";
import { IChannelSearch } from "../../app/utils/interfaces/IChannelSearch";


const initialState: IChannelSearch = {
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