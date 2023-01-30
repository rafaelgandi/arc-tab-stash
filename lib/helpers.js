

export  async function getCurrentTabData() {
    // See: https://stackoverflow.com/a/17826527
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    return tabs?.[0] ?? undefined;
}

function getNotionRequestHeaders(notionToken) {
    return {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${notionToken}`,
        "Notion-Version": "2022-02-22",
    };
}

export async function getNotionCodeBlockContents(notionToken, notionBlockId) {
    const res = await fetch(`https://api.notion.com/v1/blocks/${notionBlockId}`, {
        method: "GET",
        headers: getNotionRequestHeaders(notionToken)
    });
    const block = await res.json();
    return block?.code?.['rich_text']?.[0]?.['plain_text'] ?? undefined;  
}

export async function sendMessageToActiveTab(data) {
    const tab = await getCurrentTabData();
    if (!tab) { return; }
    return new Promise((resolve) => {
        chrome.tabs.sendMessage(tab.id, data, (response) => {
            resolve(response ?? undefined);
            return false;
        });
    });
}

export async function sendMessageToBg(data) {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage(data, (response) => {
            resolve(response ?? undefined);
            return false;
        });
    });
}

