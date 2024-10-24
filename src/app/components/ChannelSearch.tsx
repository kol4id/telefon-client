import { useDispatch, useSelector } from 'react-redux';
import { SetSearchValue } from '../../store/states/channelSearch';

import styles from '../styles/ChannelSearch.module.css'
import { RootState } from '../../store/store';

import searchImage from '../../assets/search.png';
import clearImage from '../../assets/close.png'
new Image().src = searchImage;
new Image().src = clearImage;


const ChannelSearch = () =>{

    console.log("ChannelSearch rerender")

    const dispatch = useDispatch();

    const searchValue = useSelector((state:RootState) => state.channelSearch.value);
    
    return(
        <div className={styles.search_container}>
                <img className={styles.search_img} src={searchImage}></img>
                <input className={styles.search_input} 
                    aria-label='channel search and filtering'
                    type='text'
                    value={searchValue}
                    onChange={(e) => dispatch(SetSearchValue(e.target.value))}
                />
                <button className={styles.search_clear_container}
                    aria-label='clear channel search'
                    style={{visibility: searchValue ? 'visible' : 'hidden'}}
                    onClick={() => dispatch(SetSearchValue(''))}
                >
                    <img className={styles.search_clear_img} src={clearImage}/>
                </button>
        </div>
    )
}

export default ChannelSearch