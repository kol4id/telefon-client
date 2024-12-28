import { useSelector } from 'react-redux'
import styles from '../styles/LeftPane.module.css'
import { RootState, useAppDispatch } from '../../store/store'
import React from 'react'
import LeftPaneManager from '../components/LeftPaneManager'
import LeftPaneSizeWraper from '../components/LeftPaneSizeWraper'
import { setLeftDisplayed } from 'store/states/width'

const LeftPane = React.memo(() =>{
    console.log("LeftPane rerender")
    const dispatch = useAppDispatch();
    const width = useSelector((state: RootState) => state.width.leftPaneWidth);
    const isNarrow = useSelector((state: RootState) => state.width.isNarrow);
    const currentChannel = useSelector((state: RootState) => state.channelsList.currentChannel);
    const leftDisplayed = useSelector((state: RootState) => state.width.leftDisplayed);

    if (!currentChannel.id) dispatch(setLeftDisplayed(true));
    const display = leftDisplayed ? 'block' : 'none';
    
    return(
        <section className = {styles.leftPane}
            id='left_pane'
            style={{
                width: isNarrow ? '100vw' : width,
                display: display
            }}
        >
            <div id="left-portal"></div>
            <LeftPaneSizeWraper>
                <LeftPaneManager/>
            </LeftPaneSizeWraper>
        </section>
    )
})
export default LeftPane