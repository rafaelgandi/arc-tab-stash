/*
    Stash
    www.rafaelgandi.com
*/
import {
    storageSet,
    storageGet,
    openInNewTab,
    removeFromStash,
    logThis,
    sendMessageToBg,
    getCurrentTabData
} from './lib/helpers.js';
import * as api from './lib/api.js';
import { html, render, useState } from './lib/preact-htm.js';
import SettingsModal from './components/SettingsModal.js';
import Empty from './components/Empty.js';
import useSfx from './hooks/useSfx.js';
import StashLinkItem from './components/StashLinkItem.js';

const $head = document.querySelector('head');
const $body = document.querySelector('body');


// LM: 2023-02-24 11:16:10 [Use scripting instead of messages for accessing active tabs colors]
async function getArcSpaceColors() {
    const tab = await getCurrentTabData();
    if (tab.url.startsWith('chrome://') || tab.url.startsWith('arc://')) {
        return;
    }
    // See: https://developer.chrome.com/docs/extensions/reference/scripting/#manifest
    const res = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            function getArcColor(name) {
                // return document.documentElement.style.getPropertyValue(name) ?? null;
                return window.getComputedStyle(document.documentElement).getPropertyValue(name) ?? null;
            }

            function getArcPalette() {
                return {
                    'arcPaletteTitle': getArcColor('--arc-palette-title'),
                    'arcBGSimpleColor': getArcColor('--arc-background-simple-color'),
                    'arcBGGradients': [
                        getArcColor('--arc-background-gradient-color0'),
                        getArcColor('--arc-background-gradient-color1'),
                        getArcColor('--arc-background-gradient-color2'),
                        getArcColor('--arc-background-gradient-overlay-color0'),
                        getArcColor('--arc-background-gradient-overlay-color1'),
                        getArcColor('--arc-background-gradient-overlay-color2')
                    ]
                };
            }
            return getArcPalette();
        }
    });
    return res?.[0]?.result;
}

async function setArcTheme() {
    const response = await getArcSpaceColors();

    if (response) {
        const arcBGGradients = response.arcBGGradients.filter((color) => !!color);
        if (arcBGGradients.length) {
            $body.style.background = `linear-gradient(140deg, ${arcBGGradients.join(', ')})`;
        }
        else {
            if (response.arcBGSimpleColor) {
                $body.style.background = response.arcBGSimpleColor;
            }
        }
        const $style = document.createElement('style');
        $style.textContent = `
            .bstash-list-con ul li a {color: ${response.arcPaletteTitle}}
            .bstash-empty-con div {color: ${response.arcPaletteTitle}}
        `;
        // $style.text(`
        //     .bstash-list-con ul li a {color: ${response.arcPaletteTitle}}
        //     .bstash-empty-con div {color: ${response.arcPaletteTitle}}
        // `);
        $head.appendChild($style);
    }
}

function sortByOrderProp(arr) {
    let newArr = [...arr];
    newArr.sort((a, b) => {
        if (Number(a.order) < Number(b.order)) {
            return -1;
        }
        if (Number(a.order) > Number(b.order)) {
            return 1;
        }
        return 0;
    });
    return newArr;
}

function updateGistStashDataOnServer(wait = 1300) {
    clearTimeout(updateStashOnGistServerDebouncer);
    updateStashOnGistServerDebouncer = setTimeout(async () => {
        await api.setGistContents(await storageGet('stash'));
    }, wait);         
}

function Stash() {
    const [stashArr, setStashArr] = useState([]);
    const [showSettings, setShowSettings] = useState(false);

    useSfx(async function init() {
        setArcTheme();
        setStashArr(sortByOrderProp(await storageGet('stash')));        
    }, false);

    useSfx(async function onStashChanged(prev) {
        if (prev.hasChanged({ stashArr })) {
            // console.log(stashArr);
            await storageSet('stash', stashArr);
            updateGistStashDataOnServer();
        }
    }, { stashArr });

    async function onStashItemDelete(stashId) {
        setStashArr(removeFromStash(stashArr, stashId));
    }

    return html`
        <span id="tester-span"></span>
        <${Empty} show=${stashArr.length < 1} />
        <div class="bstash-list-con">
            <ul>
            ${
                stashArr.map((item) => {
                    return html`
                        <li>
                        <${StashLinkItem} 
                            item=${item} 
                            onDelete=${onStashItemDelete}
                        />
                        </li>
                    `;
                })
            }
            </ul>
        </div>
        <${SettingsModal} />
        <footer>
            <div class="bstash-footer-child" title="Stash current tab.">
                <img title="Add current tab to stash (shift + opt + s)" id="bstash-footer-add-tab-button" class="bstash-footer-control" src="./assets/add.svg" />
            </div>
            <div id="bstash-msg-con" class="bstash-footer-child"></div>
            <div class="bstash-footer-child">
                <img id="bstash-footer-settings-button" class="bstash-footer-control" src="./assets/settings.svg" />
            </div>
        </footer>
        <div id="bstash-blocker" class="hide"></div>
    `;
}

render(html`<${Stash} />`, document.getElementById('arc-bookmark-stash-main'));
