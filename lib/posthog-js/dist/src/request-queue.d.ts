import { QueuedRequestOptions } from './types';
export declare class RequestQueue {
    private isPaused;
    private queue;
    private flushTimeout?;
    private flushTimeoutMs;
    private sendRequest;
    constructor(sendRequest: (req: QueuedRequestOptions) => void);
    enqueue(req: QueuedRequestOptions): void;
    unload(): void;
    enable(): void;
    private setFlushTimeout;
    private clearFlushTimeout;
    private formatQueue;
}
