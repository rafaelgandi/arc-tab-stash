import { record } from '@rrweb/record';
import { eventWithTime } from '@rrweb/types';

/**
 * Extend Segment with extra PostHog JS functionality. Required for things like Recordings and feature flags to work correctly.
 *
 * ### Usage
 *
 *  ```js
 *  // After your standard segment anyalytics install
 *  analytics.load("GOEDfA21zZTtR7clsBuDvmBKAtAdZ6Np");
 *
 *  analytics.ready(() => {
 *    posthog.init('<posthog-api-key>', {
 *      capture_pageview: false,
 *      segment: window.analytics, // NOTE: Be sure to use window.analytics here!
 *    });
 *    window.analytics.page();
 *  })
 *  ```
 */

type SegmentUser = {
    anonymousId(): string | undefined;
    id(): string | undefined;
};
type SegmentAnalytics = {
    user: () => SegmentUser | Promise<SegmentUser>;
    register: (integration: SegmentPlugin) => Promise<void>;
};
interface SegmentContext {
    event: {
        event: string;
        userId?: string;
        anonymousId?: string;
        properties: any;
    };
}
type SegmentFunction = (ctx: SegmentContext) => Promise<SegmentContext> | SegmentContext;
interface SegmentPlugin {
    name: string;
    version: string;
    type: 'enrichment';
    isLoaded: () => boolean;
    load: (ctx: SegmentContext, instance: any, config?: any) => Promise<unknown>;
    unload?: (ctx: SegmentContext, instance: any) => Promise<unknown> | unknown;
    ready?: () => Promise<unknown>;
    track?: SegmentFunction;
    identify?: SegmentFunction;
    page?: SegmentFunction;
    group?: SegmentFunction;
    alias?: SegmentFunction;
    screen?: SegmentFunction;
}

type SessionStartReason = 'sampling_overridden' | 'recording_initialized' | 'linked_flag_matched' | 'linked_flag_overridden' | 'sampled' | 'session_id_changed' | 'url_trigger_matched' | 'event_trigger_matched';
type TriggerType = 'url' | 'event';
/**
 * Session recording starts in buffering mode while waiting for decide response
 * Once the response is received it might be disabled, active or sampled
 * When sampled that means a sample rate is set and the last time the session id was rotated
 * the sample rate determined this session should be sent to the server.
 */
type SessionRecordingStatus = 'disabled' | 'sampled' | 'active' | 'buffering' | 'paused';
declare class SessionRecording {
    private readonly instance;
    private _endpoint;
    private flushBufferTimer?;
    private buffer;
    private queuedRRWebEvents;
    private mutationRateLimiter?;
    private _captureStarted;
    private stopRrweb;
    private receivedDecide;
    private isIdle;
    private _linkedFlagSeen;
    private _lastActivityTimestamp;
    private windowId;
    private sessionId;
    private _linkedFlag;
    private _fullSnapshotTimer?;
    private _removePageViewCaptureHook;
    private _onSessionIdListener;
    private _persistDecideOnSessionListener;
    private _samplingSessionListener;
    private _lastHref?;
    private _urlTriggers;
    private _urlBlocklist;
    private _urlBlocked;
    private _eventTriggers;
    private _removeEventTriggerCaptureHook;
    _forceAllowLocalhostNetworkCapture: boolean;
    private get sessionIdleThresholdMilliseconds();
    private get rrwebRecord();
    get started(): boolean;
    private get sessionManager();
    private get fullSnapshotIntervalMillis();
    private get isSampled();
    private get sessionDuration();
    private get isRecordingEnabled();
    private get isConsoleLogCaptureEnabled();
    private get canvasRecording();
    private get networkPayloadCapture();
    private get sampleRate();
    private get minimumDuration();
    /**
     * defaults to buffering mode until a decide response is received
     * once a decide response is received status can be disabled, active or sampled
     */
    get status(): SessionRecordingStatus;
    private get urlTriggerStatus();
    private get eventTriggerStatus();
    private get triggerStatus();
    constructor(instance: PostHog);
    private _onBeforeUnload;
    private _onOffline;
    private _onOnline;
    private _onVisibilityChange;
    startIfEnabledOrStop(startReason?: SessionStartReason): void;
    stopRecording(): void;
    private makeSamplingDecision;
    onRemoteConfig(response: RemoteConfig): void;
    /**
     * This might be called more than once so needs to be idempotent
     */
    private _setupSampling;
    private _persistRemoteConfig;
    log(message: string, level?: 'log' | 'warn' | 'error'): void;
    private _startCapture;
    private get scriptName();
    private isInteractiveEvent;
    private _updateWindowAndSessionIds;
    private _tryRRWebMethod;
    private _tryAddCustomEvent;
    private _tryTakeFullSnapshot;
    private _onScriptLoaded;
    private _scheduleFullSnapshot;
    private _gatherRRWebPlugins;
    onRRwebEmit(rawEvent: eventWithTime): void;
    private _pageViewFallBack;
    private _processQueuedEvents;
    private _maskUrl;
    private clearBuffer;
    private _flushBuffer;
    private _captureSnapshotBuffered;
    private _captureSnapshot;
    private _checkUrlTriggerConditions;
    private _activateTrigger;
    private _pauseRecording;
    private _resumeRecording;
    private _addEventTriggerListener;
    /**
     * this ignores the linked flag config and (if other conditions are met) causes capture to start
     *
     * It is not usual to call this directly,
     * instead call `posthog.startSessionRecording({linked_flag: true})`
     * */
    overrideLinkedFlag(): void;
    /**
     * this ignores the sampling config and (if other conditions are met) causes capture to start
     *
     * It is not usual to call this directly,
     * instead call `posthog.startSessionRecording({sampling: true})`
     * */
    overrideSampling(): void;
    /**
     * this ignores the URL/Event trigger config and (if other conditions are met) causes capture to start
     *
     * It is not usual to call this directly,
     * instead call `posthog.startSessionRecording({trigger: 'url' | 'event'})`
     * */
    overrideTrigger(triggerType: TriggerType): void;
    private _reportStarted;
}

declare type recordOptions = Exclude<Parameters<typeof record<eventWithTime>>[0], undefined>;

type Property = any;
type Properties = Record<string, Property>;
declare const COPY_AUTOCAPTURE_EVENT = "$copy_autocapture";
declare const knownUnsafeEditableEvent: readonly ["$snapshot", "$pageview", "$pageleave", "$set", "survey dismissed", "survey sent", "survey shown", "$identify", "$groupidentify", "$create_alias", "$$client_ingestion_warning", "$web_experiment_applied", "$feature_enrollment_update", "$feature_flag_called"];
/**
 * These events can be processed by the `beforeCapture` function
 * but can cause unexpected confusion in data.
 *
 * Some features of PostHog rely on receiving 100% of these events
 */
type KnownUnsafeEditableEvent = (typeof knownUnsafeEditableEvent)[number];
/**
 * These are known events PostHog events that can be processed by the `beforeCapture` function
 * That means PostHog functionality does not rely on receiving 100% of these for calculations
 * So, it is safe to sample them to reduce the volume of events sent to PostHog
 */
type KnownEventName = '$heatmaps_data' | '$opt_in' | '$exception' | '$$heatmap' | '$web_vitals' | '$dead_click' | '$autocapture' | typeof COPY_AUTOCAPTURE_EVENT | '$rageclick';
type EventName = KnownUnsafeEditableEvent | KnownEventName | (string & {});
interface CaptureResult {
    uuid: string;
    event: EventName;
    properties: Properties;
    $set?: Properties;
    $set_once?: Properties;
    timestamp?: Date;
}
type AutocaptureCompatibleElement = 'a' | 'button' | 'form' | 'input' | 'select' | 'textarea' | 'label';
type DomAutocaptureEvents = 'click' | 'change' | 'submit';
/**
 * If an array is passed for an allowlist, autocapture events will only be sent for elements matching
 * at least one of the elements in the array. Multiple allowlists can be used
 */
