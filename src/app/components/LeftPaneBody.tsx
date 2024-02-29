import { useEffect } from 'react';
import styles from '../styles/LeftPaneBody.module.css'
import { useFetching } from '../utils/hooks/useFetching';
import { useDispatch} from 'react-redux';
import { SetChannels, SetDataLoading } from '../../store/states/channels';
import FetchChannelsData from '../api/fetchChannelsData';
// import { RootState } from '../../store/store';
import ChannelsList from './ChannelsList';


const LeftPaneBody = () =>{

    console.log("LeftPaneBody rerender")

    const dispatch = useDispatch();
    // const dataLoadingStatus = useSelector((state: RootState) => state.channelsList.isDataLoading)

    const [GetChannels, channelsIsPending] = useFetching(async()=>{
        const data = await FetchChannelsData();
        //if ^ code failed code below v will not be executed
        dispatch(SetChannels(data));
    });

    const GetChannelsExecutor = async() => {
        dispatch(SetDataLoading(true));
        await GetChannels();
        dispatch(SetDataLoading(false));
    }

    useEffect(()=>{
        GetChannelsExecutor();
    },[])

    return(
        <div className = {styles.body}>
            <div className = {styles.bodyMain}>
                {
                    channelsIsPending
                    ? <div></div>
                    : <ChannelsList/>
                }        
            </div>
        </div>
    )
}

export default LeftPaneBody;