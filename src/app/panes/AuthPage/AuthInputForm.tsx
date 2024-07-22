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

    const call = async (email: string, password: string) =>{
        dispatch(SetUserLoading(true))
        try{
            dispatch(userSet(await api.authUser(email, password)));
        } catch(err: any){
            setError(err.response.data.message)
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