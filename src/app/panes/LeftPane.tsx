import { useSelector } from 'react-redux'
import LeftPaneBody from '../components/LeftPaneBody'
import LeftPaneHead from '../components/LeftPaneHead'
import styles from '../styles/LeftPane.module.css'
import { RootState } from '../../store/store'
import React from 'react'

const LeftPane = React.memo(() =>{

    console.log("LeftPane rerender")

    const width = useSelector((state: RootState) => state.width.leftPaneWidth)

    return(
        <div className = {styles.leftPane}
            style={{
                width: width,
            }}
        >
            <LeftPaneHead/>
            <LeftPaneBody/>
        </div>
    )
})
export default LeftPane