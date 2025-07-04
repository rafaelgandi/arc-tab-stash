/**
 * Browser API Abstraction Layer
 * Provides unified API for Chrome and Firefox extension development
 * Handles chrome.* vs browser.* namespace differences and callback/promise patterns
 */

// Detect which browser API is available
const browserAPI = (() => {
    if (typeof browser !== 'undefined' && browser.runtime) {
        return browser; // Firefox (or Chrome with browser namespace)
    }
    if (typeof chrome !== 'undefined' && chrome.runtime) {
        return chrome; // Chrome
    }
    throw new Error('No browser extension API found');
})();

// Helper to promisify Chrome-style callback APIs for consistency
function promisify(fn, context) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            const callback = (result) => {
                if (browserAPI.runtime.lastError) {
                    reject(new Error(browserAPI.runtime.lastError.message));
                } else {
                    resolve(result);
                }
            };
            
            try {
                const result = fn.apply(context, [...args, callback]);
                // If the function returns a promise (Firefox), use that instead
                if (result && typeof result.then === 'function') {
                    result.then(resolve).catch(reject);
                }
            } catch (error) {
                reject(error);
            }
        });
    };
}

// Tabs API
export const tabs = {
    async query(queryInfo) {
        try {
            // Try Firefox-style promise API first
            const result = browserAPI.tabs.query(queryInfo);
            if (result && typeof result.then === 'function') {
                return await result;
            }
            return result;
        } catch (error) {
            // Fallback to Chrome-style callback API
            return promisify(browserAPI.tabs.query, browserAPI.tabs)(queryInfo);
        }
    },

    async sendMessage(tabId, message) {
        try {
            // Try Firefox-style promise API first
            const result = browserAPI.tabs.sendMessage(tabId, message);
            if (result && typeof result.then === 'function') {
                return await result;
            }
            return result;
        } catch (error) {
            // Fallback to Chrome-style callback API
            return promisify(browserAPI.tabs.sendMessage, browserAPI.tabs)(tabId, message);
        }
    },

    async create(createProperties) {
        try {
            // Try Firefox-style promise API first
            const result = browserAPI.tabs.create(createProperties);
            if (result && typeof result.then === 'function') {
                return await result;
            }
            return result;
        } catch (error) {
            // Fallback to Chrome-style callback API
            return promisify(browserAPI.tabs.create, browserAPI.tabs)(createProperties);
        }
    }
};

// Storage API
export const storage = {
    local: {
        async get(keys) {
            try {
                // Try Firefox-style promise API first
                const result = browserAPI.storage.local.get(keys);
                if (result && typeof result.then === 'function') {
                    return await result;
                }
                return result;
            } catch (error) {
                // Fallback to Chrome-style callback API
                return promisify(browserAPI.storage.local.get, browserAPI.storage.local)(keys);
            }
        },

        async set(items) {
            try {
                // Try Firefox-style promise API first
                const result = browserAPI.storage.local.set(items);
                if (result && typeof result.then === 'function') {
                    return await result;
                }
                return result;
            } catch (error) {
                // Fallback to Chrome-style callback API
                return promisify(browserAPI.storage.local.set, browserAPI.storage.local)(items);
            }
        }
    }
};

// Runtime API
export const runtime = {
    // Event listeners (same across browsers)
    onInstalled: browserAPI.runtime.onInstalled,
    onStartup: browserAPI.runtime.onStartup,
    onConnect: browserAPI.runtime.onConnect,
    onMessage: browserAPI.runtime.onMessage,

    async sendMessage(message) {
        try {
            // Try Firefox-style promise API first
            const result = browserAPI.runtime.sendMessage(message);
            if (result && typeof result.then === 'function') {
                return await result;
            }
            return result;
        } catch (error) {
            // Fallback to Chrome-style callback API
            return promisify(browserAPI.runtime.sendMessage, browserAPI.runtime)(message);
        }
    },

    connect(connectInfo) {
        // Same across browsers
        return browserAPI.runtime.connect(connectInfo);
    },

    getManifest() {
        // Same across browsers
        return browserAPI.runtime.getManifest();
    },

    // Error handling
    get lastError() {
        return browserAPI.runtime.lastError;
    }
};

// Commands API
export const commands = {
    // Event listeners (same across browsers)
    onCommand: browserAPI.commands.onCommand
};

// Action API (for setting extension icons)
export const action = {
    async setIcon(details) {
        try {
            // Try Firefox-style promise API first
            const result = browserAPI.action.setIcon(details);
            if (result && typeof result.then === 'function') {
                return await result;
            }
            return result;
        } catch (error) {
            // Fallback to Chrome-style callback API
            return promisify(browserAPI.action.setIcon, browserAPI.action)(details);
        }
    }
};

// Browser detection utilities
export const browserInfo = {
    isChrome: typeof chrome !== 'undefined' && typeof browser === 'undefined',
    isFirefox: typeof browser !== 'undefined',
    
    async getBrowserInfo() {
        if (browserAPI.runtime.getBrowserInfo) {
            return await browserAPI.runtime.getBrowserInfo();
        }
        // Fallback for Chrome
        return {
            name: 'chrome',
            version: 'unknown'
        };
    }
};

// Export the raw browser API for edge cases
export const rawBrowserAPI = browserAPI;

// Default export with all APIs
export default {
    tabs,
    storage,
    runtime,
    commands,
    action,
    browserInfo,
    rawBrowserAPI
}; 