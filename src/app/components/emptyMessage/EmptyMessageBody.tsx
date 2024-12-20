import styles from '../../styles/EmptyMessageList.module.css'
import Lottie from 'lottie-react';

import catTyping from '../../../assets/cat_typing.json';
import cubeWave from '../../../assets/cube_wave.json';
import gnomeWave from '../../../assets/gnome_wave.json';
import rupor from '../../../assets/rupor.json';
import snail from '../../../assets/snail.json';
import swingHand from '../../../assets/swing_hand.json';

import { useEffect, useState } from 'react';

const animations = [catTyping, cubeWave, gnomeWave, rupor, snail, swingHand];

const EmptyMessageBody = () =>{

    const [animationData, setAnimationData] = useState<any>(null);

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * animations.length);
        setAnimationData(animations[randomIndex]);
    }, []);
    
    return(
        <section className={styles.body}>
            <Lottie animationData={animationData} loop autoplay/>
        </section>
    )
}
export default EmptyMessageBody