import { useContext } from "react"
import ChannelsManager from "./ChannelsManager"
import { LeftPaneTypeContext } from "./LeftPaneManager"

const LeftPaneCreateChannel = () => {

    const paneType = useContext(LeftPaneTypeContext);

    return(
        <>
            {/* <ChannelsManager/> */}
            <header>    
                <section style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
                    <section style={{display: 'flex'}}>
                        <button style={{height: '40px', width: '40px', borderRadius: '50%'}}
                            onClick={()=> paneType.setPaneType('channels')}
                        >{'<-'}</button>
                        <h1 style={{margin: '0'}}>Add members</h1>
                    </section>
                    <input style={{background: 'none', marginTop: '15px', height: '30px', outline: 'none', border: 'none'}}
                        placeholder="Who would you like to add"
                    />
                    <section style={{height: 'auto', overflow: 'auto'}}>
                        {/* <ChannelsManager/>   */}
                        
                    </section>
                </section>
            </header>
        </>
    )
}
export default LeftPaneCreateChannel