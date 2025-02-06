import { ErrorProperties } from '../extensions/exception-autocapture/error-conversion';
import type { PostHog } from '../posthog-core';
import { SessionIdManager } from '../sessionid';
import { DeadClicksAutoCaptureConfig, ErrorEventArgs, ErrorMetadata, Properties, RemoteConfig, SiteAppLoader } from '../types';
declare const win: (Window & typeof globalThis) | undefined;
export type AssignableWindow = Window & typeof globalThis & Record<string, any> & {
    __PosthogExtensions__?: PostHogExtensions;
    _POSTHOG_REMOTE_CONFIG?: Record<string, {
        config: RemoteConfig;
        siteApps: SiteAppLoader[];
    }>;
};
/**
 * This is our contract between (potentially) lazily loaded extensions and the SDK
 * changes to this interface can be breaking changes for users of the SDK
 */
export type PostHogExtensionKind = 'toolbar' | 'exception-autocapture' | 'web-vitals' | 'recorder' | 'tracing-headers' | 'surveys' | 'dead-clicks-autocapture' | 'remote-config';
export interface LazyLoadedDeadClicksAutocaptureInterface {
    start: (observerTarget: Node) => void;
    stop: () => void;
}
interface PostHogExtensions {
    loadExternalDependency?: (posthog: PostHog, kind: PostHogExtensionKind, callback: (error?: string | Event, event?: Event) => void) => void;
    loadSiteApp?: (posthog: PostHog, appUrl: string, callback: (error?: string | Event, event?: Event) => void) => void;
    parseErrorAsProperties?: ([event, source, lineno, colno, error]: ErrorEventArgs, metadata?: ErrorMetadata) => ErrorProperties;
    errorWrappingFunctions?: {
        wrapOnError: (captureFn: (props: Properties) => void) => () => void;
        wrapUnhandledRejection: (captureFn: (props: Properties) => void) => () => void;
    };
    rrweb?: {
        record: any;
        version: string;
    };
    rrwebPlugins?: {
        getRecordConsolePlugin: any;
        getRecordNetworkPlugin?: any;
    };
    canActivateRepeatedly?: (survey: any) => boolean;
    generateSurveys?: (posthog: PostHog) => any | undefined;
    postHogWebVitalsCallbacks?: {
        onLCP: (metric: any) => void;
        onCLS: (metric: any) => void;
        onFCP: (metric: any) => void;
        onINP: (metric: any) => void;
    };
    tracingHeadersPatchFns?: {
        _patchFetch: (sessionManager?: SessionIdManager) => () => void;
        _patchXHR: (sessionManager?: SessionIdManager) => () => void;
    };
    initDeadClicksAutocapture?: (ph: PostHog, config: DeadClicksAutoCaptureConfig) => LazyLoadedDeadClicksAutocaptureInterface;
}
export declare const ArrayProto: any[];
export declare const nativeForEach: (callbackfn: (value: any, index: number, array: any[]) => void, thisArg?: any) => void;
export declare const nativeIndexOf: (searchElement: any, fromIndex?: number) => number;
export declare const navigator: Navigator | undefined;
export declare const document: Document | undefined;
export declare const location: Location | undefined;
export declare const fetch: typeof globalThis.fetch | undefined;
export declare const XMLHttpRequest: {
    new (): XMLHttpRequest;
    prototype: XMLHttpRequest;
    readonly UNSENT: 0;
    readonly OPENED: 1;
    readonly HEADERS_RECEIVED: 2;
    readonly LOADING: 3;
    readonly DONE: 4;
} | undefined;
export declare const AbortController: {
    new (): AbortController;
    prototype: AbortController;
} | undefined;
export declare const userAgent: string | undefined;
export declare const assignableWindow: AssignableWindow;
export { win as window };
