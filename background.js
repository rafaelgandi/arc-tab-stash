import {
    getCurrentTabData,
    sendMessageToActiveTab,
    storageSet,
    storageGet,
    logThis,
    getGitCredsSaved,
    setGistContents,
    updateLocalStashWithDataFromGist
} from './lib/helpers.js';


(async () => {
    let stashDebouncer = undefined;
    const stashDebouncerDelay = 800; // ms

    chrome.runtime.onInstalled.addListener(() => {
        console.log('Running on install listeners');
        (async () => {
            const res = await storageGet('stash');
            if (!res) {
                storageSet('stash', []);
            }
            const gitToken = await storageGet('gitToken');
            if (!gitToken) {
                storageSet('gitToken', '');
            }
            const gistLink = await storageGet('gistLink');
            if (!gistLink) {
                storageSet('gistLink', {
                    link: '',
                    id: ''
                });
            }
            // LM: 2023-02-11 14:15:27 []
            const lastInitialSync = await storageGet('lastInitialSync');
            if (!lastInitialSync) {
                storageSet('lastInitialSync', '');
            }
        })();
    });

    chrome.runtime.onConnect.addListener((port) => {
        if (port.name === "popup") {
            // Triggers on popup close //
            // See: https://stackoverflow.com/a/65563521
            port.onDisconnect.addListener(() => {
                if (!navigator.onLine) { return; }
                //    logThis(["popup has been closed"]);
                (async () => {
                    const lastInitialSync = await storageGet('lastInitialSync');
                    if (!lastInitialSync) { return; } // If first time opening the popup, dont sync yet.
                    const gitCreds = await getGitCredsSaved();
                    let STASH = await storageGet('stash');
                    if (!gitCreds) { return; }
                    await setGistContents(gitCreds.token, gitCreds.gist.id, STASH);
                })();
            });
        }
    });

    // See: https://dev.to/paulasantamaria/adding-shortcuts-to-your-chrome-extension-2i20
    chrome.commands.onCommand.addListener((command) => {
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

    chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
        (async () => {
            if (data.message === 'stash-current-tab') {
                clearTimeout(stashDebouncer);
                stashDebouncer = setTimeout(async () => {
                    await handleStashingTab();
                    sendResponse('done');
                }, stashDebouncerDelay);
            }
            else if (data.message === 'get-stash-from-gist') {
                await updateLocalStashWithDataFromGist();
                sendResponse('done');
            }
        })();
        // Need to return true.
        // See: https://stackoverflow.com/a/57608759
        return true;
    });

    async function handleStashingTab() {
        const tab = await getCurrentTabData();
        if (!tab) { return; }
        const { favIconUrl, title, url, id } = tab;
        let STASH = await storageGet('stash') ?? [];
        const timestamp = (new Date()).getTime();
        // Move the ordering by 1 so that the new link will be at the top //
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

        if (navigator.onLine) {
            const gitCreds = await getGitCredsSaved();
            if (gitCreds) {
                await setGistContents(gitCreds.token, gitCreds.gist.id, STASH);
                logThis(['data saved to gist.', STASH]);
            }
        }
    }

    // Update local stash with data from gist every 5min //
    const pollDelay = 1000 * 60 * 5; // 5min
    setTimeout(async function pollStashData() {
        await updateLocalStashWithDataFromGist();
        setTimeout(pollStashData, pollDelay);
    }, pollDelay);
})();
