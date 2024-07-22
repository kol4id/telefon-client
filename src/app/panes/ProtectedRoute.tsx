import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import { FC, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { refreshUser } from "../../store/states/user";

interface IProps {
    children: React.ReactNode;
}

const ProtectedRoute:FC<IProps> = ({children}) => {
    const dispatch = useAppDispatch();
    const user = useSelector((state: RootState) => state.user)

    useEffect(()=>{
        dispatch(refreshUser())
    }, [])

    return(
        user.isLoading
        ? <div></div>
        : user.isAuthorized ? children : <Navigate to="/auth"/>
    )
};

export default ProtectedRoute