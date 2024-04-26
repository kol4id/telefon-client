import {useState, useEffect} from 'react'

const useWindowSize = () =>{
    const [size, setSize] = useState<{height: number, width: number}>({height: window.innerHeight , width: window.innerWidth});
    
    const HandleResize = (): void =>{
        setSize({height: window.innerHeight , width: window.innerWidth});
    }

    useEffect(() =>{
        window.addEventListener('resize', HandleResize);

        return() =>{
            window.removeEventListener('resize', HandleResize)
        };
    }, []);

    return size;
}

export default useWindowSize;