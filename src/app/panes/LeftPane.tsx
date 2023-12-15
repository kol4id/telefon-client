import LeftPaneBody from '../components/LeftPaneBody'
import LeftPaneHead from '../components/LeftPaneHead'
import styles from '../styles/LeftPane.module.css'

const LeftPane = () =>{
    return(
        <div className = {styles.leftPane}>
            <LeftPaneHead/>
            <LeftPaneBody/>
        </div>
    )
}
export default LeftPane