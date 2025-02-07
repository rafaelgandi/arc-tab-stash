
// See: https://simplecrypto.js.org/docs/
import './encrypt.min.js';

export async function getCurrentTabData() {
    // See: https://stackoverflow.com/a/17826527
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    return tabs?.[0] ?? undefined;
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

export function sendErrorToast(message) {
    sendMessageToActiveTab({
        message: 'toast-this',
        data: {
            toast: message,
            type: 'danger'
        }
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

export function isValidJson(jsonString) {
    try {
        JSON.parse(jsonString);
        return true;
    }
    catch (err) {
        return false;
    }
}

export function handleError(errMessage, myMessage = null) {
    logThis(['ERROR:', errMessage]);
    if (myMessage) {
        sendErrorToast(myMessage);
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


export function getVersionFromManifest() {
	return chrome.runtime.getManifest().version;
}

export function isInDevMode() {
	return !!chrome.runtime.getManifest()?.debug;
}