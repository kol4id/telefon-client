import React from 'react'
import styles from '../styles/MiddlePaneLoadPlug.module.css'
import InputContainer from './InputContainer'

const MiddlePaneLoadPlug = () =>{
    return(
        <React.Fragment>
            <div className = {styles.head}>
                <img src="https://top-fon.com/uploads/posts/2023-01/1674875370_top-fon-com-p-svetlo-serii-fon-dlya-prezentatsii-odnoton-39.jpg"/>
            </div>
            <div className={styles.body}>
                <div className={styles.bodyMain}/>
                <InputContainer sendMessageMargin={0}/>
            </div>
        </React.Fragment>
    )
}
export default MiddlePaneLoadPlug