import {
    getCurrentTabData,
    getNotionCodeBlockContents,
    sendMessageToActiveTab,
    storageSet,
    storageGet,
    logThis,
    saveToNotion,
    sendErrorToast,
    getNotionCredsSaved,
    clearAllNotionPageCodeBlocks
} from './lib/helpers.js';


(async () => {
    let stashDebouncer = undefined;
    let notionSaveDebouncer = undefined;
    const stashDebouncerDelay = 800; // ms
    const notionSaveDebouncerDelay = 30000; // 30 sec

    chrome.runtime.onInstalled.addListener(() => {
        console.log('running on install listener');
        (async () => {
            const res = await storageGet('stash');
            if (!res) {
                storageSet('stash', []);
            }
            const notionToken = await storageGet('notionToken');
            if (!notionToken) {
                storageSet('notionToken', '');
            }
            const notionCodeBlock = await storageGet('notionCodeBlock');
            if (!notionCodeBlock) {
                storageSet('notionCodeBlock', {
                    link: '',
                    blockId: ''
                });
            }
        })();
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
            if (data.message === 'get-user-tab-stash-from-notion') {
                const notionCreds = await getNotionCredsSaved();
                if (!notionCreds) {
                    // sendErrorToast('Stash: Please set your notion integration.');
                    return;
                }
                // const blockContents = await getNotionCodeBlockContents(notionCreds.token, notionCreds.codeBlock.blockId);               

                // console.log(blockContents)              
                // console.log(JSON.parse(blockContents));
            }
            else if (data.message === 'stash-current-tab') {
                clearTimeout(stashDebouncer);
                stashDebouncer = setTimeout(async () => {
                    await handleStashingTab();
                    sendResponse('done');
                }, stashDebouncerDelay);
            }
        })();
        // Need to return true.
        // See: https://stackoverflow.com/a/57608759
        return true;
    });

    async function handleStashingTab() {
        clearTimeout(notionSaveDebouncer);
        const tab = await getCurrentTabData();
        if (!tab) { return; }
        const { favIconUrl, title, url, id } = tab;
        let STASH = await storageGet('stash') ?? [];
        const timestamp = (new Date()).getTime();
        await sendMessageToActiveTab({
            message: 'tab-added-to-stash',
            tabData: tab
        });
        // Move the ordering by 1 so that the new link will be at the top //
        STASH = STASH.map((item) => {
            return {
                ...item,
                order: (Number(item.order) + 1)
            }
        });
        STASH.push({
            favIconUrl, title, url,
            id: `_stash_${id}_${timestamp}`,
            order: 0
        });
        await storageSet('stash', STASH);
        console.log('Notion save scheduled...');
        notionSaveDebouncer = setTimeout(async () => {
            console.log('Notion save started: ' + (new Date()).toLocaleTimeString());
            const notionCreds = await getNotionCredsSaved();
            const res = await saveToNotion(notionCreds.token, notionCreds.codeBlock.blockId, STASH);
            if (!res) {
                sendErrorToast('Something went wrong while trying to save your stash to notion.');
            }
        }, notionSaveDebouncerDelay);
    }


})();
