import { html } from '../lib/preact-htm.js';

/**
 * 
 * @param {import("../types/types.d.ts").SettingsModalProps} props 
 * @returns 
 */
export default function SettingsModal(props) {
    
    return html`
        <div class=${`bstash-setting ${(!props?.show) ? 'hide-settings' : ''}`}>
            <div class="bstash-setting-border">
                <section>
                    <header>
                        <img src="./assets/github-mark.svg" />
                        <span>Github Access Token</span>
                    </header>
                    <input type="text" id="bstash-setting-git-token-input" placeholder="token..." />
                    <p>
                        Instructions on how to make one can be found 
                        <a href="https://rafaelgandi.notion.site/Stash-1280c4fcdd48491ab480cf455d671517#5ac05adc78d646f8bdbfbde1fbe907b9" target="_blank">here</a>. 
                        If you already have a token used on Stash in another browser, paste it here to sync your data.
                    </p>
                </section>
                <div class="bstash-settings-button-con">
                    <button id="bstash-settings-save-button">⚡️ Connect</button>     
                    <button id="bstash-settings-cancel-button">Close</button>         
                </div>
            </div>         
        </div>
    `;
}