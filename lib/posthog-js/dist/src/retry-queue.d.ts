import { RetriableRequestOptions } from './types';
import { PostHog } from './posthog-core';
/**
 * Generates a jitter-ed exponential backoff delay in milliseconds
 *
 * The base value is 6 seconds, which is doubled with each retry
 * up to the maximum of 30 minutes
 *
 * Each value then has +/- 50% jitter
 *
 * Giving a range of 6 seconds up to 45 minutes
 */
export declare function pickNextRetryDelay(retriesPerformedSoFar: number): number;
export declare class RetryQueue {
    private instance;
    private isPolling;
    private poller;
    private pollIntervalMs;
    private queue;
    private areWeOnline;
    constructor(instance: PostHog);
    retriableRequest({ retriesPerformedSoFar, ...options }: RetriableRequestOptions): void;
    private enqueue;
    private poll;
    private flush;
    unload(): void;
}
