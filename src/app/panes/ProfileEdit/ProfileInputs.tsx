import { FC, useCallback, useState } from "react";
import styles from "../../styles/ProfileEdit.module.css";
import CustomInput from "../../components/customInput/CustomInput";
import { UserApi } from "../../api/api";
import useDebounce from "../../utils/general/debounce";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

interface IProps{
    setUserData: (fName?: string, lName?: string, uName?: string)=>void,
    userData: {firstName?: string, lastName?: string, userName?: string},
    isLoading: boolean,
    isValid: boolean,
    validCheck: (val: boolean) => void
}

const userApi = new UserApi;

const ProfileInputs: FC<IProps> = ({isLoading, userData, setUserData, validCheck, isValid}) => {

    const user = useSelector((state: RootState) => state.user.userData)
    const [isLoad, setIsLoad] = useState(false);
    
    const debouncedCheck = useCallback(async (val: string)=>{      
        const valid = await userApi.isUsernameExist(val ?? '');
        validCheck(!valid);
        setIsLoad(false);
    }, [userData.userName])

    const [debouncedFetchData, cancelDebounce] = useDebounce(debouncedCheck, 200);

    const setFName = (val: string) => {
        setUserData(val)
    }

    const setLName = (val: string) => {
        setUserData(undefined, val)
    }

    const setUName = (val: string) => {
        cancelDebounce();
        setUserData(undefined, undefined, val)
        if (user.userName == val || val == '') {
            validCheck(true);
            return
        }
        validCheck(false);
        setIsLoad(true);
        debouncedFetchData(val);
    }

    return(
        <section className={styles.inputs}>
            {
                isLoading || 
                <section style={{display: 'flex', flexDirection: 'column', gap: '15px', paddingBottom: '40px'}}>
                    <CustomInput type="text" label="First name" initValue={userData.firstName} callback={setFName}/>
                    <CustomInput type="text" label="Last name" initValue={userData.lastName} callback={setLName}/>
                    <CustomInput 
                        type="text" 
                        label={isLoad || isValid ? "Username" : "Username already exist"} 
                        initValue={userData.userName} 
                        event={isLoad || isValid ? undefined : 'error'} 
                        callback={setUName}
                    />
                </section>
            }
        </section>
    )
}

export default ProfileInputs