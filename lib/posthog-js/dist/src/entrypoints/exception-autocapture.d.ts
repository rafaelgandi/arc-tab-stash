import { Properties } from '../types';
declare const posthogErrorWrappingFunctions: {
    wrapOnError: (captureFn: (props: Properties) => void) => () => void;
    wrapUnhandledRejection: (captureFn: (props: Properties) => void) => () => void;
};
export default posthogErrorWrappingFunctions;