interface AutocaptureConfig {
    /**
     * List of URLs to allow autocapture on, can be strings to match
     * or regexes e.g. ['https://example.com', 'test.com/.*']
     * this is useful when you want to autocapture on specific pages only
     *
     * if you set both url_allowlist and url_ignorelist,
     * we check the allowlist first and then the ignorelist.
     * the ignorelist can override the allowlist
     */
    url_allowlist?: (string | RegExp)[];
    /**
     * List of URLs to not allow autocapture on, can be strings to match
     * or regexes e.g. ['https://example.com', 'test.com/.*']
     * this is useful when you want to autocapture on most pages but not some specific ones
     *
     * if you set both url_allowlist and url_ignorelist,
     * we check the allowlist first and then the ignorelist.
     * the ignorelist can override the allowlist
     */
    url_ignorelist?: (string | RegExp)[];
    /**
     * List of DOM events to allow autocapture on  e.g. ['click', 'change', 'submit']
     */
    dom_event_allowlist?: DomAutocaptureEvents[];
    /**
     * List of DOM elements to allow autocapture on
     * e.g. ['a', 'button', 'form', 'input', 'select', 'textarea', 'label']
     * we consider the tree of elements from the root to the target element of the click event
     * so for the tree div > div > button > svg
     * if the allowlist has button then we allow the capture when the button or the svg is the click target
     * but not if either of the divs are detected as the click target
     */
    element_allowlist?: AutocaptureCompatibleElement[];
    /**
     * List of CSS selectors to allow autocapture on
     * e.g. ['[ph-capture]']
     * we consider the tree of elements from the root to the target element of the click event
     * so for the tree div > div > button > svg
     * and allow list config `['[id]']`
     * we will capture the click if the click-target or its parents has any id
     */
    css_selector_allowlist?: string[];
    /**
     * Exclude certain element attributes from autocapture
     * E.g. ['aria-label'] or [data-attr-pii]
     */
    element_attribute_ignorelist?: string[];
    capture_copied_text?: boolean;
}
interface BootstrapConfig {
    distinctID?: string;
    isIdentifiedID?: boolean;
    featureFlags?: Record<string, boolean | string>;
    featureFlagPayloads?: Record<string, JsonType>;
    /**
     * Optionally provide a sessionID, this is so that you can provide an existing sessionID here to continue a user's session across a domain or device. It MUST be:
     * - unique to this user
     * - a valid UUID v7
     * - the timestamp part must be <= the timestamp of the first event in the session
     * - the timestamp of the last event in the session must be < the timestamp part + 24 hours
     * **/
    sessionID?: string;
}
type SupportedWebVitalsMetrics = 'LCP' | 'CLS' | 'FCP' | 'INP';
interface PerformanceCaptureConfig {
    /** works with session replay to use the browser's native performance observer to capture performance metrics */
    network_timing?: boolean;
    /** use chrome's web vitals library to wrap fetch and capture web vitals */
    web_vitals?: boolean;
    /**
     * We observe very large values reported by the Chrome web vitals library
     * These outliers are likely not real, useful values, and we exclude them
     * You can set this to 0 in order to include all values, NB this is not recommended
     * if not set this defaults to 15 minutes
     */
    __web_vitals_max_value?: number;
    /**
     * By default all 4 metrics are captured
     * You can set this config to restrict which metrics are captured
     * e.g. ['CLS', 'FCP'] to only capture those two metrics
     * NB setting this does not override whether the capture is enabled
     */
    web_vitals_allowed_metrics?: SupportedWebVitalsMetrics[];
    /**
     * we delay flushing web vitals metrics to reduce the number of events we send
     * this is the maximum time we will wait before sending the metrics
     * if not set it defaults to 5 seconds
     */
    web_vitals_delayed_flush_ms?: number;
}
interface DeadClickCandidate {
    node: Element;
    originalEvent: MouseEvent;
    timestamp: number;
    scrollDelayMs?: number;
    mutationDelayMs?: number;
    selectionChangedDelayMs?: number;
    absoluteDelayMs?: number;
}
type DeadClicksAutoCaptureConfig = {
    scroll_threshold_ms?: number;
    selection_change_threshold_ms?: number;
    mutation_threshold_ms?: number;
    /**
     * Allows setting behavior for when a dead click is captured.
     * For e.g. to support capture to heatmaps
     *
     * If not provided the default behavior is to auto-capture dead click events
     *
     * Only intended to be provided by the SDK
     */
    __onCapture?: ((click: DeadClickCandidate, properties: Properties) => void) | undefined;
} & Pick<AutocaptureConfig, 'element_attribute_ignorelist'>;
interface HeatmapConfig {
    flush_interval_milliseconds: number;
}
type BeforeSendFn = (cr: CaptureResult | null) => CaptureResult | null;
interface PostHogConfig {
    api_host: string;
    /** @deprecated - This property is no longer supported */
    api_method?: string;
    api_transport?: 'XHR' | 'fetch';
    ui_host: string | null;
    token: string;
    autocapture: boolean | AutocaptureConfig;
    rageclick: boolean;
    cross_subdomain_cookie: boolean;
    persistence: 'localStorage' | 'cookie' | 'memory' | 'localStorage+cookie' | 'sessionStorage';
    persistence_name: string;
    /** @deprecated - Use 'persistence_name' instead */
    cookie_name?: string;
    loaded: (posthog_instance: PostHog) => void;
    store_google: boolean;
    custom_campaign_params: string[];
    custom_blocked_useragents: string[];
    save_referrer: boolean;
    verbose: boolean;
    capture_pageview: boolean;
    capture_pageleave: boolean | 'if_capture_pageview';
    debug: boolean;
    cookie_expiration: number;
    upgrade: boolean;
    disable_session_recording: boolean;
    disable_persistence: boolean;
    /** @deprecated - use `disable_persistence` instead  */
    disable_cookie?: boolean;
    disable_surveys: boolean;
    disable_web_experiments: boolean;
    /** If set, posthog-js will never load external scripts such as those needed for Session Replay or Surveys. */
    disable_external_dependency_loading?: boolean;
    prepare_external_dependency_script?: (script: HTMLScriptElement) => HTMLScriptElement | null;
    enable_recording_console_log?: boolean;
    secure_cookie: boolean;
    ip: boolean;
    /** Starts the SDK in an opted out state requiring opt_in_capturing() to be called before events will b captured  */
    opt_out_capturing_by_default: boolean;
    opt_out_capturing_persistence_type: 'localStorage' | 'cookie';
    /** If set to true this will disable persistence if the user is opted out of capturing. @default false */
    opt_out_persistence_by_default?: boolean;
    /** Opt out of user agent filtering such as googlebot or other bots. Defaults to `false` */
    opt_out_useragent_filter: boolean;
    opt_out_capturing_cookie_prefix: string | null;
    opt_in_site_apps: boolean;
    respect_dnt: boolean;
    /** @deprecated - use `property_denylist` instead  */
    property_blacklist?: string[];
    property_denylist: string[];
    request_headers: {
        [header_name: string]: string;
    };
    on_request_error?: (error: RequestResponse) => void;
    /** @deprecated - use `request_headers` instead  */
    xhr_headers?: {
        [header_name: string]: string;
    };
    /** @deprecated - use `on_request_error` instead  */
    on_xhr_error?: (failedRequest: XMLHttpRequest) => void;
    inapp_protocol: string;
    inapp_link_new_window: boolean;
    request_batching: boolean;
    properties_string_max_length: number;
    session_recording: SessionRecordingOptions;
    session_idle_timeout_seconds: number;
    mask_all_element_attributes: boolean;
    mask_all_text: boolean;
    mask_personal_data_properties: boolean;
    custom_personal_data_properties: string[];
    advanced_disable_decide: boolean;
    advanced_disable_feature_flags: boolean;
    advanced_disable_feature_flags_on_first_load: boolean;
    advanced_disable_toolbar_metrics: boolean;
    feature_flag_request_timeout_ms: number;
    get_device_id: (uuid: string) => string;
    name: string;
    /**
     * This function is called when collecting properties for an event.
     * It allows you to edit data before it is sent
     * @deprecated - use `before_send` instead
     */
    sanitize_properties: ((properties: Properties, event_name: string) => Properties) | null;
    /**
     * this is a read-only function that can be used to react to event capture
     * @deprecated - use `before_send` instead - NB before_send is not read only
     */
    _onCapture: (eventName: string, eventData: CaptureResult) => void;
    /**
     * This function or array of functions - if provided - are called immediately before sending data to the server.
     * It allows you to edit data before it is sent, or choose not to send it all.
     * if provided as an array the functions are called in the order they are provided
     * any one function returning null means the event will not be sent
     */
    before_send?: BeforeSendFn | BeforeSendFn[];
    capture_performance?: boolean | PerformanceCaptureConfig;
    disable_compression: boolean;
    bootstrap: BootstrapConfig;
    segment?: SegmentAnalytics;
    __preview_send_client_session_params?: boolean;
    enable_heatmaps?: boolean;
    capture_heatmaps?: boolean | HeatmapConfig;
    capture_dead_clicks?: boolean | DeadClicksAutoCaptureConfig;
    disable_scroll_properties?: boolean;
    scroll_root_selector?: string | string[];
    /** You can control whether events from PostHog-js have person processing enabled with the `person_profiles` config setting. There are three options:
     * - `person_profiles: 'always'` _(default)_ - we will process persons data for all events
     * - `person_profiles: 'never'` - we won't process persons for any event. This means that anonymous users will not be merged once they sign up or login, so you lose the ability to create funnels that track users from anonymous to identified. All events (including `$identify`) will be sent with `$process_person_profile: False`.
     * - `person_profiles: 'identified_only'` - we will only process persons when you call `posthog.identify`, `posthog.alias`, `posthog.setPersonProperties`, `posthog.group`, `posthog.setPersonPropertiesForFlags` or `posthog.setGroupPropertiesForFlags` Anonymous users won't get person profiles.
     */
    person_profiles?: 'always' | 'never' | 'identified_only';
    /** @deprecated - use `person_profiles` instead  */
    process_person?: 'always' | 'never' | 'identified_only';
    /** Client side rate limiting */
    rate_limiting?: {
        /** The average number of events per second that should be permitted (defaults to 10) */
        events_per_second?: number;
        /** How many events can be captured in a burst. This defaults to 10 times the events_per_second count  */
        events_burst_limit?: number;
    };
    /** Used when sending data via `fetch`, use with care, this is intentionally meant to be used with NextJS `fetch`
     *  Incorrect usage may cause out-of-date data for feature flags, actions tracking, etc.
     *  See https://nextjs.org/docs/app/api-reference/functions/fetch#fetchurl-options
     */
    fetch_options?: {
        cache?: RequestInit['cache'];
        next_options?: NextOptions;
    };
    /**
     * PREVIEW - MAY CHANGE WITHOUT WARNING - DO NOT USE IN PRODUCTION
     * whether to wrap fetch and add tracing headers to the request
     * */
    __add_tracing_headers?: boolean;
    /**
     * PREVIEW - MAY CHANGE WITHOUT WARNING - DO NOT USE IN PRODUCTION
     * enables the new RemoteConfig approach to loading config instead of decide
     * */
    __preview_remote_config?: boolean;
    /**
     * PREVIEW - MAY CHANGE WITHOUT WARNING - DO NOT USE IN PRODUCTION
     * whether to send a sentinel value for distinct id, device id, and session id, which will be replaced server-side by a cookieless hash
     * */
    __preview_experimental_cookieless_mode?: boolean;
}
interface OptInOutCapturingOptions {
    capture: (event: string, properties: Properties, options: CaptureOptions) => void;
    capture_event_name: string;
    capture_properties: Properties;
    enable_persistence: boolean;
    clear_persistence: boolean;
    persistence_type: 'cookie' | 'localStorage' | 'localStorage+cookie';
    cookie_prefix: string;
    cookie_expiration: number;
    cross_subdomain_cookie: boolean;
    secure_cookie: boolean;
}
interface IsFeatureEnabledOptions {
    send_event: boolean;
}
interface SessionRecordingOptions {
    blockClass?: string | RegExp;
    blockSelector?: string | null;
    ignoreClass?: string;
    maskTextClass?: string | RegExp;
    maskTextSelector?: string | null;
    maskTextFn?: ((text: string, element: HTMLElement | null) => string) | null;
    maskAllInputs?: boolean;
    maskInputOptions?: recordOptions['maskInputOptions'];
    maskInputFn?: ((text: string, element?: HTMLElement) => string) | null;
    slimDOMOptions?: recordOptions['slimDOMOptions'];
    collectFonts?: boolean;
    inlineStylesheet?: boolean;
    recordCrossOriginIframes?: boolean;
    /**
     * Allows local config to override remote canvas recording settings from the decide response
     */
    captureCanvas?: SessionRecordingCanvasOptions;
    /** @deprecated - use maskCapturedNetworkRequestFn instead  */
    maskNetworkRequestFn?: ((data: NetworkRequest) => NetworkRequest | null | undefined) | null;
    /** Modify the network request before it is captured. Returning null or undefined stops it being captured */
    maskCapturedNetworkRequestFn?: ((data: CapturedNetworkRequest) => CapturedNetworkRequest | null | undefined) | null;
    recordHeaders?: boolean;
    recordBody?: boolean;
    full_snapshot_interval_millis?: number;
    compress_events?: boolean;
    session_idle_threshold_ms?: number;
    __mutationRateLimiterRefillRate?: number;
    __mutationRateLimiterBucketSize?: number;
}
type SessionIdChangedCallback = (sessionId: string, windowId: string | null | undefined, changeReason?: {
    noSessionId: boolean;
    activityTimeout: boolean;
    sessionPastMaximumLength: boolean;
}) => void;
declare enum Compression {
    GZipJS = "gzip-js",
    Base64 = "base64"
}
interface RequestResponse {
    statusCode: number;
    text?: string;
    json?: any;
}
type RequestCallback = (response: RequestResponse) => void;
type NextOptions = {
    revalidate: false | 0 | number;
    tags: string[];
};
interface RequestOptions {
    url: string;
    data?: Record<string, any> | Record<string, any>[];
    headers?: Record<string, any>;
    transport?: 'XHR' | 'fetch' | 'sendBeacon';
    method?: 'POST' | 'GET';
    urlQueryArgs?: {
        compression: Compression;
    };
    callback?: RequestCallback;
    timeout?: number;
    noRetries?: boolean;
    compression?: Compression | 'best-available';
    fetchOptions?: {
        cache?: RequestInit['cache'];
        next?: NextOptions;
    };
}
interface QueuedRequestOptions extends RequestOptions {
    batchKey?: string; /** key of queue, e.g. 'sessionRecording' vs 'event' */
}
interface RetriableRequestOptions extends QueuedRequestOptions {
    retriesPerformedSoFar?: number;
}
interface CaptureOptions {
    $set?: Properties; /** used with $identify */
    $set_once?: Properties; /** used with $identify */
    _url?: string; /** Used to override the desired endpoint for the captured event */
    _batchKey?: string; /** key of queue, e.g. 'sessionRecording' vs 'event' */
    _noTruncate?: boolean; /** if set, overrides and disables config.properties_string_max_length */
    send_instantly?: boolean; /** if set skips the batched queue */
    skip_client_rate_limiting?: boolean; /** if set skips the client side rate limiting */
    transport?: RequestOptions['transport']; /** if set, overrides the desired transport method */
    timestamp?: Date;
}
type FlagVariant = {
    flag: string;
    variant: string;
};
type SessionRecordingCanvasOptions = {
    recordCanvas?: boolean | null;
    canvasFps?: number | null;
    canvasQuality?: string | null;
};
interface RemoteConfig {
    supportedCompression: Compression[];
    autocapture_opt_out?: boolean;
    /**
     *     originally capturePerformance was replay only and so boolean true
     *     is equivalent to { network_timing: true }
     *     now capture performance can be separately enabled within replay
     *     and as a standalone web vitals tracker
     *     people can have them enabled separately
     *     they work standalone but enhance each other
     *     TODO: deprecate this so we make a new config that doesn't need this explanation
     */
    capturePerformance?: boolean | PerformanceCaptureConfig;
    analytics?: {
        endpoint?: string;
    };
    elementsChainAsString?: boolean;
    autocaptureExceptions?: boolean | {
        endpoint?: string;
    };
    sessionRecording?: SessionRecordingCanvasOptions & {
        endpoint?: string;
        consoleLogRecordingEnabled?: boolean;
        sampleRate?: string | null;
        minimumDurationMilliseconds?: number;
        linkedFlag?: string | FlagVariant | null;
        networkPayloadCapture?: Pick<NetworkRecordOptions, 'recordBody' | 'recordHeaders'>;
        urlTriggers?: SessionRecordingUrlTrigger[];
        scriptConfig?: {
            script?: string | undefined;
        };
        urlBlocklist?: SessionRecordingUrlTrigger[];
        eventTriggers?: string[];
    };
    surveys?: boolean;
    toolbarParams: ToolbarParams;
    editorParams?: ToolbarParams; /** @deprecated, renamed to toolbarParams, still present on older API responses */
    toolbarVersion: 'toolbar'; /** @deprecated, moved to toolbarParams */
    isAuthenticated: boolean;
    siteApps: {
        id: string;
        url: string;
    }[];
    heatmaps?: boolean;
    defaultIdentifiedOnly?: boolean;
    captureDeadClicks?: boolean;
    hasFeatureFlags?: boolean;
}
interface DecideResponse extends RemoteConfig {
    featureFlags: Record<string, string | boolean>;
    featureFlagPayloads: Record<string, JsonType>;
    errorsWhileComputingFlags: boolean;
}
type SiteAppGlobals = {
    event: {
        uuid: string;
        event: EventName;
        properties: Properties;
        timestamp?: Date;
        elements_chain?: string;
        distinct_id?: string;
    };
    person: {
        properties: Properties;
    };
    groups: Record<string, {
        id: string;
        type: string;
        properties: Properties;
    }>;
};
type SiteAppLoader = {
    id: string;
    init: (config: {
        posthog: PostHog;
        callback: (success: boolean) => void;
    }) => {
        processEvent?: (globals: SiteAppGlobals) => void;
    };
};
type SiteApp = {
    id: string;
    loaded: boolean;
    errored: boolean;
    processEvent?: (globals: SiteAppGlobals) => void;
};
type FeatureFlagsCallback = (flags: string[], variants: Record<string, string | boolean>, context?: {
    errorsLoading?: boolean;
}) => void;
interface PersistentStore {
    is_supported: () => boolean;
    error: (error: any) => void;
    parse: (name: string) => any;
    get: (name: string) => any;
    set: (name: string, value: any, expire_days?: number | null, cross_subdomain?: boolean, secure?: boolean, debug?: boolean) => void;
    remove: (name: string, cross_subdomain?: boolean) => void;
}
type Breaker = {};
type EventHandler = (event: Event) => boolean | void;
type ToolbarUserIntent = 'add-action' | 'edit-action';
type ToolbarSource = 'url' | 'localstorage';
type ToolbarVersion = 'toolbar';
interface ToolbarParams {
    token?: string; /** public posthog-js token */
    temporaryToken?: string; /** private temporary user token */
    actionId?: number;
    userIntent?: ToolbarUserIntent;
    source?: ToolbarSource;
    toolbarVersion?: ToolbarVersion;
    instrument?: boolean;
    distinctId?: string;
    userEmail?: string;
    dataAttributes?: string[];
    featureFlags?: Record<string, string | boolean>;
}
type SnippetArrayItem = [method: string, ...args: any[]];
type JsonRecord = {
    [key: string]: JsonType;
};
type JsonType = string | number | boolean | null | JsonRecord | Array<JsonType>;
/** A feature that isn't publicly available yet.*/
interface EarlyAccessFeature {
    name: string;
    description: string;
    stage: 'concept' | 'alpha' | 'beta';
    documentationUrl: string | null;
    flagKey: string | null;
}
type EarlyAccessFeatureCallback = (earlyAccessFeatures: EarlyAccessFeature[]) => void;
interface EarlyAccessFeatureResponse {
    earlyAccessFeatures: EarlyAccessFeature[];
}
type Headers = Record<string, string>;
type InitiatorType = 'audio' | 'beacon' | 'body' | 'css' | 'early-hint' | 'embed' | 'fetch' | 'frame' | 'iframe' | 'icon' | 'image' | 'img' | 'input' | 'link' | 'navigation' | 'object' | 'ping' | 'script' | 'track' | 'video' | 'xmlhttprequest';
type NetworkRecordOptions = {
    initiatorTypes?: InitiatorType[];
    maskRequestFn?: (data: CapturedNetworkRequest) => CapturedNetworkRequest | undefined;
    recordHeaders?: boolean | {
        request: boolean;
        response: boolean;
    };
    recordBody?: boolean | string[] | {
        request: boolean | string[];
        response: boolean | string[];
    };
    recordInitialRequests?: boolean;
    /**
     * whether to record PerformanceEntry events for network requests
     */
    recordPerformance?: boolean;
    /**
     * the PerformanceObserver will only observe these entry types
     */
    performanceEntryTypeToObserve: string[];
    /**
     * the maximum size of the request/response body to record
     * NB this will be at most 1MB even if set larger
     */
    payloadSizeLimitBytes: number;
    /**
     * some domains we should never record the payload
     * for example other companies session replay ingestion payloads aren't super useful but are gigantic
     * if this isn't provided we use a default list
     * if this is provided - we add the provided list to the default list
     * i.e. we never record the payloads on the default deny list
     */
    payloadHostDenyList?: string[];
};
/** @deprecated - use CapturedNetworkRequest instead  */
type NetworkRequest = {
    url: string;
};
type Writable<T> = {
    -readonly [P in keyof T]: T[P];
};
type CapturedNetworkRequest = Writable<Omit<PerformanceEntry, 'toJSON'>> & {
    method?: string;
    initiatorType?: InitiatorType;
    status?: number;
    timeOrigin?: number;
    timestamp?: number;
    startTime?: number;
    endTime?: number;
    requestHeaders?: Headers;
    requestBody?: string | null;
    responseHeaders?: Headers;
    responseBody?: string | null;
    isInitial?: boolean;
};
type ErrorEventArgs = [
    event: string | Event,
    source?: string | undefined,
    lineno?: number | undefined,
    colno?: number | undefined,
    error?: Error | undefined
];
type ErrorMetadata = {
    handled?: boolean;
    synthetic?: boolean;
    syntheticException?: Error;
    overrideExceptionType?: string;
    overrideExceptionMessage?: string;
    defaultExceptionType?: string;
    defaultExceptionMessage?: string;
};
declare const severityLevels: readonly ["fatal", "error", "warning", "log", "info", "debug"];
declare type SeverityLevel = (typeof severityLevels)[number];
interface ErrorProperties {
    $exception_type: string;
    $exception_message: string;
    $exception_level: SeverityLevel;
    $exception_source?: string;
    $exception_lineno?: number;
    $exception_colno?: number;
    $exception_DOMException_code?: string;
    $exception_is_synthetic?: boolean;
    $exception_stack_trace_raw?: string;
    $exception_handled?: boolean;
    $exception_personURL?: string;
}
interface ErrorConversions {
    errorToProperties: (args: ErrorEventArgs) => ErrorProperties;
    unhandledRejectionToProperties: (args: [ev: PromiseRejectionEvent]) => ErrorProperties;
}
interface SessionRecordingUrlTrigger {
    url: string;
    matching: 'regex';
}

