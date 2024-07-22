import GetErrorMessage from "../errors/errorHandler";

export const HandleFetching = (callback: () => Promise<any>): [fetching: ()=> Promise<any>, isLoading: boolean, error: {isObtained: boolean, message: string}] => {
    let isLoading: boolean = false;
    let error = {isObtained: false, message: '', code: null};
    let data: any = undefined;

    const fetching = async(): Promise<any> => {
        isLoading = true;
        try {
            data = await callback();
        } catch(error: unknown){
            const errorMessage = await GetErrorMessage(error);
            error = {isObtained: true, message: errorMessage};
        }finally {
            isLoading = false;
        }
        return data;
    }

    return [fetching, isLoading, error];
    // return {fetching, isLoading, error}
}