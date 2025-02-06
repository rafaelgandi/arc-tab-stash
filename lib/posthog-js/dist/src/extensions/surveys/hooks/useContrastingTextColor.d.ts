import { SurveyAppearance } from '../../../posthog-surveys-types';
import * as Preact from 'preact';
export declare function useContrastingTextColor(options: {
    appearance: SurveyAppearance;
    defaultTextColor?: string;
    forceUpdate?: boolean;
}): {
    ref: Preact.RefObject<HTMLElement>;
    textColor: string;
};
