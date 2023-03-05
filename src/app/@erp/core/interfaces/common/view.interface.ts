interface IElement {
    key: string;
    value: string;
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
    btnEdit: Array<string>;
    btnStatus?: {
        action: Function,
        status: boolean
    };
    sections: Array<ISection>;
}