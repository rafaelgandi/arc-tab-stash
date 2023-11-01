import { html } from '../lib/preact-htm.js';


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