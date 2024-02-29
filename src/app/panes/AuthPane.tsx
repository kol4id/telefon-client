
import styles from '../styles/AuthPane.module.css'
import image from '../../assets/logo.svg'
import AuthInputField from '../components/AuthInputField';
import { useState } from 'react';
import AuthUser from '../api/authUser';
import { useDispatch } from 'react-redux';
import { SetUserAuthorized, SetUserLoading } from '../../store/states/user';
// import { RootState } from '../../store/store';
import { useFetching } from '../utils/hooks/useFetching';

const AuthPane = () => {

    const dispatch = useDispatch();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [UserAuth, authIsPending] = useFetching(async()=>{
        await AuthUser(email, password);
        //if ^ code failed code below v will not be executed
        dispatch(SetUserAuthorized(true));
    });

    const UserAuthExecutor = async() => {
        await UserAuth();
        dispatch(SetUserLoading(false));
    }


    // const user = useSelector((state: RootState) => state.user);


    const GetEmail = (value: string) => {
        setEmail(value);
    }

    const GetPassword = (value: string) => {
        setPassword(value);
    }

    return(
        <div className={styles.main}>
            <div className={styles.img_container}>
                <img src={image}/>
            </div>
            <div className={styles.static_text_container}>
                <div className={styles.app_name_static}>
                    Telefon
                </div>
                <div className={styles.auth_description}>
                    Please enter your email and password.
                </div> 
            </div>
            <div className={styles.auth_form}>
                <div>
                    <AuthInputField type='email' label='Email' hide={false} SetSearchValue={GetEmail}/>
                </div>
                <div>
                    <AuthInputField type='password' label='Password' hide={true} SetSearchValue={GetPassword}/>
                </div>
                
                {
                    authIsPending
                    ?   <div>LOADING</div>
                    :   <button className={styles.custom_button}
                            onClick={() => UserAuthExecutor()}
                        >
                            next
                        </button>
                }
            </div>
        </div>
    )
}
export default AuthPane;