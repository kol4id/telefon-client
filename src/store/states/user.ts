import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../app/global/types/User.dto";
import { updateUserAPI } from "../../app/api/userApi";
import { store } from "../store";
import { fetchWrapper } from "../../app/utils/fetch/fetchWrapper";
import { UserApi } from "../../app/api/api";

let intervalId: ReturnType<typeof setTimeout> | undefined;

interface IUserLoading{
    isLoading: boolean;
    isUserDataLoading: boolean;
}

interface IUserState{
    isAuthorized: boolean;
    userData: IUser;
}

interface IUpdateLastRead{
    chatId: string,
    date: Date,
}

interface ILogin{
    email: string,
    password: string
}

const initialState: IUserLoading & IUserState = {
    isLoading: true,
    isUserDataLoading: true,
    isAuthorized: false,
    userData: {
        id: '',
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
        photoUrl: '',
        subscriptions: ['undefined'],
        favorite: ['undefined'],
        blacklist: ['undefined'],
        lastReads: {'undefined': new Date(1)},
        // dmChats: {'undefined': 'undefined'},
        personalChannel: ''
    }
}

const user = new UserApi();

const debounceUpdateUser = async(data: IUser)=> {
    if(intervalId) clearTimeout(intervalId);

    intervalId = setTimeout(()=>{
        updateUserAPI(data);
    }, 550)
}

export const updateUser = createAsyncThunk(
    'user/update',
    async function(_, {rejectWithValue}){
        const userData = store.getState().user.userData;
        return fetchWrapper(() => debounceUpdateUser(userData), rejectWithValue);
    }
)

export const updateUserPhoto = createAsyncThunk(
    'user/updatePhoto',
    async function (file: File, {rejectWithValue}){
        return fetchWrapper(() => user.updatePhoto(file), rejectWithValue);
    }
)

export const refreshUser = createAsyncThunk(
    'user/refresh',
    async function(_, {rejectWithValue}){
        return fetchWrapper(() => user.refreshUser(), rejectWithValue);
    }
)

export const authUser = createAsyncThunk(
    'user/auth',
    async function (args: ILogin, {rejectWithValue}) {
        return fetchWrapper(() => user.authUser(args.email, args.password), rejectWithValue)
    }
)

export const registerUser = createAsyncThunk(
    'user/register',
    async function (args: ILogin, {rejectWithValue}) {
        return fetchWrapper(() => user.registerUser(args.email, args.password), rejectWithValue)
    }
)

export const getUser = createAsyncThunk(
    'user/get',
    async function (_, {rejectWithValue}) {
        return fetchWrapper(() => user.get(), rejectWithValue)
    }
)

export const logoutUser = createAsyncThunk(
    'user/logout',
    async function (_, {rejectWithValue}){
        return fetchWrapper(() => user.logout(), rejectWithValue);
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userSet(state, action: PayloadAction<Partial<IUser>>){
            console.log(action)
            state.userData = { ...state.userData, ...action.payload };
            console.log()
            // state.userData = action.payload;
            state.isAuthorized = true;
        },
        SetUserLoading(state, action){
            state.isLoading = action.payload;
        },
        SetUserAuthorized(state, action){
            state.isAuthorized = action.payload;
        },
        SetUserLastRead(state, action: {payload: IUpdateLastRead}){
            if(!state.userData.lastReads){
                state.userData.lastReads = {};
                state.userData.lastReads[action.payload.chatId] = action.payload.date;
                return;
            }
            if (action.payload.date <= state.userData.lastReads[action.payload.chatId]) return;
            state.userData.lastReads[action.payload.chatId] = action.payload.date;
        },
        userSetSubscriptions(state, action: PayloadAction<string[]>){
            console.log(action.payload);
            return state;
        }
    },
    extraReducers: (builder)=>{
        builder
            .addCase(refreshUser.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(refreshUser.fulfilled, (state, action)=>{
                if(action.payload){
                    state.isAuthorized = true;
                    state.userData = action.payload;
                }
                state.isLoading = false;
            })
            .addCase(refreshUser.rejected, (state)=>{
                state.isLoading = false;
            })
            .addCase(updateUser.pending , (state)=>{
                state.isUserDataLoading = true;
            })
            .addCase(updateUser.fulfilled, (state, action)=>{
                if(action.payload){
                    state.userData = action.payload;
                }
                state.isUserDataLoading = false;
            })
            .addCase(updateUser.rejected, (state)=>{
                state.isUserDataLoading = false;
            })
            .addCase(getUser.pending, (state)=>{
                state.isUserDataLoading = true;
            })
            .addCase(getUser.fulfilled, (state, action)=>{
                if(action.payload){
                    state.userData = action.payload;
                }
                state.isUserDataLoading = false;
            })
            .addCase(getUser.rejected, (state)=>{
                state.isUserDataLoading = false;
            })
            .addCase(updateUserPhoto.pending, (state)=>{
                state.isUserDataLoading = true;
            })
            .addCase(updateUserPhoto.fulfilled, (state, action)=>{
                if(action.payload){
                    state.userData = action.payload;
                }
                state.isUserDataLoading = false;
            })
            .addCase(updateUserPhoto.rejected, (state)=>{
                state.isUserDataLoading = false;
            })
            .addCase(logoutUser.fulfilled, ()=>{
                window.location.reload();
            })            
    },
})

export const {userSet, SetUserAuthorized, SetUserLoading, SetUserLastRead, userSetSubscriptions} = userSlice.actions;
export default userSlice.reducer;
