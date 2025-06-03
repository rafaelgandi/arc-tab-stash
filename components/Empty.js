import { html } from '../lib/preact-htm.js';


/**
 * 
 * @param {import("../types/types.d.ts").EmptyProps} props 
 * @returns 
 */
export default function Empty(props) {
    return html`
        <div class="bstash-empty-con">
            <div>
                <span style=${{display: 'block'}} class="animate__animated animate__bounceInDown">${`It's kinda lonely here `}</span>
                <img class="animate__animated animate__bounceInDown animate__fast" src="./assets/shortcutkeys.svg" />
            </div>
        </div>
    `;
}