import { PostHog } from './posthog-core';
import { DecideResponse, FeatureFlagsCallback, EarlyAccessFeatureCallback, Properties, JsonType } from './types';
import { PostHogPersistence } from './posthog-persistence';
export declare const filterActiveFeatureFlags: (featureFlags?: Record<string, string | boolean>) => Record<string, string | boolean>;
export declare const parseFeatureFlagDecideResponse: (response: Partial<DecideResponse>, persistence: PostHogPersistence, currentFlags?: Record<string, string | boolean>, currentFlagPayloads?: Record<string, JsonType>) => void;
export declare class PostHogFeatureFlags {
    private instance;
    _override_warning: boolean;
    featureFlagEventHandlers: FeatureFlagsCallback[];
    $anon_distinct_id: string | undefined;
    private _hasLoadedFlags;
    private _requestInFlight;
    private _reloadingDisabled;
    private _additionalReloadRequested;
    private _reloadDebouncer?;
    private _decideCalled;
    private _flagsLoadedFromRemote;
    constructor(instance: PostHog);
    decide(): void;
    get hasLoadedFlags(): boolean;
    getFlags(): string[];
    getFlagVariants(): Record<string, string | boolean>;
    getFlagPayloads(): Record<string, JsonType>;
    /**
     * Reloads feature flags asynchronously.
     *
     * Constraints:
     *
     * 1. Avoid parallel requests
     * 2. Delay a few milliseconds after each reloadFeatureFlags call to batch subsequent changes together
     */
    reloadFeatureFlags(): void;
    private clearDebouncer;
    ensureFlagsLoaded(): void;
    setAnonymousDistinctId(anon_distinct_id: string): void;
    setReloadingPaused(isPaused: boolean): void;
    /**
     * NOTE: This is used both for flags and remote config. Once the RemoteConfig is fully released this will essentially only
     * be for flags and can eventually be replaced with the new flags endpoint
     */
    _callDecideEndpoint(options?: {
        disableFlags?: boolean;
    }): void;
    getFeatureFlag(key: string, options?: {
        send_event?: boolean;
    }): boolean | string | undefined;
    getFeatureFlagPayload(key: string): JsonType;
    isFeatureEnabled(key: string, options?: {
        send_event?: boolean;
    }): boolean | undefined;
    addFeatureFlagsHandler(handler: FeatureFlagsCallback): void;
    removeFeatureFlagsHandler(handler: FeatureFlagsCallback): void;
    receivedFeatureFlags(response: Partial<DecideResponse>, errorsLoading?: boolean): void;
    override(flags: boolean | string[] | Record<string, string | boolean>, suppressWarning?: boolean): void;
    onFeatureFlags(callback: FeatureFlagsCallback): () => void;
    updateEarlyAccessFeatureEnrollment(key: string, isEnrolled: boolean): void;
    getEarlyAccessFeatures(callback: EarlyAccessFeatureCallback, force_reload?: boolean): void;
    _prepareFeatureFlagsForCallbacks(): {
        flags: string[];
        flagVariants: Record<string, string | boolean>;
    };
    _fireFeatureFlagsCallbacks(errorsLoading?: boolean): void;
    /**
     * Set override person properties for feature flags.
     * This is used when dealing with new persons / where you don't want to wait for ingestion
     * to update user properties.
     */
    setPersonPropertiesForFlags(properties: Properties, reloadFeatureFlags?: boolean): void;
    resetPersonPropertiesForFlags(): void;
    /**
     * Set override group properties for feature flags.
     * This is used when dealing with new groups / where you don't want to wait for ingestion
     * to update properties.
     * Takes in an object, the key of which is the group type.
     * For example:
     *     setGroupPropertiesForFlags({'organization': { name: 'CYZ', employees: '11' } })
     */
    setGroupPropertiesForFlags(properties: {
        [type: string]: Properties;
    }, reloadFeatureFlags?: boolean): void;
    resetGroupPropertiesForFlags(group_type?: string): void;
}
