import { PostHog } from './posthog-core';
import { CaptureResult, RemoteConfig, SiteApp, SiteAppGlobals, SiteAppLoader } from './types';
export declare class SiteApps {
    private instance;
    apps: Record<string, SiteApp>;
    private stopBuffering?;
    private bufferedInvocations;
    constructor(instance: PostHog);
    get isEnabled(): boolean;
    private eventCollector;
    get siteAppLoaders(): SiteAppLoader[] | undefined;
    init(): void;
    globalsForEvent(event: CaptureResult): SiteAppGlobals;
    setupSiteApp(loader: SiteAppLoader): void;
    private onCapturedEvent;
    onRemoteConfig(response: RemoteConfig): void;
}
