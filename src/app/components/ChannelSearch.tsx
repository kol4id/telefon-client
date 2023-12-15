import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue } from '../../store/states/channelSearch';

import styles from '../styles/ChannelSearch.module.css'
import { RootState } from '../../store/store';

const ChannelSearch = () =>{
    const dispatch = useDispatch();

    const searchValue = useSelector((state:RootState) => state.channelSearch.value);

    const [focus, setFocus] = useState<boolean>(false);
    const [searchStyle, setSearchStyle] = useState<string>(styles.ChannelSearchLine)

    useEffect(() => {
        focus
        ? setSearchStyle(styles.channelSearchLineFocused)
        : setSearchStyle(styles.channelSearchLine)
    }, [focus])

    return(
        <div className = {searchStyle}>
            <input
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onChange={(e) => dispatch(setSearchValue(e.target.value))}
                value={searchValue}
            />
            <div className = {styles.inputClear}
                onClick={() => dispatch(setSearchValue(''))}           
            ></div>
        </div>
    )
}

export default ChannelSearch