/**
 * PostHog Persistence Object
 * @constructor
 */
declare class PostHogPersistence {
    private config;
    props: Properties;
    storage: PersistentStore;
    campaign_params_saved: boolean;
    name: string;
    disabled: boolean | undefined;
    secure: boolean | undefined;
    expire_days: number | undefined;
    default_expiry: number | undefined;
    cross_subdomain: boolean | undefined;
    constructor(config: PostHogConfig);
    private buildStorage;
    properties(): Properties;
    load(): void;
    /**
     * NOTE: Saving frequently causes issues with Recordings and Consent Management Platform (CMP) tools which
     * observe cookie changes, and modify their UI, often causing infinite loops.
     * As such callers of this should ideally check that the data has changed beforehand
     */
    save(): void;
    remove(): void;
    clear(): void;
    /**
     * @param {Object} props
     * @param {*=} default_value
     * @param {number=} days
     */
    register_once(props: Properties, default_value: any, days?: number): boolean;
    /**
     * @param {Object} props
     * @param {number=} days
     */
    register(props: Properties, days?: number): boolean;
    unregister(prop: string): void;
    update_campaign_params(): void;
    update_search_keyword(): void;
    update_referrer_info(): void;
    set_initial_person_info(): void;
    get_referrer_info(): Properties;
    get_initial_props(): Properties;
    safe_merge(props: Properties): Properties;
    update_config(config: PostHogConfig, oldConfig: PostHogConfig): void;
    set_disabled(disabled: boolean): void;
    set_cross_subdomain(cross_subdomain: boolean): void;
    get_cross_subdomain(): boolean;
    set_secure(secure: boolean): void;
    set_event_timer(event_name: string, timestamp: number): void;
    remove_event_timer(event_name: string): number;
    get_property(prop: string): any;
    set_property(prop: string, to: any): void;
}

