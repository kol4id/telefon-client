import { useMemo, useState } from 'react';
import styles from '../../styles/MiddlePaneHead.module.css';
import { useNavigate } from 'react-router-dom';
import menu from '../../../assets/left-arrow.png';
import close from '../../../assets/close.png';
import { useAppDispatch } from 'store/store';
import { setLeftDisplayed, setMiddleDisplayed } from 'store/states/width';
new Image().src = menu;
new Image().src = close;

type buttonState = | 'back' | 'close'

const HeadMenuButton = () => {
    const [state, setState] = useState<buttonState>('back')
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const img = useMemo(() => state == 'back' ? menu : close, [state]);

    const handleClick = () =>{
        const isSmallScreen = document.body.getBoundingClientRect().width <= 600;
        switch(state){
            case 'back':
                dispatch(setLeftDisplayed(true));
                isSmallScreen ? navigate('/a') : dispatch(setMiddleDisplayed(true))
                setState('close')
                break;
            default:
                dispatch(setLeftDisplayed(true));
                navigate('/a')
        }
    }

    return(
        <section className={styles.button_container}>
            <button className={styles.channel_list_button} onClick={handleClick}>
                <img src={img} style={{width: '18px', height: '18px'}}/>
            </button>
        </section>
    )
}

export default HeadMenuButton