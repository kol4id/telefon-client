import Modal from "../../components/Modal";
import PhotoEdit from "./PhotoEdit";
import ImageCrop from "./ImageCrop";
import { FC, useState } from "react";

interface IProps{
    handleCropped?: (a: File) => void,
    image: string,
    isImageLoading?: boolean
}

const PhotoChange: FC<IProps> = ({handleCropped, image, isImageLoading = false}) => { 
    const acceptedTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'];
    const [isOpen, setIsOpen] = useState(false);
    const [src, setSrc] = useState('');

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
        event.target.value = '';
    };

    return(
        <>
            <PhotoEdit photoUrl={image} isLoading={isImageLoading}/>
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
                children={<ImageCrop src={src} onCropComplete={() => setIsOpen(false)} handleCropped={handleCropped}/>}
                onClose={()=>setIsOpen(false)}
                overlayClickClose={true}
            />
        </>
    )
}
export default PhotoChange;