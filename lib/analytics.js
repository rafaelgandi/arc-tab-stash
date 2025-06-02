import posthog from './posthog-js/dist/ph-full.js';
import { isInDevMode } from './helpers.js';

export function capture(event, properties) {
    if (isInDevMode()) {
        console.log('analytics: capture', event, properties);
        return;
    }
    posthog.capture(event, properties);
}

export function identify(iden, properties = {}) {
    if (isInDevMode()) {
        console.log('analytics: identify', iden, properties);
        return;
    }
    posthog.identify(iden, properties);
}

export function reset() {
    if (isInDevMode()) {
        console.log('analytics: reset');
        return;
    }
    posthog.reset();
}