import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SetSearchValue } from '../../store/states/channelSearch';

import styles from '../styles/ChannelSearch.module.css'
import { RootState } from '../../store/store';

const ChannelSearch = () =>{

    console.log("ChannelSearch rerender")

    const dispatch = useDispatch();

    const searchValue = useSelector((state:RootState) => state.channelSearch.value);
    const width = useSelector((state: RootState) => state.width.searchWidth)

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
                onChange={(e) => dispatch(SetSearchValue(e.target.value))}
                value={searchValue}
                style={{width: width}}
            />
            <div className = {styles.inputClear}
                onClick={() => dispatch(SetSearchValue(''))}           
            ></div>
        </div>
    )
}

export default ChannelSearch