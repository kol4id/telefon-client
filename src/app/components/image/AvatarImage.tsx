import { FC, useState } from "react"
import styles from '../../styles/MiddlePaneHead.module.css';
import Modal from "../Modal";
import AvatarModal from "../modals/avatar/AvatarModal";
interface IProps{
    img: string | undefined
}

const AvatarImage: FC<IProps> = ({img}) =>{
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () =>{
        setIsOpen(true);
    }

    if (!img) return;

    return(
        <>  
            <img className = {styles.img} src={img} onClick={handleClick}/>

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                children={<AvatarModal img={img} onClose={() => setIsOpen(false)}/>}
            />
        </>
    )
}
export default AvatarImage