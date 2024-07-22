import { FC, useState } from "react";

import styles from '../../styles/AuthPane.module.css';
import CustomInput from "../../components/customInput/CustomInput";

interface IProps{
    callback: (email: string, password: string)=>Promise<void>
}

const LoginForm: FC<IProps> = (props) =>{
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const GetEmail = (value: string) => {
        setEmail(value);
    }

    const GetPassword = (value: string) => {
        setPassword(value);
    }

    return(
        <form
            onSubmit={e => {
                e.preventDefault(); 
                e.stopPropagation();
                
            }}
        >
            <CustomInput type="email" label="login" callback={GetEmail}/>
            <CustomInput type="password" label="password" callback={GetPassword}/>
            
            <button type={'submit'} className={styles.custom_button}
                onClick={() => props.callback(email, password)}
            >
                next
            </button>
        </form>
    )
}

export default LoginForm