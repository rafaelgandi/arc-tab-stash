import { SurveyAppearance, SurveyQuestionDescriptionContentType } from '../../../posthog-surveys-types';
import { h } from 'preact';
export declare function ConfirmationMessage({ header, description, contentType, forceDisableHtml, appearance, onClose, styleOverrides, }: {
    header: string;
    description: string;
    forceDisableHtml: boolean;
    contentType?: SurveyQuestionDescriptionContentType;
    appearance: SurveyAppearance;
    onClose: () => void;
    styleOverrides?: React.CSSProperties;
}): h.JSX.Element;
