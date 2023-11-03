/*
    Stash
    www.rafaelgandi.com
*/
import {
    getCurrentTabData,
    sendMessageToActiveTab,
    storageSet,
    storageGet,
    logThis,
    handleError,
    openInNewTab
} from './lib/helpers.js';
import * as api from './lib/api.js';

(async () => {
    let stashDebouncer = undefined;
    const stashDebouncerDelay = 800; // ms
    const stashNotionPage = `https://rafaelgandi.notion.site/Stash-1280c4fcdd48491ab480cf455d671517`;
    const onStashUpdateNotionPage = `https://rafaelgandi.notion.site/Thanks-for-your-support-2a0e39ac7f154c14beb513d2e8b467e9?pvs=4`;

    chrome.runtime.onInstalled.addListener(function onStashExtensionInstall(details) {
        // console.log(details);
        console.log('Running on install listeners');
        // LM: 2023-11-02 16:01:23 [If user has updated the extension.]
        // See: https://stackoverflow.com/questions/2399389/detect-chrome-extension-first-run-update
        if (details?.reason === 'update') {
            openInNewTab(onStashUpdateNotionPage); // Open review campaign notion page.
        }
        (async () => {
            const res = await storageGet('stash');
            if (!res) {
                storageSet('stash', []);
            }
            const gitToken = await storageGet('gitToken');
            if (!gitToken) {
                storageSet('gitToken', '');
                // LM: 2023-03-10 13:34:22 [Only open notion page if token does not exist. This means that its a fresh install.]
                openInNewTab(stashNotionPage);
            }
            const gistLink = await storageGet('gistLink');
            if (!gistLink) {
                storageSet('gistLink', {
                    link: '',
                    id: ''
                });
            }
        })();
    });

    // Save stash to gist on popup close
    chrome.runtime.onConnect.addListener((port) => {
        if (port.name === "popup") {
            // Triggers on popup close //
            // See: https://stackoverflow.com/a/65563521
            port.onDisconnect.addListener(function onPopUpClose() {
                if (!navigator.onLine) { return; }
                (async () => {
                    if (!await api.getGitCredsSaved()) { return; }
                    const STASH = await storageGet('stash');
                    await api.setGistContents(STASH);
                })();
            });
        }
    });

    // See: https://dev.to/paulasantamaria/adding-shortcuts-to-your-chrome-extension-2i20
    chrome.commands.onCommand.addListener(function setKeyboardShortcut(command) {
        switch (command) {
            case 'stash-current-tab':
                clearTimeout(stashDebouncer);
                stashDebouncer = setTimeout(async () => {
                    await handleStashingTab();
                }, stashDebouncerDelay);
                break;
            default:
                console.log(`Command ${command} not found`);
        }
    });

    chrome.runtime.onMessage.addListener(function onExtensionMessaging(data, sender, sendResponse) {
        (async () => {
            if (data.message === 'stash-current-tab') {
                await handleStashingTab();
                sendResponse('done');
            }
            else if (data.message === 'make-stash-gist') {
                if (!navigator.onLine) {
                    sendResponse('failed');
                    return;
                }
                const gistId = await api.makeStashGistWithToken(data.data.gitToken);
                if (!gistId) {
                    sendResponse('failed');
                    return;
                }
                const stashFromGist = await api.getGistContents();
                await storageSet('stash', stashFromGist.stash);
                sendResponse('done');
            }
        })();
        // Need to return true.
        // See: https://stackoverflow.com/a/57608759
        return true;
    });

    async function handleStashingTab() {
        const gitCreds = await api.getGitCredsSaved();
        if (!navigator.onLine || !gitCreds) { return; }
        const tab = await getCurrentTabData();
        if (!tab) { return; }
        const { favIconUrl, title, url, id } = tab;
        let STASH = await storageGet('stash') ?? [];
        const timestamp = (new Date()).getTime();
        // Incerment the ordering by 1 so that the new link will be at the top with an order of 0 //
        STASH = STASH.map((item) => {
            return {
                ...item,
                order: (Number(item.order) + 1)
            }
        });
        STASH.push({
            title: title ?? 'Untitled',
            favIconUrl, url,
            id: `_stash_${id}_${timestamp}`,
            order: 0
        });
        await storageSet('stash', STASH);
        await sendMessageToActiveTab({
            message: 'tab-added-to-stash'
        });
        await api.setGistContents(STASH);
    }
})();
