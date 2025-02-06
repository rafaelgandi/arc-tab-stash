import { PostHogFeatureFlags } from './posthog-featureflags';
import { PostHogPersistence } from './posthog-persistence';
import { SessionRecording } from './extensions/replay/sessionrecording';
import { Toolbar } from './extensions/toolbar';
import { RequestQueue } from './request-queue';
import { RetryQueue } from './retry-queue';
import { SessionIdManager } from './sessionid';
import { RequestRouter } from './utils/request-router';
import { CaptureOptions, CaptureResult, Compression, EarlyAccessFeatureCallback, EventName, IsFeatureEnabledOptions, JsonType, PostHogConfig, Properties, Property, QueuedRequestOptions, RemoteConfig, RequestCallback, SessionIdChangedCallback, SnippetArrayItem, ToolbarParams } from './types';
import { SentryIntegration, SentryIntegrationOptions, sentryIntegration } from './extensions/sentry-integration';
import { PageViewManager } from './page-view';
import { PostHogSurveys } from './posthog-surveys';
import { RateLimiter } from './rate-limiter';
import { Survey, SurveyCallback, SurveyQuestionBranchingType } from './posthog-surveys-types';
import { SessionPropsManager } from './session-props';
import { Heatmaps } from './heatmaps';
import { ScrollManager } from './scroll-manager';
import { Autocapture } from './autocapture';
import { ConsentManager } from './consent';
import { ExceptionObserver } from './extensions/exception-autocapture';
import { WebVitalsAutocapture } from './extensions/web-vitals';
import { WebExperiments } from './web-experiments';
import { PostHogExceptions } from './posthog-exceptions';
import { SiteApps } from './site-apps';
import { DeadClicksAutocapture } from './extensions/dead-clicks-autocapture';
type OnlyValidKeys<T, Shape> = T extends Shape ? (Exclude<keyof T, keyof Shape> extends never ? T : never) : never;
export declare const defaultConfig: () => PostHogConfig;
export declare const configRenames: (origConfig: Partial<PostHogConfig>) => Partial<PostHogConfig>;
declare class DeprecatedWebPerformanceObserver {
    get _forceAllowLocalhost(): boolean;
    set _forceAllowLocalhost(value: boolean);
    private __forceAllowLocalhost;
}
/**
 * PostHog Library Object
 * @constructor
 */
export declare class PostHog {
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
export declare function init_from_snippet(): void;
export declare function init_as_module(): PostHog;
export {};
