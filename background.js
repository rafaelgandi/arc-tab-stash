

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
            const token = 'secret_7gjlSgBMJPbQdmfSUFP5ZsXFB7sl10RRgcefv7qHxq8';
            const docId = 'c5fcca844538418eb8666b63d9050543';
            const res = await fetch(`https://api.notion.com/v1/blocks/${docId}`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                        "Notion-Version": "2022-02-22",
                    }
                });
            const block = await res.json();    
            console.log(block);
            console.log(JSON.parse(block.code['rich_text'][0]['plain_text']));    
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
        }, (response) => { });
    }

})();
