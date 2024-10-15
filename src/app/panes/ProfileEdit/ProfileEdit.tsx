import { useCallback, useEffect, useState } from "react";

import styles from "../../styles/ProfileEdit.module.css";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store/store";
import Modal from "../../components/Modal";
import ImageCrop from "./ImageCrop";
import { getUser, updateUser, userSet } from "../../../store/states/user";
import ProfileInputs from "./ProfileInputs";
import PhotoEdit from "./PhotoEdit";

const ProfileEdit = () => {
    const dispatch = useAppDispatch();

    const acceptedTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'];
    const user = useSelector((state: RootState) => state.user.userData);
    const [userData, setUserData] = useState({firstName: user.firstName, lastName: user.lastName, userName: user.userName})
    const [isOpen, setIsOpen] = useState(false);
    const [src, setSrc] = useState('');
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
        dispatch(userSet(userData));
        dispatch(updateUser());
    }

    const onModalClose = () =>{
        setSrc('')
        setIsOpen(false);
    }
    
    const handleFileChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        if (!acceptedTypes.includes(file.type)) return;
            
        const reader = new FileReader()
        reader.addEventListener('load', () =>
            setSrc(reader.result?.toString() || ''),
        )
        reader.readAsDataURL(file)
        setIsOpen(true)
    };

    return(
        <main className={styles.main}>
            <PhotoEdit/>
            <input
                type="file"
                accept=".jpg, .jpeg, .png, .webp"
                id="file-upload"
                style={{ display: 'none' }}
                draggable
                onChange={handleFileChange}
            />
            <Modal 
                isOpen={isOpen}
                children={<ImageCrop src={src} onCropComplete={() => setIsOpen(false)}/>}
                onClose={()=>onModalClose()}
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