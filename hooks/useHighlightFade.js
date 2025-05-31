import { useState, useEffect } from '../lib/preact-htm.js';

/**
 * Custom hook for creating a highlight fade effect
 * @param {Object} options - Configuration options
 * @param {number} options.duration - How long the highlight stays visible (in ms)
 * @param {string} options.highlightColor - Background color for the highlight
 * @param {string} options.transitionDuration - CSS transition duration
 * @returns {Object} { isHighlighted, triggerHighlight, getHighlightStyles }
 */
export default function useHighlightFade(options = {}) {
    const {
        duration = 300,
        highlightColor = 'rgba(255, 255, 0, 0.3)',
        transitionDuration = '1.3s'
    } = options;

    const [isHighlighted, setIsHighlighted] = useState(false);

    useEffect(() => {
        if (isHighlighted) {
            const timer = setTimeout(() => {
                setIsHighlighted(false);
            }, duration);
            
            return () => clearTimeout(timer);
        }
    }, [isHighlighted, duration]);

    const triggerHighlight = () => {
        setIsHighlighted(true);
    };

    const getHighlightStyles = (additionalStyles = {}) => {
        return {
            backgroundColor: isHighlighted ? highlightColor : 'transparent',
            transition: `background-color ${transitionDuration} ease-out`,
            ...additionalStyles
        };
    };

    return {
        isHighlighted,
        triggerHighlight,
        getHighlightStyles
    };
} 