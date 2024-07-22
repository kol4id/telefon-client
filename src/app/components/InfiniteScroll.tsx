import React, { useEffect, useRef, useState } from "react";

interface IProps {
    callback: ()=> void;
    // direction: "top" | 'bottom';
    // children: React.ReactNode;
}

const InfiniteScroll: React.FC<IProps> = ({callback}) =>{
    const infiniteRef = useRef(null!);
    const [previousY, setPreviousY] = useState<number>(0);
    const [previousRatio, setPreviousRatio] = useState<number>(0);

    useEffect(()=>{
        const observer = new IntersectionObserver(entries =>{
            entries.forEach(entry => {
                const currentY = entry.boundingClientRect.y;
                const currentRatio = entry.intersectionRatio;
                const isIntersecting = entry.isIntersecting;

                if (currentY > previousY && isIntersecting){
                    if (currentRatio > previousRatio){
                        callback();
                    }
                } else if (currentY < previousY && isIntersecting) {
                    if (currentRatio > previousRatio){
                        callback();
                    }
                }
                setPreviousRatio(currentRatio);
                setPreviousY(currentY);
            })
        }, {
            root: document.getElementById('bodyTransition'),
            rootMargin: '200px'
        })
        // document.getElementById('bodyTransition')

        observer.observe(infiniteRef.current);
        
        return () => observer.disconnect();
    },[])

    return(
        <div ref={infiniteRef}
        style={{border: "1px solid red"}}/>
    )
}

export default InfiniteScroll;