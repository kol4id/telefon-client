import { useEffect } from 'react';
import styles from '../styles/LeftPaneBody.module.css'
import { useFethcing } from '../utils/hooks/useFetching';
import { useDispatch} from 'react-redux';
import { SetChannels, SetDataLoading } from '../../store/states/channels';
import FetchChannelsData from '../api/fetchChannelsData';
// import { RootState } from '../../store/store';
import ChannelsList from './ChannelsList';


const LeftPaneBody = () =>{

    console.log("LeftPaneBody rerender")

    const dispatch = useDispatch();
    // const dataLoadingStatus = useSelector((state: RootState) => state.channelsList.isDataLoading)

    const {fetching, isLoading} = useFethcing(async()=>{
        dispatch(SetDataLoading(true))
        const data = await FetchChannelsData();
        dispatch(SetChannels(data));
        dispatch(SetDataLoading(false))
    })

    useEffect(()=>{
        fetching();
    },[])

    return(
        <div className = {styles.body}>
            <div className = {styles.bodyMain}>
                {
                    isLoading
                    ? <div></div>
                    : <ChannelsList/>
                }        
            </div>
        </div>
    )
}

export default LeftPaneBody;