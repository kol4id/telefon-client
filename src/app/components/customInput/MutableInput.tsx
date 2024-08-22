
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
    required?: boolean
}
const MutableInput: FC<IProps> = (props) => {  
    const [input, setInput] = useState(props.initValue ?? '');

    const handleChange = (val: string) =>{
        setInput(val)
        props.callback(val)
    }

    return(
        <section className={styles.mutable_input}>
            <input type={props.type} className={styles.inputText} maxLength={props.maxLenght}
                required={props.required ?? false}
                value={input}
                onChange={e => handleChange(e.target.value)}
                placeholder=''
                style={{
                    border: props.event == 'error' ? '1px red solid' : '',
                    caretColor: props.event == 'error' ? 'red' : '',
                    ...props.inputStyle
            }}/>
            <span className={styles.floating_label} style={{
                color: props.event == 'error' ? 'red' : '',
                ...props.labelStyle
            }}>{props.label}</span>
        </section>
    )
}

export default MutableInput