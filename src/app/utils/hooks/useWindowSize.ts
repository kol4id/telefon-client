import { useState, useLayoutEffect } from 'react';

const useWindowSize = () =>{
    const [size, setSize] = useState<{height: number, width: number}>({
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
        width: typeof window !== 'undefined' ? window.innerWidth : 0
    });
    
    const handleResize = (): void => {
        setSize({height: window.innerHeight, width: window.innerWidth});
    };

    useLayoutEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize, {passive: false});

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    return size;
}

export default useWindowSize;