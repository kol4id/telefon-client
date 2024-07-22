import { useEffect, useState } from "react";
import { IPosition } from "../../global/types/MousePos";


const useModal = (): [isOpen: boolean, position: IPosition, content: React.ReactNode, open: (content: React.ReactNode, position?: IPosition) => void , close: () => void] => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<React.ReactNode>(null);
    const [modalPosition, setModalPosition] = useState<IPosition>({x: 0, y: 0})

    const openModal = (content: React.ReactNode, position?: IPosition): void =>{
        setModalContent(content);
        setIsModalOpen(true);
        setModalPosition(position !== undefined ? position : {x: 0, y: 0})
    }

    const closeModal = () =>{
        setIsModalOpen(false)
    }

    const PreventWheel = (event: WheelEvent) => {
        if (isModalOpen){
            event.preventDefault();
            event.stopPropagation();
        }
    }

    useEffect(()=>{
        document.addEventListener('wheel', PreventWheel, {passive: false})
        return() =>{
            document.removeEventListener('wheel', PreventWheel)
        }
    }, [isModalOpen])


    return [isModalOpen, modalPosition, modalContent, openModal, closeModal]
}

export default useModal