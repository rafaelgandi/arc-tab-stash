import { 
    getCurrentTabData, 
    getNotionCodeBlockContents, 
    sendMessageToActiveTab, 
    storageSet, 
    storageGet, 
    logThis, 
    saveToNotionCodeBlock,
    sendErrorToast 
} from './lib/helpers.js';


(async () => {
    // console.log(chrome.runtime);
    // setTimeout(() => {
    //     chrome.runtime.sendMessage(chrome.runtime.id, {},  () => {});
    // }, 1000);

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
    chrome.commands.onCommand.addListener(async (command) => {
        switch (command) {
            case 'stash-current-tab':
                await handleStashingTab();
                break;
            default:
                console.log(`Command ${command} not found`);
        }
    });

    chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
        (async () => {
            if (data.message === 'get-user-tab-stash-from-notion') {
                const notionToken = await storageGet('notionToken');
                const notionCodeBlock = await storageGet('notionCodeBlock');
                const blockContents = await getNotionCodeBlockContents(notionToken, notionCodeBlock?.blockId ?? '');
                
                console.log(blockContents)
                
                console.log(JSON.parse(blockContents));
                sendResponse('heyyyyy');
            }
            else if (data.message === 'stash-current-tab') {
                await handleStashingTab();
                sendResponse({
                    message: 'tab stashed!',
                    success: true
                });
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
        let STASH =  await storageGet('stash') ?? [];
        const timestamp = (new Date()).getTime();
        await sendMessageToActiveTab( {
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
        const notionToken = await storageGet('notionToken');
        const notionCodeBlock = await storageGet('notionCodeBlock');
        const res = await saveToNotionCodeBlock(notionToken, notionCodeBlock?.blockId ?? '', STASH);
        if (!res) {
            sendErrorToast('Something went wrong while trying to save your stash to notion.');
        }
    }



    logThis({
        online: navigator.onLine
    });
})();
