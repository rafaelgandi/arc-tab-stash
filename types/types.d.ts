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
};

export type EmptyProps = {
    show: boolean
};

export type SettingsModalProps = {
    show: boolean;
};

export type FooterControlsProps = {
    onAddCurrentTabToStash?: () => void;
    onToggleSettings?: () => void;
};