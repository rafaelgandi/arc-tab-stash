// See: https://simplecrypto.js.org/docs/
import "./encrypt.min.js";
import { tabs as browserTabs, storage as browserStorage, runtime as browserRuntime, action as browserAction } from "./browser-api.js";

export async function getCurrentTabData() {
	// See: https://stackoverflow.com/a/17826527
	const tabs = await browserTabs.query({ active: true, currentWindow: true });
	return tabs?.[0] ?? undefined;
}

export async function sendMessageToActiveTab(data) {
	const tab = await getCurrentTabData();
	if (!tab) {
		return;
	}
	try {
		const response = await browserTabs.sendMessage(tab.id, data);
		return response ?? undefined;
	} catch (error) {
		return undefined;
	}
}

export async function sendMessageToBg(data) {
	try {
		const response = await browserRuntime.sendMessage(data);
		return response ?? undefined;
	} catch (error) {
		return undefined;
	}
}

export function sendErrorToast(message) {
	sendMessageToActiveTab({
		message: "toast-this",
		data: {
			toast: message,
			type: "danger"
		}
	});
}

export async function storageGet(key) {
	const val = await browserStorage.local.get([key]);
	//return JSON.stringify(val);
	if (!val?.[key]) {
		return undefined;
	}
	try {
		//logThis([key, val?.[key]]);
		return JSON.parse(val?.[key]);
	} catch (err) {
		handleError(err.message);
		return undefined;
	}
}
storageGet.raw = async (key) => {
	const val = await browserStorage.local.get([key]);
	return val?.[key];
};

export async function storageSet(key, value) {
	return await browserStorage.local.set({
		[key]: JSON.stringify(value)
	});
}

storageSet.raw = async (key, value) => {
	return await browserStorage.local.set({
		[key]: value
	});
};

export function openInNewTab(url) {
	return browserTabs.create({ url });
}

export function logThis(val) {
	console.log(val);
	sendMessageToActiveTab({
		message: "log-please",
		data: val
	});
}

export function isValidJson(jsonString) {
	try {
		JSON.parse(jsonString);
		return true;
	} catch (err) {
		return false;
	}
}

export function handleError(errMessage, myMessage = null) {
	logThis(["ERROR:", errMessage]);
	if (myMessage) {
		sendErrorToast(myMessage);
	}
}

export async function encrypt(str) {
	const gitToken = await storageGet("gitToken");
	if (!gitToken) {
		return str;
	}
	const crypto = new SimpleCrypto(gitToken);
	return crypto.encrypt(str);
}

export async function decrypt(str) {
	const gitToken = await storageGet("gitToken");
	if (!gitToken) {
		return str;
	}
	const crypto = new SimpleCrypto(gitToken);
	return crypto.decrypt(str);
}

export function getVersionFromManifest() {
	return browserRuntime.getManifest().version;
}

export function isInDevMode() {
	return !!browserRuntime.getManifest()?.debug;
}

export async function setExtensionIcon(useDevIcon = false) {
    try {
        if (useDevIcon) {
            // Set dev mode icon
            await browserAction.setIcon({
                path: {
                    16: 'assets/dev-icons/16x16.png',
                    48: 'assets/dev-icons/48x48.png',
                    128: 'assets/dev-icons/128x128.png'
                }
            });
        }
        else {
            // Set normal icons
            await browserAction.setIcon({
                path: {
                    16: 'assets/icons/16x16.png',
                    48: 'assets/icons/48x48.png',
                    128: 'assets/icons/128x128.png'
                }
            });
        }
    }
    catch (error) {
        console.warn('Failed to set extension icon:', error);
    }
}

export function toggleStyleElement(id, shouldCreate, cssText = "") {
	if (!document) {
		return;
	}
	const styleElementId = id + "-style";
	const existingStyle = document.getElementById(styleElementId);
	if (shouldCreate) {
		if (!existingStyle) {
			const styleElement = document.createElement("style");
			styleElement.id = styleElementId;
			styleElement.textContent = cssText;
			styleElement.setAttribute("data-dynamic-style", "true");
			document.head.appendChild(styleElement);
		}
	} else {
		if (existingStyle) {
			existingStyle.remove();
		}
	}
}

export function tokenToHash(token) {
	// Simple hash function
	let hash = 0;
	for (let i = 0; i < token.length; i++) {
		const char = token.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash = hash & hash; // Convert to 32-bit integer
	}

	// Make hash positive and convert to base36 (0-9, a-z)
	const positiveHash = Math.abs(hash);
	let result = positiveHash.toString(36);

	// Ensure exactly 6 characters
	if (result.length >= 6) {
		return result.substring(0, 6);
	} else {
		// Pad with additional hash iterations if needed
		while (result.length < 6) {
			hash = ((hash << 3) + hash + 7) & 0x7fffffff;
			result += Math.abs(hash).toString(36);
		}
		return result.substring(0, 6);
	}
}


export function guard(func) {
    return new Promise(async (resolve) => {
        try {
            const res = await func();
            resolve({
                result: res,
                error: null
            });
        }
        catch (err) {
            resolve({
                result: null,
                error: err
            });
        }
    });
}
// For syncronous guarding
guard.let = function (func) {
    try {
        const res = func();
        return {
            result: res,
            error: null
        };
    }
    catch (err) {
        return {
            result: null,
            error: err
        };
    }
};

export function isFirefoxBasedBrowser() {
    return typeof InstallTrigger !== 'undefined' || 
    navigator.userAgent.indexOf('Firefox') > -1 ||
    /Firefox/.test(navigator.userAgent);
}
