import type { eventWithTime } from '@rrweb/types';
import { rrwebRecord } from './sessionrecording-utils';
export declare class MutationRateLimiter {
    private readonly rrweb;
    private readonly options;
    private bucketSize;
    private refillRate;
    private mutationBuckets;
    private loggedTracker;
    constructor(rrweb: rrwebRecord, options?: {
        bucketSize?: number;
        refillRate?: number;
        onBlockedNode?: (id: number, node: Node | null) => void;
    });
    private refillBuckets;
    private getNodeOrRelevantParent;
    private numberOfChanges;
    throttleMutations: (event: eventWithTime) => eventWithTime | undefined;
}
