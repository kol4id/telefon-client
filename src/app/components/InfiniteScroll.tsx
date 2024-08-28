import React, { useEffect, useRef } from "react";

interface IProps {
    callback: ()=> void;
    direction: "top" | 'bottom';
    // children: React.ReactNode;
}

const threshold = [0.1,0.9];

const InfiniteScroll: React.FC<IProps> = ({callback, direction}) =>{
    const infiniteRef = useRef(null!);
    const previousYRef = useRef<number>(0);
    const previousRatioRef = useRef<number>(0);

    const handleObserve = (entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
            const currentY = entry.boundingClientRect.y;
            const currentRatio = entry.intersectionRatio;
            const isIntersecting = entry.isIntersecting;
            
            if (currentY < previousYRef.current && isIntersecting){
                if (currentRatio > previousRatioRef.current){
                    callback();
                }
            } else if (currentY > previousYRef.current && isIntersecting) {
                if (currentRatio > previousRatioRef.current){
                    callback();
                }
            }

            previousYRef.current = currentY;
            previousRatioRef.current = currentRatio;
        })
    }

    useEffect(()=>{
        const observer = new IntersectionObserver(entries =>{
            handleObserve(entries)
        }, {
            threshold: threshold
        })  
    
        observer.observe(infiniteRef.current);
        return () => observer.disconnect();
    },[])

    return(
        <div ref={infiniteRef}
        style={{ top: direction == "top" ? "0px" : "", padding: "70px", position: "absolute", border: "1px solid red"}}/>
    )
}

export default InfiniteScroll;