import { PostHog } from '../../posthog-core';
import { Properties, RemoteConfig } from '../../types';
export declare class ExceptionObserver {
    instance: PostHog;
    remoteEnabled: boolean | undefined;
    private originalOnUnhandledRejectionHandler;
    private unwrapOnError;
    private unwrapUnhandledRejection;
    constructor(instance: PostHog);
    get isEnabled(): boolean;
    get isCapturing(): boolean;
    get hasHandlers(): ((this: WindowEventHandlers, ev: PromiseRejectionEvent) => any) | undefined;
    startIfEnabled(): void;
    private loadScript;
    private startCapturing;
    private stopCapturing;
    onRemoteConfig(response: RemoteConfig): void;
    captureException(errorProperties: Properties): void;
}
