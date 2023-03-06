interface IElement {
    key: string;
    value: string;
}

interface IAction {
    action: string;
}

interface IEdit {
    route: Array<string>;
    actions?: Array<IAction>;
}
  
interface ISection {
    nameSection: string;
    elements: Array<IElement>;
}

export interface IView {
    type: string;
    _id: string;
    id: string;
    img?: string;
    name: string;
    description: string;
    status: boolean;
    edit: IEdit;
    sections?: Array<ISection>;
}