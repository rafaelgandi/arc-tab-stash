
// See: https://simplecrypto.js.org/docs/
import './SimpleCrypto.min.js';

export const STASH_GIST_FILENAME = 'stash.json';

function gitHubHeaders(token) {
    return {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "X-GitHub-Api-Version": '2022-11-28'
    };
}

export async function getCurrentTabData() {
    // See: https://stackoverflow.com/a/17826527
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    return tabs?.[0] ?? undefined;
}

// See: https://dev.to/rikurouvila/how-to-use-a-github-gist-as-a-free-database-20np
export async function getGistContents() {
    const gitCreds = await getGitCredsSaved();
    try {
        const req = await fetch(`https://api.github.com/gists/${gitCreds.gist.id}`, {
            method: "GET",
            headers: gitHubHeaders(gitCreds.token)
        });
        const gist = await req.json();
        // logThis(['from gist', gist]);
        let content = gist.files[STASH_GIST_FILENAME].content;
        if (content.trim() === '0') {
            content = {
                gistLastUpdated: 0,
                stash: []
            };
        }
        else {
            content = await decrypt(content.trim());
            if (!content?.gistLastUpdated) {
                throw new Error('Malformed JSON from gist.');
            }
        }
        return content;
    }
    catch (err) {
        // logThis(['foo', err.message]);
        const errMsg = err.message.toLowerCase();
        // LM: 2023-02-23 06:55:36 [ If Encrypted data is malformed we replace it with the one on the local stash] //
        if (errMsg.indexOf('invalid') !== -1 && errMsg.indexOf('encrypted') !== -1) { 
            const STASH = await storageGet('stash');
            await setGistContents(STASH);
            return await getGistContents();
        }
        handleError(err.message, 'Red alert captain! Unable to get your stash data. Please check your Github Access Token.');
        return undefined;
    }
}

// See: https://dev.to/rikurouvila/how-to-use-a-github-gist-as-a-free-database-20np
export async function setGistContents(data) {
    const gitCreds = await getGitCredsSaved();
    if (!gitCreds) { return; }
    try {
        const payload = {
            gistLastUpdated: (new Date()).getTime().toString(),
            stash: data
        }
        const dataToSend = await encrypt(JSON.stringify(payload));
        // logThis(['sending data to gist...']);
        const req = await fetch(`https://api.github.com/gists/${gitCreds.gist.id}`, {
            method: "PATCH",
            headers: gitHubHeaders(gitCreds.token),
            body: JSON.stringify({
                files: {
                    [STASH_GIST_FILENAME]: {
                        content: dataToSend,
                    },
                },
            })
        });
        await storageSet('stash', data);
        return await req.json();
    }
    catch (err) {
        handleError(err.message);
        return;
    }
}

export async function makeStashGistWithToken(gitToken) {
    const stashGist = await getStashGist(gitToken);
    if (stashGist) {
        return stashGist;
    }
    // See: https://docs.github.com/en/rest/gists/gists?apiVersion=2022-11-28#create-a-gist
    try {
        const req = await fetch(`https://api.github.com/gists`, {
            method: "POST",
            headers: gitHubHeaders(gitToken),
            body: JSON.stringify({
                "description": "This is where your Stash data is saved.",
                "public": false,
                "files": {
                    [STASH_GIST_FILENAME]: {
                        "content": '0'
                    }
                }
            })
        });
        const res =  await req.json();
        return res;
    }
    catch (err) {
        sendErrorToast('Something went wrong. Please check your Github access token.');
        handleError(err.message)
        return;
    }
}

export async function getListOfGist(gitToken) {
    // See: https://docs.github.com/en/rest/gists/gists?apiVersion=2022-11-28#list-gists-for-the-authenticated-user
    try {
        const req = await fetch(`https://api.github.com/gists?per_page=100`, {
            method: "GET",
            headers: gitHubHeaders(gitToken)
        });
        const res =  await req.json();
        // logThis(['List of gists', res]);
        return res;
    }
    catch (err) {
        // sendErrorToast('Something went wrong. Please check your Github access token.');
        handleError(err.message);
        return [];
    }
}

export async function getStashGist(gitToken) {
    const gists = await getListOfGist(gitToken);
    if (!gists.length) { return undefined; }
    for (let i = 0; i < gists.length; i++) {
        if (Object.keys(gists[i].files).indexOf(STASH_GIST_FILENAME) !== -1) {
            return gists[i];
        }
    }
    return;
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
        handleError(err.message);
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


export function isLessThan10MinAgo(date) {
    // See: https://stackoverflow.com/questions/9224773/check-if-date-is-less-than-1-hour-ago
    const TEN_MIN = 1000 * 60 * 10;
    const pastTime = Date.now() - TEN_MIN;
    return date > pastTime;
}

export function handleError(errMessage, myMessage = null) {
    logThis(['ERROR:', errMessage]);
    if (myMessage) {
        sendErrorToast(myMessage);
    }
}