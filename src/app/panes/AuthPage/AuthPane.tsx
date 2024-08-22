import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import AuthHeader from './AuthHeader';
import AuthStatic from './AuthStatic';
import AuthInputForm from './AuthInputForm';
import { useEffect} from 'react';
import { RootState, useAppDispatch } from '../../../store/store';
import { refreshUser } from '../../../store/states/user';

import styles from '../../styles/AuthPane.module.css';

const AuthPane = () => {
    const dispatch = useAppDispatch();
    const user = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(refreshUser());
    }, [])

    useEffect(()=>{
        console.log(user.isAuthorized)
        if (user.isAuthorized){
            navigate('/a')
        }
    }, [user])  

    return(
        <article className={styles.main}>
            <AuthHeader/>
            <AuthStatic/>
            <AuthInputForm/>
            <footer>
                <h2>No account?</h2>
                <NavLink to='/register' className={styles.custom_link}>register</NavLink>
            </footer>
        </article>
    )
}
export default AuthPane;