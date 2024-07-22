import { FC, useState } from "react";
import styles from "../../styles/ProfileEdit.module.css";
import Cropper from "react-easy-crop";
import {getCroppedImg} from "../../utils/general/cropImage";

import okImg from "../../../assets/send.png";
import { useAppDispatch } from "../../../store/store";
import { updateUserPhoto } from "../../../store/states/user";

interface IProps{
    src: string;
    onCropComplete: ()=>void;
}

const ImageCrop:FC<IProps> = ({src, onCropComplete}) => {
    const dispatch = useAppDispatch()

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [cropedImage, setCropedImage] = useState<File>();

    const cropComplete = (croppedArea: any, croppedAreaPixels: any) => {
        (async () => {
            const img = await getCroppedImg(src, croppedAreaPixels)
            setCropedImage(img);
        })()
    }

    const onSubmit = async() => {
        dispatch(updateUserPhoto(cropedImage!));

        onCropComplete();
        setCrop({ x: 0, y: 0 }) // Makes crop preview update between images.
    }

    return(
        <section className={styles.photo_edit}>
            <h2>Drag to change</h2>
            {
                src && <>
                    <section className={styles.crop}>
                        <Cropper
                            crop={crop}
                            image={src}
                            zoom={zoom}
                            aspect={1 / 1}
                            onCropChange={setCrop}
                            onCropComplete={cropComplete}
                            onZoomChange={setZoom}
                            showGrid={false}
                            cropShape="round"
                            objectFit="cover"

                        />
                    </section>
                    <section className={styles.controls}>
                        <input className={styles.slider}
                            type="range"
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            aria-labelledby="Zoom"
                            onChange={(e) => {
                                setZoom(Number(e.target.value))
                            }}
                        />
                    </section>
                    <section className={styles.submit_button}>
                        <button onClick={onSubmit}>
                            <img src={okImg} className={styles.submit_button_img} />
                        </button>
                    </section>  
                </>
            }
        </section>
    )
}

export default ImageCrop