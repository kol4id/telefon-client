import { HandleFetching } from "./HandleFetching";

export const fetchWrapper = async (fetchFn: () => Promise<any>, rejectWithValue: any) => {
    const [fetchCall, , fetchError] = HandleFetching(fetchFn);
    const data = await fetchCall();
    if (fetchError.isObtained) {
        return rejectWithValue(fetchError.message);
    }
    return data;
};