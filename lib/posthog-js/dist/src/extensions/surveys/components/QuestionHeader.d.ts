import { SurveyQuestionDescriptionContentType } from '../../../posthog-surveys-types';
import { h } from 'preact';
export declare function QuestionHeader({ question, description, descriptionContentType, backgroundColor, forceDisableHtml, }: {
    question: string;
    description?: string | null;
    descriptionContentType?: SurveyQuestionDescriptionContentType;
    forceDisableHtml: boolean;
    backgroundColor?: string;
}): h.JSX.Element;
export declare function Cancel({ onClick }: {
    onClick: () => void;
}): h.JSX.Element;
