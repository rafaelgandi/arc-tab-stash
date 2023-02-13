
// See: https://simplecrypto.js.org/docs/
import './SimpleCrypto.min.js';

export const STASH_GIST_FILENAME = 'stash.json';

export async function getCurrentTabData() {
    // See: https://stackoverflow.com/a/17826527
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    return tabs?.[0] ?? undefined;
}

// See: https://dev.to/rikurouvila/how-to-use-a-github-gist-as-a-free-database-20np
export async function getGistContents(gistId) {
    try {
        const req = await fetch(`https://api.github.com/gists/${gistId}`);
        const gist = await req.json();
        let content = gist.files[STASH_GIST_FILENAME].content;
        if (content.trim() === '') {
            content = [];
        }
        else {
            content =  await decrypt(content.trim());
        }
        return content;
    }
    catch (err) {
        sendErrorToast('Something went wrong while getting your stash data.');
        logThis(['error', err.message]);
        return undefined;
    }
}

// See: https://dev.to/rikurouvila/how-to-use-a-github-gist-as-a-free-database-20np
export async function setGistContents(gitToken, gistId, data) {
    try {
        const dataToSend = await encrypt(JSON.stringify(data));
        logThis(['sending data to gist...']);
        const req = await fetch(`https://api.github.com/gists/${gistId}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${gitToken}`,
            },
            body: JSON.stringify({
                files: {
                    [STASH_GIST_FILENAME]: {
                        content: dataToSend,
                    },
                },
            }),
        });
        await storageSet('stash', data);
        return await req.json();
    }
    catch (err) {
        sendErrorToast('Something went wrong while syncing your stash.');
        return undefined;
    }    
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

export async function storageGet(key) {
    const val = await chrome.storage.local.get([key]);
    //return JSON.stringify(val);
    if (!val?.[key]) {
        return undefined;
    }
    try {
        //logThis([key, val?.[key]]);
        return JSON.parse(val?.[key]);
    }
    catch (err) {
        return undefined;
    }
}

export async function storageSet(key, value) {
    return await chrome.storage.local.set({
        [key]: JSON.stringify(value)
    });
}

export function openInNewTab(url) {
    return chrome.tabs.create({ url });
}

export function removeFromStash(STASH, stashId) {
    return STASH.filter((item) => !(item.id.toString() === stashId));
}

export function logThis(val) {
    console.log(val);
    sendMessageToActiveTab({
        message: 'log-please',
        data: val
    });
}

export function insertStylesFrom(cssPath) {
    var link = document.createElement('link');
    link.href = chrome.extension.getURL(cssPath);
    link.id = 'Your Stylish!';
    link.type = 'text/css';
    link.rel = 'stylesheet';
    document.documentElement.insertBefore(link);
}

export function sendErrorToast(message) {
    sendMessageToActiveTab({
        message: 'toast-this',
        data: {
            toast: message,
            type: 'danger'
        }
    });
}

export function isValidJson(jsonString) {
    try {
        JSON.parse(jsonString);
        return true;
    }
    catch (err) {
        return false;
    }
}

export async function getGitCredsSaved() {
    const gitToken = await storageGet('gitToken');
    const gistLink = await storageGet('gistLink');
    if (!gitToken.trim()) { return undefined; }
    if (!gistLink?.link) { return undefined; }
    if (!gistLink.link.trim()) { return undefined; }
    return {
        token: gitToken,
        gist: gistLink
    }
}

export async function encrypt(str) {
    const gitToken = await storageGet('gitToken');
    if (!gitToken) { return str; }
    const crypto = new SimpleCrypto(gitToken);
    return crypto.encrypt(str);
}

export async function decrypt(str) {
    const gitToken = await storageGet('gitToken');
    if (!gitToken) { return str; }
    const crypto = new SimpleCrypto(gitToken);
    return crypto.decrypt(str);
}

export function isLessThan30MinAgo(date) {
    // See: https://stackoverflow.com/questions/9224773/check-if-date-is-less-than-1-hour-ago
    const THIRTY_MIN = 1000 * 60 * 30;
    const pastTime = Date.now() - THIRTY_MIN;
    return date > pastTime;
}

export function isLessThan10MinAgo(date) {
    // See: https://stackoverflow.com/questions/9224773/check-if-date-is-less-than-1-hour-ago
    const TEN_MIN = 1000 * 60 * 10;
    const pastTime = Date.now() - TEN_MIN;
    return date > pastTime;
}

export async function updateLocalStashWithDataFromGist() {
    if (!navigator.onLine) { return; }
    const gitCreds = await getGitCredsSaved();
    if (gitCreds) {
        const stashFromGist = await getGistContents(gitCreds.gist.id);
        if (stashFromGist && stashFromGist instanceof Array) {
            await storageSet('stash', stashFromGist);
            logThis(['Local stash have been updated.']);
        }
    }
}