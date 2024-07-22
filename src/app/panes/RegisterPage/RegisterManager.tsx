import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { RootState } from "../../../store/store";


const RegisterManager = () => {
    const user = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();

    useEffect(()=>{
        if (user.userData.firstName) {
            navigate('a');
            return;
        }
        
        if (user.isAuthorized){
            navigate('data')
        }
    }, [user])  

    return(
        <>
            <Outlet/>
        </>
    )
}

export default RegisterManager;