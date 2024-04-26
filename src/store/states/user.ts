import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HandleFetching } from "../../app/utils/fetch/HandleFetching";
import RefreshUser from "../../app/api/refreshUser";
import { IUser } from "../../app/utils/interfaces/User.dto";
import { FetchUser } from "../../app/api/userApi";

interface IUserLoading{
    isLoading: boolean;
    isUserDataLoading: boolean;
}

interface IUserState{
    isAuthorized: boolean;
    userData: IUser;
}

interface IUpdateLastRead{
    channelId: string,
    date: Date,
}

const initialState: IUserLoading & IUserState = {
    isLoading: true,
    isUserDataLoading: true,
    isAuthorized: false,
    userData: {
        id: '',
        name: '',
        email: '',
        photoUrl: '',
        subscriptions: [],
        favorite: [],
        blacklist: [],
        lastReads: {},
    }
}

const [FetchUserCall,, fetchError] = HandleFetching(async()=>{
    return(await FetchUser());
})

const [RefreshUserCall,, refreshError] = HandleFetching(async()=>{
    return(await RefreshUser());
})

export const fetchUser = createAsyncThunk(
    'user/fetch',
    async function(_, {rejectWithValue}){
        const data = await FetchUserCall();
        if(fetchError.isObtained){
            return rejectWithValue(fetchError.message);
        }
        return data;
    }
)

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
        SetUserLastRead(state, action: {payload: IUpdateLastRead}){
            state.userData.lastReads[action.payload.channelId] = action.payload.date;
        }
    },
    extraReducers: (builder)=>{
        builder
            .addCase(fetchUserRefresh.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(fetchUserRefresh.fulfilled, (state, action)=>{
                if(action.payload){
                    state.isAuthorized = true;
                    state.userData.id = action.payload;
                }
                state.isLoading = false;
            })
            .addCase(fetchUserRefresh.rejected, (state)=>{
                state.isLoading = false;
            })
            .addCase(fetchUser.pending, (state)=>{
                state.isUserDataLoading = true;
            })
            .addCase(fetchUser.fulfilled, (state, action)=>{
                if(action.payload){
                    state.userData = action.payload;
                }
                state.isUserDataLoading = false;
            })
            .addCase(fetchUser.rejected, (state)=>{
                state.isUserDataLoading = false;
            })
    },
})

export const {SetUserAuthorized, SetUserLoading} = userSlice.actions;
export default userSlice.reducer;
