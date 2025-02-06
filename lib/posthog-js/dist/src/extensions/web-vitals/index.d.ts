import { PostHog } from '../../posthog-core';
import { RemoteConfig, SupportedWebVitalsMetrics } from '../../types';
export declare const DEFAULT_FLUSH_TO_CAPTURE_TIMEOUT_MILLISECONDS = 5000;
export declare const FIFTEEN_MINUTES_IN_MILLIS: number;
export declare class WebVitalsAutocapture {
    private readonly instance;
    private _enabledServerSide;
    private _initialized;
    private buffer;
    private _delayedFlushTimer;
    constructor(instance: PostHog);
    get allowedMetrics(): SupportedWebVitalsMetrics[];
    get flushToCaptureTimeoutMs(): number;
    get _maxAllowedValue(): number;
    get isEnabled(): boolean;
    startIfEnabled(): void;
    onRemoteConfig(response: RemoteConfig): void;
    private loadScript;
    private _currentURL;
    private _flushToCapture;
    private _addToBuffer;
    private _startCapturing;
}
