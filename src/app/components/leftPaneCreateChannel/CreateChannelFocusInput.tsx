import { FC, useLayoutEffect, useRef } from 'react';
import styles from '../../styles/LeftPaneCreateChannel.module.css';

interface IProps{
    setChannelSearch: (a: string) => void;
    searchValue: string
}

const CreateChannelFocusInput: FC<IProps> = ({setChannelSearch, searchValue}) =>{
    const inputRef = useRef<HTMLInputElement>(null);

    useLayoutEffect(() => {
        inputRef.current?.focus({ preventScroll: true });
    }, []);

    return(
        <>
            <div className={styles.header_body}>
                <input className={styles.channel_search}
                ref={inputRef}
                value={searchValue}
                onChange={e => setChannelSearch(e.target.value)}
                type='text'
                placeholder="Who would you like to add?"/>
            </div>
        </>
    )
}
export default CreateChannelFocusInput