import { PostHog } from '../posthog-core';
import { Survey, SurveyRenderReason } from '../posthog-surveys-types';
export declare class SurveyManager {
    private posthog;
    private surveyInFocus;
    constructor(posthog: PostHog);
    private canShowNextEventBasedSurvey;
    private handlePopoverSurvey;
    private handleWidget;
    private handleWidgetSelector;
    /**
     * Sorts surveys by their appearance delay in ascending order. If a survey does not have an appearance delay,
     * it is considered to have a delay of 0.
     * @param surveys
     * @returns The surveys sorted by their appearance delay
     */
    private sortSurveysByAppearanceDelay;
    /**
     * Checks the feature flags associated with this Survey to see if the survey can be rendered.
     * @param survey
     * @param instance
     */
    canRenderSurvey: (survey: Survey) => SurveyRenderReason;
    renderSurvey: (survey: Survey, selector: Element) => void;
    callSurveysAndEvaluateDisplayLogic: (forceReload?: boolean) => void;
    private addSurveyToFocus;
    private removeSurveyFromFocus;
    getTestAPI(): {
        addSurveyToFocus: (id: string) => void;
        removeSurveyFromFocus: (id: string) => void;
        surveyInFocus: string | null;
        canShowNextEventBasedSurvey: () => boolean;
        handleWidget: (survey: Survey) => void;
        handlePopoverSurvey: (survey: Survey) => void;
        handleWidgetSelector: (survey: Survey) => void;
        sortSurveysByAppearanceDelay: (surveys: Survey[]) => Survey[];
    };
}
export declare const renderSurveysPreview: ({ survey, parentElement, previewPageIndex, forceDisableHtml, onPreviewSubmit, }: {
    survey: Survey;
    parentElement: HTMLElement;
    previewPageIndex: number;
    forceDisableHtml?: boolean;
    onPreviewSubmit?: (res: string | string[] | number | null) => void;
}) => void;
export declare const renderFeedbackWidgetPreview: ({ survey, root, forceDisableHtml, }: {
    survey: Survey;
    root: HTMLElement;
    forceDisableHtml?: boolean;
}) => void;
export declare function generateSurveys(posthog: PostHog): SurveyManager | undefined;
export declare function usePopupVisibility(survey: Survey, posthog: PostHog | undefined, millisecondDelay: number, isPreviewMode: boolean, removeSurveyFromFocus: (id: string) => void): {
    isPopupVisible: boolean;
    isSurveySent: boolean;
    setIsPopupVisible: import("preact/hooks").StateUpdater<boolean>;
};
interface SurveyPopupProps {
    survey: Survey;
    forceDisableHtml?: boolean;
    posthog?: PostHog;
    style?: React.CSSProperties;
    previewPageIndex?: number | undefined;
    removeSurveyFromFocus: (id: string) => void;
    isPopup?: boolean;
    onPreviewSubmit?: (res: string | string[] | number | null) => void;
}
export declare function SurveyPopup({ survey, forceDisableHtml, posthog, style, previewPageIndex, removeSurveyFromFocus, isPopup, onPreviewSubmit, }: SurveyPopupProps): JSX.Element;
export declare function Questions({ survey, forceDisableHtml, posthog, styleOverrides, }: {
    survey: Survey;
    forceDisableHtml: boolean;
    posthog?: PostHog;
    styleOverrides?: React.CSSProperties;
}): JSX.Element;
export declare function FeedbackWidget({ survey, forceDisableHtml, posthog, readOnly, removeSurveyFromFocus, }: {
    survey: Survey;
    forceDisableHtml?: boolean;
    posthog?: PostHog;
    readOnly?: boolean;
    removeSurveyFromFocus: (id: string) => void;
}): JSX.Element;
export {};
