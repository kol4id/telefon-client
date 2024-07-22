import { FC, useState } from "react";
import { useAppDispatch } from "../../../store/store";
import { SetUserLoading, userSet } from "../../../store/states/user";
import { UserApi } from "../../api/api";


import styles from '../../styles/AuthPane.module.css';
import ErrorBlock from "../AuthPage/ErrorBlock";
import LoginForm from "../AuthPage/LoginForm";
const api = new UserApi;

const RegisterInputForm: FC = () => {
    const dispatch = useAppDispatch()
    const [error, setError] = useState('');

    const call = async (email: string, password: string) =>{
        dispatch(SetUserLoading(true))
        try{
            dispatch(userSet(await api.registerUser(email, password)));
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

export default RegisterInputForm;