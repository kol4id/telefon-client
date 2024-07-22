
import { FC, useState } from 'react';
import styles from '../../styles/CustomInput.module.css';

interface IProps{
    maxLenght?: number
    label?: string,
    type: | 'password' | 'email' | 'text',
    event?: | 'error',
    inputStyle?: React.CSSProperties,
    labelStyle?: React.CSSProperties,
    callback: (input: string) => void,
    initValue?: string,
}

const MutableInput: FC<IProps> = ({type, label, event, maxLenght, inputStyle, labelStyle, callback, initValue}) => {  
    const [input, setInput] = useState(initValue ?? '');

    const handleChange = (val: string) =>{
        setInput(val)
        callback(val)
    }

    return(
        <section className={styles.mutable_input}>
            <input type={type} className={styles.inputText} maxLength={maxLenght}
                value={input}
                onChange={e => handleChange(e.target.value)}
                placeholder=''
                style={{
                    border: event == 'error' ? '1px red solid' : '',
                    caretColor: event == 'error' ? 'red' : '',
                    ...inputStyle
            }}/>
            <span className={styles.floating_label} style={{
                color: event == 'error' ? 'red' : '',
                ...labelStyle
            }}>{label}</span>
        </section>
    )
}

export default MutableInput