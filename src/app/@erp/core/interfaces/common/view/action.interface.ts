interface IAction {
    action: string;
    textColor?: string;
    disabled?: boolean;
}

export interface ILink extends IAction {
    type: "button";
    handleAction: Function;
}

export interface IButton extends IAction {
    type: "link";
    link: Array<string>;
}