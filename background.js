import {
    getCurrentTabData,
    sendMessageToActiveTab,
    storageSet,
    storageGet,
    logThis,
    getGitCredsSaved,
    sync,
    makeStashGist,
    sendErrorToast
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
            storageSet('localLastUpdated', '0');
        })();
    });

    chrome.runtime.onConnect.addListener((port) => {
        if (port.name === "popup") {
            // Triggers on popup close //
            // See: https://stackoverflow.com/a/65563521
            port.onDisconnect.addListener(() => {   
                if (!navigator.onLine) { return; }          
                (async () => {
                    await sync();
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
            else if (data.message === 'sync-stash') {
                await sync();
                sendResponse('done');
            }
            else if (data.message === 'sync-stash-force') {
                await sync(true);
                sendResponse('done');
            }
            else if (data.message === 'make-stash-gist') {
                if (!navigator.onLine) { 
                    sendResponse('failed');
                    return; 
                }               
                const res = await makeStashGist(data.data.gitToken);
                if (res?.id) {
                    await storageSet('gistLink', {
                        link: res?.url ?? 'none',
                        id: res.id
                    });                                   
                }
                else {
                    sendErrorToast('Something went wrong. Please check your Github access token.');
                }  
                await sync(true);              
                sendResponse('done');
            }
        })();
        // Need to return true.
        // See: https://stackoverflow.com/a/57608759
        return true;
    });

    async function handleStashingTab() {
        const gitCreds = await getGitCredsSaved();
        if (!navigator.onLine || !gitCreds) { return; }
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
        await sync();
    }
})();
