import { FC, memo, useState } from "react"


import close from '../../../assets/close.png'
new Image().src = close;

import styles from '../../styles/MessageDropModal.module.css'
import MessageDropModalBottom from "./MessageDropModalBottom"
import MessageDropImg from "./MessageDropImg"

interface IProps{
    files?: File[],
    closeModal: ()=> void,
}

const MessageDropModal: FC<IProps> = memo(({files, closeModal}) =>{
    const [localFiles, setLocalFiles] = useState<File[]>(files!);

    const deleteFile = (fileToDelete: File) => {
        const updatedFiles = localFiles?.filter(file => file.lastModified !== fileToDelete.lastModified);
        setLocalFiles(updatedFiles);
        if (updatedFiles?.length === 0) {
            closeModal();
        }
    };

    const sent = () =>{
        closeModal();
    }

    return(
        <>
            <article className={styles.main}>
                <section className={styles.modal_header}>
                    <button style={{marginLeft: '20px'}} onClick={closeModal}>
                        <img src={close} className={styles.close_img}></img>
                    </button>
                    <h2>Send {localFiles?.length} Photos</h2>
                </section>
                <section className={styles.modal_body}>
                    <div className={styles.image_grid}>
                    {
                        localFiles?.length == 1
                        ?   <MessageDropImg file={localFiles[0]} style={styles.image_solo_item} handleDelete={() =>deleteFile(localFiles[0])}/>
                        :   localFiles?.map((file) =>
                                <MessageDropImg
                                    key={file.lastModified}
                                    file={file}
                                    style={styles.image_item}
                                    handleDelete={() => deleteFile(file)}
                                />
                            )
                    }
                    </div>
                </section>
                <MessageDropModalBottom files={localFiles} sent={sent}/>
            </article>
        </>
    )
})
export default MessageDropModal