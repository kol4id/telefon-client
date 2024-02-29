import { createSlice } from "@reduxjs/toolkit";

interface IUserLoading{
    isLoading: boolean;
}

interface IUserState{
    isAuthorized: boolean;
}

const initialState: IUserLoading & IUserState = {
    isLoading: true,
    isAuthorized: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        SetUserLoading(state, action){
            state.isLoading = action.payload;
        },
        SetUserAuthorized(state, action){
            state.isAuthorized = action.payload;
        },
    }
})

export const {SetUserAuthorized, SetUserLoading} = userSlice.actions;
export default userSlice.reducer;
