// See: https://www.debuggr.io/react-update-unmounted-component/
import { useEffect, useRef } from '../lib/preact-htm.js';
export default function useIsMountedRef() {
    const isMountedRef = useRef(true);
    useEffect(() => {
        return () => isMountedRef.current = false;
    }, []);
    return isMountedRef;
}