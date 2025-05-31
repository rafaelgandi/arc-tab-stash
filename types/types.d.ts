export type StashItem = {
    url: string;
    title: string;
    id: string;
    favIconUrl: string;
    order?: number;
};

export type StashItemArray = StashItem[];

// Component Property Types //
export type StashLinkItemProps = {
    item: StashItem; 
    onDelete?: (stashId: string) => void;
    tabIndex?: number;
    onSectionToggle?: (sectionId: string) => void;
};

export type EmptyProps = {
    show: boolean
};

export type SettingsModalProps = {
    show: boolean;
    onDidDismiss: () => void;
    onTokenSaved: () => void;
    doBlock?: (block: boolean) => void;
};

export type FooterControlsProps = {
    onAddCurrentTabToStash?: () => void;
    onSectionAddButtonClicked?: () => void;
    onToggleSettings?: () => void;
    sectionCount: number;
};