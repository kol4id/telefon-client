import { HandleFetching } from "./HandleFetching";

export const fetchWrapper = async (fetchFn: () => Promise<any>, rejectWithValue: any) => {
    const [data, , fetchError] = await HandleFetching(fetchFn);
    if (fetchError.isObtained) {
        return rejectWithValue(fetchError.message);
    }
    return await data;
};