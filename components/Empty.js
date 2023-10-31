import { html } from '../lib/preact-htm.js';


/**
 * 
 * @param {import("../types/types.d.ts").EmptyProps} props 
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