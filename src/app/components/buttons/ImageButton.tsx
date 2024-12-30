import { FC, memo } from "react"
import styles from '../../styles/ImageButton.module.css'

interface IProps{
    img: string,
    stylesOpt?: React.CSSProperties | undefined,
    imgStylesOpt?: React.CSSProperties | undefined,
    callback: (e?: any) => void,
}

const ImageButton: FC<IProps> = memo(({img, stylesOpt, imgStylesOpt, callback}) =>{

    return(
        <>
            <button onClick={callback} className={styles.image_button} style={stylesOpt}>
                <img src={img} className={styles.img} style={imgStylesOpt}></img>
            </button>
        </>
    )
})
export default ImageButton