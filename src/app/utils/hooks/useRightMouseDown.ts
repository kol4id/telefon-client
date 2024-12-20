import { useState, useEffect, useCallback } from 'react';
import { IPosition } from '../../global/types/MousePos';

interface UseRightMouseDownResult {
    isRightMouseDown: boolean;
    mouseDownPosition: IPosition;
}

const useRightMouseDown = (enabled: boolean = false): UseRightMouseDownResult => {
    const [isRightMouseDown, setIsRightMouseDown] = useState<boolean>(false);
    const [mouseDownPosition, setMouseDownPosition] = useState<IPosition>({ x: 0, y: 0 });

    const handleRightMouseDown = useCallback((event: MouseEvent) => {
        if (event.button === 2) {
            setIsRightMouseDown(true);
            setMouseDownPosition({ x: event.clientX, y: event.clientY });
        }
    }, []);

    const handleMouseUp = useCallback(() => {
        setIsRightMouseDown(false);
    }, []);

    useEffect(() => {
        if (enabled) {
            window.addEventListener('mousedown', handleRightMouseDown);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousedown', handleRightMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousedown', handleRightMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [enabled, handleRightMouseDown, handleMouseUp]); 

    return { isRightMouseDown, mouseDownPosition };
};

export default useRightMouseDown;