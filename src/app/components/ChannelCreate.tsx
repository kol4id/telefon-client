import styles from '../styles/ChannelCreate.module.css'
import pen from '../../assets/pen.png'
import { FC, useEffect, useRef, useState } from 'react'
import CreateChannelModalContent from './CreateChannelModalContent'
import Context from './Context'

interface IProps{
    visible: boolean
}

const ChannelCreate: FC<IProps> = ({visible}) => {

    const [isOpen, setIsOpen] = useState(false);
    const createButton = useRef<HTMLButtonElement>(null);

    useEffect(()=>{
        console.log(createButton.current?.getBoundingClientRect())
        if (!visible) setIsOpen(false)
    },[isOpen, visible])

    return(
        <section className={styles.main} style={{visibility: visible ? 'visible' : 'hidden'}}>
            <button onClick={()=>setIsOpen(true)} ref={createButton}>
                <img src={pen}></img>
            </button>
            <Context
                isOpen={isOpen}
                onClose={()=>setIsOpen(false)}
                position={{
                    x: createButton.current?.getBoundingClientRect().x! - 120,
                    y: createButton.current?.getBoundingClientRect().y! - 75
                }}
                children={<CreateChannelModalContent close={()=>setIsOpen(false)}/>}
            />
        </section>
    )
}

export default ChannelCreate