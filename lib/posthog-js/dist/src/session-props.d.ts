import type { SessionIdManager } from './sessionid';
import type { PostHogPersistence } from './posthog-persistence';
import type { PostHog } from './posthog-core';
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
export declare class SessionPropsManager {
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
export {};
