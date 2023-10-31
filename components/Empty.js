import { html } from '../lib/preact-htm.js';


/**
 * @typedef {{show: boolean}} EmptyProps
 * 
 * @param {EmptyProps} props 
 * @returns 
 */
export default function Empty(props) {
    
    return html`
        <div class="bstash-empty-con ${(!!props?.show) ? '' : 'hide'}">
            <div>
                ${`It's kinda lonely here `}
                <img src="./assets/shortcutkeys.svg" />
            </div>
        </div>
    `;
}