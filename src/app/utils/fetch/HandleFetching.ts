import GetErrorMessage from "../errors/errorHandler";

export const HandleFetching = async(callback: () => Promise<any>): Promise<[data: any, isLoading: boolean, error: {isObtained: boolean, message: string}]> => {
    let isLoading: boolean = false;
    let error = {isObtained: false, message: '', code: null};
    let data: any = undefined;

    isLoading = true;
    try {
        data = await callback();
    } catch(error: unknown){
        const errorMessage = await GetErrorMessage(error);
        error = {isObtained: true, message: errorMessage};
    }finally {
        isLoading = false;
    }

    return [data, isLoading, error];
}


