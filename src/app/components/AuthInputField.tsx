import React, { useEffect, useRef, useState } from "react";


import styles from '../styles/AuthInputField.module.css'
import eye_open from '../../assets/eye_open.png'
import eye_closed from '../../assets/eye_closed.png'

interface IProps {
    type: string,
    label: string,
    hide: boolean,
    SetSearchValue: (val: string) => void,
}

const AuthInputField = (props: IProps) =>{

    const [value, setValue] = useState<string>('');
    const [showText, setShowText] = useState<boolean>(false)
    const [focus, setFocus] = useState<boolean>(false)
    const [isNotEmpty, setIsNotEmpty] = useState<boolean>();

    const input = useRef<HTMLInputElement>(null);

    const toggleShowText = () => {
        setShowText((!showText));
    };

    useEffect(()=>{
        setTimeout(() => {
            if(input.current){
                input.current.value !== '' || setIsNotEmpty(true);
            }
        }, 0);  
    }, [])

    useEffect(() =>{
        props.SetSearchValue(value);
        if (value && !focus){
            setIsNotEmpty(true)
        } else {
            setIsNotEmpty(false)
        }
    }, [value, focus])



    return(
        <React.Fragment>
            <div className = {styles.input_container}>
                <label className={isNotEmpty ? styles.label_custom_with_content : styles.label_custom}>
                    {props.label}
                </label>
                <input className={styles.input_custom}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    onChange={(e) => setValue(e.target.value)}
                    type={
                        props.type === 'password'
                        ? showText ? 'text' : 'password'
                        : props.type
                    }
                    style={props.hide ? {paddingRight: '50px'} : {paddingRight: '10px'}}
                    ref={input}
                    value={value}   
                />
                <div>
                    <img className={styles.img_pass_eye}
                        src={showText ? eye_open : eye_closed}
                        onClick={() => toggleShowText()}
                        tabIndex={-1}
                        style={props.type === 'password' ? {} : {visibility: 'hidden'}}
                    />
                </div>    
            </div>
        </React.Fragment>
    )
}
export default AuthInputField;