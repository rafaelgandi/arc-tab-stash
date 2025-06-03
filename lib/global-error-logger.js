import * as analytics from './analytics.js';
const global = window;
// From ai:
// Create a normalized error handler
function normalizeErrorEvent(event) {
    var _a, _b;
    // Initialize with default values
    const normalizedError = {
        logger: 'setUpAuGlobalErrorLogger()',
        message: 'Unknown error',
        stack: null,
        source: global.location.href, // Current page by default
        timestamp: new Date().toISOString(),
        userAgent: (_a = navigator === null || navigator === void 0 ? void 0 : navigator.userAgent) !== null && _a !== void 0 ? _a : 'Unknown user agent'
    };
    // Handle standard error events
    if (event.type === 'error') {
        const errorEvent = event;
        const errorObj = errorEvent.error || new Error(errorEvent.message || 'Unknown error');
        normalizedError.message = errorObj.message || errorEvent.message || 'Unknown error';
        normalizedError.stack = errorObj.stack || null;
        // If error event contains source information
        if (errorEvent.filename) {
            normalizedError.source = errorEvent.filename;
            // Add line and column info if available
            if (errorEvent.lineno) {
                normalizedError.source += `:${errorEvent.lineno}`;
                if (errorEvent.colno) {
                    normalizedError.source += `:${errorEvent.colno}`;
                }
            }
        }
    }
    // Handle unhandled promise rejections
    else if (event.type === 'unhandledrejection') {
        const rejectionEvent = event;
        const reason = rejectionEvent.reason;
        // Check if rejection reason is an Error object
        if (reason instanceof Error) {
            normalizedError.message = reason.message;
            normalizedError.stack = (_b = reason === null || reason === void 0 ? void 0 : reason.stack) !== null && _b !== void 0 ? _b : null;
        }
        else {
            // For non-Error rejections (could be string, object, etc.)
            try {
                normalizedError.message = typeof reason === 'string' ? reason : JSON.stringify(reason);
            }
            catch (e) {
                normalizedError.message = 'Unhandled Promise rejection with non-stringable reason';
            }
        }
    }
    return normalizedError;
}
// From ai:
export default function setUpAuGlobalErrorLogger() {
    // Cache to store recent errors
    const errorCache = {};
    // Configuration options
    const CONFIG = {
        // Only send the same error once per this many milliseconds
        dedupWindow: 5000,
        // Maximum number of errors to log per window
        maxErrorsPerWindow: 5,
        // Window size in milliseconds
        windowSize: 10000,
    };
    // Track error count within the current window
    let windowErrorCount = 0;
    let windowStartTime = Date.now();
    // Reset window counters periodically
    const resetWindow = () => {
        windowErrorCount = 0;
        windowStartTime = Date.now();
    };
    // Check if we're rate limiting
    setInterval(resetWindow, CONFIG.windowSize);
    function debouncedHandler(e) {
        const errorData = normalizeErrorEvent(e);
        const now = Date.now();
        // Check if window should be reset
        if (now - windowStartTime > CONFIG.windowSize) {
            resetWindow();
        }
        // Rate limiting: check if we've hit the maximum errors for this window
        if (windowErrorCount >= CONFIG.maxErrorsPerWindow) {
            // Only log once when we hit the limit
            if (windowErrorCount === CONFIG.maxErrorsPerWindow) {
                console.warn(`Error rate limit reached: logged ${windowErrorCount} errors in the last ${CONFIG.windowSize}ms. Some errors will be suppressed.`);
                // Optionally send a summary error
                analytics.capture('sh-error-rate-limit', {
                    message: `Rate limited: more than ${CONFIG.maxErrorsPerWindow} errors in ${CONFIG.windowSize}ms`,
                    timestamp: new Date().toISOString()
                });
                windowErrorCount++; // Increment to avoid logging the warning again
            }
            return;
        }
        // Create a key for deduplication (using message and source)
        const errorKey = `${errorData.message}:${errorData.source}`;
        // Check if this error was recently logged
        if (errorCache[errorKey]) {
            const cachedError = errorCache[errorKey];
            // If the same error happened recently, just increment the count
            if (now - cachedError.timestamp < CONFIG.dedupWindow) {
                cachedError.count++;
                cachedError.timestamp = now;
                return; // Skip logging this duplicate
            }
        }
        // If we get here, log the error
        // console.log(errorData, 'setUpAuGlobalErrorLogger()');
        // Add count info for analytics if this error was deduplicated
        if (errorCache[errorKey] && errorCache[errorKey].count > 1) {
            analytics.capture('sh-error', Object.assign(Object.assign({}, errorData), { occurrences: errorCache[errorKey].count }));
            // Reset the count
            errorCache[errorKey].count = 1;
        }
        else {
            // First occurrence
            analytics.capture('sh-error', errorData);
        }
        // Update the cache
        errorCache[errorKey] = {
            error: errorData,
            count: 1,
            timestamp: now
        };
        // Clean up old cache entries
        for (const key in errorCache) {
            if (now - errorCache[key].timestamp > CONFIG.dedupWindow * 2) {
                delete errorCache[key];
            }
        }
        // Update window counter
        windowErrorCount++;
    }
    // Set up the event listeners
    global.addEventListener('error', debouncedHandler);
    global.addEventListener('unhandledrejection', debouncedHandler);
    // Return a function to remove the listeners if needed
    return function cleanup() {
        global.removeEventListener('error', debouncedHandler);
        global.removeEventListener('unhandledrejection', debouncedHandler);
    };
}
