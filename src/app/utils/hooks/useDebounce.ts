import { useEffect, useRef, useState } from "react";

export const useDebounce = (callback: () => void, delay: number) => {
    const [isMounted, setIsMounted] = useState(true);
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    const debounce = async() => {
        if (!isMounted) return;

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            callback();
        }, delay);
    };

    return debounce;
}