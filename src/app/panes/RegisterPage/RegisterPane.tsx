import AuthHeader from "../AuthPage/AuthHeader";
import AuthStatic from "../AuthPage/AuthStatic";

import styles from '../../styles/AuthPane.module.css';
import { useAppDispatch } from "../../../store/store";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { refreshUser } from "../../../store/states/user";
import RegisterInputForm from "./RegisterInputForm";

const RegisterPane = () => {
    const dispatch = useAppDispatch();
    useEffect(()=>{
        dispatch(refreshUser());
    }, [])

    return(
        <article className={styles.main}>
            <AuthHeader/>
            <AuthStatic/>
            <RegisterInputForm/>
            <footer>
                <h2>Already have an account?</h2>
                <NavLink to='/auth' className={styles.custom_link}>authorize</NavLink>
            </footer>
        </article>
    )
}

export default RegisterPane;