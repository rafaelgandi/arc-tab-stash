import { getCurrentTabData, getNotionCodeBlockContents, sendMessageToActiveTab, storageSet, storageGet } from './lib/helpers.js';


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
                const token = 'secret_7gjlSgBMJPbQdmfSUFP5ZsXFB7sl10RRgcefv7qHxq8';
                const blockId = 'c5fcca844538418eb8666b63d9050543';
                const blockContents = await getNotionCodeBlockContents(token, blockId);
                console.log(JSON.parse(blockContents));
                sendResponse('heyyyyy');
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
        STASH.push({
            favIconUrl, title, url, 
            id: `_stash_${id}_${timestamp}`, 
            order: STASH.length
        });
        await storageSet('stash', STASH);
    }
})();
