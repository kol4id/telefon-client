import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserApi } from '../../app/api/api';
import { IUserExternal } from "../../app/global/types/User.dto";
import { fetchWrapper } from "../../app/utils/fetch/fetchWrapper";

interface IExternalUsers{
    users: IUserExternal[]
}

const initialState: IExternalUsers = {
    users: []
}

const api = new UserApi;

export const fetchExternalUsers = createAsyncThunk(
    'messages/fetchUnreadCount',
    async (userIds: string[], {rejectWithValue}) => {
        return await fetchWrapper(async ()=> await api.getMany(userIds), rejectWithValue);
    }
)

const externalUsersSlice = createSlice({
    name: "externalUsers",
    initialState,
    reducers: {
        // addExternalUsers(state, action: PayloadAction<{chat: string, users: IUserExternal[]}>){
           
        // }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchExternalUsers.fulfilled, (state, action: PayloadAction<IUserExternal[]>) => {
                const users = action.payload;
                const oldUsers = state.users ?? [];
                const oldUserIds = new Set(oldUsers.map(user => user.id));
                const uniqueUsers = users.filter(user => !oldUserIds.has(user.id));
                state.users = [...oldUsers, ...uniqueUsers];
            })
    },
})

export const {} = externalUsersSlice.actions;
export default externalUsersSlice.reducer;