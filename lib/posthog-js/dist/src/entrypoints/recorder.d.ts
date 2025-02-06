import { record as rrwebRecord } from '@rrweb/record';
import type { RecordPlugin } from '@rrweb/types';
import { CapturedNetworkRequest, NetworkRecordOptions } from '../types';
export type NetworkData = {
    requests: CapturedNetworkRequest[];
    isInitial?: boolean;
};
export declare function findLast<T>(array: Array<T>, predicate: (value: T) => boolean): T | undefined;
export declare const NETWORK_PLUGIN_NAME = "rrweb/network@1";
export declare const getRecordNetworkPlugin: (options?: NetworkRecordOptions) => RecordPlugin;
export default rrwebRecord;
