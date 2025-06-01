import posthog from './lib/posthog-js/dist/ph-full.js';
import { isInDevMode } from './helpers.js';

export function capture(event, properties) {
    if (isInDevMode()) {
        console.log('analytics: capture', event, properties);
        return;
    }
    posthog.capture(event, properties);
}

export function identify(properties) {
    if (isInDevMode()) {
        console.log('analytics: identify', properties);
        return;
    }
    posthog.identify(properties);
}

export function reset() {
    if (isInDevMode()) {
        console.log('analytics: reset');
        return;
    }
    posthog.reset();
}