declare class PostHogFeatureFlags {
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

declare class Toolbar {
    instance: PostHog;
    constructor(instance: PostHog);
    private setToolbarState;
    private getToolbarState;
    /**
     * To load the toolbar, we need an access token and other state. That state comes from one of three places:
     * 1. In the URL hash params
     * 2. From session storage under the key `toolbarParams` if the toolbar was initialized on a previous page
     */
    maybeLoadToolbar(location?: Location | undefined, localStorage?: Storage | undefined, history?: History | undefined): boolean;
    private _callLoadToolbar;
    loadToolbar(params?: ToolbarParams): boolean;
    /** @deprecated Use "loadToolbar" instead. */
    _loadEditor(params: ToolbarParams): boolean;
    /** @deprecated Use "maybeLoadToolbar" instead. */
    maybeLoadEditor(location?: Location | undefined, localStorage?: Storage | undefined, history?: History | undefined): boolean;
}

declare class RequestQueue {
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

declare class RetryQueue {
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

declare class SessionIdManager {
    private readonly _sessionIdGenerator;
    private readonly _windowIdGenerator;
    private config;
    private persistence;
    private _windowId;
    private _sessionId;
    private readonly _window_id_storage_key;
    private readonly _primary_window_exists_storage_key;
    private _sessionStartTimestamp;
    private _sessionActivityTimestamp;
    private _sessionIdChangedHandlers;
    private readonly _sessionTimeoutMs;
    private _enforceIdleTimeout;
    constructor(instance: PostHog, sessionIdGenerator?: () => string, windowIdGenerator?: () => string);
    get sessionTimeoutMs(): number;
    onSessionId(callback: SessionIdChangedCallback): () => void;
    private _canUseSessionStorage;
    private _setWindowId;
    private _getWindowId;
    private _setSessionId;
    private _getSessionId;
    resetSessionId(): void;
    private _listenToReloadWindow;
    checkAndGetSessionAndWindowId(readOnly?: boolean, _timestamp?: number | null): {
        sessionId: string;
        windowId: string;
        sessionStartTimestamp: number;
        changeReason: {
            noSessionId: boolean;
            activityTimeout: boolean;
            sessionPastMaximumLength: boolean;
        } | undefined;
        lastActivityTimestamp: number;
    };
    private resetIdleTimer;
}

/**
 * The request router helps simplify the logic to determine which endpoints should be called for which things
 * The basic idea is that for a given region (US or EU), we have a set of endpoints that we should call depending
 * on the type of request (events, replays, decide, etc.) and handle overrides that may come from configs or the decide endpoint
 */
declare enum RequestRouterRegion {
    US = "us",
    EU = "eu",
    CUSTOM = "custom"
}
type RequestRouterTarget = 'api' | 'ui' | 'assets';
declare class RequestRouter {
    instance: PostHog;
    private _regionCache;
    constructor(instance: PostHog);
    get apiHost(): string;
    get uiHost(): string | undefined;
    get region(): RequestRouterRegion;
    endpointFor(target: RequestRouterTarget, path?: string): string;
}

/**
 * Integrate Sentry with PostHog. This will add a direct link to the person in Sentry, and an $exception event in PostHog
 *
 * ### Usage
 *
 *     Sentry.init({
 *          dsn: 'https://example',
 *          integrations: [
 *              new posthog.SentryIntegration(posthog)
 *          ]
 *     })
 *
 * @param {Object} [posthog] The posthog object
 * @param {string} [organization] Optional: The Sentry organization, used to send a direct link from PostHog to Sentry
 * @param {Number} [projectId] Optional: The Sentry project id, used to send a direct link from PostHog to Sentry
 * @param {string} [prefix] Optional: Url of a self-hosted sentry instance (default: https://sentry.io/organizations/)
 * @param {SeverityLevel[] | '*'} [severityAllowList] Optional: send events matching the provided levels. Use '*' to send all events (default: ['error'])
 */

type _SentryEvent = any;
type _SentryEventProcessor = any;
type _SentryHub = any;
interface _SentryIntegration {
    name: string;
    processEvent(event: _SentryEvent): _SentryEvent;
}
interface _SentryIntegrationClass {
    name: string;
    setupOnce(addGlobalEventProcessor: (callback: _SentryEventProcessor) => void, getCurrentHub: () => _SentryHub): void;
}
type SentryIntegrationOptions = {
    organization?: string;
    projectId?: number;
    prefix?: string;
    severityAllowList?: SeverityLevel[] | '*';
};
declare function sentryIntegration(_posthog: PostHog, options?: SentryIntegrationOptions): _SentryIntegration;
declare class SentryIntegration implements _SentryIntegrationClass {
    name: string;
    setupOnce: (addGlobalEventProcessor: (callback: _SentryEventProcessor) => void, getCurrentHub: () => _SentryHub) => void;
    constructor(_posthog: PostHog, organization?: string, projectId?: number, prefix?: string, severityAllowList?: SeverityLevel[] | '*');
}

interface PageViewEventProperties {
    $pageview_id?: string;
    $prev_pageview_id?: string;
    $prev_pageview_pathname?: string;
    $prev_pageview_duration?: number;
    $prev_pageview_last_scroll?: number;
    $prev_pageview_last_scroll_percentage?: number;
    $prev_pageview_max_scroll?: number;
    $prev_pageview_max_scroll_percentage?: number;
    $prev_pageview_last_content?: number;
    $prev_pageview_last_content_percentage?: number;
    $prev_pageview_max_content?: number;
    $prev_pageview_max_content_percentage?: number;
}
declare class PageViewManager {
    _currentPageview?: {
        timestamp: Date;
        pageViewId: string | undefined;
        pathname: string | undefined;
    };
    _instance: PostHog;
    constructor(instance: PostHog);
    doPageView(timestamp: Date, pageViewId?: string): PageViewEventProperties;
    doPageLeave(timestamp: Date): PageViewEventProperties;
    doEvent(): PageViewEventProperties;
    private _previousPageViewProperties;
}

/**
 * Having Survey types in types.ts was confusing tsc
 * and generating an invalid module.d.ts
 * See https://github.com/PostHog/posthog-js/issues/698
 */
interface SurveyAppearance {
    backgroundColor?: string;
    submitButtonColor?: string;
    textColor?: string;
    submitButtonText?: string;
    submitButtonTextColor?: string;
    descriptionTextColor?: string;
    ratingButtonColor?: string;
    ratingButtonActiveColor?: string;
    ratingButtonHoverColor?: string;
    whiteLabel?: boolean;
    autoDisappear?: boolean;
    displayThankYouMessage?: boolean;
    thankYouMessageHeader?: string;
    thankYouMessageDescription?: string;
    thankYouMessageDescriptionContentType?: SurveyQuestionDescriptionContentType;
    thankYouMessageCloseButtonText?: string;
    borderColor?: string;
    position?: 'left' | 'right' | 'center';
    placeholder?: string;
    shuffleQuestions?: boolean;
    surveyPopupDelaySeconds?: number;
    widgetType?: 'button' | 'tab' | 'selector';
    widgetSelector?: string;
    widgetLabel?: string;
    widgetColor?: string;
    fontFamily?: string;
    maxWidth?: string;
    zIndex?: string;
}
declare enum SurveyType {
    Popover = "popover",
    API = "api",
    Widget = "widget"
}
type SurveyQuestion = BasicSurveyQuestion | LinkSurveyQuestion | RatingSurveyQuestion | MultipleSurveyQuestion;
type SurveyQuestionDescriptionContentType = 'html' | 'text';
interface SurveyQuestionBase {
    question: string;
    description?: string | null;
    descriptionContentType?: SurveyQuestionDescriptionContentType;
    optional?: boolean;
    buttonText?: string;
    originalQuestionIndex: number;
    branching?: NextQuestionBranching | EndBranching | ResponseBasedBranching | SpecificQuestionBranching;
}
interface BasicSurveyQuestion extends SurveyQuestionBase {
    type: SurveyQuestionType.Open;
}
interface LinkSurveyQuestion extends SurveyQuestionBase {
    type: SurveyQuestionType.Link;
    link?: string | null;
}
interface RatingSurveyQuestion extends SurveyQuestionBase {
    type: SurveyQuestionType.Rating;
    display: 'number' | 'emoji';
    scale: 3 | 5 | 7 | 10;
    lowerBoundLabel: string;
    upperBoundLabel: string;
}
interface MultipleSurveyQuestion extends SurveyQuestionBase {
    type: SurveyQuestionType.SingleChoice | SurveyQuestionType.MultipleChoice;
    choices: string[];
    hasOpenChoice?: boolean;
    shuffleOptions?: boolean;
}
declare enum SurveyQuestionType {
    Open = "open",
    MultipleChoice = "multiple_choice",
    SingleChoice = "single_choice",
    Rating = "rating",
    Link = "link"
}
declare enum SurveyQuestionBranchingType {
    NextQuestion = "next_question",
    End = "end",
    ResponseBased = "response_based",
    SpecificQuestion = "specific_question"
}
interface NextQuestionBranching {
    type: SurveyQuestionBranchingType.NextQuestion;
}
interface EndBranching {
    type: SurveyQuestionBranchingType.End;
}
interface ResponseBasedBranching {
    type: SurveyQuestionBranchingType.ResponseBased;
    responseValues: Record<string, any>;
}
interface SpecificQuestionBranching {
    type: SurveyQuestionBranchingType.SpecificQuestion;
    index: number;
}
interface SurveyResponse {
    surveys: Survey[];
}
type SurveyCallback = (surveys: Survey[]) => void;
type SurveyUrlMatchType = 'regex' | 'not_regex' | 'exact' | 'is_not' | 'icontains' | 'not_icontains';
interface SurveyElement {
    text?: string;
    $el_text?: string;
    tag_name?: string;
    href?: string;
    attr_id?: string;
    attr_class?: string[];
    nth_child?: number;
    nth_of_type?: number;
    attributes?: Record<string, any>;
    event_id?: number;
    order?: number;
    group_id?: number;
}
interface SurveyRenderReason {
    visible: boolean;
    disabledReason?: string;
}
interface Survey {
    id: string;
    name: string;
    description: string;
    type: SurveyType;
    feature_flag_keys: {
        key: string;
        value?: string;
    }[] | null;
    linked_flag_key: string | null;
    targeting_flag_key: string | null;
    internal_targeting_flag_key: string | null;
    questions: SurveyQuestion[];
    appearance: SurveyAppearance | null;
    conditions: {
        url?: string;
        selector?: string;
        seenSurveyWaitPeriodInDays?: number;
        urlMatchType?: SurveyUrlMatchType;
        events: {
            repeatedActivation?: boolean;
            values: {
                name: string;
            }[];
        } | null;
        actions: {
            values: SurveyActionType[];
        } | null;
    } | null;
    start_date: string | null;
    end_date: string | null;
    current_iteration: number | null;
    current_iteration_start_date: string | null;
}
interface SurveyActionType {
    id: number;
    name: string | null;
    steps?: ActionStepType[];
}
/** Sync with plugin-server/src/types.ts */
type ActionStepStringMatching = 'contains' | 'exact' | 'regex';
interface ActionStepType {
    event?: string | null;
    selector?: string | null;
    /** @deprecated Only `selector` should be used now. */
    tag_name?: string;
    text?: string | null;
    /** @default StringMatching.Exact */
    text_matching?: ActionStepStringMatching | null;
    href?: string | null;
    /** @default ActionStepStringMatching.Exact */
    href_matching?: ActionStepStringMatching | null;
    url?: string | null;
    /** @default StringMatching.Contains */
    url_matching?: ActionStepStringMatching | null;
}

declare class ActionMatcher {
    private readonly actionRegistry?;
    private readonly instance?;
    private readonly actionEvents;
    private _debugEventEmitter;
    constructor(instance?: PostHog);
    init(): void;
    register(actions: SurveyActionType[]): void;
    on(eventName: string, eventPayload?: CaptureResult): void;
    _addActionHook(callback: (actionName: string, eventPayload?: any) => void): void;
    private checkAction;
    onAction(event: 'actionCaptured', cb: (...args: any[]) => void): () => void;
    private checkStep;
    private checkStepEvent;
    private checkStepUrl;
    private static matchString;
    private static escapeStringRegexp;
    private checkStepElement;
    private getElementsList;
}

declare class SurveyEventReceiver {
    private readonly eventToSurveys;
    private readonly actionToSurveys;
    private actionMatcher?;
    private readonly instance?;
    private static SURVEY_SHOWN_EVENT_NAME;
    constructor(instance: PostHog);
    register(surveys: Survey[]): void;
    private setupActionBasedSurveys;
    private setupEventBasedSurveys;
    onEvent(event: string, eventPayload?: CaptureResult): void;
    onAction(actionName: string): void;
    private _updateActivatedSurveys;
    getSurveys(): string[];
    getEventToSurveys(): Map<string, string[]>;
    _getActionMatcher(): ActionMatcher | null | undefined;
}

declare class PostHogSurveys {
    private readonly instance;
    private _decideServerResponse?;
    _surveyEventReceiver: SurveyEventReceiver | null;
    private _surveyManager;
    constructor(instance: PostHog);
    onRemoteConfig(response: RemoteConfig): void;
    reset(): void;
    loadIfEnabled(): void;
    getSurveys(callback: SurveyCallback, forceReload?: boolean): void;
    getActiveMatchingSurveys(callback: SurveyCallback, forceReload?: boolean): void;
    checkFlags(survey: Survey): boolean;
    getNextSurveyStep(survey: Survey, currentQuestionIndex: number, response: string | string[] | number | null): any;
    private _canActivateRepeatedly;
    canRenderSurvey(surveyId: string): void;
    renderSurvey(surveyId: string, selector: string): void;
}

declare class RateLimiter {
    instance: PostHog;
    serverLimits: Record<string, number>;
    captureEventsPerSecond: number;
    captureEventsBurstLimit: number;
    lastEventRateLimited: boolean;
    constructor(instance: PostHog);
    clientRateLimitContext(checkOnly?: boolean): {
        isRateLimited: boolean;
        remainingTokens: number;
    };
    isServerRateLimited(batchKey: string | undefined): boolean;
    checkForLimiting: (httpResponse: RequestResponse) => void;
}

interface SessionSourceProps {
    initialPathName: string;
    referringDomain: string;
    utm_medium?: string;
    utm_source?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
}
interface StoredSessionSourceProps {
    sessionId: string;
    props: SessionSourceProps;
}
declare class SessionPropsManager {
    private readonly instance;
    private readonly _sessionIdManager;
    private readonly _persistence;
    private readonly _sessionSourceParamGenerator;
    constructor(instance: PostHog, sessionIdManager: SessionIdManager, persistence: PostHogPersistence, sessionSourceParamGenerator?: (instance?: PostHog) => SessionSourceProps);
    _getStoredProps(): StoredSessionSourceProps | undefined;
    _onSessionIdCallback: (sessionId: string) => void;
    getSessionProps(): {
        $client_session_initial_referring_host?: undefined;
        $client_session_initial_pathname?: undefined;
        $client_session_initial_utm_source?: undefined;
        $client_session_initial_utm_campaign?: undefined;
        $client_session_initial_utm_medium?: undefined;
        $client_session_initial_utm_content?: undefined;
        $client_session_initial_utm_term?: undefined;
    } | {
        $client_session_initial_referring_host: string;
        $client_session_initial_pathname: string;
        $client_session_initial_utm_source: string | undefined;
        $client_session_initial_utm_campaign: string | undefined;
        $client_session_initial_utm_medium: string | undefined;
        $client_session_initial_utm_content: string | undefined;
        $client_session_initial_utm_term: string | undefined;
    };
}

declare class RageClick {
    clicks: {
        x: number;
        y: number;
        timestamp: number;
    }[];
    constructor();
    isRageClick(x: number, y: number, timestamp: number): boolean;
}

type HeatmapEventBuffer = {
    [key: string]: Properties[];
} | undefined;
declare class Heatmaps {
    instance: PostHog;
    rageclicks: RageClick;
    _enabledServerSide: boolean;
    _initialized: boolean;
    _mouseMoveTimeout: ReturnType<typeof setTimeout> | undefined;
    private buffer;
    private _flushInterval;
    private deadClicksCapture;
    constructor(instance: PostHog);
    get flushIntervalMilliseconds(): number;
    get isEnabled(): boolean;
    startIfEnabled(): void;
    onRemoteConfig(response: RemoteConfig): void;
    getAndClearBuffer(): HeatmapEventBuffer;
    private _onDeadClick;
    private _setupListeners;
    private _getProperties;
    private _onClick;
    private _onMouseMove;
    private _capture;
    private flush;
}

interface ScrollContext {
    maxScrollHeight?: number;
    maxScrollY?: number;
    lastScrollY?: number;
    maxContentHeight?: number;
    maxContentY?: number;
    lastContentY?: number;
}
declare class ScrollManager {
    private instance;
    private context;
    constructor(instance: PostHog);
    getContext(): ScrollContext | undefined;
    resetContext(): ScrollContext | undefined;
    private _updateScrollData;
    startMeasuringScrollPosition(): void;
    scrollElement(): Element | undefined;
    scrollY(): number;
    scrollX(): number;
}

declare class Autocapture {
    instance: PostHog;
    _initialized: boolean;
    _isDisabledServerSide: boolean | null;
    _elementSelectors: Set<string> | null;
    rageclicks: RageClick;
    _elementsChainAsString: boolean;
    constructor(instance: PostHog);
    private get config();
    _addDomEventHandlers(): void;
    startIfEnabled(): void;
    onRemoteConfig(response: RemoteConfig): void;
    setElementSelectors(selectors: Set<string>): void;
    getElementSelectors(element: Element | null): string[] | null;
    get isEnabled(): boolean;
    private _captureEvent;
    isBrowserSupported(): boolean;
}

declare enum ConsentStatus {
    PENDING = -1,
    DENIED = 0,
    GRANTED = 1
}
/**
 * ConsentManager provides tools for managing user consent as configured by the application.
 */
declare class ConsentManager {
    private instance;
    private _storage?;
    constructor(instance: PostHog);
    private get config();
    get consent(): ConsentStatus;
    isOptedOut(): boolean;
    isOptedIn(): boolean;
    optInOut(isOptedIn: boolean): void;
    reset(): void;
    private get storageKey();
    private get storedConsent();
    private get storage();
    private getDnt;
}

declare class ExceptionObserver {
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

declare class WebVitalsAutocapture {
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

interface WebExperimentTransform {
    attributes?: {
        name: string;
        value: string;
    }[];
    selector?: string;
    text?: string;
    html?: string;
    imgUrl?: string;
    css?: string;
}
type WebExperimentUrlMatchType = 'regex' | 'not_regex' | 'exact' | 'is_not' | 'icontains' | 'not_icontains';
interface WebExperimentVariant {
    conditions?: {
        url?: string;
        urlMatchType?: WebExperimentUrlMatchType;
        utm?: {
            utm_source?: string;
            utm_medium?: string;
            utm_campaign?: string;
            utm_term?: string;
        };
    };
    variant_name: string;
    transforms: WebExperimentTransform[];
}
interface WebExperiment {
    id: number;
    name: string;
    feature_flag_key?: string;
    variants: Record<string, WebExperimentVariant>;
}
type WebExperimentsCallback = (webExperiments: WebExperiment[]) => void;

declare class WebExperiments {
    private instance;
    private _flagToExperiments?;
    constructor(instance: PostHog);
    onFeatureFlags(flags: string[]): void;
    previewWebExperiment(): void;
    loadIfEnabled(): void;
    getWebExperimentsAndEvaluateDisplayLogic: (forceReload?: boolean) => void;
    getWebExperiments(callback: WebExperimentsCallback, forceReload: boolean, previewing?: boolean): void;
    private showPreviewWebExperiment;
    private static matchesTestVariant;
    private static matchUrlConditions;
    static getWindowLocation(): Location | undefined;
    private static matchUTMConditions;
    private static logInfo;
    private applyTransforms;
    _is_bot(): boolean | undefined;
}

declare class PostHogExceptions {
    private readonly instance;
    constructor(instance: PostHog);
    /**
     * :TRICKY: Make sure we batch these requests
     */
    sendExceptionEvent(properties: Properties): void;
}

declare class SiteApps {
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

interface LazyLoadedDeadClicksAutocaptureInterface {
    start: (observerTarget: Node) => void;
    stop: () => void;
}

declare class DeadClicksAutocapture {
    readonly instance: PostHog;
    readonly isEnabled: (dca: DeadClicksAutocapture) => boolean;
    readonly onCapture?: DeadClicksAutoCaptureConfig['__onCapture'];
    get lazyLoadedDeadClicksAutocapture(): LazyLoadedDeadClicksAutocaptureInterface | undefined;
    private _lazyLoadedDeadClicksAutocapture;
    constructor(instance: PostHog, isEnabled: (dca: DeadClicksAutocapture) => boolean, onCapture?: DeadClicksAutoCaptureConfig['__onCapture']);
    onRemoteConfig(response: RemoteConfig): void;
    startIfEnabled(): void;
    private loadScript;
    private start;
    stop(): void;
}

type OnlyValidKeys<T, Shape> = T extends Shape ? (Exclude<keyof T, keyof Shape> extends never ? T : never) : never;
declare class DeprecatedWebPerformanceObserver {
    get _forceAllowLocalhost(): boolean;
    set _forceAllowLocalhost(value: boolean);
    private __forceAllowLocalhost;
}
/**
 * PostHog Library Object
 * @constructor
 */
declare class PostHog {
    __loaded: boolean;
    config: PostHogConfig;
    rateLimiter: RateLimiter;
    scrollManager: ScrollManager;
    pageViewManager: PageViewManager;
    featureFlags: PostHogFeatureFlags;
    surveys: PostHogSurveys;
    experiments: WebExperiments;
    toolbar: Toolbar;
    exceptions: PostHogExceptions;
    consent: ConsentManager;
    persistence?: PostHogPersistence;
    sessionPersistence?: PostHogPersistence;
    sessionManager?: SessionIdManager;
    sessionPropsManager?: SessionPropsManager;
    requestRouter: RequestRouter;
    siteApps?: SiteApps;
    autocapture?: Autocapture;
    heatmaps?: Heatmaps;
    webVitalsAutocapture?: WebVitalsAutocapture;
    exceptionObserver?: ExceptionObserver;
    deadClicksAutocapture?: DeadClicksAutocapture;
    _requestQueue?: RequestQueue;
    _retryQueue?: RetryQueue;
    sessionRecording?: SessionRecording;
    webPerformance: DeprecatedWebPerformanceObserver;
    _initialPageviewCaptured: boolean;
    _triggered_notifs: any;
    compression?: Compression;
    __request_queue: QueuedRequestOptions[];
    analyticsDefaultEndpoint: string;
    version: string;
    _initialPersonProfilesConfig: 'always' | 'never' | 'identified_only' | null;
    _cachedIdentify: string | null;
    SentryIntegration: typeof SentryIntegration;
    sentryIntegration: (options?: SentryIntegrationOptions) => ReturnType<typeof sentryIntegration>;
    private _internalEventEmitter;
    get decideEndpointWasHit(): boolean;
    /** DEPRECATED: We keep this to support existing usage but now one should just call .setPersonProperties */
    people: {
        set: (prop: string | Properties, to?: string, callback?: RequestCallback) => void;
        set_once: (prop: string | Properties, to?: string, callback?: RequestCallback) => void;
    };
    constructor();
    /**
     * This function initializes a new instance of the PostHog capturing object.
     * All new instances are added to the main posthog object as sub properties (such as
     * posthog.library_name) and also returned by this function. To define a
     * second instance on the page, you would call:
     *
     *     posthog.init('new token', { your: 'config' }, 'library_name');
     *
     * and use it like so:
     *
     *     posthog.library_name.capture(...);
     *
     * @param {String} token   Your PostHog API token
     * @param {Object} [config]  A dictionary of config options to override. <a href="https://github.com/posthog/posthog-js/blob/6e0e873/src/posthog-core.js#L57-L91">See a list of default config options</a>.
     * @param {String} [name]    The name for the new posthog instance that you want created
     */
    init(token: string, config?: OnlyValidKeys<Partial<PostHogConfig>, Partial<PostHogConfig>>, name?: string): PostHog | undefined;
    _init(token: string, config?: Partial<PostHogConfig>, name?: string): PostHog;
    _onRemoteConfig(config: RemoteConfig): void;
    _loaded(): void;
    _start_queue_if_opted_in(): void;
    _dom_loaded(): void;
    _handle_unload(): void;
    _send_request(options: QueuedRequestOptions): void;
    _send_retriable_request(options: QueuedRequestOptions): void;
    /**
     * _execute_array() deals with processing any posthog function
     * calls that were called before the PostHog library were loaded
     * (and are thus stored in an array so they can be called later)
     *
     * Note: we fire off all the posthog function calls && user defined
     * functions BEFORE we fire off posthog capturing calls. This is so
     * identify/register/set_config calls can properly modify early
     * capturing calls.
     *
     * @param {Array} array
     */
    _execute_array(array: SnippetArrayItem[]): void;
    _hasBootstrappedFeatureFlags(): boolean;
    /**
     * push() keeps the standard async-array-push
     * behavior around after the lib is loaded.
     * This is only useful for external integrations that
     * do not wish to rely on our convenience methods
     * (created in the snippet).
     *
     * ### Usage:
     *     posthog.push(['register', { a: 'b' }]);
     *
     * @param {Array} item A [function_name, args...] array to be executed
     */
    push(item: SnippetArrayItem): void;
    /**
     * Capture an event. This is the most important and
     * frequently used PostHog function.
     *
     * ### Usage:
     *
     *     // capture an event named 'Registered'
     *     posthog.capture('Registered', {'Gender': 'Male', 'Age': 21});
     *
     *     // capture an event using navigator.sendBeacon
     *     posthog.capture('Left page', {'duration_seconds': 35}, {transport: 'sendBeacon'});
     *
     * @param {String} event_name The name of the event. This can be anything the user does - 'Button Click', 'Sign Up', 'Item Purchased', etc.
     * @param {Object} [properties] A set of properties to include with the event you're sending. These describe the user who did the event or details about the event itself.
     * @param {Object} [config] Optional configuration for this capture request.
     * @param {String} [config.transport] Transport method for network request ('XHR' or 'sendBeacon').
     * @param {Date} [config.timestamp] Timestamp is a Date object. If not set, it'll automatically be set to the current time.
     */
    capture(event_name: EventName, properties?: Properties | null, options?: CaptureOptions): CaptureResult | undefined;
    _addCaptureHook(callback: (eventName: string, eventPayload?: CaptureResult) => void): () => void;
    _calculate_event_properties(event_name: string, event_properties: Properties, timestamp?: Date, uuid?: string): Properties;
    _calculate_set_once_properties(dataSetOnce?: Properties): Properties | undefined;
    /**
     * Register a set of super properties, which are included with all
     * events. This will overwrite previous super property values, except
     * for session properties (see `register_for_session(properties)`).
     *
     * ### Usage:
     *
     *     // register 'Gender' as a super property
     *     posthog.register({'Gender': 'Female'});
     *
     *     // register several super properties when a user signs up
     *     posthog.register({
     *         'Email': 'jdoe@example.com',
     *         'Account Type': 'Free'
     *     });
     *
     *     // Display the properties
     *     console.log(posthog.persistence.properties())
     *
     * @param {Object} properties An associative array of properties to store about the user
     * @param {Number} [days] How many days since the user's last visit to store the super properties
     */
    register(properties: Properties, days?: number): void;
    /**
     * Register a set of super properties only once. These will not
     * overwrite previous super property values, unlike register().
     *
     * ### Usage:
     *
     *     // register a super property for the first time only
     *     posthog.register_once({
     *         'First Login Date': new Date().toISOString()
     *     });
     *
     *     // Display the properties
     *     console.log(posthog.persistence.properties())
     *
     * ### Notes:
     *
     * If default_value is specified, current super properties
     * with that value will be overwritten.
     *
     * @param {Object} properties An associative array of properties to store about the user
     * @param {*} [default_value] Value to override if already set in super properties (ex: 'False') Default: 'None'
     * @param {Number} [days] How many days since the users last visit to store the super properties
     */
    register_once(properties: Properties, default_value?: Property, days?: number): void;
    /**
     * Register a set of super properties, which are included with all events, but only
     * for THIS SESSION. These will overwrite all other super property values.
     *
     * Unlike regular super properties, which last in LocalStorage for a long time,
     * session super properties get cleared after a session ends.
     *
     * ### Usage:
     *
     *     // register on all events this session
     *     posthog.register_for_session({'referer': customGetReferer()});
     *
     *     // register several session super properties when a user signs up
     *     posthog.register_for_session({
     *         'selectedPlan': 'pro',
     *         'completedSteps': 4,
     *     });
     *
     *     // Display the properties
     *     console.log(posthog.sessionPersistence.properties())
     *
     * @param {Object} properties An associative array of properties to store about the user
     */
    register_for_session(properties: Properties): void;
    /**
     * Delete a super property stored with the current user.
     *
     * @param {String} property The name of the super property to remove
     */
    unregister(property: string): void;
    /**
     * Delete a session super property stored with the current user.
     *
     * @param {String} property The name of the session super property to remove
     */
    unregister_for_session(property: string): void;
    _register_single(prop: string, value: Property): void;
    getFeatureFlag(key: string, options?: {
        send_event?: boolean;
    }): boolean | string | undefined;
    getFeatureFlagPayload(key: string): JsonType;
    isFeatureEnabled(key: string, options?: IsFeatureEnabledOptions): boolean | undefined;
    reloadFeatureFlags(): void;
    /** Opt the user in or out of an early access feature. */
    updateEarlyAccessFeatureEnrollment(key: string, isEnrolled: boolean): void;
    /** Get the list of early access features. To check enrollment status, use `isFeatureEnabled`. */
    getEarlyAccessFeatures(callback: EarlyAccessFeatureCallback, force_reload?: boolean): void;
    /**
     * Exposes a set of events that PostHog will emit.
     * e.g. `eventCaptured` is emitted immediately before trying to send an event
     *
     * Unlike  `onFeatureFlags` and `onSessionId` these are not called when the
     * listener is registered, the first callback will be the next event
     * _after_ registering a listener
     */
    on(event: 'eventCaptured', cb: (...args: any[]) => void): () => void;
    onFeatureFlags(callback: (flags: string[], variants: Record<string, string | boolean>) => void): () => void;
    onSessionId(callback: SessionIdChangedCallback): () => void;
    /** Get list of all surveys. */
    getSurveys(callback: SurveyCallback, forceReload?: boolean): void;
    /** Get surveys that should be enabled for the current user. */
    getActiveMatchingSurveys(callback: SurveyCallback, forceReload?: boolean): void;
    /** Render a survey on a specific element. */
    renderSurvey(surveyId: string, selector: string): void;
    /** Checks the feature flags associated with this Survey to see if the survey can be rendered. */
    canRenderSurvey(surveyId: string): void;
    /** Get the next step of the survey: a question index or `end` */
    getNextSurveyStep(survey: Survey, currentQuestionIndex: number, response: string | string[] | number | null): number | SurveyQuestionBranchingType.End;
    /**
     * Identify a user with a unique ID instead of a PostHog
     * randomly generated distinct_id. If the method is never called,
     * then unique visitors will be identified by a UUID that is generated
     * the first time they visit the site.
     *
     * If user properties are passed, they are also sent to posthog.
     *
     * ### Usage:
     *
     *      posthog.identify('[user unique id]')
     *      posthog.identify('[user unique id]', { email: 'john@example.com' })
     *      posthog.identify('[user unique id]', {}, { referral_code: '12345' })
     *
     * ### Notes:
     *
     * You can call this function to overwrite a previously set
     * unique ID for the current user.
     *
     * If the user has been identified ($user_state in persistence is set to 'identified'),
     * then capture of $identify is skipped to avoid merging users. For example,
     * if your system allows an admin user to impersonate another user.
     *
     * Then a single browser instance can have:
     *
     *  `identify('a') -> capture(1) -> identify('b') -> capture(2)`
     *
     * and capture 1 and capture 2 will have the correct distinct_id.
     * but users a and b will NOT be merged in posthog.
     *
     * However, if reset is called then:
     *
     *  `identify('a') -> capture(1) -> reset() -> capture(2) -> identify('b') -> capture(3)`
     *
     * users a and b are not merged.
     * Capture 1 is associated with user a.
     * A new distinct id is generated for capture 2.
     * which is merged with user b.
     * So, capture 2 and 3 are associated with user b.
     *
     * If you want to merge two identified users, you can call posthog.alias
     *
     * @param {String} [new_distinct_id] A string that uniquely identifies a user. If not provided, the distinct_id currently in the persistent store (cookie or localStorage) will be used.
     * @param {Object} [userPropertiesToSet] Optional: An associative array of properties to store about the user
     * @param {Object} [userPropertiesToSetOnce] Optional: An associative array of properties to store about the user. If property is previously set, this does not override that value.
     */
    identify(new_distinct_id?: string, userPropertiesToSet?: Properties, userPropertiesToSetOnce?: Properties): void;
    /**
     * Sets properties for the Person associated with the current distinct_id. If config.person_profiles is set to
     * identified_only, and a Person profile has not been created yet, this will create one.
     *
     *
     * @param {Object} [userPropertiesToSet] Optional: An associative array of properties to store about the user
     * @param {Object} [userPropertiesToSetOnce] Optional: An associative array of properties to store about the user. If property is previously set, this does not override that value.
     */
    setPersonProperties(userPropertiesToSet?: Properties, userPropertiesToSetOnce?: Properties): void;
    /**
     * Sets group analytics information for subsequent events and reloads feature flags.
     *
     * @param {String} groupType Group type (example: 'organization')
     * @param {String} groupKey Group key (example: 'org::5')
     * @param {Object} groupPropertiesToSet Optional properties to set for group
     */
    group(groupType: string, groupKey: string, groupPropertiesToSet?: Properties): void;
    /**
     * Resets only the group properties of the user currently logged in.
     */
    resetGroups(): void;
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
    /**
     * Clears super properties and generates a new random distinct_id for this instance.
     * Useful for clearing data when a user logs out.
     */
    reset(reset_device_id?: boolean): void;
    /**
     * Returns the current distinct id of the user. This is either the id automatically
     * generated by the library or the id that has been passed by a call to identify().
     *
     * ### Notes:
     *
     * get_distinct_id() can only be called after the PostHog library has finished loading.
     * init() has a loaded function available to handle this automatically. For example:
     *
     *     // set distinct_id after the posthog library has loaded
     *     posthog.init('YOUR PROJECT TOKEN', {
     *         loaded: function(posthog) {
     *             distinct_id = posthog.get_distinct_id();
     *         }
     *     });
     */
    get_distinct_id(): string;
    getGroups(): Record<string, any>;
    /**
     * Returns the current session_id.
     *
     * NOTE: This should only be used for informative purposes.
     * Any actual internal use case for the session_id should be handled by the sessionManager.
     */
    get_session_id(): string;
    /**
     * Returns the Replay url for the current session.
     *
     * @param options Options for the url
     * @param options.withTimestamp Whether to include the timestamp in the url (defaults to false)
     * @param options.timestampLookBack How many seconds to look back for the timestamp (defaults to 10)
     */
    get_session_replay_url(options?: {
        withTimestamp?: boolean;
        timestampLookBack?: number;
    }): string;
    /**
     * Create an alias, which PostHog will use to link two distinct_ids going forward (not retroactively).
     * Multiple aliases can map to the same original ID, but not vice-versa. Aliases can also be chained - the
     * following is a valid scenario:
     *
     *     posthog.alias('new_id', 'existing_id');
     *     ...
     *     posthog.alias('newer_id', 'new_id');
     *
     * If the original ID is not passed in, we will use the current distinct_id - probably the auto-generated GUID.
     *
     * ### Notes:
     *
     * The best practice is to call alias() when a unique ID is first created for a user
     * (e.g., when a user first registers for an account and provides an email address).
     * alias() should never be called more than once for a given user, except to
     * chain a newer ID to a previously new ID, as described above.
     *
     * @param {String} alias A unique identifier that you want to use for this user in the future.
     * @param {String} [original] The current identifier being used for this user.
     */
    alias(alias: string, original?: string): CaptureResult | void | number;
    /**
     * Update the configuration of a posthog library instance.
     *
     * The default config is:
     *
     *     {
     *       // PostHog API host
     *       api_host: 'https://us.i.posthog.com',
     *     *
     *       // PostHog web app host, currently only used by the Sentry integration.
     *       // This will only be different from api_host when using a reverse-proxied API host – in that case
     *       // the original web app host needs to be passed here so that links to the web app are still convenient.
     *       ui_host: 'https://us.posthog.com',
     *
     *       // Automatically capture clicks, form submissions and change events
     *       autocapture: true
     *
     *       // Capture rage clicks
     *       rageclick: true
     *
     *       // transport for sending requests ('XHR' | 'fetch' | 'sendBeacon')
     *       // NB: sendBeacon should only be used for scenarios such as
     *       // page unload where a "best-effort" attempt to send is
     *       // acceptable; the sendBeacon API does not support callbacks
     *       // or any way to know the result of the request. PostHog
     *       // capturing via sendBeacon will not support any event-
     *       // batching or retry mechanisms.
     *       api_transport: 'fetch'
     *
     *       // super properties cookie expiration (in days)
     *       cookie_expiration: 365
     *
     *       // super properties span subdomains
     *       cross_subdomain_cookie: true
     *
     *       // debug mode
     *       debug: false
     *
     *       // if this is true, the posthog cookie or localStorage entry
     *       // will be deleted, and no user persistence will take place
     *       disable_persistence: false
     *
     *       // if this is true, PostHog will automatically determine
     *       // City, Region and Country data using the IP address of
     *       //the client
     *       ip: true
     *
     *       // opt users out of capturing by this PostHog instance by default
     *       opt_out_capturing_by_default: false
     *
     *       // opt users out of browser data storage by this PostHog instance by default
     *       opt_out_persistence_by_default: false
     *
     *       // opt out of user agent filtering such as googlebot or other bots
     *       opt_out_useragent_filter: false
     *
     *       // persistence mechanism used by opt-in/opt-out methods - cookie
     *       // or localStorage - falls back to cookie if localStorage is unavailable
     *       opt_out_capturing_persistence_type: 'localStorage'
     *
     *       // customize the name of cookie/localStorage set by opt-in/opt-out methods
     *       opt_out_capturing_cookie_prefix: null
     *
     *       // type of persistent store for super properties (cookie/
     *       // localStorage) if set to 'localStorage', any existing
     *       // posthog cookie value with the same persistence_name
     *       // will be transferred to localStorage and deleted
     *       persistence: 'cookie'
     *
     *       // name for super properties persistent store
     *       persistence_name: ''
     *
     *       // deprecated, use property_denylist instead.
     *       // names of properties/superproperties which should never
     *       // be sent with capture() calls.
     *       property_blacklist: []
     *
     *       // names of properties/superproperties which should never
     *       // be sent with capture() calls.
     *       property_denylist: []
     *
     *       // if this is true, posthog cookies will be marked as
     *       // secure, meaning they will only be transmitted over https
     *       secure_cookie: false
     *
     *       // should we capture a page view on page load
     *       capture_pageview: true
     *
     *       // if you set upgrade to be true, the library will check for
     *       // a cookie from our old js library and import super
     *       // properties from it, then the old cookie is deleted
     *       // The upgrade config option only works in the initialization,
     *       // so make sure you set it when you create the library.
     *       upgrade: false
     *
     *       // if this is true, session recording is always disabled.
     *       disable_session_recording: false,
     *
     *       // extra HTTP request headers to set for each API request, in
     *       // the format {'Header-Name': value}
     *       response_headers: {}
     *
     *       // protocol for fetching in-app message resources, e.g.
     *       // 'https://' or 'http://'; defaults to '//' (which defers to the
     *       // current page's protocol)
     *       inapp_protocol: '//'
     *
     *       // whether to open in-app message link in new tab/window
     *       inapp_link_new_window: false
     *
     *      // a set of rrweb config options that PostHog users can configure
     *      // see https://github.com/rrweb-io/rrweb/blob/master/guide.md
     *      session_recording: {
     *         blockClass: 'ph-no-capture',
     *         blockSelector: null,
     *         ignoreClass: 'ph-ignore-input',
     *         maskAllInputs: true,
     *         maskInputOptions: {password: true},
     *         maskInputFn: null,
     *         slimDOMOptions: {},
     *         collectFonts: false,
     *         inlineStylesheet: true,
     *      }
     *
     *      // prevent autocapture from capturing any attribute names on elements
     *      mask_all_element_attributes: false
     *
     *      // prevent autocapture from capturing textContent on all elements
     *      mask_all_text: false
     *
     *      // Anonymous users get a random UUID as their device by default.
     *      // This option allows overriding that option.
     *      get_device_id: (uuid) => uuid
     *     }
     *
     *
     * @param {Object} config A dictionary of new configuration values to update
     */
    set_config(config: Partial<PostHogConfig>): void;
    /**
     * turns session recording on, and updates the config option `disable_session_recording` to false
     * @param override.sampling - optional boolean to override the default sampling behavior - ensures the next session recording to start will not be skipped by sampling config.
     * @param override.linked_flag - optional boolean to override the default linked_flag behavior - ensures the next session recording to start will not be skipped by linked_flag config.
     * @param override.url_trigger - optional boolean to override the default url_trigger behavior - ensures the next session recording to start will not be skipped by url_trigger config.
     * @param override.event_trigger - optional boolean to override the default event_trigger behavior - ensures the next session recording to start will not be skipped by event_trigger config.
     * @param override - optional boolean to override the default sampling behavior - ensures the next session recording to start will not be skipped by sampling or linked_flag config. `true` is shorthand for { sampling: true, linked_flag: true }
     */
    startSessionRecording(override?: {
        sampling?: boolean;
        linked_flag?: boolean;
        url_trigger?: true;
        event_trigger?: true;
    } | true): void;
    /**
     * turns session recording off, and updates the config option
     * disable_session_recording to true
     */
    stopSessionRecording(): void;
    /**
     * returns a boolean indicating whether session recording
     * is currently running
     */
    sessionRecordingStarted(): boolean;
    /** Capture a caught exception manually */
    captureException(error: Error, additionalProperties?: Properties): void;
    /**
     * returns a boolean indicating whether the toolbar loaded
     * @param toolbarParams
     */
    loadToolbar(params: ToolbarParams): boolean;
    /**
     * Returns the value of the super property named property_name. If no such
     * property is set, get_property() will return the undefined value.
     *
     * ### Notes:
     *
     * get_property() can only be called after the PostHog library has finished loading.
     * init() has a loaded function available to handle this automatically. For example:
     *
     *     // grab value for '$user_id' after the posthog library has loaded
     *     posthog.init('YOUR PROJECT TOKEN', {
     *         loaded: function(posthog) {
     *             user_id = posthog.get_property('$user_id');
     *         }
     *     });
     *
     * @param {String} property_name The name of the super property you want to retrieve
     */
    get_property(property_name: string): Property | undefined;
    /**
     * Returns the value of the session super property named property_name. If no such
     * property is set, getSessionProperty() will return the undefined value.
     *
     * ### Notes:
     *
     * This is based on browser-level `sessionStorage`, NOT the PostHog session.
     * getSessionProperty() can only be called after the PostHog library has finished loading.
     * init() has a loaded function available to handle this automatically. For example:
     *
     *     // grab value for 'user_id' after the posthog library has loaded
     *     posthog.init('YOUR PROJECT TOKEN', {
     *         loaded: function(posthog) {
     *             user_id = posthog.getSessionProperty('user_id');
     *         }
     *     });
     *
     * @param {String} property_name The name of the session super property you want to retrieve
     */
    getSessionProperty(property_name: string): Property | undefined;
    toString(): string;
    _isIdentified(): boolean;
    _hasPersonProcessing(): boolean;
    _shouldCapturePageleave(): boolean;
    /**
     *  Creates a person profile for the current user, if they don't already have one and config.person_profiles is set
     *  to 'identified_only'. Produces a warning and does not create a profile if config.person_profiles is set to
     *  'never'.
     */
    createPersonProfile(): void;
    /**
     * Enables person processing if possible, returns true if it does so or already enabled, false otherwise
     *
     * @param function_name
     */
    _requirePersonProcessing(function_name: string): boolean;
    /**
     * Enable or disable persistence based on options
     * only enable/disable if persistence is not already in this state
     * @param {boolean} [disabled] If true, will re-enable sdk persistence
     */
    private _sync_opt_out_with_persistence;
    /**
     * Opt the user in to data capturing and cookies/localstorage for this PostHog instance
     * If the config.opt_out_persistence_by_default is set to false, the SDK persistence will be enabled.
     *
     * ### Usage
     *
     *     // opt user in
     *     posthog.opt_in_capturing();
     *
     *     // opt user in with specific event name, properties, cookie configuration
     *     posthog.opt_in_capturing({
     *         capture_event_name: 'User opted in',
     *         capture_event_properties: {
     *             'email': 'jdoe@example.com'
     *         }
     *     });
     *
     * @param {Object} [config] A dictionary of config options to override
     * @param {string} [config.capture_event_name=$opt_in] Event name to be used for capturing the opt-in action. Set to `null` or `false` to skip capturing the optin event
     * @param {Object} [config.capture_properties] Set of properties to be captured along with the opt-in action
     */
    opt_in_capturing(options?: {
        captureEventName?: EventName | null | false; /** event name to be used for capturing the opt-in action */
        captureProperties?: Properties; /** set of properties to be captured along with the opt-in action */
    }): void;
    /**
     * Opt the user out of data capturing and cookies/localstorage for this PostHog instance.
     * If the config.opt_out_persistence_by_default is set to true, the SDK persistence will be disabled.
     *
     * ### Usage
     *
     *     // opt user out
     *     posthog.opt_out_capturing()
     */
    opt_out_capturing(): void;
    /**
     * Check whether the user has opted in to data capturing and cookies/localstorage for this PostHog instance
     *
     * ### Usage
     *
     *     const has_opted_in = posthog.has_opted_in_capturing();
     *     // use has_opted_in value
     *
     * @returns {boolean} current opt-in status
     */
    has_opted_in_capturing(): boolean;
    /**
     * Check whether the user has opted out of data capturing and cookies/localstorage for this PostHog instance
     *
     * ### Usage
     *
     *     const has_opted_out = posthog.has_opted_out_capturing();
     *     // use has_opted_out value
     *
     * @returns {boolean} current opt-out status
     */
    has_opted_out_capturing(): boolean;
    /**
     * Clear the user's opt in/out status of data capturing and cookies/localstorage for this PostHog instance
     *
     * ### Usage
     *
     *     // clear user's opt-in/out status
     *     posthog.clear_opt_in_out_capturing();
     *     *
     * @param {Object} [config] A dictionary of config options to override
     */
    clear_opt_in_out_capturing(): void;
    _is_bot(): boolean | undefined;
    _captureInitialPageview(): void;
    debug(debug?: boolean): void;
    private _runBeforeSend;
    getPageViewId(): string | undefined;
}

declare const posthog: PostHog;

export { type ActionStepStringMatching, type ActionStepType, type AutocaptureCompatibleElement, type AutocaptureConfig, type BasicSurveyQuestion, type BeforeSendFn, type BootstrapConfig, type Breaker, COPY_AUTOCAPTURE_EVENT, type CaptureOptions, type CaptureResult, type CapturedNetworkRequest, Compression, type DeadClickCandidate, type DeadClicksAutoCaptureConfig, type DecideResponse, type DomAutocaptureEvents, type EarlyAccessFeature, type EarlyAccessFeatureCallback, type EarlyAccessFeatureResponse, type ErrorConversions, type ErrorEventArgs, type ErrorMetadata, type ErrorProperties, type EventHandler, type EventName, type FeatureFlagsCallback, type FlagVariant, type Headers, type HeatmapConfig, type InitiatorType, type IsFeatureEnabledOptions, type JsonRecord, type JsonType, type KnownEventName, type KnownUnsafeEditableEvent, type LinkSurveyQuestion, type MultipleSurveyQuestion, type NetworkRecordOptions, type NetworkRequest, type OptInOutCapturingOptions, type PerformanceCaptureConfig, type PersistentStore, PostHog, type PostHogConfig, type Properties, type Property, type QueuedRequestOptions, type RatingSurveyQuestion, type RemoteConfig, type RequestCallback, type RequestOptions, type RequestResponse, type RetriableRequestOptions, type SessionIdChangedCallback, type SessionRecordingCanvasOptions, type SessionRecordingOptions, type SessionRecordingUrlTrigger, type SeverityLevel, type SiteApp, type SiteAppGlobals, type SiteAppLoader, type SnippetArrayItem, type SupportedWebVitalsMetrics, type Survey, type SurveyActionType, type SurveyAppearance, type SurveyCallback, type SurveyElement, type SurveyQuestion, SurveyQuestionBranchingType, type SurveyQuestionDescriptionContentType, SurveyQuestionType, type SurveyRenderReason, type SurveyResponse, SurveyType, type SurveyUrlMatchType, type ToolbarParams, type ToolbarSource, type ToolbarUserIntent, type ToolbarVersion, posthog as default, knownUnsafeEditableEvent, posthog, severityLevels };
