import { useSelector } from 'react-redux'
import styles from '../styles/LeftPane.module.css'
import { RootState } from '../../store/store'
import React from 'react'
import LeftPaneManager from '../components/LeftPaneManager'

const LeftPane = React.memo(() =>{
    console.log("LeftPane rerender")
    const width = useSelector((state: RootState) => state.width.leftPaneWidth);
    
    return(
        <section className = {styles.leftPane}
            id='left_pane'
            style={{width: width}}
        >
            <LeftPaneManager/>
        </section>
    )
})
export default LeftPane