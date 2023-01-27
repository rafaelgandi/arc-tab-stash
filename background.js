

(async () => {
    // console.log(chrome.runtime);
    // setTimeout(() => {
    //     chrome.runtime.sendMessage(chrome.runtime.id, {},  () => {});
    // }, 1000);
    

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

    chrome.runtime.onMessage.addListener(async (data, sender, sendResponse) => {
        if (data.message === 'get-user-tab-stash-from-notion') {
            sendResponse('heyyyyy');
        }
    });

    async function getCurrentTabData() {
        // See: https://stackoverflow.com/a/17826527
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
        return tabs?.[0] ?? undefined;
    }

    async function handleStashingTab() {
        const tab = await getCurrentTabData();
        if (!tab) { return; }
        const { favIconUrl, title, url, id } = tab;

        chrome.tabs.sendMessage(id, {
             message: tab
        }, (response) => {});
    }

})();
