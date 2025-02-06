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
type SurveyUrlMatchType = 'regex' | 'not_regex' | 'exact' | 'is_not' | 'icontains' | 'not_icontains';
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

declare const renderSurveysPreview: ({ survey, parentElement, previewPageIndex, forceDisableHtml, onPreviewSubmit, }: {
    survey: Survey;
    parentElement: HTMLElement;
    previewPageIndex: number;
    forceDisableHtml?: boolean;
    onPreviewSubmit?: (res: string | string[] | number | null) => void;
}) => void;
declare const renderFeedbackWidgetPreview: ({ survey, root, forceDisableHtml, }: {
    survey: Survey;
    root: HTMLElement;
    forceDisableHtml?: boolean;
}) => void;

export { renderFeedbackWidgetPreview, renderSurveysPreview };
