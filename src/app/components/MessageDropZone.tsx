import styles from '../styles/MessageDropZone.module.css';
import { useEffect, useRef, useState } from 'react';

import file_colored from '../../assets/file_colored.png';
import file from '../../assets/file.png';
import Modal from './Modal';
import MessageDropModal from '../components/messageDropModal/MessageDropModal';

const MessageDropZone = () =>{
    const [dragging, setDragging] = useState<boolean>(false);
    const [draggingInner, setDraggingInner] = useState<boolean>(false);
    // const [error, setError] = useState<string | null>(null);
    const [files, setFiles] = useState<File[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const dragCounter = useRef(0);
    const dragInnerCounter = useRef(0);

    const handleGlobalDragEnter = () => {
        if(isOpen) return
        dragCounter.current += 1;
        setDragging(true);
    };

    const handleGlobalDragLeave = () => {
        if(isOpen) return
        dragCounter.current -= 1;
        if (dragCounter.current === 0) {
            setDragging(false);
        }
    };

    const handleGlobalDrop = (event: DragEvent) => {
        if(isOpen) return
        event.preventDefault();
        setDragging(false);
        setDraggingInner(false)
        dragCounter.current = 0
        dragInnerCounter.current = 0
        const droppedFiles = Array.from(event.dataTransfer?.files || []).filter((file) =>
            file.type.startsWith('image/')
        );

        if (droppedFiles.length + files.length > 10) {
            // setError('Нельзя загружать более 10 файлов.');
            return;
        }

        // setError(null);
        setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    };

    const handleGlobalDragOver = (event: DragEvent) => {
        if(isOpen) return
        event.preventDefault();
        const dropZone = document.getElementById('drop-zone');
        if (event.dataTransfer){
            const rect = dropZone?.getBoundingClientRect();
            if (
                event.clientX >= rect!.left &&
                event.clientX <= rect!.right &&
                event.clientY >= rect!.top &&
                event.clientY <= rect!.bottom){
                event.dataTransfer.dropEffect = 'copy';
                return
            } 
            event.dataTransfer.dropEffect = 'none'; // Устанавливаем эффект дропа на "none"
        }
    };

    const handleDragEnter = () => {
        dragInnerCounter.current += 1;
        setDraggingInner(true);
    }

    const handleDragLeave = () => {
        dragInnerCounter.current -= 1;
        if (dragInnerCounter.current === 0) {
            setDraggingInner(false);
        }
    }

    const handleDragOver = (event: React.DragEvent) => {
        if (event.dataTransfer){
            event.dataTransfer.dropEffect = 'copy'; // Устанавливаем эффект дропа на "none"
        }
    }

    const closeModal = () => {
        setFiles([]);
        setIsOpen(false);
    }

    useEffect(()=>{
        const middle_body = document.getElementById('middle_body')!;
        middle_body.addEventListener('dragenter', handleGlobalDragEnter); 
        middle_body.addEventListener('dragleave', handleGlobalDragLeave); 
        middle_body.addEventListener('dragover', handleGlobalDragOver);
        middle_body.addEventListener('drop', handleGlobalDrop);
    }, [])

    useEffect(()=>{
        setIsOpen(files.length ? true : false)
    }, [files])

    return(
        <section className={styles.main}
            style={{
                zIndex: dragging ? 1 : -1,
                backgroundColor: dragging ? 'rgba(10, 10, 10, 0.7)' : ''
            }}
        >
            <section className={styles.drag_window}
                id="drop-zone"
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
            >
                <section className={draggingInner ? styles.drag_zone_enter : styles.drag_zone }>
                    <img src={draggingInner ? file_colored : file }></img>
                    <h2 className={draggingInner ? styles.h2_colored : styles.h2_default}>Drop files here to send them</h2>
                </section>
            </section>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                overlayClickClose={false}
                children={<MessageDropModal files={files} closeModal={closeModal}/>}
            />
        </section>
    )
}
export default MessageDropZone;