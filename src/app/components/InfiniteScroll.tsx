import React, { useEffect, useRef } from "react";

interface IProps {
    callback: ()=> void;
    // children: React.ReactNode;
}

const InfiniteScroll: React.FC<IProps> = React.memo(({callback}) =>{
    const infiniteRef = useRef(null!);

    useEffect(()=>{
        const observer = new IntersectionObserver( entries =>{
            callback();
            if(entries[0].isIntersecting){
                // observer.unobserve(infiniteRef.current)
            }
        }, {
            root: document.getElementById('bodyTransition'),
            rootMargin: '200px'
        })

        observer.observe(infiniteRef.current);
        return () => observer.disconnect();
    })

    return(
        <div 
        ref={infiniteRef}>

        </div>
    )
})

export default InfiniteScroll;