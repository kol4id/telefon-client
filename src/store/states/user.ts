import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HandleFetching } from "../../app/utils/fetch/HandleFetching";
import RefreshUser from "../../app/api/refreshUser";

interface IUserLoading{
    isLoading: boolean;
}

interface IUserState{
    isAuthorized: boolean;
    userId: string;
}

const initialState: IUserLoading & IUserState = {
    isLoading: true,
    isAuthorized: false,
    userId: '',
}

const [RefreshUserCall,, refreshError] = HandleFetching(async()=>{
    return(await RefreshUser());
})

export const fetchUserRefresh = createAsyncThunk(
    'user/refresh',
    async function(_, {rejectWithValue}){
        const data = await RefreshUserCall();
        if(refreshError.isObtained){
            return rejectWithValue(refreshError.message);
        }
        return data;
    }
)

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
    },
    extraReducers: (builder)=>{
        builder
            .addCase(fetchUserRefresh.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(fetchUserRefresh.fulfilled, (state, action)=>{
                if(action.payload){
                    state.isAuthorized = true;
                    state.userId = action.payload;
                }
                state.isLoading = false;
            })
            .addCase(fetchUserRefresh.rejected, (state)=>{
                state.isLoading = false;
            })

    },
})

export const {SetUserAuthorized, SetUserLoading} = userSlice.actions;
export default userSlice.reducer;
