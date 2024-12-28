import { useState, useEffect, useCallback } from 'react';
import { IPosition } from '../../global/types/MousePos';

const usePointerContext = (enabled: boolean = false): IPosition => {
    const [mouseDownPosition, setMouseDownPosition] = useState<IPosition>({ x: 0, y: 0 });

    const handleContextMenu = useCallback((event: MouseEvent) => {
        setMouseDownPosition({ x: event.clientX, y: event.clientY });
    }, []);

    useEffect(() => {
        enabled
        ?   window.addEventListener('contextmenu', handleContextMenu)
        :   window.removeEventListener('contextmenu', handleContextMenu)

        return () => {
            window.removeEventListener('contextmenu', handleContextMenu)
        };
    }, [enabled, handleContextMenu]); 

    return mouseDownPosition;
};

export default usePointerContext;