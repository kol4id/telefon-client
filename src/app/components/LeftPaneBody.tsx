import { useEffect } from 'react';
import styles from '../styles/LeftPaneBody.module.css'
// import { useFethcing } from '../utils/hooks/useFetching';
// import { useDispatch } from 'react-redux';
// import { SetChannels } from '../../store/states/channels';
// import FetchChannelsData from '../utils/api/fetchChannelsData';

const LeftPaneBody = () =>{

    // const dispatch = useDispatch();



    // const {fetching, isLoading} = useFethcing(async()=>{
    //     const data = FetchChannelsData();
    // })

    useEffect(()=>{

    },[])

    return(
        <div className = {styles.body}>
            <div className = {styles.bodyMain}>
                handler
            </div>
        </div>
    )
}

export default LeftPaneBody;