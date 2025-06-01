import { html, useState } from '../lib/preact-htm.js';
import {
    storageSet,
    getVersionFromManifest,
    sendMessageToBg
} from '../lib/helpers.js';
import * as api from '../lib/api.js';
import useSfx from '../hooks/useSfx.js';
import * as analytics from '../lib/analytics.js';


/**
 * 
 * @param {import("../types/types.d.ts").SettingsModalProps} props 
 * @returns 
 */
export default function SettingsModal(props) {
    const instructionsUri = 'https://rafaelgandi.notion.site/Stash-1280c4fcdd48491ab480cf455d671517#5ac05adc78d646f8bdbfbde1fbe907b9';
    const [tokenValue, setTokenValue] = useState('');
    const [hasError, setHasError] = useState(false);
    const [forceOpenModal, setForceOpenModal] = useState(false);

    useSfx(async function getInitialGitCreds() {
        const gitCreds = await api.getGitCredsSaved();
        if (typeof gitCreds !== 'undefined' && navigator.onLine) {
            setTokenValue(gitCreds.token);
        }
    }, false);

    async function onSettingSaved() {
        setHasError(false);
        if (tokenValue.trim() === '') {
            setHasError(true);
            return;
        }
        props?.doBlock?.(true);
        await storageSet('gitToken', tokenValue);
        await sendMessageToBg({
            message: 'make-stash-gist',
            data: {
                gitToken: tokenValue
            }
        });
        analytics.capture('sh-git-token-saved');
        props?.doBlock?.(false);
        props?.onTokenSaved?.();
        props?.onDidDismiss?.();
    }


    return html`
        <div class=${`bstash-setting ${(!props?.show) ? 'hide-settings' : ''}`}>
            <div class="bstash-setting-border">
                <section>
                    <header>
                        <img src="./assets/github-mark.svg" />
                        <span>Github Access Token</span>
                    </header>
                    <input 
                        type="text" 
                        id="bstash-setting-git-token-input" 
                        placeholder="token..." 
                        value=${tokenValue}
                        onInput=${(e) => setTokenValue(e.currentTarget.value.toString())}
                        class=${(hasError) ? 'error' : ''}
                        onFocus=${() => setHasError(false)}
                    />
                    <p>
                        Instructions on how to make one can be found <a href=${instructionsUri} target="_blank">here</a>. 
                        If you already have a token used on Stash in another browser, paste it here to sync your data.
                        <br /> 
                        Your current version of Stash is ${getVersionFromManifest()}
                    </p>
                </section>
                <div class="bstash-settings-button-con">
                    <button 
                        id="bstash-settings-save-button"
                        onClick=${(e) => {
                            e.preventDefault();
                            onSettingSaved();
                        }}
                    >⚡️ Connect</button>     
                    <button 
                        id="bstash-settings-cancel-button" 
                        onClick=${(e) => {
                            e.preventDefault();
                            if (tokenValue.trim() === '') { return; }
                            props?.onDidDismiss?.();
                        }}
                    >Close</button>         
                </div>
            </div>         
        </div>
    `;
}