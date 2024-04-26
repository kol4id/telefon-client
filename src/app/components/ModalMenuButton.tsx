import styles from '../styles/ModalMenuButton.module.css'

interface IProps{
    text: string;
    img_url?: string;
    style?: React.CSSProperties;
    callback: ()=> void;   
}

const ModalMenuButton = (props: IProps) => {

    return(
        <div className={styles.modal_button_container}
            onClick={() => props.callback()}
        >
            {props.img_url && <img src={props.img_url}/>}
            <div className={styles.modal_button} style={props?.style} >{props.text}</div>
        </div>
    )
}

export default ModalMenuButton