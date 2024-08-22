import { FC, useState } from "react";
import LoginForm from "./LoginForm";
import styles from '../../styles/AuthPane.module.css';
import { UserApi } from "../../api/api";
import ErrorBlock from "./ErrorBlock";
import { useAppDispatch } from "../../../store/store";
import { SetUserLoading, userSet } from "../../../store/states/user";

const api = new UserApi();

const AuthInputForm: FC = () => {
    const dispatch = useAppDispatch()
    const [error, setError] = useState('');

    /*
    NOTE(@kol4id): error message can be in 1 of 2 forms
    plain string or array of strings
    from array we only need first message
    */
    const call = async (email: string, password: string) =>{
        dispatch(SetUserLoading(true))
        try{
            dispatch(userSet(await api.authUser(email, password)));
        } catch(err: any){
            const errorMsgs = err.response.data.message;
            if (Array.isArray(errorMsgs)){
                setError(errorMsgs?.[0]);
            } else {
                setError(errorMsgs);
            }
        }
        dispatch(SetUserLoading(false))
    }

    return(
        <section className={styles.auth_form}>
            <LoginForm callback={call}/>
            {error && <ErrorBlock message={error}/>}
        </section>
    )
}

export default AuthInputForm;