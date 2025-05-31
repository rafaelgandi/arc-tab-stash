import { html } from '../lib/preact-htm.js';

/**
 * Toggle component that displays chevron icons based on show state
 * @param {Object} props
 * @param {boolean} props.show - Controls which chevron icon to display
 * @param {Function} props.onClick - Function called when icon is clicked
 */
export default function Toggle(props) {
    const {  onClick } = props;


    
    function handleClick(e) {
        onClick?.();
        e.stopPropagation();
        e.preventDefault();
    }

    return html`
        <img 
            class="section-toggle-icon" 
            src=${'./assets/triangle.svg'}
            onClick=${handleClick}
            style="cursor: pointer;"
        />
    `;
} 