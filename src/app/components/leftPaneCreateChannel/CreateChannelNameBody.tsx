import { useContext, useState } from 'react'
import styles from '../../styles/LeftPaneCreateChannelName.module.css'
import CustomInput from '../customInput/CustomInput'
import PhotoChange from '../../panes/ProfileEdit/PhotoChange'


import blankChannel from '../../../assets/blankChannel.webp'
import { RootState, useAppDispatch } from 'store/store'
import { socketCreateChannel } from 'store/states/socket'
import { convertFilesToArrayBuffer } from '../../utils/fileToBuffer'
import { CreateChannelContext } from './LeftPaneCreateChannel'
import { useSelector } from 'react-redux'
new Image().src = blankChannel

export interface IChannelCreateData {
    title: string,
    name: string,
    description: string
}

const CreateChannelNameBody = () =>{
    const dispatch = useAppDispatch();
    const [channelData, setChannelData] = useState<IChannelCreateData>({title: '', name: '', description: ''})

    const setChannelTitle = (newTitle: string) => setChannelData((prev) => ({...prev, title: newTitle}));
    const setChannelName = (newValue: string) => setChannelData((prev) => ({...prev, name: newValue}));
    const setChannelDescription = (newDescription: string) => setChannelData((prev) => ({...prev, description: newDescription}));

    const createChannel = useContext(CreateChannelContext);

    const channelType = useSelector((state: RootState) => state.appEvents.channelCreationType)
    const [imageSrc, setImageSrc] = useState(blankChannel);
    const [file, setFile] = useState<File>();

    const handleImageCrop = (file: File) =>{
        if (file){
            setFile(file);
            const url = URL.createObjectURL(file);
            setImageSrc(url);
        }
    }

    const handleClick = async() =>{
        const imageBuffer = file ? (await convertFilesToArrayBuffer([file]))[0] : null;
        const selectedChannels = Array.from(createChannel.selectedChannels);

        dispatch(socketCreateChannel({...channelData, channelType, imageBuffer, usersToAdd: selectedChannels}));
    }

    return(
        <>
            <body className={styles.body}>
                <section className={styles.image_change_container}>
                    <PhotoChange
                        handleCropped={handleImageCrop}
                        image={imageSrc}
                    />
                </section>
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        handleClick();
                    }}>
                    <section className={styles.custom_inputs}>
                        <CustomInput callback={setChannelTitle} type='text' label='Channel title' required={true}/>
                        <CustomInput callback={setChannelName} type='text' label='Channel name' required={true}/>
                        <CustomInput callback={setChannelDescription} type='text' label='Description'/>
                    </section>
                    {
                        (channelData.name && channelData.title) && 
                        <button className={styles.create_button} type='submit'/>
                    }
                </form>                
                
            </body>
        </>
    )
}
export default CreateChannelNameBody