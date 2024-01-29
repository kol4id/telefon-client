import {useState, useEffect} from 'react'

const useWindowWidth = () =>{
    const [width, setWidth] = useState<number>(window.innerWidth);
    
    const HandleResize = (): void =>{
        setWidth(window.innerWidth);
    }

    useEffect(() =>{
        window.addEventListener('resize', HandleResize);

        return() =>{
            window.removeEventListener('resize', HandleResize)
        };
    }, []);

    return width;
}

export default useWindowWidth;