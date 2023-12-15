import {useState} from "react";
import GetErrorMessage from "../errors/errorHandler";

interface IReturnValue {
    fetching: ()=> Promise<void>,
    isLoading: boolean,
}

export const useFethcing = (callback: () => Promise<void>): IReturnValue => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetching = async() => {
        try {
            setIsLoading(true)
            await callback();
        } catch(error: unknown){
            await GetErrorMessage(error);
        }finally {
            setIsLoading(false);
        }
    }

    return {fetching, isLoading}
}