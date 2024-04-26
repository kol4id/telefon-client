import {useState} from "react";
import GetErrorMessage from "../errors/errorHandler";

export const useFetching = (callback: () => Promise<void>): [fetching: ()=> Promise<void>, isLoading: boolean, error: {isObtained: boolean, message: string}] => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState({isObtained: false, message: ''});

    const fetching = async(): Promise<any> => {
        let data = undefined;
        setIsLoading(true)
        try {
            data = await callback();
        } catch(error: unknown){
            const errorMessage = await GetErrorMessage(error);
            setError({isObtained: true, message: errorMessage});
        }finally {
            setIsLoading(false);
        }
        return data;
    }

    return [fetching, isLoading, error];
    // return {fetching, isLoading, error}
}