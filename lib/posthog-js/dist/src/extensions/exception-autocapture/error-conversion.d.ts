import { StackFrame } from './stack-trace';
import { ErrorEventArgs, ErrorMetadata, SeverityLevel } from '../../types';
export interface ErrorProperties {
    $exception_list: Exception[];
    $exception_level?: SeverityLevel;
    $exception_DOMException_code?: string;
    $exception_personURL?: string;
}
export interface Exception {
    type?: string;
    value?: string;
    mechanism?: {
        /**
         * In theory, whether or not the exception has been handled by the user. In practice, whether or not we see it before
         * it hits the global error/rejection handlers, whether through explicit handling by the user or auto instrumentation.
         */
        handled?: boolean;
        type?: string;
        source?: string;
        /**
         * True when `captureException` is called with anything other than an instance of `Error` (or, in the case of browser,
         * an instance of `ErrorEvent`, `DOMError`, or `DOMException`). causing us to create a synthetic error in an attempt
         * to recreate the stacktrace.
         */
        synthetic?: boolean;
    };
    module?: string;
    thread_id?: number;
    stacktrace?: {
        frames?: StackFrame[];
        type: 'raw';
    };
}
export interface ErrorConversions {
    errorToProperties: (args: ErrorEventArgs, metadata?: ErrorMetadata) => ErrorProperties;
    unhandledRejectionToProperties: (args: [ev: PromiseRejectionEvent]) => ErrorProperties;
}
export declare function parseStackFrames(ex: Error & {
    stacktrace?: string;
}, framesToPop?: number): StackFrame[];
/**
 * There are cases where stacktrace.message is an Event object
 * https://github.com/getsentry/sentry-javascript/issues/1949
 * In this specific case we try to extract stacktrace.message.error.message
 */
export declare function extractMessage(err: Error & {
    message: {
        error?: Error;
    };
}): string;
export declare function errorToProperties([event, _, __, ___, error]: ErrorEventArgs, metadata?: ErrorMetadata): ErrorProperties;
export declare function unhandledRejectionToProperties([ev]: [ev: PromiseRejectionEvent]): ErrorProperties;
