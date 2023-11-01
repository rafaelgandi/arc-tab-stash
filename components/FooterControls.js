import { html } from '../lib/preact-htm.js';
import {transform} from '../lib/nested-css-to-flat.js';
// import { preprocess } from '../lib/helpers.js';


// console.dir(nestedCssToFlat);

console.log(transform(/* scss */`
    footer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        
        backdrop-filter: blur(10px);
        background-color: rgba(255, 255, 255, .3);
        z-index: 1000;
        display: grid;
        grid-template-columns: 15% 1fr 15%;
        align-items: center;
        justify-content: center;
        padding: 0;
        .bstash-footer-child { 
            
            text-align: center;
            padding: .3rem;
            padding-bottom: .2rem;

            & img.bstash-footer-control {
                
                transition: transform .2s ease-out;
                opacity: .5;
                --size: 15px;
                width: var(--size);
                height: var(--size);
                &:hover {
                    transform: rotate(180deg);
                }
            }
        }
        #bstash-msg-con {
            font-style: italic;
        }
    }

`));




/** @param {import("../types/types.d.ts").FooterControlsProps} props */
export default function FooterControls(props) {

    return html`
        <footer>
            <div class="bstash-footer-child" title="Stash current tab.">
                <img 
                    title="Add current tab to stash (shift + opt + s)" 
                    id="bstash-footer-add-tab-button" 
                    class="bstash-footer-control" 
                    src="./assets/add.svg" 
                    onClick=${(e) => {
                        e.preventDefault();
                        props?.onAddCurrentTabToStash?.();
                    }}
                />
            </div>
            <div id="bstash-msg-con" class="bstash-footer-child"></div>
            <div class="bstash-footer-child">
                <img 
                    id="bstash-footer-settings-button" 
                    class="bstash-footer-control" 
                    src="./assets/settings.svg" 
                    onClick=${(e) => {
                        e.preventDefault();
                        props?.onToggleSettings?.();
                    }}
                />
            </div>
        </footer>
    `;
}