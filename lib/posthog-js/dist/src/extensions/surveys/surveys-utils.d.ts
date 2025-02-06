import { VNode } from 'preact';
import { PostHog } from '../../posthog-core';
import { MultipleSurveyQuestion, Survey, SurveyAppearance, SurveyQuestion } from '../../posthog-surveys-types';
export declare const style: (appearance: SurveyAppearance | null) => string;
export declare function getContrastingTextColor(color?: string): "black" | "white";
export declare function getTextColor(el: HTMLElement): "black" | "white";
export declare const defaultSurveyAppearance: SurveyAppearance;
export declare const defaultBackgroundColor = "#eeeded";
export declare const createShadow: (styleSheet: string, surveyId: string, element?: Element) => ShadowRoot;
export declare const sendSurveyEvent: (responses: Record<string, string | number | string[] | null> | undefined, survey: Survey, posthog?: PostHog) => void;
export declare const dismissedSurveyEvent: (survey: Survey, posthog?: PostHog, readOnly?: boolean) => void;
export declare const shuffle: (array: any[]) => any[];
export declare const getDisplayOrderChoices: (question: MultipleSurveyQuestion) => string[];
export declare const getDisplayOrderQuestions: (survey: Survey) => SurveyQuestion[];
export declare const hasEvents: (survey: Survey) => boolean;
export declare const canActivateRepeatedly: (survey: Survey) => boolean;
/**
 * getSurveySeen checks local storage for the surveySeen Key a
 * and overrides this value if the survey can be repeatedly activated by its events.
 * @param survey
 */
export declare const getSurveySeen: (survey: Survey) => boolean;
export declare const getSurveySeenKey: (survey: Survey) => string;
export declare const getSurveySeenStorageKeys: () => string[];
interface SurveyContextProps {
    isPreviewMode: boolean;
    previewPageIndex: number | undefined;
    handleCloseSurveyPopup: () => void;
    isPopup: boolean;
    onPreviewSubmit: (res: string | string[] | number | null) => void;
}
export declare const SurveyContext: import("preact").Context<SurveyContextProps>;
interface RenderProps {
    component: VNode<{
        className: string;
    }>;
    children: string;
    renderAsHtml?: boolean;
    style?: React.CSSProperties;
}
export declare const renderChildrenAsTextOrHtml: ({ component, children, renderAsHtml, style }: RenderProps) => VNode<{
    className: string;
}>;
export {};
