import { FC, useState } from "react"
import MutableInput from "./MutableInput"

import styles from '../../styles/CustomInput.module.css'

import PasswordExtender from "./PasswordExtender"


interface IProps{
    maxLenght?: number
    label?: string,
    type: | 'password' | 'email' | 'text',
    event?: | 'error',
    callback: (input: string) => void,
    initValue?: string,
    required?: boolean
}

const CustomInput: FC<IProps> = (props) =>{

    const [type, setType] = useState(props.type);
    const [clicked, setClicked] = useState(false);

    const passwordStyle: React.CSSProperties = {
        paddingRight: '55px'
    } 

    const handleClick = () =>{
        setType(clicked ? 'password' : 'text')
        setClicked((!clicked))
    }

    return(
        <section className={styles.input_extender_wrapper}>
            <MutableInput 
                type={type} 
                callback={props.callback} 
                inputStyle={props.type == 'password' ? passwordStyle : undefined}
                label={props.label}
                event={props.event}
                maxLenght={props.maxLenght}
                initValue={props.initValue}
                required={props.required}
            />
            {
                props.type == 'password' && 
                <PasswordExtender clicked={clicked} handleClick={handleClick}/>
            }
        </section>
    )
}

export default CustomInput;