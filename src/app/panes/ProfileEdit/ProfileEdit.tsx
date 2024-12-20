import { useCallback, useEffect, useState } from "react";

import styles from "../../styles/ProfileEdit.module.css";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store/store";
import { getUser, updateUser, updateUserPhoto } from "../../../store/states/user";
import ProfileInputs from "./ProfileInputs";
import PhotoChange from "./PhotoChange";

const ProfileEdit = () => {
    const dispatch = useAppDispatch();

    const user = useSelector((state: RootState) => state.user);
    const [userData, setUserData] = useState({firstName: user.userData.firstName, lastName: user.userData.lastName, userName: user.userData.userName})
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        dispatch(getUser());
    }, [])

    const _setUserData = useCallback((fName?: string, lName?: string, uName?: string) =>{
        // console.log(userData)
        setUserData({
            firstName: fName ?? userData.firstName, 
            lastName: lName ?? userData.lastName, 
            userName: uName ?? userData.userName,
        });
    }, [userData])

    const validCheck = (val: boolean) =>{
        setIsValid(val);
    }

    const onSubmit = () =>{
        if (!isValid) return
        dispatch(updateUser(userData));
    }

    return(
        <main className={styles.main}>
            <PhotoChange
                handleCropped={(file: File) => {dispatch(updateUserPhoto(file))}}
                image={user.userData.photoUrl}
                isImageLoading={user.isUserDataLoading}
            />
            <form
                onSubmit={e => {
                    e.preventDefault();
                    e.stopPropagation(); 
                    onSubmit()
                }}
            >
                <ProfileInputs isLoading={false} userData={userData} isValid={isValid} setUserData={_setUserData} validCheck={validCheck} />
                <footer style={{marginBottom: '30px'}}>
                    <button className={styles.custom_button} type="submit" 
                        onSubmit={e=>{
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                    >next</button>
                </footer>
            </form>
        </main>
    )
}

export default ProfileEdit