import {FC} from 'react'

import styles from '../styles/MainPane.module.css'
import LeftPane from './LeftPane';

const MainPane: FC = () =>{ 
    return(
        <div className = {styles.main}>
            <LeftPane/>            
        </div>
    )
}
export default MainPane;
